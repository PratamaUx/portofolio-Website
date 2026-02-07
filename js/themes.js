// Theme System JavaScript

// Theme Manager Class
class ThemeManager {
    constructor() {
        this.currentTheme = 'light';
        this.themeToggle = document.getElementById('theme-toggle');
        this.body = document.body;
        this.storageKey = 'portfolio-theme';
        this.transitionClass = 'theme-transition';
        
        this.init();
    }
    
    init() {
        // Load saved theme or detect system preference
        this.loadTheme();
        
        // Set up theme toggle button
        this.setupThemeToggle();
        
        // Listen for system theme changes
        this.setupSystemThemeListener();
        
        // Update theme toggle icon
        this.updateThemeToggleIcon();
        
        // Add transition class for smooth theme switching
        this.body.classList.add(this.transitionClass);
    }
    
    loadTheme() {
        // Check for saved theme in localStorage
        const savedTheme = localStorage.getItem(this.storageKey);
        
        if (savedTheme) {
            this.currentTheme = savedTheme;
        } else {
            // Detect system preference
            this.currentTheme = this.getSystemTheme();
        }
        
        this.applyTheme(this.currentTheme);
    }
    
    getSystemTheme() {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'light';
    }
    
    setupThemeToggle() {
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => {
                this.toggleTheme();
            });
            
            // Add keyboard support
            this.themeToggle.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.toggleTheme();
                }
            });
        }
    }
    
    setupSystemThemeListener() {
        if (window.matchMedia) {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            mediaQuery.addEventListener('change', (e) => {
                // Only auto-switch if user hasn't manually set a theme
                if (!localStorage.getItem(this.storageKey)) {
                    const newTheme = e.matches ? 'dark' : 'light';
                    this.applyTheme(newTheme);
                    this.currentTheme = newTheme;
                    this.updateThemeToggleIcon();
                }
            });
        }
    }
    
    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
        
        // Add visual feedback
        this.addToggleAnimation();
        
        // Show theme change notification
        this.showThemeNotification(newTheme);
    }
    
    setTheme(theme) {
        this.currentTheme = theme;
        this.applyTheme(theme);
        this.saveTheme(theme);
        this.updateThemeToggleIcon();
        
        // Dispatch custom event
        this.dispatchThemeChangeEvent(theme);
    }
    
    applyTheme(theme) {
        // Remove existing theme classes
        this.body.classList.remove('light-theme', 'dark-theme');
        
        // Add new theme class
        this.body.classList.add(`${theme}-theme`);
        
        // Update data attribute for CSS
        document.documentElement.setAttribute('data-theme', theme);
        
        // Update meta theme-color for mobile browsers
        this.updateMetaThemeColor(theme);
        
        // Update favicon if different versions exist
        this.updateFavicon(theme);
    }
    
    saveTheme(theme) {
        localStorage.setItem(this.storageKey, theme);
    }
    
    updateThemeToggleIcon() {
        if (!this.themeToggle) return;
        
        const icon = this.themeToggle.querySelector('i');
        if (icon) {
            // Remove existing icon classes
            icon.classList.remove('fa-sun', 'fa-moon');
            
            // Add appropriate icon
            if (this.currentTheme === 'light') {
                icon.classList.add('fa-moon');
                this.themeToggle.setAttribute('aria-label', 'Switch to dark mode');
                this.themeToggle.setAttribute('title', 'Switch to dark mode');
            } else {
                icon.classList.add('fa-sun');
                this.themeToggle.setAttribute('aria-label', 'Switch to light mode');
                this.themeToggle.setAttribute('title', 'Switch to light mode');
            }
        }
        
        // Update aria-pressed for accessibility
        this.themeToggle.setAttribute('aria-pressed', this.currentTheme === 'dark');
    }
    
    updateMetaThemeColor(theme) {
        let metaThemeColor = document.querySelector('meta[name="theme-color"]');
        
        if (!metaThemeColor) {
            metaThemeColor = document.createElement('meta');
            metaThemeColor.name = 'theme-color';
            document.head.appendChild(metaThemeColor);
        }
        
        const colors = {
            light: '#ffffff',
            dark: '#1a202c'
        };
        
        metaThemeColor.content = colors[theme];
    }
    
    updateFavicon(theme) {
        const favicon = document.querySelector('link[rel="icon"]');
        if (favicon) {
            const faviconPath = theme === 'dark' 
                ? 'images/icons/favicon-dark.ico' 
                : 'images/icons/favicon.ico';
            
            // Only update if dark favicon exists
            const img = new Image();
            img.onload = () => {
                favicon.href = faviconPath;
            };
            img.src = faviconPath;
        }
    }
    
    addToggleAnimation() {
        if (!this.themeToggle) return;
        
        this.themeToggle.classList.add('animate-pulse');
        
        setTimeout(() => {
            this.themeToggle.classList.remove('animate-pulse');
        }, 600);
    }
    
    showThemeNotification(theme) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'theme-notification';
        notification.innerHTML = `
            <div class="theme-notification-content">
                <i class="fas fa-${theme === 'dark' ? 'moon' : 'sun'}"></i>
                <span>${theme === 'dark' ? 'Dark' : 'Light'} mode activated</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        // Hide notification
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 2000);
    }
    
    dispatchThemeChangeEvent(theme) {
        const event = new CustomEvent('themechange', {
            detail: { theme }
        });
        document.dispatchEvent(event);
    }
    
    // Public methods
    getCurrentTheme() {
        return this.currentTheme;
    }
    
    isDarkMode() {
        return this.currentTheme === 'dark';
    }
    
    isLightMode() {
        return this.currentTheme === 'light';
    }
    
    // Force theme without saving to localStorage
    previewTheme(theme) {
        this.applyTheme(theme);
        this.updateThemeToggleIcon();
    }
    
    // Reset to system preference
    resetToSystemTheme() {
        localStorage.removeItem(this.storageKey);
        const systemTheme = this.getSystemTheme();
        this.setTheme(systemTheme);
    }
}

// Theme-aware components
class ThemeAwareComponent {
    constructor() {
        this.currentTheme = 'light';
        this.setupThemeListener();
    }
    
    setupThemeListener() {
        document.addEventListener('themechange', (e) => {
            this.currentTheme = e.detail.theme;
            this.onThemeChange(e.detail.theme);
        });
    }
    
    onThemeChange(theme) {
        // Override in subclasses
    }
}

// Chart theme adapter
class ChartThemeAdapter extends ThemeAwareComponent {
    constructor() {
        super();
        this.charts = [];
    }
    
    registerChart(chart) {
        this.charts.push(chart);
    }
    
    onThemeChange(theme) {
        const chartColors = this.getChartColors(theme);
        
        this.charts.forEach(chart => {
            if (chart && chart.update) {
                // Update chart colors based on theme
                chart.options.plugins.legend.labels.color = chartColors.text;
                chart.options.scales.x.ticks.color = chartColors.text;
                chart.options.scales.y.ticks.color = chartColors.text;
                chart.options.scales.x.grid.color = chartColors.grid;
                chart.options.scales.y.grid.color = chartColors.grid;
                chart.update();
            }
        });
    }
    
    getChartColors(theme) {
        return theme === 'dark' ? {
            text: '#f7fafc',
            grid: '#4a5568',
            background: '#2d3748'
        } : {
            text: '#2d3748',
            grid: '#e2e8f0',
            background: '#ffffff'
        };
    }
}

// Map theme adapter
class MapThemeAdapter extends ThemeAwareComponent {
    constructor() {
        super();
        this.maps = [];
    }
    
    registerMap(map) {
        this.maps.push(map);
    }
    
    onThemeChange(theme) {
        const mapStyle = theme === 'dark' 
            ? 'mapbox://styles/mapbox/dark-v10'
            : 'mapbox://styles/mapbox/light-v10';
        
        this.maps.forEach(map => {
            if (map && map.setStyle) {
                map.setStyle(mapStyle);
            }
        });
    }
}

// Theme persistence across tabs
class ThemeSync {
    constructor(themeManager) {
        this.themeManager = themeManager;
        this.setupStorageListener();
    }
    
    setupStorageListener() {
        window.addEventListener('storage', (e) => {
            if (e.key === this.themeManager.storageKey) {
                const newTheme = e.newValue;
                if (newTheme && newTheme !== this.themeManager.getCurrentTheme()) {
                    this.themeManager.previewTheme(newTheme);
                    this.themeManager.currentTheme = newTheme;
                    this.themeManager.updateThemeToggleIcon();
                }
            }
        });
    }
}

// Theme transition effects
class ThemeTransitions {
    static addTransitionClass() {
        document.body.classList.add('theme-transition');
        
        setTimeout(() => {
            document.body.classList.remove('theme-transition');
        }, 300);
    }
    
    static addRippleEffect(element, theme) {
        const ripple = document.createElement('div');
        ripple.className = 'theme-ripple';
        ripple.style.background = theme === 'dark' 
            ? 'radial-gradient(circle, #1a202c 0%, transparent 70%)'
            : 'radial-gradient(circle, #ffffff 0%, transparent 70%)';
        
        document.body.appendChild(ripple);
        
        const rect = element.getBoundingClientRect();
        const size = Math.max(window.innerWidth, window.innerHeight) * 2;
        
        ripple.style.width = size + 'px';
        ripple.style.height = size + 'px';
        ripple.style.left = (rect.left + rect.width / 2 - size / 2) + 'px';
        ripple.style.top = (rect.top + rect.height / 2 - size / 2) + 'px';
        
        ripple.classList.add('animate');
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
}

// Initialize theme system when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme manager
    const themeManager = new ThemeManager();
    
    // Initialize theme sync across tabs
    const themeSync = new ThemeSync(themeManager);
    
    // Initialize theme-aware components
    const chartAdapter = new ChartThemeAdapter();
    const mapAdapter = new MapThemeAdapter();
    
    // Make theme manager globally available
    window.themeManager = themeManager;
    window.chartAdapter = chartAdapter;
    window.mapAdapter = mapAdapter;
    
    // Add keyboard shortcut for theme toggle (Ctrl/Cmd + Shift + T)
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
            e.preventDefault();
            themeManager.toggleTheme();
        }
    });
    
    // Add theme preference to forms
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        const themeInput = document.createElement('input');
        themeInput.type = 'hidden';
        themeInput.name = 'user_theme_preference';
        themeInput.value = themeManager.getCurrentTheme();
        form.appendChild(themeInput);
        
        // Update theme input when theme changes
        document.addEventListener('themechange', (e) => {
            themeInput.value = e.detail.theme;
        });
    });
});

// CSS for theme notifications and transitions
const themeStyles = `
.theme-notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background: var(--bg-primary);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
    padding: var(--spacing-md) var(--spacing-lg);
    box-shadow: 0 10px 30px var(--shadow-medium);
    z-index: var(--z-tooltip);
    opacity: 0;
    transform: translateX(100%);
    transition: all var(--transition-normal);
}

.theme-notification.show {
    opacity: 1;
    transform: translateX(0);
}

.theme-notification-content {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    color: var(--text-primary);
    font-weight: var(--font-weight-medium);
}

.theme-notification-content i {
    color: var(--primary-color);
}

.theme-ripple {
    position: fixed;
    border-radius: 50%;
    transform: scale(0);
    z-index: var(--z-modal);
    pointer-events: none;
    transition: transform 0.6s ease;
}

.theme-ripple.animate {
    transform: scale(1);
}

.theme-transition * {
    transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease !important;
}

@media (prefers-reduced-motion: reduce) {
    .theme-notification {
        transition: opacity 0.1s ease;
        transform: none;
    }
    
    .theme-ripple {
        display: none;
    }
    
    .theme-transition * {
        transition: none !important;
    }
}
`;

// Inject theme styles
const styleSheet = document.createElement('style');
styleSheet.textContent = themeStyles;
document.head.appendChild(styleSheet);

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ThemeManager,
        ThemeAwareComponent,
        ChartThemeAdapter,
        MapThemeAdapter,
        ThemeSync,
        ThemeTransitions
    };
}

