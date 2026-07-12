

// --- Demo Functionality ---

const elsDemo = {
    modal: document.getElementById('demo-modal'),
    image: document.getElementById('demo-image'),
    stats: document.getElementById('demo-stats'),
    timer: document.getElementById('demo-modal-timer'),
    closeBtn: document.getElementById('btn-close-demo')
};

const loadDemoImage = (imgId) => {
    const img = document.getElementById('demo-image');
    
    // 1. Try PNG first
    img.src = `exercises/${imgId}.png`; 

    // 2. If PNG fails, try GIF
    img.onerror = () => {
        // If we were already trying the GIF and it failed, stop
        if (img.src.endsWith('.png')) {
            img.src = `exercises/${imgId}.jpg`;
        } else if (img.src.endsWith('.jpg')) {
            img.src = `exercises/${imgId}.jpeg`;
        } else if (img.src.endsWith('.jpeg')) {
            img.src = `exercises/${imgId}.gif`;
        } else {
            console.warn('Demo image not found for:', imgId);
            // Clear error handler so we don't loop
            img.onerror = null;
        }
    };
};

// Open Demo
window.openDemo = (exId, imgID, targetSets) => {
    const log = state.logs[exId] || { weight: '-', sets: '-', repsL: '-', repsR: '-' };
    
    // Update Image (Assuming files named by slugified name)
    elsDemo.image.src = `exercises/${imgID}.png`;
    
    // Update Stats
    elsDemo.stats.innerHTML = `
        <div class="text-slate-400 font-bold uppercase tracking-widest text-sm mb-2">Sets Goal</div>
        <div class="text-white text-5xl font-black mb-6">${targetSets || '-'}</div>
        <div class="grid grid-cols-3 gap-4 text-center">
            <div class="bg-slate-800 p-4 rounded-xl"><div class="text-slate-500 text-xs">Weight</div><div class="text-2xl font-bold">${log.weight || '-'}</div></div>
            <div class="bg-slate-800 p-4 rounded-xl"><div class="text-slate-500 text-xs">Sets</div><div class="text-2xl font-bold">${log.sets || '-'}</div></div>
            <div class="bg-slate-800 p-4 rounded-xl"><div class="text-slate-500 text-xs">Reps (L/R)</div><div class="text-2xl font-bold">${log.repsL || '-'}/${log.repsR || '-'}</div></div>
        </div>
    `;

    const time = state.taskTimes[exId] || 0;

    elsDemo.timer.innerText = formatTime(time);
    elsDemo.timer.className = `timer-${exId}`;
    loadDemoImage(imgID);
    window.openModal('demo-modal');
};

elsDemo.closeBtn.onclick = () => {
    window.closeModal('demo-modal');

    const img = document.getElementById('demo-image');
    img.src = ``; 
}

// --- Back Press Logic ---

// Listen for back button press
window.addEventListener('popstate', () => {
    closeAllModals();
});

const closeAllModals = () => {
    // 1. List all your modal IDs here
    const modalIds = ['video-modal', 'demo-modal'];
    
    modalIds.forEach(id => {
        const el = document.getElementById(id);
        if (el && !el.classList.contains('d-none')) {
            el.classList.add('d-none');
        }
    });

    // 2. Reset any UI state flags (like share modal)
    if (typeof state !== 'undefined') {
        state.isShareVisible = false;
        updateUIVisibility();
    }
};

// --- Helper to open modals safely ---
// Call this function whenever you open ANY modal in your code
window.openModal = (modalId) => {
    document.getElementById(modalId).classList.remove('d-none');
    history.pushState({ modalOpen: true }, ''); // Push state so "Back" triggers popstate
};

// --- Helper to close modals safely ---
// Call this function whenever you close ANY modal (via 'X' button)
window.closeModal = (modalId) => {
    document.getElementById(modalId).classList.add('d-none');
    if (history.state && history.state.modalOpen) {
        history.back(); // Go back to remove the pushed state
    }
};

function maybeUpdateStateBasedOnQueryParams() {
    /// Respecting query params
    window.switchApp = (page) => {
        // Grab the current day from state, fallback to Monday if missing
        const day = state.selectedDay || 'Monday';
        window.location.href = `${page}?day=${encodeURIComponent(day)}`;
    };

    // Also add this to the top of main-1.js to read the param on load
    const urlParams = new URLSearchParams(window.location.search);
    const dayParam = urlParams.get('day');
    if (dayParam) {
        state.selectedDay = dayParam;
    }
}


// History modal thingy
// 1. Open the modal (trigger this from your UI, e.g., a "History" button click)
function openHistoryEntryModal() {
    document.getElementById('history-entry-modal').classList.remove('d-none');
}

// 2. Save logic
document.getElementById('btn-save-history-entry').addEventListener('click', () => {
    const dateVal = document.getElementById('history-date').value;
    const durationMins = parseInt(document.getElementById('history-duration').value) || 0;
    
    const entry = {
        id: generateId(),
        day: document.getElementById('history-category').value,
        timestamp: new Date(dateVal).getTime(),
        duration: durationMins * 60, // Convert to seconds for your logic
        totalTasks: parseInt(document.getElementById('history-tasks').value) || 0,
        completedTasks: parseInt(document.getElementById('history-tasks').value) || 0, // Assuming all entered are done
        content: document.getElementById('history-raw-msg').value
    };

    // Update global state
    historyData.push(entry);
    historyData.sort((a, b) => b.timestamp - a.timestamp);
    localStorage.setItem(HISTORY_KEY+"backup", localStorage.getItem(HISTORY_KEY))
    localStorage.setItem(HISTORY_KEY, JSON.stringify(historyData));
    
    // UI Cleanup
    document.getElementById('history-entry-modal').classList.add('d-none');
    showToast("History entry saved!");
    
    // Refresh the Summary view if we are on it
    if (state.selectedDay === 'Summary') {
        renderSummary();
    }
});