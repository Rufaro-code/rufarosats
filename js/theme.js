// ========== GLOBAL THEME MANAGER ==========
// This file handles dark mode across all pages consistently

class ThemeManager {
  constructor() {
    this.themeToggle = document.getElementById('themeToggle');
    this.init();
  }

  init() {
    // Apply saved theme on page load
    this.loadSavedTheme();
    // Set up toggle button listener
    this.setupToggle();
  }

  loadSavedTheme() {
    const savedTheme = localStorage.getItem('darkMode');
    
    if (savedTheme === 'enabled') {
      document.body.classList.add('dark-mode');
      this.updateToggleIcon(true);
    } else {
      document.body.classList.remove('dark-mode');
      this.updateToggleIcon(false);
    }
  }

  updateToggleIcon(isDark) {
    if (this.themeToggle) {
      this.themeToggle.textContent = isDark ? '☀️' : '🌙';
    }
  }

  toggleTheme() {
    const isDark = document.body.classList.toggle('dark-mode');
    this.updateToggleIcon(isDark);
    localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
    
    // Optional: Dispatch custom event for other scripts to listen
    window.dispatchEvent(new CustomEvent('themeChanged', { 
      detail: { isDark } 
    }));
  }

  setupToggle() {
    if (this.themeToggle) {
      this.themeToggle.addEventListener('click', () => {
        this.toggleTheme();
      });
    }
  }

  // Public method to get current theme
  getCurrentTheme() {
    return document.body.classList.contains('dark-mode') ? 'dark' : 'light';
  }
}

// Initialize theme manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.themeManager = new ThemeManager();
});