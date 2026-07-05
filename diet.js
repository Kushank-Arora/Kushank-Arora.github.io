// Config selector
const configSelector = document.getElementById('config-selector');
configSelector.value = localStorage.getItem('diet_profile') || 'default';
configSelector.addEventListener('change', (e) => {
    localStorage.setItem('diet_profile', e.target.value);
    window.location.reload(); 
});

DIET_DATA = DIET_OPTIONS[localStorage.getItem('diet_profile') || 'default'];

const DAYS_ORDER = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const getTodayStr = () => {
    const todayIdx = new Date().getDay(); 
    const adjustedIdx = todayIdx === 0 ? 6 : todayIdx - 1; 
    return DAYS_ORDER[adjustedIdx]; 
};

// Stores selected option ID (e.g., "m_b_1") and completed status
let state = {
    selectedDay: getTodayStr(),
    selections: {}, 
    completed: {}
};

// Initialize state defaults using Option IDs
DAYS_ORDER.forEach(day => {
    state.selections[day] = {};
    state.completed[day] = {};
    const dayData = DIET_DATA.days.find(d => d.id === day);
    if(dayData) {
        dayData.meals.forEach((meal) => {
            state.selections[day][meal.type] = meal.options[0].id; 
            state.completed[day][meal.type] = false;
        });
    }
});

// --- LocalStorage Integration ---
const STORAGE_KEY = 'dietTrackerState_v1';

function loadLocalData() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            const data = JSON.parse(stored);
            if (data.selections) {
                Object.keys(data.selections).forEach(day => {
                    state.selections[day] = { ...state.selections[day], ...data.selections[day] };
                });
            }
            if (data.completed) {
                Object.keys(data.completed).forEach(day => {
                    state.completed[day] = { ...state.completed[day], ...data.completed[day] };
                });
            }
        }
    } catch (e) {
        console.error("Failed to load local data:", e);
    }
}

function saveLocalData() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
            selections: state.selections,
            completed: state.completed
        }));
    } catch (e) {
        console.error("Failed to save local data:", e);
    }
}

// Load persisted choices immediately
loadLocalData();

// DOM Elements
const els = {
    tabsContainer: document.getElementById('tabs-container'),
    mainContent: document.getElementById('main-content'),
    progressBar: document.getElementById('progress-bar'),
    toast: document.getElementById('toast'),
    toastMsg: document.getElementById('toast-msg'),
    
    recipeModal: document.getElementById('recipe-modal'),
    recipeTitle: document.getElementById('recipe-title'),
    recipeIngredients: document.getElementById('recipe-ingredients'),
    recipeMethod: document.getElementById('recipe-method'),
    
    infoModal: document.getElementById('info-modal'),
    infoContent: document.getElementById('info-content'),
    
    groceryModal: document.getElementById('grocery-modal'),
    groceryDaysContainer: document.getElementById('grocery-days-container'),
    groceryResultArea: document.getElementById('grocery-result-area'),
    groceryListContent: document.getElementById('grocery-list-content')
};

let currentModal = null;

const openModal = (modalEl) => {
    if (!currentModal) {
        history.pushState({ modalOpen: true }, "");
    }
    modalEl.classList.remove('d-none');
    document.body.style.overflow = 'hidden'; 
    currentModal = modalEl;
};

const closeModal = (modalEl, isPopState = false) => {
    if (!modalEl.classList.contains('d-none')) {
        modalEl.classList.add('d-none');
        document.body.style.overflow = ''; 
        currentModal = null;
        
        if (!isPopState && history.state && history.state.modalOpen) {
            history.back();
        }
    }
};

window.addEventListener('popstate', (e) => {
    if (currentModal) {
        closeModal(currentModal, true);
    }
});

window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && currentModal) {
        closeModal(currentModal);
    }
});

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
    const dayData = DIET_DATA.days.find(d => d.id === state.selectedDay);
    if (!dayData) return;
    const totalMeals = dayData.meals.length;
    const completedCount = dayData.meals.filter(m => state.completed[state.selectedDay][m.type]).length;
    const percent = totalMeals === 0 ? 0 : Math.round((completedCount / totalMeals) * 100);
    els.progressBar.style.width = `${percent}%`;
};

const renderTabs = () => {
    els.tabsContainer.innerHTML = '';
    DAYS_ORDER.forEach(day => {
        const btn = document.createElement('button');
        const isSelected = state.selectedDay === day;
        btn.className = `px-5 py-2 rounded-full whitespace-nowrap text-sm font-semibold transition-all ${
            isSelected 
                ? 'bg-emerald-500 text-slate-900 shadow-md shadow-emerald-500/20' 
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white border border-slate-700'
        }`;
        btn.innerText = day;
        btn.onclick = () => {
            state.selectedDay = day;
            renderTabs();
            renderPlan();
            updateProgressBar();
        };
        els.tabsContainer.appendChild(btn);
    });
};

window.toggleOption = (mealType, optionId) => {
    state.selections[state.selectedDay][mealType] = optionId;
    renderPlan();
    saveLocalData();
};

window.toggleComplete = (mealType) => {
    state.completed[state.selectedDay][mealType] = !state.completed[state.selectedDay][mealType];
    updateProgressBar();
    renderPlan();
    saveLocalData();
    if(state.completed[state.selectedDay][mealType]) showToast('Meal marked as completed!');
};

const createMealCard = (meal) => {
    const selectedOptId = state.selections[state.selectedDay][meal.type];
    const isComplete = state.completed[state.selectedDay][meal.type];
    
    let html = `
        <div class="mb-5 bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden transition-all duration-300 ${isComplete ? 'meal-completed' : ''}">
            <div class="p-4 border-b border-slate-700/50 flex justify-between items-center bg-slate-800/80">
                <h3 class="font-bold text-white text-lg">${meal.type}</h3>
                <button onclick="toggleComplete('${meal.type}')" class="w-10 h-10 rounded-full flex justify-center items-center transition-all ${
                    isComplete 
                        ? 'bg-emerald-500 text-slate-900 shadow-lg shadow-emerald-500/20' 
                        : 'bg-slate-700 text-slate-400 hover:text-white hover:bg-slate-600'
                }">
                    <i class="fas fa-check"></i>
                </button>
            </div>
            <div class="p-4 space-y-3">
    `;

    meal.options.forEach((opt, optIdx) => {
        const isSelected = selectedOptId === opt.id;
        html += `
            <div onclick="toggleOption('${meal.type}', '${opt.id}')" class="cursor-pointer relative p-4 rounded-xl border-2 transition-all flex items-start gap-3 ${isSelected ? 'selected-option' : 'border-slate-700 bg-slate-800 hover:border-slate-600'}">
                <div class="mt-0.5 checkbox-wrapper">
                    <input type="radio" name="meal_${meal.type.replace(/\s+/g, '')}" class="hidden" ${isSelected ? 'checked' : ''}>
                    <div class="w-5 h-5 rounded-full border-2 border-slate-500 flex items-center justify-center transition-colors">
                        <div class="w-2.5 h-2.5 rounded-full bg-emerald-500 opacity-0 transition-opacity ${isSelected ? 'opacity-100' : ''}"></div>
                    </div>
                </div>
                <div class="flex-1">
                    <span class="text-xs font-bold uppercase tracking-wider ${isSelected ? 'text-emerald-400' : 'text-slate-500'} mb-1 block">Option ${optIdx + 1}</span>
                    <p class="text-sm font-medium ${isComplete ? 'text-slate-400 line-through' : 'text-slate-200'}">${opt.text}</p>
                    ${opt.recipe ? `
                        <button onclick="openRecipeModal('${opt.recipe}', event)" class="mt-3 text-xs font-semibold flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors bg-emerald-400/10 hover:bg-emerald-400/20 px-3 py-1.5 rounded-lg border border-emerald-400/20 w-fit">
                            <i class="fas fa-book-open text-sm"></i> View Recipe
                        </button>
                    ` : ''}
                </div>
            </div>
        `;
    });

    html += `
            </div>
        </div>
    `;
    return html;
};

const renderPlan = () => {
    const dayData = DIET_DATA.days.find(d => d.id === state.selectedDay);
    if (!dayData) return;

    let html = `
        <div class="mb-6 bg-gradient-to-br from-slate-800 to-slate-800/50 rounded-2xl p-5 border border-slate-700 shadow-xl">
            <h2 class="text-2xl font-black text-white mb-2 tracking-tight">${state.selectedDay}</h2>
            <div class="flex items-center gap-3 text-sm">
                <span class="flex items-center gap-1.5 px-3 py-1 rounded border font-bold ${dayData.colorClass}">
                    <i class="fas ${dayData.icon}"></i> ${dayData.title}
                </span>
            </div>
        </div>
    `;

    dayData.meals.forEach((meal) => {
        html += createMealCard(meal);
    });

    els.mainContent.innerHTML = html;
};

window.openRecipeModal = (recipeName, event) => {
    if (event) event.stopPropagation(); 
    const recipe = DIET_DATA.recipes[recipeName];
    if (!recipe) return;

    els.recipeTitle.innerHTML = `<i class="fas fa-utensils text-emerald-500"></i> ${recipeName}`;
    
    els.recipeIngredients.innerHTML = recipe.ingredients.map(ing => `<li>${ing}</li>`).join('');
    els.recipeMethod.innerHTML = recipe.method.map(step => `<li>${step}</li>`).join('');
    
    openModal(els.recipeModal);
};

window.closeRecipeModal = () => closeModal(els.recipeModal);

window.openInfoModal = () => {
    let html = `
        <div>
            <h4 class="text-xs font-black tracking-widest text-emerald-400 uppercase mb-2">Goal</h4>
            <div class="bg-slate-800 rounded-xl p-4 border border-slate-700">
                <p class="text-white font-bold mb-2">${DIET_DATA.meta.goal}</p>
                <ul class="text-sm text-slate-300 space-y-1">
                    <li>• Calories: ${DIET_DATA.meta.calories}</li>
                    <li>• Protein: ${DIET_DATA.meta.protein}</li>
                    <li>• Water: ${DIET_DATA.meta.water}</li>
                </ul>
            </div>
        </div>

        <div>
            <h4 class="text-xs font-black tracking-widest text-emerald-400 uppercase mb-2">Golden Rules</h4>
            <ul class="list-disc pl-5 text-sm text-slate-300 space-y-1">
                ${DIET_DATA.rules.map(r => `<li>${r}</li>`).join('')}
            </ul>
        </div>

        <div>
            <h4 class="text-xs font-black tracking-widest text-emerald-400 uppercase mb-2">Cooking Rules</h4>
            <ul class="list-disc pl-5 text-sm text-slate-300 space-y-1">
                ${DIET_DATA.cookingRules.map(r => `<li>${r}</li>`).join('')}
            </ul>
        </div>

        <div>
            <h4 class="text-xs font-black tracking-widest text-emerald-400 uppercase mb-2">Supplements</h4>
            <ul class="list-disc pl-5 text-sm text-slate-300 space-y-1">
                ${DIET_DATA.supplements.map(r => `<li>${r}</li>`).join('')}
            </ul>
        </div>

        <div class="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
            <h4 class="font-bold text-emerald-400 mb-2">${DIET_DATA.freeMeal.title}</h4>
            <p class="text-sm text-slate-300 leading-relaxed">${DIET_DATA.freeMeal.desc}</p>
        </div>
    `;
    els.infoContent.innerHTML = html;
    openModal(els.infoModal);
};

window.closeInfoModal = () => closeModal(els.infoModal);

window.openGroceryModal = () => {
    let html = '';
    DAYS_ORDER.forEach(day => {
        const isCurrent = day === state.selectedDay;
        html += `
            <label class="flex items-center gap-3 p-3 bg-slate-800 border border-slate-700 rounded-xl cursor-pointer hover:bg-slate-700 transition-colors">
                <input type="checkbox" value="${day}" class="grocery-day-cb w-5 h-5 accent-emerald-500" ${isCurrent ? 'checked' : ''}>
                <span class="text-sm font-semibold text-slate-200">${day}</span>
            </label>
        `;
    });
    els.groceryDaysContainer.innerHTML = html;
    els.groceryResultArea.classList.add('d-none');
    openModal(els.groceryModal);
};

window.closeGroceryModal = () => closeModal(els.groceryModal);

// Core robust logic mapping
const generateGroceryListLogic = (selectedDays) => {
    const groceryMap = new Map();

    selectedDays.forEach(day => {
        const dayData = DIET_DATA.days.find(d => d.id === day);
        if (!dayData) return;

        dayData.meals.forEach((meal) => {
            const selectedOptId = state.selections[day][meal.type];
            if (!selectedOptId) return;

            const selectedOption = meal.options.find(o => o.id === selectedOptId);
            
            if (selectedOption && selectedOption.groceries) {
                selectedOption.groceries.forEach(gItem => {
                    const key = `${gItem.item.trim().toLowerCase()}|${gItem.unit.trim().toLowerCase()}`;
                    
                    if (!groceryMap.has(key)) {
                        groceryMap.set(key, { 
                            item: gItem.item, 
                            qty: 0, 
                            unit: gItem.unit, 
                            sources: [] 
                        });
                    }
                    
                    const existingItem = groceryMap.get(key);
                    existingItem.qty += gItem.qty;
                    
                    const recipeStr = selectedOption.recipe ? `(${selectedOption.recipe})` : '';
                    existingItem.sources.push(`${day} ${meal.type} ${recipeStr} - <b class="text-emerald-400">${gItem.qty} ${gItem.unit}</b>`);
                });
            }
        });
    });

    return Array.from(groceryMap.values()).sort((a, b) => a.item.localeCompare(b.item));
};

window.generateGroceryListUI = () => {
    const checkboxes = document.querySelectorAll('.grocery-day-cb:checked');
    const selectedDays = Array.from(checkboxes).map(cb => cb.value);
    
    if (selectedDays.length === 0) {
        showToast("Please select at least one day.");
        return;
    }

    const sortedItems = generateGroceryListLogic(selectedDays);
    
    if (sortedItems.length === 0) {
        els.groceryListContent.innerHTML = `<p class="text-slate-400 italic">No groceries found for selections.</p>`;
    } else {
        let listHtml = `<ul class="space-y-3">`;
        sortedItems.forEach((g, idx) => {
            const safeKey = 'grocery_item_' + idx;
            listHtml += `
                <li class="border-b border-slate-700/50 pb-3 last:border-0 last:pb-0 flex flex-col group">
                    <div class="flex justify-between items-center cursor-pointer py-1" onclick="toggleGroceryDetails('${safeKey}')">
                        <span class="text-slate-200 font-medium group-hover:text-emerald-400 transition-colors select-none grocery-item-name flex items-center gap-1.5">
                            <i class="fas fa-chevron-right text-[10px] text-slate-500 transition-transform duration-200" id="icon-${safeKey}"></i> 
                            ${g.item}
                        </span>
                        <span class="text-xs bg-slate-900 text-slate-400 px-2 py-1 rounded-md border border-slate-700 font-bold grocery-item-qty">${g.qty} ${g.unit}</span>
                    </div>
                    <div id="details-${safeKey}" class="d-none mt-2 pl-4 border-l-2 border-emerald-500/30 text-xs text-slate-400 space-y-1.5">
                        ${g.sources.map(u => `<div><span class="text-emerald-500/70 mr-1">•</span>${u}</div>`).join('')}
                    </div>
                </li>`;
        });
        listHtml += `</ul>`;
        els.groceryListContent.innerHTML = listHtml;
    }

    els.groceryResultArea.classList.remove('d-none');
};

window.toggleGroceryDetails = (key) => {
    const detailsEl = document.getElementById(`details-${key}`);
    const iconEl = document.getElementById(`icon-${key}`);
    if (detailsEl) {
        detailsEl.classList.toggle('d-none');
        if (detailsEl.classList.contains('d-none')) {
            iconEl.classList.remove('rotate-90', 'text-emerald-400');
        } else {
            iconEl.classList.add('rotate-90', 'text-emerald-400');
        }
    }
};

window.copyGroceryList = async () => {
    const names = document.querySelectorAll('.grocery-item-name');
    const qtys = document.querySelectorAll('.grocery-item-qty');
    let text = "🛒 My Grocery List:\n\n";
    names.forEach((nameEl, idx) => {
        const itemName = nameEl.textContent.trim();
        text += `• ${itemName} - ${qtys[idx].innerText}\n`;
    });

    try {
        await navigator.clipboard.writeText(text);
        showToast('List copied to clipboard!');
    } catch (err) {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        textArea.remove();
        showToast('List copied to clipboard!');
    }
};


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

// Initialize UI
renderTabs();
renderPlan();
updateProgressBar();


