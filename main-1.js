// Config selector
const configSelector = document.getElementById('config-selector');
configSelector.value = localStorage.getItem('gym_profile') || 'default';
configSelector.addEventListener('change', (e) => {
    localStorage.setItem('gym_profile', e.target.value);
    window.location.reload(); 
});


let WORKOUT_PLAN = {};

// Calculate ISO Week number (used for unique weight tracking per week)
const getWeekNumber = (d) => {
    const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay()||7));
    const yearStart = new Date(Date.UTC(date.getUTCFullYear(),0,1));
    return Math.ceil(( ( (date - yearStart) / 86400000) + 1)/7);
};

// Converts strings like "Barbell Bench Press" to "barbell-bench-press"
const slugify = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

const currentWeekIdx = getWeekNumber(new Date());
const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const getTodayStr = () => {
    const today = DAYS[new Date().getDay()];
    if (WORKOUT_PLAN[today]) return today;
    // Fallback to first available configured day if today isn't in JSON
    const availableDays = Object.keys(WORKOUT_PLAN);
    return availableDays.length > 0 ? availableDays[0] : 'Summary'; 
};

// --- APP STATE ---
let state = {
    sessionId: null, 
    selectedDay: null, // Will be set after config loads
    sessionStatus: 'idle', 
    isShareVisible: false, 
    firstStartTime: null,
    finishTime: null,
    sessionStartTime: null,
    accumulatedTime: 0,
    activeTaskId: null,
    taskTimes: {}, 
    taskCompleted: {}, 
    logs: {},
    timerInterval: null
};

let historyData = []; 
let sessionToDelete = null; 
let sessionInterval = null; 

const STORAGE_KEY = 'recomp_tracker_dynamic_v1';
const HISTORY_KEY = 'recomp_tracker_history';

// --- DOM ELEMENTS ---
const els = {
    tabsContainer: document.getElementById('tabs-container'),
    mainContent: document.getElementById('main-content'),
    progressBar: document.getElementById('progress-bar'),
    progressBarContainer: document.getElementById('progress-bar-container'),
    sessionBadge: document.getElementById('session-badge'),
    sessionTimeInfo: document.getElementById('session-time-info'),
    uiStartTime: document.getElementById('ui-start-time'),
    sessionTimer: document.getElementById('session-timer'),
    badgeStatus: document.getElementById('session-badge-status'),
    badgePingContainer: document.getElementById('session-badge-ping-container'),
    badgeText: document.getElementById('session-badge-text'),
    badgeDot: document.getElementById('session-badge-dot'),
    
    bottomBar: document.getElementById('bottom-bar'),
    btnStart: document.getElementById('btn-start-session'),
    btnEnd: document.getElementById('btn-end-session'),
    btnShare: document.getElementById('btn-share-session'),
    btnResumeMain: document.getElementById('btn-resume-main'),
    btnReset: document.getElementById('btn-reset-session'),
    
    videoModal: document.getElementById('video-modal'),
    videoIframe: document.getElementById('video-iframe'),
    fallbackYoutubeLink: document.getElementById('fallback-youtube-link'),
    btnCloseVideo: document.getElementById('btn-close-video'),
    
    confirmModal: document.getElementById('confirm-modal'),
    btnConfirmReset: document.getElementById('btn-confirm-reset'),
    btnCancelReset: document.getElementById('btn-cancel-reset'),

    deleteHistoryModal: document.getElementById('delete-history-modal'),
    btnConfirmDelete: document.getElementById('btn-confirm-delete'),
    btnCancelDelete: document.getElementById('btn-cancel-delete'),
    
    summaryModal: document.getElementById('summary-modal'),
    summaryTime: document.getElementById('summary-total-time'),
    summaryBox: document.getElementById('summary-text-box'),
    btnCloseSummary: document.getElementById('btn-close-summary'),
    btnWhatsapp: document.getElementById('btn-whatsapp'),
    btnCopy: document.getElementById('btn-copy'),
    btnResumeModal: document.getElementById('btn-resume-modal'),

    historyDetailModal: document.getElementById('history-detail-modal'),
    btnCloseHistoryDetail: document.getElementById('btn-close-history-detail'),
    historyDetailDate: document.getElementById('history-detail-date'),
    historyDetailTextBox: document.getElementById('history-detail-text-box'),
    btnHistoryWhatsapp: document.getElementById('btn-history-whatsapp'),
    btnHistoryCopy: document.getElementById('btn-history-copy'),
    
    toast: document.getElementById('toast'),
    toastMsg: document.getElementById('toast-msg')
};

async function initApp() {
    // Retrieve saved profile or default to 'default'
    const savedProfile = localStorage.getItem('gym_profile') || 'default';
    const data = appConfigs[savedProfile]; // Using the object from main-config.js

    WORKOUT_PLAN = data.plan;

    state.selectedDay = getTodayStr();
    
    loadState();
    updateUIVisibility();
    renderTabs();
    renderContent();
    updateProgressBar();
}

const generateId = () => Math.random().toString(36).substr(2, 9) + Date.now().toString(36);

const saveState = () => {
    const dataToSave = {
        date: new Date().toDateString(),
        state: {
            sessionId: state.sessionId,
            selectedDay: state.selectedDay,
            sessionStatus: state.sessionStatus,
            isShareVisible: state.isShareVisible,
            firstStartTime: state.firstStartTime,
            finishTime: state.finishTime,
            sessionStartTime: state.sessionStartTime,
            accumulatedTime: state.accumulatedTime,
            taskTimes: state.taskTimes,
            taskCompleted: state.taskCompleted,
            logs: state.logs
        }
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
};

const loadState = () => {
    const savedHistory = localStorage.getItem(HISTORY_KEY);
    if (savedHistory) {
        try { historyData = JSON.parse(savedHistory); } catch(e) { console.error(e); }
    }

    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        try { 
            const parsed = JSON.parse(saved);
            if (parsed.date === new Date().toDateString()) {
                state = { ...state, ...parsed.state };
                state.activeTaskId = null; // Prevent auto-start on refresh
                
                // Validate selectedDay exists in config after JSON reload
                if (!WORKOUT_PLAN[state.selectedDay] && state.selectedDay !== 'Summary') {
                    state.selectedDay = getTodayStr(); 
                }

                if (state.sessionStatus === 'active') {
                    startGlobalTimer();
                } else if (state.sessionStatus === 'finished') {
                    updateSessionTimerUI();
                }
            } else {
                // New day, wipe state but preserve the logs globally
                const previousLogs = parsed.state?.logs || {};
                state.logs = previousLogs; // Retain logs across days to enable the look-back feature
                localStorage.removeItem(STORAGE_KEY);
            }
        } catch(e) { console.error(e); }
    }
};

const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return "00:00";
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
};

const formatDuration = (seconds) => {
    if (!seconds) return "0s";
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return m > 0 ? `${m}m ${s}s` : `${s}s`;
};

const formatDateTimeFull = (isoString) => {
    if (!isoString) return '';
    const d = new Date(isoString);
    return d.toLocaleString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute:'2-digit' });
};

const formatTimeOnly = (isoString) => {
    if (!isoString) return '';
    const d = new Date(isoString);
    return d.toLocaleTimeString(undefined, { hour: '2-digit', minute:'2-digit' });
};

const showToast = (msg) => {
    els.toastMsg.innerText = msg;
    els.toast.classList.remove('opacity-0', '-translate-y-4');
    els.toast.classList.add('opacity-100', 'translate-y-0');
    setTimeout(() => {
        els.toast.classList.add('opacity-0', '-translate-y-4');
        els.toast.classList.remove('opacity-100', 'translate-y-0');
    }, 3000);
};

const updateProgressBar = () => {
    if (state.selectedDay === 'Summary') {
        els.progressBarContainer.classList.add('opacity-0');
        return;
    }
    els.progressBarContainer.classList.remove('opacity-0');
    
    const plan = WORKOUT_PLAN[state.selectedDay];
    if (!plan) return;
    const totalTasks = plan.warmup.length + plan.exercises.length;
    const completedCount = Object.values(state.taskCompleted).filter(Boolean).length;
    const percent = totalTasks === 0 ? 0 : Math.round((completedCount / totalTasks) * 100);
    els.progressBar.style.width = `${percent}%`;
};

const updateUIVisibility = () => {
    els.btnStart.classList.add('d-none');
    els.btnEnd.classList.add('d-none');
    els.btnShare.classList.add('d-none');
    els.btnResumeMain.classList.add('d-none');
    els.btnReset.classList.add('d-none');
    els.sessionBadge.classList.add('d-none');
    els.sessionTimeInfo.classList.add('d-none');

    if (state.selectedDay === 'Summary') {
        els.bottomBar.classList.add('translate-y-[150%]');
    } else {
        els.bottomBar.classList.remove('translate-y-[150%]');
        
        if (state.firstStartTime) {
            els.sessionTimeInfo.classList.remove('d-none');
            els.uiStartTime.innerText = formatTimeOnly(state.firstStartTime);
        }

        if (state.sessionStatus === 'idle') {
            els.btnStart.classList.remove('d-none');
            els.tabsContainer.querySelectorAll('button').forEach(b => b.classList.remove('opacity-50', 'cursor-not-allowed'));
        } 
        else if (state.sessionStatus === 'active') {
            els.btnEnd.classList.remove('d-none');
            els.btnReset.classList.remove('d-none');
            
            els.sessionBadge.classList.remove('d-none');
            els.badgePingContainer.classList.remove('d-none');
            els.badgeDot.classList.replace('bg-slate-400', 'bg-emerald-500');
            els.badgeText.innerText = 'Active';
            els.badgeText.classList.replace('text-slate-400', 'text-emerald-400');
            els.sessionTimer.classList.replace('text-slate-400', 'text-emerald-400');
            
            els.tabsContainer.querySelectorAll('button').forEach(b => {
                b.classList.add('opacity-50', 'cursor-not-allowed');
            });
        } 
        else if (state.sessionStatus === 'finished') {
            els.btnShare.classList.remove('d-none');
            els.btnResumeMain.classList.remove('d-none');
            els.btnReset.classList.remove('d-none');
            
            els.sessionBadge.classList.remove('d-none');
            els.badgePingContainer.classList.add('d-none');
            els.badgeDot.classList.replace('bg-emerald-500', 'bg-slate-400');
            els.badgeText.innerText = 'Finished';
            els.badgeText.classList.replace('text-emerald-400', 'text-slate-400');
            els.sessionTimer.classList.replace('text-emerald-400', 'text-slate-400');
            
            els.tabsContainer.querySelectorAll('button').forEach(b => {
                if(b.innerText !== 'Summary') b.classList.add('opacity-50', 'cursor-not-allowed');
            });
        }
    }

    if (state.isShareVisible) {
        populateSummaryModal(); 
        els.summaryModal.classList.remove('d-none');
    } else {
        els.summaryModal.classList.add('d-none');
    }
};
