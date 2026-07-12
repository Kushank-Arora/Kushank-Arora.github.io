

const drawAreaChart = () => {
    const containerId = "#area-chart-container";
    d3.select(containerId).selectAll("*").remove();

    let data = [...historyData].sort((a, b) => a.timestamp - b.timestamp);
    let cumulative = 0;
    const chartData = data.map(d => {
        cumulative += (d.duration / 60);
        return {
            date: new Date(d.timestamp),
            label: new Date(d.timestamp).toLocaleDateString(undefined, {month: 'numeric', day: 'numeric'}),
            total: Math.round(cumulative)
        };
    });

    if (chartData.length > 0) {
        const firstDate = new Date(chartData[0].date);
        firstDate.setDate(firstDate.getDate() - 1);
        chartData.unshift({ date: firstDate, label: '', total: 0 });
    }

    const margin = {top: 10, right: 10, bottom: 20, left: 35};
    const width = document.getElementById('area-chart-container').clientWidth;
    const height = 180;

    const svg = d3.select(containerId).append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", `0 0 ${width} ${height}`)
        .style("overflow", "visible");

    const x = d3.scaleTime()
        .domain(d3.extent(chartData, d => d.date))
        .range([margin.left, width - margin.right]);

    const y = d3.scaleLinear()
        .domain([0, d3.max(chartData, d => d.total)])
        .nice()
        .range([height - margin.bottom, margin.top]);

    const defs = svg.append("defs");
    const gradient = defs.append("linearGradient")
        .attr("id", "area-gradient")
        .attr("x1", "0%").attr("y1", "0%")
        .attr("x2", "0%").attr("y2", "100%");
    gradient.append("stop").attr("offset", "0%").attr("stop-color", "rgba(59, 130, 246, 0.5)"); 
    gradient.append("stop").attr("offset", "100%").attr("stop-color", "rgba(59, 130, 246, 0)");

    const area = d3.area()
        .x(d => x(d.date))
        .y0(height - margin.bottom)
        .y1(d => y(d.total))
        .curve(d3.curveMonotoneX);

    const line = d3.line()
        .x(d => x(d.date))
        .y(d => y(d.total))
        .curve(d3.curveMonotoneX);

    svg.append("g")
        .attr("transform", `translate(0,0)`)
        .call(d3.axisLeft(y).tickSize(-width + margin.left + margin.right).ticks(4))
        .style("stroke-dasharray", "3,3")
        .style("stroke-opacity", 0.05)
        .selectAll("path, line").attr("stroke", "#94a3b8");

    svg.append("path")
        .datum(chartData)
        .attr("fill", "url(#area-gradient)")
        .attr("d", area);

    svg.append("path")
        .datum(chartData)
        .attr("fill", "none")
        .attr("stroke", "#3b82f6") 
        .attr("stroke-width", 3)
        .attr("d", line);

    svg.selectAll(".dot")
        .data(chartData.filter(d => d.total > 0)) 
        .enter().append("circle")
        .attr("cx", d => x(d.date))
        .attr("cy", d => y(d.total))
        .attr("r", 4)
        .attr("fill", "#0f172a")
        .attr("stroke", "#60a5fa")
        .attr("stroke-width", 2)
        .on("mouseover", function(event, d) {
            d3.select(this).attr("r", 6).attr("fill", "#3b82f6");
            showChartTooltip(event, `Cumulative<br><span class="text-blue-400">${d.total} mins</span>`);
        })
        .on("mouseout", function() {
            d3.select(this).attr("r", 4).attr("fill", "#0f172a");
            hideChartTooltip();
        });

    svg.append("g")
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y).ticks(4).tickSizeOuter(0))
        .call(g => g.select(".domain").remove())
        .selectAll("text").attr("fill", "#64748b").style("font-size", "10px");
};

const renderContent = () => {
    if (state.selectedDay === 'Summary') {
        renderSummary();
        return;
    }

    const plan = WORKOUT_PLAN[state.selectedDay];
    if (!plan) {
        els.mainContent.innerHTML = `<div class="text-center text-slate-400 mt-10">Rest Day. No workout planned.</div>`;
        return;
    }

    let html = `
        <div class="mb-8 bg-gradient-to-br from-slate-800 to-slate-800/50 rounded-2xl p-5 border border-slate-700 shadow-xl relative overflow-hidden">
            <h2 class="text-2xl font-black text-white mb-2 tracking-tight">${plan.focus}</h2>
            <div class="flex items-center gap-3 text-sm">
                <span class="flex items-center gap-1.5 text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded border border-emerald-500/20 font-bold">
                    <i class="fas fa-map-marker-alt"></i> ${plan.location}
                </span>
                <span class="text-slate-400 font-medium">${(plan.exercises?.length || 0) + (plan.warmup?.length || 0)} Total Exercises</span>
            </div>
        </div>
        <div class="mb-8">
            <h3 class="text-xs font-black tracking-widest text-slate-400 uppercase mb-4 flex items-center gap-2">
                <i class="fas fa-fire-flame-curved text-orange-500"></i> Dynamic Warm-up
            </h3>
            ${plan.warmup.map(ex => createExerciseHTML(ex, true)).join('')}
        </div>
        <div class="mb-4">
            <h3 class="text-xs font-black tracking-widest text-slate-400 uppercase mb-4 flex items-center gap-2">
                <i class="fas fa-dumbbell text-emerald-500"></i> Main Routine
            </h3>
            ${plan.exercises.map(ex => createExerciseHTML(ex, false)).join('')}
        </div>
    `;
    els.mainContent.innerHTML = html;
};

const getTotalSessionSeconds = () => {
    let total = state.accumulatedTime;
    if (state.sessionStatus === 'active' && state.sessionStartTime) {
        total += Math.floor((Date.now() - state.sessionStartTime) / 1000);
    }
    return total;
};

const updateSessionTimerUI = () => {
    const totalSeconds = getTotalSessionSeconds();
    const h = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
    const s = (totalSeconds % 60).toString().padStart(2, '0');
    
    if (h > 0 && h !== "00") els.sessionTimer.innerText = `${h}:${m}:${s}`;
    else els.sessionTimer.innerText = `${m}:${s}`;
};

const startGlobalTimer = () => {
    if (sessionInterval) clearInterval(sessionInterval);
    sessionInterval = setInterval(updateSessionTimerUI, 1000);
    updateSessionTimerUI();
};

const startTaskTimerInterval = () => {
    if (state.timerInterval) clearInterval(state.timerInterval);
    state.timerInterval = setInterval(() => {
        if (state.activeTaskId) {
            state.taskTimes[state.activeTaskId] = (state.taskTimes[state.activeTaskId] || 0) + 1;
            const timeEl = document.getElementById(`timer-${state.activeTaskId}`);
            if (timeEl) timeEl.innerText = formatTime(state.taskTimes[state.activeTaskId]);
            const timerEls = Array.from(document.getElementsByClassName(`timer-${state.activeTaskId}`));
            timerEls.forEach(t => t.innerText = formatTime(state.taskTimes[state.activeTaskId]));
        }
    }, 1000);
};

const stopTaskTimerInterval = () => {
    if (state.timerInterval) {
        clearInterval(state.timerInterval);
        state.timerInterval = null;
    }
};

const saveSessionToHistory = () => {
    if (!state.sessionId) return;
    
    const plan = WORKOUT_PLAN[state.selectedDay];
    const totalTasks = plan ? ((plan.exercises?.length || 0) + (plan.warmup?.length || 0)) : 0;
    const completedCount = Object.values(state.taskCompleted).filter(Boolean).length;
    const duration = getTotalSessionSeconds();
    const summaryText = generateSummaryText();

    const sessionRecord = {
        id: state.sessionId,
        timestamp: state.firstStartTime ? new Date(state.firstStartTime).getTime() : Date.now(),
        day: state.selectedDay,
        duration: duration,
        completedTasks: completedCount,
        totalTasks: totalTasks,
        summaryText: summaryText
    };

    const existingIdx = historyData.findIndex(h => h.id === state.sessionId);
    if (existingIdx > -1) {
        historyData[existingIdx] = sessionRecord;
    } else {
        historyData.push(sessionRecord);
    }
    
    localStorage.setItem(HISTORY_KEY, JSON.stringify(historyData));
};

window.updateLog = (taskId, field, value) => {
    if (!state.logs[taskId]) state.logs[taskId] = { weight: '', sets: '', repsL: '', repsR: '' };
    state.logs[taskId][field] = value;
    saveState();
};

window.toggleTimer = (taskId, imgID, targetSets) => {
    if (state.sessionStatus === 'idle') handleStart();
    else if (state.sessionStatus === 'finished') handleResume();

    if (state.activeTaskId === taskId) {
        state.activeTaskId = null;
        stopTaskTimerInterval();
    } else {
        state.activeTaskId = taskId;
        startTaskTimerInterval();
        window.openDemo(taskId, imgID, targetSets);
    }

    saveState();
    renderContent();
};

window.toggleComplete = (taskId) => {
    if (state.sessionStatus === 'idle') handleStart();
    else if (state.sessionStatus === 'finished') handleResume();
    
    if (state.activeTaskId === taskId) {
        state.activeTaskId = null;
        stopTaskTimerInterval();
    }
    
    state.taskCompleted[taskId] = !state.taskCompleted[taskId];
    saveState();
    updateProgressBar();
    renderContent();
};

window.openVideoModal = (videoId) => {
    els.videoIframe.src = `https://www.youtube.com/embed/${videoId}?loop=1&playlist=${videoId}`;
    els.fallbackYoutubeLink.href = `https://www.youtube.com/watch?v=${videoId}`;
    window.openModal('video-modal');
};

els.btnCloseVideo.onclick = () => {
    window.closeModal('video-modal');
    els.videoIframe.src = ''; 
};

const handleStart = () => {
    if (!state.firstStartTime) {
        state.firstStartTime = new Date().toISOString();
        state.sessionId = generateId();
    }
    state.sessionStatus = 'active';
    state.sessionStartTime = Date.now();

    startGlobalTimer();
    updateUIVisibility();
    renderTabs(); 
    saveState();
};
els.btnStart.onclick = handleStart;

const handleFinish = () => {
    state.sessionStatus = 'finished';
    state.finishTime = new Date().toISOString();
    
    if (state.sessionStartTime) {
        state.accumulatedTime += Math.floor((Date.now() - state.sessionStartTime) / 1000);
        state.sessionStartTime = null; 
    }
    if (sessionInterval) clearInterval(sessionInterval);
    
    if (state.activeTaskId) {
        state.activeTaskId = null;
        stopTaskTimerInterval();
        renderContent();
    }
    
    state.isShareVisible = true;
    
    saveSessionToHistory();
    updateUIVisibility();
    saveState();
};
els.btnEnd.onclick = handleFinish;

const handleCloseModal = () => {
    state.isShareVisible = false;
    updateUIVisibility();
    saveState();
};
els.btnCloseSummary.onclick = handleCloseModal;

const handleResume = () => {
    state.sessionStatus = 'active';
    state.isShareVisible = false;
    
    state.sessionStartTime = Date.now();
    startGlobalTimer();
    
    updateUIVisibility();
    saveState();
};
els.btnResumeModal.onclick = handleResume;
els.btnResumeMain.onclick = handleResume;

const handleShareLater = () => {
    state.isShareVisible = true;
    updateUIVisibility();
    saveState();
};
els.btnShare.onclick = handleShareLater;