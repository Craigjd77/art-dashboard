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
                    <!-- Quick Actions at the top -->
                    <div class="style-section" style="border-top: none; border-bottom: 3px solid var(--pbi-primary); padding-bottom: 16px; margin-bottom: 20px; padding-top: 0;">
                        <h4 style="color: var(--pbi-primary); font-size: 13px; margin-bottom: 16px;">
                            <i class="fas fa-magic"></i> Quick Actions
                        </h4>
                        <button class="action-btn" id="randomizeStyles" style="background: linear-gradient(135deg, #8764b8 0%, #e3008c 100%); margin-bottom: 10px; font-weight: 600;">
                            <i class="fas fa-dice"></i> Randomize All Styles
                        </button>
                        <button class="action-btn" id="resetStyles" style="background: #d13438; margin-bottom: 10px; font-weight: 600;">
                            <i class="fas fa-undo"></i> Reset to Default
                        </button>
                        <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid var(--pbi-border-light);">
                            <button class="action-btn" id="exportStyles" style="background: var(--pbi-primary); margin-bottom: 8px;">
                                <i class="fas fa-download"></i> Export CSS
                            </button>
                            <button class="action-btn" id="importStyles" style="background: var(--pbi-primary);">
                                <i class="fas fa-upload"></i> Import CSS
                            </button>
                        </div>
                        <input type="file" id="importFile" accept=".json" style="display: none;">
                    </div>
                    
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
        document.getElementById('randomizeStyles').addEventListener('click', () => this.randomizeStyles());
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

    randomizeStyles() {
        // Curated list of popular, professional color/style combinations
        const popularCombinations = [
            // Power BI / Microsoft Blue
            { primary: '#0078d4', background: '#faf9f8', cardBg: '#ffffff', border: '#edebe9', textPrimary: '#323130', textSecondary: '#605e5c', fontFamily: "'Segoe UI', 'Segoe UI Web (West European)', 'Segoe UI', -apple-system, BlinkMacSystemFont, 'Roboto', 'Helvetica Neue', sans-serif", fontSize: 14, cardPadding: 12, cardGap: 12, shadow: 10 },
            // Professional Navy
            { primary: '#1e3a8a', background: '#f8fafc', cardBg: '#ffffff', border: '#e2e8f0', textPrimary: '#1e293b', textSecondary: '#64748b', fontFamily: "'Inter', sans-serif", fontSize: 14, cardPadding: 16, cardGap: 16, shadow: 12 },
            // Modern Teal
            { primary: '#0d9488', background: '#f0fdfa', cardBg: '#ffffff', border: '#ccfbf1', textPrimary: '#134e4a', textSecondary: '#5eead4', fontFamily: "'Roboto', sans-serif", fontSize: 14, cardPadding: 14, cardGap: 14, shadow: 8 },
            // Corporate Green
            { primary: '#059669', background: '#f0fdf4', cardBg: '#ffffff', border: '#d1fae5', textPrimary: '#065f46', textSecondary: '#6ee7b7', fontFamily: "'Open Sans', sans-serif", fontSize: 14, cardPadding: 12, cardGap: 12, shadow: 10 },
            // Elegant Purple
            { primary: '#7c3aed', background: '#faf5ff', cardBg: '#ffffff', border: '#e9d5ff', textPrimary: '#581c87', textSecondary: '#a78bfa', fontFamily: "'Inter', sans-serif", fontSize: 14, cardPadding: 16, cardGap: 16, shadow: 12 },
            // Classic Indigo
            { primary: '#4f46e5', background: '#eef2ff', cardBg: '#ffffff', border: '#c7d2fe', textPrimary: '#312e81', textSecondary: '#818cf8', fontFamily: "'Segoe UI', 'Segoe UI Web (West European)', 'Segoe UI', -apple-system, BlinkMacSystemFont, 'Roboto', 'Helvetica Neue', sans-serif", fontSize: 14, cardPadding: 12, cardGap: 12, shadow: 10 },
            // Warm Orange
            { primary: '#ea580c', background: '#fff7ed', cardBg: '#ffffff', border: '#fed7aa', textPrimary: '#9a3412', textSecondary: '#fb923c', fontFamily: "'Roboto', sans-serif", fontSize: 14, cardPadding: 14, cardGap: 14, shadow: 8 },
            // Professional Gray
            { primary: '#475569', background: '#f1f5f9', cardBg: '#ffffff', border: '#cbd5e1', textPrimary: '#0f172a', textSecondary: '#64748b', fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontSize: 14, cardPadding: 12, cardGap: 12, shadow: 10 },
            // Financial Blue
            { primary: '#0369a1', background: '#f0f9ff', cardBg: '#ffffff', border: '#bae6fd', textPrimary: '#0c4a6e', textSecondary: '#38bdf8', fontFamily: "'Segoe UI', 'Segoe UI Web (West European)', 'Segoe UI', -apple-system, BlinkMacSystemFont, 'Roboto', 'Helvetica Neue', sans-serif", fontSize: 14, cardPadding: 16, cardGap: 16, shadow: 12 },
            // Modern Red
            { primary: '#dc2626', background: '#fef2f2', cardBg: '#ffffff', border: '#fecaca', textPrimary: '#991b1b', textSecondary: '#f87171', fontFamily: "'Inter', sans-serif", fontSize: 14, cardPadding: 14, cardGap: 14, shadow: 8 },
            // Deep Blue
            { primary: '#1e40af', background: '#eff6ff', cardBg: '#ffffff', border: '#bfdbfe', textPrimary: '#1e3a8a', textSecondary: '#60a5fa', fontFamily: "'Open Sans', sans-serif", fontSize: 14, cardPadding: 12, cardGap: 12, shadow: 10 },
            // Emerald
            { primary: '#10b981', background: '#ecfdf5', cardBg: '#ffffff', border: '#a7f3d0', textPrimary: '#065f46', textSecondary: '#34d399', fontFamily: "'Roboto', sans-serif", fontSize: 14, cardPadding: 16, cardGap: 16, shadow: 12 },
            // Royal Purple
            { primary: '#9333ea', background: '#faf5ff', cardBg: '#ffffff', border: '#e9d5ff', textPrimary: '#6b21a8', textSecondary: '#c084fc', fontFamily: "'Inter', sans-serif", fontSize: 14, cardPadding: 14, cardGap: 14, shadow: 8 },
            // Steel Blue
            { primary: '#0284c7', background: '#f0f9ff', cardBg: '#ffffff', border: '#bae6fd', textPrimary: '#0c4a6e', textSecondary: '#38bdf8', fontFamily: "'Segoe UI', 'Segoe UI Web (West European)', 'Segoe UI', -apple-system, BlinkMacSystemFont, 'Roboto', 'Helvetica Neue', sans-serif", fontSize: 14, cardPadding: 12, cardGap: 12, shadow: 10 },
            // Forest Green
            { primary: '#16a34a', background: '#f0fdf4', cardBg: '#ffffff', border: '#bbf7d0', textPrimary: '#166534', textSecondary: '#4ade80', fontFamily: "'Open Sans', sans-serif", fontSize: 14, cardPadding: 16, cardGap: 16, shadow: 12 },
            // Slate
            { primary: '#475569', background: '#f8fafc', cardBg: '#ffffff', border: '#cbd5e1', textPrimary: '#0f172a', textSecondary: '#64748b', fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontSize: 14, cardPadding: 14, cardGap: 14, shadow: 8 },
            // Azure
            { primary: '#0ea5e9', background: '#f0f9ff', cardBg: '#ffffff', border: '#bae6fd', textPrimary: '#0c4a6e', textSecondary: '#38bdf8', fontFamily: "'Inter', sans-serif", fontSize: 14, cardPadding: 12, cardGap: 12, shadow: 10 },
            // Amber
            { primary: '#f59e0b', background: '#fffbeb', cardBg: '#ffffff', border: '#fde68a', textPrimary: '#92400e', textSecondary: '#fbbf24', fontFamily: "'Roboto', sans-serif", fontSize: 14, cardPadding: 16, cardGap: 16, shadow: 12 },
            // Rose
            { primary: '#e11d48', background: '#fff1f2', cardBg: '#ffffff', border: '#fecdd3', textPrimary: '#9f1239', textSecondary: '#fb7185', fontFamily: "'Segoe UI', 'Segoe UI Web (West European)', 'Segoe UI', -apple-system, BlinkMacSystemFont, 'Roboto', 'Helvetica Neue', sans-serif", fontSize: 14, cardPadding: 14, cardGap: 14, shadow: 8 },
            // Cyan
            { primary: '#06b6d4', background: '#ecfeff', cardBg: '#ffffff', border: '#a5f3fc', textPrimary: '#164e63', textSecondary: '#22d3ee', fontFamily: "'Open Sans', sans-serif", fontSize: 14, cardPadding: 12, cardGap: 12, shadow: 10 }
        ];
        
        // Select a random combination from the curated list
        const selected = popularCombinations[Math.floor(Math.random() * popularCombinations.length)];
        
        const randomPrimary = selected.primary;
        const randomBackground = selected.background;
        const randomCardBg = selected.cardBg;
        const randomBorder = selected.border;
        const randomTextPrimary = selected.textPrimary;
        const randomTextSecondary = selected.textSecondary;
        const randomFontFamily = selected.fontFamily;
        const randomFontSize = selected.fontSize;
        const randomCardPadding = selected.cardPadding;
        const randomCardGap = selected.cardGap;
        
        // Random shadow intensity (0-20)
        const randomShadowIntensity = Math.floor(Math.random() * 21);
        
        // Apply random colors
        this.applyColor('primary', randomPrimary);
        this.applyColor('background', randomBackground);
        this.applyColor('cardBg', randomCardBg);
        this.applyColor('border', randomBorder);
        this.applyColor('textPrimary', randomTextPrimary);
        this.applyColor('textSecondary', randomTextSecondary);
        
        // Update color inputs
        document.getElementById('primaryColor').value = randomPrimary;
        document.getElementById('primaryColorText').value = randomPrimary;
        document.getElementById('backgroundColor').value = randomBackground;
        document.getElementById('backgroundColorText').value = randomBackground;
        document.getElementById('cardBgColor').value = randomCardBg;
        document.getElementById('cardBgColorText').value = randomCardBg;
        document.getElementById('borderColor').value = randomBorder;
        document.getElementById('borderColorText').value = randomBorder;
        document.getElementById('textPrimaryColor').value = randomTextPrimary;
        document.getElementById('textPrimaryColorText').value = randomTextPrimary;
        document.getElementById('textSecondaryColor').value = randomTextSecondary;
        document.getElementById('textSecondaryColorText').value = randomTextSecondary;
        
        // Apply random font family
        document.body.style.fontFamily = randomFontFamily;
        document.getElementById('fontFamily').value = randomFontFamily;
        
        // Apply random font size
        document.body.style.fontSize = randomFontSize + 'px';
        document.getElementById('fontSize').value = randomFontSize;
        document.getElementById('fontSizeValue').textContent = randomFontSize + 'px';
        
        // Apply random card padding
        const paddingValue = randomCardPadding + 'px';
        document.documentElement.style.setProperty('--card-padding', paddingValue);
        document.querySelectorAll('.viz-card, .client-selector, .kpi-card').forEach(card => {
            card.style.padding = paddingValue;
        });
        document.getElementById('cardPadding').value = randomCardPadding;
        document.getElementById('cardPaddingValue').textContent = paddingValue;
        
        // Apply random card gap
        const gapValue = randomCardGap + 'px';
        document.querySelectorAll('.content-area, .sidebar').forEach(container => {
            container.style.gap = gapValue;
        });
        document.getElementById('cardGap').value = randomCardGap;
        document.getElementById('cardGapValue').textContent = gapValue;
        
        // Apply random shadow intensity
        const shadowOpacity = randomShadowIntensity / 100;
        const shadow = `0 1.6px 3.6px rgba(0, 0, 0, ${shadowOpacity * 0.13}), 0 0.3px 0.9px rgba(0, 0, 0, ${shadowOpacity * 0.11})`;
        document.querySelectorAll('.viz-card, .client-selector, .kpi-card').forEach(card => {
            card.style.boxShadow = shadow;
        });
        document.getElementById('shadowIntensity').value = randomShadowIntensity;
        document.getElementById('shadowIntensityValue').textContent = randomShadowIntensity + '%';
        
        // Save styles
        this.saveStyles();
        
        // Show confirmation with animation
        const btn = document.getElementById('randomizeStyles');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> Randomized!';
        btn.style.background = '#107c10';
        
        // Add a fun animation
        btn.style.transform = 'scale(1.1)';
        setTimeout(() => {
            btn.style.transform = 'scale(1)';
        }, 200);
        
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
        }, 1500);
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
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> Reset Complete!';
        btn.style.background = '#107c10';
        setTimeout(() => {
            btn.innerHTML = originalText;
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

