// Style Switcher Tool for FRT Dashboard
class StyleSwitcher {
    constructor() {
        this.isOpen = false;
        this.init();
    }

    init() {
        this.createPanel();
        this.loadSavedStyles();
        this.attachEventListeners();
    }

    createPanel() {
        const panel = document.createElement('div');
        panel.id = 'styleSwitcher';
        panel.innerHTML = `
            <div class="style-switcher-toggle" id="styleToggle">
                <i class="fas fa-palette"></i>
            </div>
            <div class="style-switcher-panel" id="stylePanel">
                <div class="style-switcher-header">
                    <h3><i class="fas fa-sliders-h"></i> Style Switcher</h3>
                    <button class="close-btn" id="closeSwitcher"><i class="fas fa-times"></i></button>
                </div>
                <div class="style-switcher-content">
                    <div class="style-section">
                        <h4>Colors</h4>
                        <div class="style-control">
                            <label>Primary Color</label>
                            <input type="color" id="primaryColor" value="#0078d4">
                            <input type="text" id="primaryColorText" value="#0078d4" class="color-text">
                        </div>
                        <div class="style-control">
                            <label>Background</label>
                            <input type="color" id="backgroundColor" value="#faf9f8">
                            <input type="text" id="backgroundColorText" value="#faf9f8" class="color-text">
                        </div>
                        <div class="style-control">
                            <label>Card Background</label>
                            <input type="color" id="cardBgColor" value="#ffffff">
                            <input type="text" id="cardBgColorText" value="#ffffff" class="color-text">
                        </div>
                        <div class="style-control">
                            <label>Border Color</label>
                            <input type="color" id="borderColor" value="#edebe9">
                            <input type="text" id="borderColorText" value="#edebe9" class="color-text">
                        </div>
                        <div class="style-control">
                            <label>Text Primary</label>
                            <input type="color" id="textPrimaryColor" value="#323130">
                            <input type="text" id="textPrimaryColorText" value="#323130" class="color-text">
                        </div>
                        <div class="style-control">
                            <label>Text Secondary</label>
                            <input type="color" id="textSecondaryColor" value="#605e5c">
                            <input type="text" id="textSecondaryColorText" value="#605e5c" class="color-text">
                        </div>
                    </div>
                    
                    <div class="style-section">
                        <h4>Typography</h4>
                        <div class="style-control">
                            <label>Font Family</label>
                            <select id="fontFamily">
                                <option value="'Segoe UI', 'Segoe UI Web (West European)', 'Segoe UI', -apple-system, BlinkMacSystemFont, 'Roboto', 'Helvetica Neue', sans-serif">Segoe UI (Power BI)</option>
                                <option value="Arial, sans-serif">Arial</option>
                                <option value="'Helvetica Neue', Helvetica, Arial, sans-serif">Helvetica Neue</option>
                                <option value="'Roboto', sans-serif">Roboto</option>
                                <option value="'Open Sans', sans-serif">Open Sans</option>
                                <option value="'Inter', sans-serif">Inter</option>
                            </select>
                        </div>
                        <div class="style-control">
                            <label>Base Font Size</label>
                            <input type="range" id="fontSize" min="10" max="18" value="14">
                            <span id="fontSizeValue">14px</span>
                        </div>
                    </div>
                    
                    <div class="style-section">
                        <h4>Spacing</h4>
                        <div class="style-control">
                            <label>Card Padding</label>
                            <input type="range" id="cardPadding" min="4" max="24" value="12">
                            <span id="cardPaddingValue">12px</span>
                        </div>
                        <div class="style-control">
                            <label>Gap Between Cards</label>
                            <input type="range" id="cardGap" min="4" max="24" value="12">
                            <span id="cardGapValue">12px</span>
                        </div>
                    </div>
                    
                    <div class="style-section">
                        <h4>Shadows</h4>
                        <div class="style-control">
                            <label>Shadow Intensity</label>
                            <input type="range" id="shadowIntensity" min="0" max="20" value="13">
                            <span id="shadowIntensityValue">13%</span>
                        </div>
                    </div>
                    
                    <div class="style-section">
                        <h4>Actions</h4>
                        <button class="action-btn" id="resetStyles" style="background: #d13438;">Reset to Original</button>
                        <button class="action-btn" id="exportStyles">Export CSS</button>
                        <button class="action-btn" id="importStyles">Import CSS</button>
                        <input type="file" id="importFile" accept=".json" style="display: none;">
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(panel);
    }

    attachEventListeners() {
        // Toggle panel
        document.getElementById('styleToggle').addEventListener('click', () => this.togglePanel());
        document.getElementById('closeSwitcher').addEventListener('click', () => this.togglePanel());

        // Color inputs
        const colorInputs = ['primaryColor', 'backgroundColor', 'cardBgColor', 'borderColor', 'textPrimaryColor', 'textSecondaryColor'];
        colorInputs.forEach(id => {
            const colorInput = document.getElementById(id);
            const textInput = document.getElementById(id + 'Text');
            
            colorInput.addEventListener('input', (e) => {
                textInput.value = e.target.value;
                this.applyColor(id.replace('Color', ''), e.target.value);
            });
            
            textInput.addEventListener('input', (e) => {
                if (/^#[0-9A-F]{6}$/i.test(e.target.value)) {
                    colorInput.value = e.target.value;
                    this.applyColor(id.replace('Color', '').replace('Text', ''), e.target.value);
                }
            });
        });

        // Font family
        document.getElementById('fontFamily').addEventListener('change', (e) => {
            document.body.style.fontFamily = e.target.value;
            this.saveStyles();
        });

        // Font size
        const fontSize = document.getElementById('fontSize');
        fontSize.addEventListener('input', (e) => {
            const value = e.target.value + 'px';
            document.getElementById('fontSizeValue').textContent = value;
            document.body.style.fontSize = value;
            this.saveStyles();
        });

        // Card padding
        const cardPadding = document.getElementById('cardPadding');
        cardPadding.addEventListener('input', (e) => {
            const value = e.target.value + 'px';
            document.getElementById('cardPaddingValue').textContent = value;
            document.documentElement.style.setProperty('--card-padding', value);
            document.querySelectorAll('.viz-card, .client-selector, .kpi-card').forEach(card => {
                card.style.padding = value;
            });
            this.saveStyles();
        });

        // Card gap
        const cardGap = document.getElementById('cardGap');
        cardGap.addEventListener('input', (e) => {
            const value = e.target.value + 'px';
            document.getElementById('cardGapValue').textContent = value;
            document.querySelectorAll('.content-area, .sidebar').forEach(container => {
                container.style.gap = value;
            });
            this.saveStyles();
        });

        // Shadow intensity
        const shadowIntensity = document.getElementById('shadowIntensity');
        shadowIntensity.addEventListener('input', (e) => {
            const value = e.target.value;
            document.getElementById('shadowIntensityValue').textContent = value + '%';
            const opacity = value / 100;
            const shadow = `0 1.6px 3.6px rgba(0, 0, 0, ${opacity * 0.13}), 0 0.3px 0.9px rgba(0, 0, 0, ${opacity * 0.11})`;
            document.querySelectorAll('.viz-card, .client-selector, .kpi-card').forEach(card => {
                card.style.boxShadow = shadow;
            });
            this.saveStyles();
        });

        // Actions
        document.getElementById('resetStyles').addEventListener('click', () => this.resetStyles());
        document.getElementById('exportStyles').addEventListener('click', () => this.exportStyles());
        document.getElementById('importStyles').addEventListener('click', () => {
            document.getElementById('importFile').click();
        });
        document.getElementById('importFile').addEventListener('change', (e) => this.importStyles(e));
    }

    applyColor(type, value) {
        const root = document.documentElement;
        const mappings = {
            'primary': '--pbi-primary',
            'background': '--pbi-background',
            'cardBg': '--pbi-card-bg',
            'border': '--pbi-border',
            'textPrimary': '--pbi-text-primary',
            'textSecondary': '--pbi-text-secondary'
        };
        
        if (mappings[type]) {
            root.style.setProperty(mappings[type], value);
            this.saveStyles();
        }
    }

    togglePanel() {
        this.isOpen = !this.isOpen;
        const panel = document.getElementById('stylePanel');
        panel.classList.toggle('open', this.isOpen);
    }

    saveStyles() {
        const styles = {
            primary: getComputedStyle(document.documentElement).getPropertyValue('--pbi-primary').trim(),
            background: getComputedStyle(document.documentElement).getPropertyValue('--pbi-background').trim(),
            cardBg: getComputedStyle(document.documentElement).getPropertyValue('--pbi-card-bg').trim(),
            border: getComputedStyle(document.documentElement).getPropertyValue('--pbi-border').trim(),
            textPrimary: getComputedStyle(document.documentElement).getPropertyValue('--pbi-text-primary').trim(),
            textSecondary: getComputedStyle(document.documentElement).getPropertyValue('--pbi-text-secondary').trim(),
            fontFamily: document.body.style.fontFamily || '',
            fontSize: document.body.style.fontSize || '',
        };
        localStorage.setItem('frtDashboardStyles', JSON.stringify(styles));
    }

    loadSavedStyles() {
        const saved = localStorage.getItem('frtDashboardStyles');
        if (saved) {
            const styles = JSON.parse(saved);
            Object.keys(styles).forEach(key => {
                if (styles[key]) {
                    if (key === 'fontFamily') {
                        document.body.style.fontFamily = styles[key];
                        document.getElementById('fontFamily').value = styles[key];
                    } else if (key === 'fontSize') {
                        document.body.style.fontSize = styles[key];
                        const size = parseInt(styles[key]);
                        document.getElementById('fontSize').value = size;
                        document.getElementById('fontSizeValue').textContent = styles[key];
                    } else {
                        const mappings = {
                            primary: '--pbi-primary',
                            background: '--pbi-background',
                            cardBg: '--pbi-card-bg',
                            border: '--pbi-border',
                            textPrimary: '--pbi-text-primary',
                            textSecondary: '--pbi-text-secondary'
                        };
                        if (mappings[key]) {
                            document.documentElement.style.setProperty(mappings[key], styles[key]);
                            const inputId = key === 'cardBg' ? 'cardBgColor' : key + 'Color';
                            document.getElementById(inputId).value = styles[key];
                            document.getElementById(inputId + 'Text').value = styles[key];
                        }
                    }
                }
            });
        }
    }

    resetStyles() {
        // Store original values
        const originalStyles = {
            primary: '#0078d4',
            background: '#faf9f8',
            cardBg: '#ffffff',
            border: '#edebe9',
            textPrimary: '#323130',
            textSecondary: '#605e5c',
            fontFamily: "'Segoe UI', 'Segoe UI Web (West European)', 'Segoe UI', -apple-system, BlinkMacSystemFont, 'Roboto', 'Helvetica Neue', sans-serif",
            fontSize: '14px'
        };
        
        // Reset CSS variables
        document.documentElement.style.setProperty('--pbi-primary', originalStyles.primary);
        document.documentElement.style.setProperty('--pbi-background', originalStyles.background);
        document.documentElement.style.setProperty('--pbi-card-bg', originalStyles.cardBg);
        document.documentElement.style.setProperty('--pbi-border', originalStyles.border);
        document.documentElement.style.setProperty('--pbi-text-primary', originalStyles.textPrimary);
        document.documentElement.style.setProperty('--pbi-text-secondary', originalStyles.textSecondary);
        document.body.style.fontFamily = originalStyles.fontFamily;
        document.body.style.fontSize = originalStyles.fontSize;
        
        // Reset form inputs
        document.getElementById('primaryColor').value = originalStyles.primary;
        document.getElementById('primaryColorText').value = originalStyles.primary;
        document.getElementById('backgroundColor').value = originalStyles.background;
        document.getElementById('backgroundColorText').value = originalStyles.background;
        document.getElementById('cardBgColor').value = originalStyles.cardBg;
        document.getElementById('cardBgColorText').value = originalStyles.cardBg;
        document.getElementById('borderColor').value = originalStyles.border;
        document.getElementById('borderColorText').value = originalStyles.border;
        document.getElementById('textPrimaryColor').value = originalStyles.textPrimary;
        document.getElementById('textPrimaryColorText').value = originalStyles.textPrimary;
        document.getElementById('textSecondaryColor').value = originalStyles.textSecondary;
        document.getElementById('textSecondaryColorText').value = originalStyles.textSecondary;
        document.getElementById('fontFamily').value = originalStyles.fontFamily;
        document.getElementById('fontSize').value = '14';
        document.getElementById('fontSizeValue').textContent = '14px';
        
        // Reset card padding and gaps
        document.querySelectorAll('.viz-card, .client-selector, .kpi-card').forEach(card => {
            card.style.padding = '';
        });
        document.querySelectorAll('.content-area, .sidebar, .left-panel').forEach(container => {
            container.style.gap = '';
        });
        
        // Reset shadows
        document.querySelectorAll('.viz-card, .client-selector, .kpi-card').forEach(card => {
            card.style.boxShadow = '';
        });
        
        // Clear localStorage
        localStorage.removeItem('frtDashboardStyles');
        
        // Show confirmation
        const btn = document.getElementById('resetStyles');
        const originalText = btn.textContent;
        btn.textContent = '✓ Reset Complete!';
        btn.style.background = '#107c10';
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
        }, 2000);
    }

    exportStyles() {
        const styles = {
            primary: getComputedStyle(document.documentElement).getPropertyValue('--pbi-primary').trim(),
            background: getComputedStyle(document.documentElement).getPropertyValue('--pbi-background').trim(),
            cardBg: getComputedStyle(document.documentElement).getPropertyValue('--pbi-card-bg').trim(),
            border: getComputedStyle(document.documentElement).getPropertyValue('--pbi-border').trim(),
            textPrimary: getComputedStyle(document.documentElement).getPropertyValue('--pbi-text-primary').trim(),
            textSecondary: getComputedStyle(document.documentElement).getPropertyValue('--pbi-text-secondary').trim(),
            fontFamily: document.body.style.fontFamily || '',
            fontSize: document.body.style.fontSize || '',
        };
        const blob = new Blob([JSON.stringify(styles, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'frt-dashboard-styles.json';
        a.click();
        URL.revokeObjectURL(url);
    }

    importStyles(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const styles = JSON.parse(e.target.result);
                Object.keys(styles).forEach(key => {
                    if (key === 'fontFamily') {
                        document.body.style.fontFamily = styles[key];
                        document.getElementById('fontFamily').value = styles[key];
                    } else if (key === 'fontSize') {
                        document.body.style.fontSize = styles[key];
                        const size = parseInt(styles[key]);
                        document.getElementById('fontSize').value = size;
                        document.getElementById('fontSizeValue').textContent = styles[key];
                    } else {
                        const mappings = {
                            primary: '--pbi-primary',
                            background: '--pbi-background',
                            cardBg: '--pbi-card-bg',
                            border: '--pbi-border',
                            textPrimary: '--pbi-text-primary',
                            textSecondary: '--pbi-text-secondary'
                        };
                        if (mappings[key]) {
                            document.documentElement.style.setProperty(mappings[key], styles[key]);
                            const inputId = key === 'cardBg' ? 'cardBgColor' : key + 'Color';
                            document.getElementById(inputId).value = styles[key];
                            document.getElementById(inputId + 'Text').value = styles[key];
                        }
                    }
                });
                this.saveStyles();
                alert('Styles imported successfully!');
            };
            reader.readAsText(file);
        }
    }
}

// Initialize style switcher when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new StyleSwitcher());
} else {
    new StyleSwitcher();
}

