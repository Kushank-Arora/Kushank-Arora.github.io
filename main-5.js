

// --- Demo Functionality ---

const elsDemo = {
    modal: document.getElementById('demo-modal'),
    image: document.getElementById('demo-image'),
    stats: document.getElementById('demo-stats'),
    closeBtn: document.getElementById('btn-close-demo')
};

const loadDemoImage = (imgId) => {
    const img = document.getElementById('demo-image');
    
    // 1. Try PNG first
    img.src = `exercises/${imgId}.png`; 

    // 2. If PNG fails, try GIF
    img.onerror = () => {
        // If we were already trying the GIF and it failed, stop
        if (img.src.endsWith('.gif')) {
            console.warn('Demo image not found for:', imgId);
            return;
        }
        // Switch to GIF
        img.src = `exercises/${imgId}.gif`;
        // Clear error handler so we don't loop
        img.onerror = null; 
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