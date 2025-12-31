/**
 * AI Act Compliance Simulator - Report Generator
 * Generates PDF reports of compliance assessments
 */

const ReportGenerator = {
    /**
     * Generate HTML for the results display
     */
    generateResultsHTML(result, answers) {
        const riskDetails = result.riskDetails;

        return {
            riskResult: this.generateRiskResultHTML(riskDetails),
            obligations: this.generateObligationsHTML(result),
            recommendations: this.generateRecommendationsHTML(result),
            triggers: result.triggers
        };
    },

    /**
     * Generate risk result badge HTML
     */
    generateRiskResultHTML(riskDetails) {
        return `
            <div class="risk-badge ${riskDetails.color}">
                ${riskDetails.icon}
                <span>${riskDetails.label}</span>
            </div>
            <p class="risk-description">${riskDetails.description}</p>
        `;
    },

    /**
     * Generate obligations list HTML
     */
    generateObligationsHTML(result) {
        if (result.obligations.length === 0) {
            return '<p>Aucune obligation spécifique ne s\'applique à votre système.</p>';
        }

        let html = `
            <h3>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 11L12 14L22 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Obligations Applicables
            </h3>
            <ul class="obligation-list">
        `;

        result.obligations.forEach((obligation, index) => {
            html += `
                <li class="obligation-item">
                    <div class="obligation-icon">${index + 1}</div>
                    <div class="obligation-content">
                        <h4>${obligation.title}</h4>
                        <p>${obligation.description}</p>
                        <span class="article-ref">${obligation.article}</span>
                    </div>
                </li>
            `;
        });

        html += '</ul>';
        return html;
    },

    /**
     * Generate recommendations list HTML
     */
    generateRecommendationsHTML(result) {
        if (result.recommendations.length === 0) {
            return '';
        }

        let html = `
            <h3>Recommandations</h3>
        `;

        result.recommendations.forEach(recommendation => {
            const priorityClass = `priority-${recommendation.priority}`;
            html += `
                <div class="recommendation-card ${priorityClass}">
                    <h4>${recommendation.title}</h4>
                    <p>${recommendation.description}</p>
                </div>
            `;
        });

        return html;
    },

    /**
     * Generate triggers section HTML
     */
    generateTriggersHTML(triggers) {
        if (triggers.length === 0) return '';

        let html = `
            <div class="triggers-section">
                <h3>Éléments déclencheurs de la classification</h3>
                <ul class="triggers-list">
        `;

        triggers.forEach(trigger => {
            html += `
                <li>
                    <strong>${trigger.article}</strong>: ${trigger.reason}
                    <br><small>${trigger.question}</small>
                </li>
            `;
        });

        html += '</ul></div>';
        return html;
    },

    /**
     * Generate a PDF report
     */
    async generatePDF(result, answers) {
        const reportDate = new Date().toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

        const riskDetails = result.riskDetails;
        const summary = RiskEngine.getSummary(result);

        // Create printable HTML
        const printContent = this.createPrintableHTML(result, answers, reportDate, riskDetails, summary);

        // Open print dialog
        const printWindow = window.open('', '_blank');
        printWindow.document.write(printContent);
        printWindow.document.close();
        printWindow.focus();

        // Wait for content to load before printing
        setTimeout(() => {
            printWindow.print();
        }, 500);
    },

    /**
     * Create printable HTML content
     */
    createPrintableHTML(result, answers, reportDate, riskDetails, summary) {
        const systemType = this.getSystemTypeLabel(answers.system_type);

        return `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Rapport de Conformité AI Act</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            padding: 40px;
            max-width: 800px;
            margin: 0 auto;
        }

        .header {
            text-align: center;
            border-bottom: 3px solid #003399;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }

        .header h1 {
            color: #003399;
            font-size: 24px;
            margin-bottom: 5px;
        }

        .header .subtitle {
            color: #666;
            font-size: 14px;
        }

        .header .date {
            color: #888;
            font-size: 12px;
            margin-top: 10px;
        }

        .eu-badge {
            display: inline-block;
            background: #003399;
            color: white;
            padding: 5px 15px;
            border-radius: 20px;
            font-size: 12px;
            margin-top: 10px;
        }

        .section {
            margin-bottom: 30px;
            page-break-inside: avoid;
        }

        .section h2 {
            color: #003399;
            font-size: 18px;
            border-bottom: 1px solid #ddd;
            padding-bottom: 10px;
            margin-bottom: 15px;
        }

        .risk-box {
            padding: 20px;
            border-radius: 10px;
            text-align: center;
            margin-bottom: 20px;
        }

        .risk-box.unacceptable {
            background: #fecaca;
            border: 2px solid #b91c1c;
        }

        .risk-box.high {
            background: #fed7aa;
            border: 2px solid #ea580c;
        }

        .risk-box.limited {
            background: #fef08a;
            border: 2px solid #ca8a04;
        }

        .risk-box.minimal {
            background: #bbf7d0;
            border: 2px solid #16a34a;
        }

        .risk-level {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 10px;
        }

        .risk-box.unacceptable .risk-level { color: #b91c1c; }
        .risk-box.high .risk-level { color: #ea580c; }
        .risk-box.limited .risk-level { color: #ca8a04; }
        .risk-box.minimal .risk-level { color: #16a34a; }

        .risk-description {
            font-size: 14px;
            color: #666;
        }

        .summary-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 15px;
            margin-bottom: 20px;
        }

        .summary-item {
            background: #f5f5f5;
            padding: 15px;
            border-radius: 8px;
            text-align: center;
        }

        .summary-item .number {
            font-size: 28px;
            font-weight: bold;
            color: #003399;
        }

        .summary-item .label {
            font-size: 12px;
            color: #666;
        }

        .obligation-list {
            list-style: none;
        }

        .obligation-item {
            padding: 15px;
            background: #f9fafb;
            border-left: 4px solid #003399;
            margin-bottom: 10px;
            border-radius: 0 8px 8px 0;
        }

        .obligation-item h4 {
            color: #333;
            font-size: 14px;
            margin-bottom: 5px;
        }

        .obligation-item p {
            font-size: 13px;
            color: #666;
            margin-bottom: 5px;
        }

        .obligation-item .article {
            font-size: 11px;
            color: #888;
            background: #e5e7eb;
            padding: 2px 8px;
            border-radius: 4px;
            display: inline-block;
        }

        .recommendation-card {
            padding: 15px;
            margin-bottom: 10px;
            border-radius: 8px;
            background: #f0f9ff;
            border-left: 4px solid #0284c7;
        }

        .recommendation-card.priority-high {
            background: #fef2f2;
            border-left-color: #dc2626;
        }

        .recommendation-card.priority-medium {
            background: #fffbeb;
            border-left-color: #d97706;
        }

        .recommendation-card h4 {
            font-size: 14px;
            color: #333;
            margin-bottom: 5px;
        }

        .recommendation-card p {
            font-size: 13px;
            color: #666;
        }

        .triggers-section {
            background: #f9fafb;
            padding: 20px;
            border-radius: 8px;
        }

        .triggers-section h3 {
            font-size: 14px;
            color: #333;
            margin-bottom: 10px;
        }

        .triggers-list {
            list-style: none;
        }

        .triggers-list li {
            padding: 10px 0;
            border-bottom: 1px solid #e5e7eb;
            font-size: 13px;
        }

        .triggers-list li:last-child {
            border-bottom: none;
        }

        .triggers-list strong {
            color: #003399;
        }

        .triggers-list small {
            color: #888;
        }

        .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            text-align: center;
            font-size: 11px;
            color: #888;
        }

        .disclaimer {
            background: #fffbeb;
            border: 1px solid #fcd34d;
            padding: 15px;
            border-radius: 8px;
            margin-top: 20px;
            font-size: 12px;
            color: #92400e;
        }

        .disclaimer strong {
            display: block;
            margin-bottom: 5px;
        }

        @media print {
            body {
                padding: 20px;
            }

            .section {
                page-break-inside: avoid;
            }
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>Rapport de Conformité AI Act</h1>
        <p class="subtitle">Évaluation de conformité au Règlement (UE) 2024/1689</p>
        <span class="eu-badge">Union Européenne</span>
        <p class="date">Généré le ${reportDate}</p>
    </div>

    <div class="section">
        <h2>Informations Générales</h2>
        <p><strong>Type de système :</strong> ${systemType}</p>
        <p><strong>Date de l'évaluation :</strong> ${reportDate}</p>
    </div>

    <div class="section">
        <h2>Résultat de l'Évaluation</h2>
        <div class="risk-box ${riskDetails.color}">
            <div class="risk-level">${riskDetails.label}</div>
            <p class="risk-description">${riskDetails.description}</p>
        </div>

        <div class="summary-grid">
            <div class="summary-item">
                <div class="number">${summary.obligationsCount}</div>
                <div class="label">Obligations</div>
            </div>
            <div class="summary-item">
                <div class="number">${summary.triggersCount}</div>
                <div class="label">Déclencheurs</div>
            </div>
            <div class="summary-item">
                <div class="number">${summary.highPriorityItems}</div>
                <div class="label">Actions Prioritaires</div>
            </div>
        </div>
    </div>

    ${result.triggers.length > 0 ? `
    <div class="section">
        <h2>Éléments Déclencheurs</h2>
        <div class="triggers-section">
            <ul class="triggers-list">
                ${result.triggers.map(trigger => `
                    <li>
                        <strong>${trigger.article}</strong>: ${trigger.reason}
                        <br><small>${trigger.question}</small>
                    </li>
                `).join('')}
            </ul>
        </div>
    </div>
    ` : ''}

    ${result.obligations.length > 0 ? `
    <div class="section">
        <h2>Obligations Applicables</h2>
        <ul class="obligation-list">
            ${result.obligations.map(obligation => `
                <li class="obligation-item">
                    <h4>${obligation.title}</h4>
                    <p>${obligation.description}</p>
                    <span class="article">${obligation.article}</span>
                </li>
            `).join('')}
        </ul>
    </div>
    ` : ''}

    ${result.recommendations.length > 0 ? `
    <div class="section">
        <h2>Recommandations</h2>
        ${result.recommendations.map(rec => `
            <div class="recommendation-card priority-${rec.priority}">
                <h4>${rec.title}</h4>
                <p>${rec.description}</p>
            </div>
        `).join('')}
    </div>
    ` : ''}

    <div class="section">
        <h2>Articles de Référence</h2>
        <p>Cette évaluation est basée sur les articles suivants du Règlement (UE) 2024/1689 :</p>
        <ul>
            ${result.articles.map(article => `<li>${article}</li>`).join('')}
        </ul>
    </div>

    <div class="disclaimer">
        <strong>Avertissement Important</strong>
        Ce rapport est fourni à titre informatif uniquement et ne constitue pas un avis juridique.
        Pour une analyse complète de conformité, consultez des experts juridiques spécialisés
        et référez-vous au texte officiel du Règlement (UE) 2024/1689.
    </div>

    <div class="footer">
        <p>AI Act Compliance Simulator</p>
        <p>Basé sur le Règlement (UE) 2024/1689 du Parlement européen et du Conseil</p>
        <p>© 2024 - Outil d'aide à la conformité</p>
    </div>
</body>
</html>
        `;
    },

    /**
     * Get human-readable system type label
     */
    getSystemTypeLabel(type) {
        const labels = {
            provider: 'Fournisseur d\'un système d\'IA',
            deployer: 'Déployeur d\'un système d\'IA',
            importer: 'Importateur ou distributeur',
            gpai_provider: 'Fournisseur de modèle GPAI'
        };
        return labels[type] || 'Non spécifié';
    },

    /**
     * Export results as JSON
     */
    exportJSON(result, answers) {
        const data = {
            exportDate: new Date().toISOString(),
            version: '1.0',
            regulation: 'EU 2024/1689 (AI Act)',
            assessment: {
                riskLevel: result.riskDetails.label,
                riskColor: result.riskDetails.color,
                description: result.riskDetails.description,
                triggers: result.triggers,
                obligations: result.obligations,
                recommendations: result.recommendations,
                articles: result.articles
            },
            answers: answers
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `ai-act-assessment-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ReportGenerator };
}
