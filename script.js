// Estado global de la aplicación
let appState = {
    currentUser: {
        id: 1,
        name: "Tu Avatar",
        level: 1,
        xp: 0,
        maxXP: 100,
        streak: 3,
        totalWorkouts: 0,
        avatar: "💪",
        title: "Guerrero Novato"
    },
    workoutLog: [],
    selectedWorkout: null,
    currentView: 'home'
};

// Tipos de entrenamientos disponibles
const workoutTypes = [
    { id: 1, name: "Cardio", icon: "🏃‍♂️", baseXP: 15, color: "bg-red-500" },
    { id: 2, name: "Pesas", icon: "🏋️‍♂️", baseXP: 20, color: "bg-blue-500" },
    { id: 3, name: "Yoga", icon: "🧘‍♀️", baseXP: 10, color: "bg-green-500" },
    { id: 4, name: "Natación", icon: "🏊‍♂️", baseXP: 25, color: "bg-cyan-500" },
    { id: 5, name: "Ciclismo", icon: "🚴‍♂️", baseXP: 18, color: "bg-yellow-500" },
    { id: 6, name: "Boxeo", icon: "🥊", baseXP: 22, color: "bg-orange-500" }
];

// Leaderboard simulado
const getLeaderboard = () => [
    { id: 2, name: "Ana García", level: 15, xp: 2450, avatar: "👑", streak: 21 },
    { id: 3, name: "Carlos López", level: 12, xp: 1890, avatar: "⚡", streak: 14 },
    { id: 4, name: "María Silva", level: 10, xp: 1456, avatar: "🔥", streak: 8 },
    { id: appState.currentUser.id, name: appState.currentUser.name, level: appState.currentUser.level, xp: appState.currentUser.xp, avatar: appState.currentUser.avatar, streak: appState.currentUser.streak },
    { id: 5, name: "Pedro Ruiz", level: 8, xp: 987, avatar: "💎", streak: 5 }
].sort((a, b) => b.xp - a.xp);

// Logros disponibles
const achievements = [
    { id: 1, name: "Primera Victoria", description: "Completa tu primer entrenamiento", icon: "🏆" },
    { id: 2, name: "Racha de Fuego", description: "7 días consecutivos entrenando", icon: "🔥" },
    { id: 3, name: "Centurión", description: "Alcanza 100 entrenamientos", icon: "⚡" },
    { id: 4, name: "Maestro del Gimnasio", description: "Alcanza nivel 10", icon: "👑" }
];

// Utilidades
function getTitleByLevel(level) {
    if (level >= 20) return "Leyenda Inmortal";
    if (level >= 15) return "Maestro Supremo";
    if (level >= 10) return "Guerrero Elite";
    if (level >= 5) return "Luchador Veterano";
    return "Guerrero Novato";
}

function getProgressPercentage() {
    return appState.currentUser.xp % 100;
}

function isAchievementUnlocked(achievement) {
    switch(achievement.id) {
        case 1: return appState.currentUser.totalWorkouts > 0;
        case 2: return appState.currentUser.streak >= 7;
        case 3: return appState.currentUser.totalWorkouts >= 100;
        case 4: return appState.currentUser.level >= 10;
        default: return false;
    }
}

// Funciones de renderizado
function updateHeroCard() {
    document.getElementById('userAvatar').textContent = appState.currentUser.avatar;
    document.getElementById('userName').textContent = appState.currentUser.name;
    document.getElementById('userTitle').textContent = getTitleByLevel(appState.currentUser.level);
    
    const xpFill = document.getElementById('xpFill');
    xpFill.style.width = `${getProgressPercentage()}%`;
    
    document.getElementById('xpText').textContent = 
        `Nivel ${appState.currentUser.level} • ${appState.currentUser.xp % 100}/100 XP`;
}

function updateStats() {
    document.getElementById('totalWorkouts').textContent = appState.currentUser.totalWorkouts;
    document.getElementById('userStreak').textContent = appState.currentUser.streak;
    
    const leaderboard = getLeaderboard();
    const userRank = leaderboard.findIndex(u => u.id === appState.currentUser.id) + 1;
    document.getElementById('userRank').textContent = `#${userRank}`;
}

function renderWorkouts() {
    const container = document.getElementById('workoutsGrid');
    container.innerHTML = '';
    
    workoutTypes.forEach(workout => {
        const card = document.createElement('div');
        card.className = 'workout-card';
        card.innerHTML = `
            <div class="workout-icon">${workout.icon}</div>
            <h4>${workout.name}</h4>
            <p>+${workout.baseXP} XP base</p>
        `;
        card.addEventListener('click', () => openWorkoutModal(workout));
        container.appendChild(card);
    });
}

function renderLeaderboard() {
    const container = document.getElementById('leaderboardList');
    container.innerHTML = '';
    
    const leaderboard = getLeaderboard();
    
    leaderboard.forEach((user, index) => {
        const item = document.createElement('div');
        item.className = `leaderboard-item ${user.id === appState.currentUser.id ? 'current-user' : ''}`;
        
        let rankBadge = '';
        if (index === 0) rankBadge = '<div class="rank-badge gold">👑</div>';
        else if (index === 1) rankBadge = '<div class="rank-badge silver">🥈</div>';
        else if (index === 2) rankBadge = '<div class="rank-badge bronze">🥉</div>';
        else rankBadge = `<div class="rank-badge">#${index + 1}</div>`;
        
        item.innerHTML = `
            ${rankBadge}
            <div class="leaderboard-avatar">${user.avatar}</div>
            <div class="leaderboard-info">
                <h3>${user.name}</h3>
                <p>Nivel ${user.level} • ${user.xp} XP • ${user.streak} días</p>
            </div>
            <div class="leaderboard-xp">
                <div class="xp-value">${user.xp}</div>
                <div class="xp-label">XP</div>
            </div>
        `;
        container.appendChild(item);
    });
}

function renderAchievements() {
    const container = document.getElementById('achievementsGrid');
    container.innerHTML = '';
    
    achievements.forEach(achievement => {
        const card = document.createElement('div');
        const unlocked = isAchievementUnlocked(achievement);
        card.className = `achievement-card ${unlocked ? 'unlocked' : 'locked'}`;
        
        card.innerHTML = `
            <div class="achievement-icon">${achievement.icon}</div>
            <h4>${achievement.name}</h4>
            <p>${achievement.description}</p>
        `;
        container.appendChild(card);
    });
}

function renderWorkoutHistory() {
    const container = document.getElementById('workoutHistory');
    
    if (appState.workoutLog.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <p>¡Completa tu primer entrenamiento!</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = '';
    const recentWorkouts = appState.workoutLog.slice(0, 5);
    
    recentWorkouts.forEach(workout => {
        const item = document.createElement('div');
        item.className = 'workout-history-item';
        
        item.innerHTML = `
            <div class="history-icon">${workout.icon}</div>
            <div class="history-info">
                <h4>${workout.type}</h4>
                <p>${workout.date} • ${workout.duration} min</p>
            </div>
            <div class="history-xp">+${workout.xpGained} XP</div>
        `;
        container.appendChild(item);
    });
}

// Funciones del modal de entrenamiento
function openWorkoutModal(workout) {
    appState.selectedWorkout = workout;
    
    document.getElementById('modalIcon').textContent = workout.icon;
    document.getElementById('modalTitle').textContent = workout.name;
    
    // Resetear duración a 30
    document.getElementById('durationValue').textContent = '30';
    updateXPPreview();
    
    document.getElementById('workoutModal').classList.add('active');
}

function closeWorkoutModal() {
    document.getElementById('workoutModal').classList.remove('active');
    appState.selectedWorkout = null;
}

function updateXPPreview() {
    if (!appState.selectedWorkout) return;
    
    const duration = parseInt(document.getElementById('durationValue').textContent);
    const xpGained = Math.floor(appState.selectedWorkout.baseXP * (duration / 30));
    
    document.getElementById('xpPreview').innerHTML = `<strong>Ganarás: ${xpGained} XP</strong>`;
}

function completeWorkout() {
    if (!appState.selectedWorkout) return;
    
    const duration = parseInt(document.getElementById('durationValue').textContent);
    const xpGained = Math.floor(appState.selectedWorkout.baseXP * (duration / 30));
    const oldLevel = appState.currentUser.level;
    const newXP = appState.currentUser.xp + xpGained;
    const newLevel = Math.floor(newXP / 100) + 1;
    
    // Crear nuevo registro de entrenamiento
    const newWorkout = {
        id: Date.now(),
        type: appState.selectedWorkout.name,
        icon: appState.selectedWorkout.icon,
        duration: duration,
        xpGained: xpGained,
        date: new Date().toLocaleDateString('es-ES'),
        time: new Date().toLocaleTimeString('es-ES')
    };
    
    // Actualizar estado del usuario
    appState.workoutLog.unshift(newWorkout);
    appState.currentUser.xp = newXP;
    appState.currentUser.level = newLevel;
    appState.currentUser.totalWorkouts += 1;
    appState.currentUser.streak += Math.random() > 0.3 ? 1 : 0; // Simulación de racha
    appState.currentUser.title = getTitleByLevel(newLevel);
    
    // Cerrar modal
    closeWorkoutModal();
    
    // Actualizar UI
    updateHeroCard();
    updateStats();
    
    // Re-renderizar si estamos en las vistas correspondientes
    if (appState.currentView === 'progress') {
        renderWorkoutHistory();
        renderAchievements();
    }
    if (appState.currentView === 'leaderboard') {
        renderLeaderboard();
    }
    
    // Mostrar level up si corresponde
    if (newLevel > oldLevel) {
        setTimeout(() => showLevelUpModal(newLevel), 500);
        vibrate(); // Vibración en móviles
    }
    
    // Mostrar notificación
    showNotification(`¡Ganaste ${xpGained} XP! 🎉`, 'success');
    
    // Guardar en localStorage (descomentado para funcionar)
    saveAppState();
}

function showLevelUpModal(newLevel) {
    document.getElementById('levelUpText').textContent = `¡Ahora eres nivel ${newLevel}!`;
    document.getElementById('levelUpModal').classList.add('active');
}

function closeLevelUpModal() {
    document.getElementById('levelUpModal').classList.remove('active');
}

// Navegación entre vistas
function switchView(viewName) {
    // Actualizar estado
    appState.currentView = viewName;
    
    // Ocultar todas las vistas
    document.querySelectorAll('.view').forEach(view => {
        view.classList.remove('active');
    });
    
    // Mostrar vista actual
    document.getElementById(viewName + 'View').classList.add('active');
    
    // Actualizar navegación
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-view="${viewName}"]`).classList.add('active');
    
    // Renderizar contenido específico de la vista
    if (viewName === 'leaderboard') {
        renderLeaderboard();
    } else if (viewName === 'progress') {
        renderAchievements();
        renderWorkoutHistory();
    }
}

// Persistencia de datos
function saveAppState() {
    try {
        localStorage.setItem('herofit-state', JSON.stringify(appState));
        console.log('Estado guardado correctamente');
    } catch (error) {
        console.error('Error guardando estado:', error);
    }
}

function loadAppState() {
    try {
        const saved = localStorage.getItem('herofit-state');
        if (saved) {
            appState = JSON.parse(saved);
            console.log('Estado cargado correctamente');
        }
    } catch (error) {
        console.error('Error cargando estado:', error);
    }
}

// Funciones adicionales para mejorar la experiencia
function animateXPGain(xpGained) {
    const xpDisplay = document.getElementById('xpText');
    const originalText = xpDisplay.textContent;
    
    xpDisplay.textContent = `+${xpGained} XP!`;
    xpDisplay.style.color = '#10b981';
    xpDisplay.style.fontWeight = 'bold';
    xpDisplay.style.transform = 'scale(1.2)';
    
    setTimeout(() => {
        xpDisplay.textContent = originalText;
        xpDisplay.style.color = '';
        xpDisplay.style.fontWeight = '';
        xpDisplay.style.transform = '';
    }, 2000);
}

function vibrate() {
    if ('vibrate' in navigator) {
        navigator.vibrate([100, 50, 100]);
    }
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        z-index: 9999;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        font-weight: 500;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Event Listeners - Se ejecuta cuando carga la página
document.addEventListener('DOMContentLoaded', function() {
    // Cargar estado inicial
    loadAppState();
    
    // Renderizar vista inicial
    updateHeroCard();
    updateStats();
    renderWorkouts();
    
    // Navegación entre pestañas
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const viewName = this.getAttribute('data-view');
            switchView(viewName);
        });
    });
    
    // Modal de entrenamiento - botones principales
    document.getElementById('cancelWorkout').addEventListener('click', closeWorkoutModal);
    document.getElementById('completeWorkout').addEventListener('click', completeWorkout);
    
    // Controles de duración
    document.getElementById('decreaseDuration').addEventListener('click', function() {
        const current = parseInt(document.getElementById('durationValue').textContent);
        const newValue = Math.max(5, current - 5);
        document.getElementById('durationValue').textContent = newValue;
        updateXPPreview();
    });
    
    document.getElementById('increaseDuration').addEventListener('click', function() {
        const current = parseInt(document.getElementById('durationValue').textContent);
        const newValue = current + 5;
        document.getElementById('durationValue').textContent = newValue;
        updateXPPreview();
    });
    
    // Modal de level up
    document.getElementById('closeLevelUp').addEventListener('click', closeLevelUpModal);
    
    // Cerrar modales al hacer clic fuera de ellos
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
            }
        });
    });
    
    // Mensaje de bienvenida
    setTimeout(() => {
        showNotification('¡Bienvenido a HeroFit! Completa tu primer entrenamiento 💪', 'success');
    }, 1000);
});

// Exportar funciones para uso global si es necesario
window.HeroFitApp = {
    switchView,
    completeWorkout,
    openWorkoutModal,
    closeWorkoutModal,
    showNotification,
    saveAppState,
    loadAppState
};