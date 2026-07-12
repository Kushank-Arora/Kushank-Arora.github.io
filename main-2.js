const renderTabs = () => {
    els.tabsContainer.innerHTML = '';
    const allTabs = [...Object.keys(WORKOUT_PLAN), 'Summary'];
    
    allTabs.forEach(day => {
        const btn = document.createElement('button');
        const isSelected = state.selectedDay === day;
        const isSummary = day === 'Summary';
        const isLocked = state.sessionStatus !== 'idle'; 
        
        let baseClass = "px-5 py-2 rounded-full whitespace-nowrap text-sm font-semibold transition-all ";
        if (isSelected) {
            baseClass += isSummary 
                ? 'bg-blue-500 text-white shadow-md shadow-blue-500/20' 
                : 'bg-emerald-500 text-slate-900 shadow-md shadow-emerald-500/20';
        } else {
            baseClass += 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white';
        }

        if (isLocked) baseClass += ' opacity-50 cursor-not-allowed';
        
        btn.className = baseClass;
        btn.innerHTML = isSummary ? `<i class="fas fa-chart-line mr-1"></i> Summary` : day;
        
        btn.onclick = () => {
            if (!isLocked) {
                state.selectedDay = day;
                renderTabs();
                renderContent();
                updateProgressBar();
                updateUIVisibility();
                saveState();
            }
        };
        els.tabsContainer.appendChild(btn);
    });
};

const createExerciseHTML = (ex, isWarmup) => {
    // Uniquely identify the exercise by Week + Day + Name slug to decouple from order!
    const baseSlug = slugify(ex.name);
    const exId = `wk${currentWeekIdx}_${state.selectedDay}_${baseSlug}`;
    
    const time = state.taskTimes[exId] || 0;
    const isActive = state.activeTaskId === exId;
    const isComplete = state.taskCompleted[exId];
    
    // SMART LOOK-BACK: Pre-fill weights based on past performance for this specific exercise!
    let logObj = state.logs[exId];
    if (!logObj && !isWarmup) {
        // Loop backwards up to 4 weeks to locate history
        for (let i = 1; i <= 4; i++) {
            let prevLog = state.logs[`wk${currentWeekIdx - i}_${state.selectedDay}_${baseSlug}`];
            if (prevLog) {
                logObj = { ...prevLog }; // Clone it so changes affect the CURRENT week
                break;
            }
        }
    }
    const log = logObj || { weight: '', sets: '', repsL: '', repsR: '' };
    
    let cardClass = "relative overflow-hidden rounded-2xl transition-all duration-300 border mb-4 ";
    if (isActive) cardClass += "active-task-card";
    else if (isComplete) cardClass += "bg-slate-800/40 border-slate-700 opacity-60";
    else cardClass += "bg-slate-800 border-slate-700";

    return `
        <div id="card-${exId}" class="${cardClass}">
            ${isActive ? '<div class="absolute top-0 left-0 w-full h-1 bg-emerald-500"></div>' : ''}
            <div class="p-5">
                <div class="flex justify-between items-start mb-3">
                    <div class="flex-1 pr-4">
                        <h3 class="text-lg font-bold ${isComplete ? 'text-slate-400 line-through' : 'text-white'}">${ex.name}</h3>
                        ${isWarmup 
                            ? `<p class="text-sm text-slate-400 mt-1">${ex.details}</p>`
                            : `<div class="mt-2 space-y-1">
                                 <span class="text-sm font-medium text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-500/20"><i class="fas fa-redo-alt mr-1"></i> ${ex.sets}</span>
                                 <p class="text-xs text-slate-400 flex items-center mt-2"><i class="fas fa-dumbbell w-4"></i> ${ex.equipment}</p>
                               </div>`
                        }
                    </div>
                    <div class="flex flex-col items-end gap-2 shrink-0">
                        <div id="timer-${exId}" class="font-mono text-2xl font-bold tracking-wider ${isActive ? 'text-emerald-400' : 'text-slate-300'}">${formatTime(time)}</div>

                        <div class="flex flex-row gap-2">
                            ${ex.imgID ? `
                            <button onclick="openDemo('${exId}', '${ex.imgID}', '${ex.sets || ex.details}')" class="text-xs font-semibold flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition-colors bg-emerald-400/10 hover:bg-emerald-400/20 px-2 py-1.5 rounded-lg border border-emerald-400/20">
                                <i class="fas fa-image text-sm"></i> Demo
                            </button>
                            ` : ''}

                            ${ex.videoId ? `
                            <button onclick="openVideoModal('${ex.videoId}')" class="text-xs font-semibold flex items-center gap-1 text-red-400 hover:text-red-300 transition-colors bg-red-400/10 hover:bg-red-400/20 px-2 py-1.5 rounded-lg border border-red-400/20">
                                <i class="fab fa-youtube text-sm"></i> Tutorial
                            </button>
                            ` : ''}
                        </div>
                    </div>
                </div>

                ${!isWarmup ? `
                <div class="mt-4 pt-3 border-t border-slate-700/50 grid grid-cols-4 gap-2">
                    <div class="flex flex-col">
                        <label class="text-[10px] text-slate-400 uppercase font-bold mb-1 ml-1">Weight</label>
                        <input type="number" inputmode="decimal" value="${log.weight}" onchange="updateLog('${exId}', 'weight', this.value)" class="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-2 py-2 text-sm text-white text-center focus:outline-none focus:border-emerald-500 focus:bg-slate-900 transition-colors" placeholder="kg/lb">
                    </div>
                    <div class="flex flex-col">
                        <label class="text-[10px] text-slate-400 uppercase font-bold mb-1 ml-1">Sets</label>
                        <input type="number" inputmode="numeric" value="${log.sets}" onchange="updateLog('${exId}', 'sets', this.value)" class="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-2 py-2 text-sm text-white text-center focus:outline-none focus:border-emerald-500 focus:bg-slate-900 transition-colors" placeholder="0">
                    </div>
                    <div class="flex flex-col">
                        <label class="text-[10px] text-slate-400 uppercase font-bold mb-1 ml-1">Reps (L)</label>
                        <input type="number" inputmode="numeric" value="${log.repsL}" onchange="updateLog('${exId}', 'repsL', this.value)" class="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-2 py-2 text-sm text-white text-center focus:outline-none focus:border-emerald-500 focus:bg-slate-900 transition-colors" placeholder="0">
                    </div>
                    <div class="flex flex-col">
                        <label class="text-[10px] text-slate-400 uppercase font-bold mb-1 ml-1">Reps (R)</label>
                        <input type="number" inputmode="numeric" value="${log.repsR}" onchange="updateLog('${exId}', 'repsR', this.value)" class="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-2 py-2 text-sm text-white text-center focus:outline-none focus:border-emerald-500 focus:bg-slate-900 transition-colors" placeholder="0">
                    </div>
                </div>
                ` : ''}

                <div class="flex gap-2 mt-4 pt-4 border-t border-slate-700/50">
                    <button onclick="toggleTimer('${exId}', '${ex.imgID}', '${ex.sets || ex.details}')" id="btn-toggle-${exId}" class="flex-1 py-3 rounded-xl font-bold flex justify-center items-center gap-2 transition-all ${
                        isActive 
                            ? 'bg-amber-500/20 text-amber-500 hover:bg-amber-500/30 border border-amber-500/30' 
                            : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/20'
                    }">
                        ${isActive ? '<i class="fas fa-pause"></i> Pause' : `<i class="fas fa-play"></i> ${time > 0 ? 'Resume' : 'Start'}`}
                    </button>
                    <button onclick="toggleComplete('${exId}')" id="btn-check-${exId}" class="w-16 py-3 rounded-xl flex justify-center items-center transition-all ${
                        isComplete 
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                            : 'bg-slate-700 text-slate-400 hover:text-white hover:bg-slate-600'
                    }">
                        <i class="fas fa-check text-xl"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
};

const renderSummary = () => {
    const totalWorkouts = historyData.length;
    const totalSeconds = historyData.reduce((acc, curr) => acc + curr.duration, 0);
    const avgSeconds = totalWorkouts ? Math.round(totalSeconds / totalWorkouts) : 0;
    const totalHoursStr = (totalSeconds / 3600).toFixed(1);
    
    let html = `
        <div class="mb-6">
            <h2 class="text-2xl font-black text-white mb-1 tracking-tight flex items-center gap-2">
                <i class="fas fa-chart-pie text-blue-500"></i> Lifetime Summary
            </h2>
            <p class="text-slate-400 text-sm" onclick="openHistoryEntryModal()">Your complete historical progress and consistency.</p>
        </div>

        <div class="grid grid-cols-3 gap-3 mb-8">
            <div class="bg-slate-800 rounded-2xl p-4 border border-slate-700 text-center shadow-lg">
                <i class="fas fa-dumbbell text-emerald-500 text-xl mb-2"></i>
                <div class="text-2xl font-black text-white leading-none">${totalWorkouts}</div>
                <div class="text-[10px] uppercase font-bold text-slate-400 mt-1">Workouts</div>
            </div>
            <div class="bg-slate-800 rounded-2xl p-4 border border-slate-700 text-center shadow-lg">
                <i class="fas fa-clock text-blue-500 text-xl mb-2"></i>
                <div class="text-2xl font-black text-white leading-none">${totalHoursStr}<span class="text-sm ml-1 text-slate-400">hr</span></div>
                <div class="text-[10px] uppercase font-bold text-slate-400 mt-1">Total Time</div>
            </div>
            <div class="bg-slate-800 rounded-2xl p-4 border border-slate-700 text-center shadow-lg">
                <i class="fas fa-bolt text-amber-500 text-xl mb-2"></i>
                <div class="text-xl font-black text-white leading-none mt-1">${formatDuration(avgSeconds)}</div>
                <div class="text-[10px] uppercase font-bold text-slate-400 mt-1">Avg/Session</div>
            </div>
        </div>

        <div class="space-y-6 mb-8">
            <div class="bg-slate-800 rounded-2xl p-5 border border-slate-700 shadow-xl">
                <h3 class="text-sm font-bold text-white mb-4 flex items-center gap-2">
                    <i class="fas fa-chart-bar text-emerald-400"></i> Minutes per Session
                </h3>
                ${totalWorkouts > 0 
                    ? `<div id="bar-chart-container" class="w-full relative"></div>`
                    : `<div class="text-center py-6 text-slate-500 text-sm italic">Complete a workout to see graph.</div>`}
            </div>

            <div class="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-5 border border-slate-700 shadow-xl overflow-hidden relative">
                <div class="absolute -right-10 -top-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
                <h3 class="text-sm font-bold text-white mb-4 flex items-center gap-2 relative z-10">
                    <i class="fas fa-mountain text-blue-400"></i> Mount Recomp (Cumulative Effort)
                </h3>
                ${totalWorkouts > 0 
                    ? `<div id="area-chart-container" class="w-full relative z-10"></div>`
                    : `<div class="text-center py-6 text-slate-500 text-sm italic">Data unlocks after first workout.</div>`}
            </div>
        </div>

        <div>
            <h3 class="text-sm font-black tracking-widest text-slate-400 uppercase mb-4 flex items-center gap-2">
                <i class="fas fa-history text-slate-500"></i> Log History
            </h3>
            <div class="space-y-3">
    `;

    if (historyData.length === 0) {
        html += `<div class="text-center py-8 bg-slate-800/50 rounded-2xl border border-slate-700/50 border-dashed text-slate-500 font-medium">No completed workouts yet. Get to work!</div>`;
    } else {
        const sortedHistory = [...historyData].sort((a, b) => b.timestamp - a.timestamp);
        sortedHistory.forEach(log => {
            const dateObj = new Date(log.timestamp);
            const isToday = dateObj.toDateString() === new Date().toDateString();
            html += `
                <div onclick="openHistoryDetail('${log.id}')" class="bg-slate-800 rounded-xl p-4 border border-slate-700 flex justify-between items-center transition-all hover:border-slate-600 hover:bg-slate-700/50 cursor-pointer">
                    <div>
                        <div class="flex items-center gap-2">
                            <h4 class="font-bold text-white">${log.day}</h4>
                            ${isToday ? `<span class="bg-emerald-500/20 text-emerald-400 text-[10px] px-2 py-0.5 rounded font-bold">TODAY</span>` : ''}
                        </div>
                        <p class="text-xs text-slate-400 mt-1">${dateObj.toLocaleDateString(undefined, {weekday: 'short', month: 'short', day: 'numeric'})} • ${log.completedTasks}/${log.totalTasks} exercises</p>
                    </div>
                    <div class="flex items-center gap-4">
                        <span class="font-mono text-emerald-400 font-bold">${formatTime(log.duration)}</span>
                        <button onclick="event.stopPropagation(); confirmDeleteHistory('${log.id}')" class="w-8 h-8 rounded-full bg-red-500/10 hover:bg-red-500/20 text-red-400 flex items-center justify-center transition-colors">
                            <i class="fas fa-trash-alt text-sm"></i>
                        </button>
                    </div>
                </div>
            `;
        });
    }

    html += `</div></div>`;
    els.mainContent.innerHTML = html;

    if (totalWorkouts > 0) {
        setTimeout(() => {
            drawBarChart();
            drawAreaChart();
        }, 50); 
    }
};

const showChartTooltip = (event, text) => {
    const tooltip = d3.select("#chart-tooltip");
    tooltip.html(text)
           .style("left", (event.pageX) + "px")
           .style("top", (event.pageY - 10) + "px")
           .style("opacity", 1);
};

const hideChartTooltip = () => {
    d3.select("#chart-tooltip").style("opacity", 0);
};

const drawBarChart = () => {
    const containerId = "#bar-chart-container";
    d3.select(containerId).selectAll("*").remove();

    let data = [...historyData].sort((a, b) => a.timestamp - b.timestamp).slice(-14); 
    const chartData = data.map(d => ({
        label: new Date(d.timestamp).toLocaleDateString(undefined, {month: 'numeric', day: 'numeric'}),
        minutes: Math.round(d.duration / 60),
        fullDate: new Date(d.timestamp).toLocaleDateString()
    }));

    const margin = {top: 10, right: 0, bottom: 20, left: 25};
    const width = document.getElementById('bar-chart-container').clientWidth;
    const height = 160;

    const svg = d3.select(containerId).append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", `0 0 ${width} ${height}`)
        .style("overflow", "visible");

    const x = d3.scaleBand()
        .domain(chartData.map(d => d.label))
        .range([margin.left, width - margin.right])
        .padding(0.3);

    const y = d3.scaleLinear()
        .domain([0, d3.max(chartData, d => d.minutes) * 1.2])
        .nice()
        .range([height - margin.bottom, margin.top]);

    svg.append("g")
        .attr("class", "grid")
        .attr("transform", `translate(0,0)`)
        .call(d3.axisLeft(y).tickSize(-width + margin.left + margin.right).tickFormat("").ticks(4))
        .style("stroke-dasharray", "3,3")
        .style("stroke-opacity", 0.1)
        .selectAll("path, line").attr("stroke", "#94a3b8");

    svg.append("g")
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y).ticks(4).tickSizeOuter(0))
        .call(g => g.select(".domain").remove())
        .selectAll("text").attr("fill", "#64748b").style("font-size", "10px");

    svg.append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).tickSizeOuter(0))
        .call(g => g.select(".domain").remove())
        .selectAll("text").attr("fill", "#64748b").style("font-size", "10px");

    svg.selectAll(".bar")
        .data(chartData)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", d => x(d.label))
        .attr("y", d => y(d.minutes))
        .attr("width", x.bandwidth())
        .attr("height", d => height - margin.bottom - y(d.minutes))
        .attr("fill", "#10b981")
        .attr("rx", 3)
        .on("mouseover", function(event, d) {
            d3.select(this).attr("fill", "#34d399");
            showChartTooltip(event, `${d.fullDate}<br><span class="text-emerald-400">${d.minutes} mins</span>`);
        })
        .on("mouseout", function() {
            d3.select(this).attr("fill", "#10b981");
            hideChartTooltip();
        });
};