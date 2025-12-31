/**
 * AI Act Compliance Simulator - Main Application
 * Handles UI interactions and orchestrates the assessment flow
 */

class AIActSimulator {
    constructor() {
        this.currentQuestion = 0;
        this.answers = {};
        this.questions = QUESTIONS;
        this.result = null;

        this.init();
    }

    /**
     * Initialize the application
     */
    init() {
        this.bindNavigation();
        this.bindSimulatorControls();
        this.bindGuideControls();
        this.bindStartButton();
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
        // Update nav buttons
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.section === sectionId);
        });

        // Update sections
        document.querySelectorAll('.section').forEach(section => {
            section.classList.toggle('active', section.id === sectionId);
        });

        // Reset simulator if navigating away
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

        // Restart button
        const restartBtn = document.getElementById('restart-simulator');
        if (restartBtn) {
            restartBtn.addEventListener('click', () => this.startSimulator());
        }

        // Download report button
        const downloadBtn = document.getElementById('download-report');
        if (downloadBtn) {
            downloadBtn.addEventListener('click', () => this.downloadReport());
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
        // Update tabs
        document.querySelectorAll('.guide-tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.tab === tabId);
        });

        // Update panels
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
            <div class="${question.type === 'single' ? 'answer-options' : 'checkbox-options'}">
                ${optionsHTML}
            </div>
        `;

        this.bindOptionListeners(question);
        this.updateNavigationButtons();
    }

    /**
     * Render single-choice options
     */
    renderSingleOptions(question, currentAnswer) {
        return question.options.map(option => {
            const isSelected = currentAnswer === option.value;
            return `
                <label class="answer-option ${isSelected ? 'selected' : ''}" data-value="${option.value}">
                    <input type="radio" name="${question.id}" value="${option.value}" ${isSelected ? 'checked' : ''}>
                    <div class="option-radio"></div>
                    <div class="option-content">
                        <div class="option-label">${option.label}</div>
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

        return question.options.map(option => {
            const isSelected = selectedValues.includes(option.value);
            return `
                <label class="checkbox-option ${isSelected ? 'selected' : ''}" data-value="${option.value}">
                    <input type="checkbox" name="${question.id}" value="${option.value}" ${isSelected ? 'checked' : ''}>
                    <div class="option-checkbox">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 6L9 17L4 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <div class="option-content">
                        <div class="option-label">${option.label}</div>
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
                    // Remove selected from all
                    options.forEach(opt => opt.classList.remove('selected'));
                    // Add selected to clicked
                    option.classList.add('selected');
                    // Update answer
                    this.answers[question.id] = option.dataset.value;
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

                    // Handle 'none' option
                    if (value === 'none') {
                        if (currentValues.includes('none')) {
                            currentValues = [];
                        } else {
                            currentValues = ['none'];
                        }
                    } else {
                        // Remove 'none' if selecting another option
                        currentValues = currentValues.filter(v => v !== 'none');

                        if (currentValues.includes(value)) {
                            currentValues = currentValues.filter(v => v !== value);
                        } else {
                            currentValues.push(value);
                        }
                    }

                    this.answers[question.id] = currentValues;

                    // Update UI
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
        // Evaluate using the risk engine
        this.result = RiskEngine.evaluate(this.answers);

        // Generate HTML for results
        const resultsHTML = ReportGenerator.generateResultsHTML(this.result, this.answers);

        // Update DOM
        const riskResult = document.getElementById('risk-result');
        const obligationsSection = document.getElementById('obligations-section');
        const recommendationsSection = document.getElementById('recommendations-section');

        if (riskResult) {
            riskResult.innerHTML = resultsHTML.riskResult;

            // Add triggers if any
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

        // Show results container, hide simulator
        const simulatorContainer = document.querySelector('.simulator-container');
        const resultsContainer = document.getElementById('results-container');

        if (simulatorContainer) simulatorContainer.classList.add('hidden');
        if (resultsContainer) resultsContainer.classList.remove('hidden');

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
