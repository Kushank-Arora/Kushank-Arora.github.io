

const generateSummaryText = () => {
    const totalSeconds = getTotalSessionSeconds();
    const plan = WORKOUT_PLAN[state.selectedDay];
    if (!plan) return "Session completed!";
    
    let text = `🏋️ *Workout Summary: ${state.selectedDay}* (${plan.location})\n`;
    if (state.firstStartTime) text += `📅 *Started:* ${formatDateTimeFull(state.firstStartTime)}\n`;
    if (state.finishTime) text += `🏁 *Finished:* ${formatDateTimeFull(state.finishTime)}\n`;
    text += `🕒 *Total Active Time:* ${formatDuration(totalSeconds)}\n\n`;
    
    text += `🔥 *Warm-up*\n`;
    plan.warmup.forEach(ex => {
        const exId = `wk${currentWeekIdx}_${state.selectedDay}_${slugify(ex.name)}`;
        const time = state.taskTimes[exId] || 0;
        const status = state.taskCompleted[exId] ? '✅' : (time > 0 ? '⏳' : '❌');
        text += `${status} ${ex.name}: ${formatDuration(time)}\n`;
    });

    text += `\n💪 *Main Workout: ${plan.focus}*\n`;
    plan.exercises.forEach(ex => {
        const exId = `wk${currentWeekIdx}_${state.selectedDay}_${slugify(ex.name)}`;
        const time = state.taskTimes[exId] || 0;
        const status = state.taskCompleted[exId] ? '✅' : (time > 0 ? '⏳' : '❌');
        
        let logStr = '';
        if (state.logs[exId]) {
            const { weight, sets, repsL, repsR } = state.logs[exId];
            let details = [];
            if (weight) details.push(`${weight} lb/kg`);
            if (sets) details.push(`${sets} sets`);
            if (repsL || repsR) {
                if (repsL && repsR) details.push(`${repsL}L / ${repsR}R reps`);
                else if (repsL) details.push(`${repsL} reps`);
                else if (repsR) details.push(`${repsR} reps`);
            }
            if (details.length > 0) logStr = ` [${details.join(' | ')}]`;
        }
        text += `${status} ${ex.name}: ${formatDuration(time)}${logStr}\n`;
    });

    text += `\nGreat job today! Keep pushing! 🚀`;
    return text;
};

const populateSummaryModal = () => {
    els.summaryTime.innerText = formatDuration(getTotalSessionSeconds());
    els.summaryBox.innerText = generateSummaryText();
};

els.btnWhatsapp.onclick = () => {
    const text = encodeURIComponent(generateSummaryText());
    window.open(`https://wa.me/?text=${text}`, '_blank');
};

els.btnCopy.onclick = async () => {
    const text = generateSummaryText();
    try {
        await navigator.clipboard.writeText(text);
        showToast('Summary copied to clipboard!');
    } catch (err) {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        textArea.remove();
        showToast('Summary copied to clipboard!');
    }
};

window.openHistoryDetail = (id) => {
    const log = historyData.find(h => h.id === id);
    if (!log) return;
    
    const dateObj = new Date(log.timestamp);
    els.historyDetailDate.innerText = dateObj.toLocaleDateString(undefined, {weekday: 'short', month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute:'2-digit'});
    
    const textContent = log.summaryText || "Detailed text summary is not available for this older session.";
    els.historyDetailTextBox.innerText = textContent;
    
    els.btnHistoryWhatsapp.onclick = () => {
        const text = encodeURIComponent(textContent);
        window.open(`https://wa.me/?text=${text}`, '_blank');
    };
    
    els.btnHistoryCopy.onclick = async () => {
        try {
            await navigator.clipboard.writeText(textContent);
            showToast('Log copied to clipboard!');
        } catch (err) {
            const textArea = document.createElement("textarea");
            textArea.value = textContent;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            textArea.remove();
            showToast('Log copied to clipboard!');
        }
    };
    
    els.historyDetailModal.classList.remove('d-none');
};

els.btnCloseHistoryDetail.onclick = () => {
    els.historyDetailModal.classList.add('d-none');
};

els.btnReset.onclick = () => { els.confirmModal.classList.remove('d-none'); };
els.btnCancelReset.onclick = () => { els.confirmModal.classList.add('d-none'); };
els.btnConfirmReset.onclick = () => {
    stopTaskTimerInterval();
    if (sessionInterval) clearInterval(sessionInterval);
    
    state = {
        sessionId: null, 
        selectedDay: state.selectedDay,
        sessionStatus: 'idle',
        isShareVisible: false,
        firstStartTime: null,
        finishTime: null,
        sessionStartTime: null,
        accumulatedTime: 0,
        activeTaskId: null,
        taskTimes: {},
        taskCompleted: {},
        logs: state.logs, // CRITICAL: Retain the logged weights entirely!
        timerInterval: null
    };
    
    saveState();
    els.sessionTimer.innerText = "00:00";
    
    updateUIVisibility();
    updateProgressBar();
    renderTabs();
    renderContent();
    els.confirmModal.classList.add('d-none');
    showToast('Session reset (Logs saved)');
};

window.confirmDeleteHistory = (id) => {
    sessionToDelete = id;
    els.deleteHistoryModal.classList.remove('d-none');
};

els.btnCancelDelete.onclick = () => {
    sessionToDelete = null;
    els.deleteHistoryModal.classList.add('d-none');
};

els.btnConfirmDelete.onclick = () => {
    if (sessionToDelete) {
        historyData = historyData.filter(log => log.id !== sessionToDelete);
        localStorage.setItem(HISTORY_KEY, JSON.stringify(historyData));
        els.deleteHistoryModal.classList.add('d-none');
        renderSummary(); 
        showToast('Workout log deleted.');
        sessionToDelete = null;
    }
};

window.addEventListener('resize', () => {
    if (state.selectedDay === 'Summary' && historyData.length > 0) {
        drawBarChart();
        drawAreaChart();
    }
});

// Initialize application workflow upon DOM ready
window.addEventListener('DOMContentLoaded', initApp);