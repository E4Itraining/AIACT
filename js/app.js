/**
 * AI Act Compliance Simulator - Main Application
 * Version 2.0 - Enhanced with persistence, dark mode, accessibility, and more
 */

class AIActSimulator {
    constructor() {
        this.currentQuestion = 0;
        this.answers = {};
        this.questions = QUESTIONS;
        this.result = null;
        this.storageKey = 'aiact_simulator';
        this.historyKey = 'aiact_history';

        this.init();
    }

    /**
     * Initialize the application
     */
    init() {
        try {
            this.loadSavedProgress();
            this.bindNavigation();
            this.bindSimulatorControls();
            this.bindGuideControls();
            this.bindStartButton();
            this.bindKeyboardNavigation();
            this.bindThemeToggle();
            this.checkURLParams();
            this.loadThemePreference();
        } catch (error) {
            console.error('Initialization error:', error);
            this.showNotification('Erreur lors de l\'initialisation', 'error');
        }
    }

    /**
     * Load saved progress from localStorage
     */
    loadSavedProgress() {
        try {
            const saved = localStorage.getItem(this.storageKey);
            if (saved) {
                const data = JSON.parse(saved);
                this.answers = data.answers || {};
                this.currentQuestion = data.currentQuestion || 0;

                if (Object.keys(this.answers).length > 0) {
                    this.showResumePrompt();
                }
            }
        } catch (error) {
            console.warn('Could not load saved progress:', error);
        }
    }

    /**
     * Save current progress to localStorage
     */
    saveProgress() {
        try {
            const data = {
                answers: this.answers,
                currentQuestion: this.currentQuestion,
                timestamp: new Date().toISOString()
            };
            localStorage.setItem(this.storageKey, JSON.stringify(data));
        } catch (error) {
            console.warn('Could not save progress:', error);
        }
    }

    /**
     * Clear saved progress
     */
    clearProgress() {
        try {
            localStorage.removeItem(this.storageKey);
        } catch (error) {
            console.warn('Could not clear progress:', error);
        }
    }

    /**
     * Show resume prompt if there's saved progress
     */
    showResumePrompt() {
        const answeredCount = Object.keys(this.answers).length;
        if (answeredCount > 0 && answeredCount < this.questions.length) {
            const resumeBanner = document.createElement('div');
            resumeBanner.className = 'resume-banner';
            resumeBanner.innerHTML = `
                <div class="resume-content">
                    <span>Vous avez une évaluation en cours (${answeredCount}/${this.questions.length} questions)</span>
                    <div class="resume-actions">
                        <button class="btn btn-primary btn-sm" id="resume-btn">Reprendre</button>
                        <button class="btn btn-secondary btn-sm" id="new-session-btn">Recommencer</button>
                    </div>
                </div>
            `;

            const heroContent = document.querySelector('.hero-content');
            if (heroContent) {
                heroContent.insertBefore(resumeBanner, heroContent.firstChild);

                document.getElementById('resume-btn')?.addEventListener('click', () => {
                    this.resumeSimulator();
                    resumeBanner.remove();
                });

                document.getElementById('new-session-btn')?.addEventListener('click', () => {
                    this.clearProgress();
                    this.answers = {};
                    this.currentQuestion = 0;
                    resumeBanner.remove();
                });
            }
        }
    }

    /**
     * Resume simulator from saved progress
     */
    resumeSimulator() {
        this.navigateToSection('simulator');
        this.showSimulator();
        this.renderQuestion();
        this.updateProgress();
    }

    /**
     * Bind keyboard navigation
     */
    bindKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            const simulatorSection = document.getElementById('simulator');
            if (!simulatorSection?.classList.contains('active')) return;

            if (e.key === 'ArrowRight' || e.key === 'Enter') {
                if (!document.getElementById('next-btn')?.disabled) {
                    this.nextQuestion();
                }
            } else if (e.key === 'ArrowLeft') {
                if (!document.getElementById('prev-btn')?.disabled) {
                    this.previousQuestion();
                }
            } else if (e.key >= '1' && e.key <= '9') {
                const index = parseInt(e.key) - 1;
                const options = document.querySelectorAll('.answer-option, .checkbox-option');
                if (options[index]) {
                    options[index].click();
                }
            }
        });
    }

    /**
     * Bind theme toggle
     */
    bindThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }
    }

    /**
     * Toggle dark/light theme
     */
    toggleTheme() {
        const isDark = document.body.classList.toggle('dark-mode');
        localStorage.setItem('aiact_theme', isDark ? 'dark' : 'light');
        this.updateThemeIcon();
    }

    /**
     * Load theme preference
     */
    loadThemePreference() {
        const theme = localStorage.getItem('aiact_theme');
        if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.body.classList.add('dark-mode');
        }
        this.updateThemeIcon();
    }

    /**
     * Update theme toggle icon
     */
    updateThemeIcon() {
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            const isDark = document.body.classList.contains('dark-mode');
            themeToggle.innerHTML = isDark
                ? '<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="5" stroke="currentColor" stroke-width="2"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>'
                : '<svg viewBox="0 0 24 24" fill="none"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
        }
    }

    /**
     * Check URL parameters for shared results
     */
    checkURLParams() {
        try {
            const params = new URLSearchParams(window.location.search);
            const sharedData = params.get('data');
            if (sharedData) {
                const decoded = JSON.parse(atob(sharedData));
                if (decoded.answers) {
                    this.answers = decoded.answers;
                    this.navigateToSection('simulator');
                    this.showResults();
                    // Clean URL
                    window.history.replaceState({}, '', window.location.pathname);
                }
            }
        } catch (error) {
            console.warn('Could not parse shared data:', error);
        }
    }

    /**
     * Generate shareable URL
     */
    generateShareURL() {
        try {
            const data = { answers: this.answers };
            const encoded = btoa(JSON.stringify(data));
            return `${window.location.origin}${window.location.pathname}?data=${encoded}`;
        } catch (error) {
            console.error('Could not generate share URL:', error);
            return null;
        }
    }

    /**
     * Copy share URL to clipboard
     */
    async copyShareURL() {
        const url = this.generateShareURL();
        if (url) {
            try {
                await navigator.clipboard.writeText(url);
                this.showNotification('Lien copié dans le presse-papiers !', 'success');
            } catch (error) {
                this.showNotification('Impossible de copier le lien', 'error');
            }
        }
    }

    /**
     * Show notification
     */
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => notification.classList.add('show'), 10);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    /**
     * Bind navigation buttons
     */
    bindNavigation() {
        const navButtons = document.querySelectorAll('.nav-btn');
        navButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const section = btn.dataset.section;
                this.navigateToSection(section);
            });
        });
    }

    /**
     * Navigate to a specific section
     */
    navigateToSection(sectionId) {
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.section === sectionId);
        });

        document.querySelectorAll('.section').forEach(section => {
            section.classList.toggle('active', section.id === sectionId);
        });

        if (sectionId !== 'simulator') {
            this.hideResults();
        }
    }

    /**
     * Bind start button
     */
    bindStartButton() {
        const startBtn = document.getElementById('start-simulator');
        if (startBtn) {
            startBtn.addEventListener('click', () => {
                this.startSimulator();
            });
        }
    }

    /**
     * Start the simulator
     */
    startSimulator() {
        this.currentQuestion = 0;
        this.answers = {};
        this.result = null;
        this.clearProgress();

        this.navigateToSection('simulator');
        this.showSimulator();
        this.renderQuestion();
        this.updateProgress();
    }

    /**
     * Show simulator container, hide results
     */
    showSimulator() {
        const simulatorContainer = document.querySelector('.simulator-container');
        const resultsContainer = document.getElementById('results-container');

        if (simulatorContainer) simulatorContainer.classList.remove('hidden');
        if (resultsContainer) resultsContainer.classList.add('hidden');
    }

    /**
     * Hide simulator, show results
     */
    hideResults() {
        const simulatorContainer = document.querySelector('.simulator-container');
        const resultsContainer = document.getElementById('results-container');

        if (simulatorContainer) simulatorContainer.classList.remove('hidden');
        if (resultsContainer) resultsContainer.classList.add('hidden');
    }

    /**
     * Bind simulator controls
     */
    bindSimulatorControls() {
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.previousQuestion());
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextQuestion());
        }

        const restartBtn = document.getElementById('restart-simulator');
        if (restartBtn) {
            restartBtn.addEventListener('click', () => this.startSimulator());
        }

        const downloadBtn = document.getElementById('download-report');
        if (downloadBtn) {
            downloadBtn.addEventListener('click', () => this.downloadReport());
        }

        const exportJsonBtn = document.getElementById('export-json');
        if (exportJsonBtn) {
            exportJsonBtn.addEventListener('click', () => this.exportJSON());
        }

        const shareBtn = document.getElementById('share-results');
        if (shareBtn) {
            shareBtn.addEventListener('click', () => this.copyShareURL());
        }
    }

    /**
     * Bind guide tab controls
     */
    bindGuideControls() {
        const guideTabs = document.querySelectorAll('.guide-tab');
        guideTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const tabId = tab.dataset.tab;
                this.switchGuideTab(tabId);
            });
        });
    }

    /**
     * Switch guide tab
     */
    switchGuideTab(tabId) {
        document.querySelectorAll('.guide-tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.tab === tabId);
        });

        document.querySelectorAll('.guide-panel').forEach(panel => {
            panel.classList.toggle('active', panel.id === `panel-${tabId}`);
        });
    }

    /**
     * Render current question
     */
    renderQuestion() {
        const container = document.getElementById('question-container');
        if (!container) return;

        const question = this.questions[this.currentQuestion];
        const currentAnswer = this.answers[question.id];

        let optionsHTML = '';

        if (question.type === 'single') {
            optionsHTML = this.renderSingleOptions(question, currentAnswer);
        } else if (question.type === 'multiple') {
            optionsHTML = this.renderMultipleOptions(question, currentAnswer);
        }

        container.innerHTML = `
            <span class="question-category">${question.category}</span>
            <h2 class="question-title">${question.title}</h2>
            <p class="question-description">${question.description}</p>
            ${question.help ? `<div class="question-help">${question.help}</div>` : ''}
            <div class="${question.type === 'single' ? 'answer-options' : 'checkbox-options'}" role="radiogroup" aria-label="Options de réponse">
                ${optionsHTML}
            </div>
            <div class="keyboard-hint">
                <span>Astuce : Utilisez les touches 1-9 pour sélectionner, ← → pour naviguer</span>
            </div>
        `;

        this.bindOptionListeners(question);
        this.updateNavigationButtons();

        // Animation
        container.classList.add('fade-in');
        setTimeout(() => container.classList.remove('fade-in'), 300);
    }

    /**
     * Render single-choice options
     */
    renderSingleOptions(question, currentAnswer) {
        return question.options.map((option, index) => {
            const isSelected = currentAnswer === option.value;
            return `
                <label class="answer-option ${isSelected ? 'selected' : ''}" data-value="${option.value}" role="radio" aria-checked="${isSelected}" tabindex="0">
                    <input type="radio" name="${question.id}" value="${option.value}" ${isSelected ? 'checked' : ''}>
                    <div class="option-radio"></div>
                    <div class="option-content">
                        <div class="option-label"><span class="option-number">${index + 1}</span> ${option.label}</div>
                        ${option.description ? `<div class="option-description">${option.description}</div>` : ''}
                    </div>
                </label>
            `;
        }).join('');
    }

    /**
     * Render multiple-choice options
     */
    renderMultipleOptions(question, currentAnswer) {
        const selectedValues = Array.isArray(currentAnswer) ? currentAnswer : [];

        return question.options.map((option, index) => {
            const isSelected = selectedValues.includes(option.value);
            return `
                <label class="checkbox-option ${isSelected ? 'selected' : ''}" data-value="${option.value}" role="checkbox" aria-checked="${isSelected}" tabindex="0">
                    <input type="checkbox" name="${question.id}" value="${option.value}" ${isSelected ? 'checked' : ''}>
                    <div class="option-checkbox">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 6L9 17L4 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <div class="option-content">
                        <div class="option-label"><span class="option-number">${index + 1}</span> ${option.label}</div>
                        ${option.description ? `<div class="option-description">${option.description}</div>` : ''}
                    </div>
                </label>
            `;
        }).join('');
    }

    /**
     * Bind option click listeners
     */
    bindOptionListeners(question) {
        if (question.type === 'single') {
            const options = document.querySelectorAll('.answer-option');
            options.forEach(option => {
                option.addEventListener('click', () => {
                    options.forEach(opt => opt.classList.remove('selected'));
                    option.classList.add('selected');
                    this.answers[question.id] = option.dataset.value;
                    this.saveProgress();
                    this.updateNavigationButtons();
                });
            });
        } else if (question.type === 'multiple') {
            const options = document.querySelectorAll('.checkbox-option');
            options.forEach(option => {
                option.addEventListener('click', (e) => {
                    e.preventDefault();

                    const value = option.dataset.value;
                    let currentValues = this.answers[question.id] || [];

                    if (value === 'none') {
                        if (currentValues.includes('none')) {
                            currentValues = [];
                        } else {
                            currentValues = ['none'];
                        }
                    } else {
                        currentValues = currentValues.filter(v => v !== 'none');

                        if (currentValues.includes(value)) {
                            currentValues = currentValues.filter(v => v !== value);
                        } else {
                            currentValues.push(value);
                        }
                    }

                    this.answers[question.id] = currentValues;
                    this.saveProgress();

                    options.forEach(opt => {
                        opt.classList.toggle('selected', currentValues.includes(opt.dataset.value));
                        opt.querySelector('input').checked = currentValues.includes(opt.dataset.value);
                    });

                    this.updateNavigationButtons();
                });
            });
        }
    }

    /**
     * Update navigation buttons state
     */
    updateNavigationButtons() {
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        const question = this.questions[this.currentQuestion];
        const hasAnswer = this.hasValidAnswer(question.id);

        if (prevBtn) {
            prevBtn.disabled = this.currentQuestion === 0;
        }

        if (nextBtn) {
            const isLastQuestion = this.currentQuestion === this.questions.length - 1;
            nextBtn.textContent = isLastQuestion ? 'Voir les résultats' : 'Suivant';
            nextBtn.innerHTML = isLastQuestion
                ? `Voir les résultats <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                   </svg>`
                : `Suivant <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                   </svg>`;
            nextBtn.disabled = !hasAnswer;
        }
    }

    /**
     * Check if question has a valid answer
     */
    hasValidAnswer(questionId) {
        const answer = this.answers[questionId];
        if (answer === undefined || answer === null) return false;
        if (Array.isArray(answer)) return answer.length > 0;
        return answer !== '';
    }

    /**
     * Go to previous question
     */
    previousQuestion() {
        if (this.currentQuestion > 0) {
            this.currentQuestion--;
            this.saveProgress();
            this.renderQuestion();
            this.updateProgress();
        }
    }

    /**
     * Go to next question or show results
     */
    nextQuestion() {
        if (this.currentQuestion < this.questions.length - 1) {
            this.currentQuestion++;
            this.saveProgress();
            this.renderQuestion();
            this.updateProgress();
        } else {
            this.showResults();
        }
    }

    /**
     * Update progress bar and steps
     */
    updateProgress() {
        const progressFill = document.getElementById('progress-fill');
        const progressSteps = document.getElementById('progress-steps');

        const progress = ((this.currentQuestion + 1) / this.questions.length) * 100;

        if (progressFill) {
            progressFill.style.width = `${progress}%`;
        }

        if (progressSteps) {
            progressSteps.innerHTML = `
                <span>Question ${this.currentQuestion + 1} sur ${this.questions.length}</span>
                <span>${Math.round(progress)}% complété</span>
            `;
        }
    }

    /**
     * Calculate and show results
     */
    showResults() {
        try {
            this.result = RiskEngine.evaluate(this.answers);
            this.saveToHistory();
            this.clearProgress();

            const resultsHTML = ReportGenerator.generateResultsHTML(this.result, this.answers);

            const riskResult = document.getElementById('risk-result');
            const obligationsSection = document.getElementById('obligations-section');
            const recommendationsSection = document.getElementById('recommendations-section');

            if (riskResult) {
                riskResult.innerHTML = resultsHTML.riskResult;

                if (this.result.triggers.length > 0) {
                    riskResult.innerHTML += ReportGenerator.generateTriggersHTML(this.result.triggers);
                }
            }

            if (obligationsSection) {
                obligationsSection.innerHTML = resultsHTML.obligations;
            }

            if (recommendationsSection) {
                recommendationsSection.innerHTML = resultsHTML.recommendations;
            }

            const simulatorContainer = document.querySelector('.simulator-container');
            const resultsContainer = document.getElementById('results-container');

            if (simulatorContainer) simulatorContainer.classList.add('hidden');
            if (resultsContainer) resultsContainer.classList.remove('hidden');

            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (error) {
            console.error('Error showing results:', error);
            this.showNotification('Erreur lors du calcul des résultats', 'error');
        }
    }

    /**
     * Save evaluation to history
     */
    saveToHistory() {
        try {
            const history = JSON.parse(localStorage.getItem(this.historyKey) || '[]');
            const entry = {
                id: Date.now(),
                date: new Date().toISOString(),
                riskLevel: this.result.riskLevel,
                answers: this.answers,
                result: this.result
            };
            history.unshift(entry);
            // Keep only last 10 evaluations
            if (history.length > 10) history.pop();
            localStorage.setItem(this.historyKey, JSON.stringify(history));
        } catch (error) {
            console.warn('Could not save to history:', error);
        }
    }

    /**
     * Get evaluation history
     */
    getHistory() {
        try {
            return JSON.parse(localStorage.getItem(this.historyKey) || '[]');
        } catch (error) {
            return [];
        }
    }

    /**
     * Download PDF report
     */
    downloadReport() {
        if (this.result) {
            ReportGenerator.generatePDF(this.result, this.answers);
        }
    }

    /**
     * Export results as JSON
     */
    exportJSON() {
        if (this.result) {
            ReportGenerator.exportJSON(this.result, this.answers);
        }
    }
}

// Initialize application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.simulator = new AIActSimulator();
});
