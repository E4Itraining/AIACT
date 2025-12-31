/**
 * AI Act Compliance Simulator - Risk Assessment Engine
 * Evaluates AI systems according to EU Regulation 2024/1689
 */

const RiskEngine = {
    // Risk level hierarchy (from highest to lowest)
    RISK_LEVELS: {
        unacceptable: {
            level: 4,
            label: 'Risque Inacceptable',
            description: 'Ce système d\'IA est INTERDIT par le Règlement AI Act. Il ne peut pas être mis sur le marché ou utilisé dans l\'Union européenne.',
            color: 'unacceptable',
            icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                <path d="M15 9L9 15M9 9L15 15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>`
        },
        high: {
            level: 3,
            label: 'Haut Risque',
            description: 'Ce système d\'IA est classé à HAUT RISQUE. Des obligations strictes s\'appliquent avant la mise sur le marché et tout au long du cycle de vie.',
            color: 'high',
            icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 9V13M12 17H12.01M10.29 3.86L1.82 18C1.64 18.3 1.55 18.64 1.55 19C1.56 19.36 1.66 19.69 1.84 19.99C2.02 20.28 2.28 20.52 2.58 20.68C2.88 20.85 3.22 20.93 3.57 20.93H20.43C20.78 20.93 21.12 20.85 21.42 20.68C21.72 20.52 21.98 20.28 22.16 19.99C22.34 19.69 22.44 19.36 22.45 19C22.45 18.64 22.36 18.3 22.18 18L13.71 3.86C13.53 3.56 13.27 3.32 12.97 3.15C12.67 2.98 12.34 2.89 12 2.89C11.66 2.89 11.33 2.98 11.03 3.15C10.73 3.32 10.47 3.56 10.29 3.86Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>`
        },
        gpai_systemic: {
            level: 2.5,
            label: 'Modèle GPAI à Risque Systémique',
            description: 'Ce modèle d\'IA à usage général présente un risque systémique. Des obligations renforcées s\'appliquent en plus des obligations standard GPAI.',
            color: 'high',
            icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>`
        },
        gpai_standard: {
            level: 2.2,
            label: 'Modèle GPAI Standard',
            description: 'Ce modèle d\'IA à usage général est soumis aux obligations de transparence et de documentation prévues au Chapitre V.',
            color: 'limited',
            icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>`
        },
        limited: {
            level: 2,
            label: 'Risque Limité',
            description: 'Ce système d\'IA est soumis à des OBLIGATIONS DE TRANSPARENCE. Les utilisateurs doivent être informés qu\'ils interagissent avec une IA.',
            color: 'limited',
            icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                <path d="M12 16V12M12 8H12.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>`
        },
        minimal: {
            level: 1,
            label: 'Risque Minimal',
            description: 'Ce système d\'IA n\'est pas soumis à des obligations spécifiques au titre de l\'AI Act. L\'adoption de codes de conduite volontaires est encouragée.',
            color: 'minimal',
            icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M22 4L12 14.01L9 11.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>`
        }
    },

    // Obligations by risk level
    OBLIGATIONS: {
        unacceptable: [
            {
                title: 'Interdiction de mise sur le marché',
                description: 'Ce système ne peut pas être mis sur le marché, mis en service ou utilisé dans l\'Union européenne.',
                article: 'Article 5',
                priority: 'critical'
            },
            {
                title: 'Retrait immédiat',
                description: 'Si le système est déjà en service, il doit être immédiatement retiré du marché et son utilisation cessée.',
                article: 'Article 5',
                priority: 'critical'
            }
        ],
        high: [
            {
                title: 'Système de gestion des risques',
                description: 'Établir, mettre en œuvre, documenter et maintenir un système de gestion des risques tout au long du cycle de vie.',
                article: 'Article 9',
                priority: 'high'
            },
            {
                title: 'Gouvernance des données',
                description: 'Mettre en place des pratiques de gouvernance des données pour les jeux de données d\'entraînement, de validation et de test.',
                article: 'Article 10',
                priority: 'high'
            },
            {
                title: 'Documentation technique',
                description: 'Établir une documentation technique démontrant la conformité avant la mise sur le marché.',
                article: 'Article 11',
                priority: 'high'
            },
            {
                title: 'Journalisation automatique',
                description: 'Concevoir le système pour permettre l\'enregistrement automatique des événements (logs) pendant son fonctionnement.',
                article: 'Article 12',
                priority: 'high'
            },
            {
                title: 'Transparence et information',
                description: 'Fournir des instructions d\'utilisation claires et compréhensibles aux déployeurs.',
                article: 'Article 13',
                priority: 'high'
            },
            {
                title: 'Surveillance humaine',
                description: 'Concevoir le système pour permettre une surveillance humaine effective pendant son utilisation.',
                article: 'Article 14',
                priority: 'high'
            },
            {
                title: 'Exactitude, robustesse et cybersécurité',
                description: 'Garantir des niveaux appropriés d\'exactitude, de robustesse et de cybersécurité.',
                article: 'Article 15',
                priority: 'high'
            },
            {
                title: 'Système de gestion de la qualité',
                description: 'Mettre en place un système de gestion de la qualité documenté.',
                article: 'Article 17',
                priority: 'high'
            },
            {
                title: 'Évaluation de conformité',
                description: 'Effectuer une évaluation de conformité avant la mise sur le marché.',
                article: 'Articles 43-49',
                priority: 'high'
            },
            {
                title: 'Marquage CE',
                description: 'Apposer le marquage CE après évaluation de conformité réussie.',
                article: 'Article 48',
                priority: 'medium'
            },
            {
                title: 'Déclaration de conformité UE',
                description: 'Établir une déclaration de conformité UE écrite.',
                article: 'Article 47',
                priority: 'high'
            },
            {
                title: 'Enregistrement',
                description: 'Enregistrer le système dans la base de données de l\'UE avant mise sur le marché.',
                article: 'Article 49',
                priority: 'high'
            },
            {
                title: 'Surveillance post-commercialisation',
                description: 'Mettre en place un système de surveillance après mise sur le marché.',
                article: 'Article 72',
                priority: 'medium'
            },
            {
                title: 'Signalement d\'incidents',
                description: 'Signaler les incidents graves aux autorités de surveillance.',
                article: 'Article 73',
                priority: 'high'
            }
        ],
        gpai_systemic: [
            {
                title: 'Obligations GPAI standard',
                description: 'Respecter toutes les obligations applicables aux modèles GPAI (documentation technique, transparence, copyright).',
                article: 'Article 53',
                priority: 'high'
            },
            {
                title: 'Évaluation des modèles',
                description: 'Effectuer des évaluations du modèle conformément à des protocoles et outils standardisés.',
                article: 'Article 55(1)(a)',
                priority: 'high'
            },
            {
                title: 'Évaluation et atténuation des risques systémiques',
                description: 'Évaluer et atténuer les risques systémiques possibles au niveau de l\'Union.',
                article: 'Article 55(1)(b)',
                priority: 'high'
            },
            {
                title: 'Suivi et signalement d\'incidents',
                description: 'Suivre, documenter et signaler les incidents graves aux autorités.',
                article: 'Article 55(1)(c)',
                priority: 'high'
            },
            {
                title: 'Protection de cybersécurité',
                description: 'Assurer un niveau adéquat de protection en matière de cybersécurité.',
                article: 'Article 55(1)(d)',
                priority: 'high'
            }
        ],
        gpai_standard: [
            {
                title: 'Documentation technique',
                description: 'Établir et maintenir à jour la documentation technique du modèle, incluant processus d\'entraînement et tests.',
                article: 'Article 53(1)(a)',
                priority: 'high'
            },
            {
                title: 'Information aux fournisseurs en aval',
                description: 'Fournir les informations et la documentation nécessaires aux fournisseurs de systèmes d\'IA intégrant le modèle.',
                article: 'Article 53(1)(b)',
                priority: 'high'
            },
            {
                title: 'Politique de respect du droit d\'auteur',
                description: 'Mettre en place une politique de respect du droit d\'auteur de l\'UE.',
                article: 'Article 53(1)(c)',
                priority: 'medium'
            },
            {
                title: 'Résumé du contenu d\'entraînement',
                description: 'Publier un résumé suffisamment détaillé du contenu utilisé pour l\'entraînement.',
                article: 'Article 53(1)(d)',
                priority: 'medium'
            }
        ],
        limited: [
            {
                title: 'Information sur l\'interaction avec l\'IA',
                description: 'Les personnes doivent être informées qu\'elles interagissent avec un système d\'IA, sauf si c\'est évident.',
                article: 'Article 50(1)',
                priority: 'medium'
            },
            {
                title: 'Marquage du contenu synthétique',
                description: 'Le contenu généré par IA doit être marqué comme tel de manière lisible par machine.',
                article: 'Article 50(2)',
                priority: 'medium'
            },
            {
                title: 'Divulgation des deepfakes',
                description: 'Informer que le contenu audio, image ou vidéo a été généré ou manipulé artificiellement.',
                article: 'Article 50(4)',
                priority: 'medium'
            },
            {
                title: 'Information sur la détection d\'émotions',
                description: 'Informer les personnes exposées à un système de reconnaissance des émotions.',
                article: 'Article 50(3)',
                priority: 'medium'
            }
        ],
        minimal: [
            {
                title: 'Codes de conduite volontaires',
                description: 'Bien qu\'aucune obligation spécifique ne s\'applique, l\'adoption de codes de conduite volontaires est encouragée.',
                article: 'Article 95',
                priority: 'low'
            },
            {
                title: 'Bonnes pratiques',
                description: 'Il est recommandé de suivre les bonnes pratiques en matière de développement et d\'utilisation responsable de l\'IA.',
                article: 'Considérant 28',
                priority: 'low'
            }
        ]
    },

    // Recommendations by context
    RECOMMENDATIONS: {
        unacceptable: [
            {
                title: 'Cesser immédiatement l\'utilisation',
                description: 'Ce système ne peut légalement pas être utilisé dans l\'UE. Vous devez cesser son développement, sa commercialisation et son utilisation.',
                priority: 'high'
            },
            {
                title: 'Consulter un juriste spécialisé',
                description: 'Consultez un avocat spécialisé en droit du numérique pour évaluer vos options et responsabilités.',
                priority: 'high'
            },
            {
                title: 'Explorer des alternatives conformes',
                description: 'Envisagez de redéfinir votre système pour le rendre conforme ou explorez des alternatives légales.',
                priority: 'medium'
            }
        ],
        high: [
            {
                title: 'Désigner un responsable conformité',
                description: 'Nommez une personne ou équipe responsable de la conformité AI Act au sein de votre organisation.',
                priority: 'high'
            },
            {
                title: 'Réaliser une analyse d\'écart',
                description: 'Effectuez une analyse d\'écart entre votre situation actuelle et les exigences du Règlement.',
                priority: 'high'
            },
            {
                title: 'Planifier l\'évaluation de conformité',
                description: 'Préparez votre évaluation de conformité en identifiant si vous devez passer par un organisme notifié.',
                priority: 'high'
            },
            {
                title: 'Mettre en place la gouvernance des données',
                description: 'Établissez des processus robustes pour la gestion des données d\'entraînement et de test.',
                priority: 'medium'
            },
            {
                title: 'Documenter le système',
                description: 'Commencez à constituer la documentation technique requise dès maintenant.',
                priority: 'medium'
            },
            {
                title: 'Prévoir la surveillance humaine',
                description: 'Concevez des mécanismes de surveillance humaine dans l\'architecture du système.',
                priority: 'medium'
            }
        ],
        gpai_systemic: [
            {
                title: 'Évaluation des risques systémiques',
                description: 'Conduisez une évaluation approfondie des risques systémiques potentiels de votre modèle.',
                priority: 'high'
            },
            {
                title: 'Renforcer la cybersécurité',
                description: 'Mettez en place des mesures de cybersécurité renforcées adaptées à l\'ampleur du modèle.',
                priority: 'high'
            },
            {
                title: 'Préparer les red team tests',
                description: 'Planifiez des tests adversariaux (red teaming) pour identifier les vulnérabilités.',
                priority: 'medium'
            }
        ],
        gpai_standard: [
            {
                title: 'Documenter le processus d\'entraînement',
                description: 'Documentez en détail votre processus d\'entraînement et les données utilisées.',
                priority: 'high'
            },
            {
                title: 'Préparer les informations pour les intégrateurs',
                description: 'Créez une documentation claire pour les fournisseurs qui intégreront votre modèle.',
                priority: 'medium'
            }
        ],
        limited: [
            {
                title: 'Implémenter les notices de transparence',
                description: 'Mettez en place des mécanismes clairs pour informer les utilisateurs de l\'interaction avec l\'IA.',
                priority: 'medium'
            },
            {
                title: 'Mettre en place le marquage du contenu',
                description: 'Implémentez des métadonnées et marquages pour identifier le contenu généré par IA.',
                priority: 'medium'
            }
        ],
        minimal: [
            {
                title: 'Adopter les bonnes pratiques',
                description: 'Même sans obligations légales, adoptez les bonnes pratiques de développement responsable.',
                priority: 'low'
            },
            {
                title: 'Suivre l\'évolution réglementaire',
                description: 'Restez informé des évolutions du cadre réglementaire qui pourraient affecter votre système.',
                priority: 'low'
            }
        ],
        // Additional context-specific recommendations
        gdpr: [
            {
                title: 'Conformité RGPD',
                description: 'Votre système traite des données personnelles. Assurez-vous de la conformité au RGPD en parallèle de l\'AI Act.',
                priority: 'high'
            },
            {
                title: 'Analyse d\'impact (AIPD)',
                description: 'Envisagez de réaliser une analyse d\'impact relative à la protection des données.',
                priority: 'medium'
            }
        ],
        no_oversight: [
            {
                title: 'Implémenter une surveillance humaine',
                description: 'Votre système manque de mécanismes de surveillance humaine. C\'est une exigence pour les systèmes à haut risque.',
                priority: 'high'
            }
        ],
        no_documentation: [
            {
                title: 'Créer la documentation technique',
                description: 'L\'absence de documentation technique est un manquement critique pour les systèmes à haut risque.',
                priority: 'high'
            }
        ]
    },

    /**
     * Evaluate the risk level based on answers
     * @param {Object} answers - User's answers
     * @returns {Object} Risk assessment result
     */
    evaluate(answers) {
        const result = {
            riskLevel: 'minimal',
            triggers: [],
            obligations: [],
            recommendations: [],
            articles: new Set()
        };

        // Check for unacceptable practices first (Article 5)
        if (this.checkUnacceptablePractices(answers, result)) {
            return this.finalizeResult(result);
        }

        // Check for high-risk systems (Annexes I and III)
        this.checkHighRiskSystems(answers, result);

        // Check for GPAI models
        this.checkGPAIModels(answers, result);

        // Check for limited risk (transparency obligations)
        this.checkLimitedRisk(answers, result);

        // Add context-specific recommendations
        this.addContextRecommendations(answers, result);

        return this.finalizeResult(result);
    },

    /**
     * Check for prohibited practices (Article 5)
     */
    checkUnacceptablePractices(answers, result) {
        const prohibitedChecks = [
            { id: 'manipulation', value: 'yes' },
            { id: 'vulnerability_exploitation', value: 'yes' },
            { id: 'social_scoring', value: 'yes' },
            { id: 'biometric_realtime', value: 'yes' },
            { id: 'emotion_recognition_work', value: 'yes' },
            { id: 'biometric_categorization', value: 'yes' },
            { id: 'facial_scraping', value: 'yes' }
        ];

        for (const check of prohibitedChecks) {
            if (answers[check.id] === check.value) {
                const question = QUESTIONS.find(q => q.id === check.id);
                if (question && question.riskIndicators && question.riskIndicators[check.value]) {
                    result.riskLevel = 'unacceptable';
                    result.triggers.push({
                        question: question.title,
                        article: question.riskIndicators[check.value].article,
                        reason: 'Pratique interdite par l\'AI Act'
                    });
                    result.articles.add(question.riskIndicators[check.value].article);
                }
            }
        }

        return result.riskLevel === 'unacceptable';
    },

    /**
     * Check for high-risk systems (Articles 6-7, Annexes I and III)
     */
    checkHighRiskSystems(answers, result) {
        // Check Annex I products
        if (answers.annex1_product && Array.isArray(answers.annex1_product)) {
            for (const product of answers.annex1_product) {
                if (product !== 'none') {
                    const question = QUESTIONS.find(q => q.id === 'annex1_product');
                    if (question && question.riskIndicators && question.riskIndicators[product]) {
                        this.upgradeRiskLevel(result, 'high');
                        result.triggers.push({
                            question: question.title,
                            article: question.riskIndicators[product].article,
                            reason: 'Composant de sécurité d\'un produit réglementé'
                        });
                        result.articles.add(question.riskIndicators[product].article);
                    }
                }
            }
        }

        // Check Annex III domains
        const annexIIIChecks = [
            'biometric_identification',
            'critical_infrastructure',
            'education',
            'employment',
            'essential_services',
            'law_enforcement',
            'migration',
            'justice'
        ];

        for (const checkId of annexIIIChecks) {
            const answer = answers[checkId];
            if (!answer) continue;

            const question = QUESTIONS.find(q => q.id === checkId);
            if (!question || !question.riskIndicators) continue;

            if (Array.isArray(answer)) {
                for (const value of answer) {
                    if (value !== 'none' && question.riskIndicators[value]) {
                        this.upgradeRiskLevel(result, question.riskIndicators[value].level);
                        result.triggers.push({
                            question: question.title,
                            article: question.riskIndicators[value].article,
                            reason: 'Domaine à haut risque (Annexe III)'
                        });
                        result.articles.add(question.riskIndicators[value].article);
                    }
                }
            } else if (answer !== 'no' && answer !== 'none' && question.riskIndicators[answer]) {
                this.upgradeRiskLevel(result, question.riskIndicators[answer].level);
                result.triggers.push({
                    question: question.title,
                    article: question.riskIndicators[answer].article,
                    reason: 'Domaine à haut risque (Annexe III)'
                });
                result.articles.add(question.riskIndicators[answer].article);
            }
        }
    },

    /**
     * Check for GPAI models
     */
    checkGPAIModels(answers, result) {
        if (answers.gpai_systemic === 'yes') {
            this.upgradeRiskLevel(result, 'gpai_systemic');
            result.triggers.push({
                question: 'Modèle GPAI à risque systémique',
                article: 'Articles 51-55',
                reason: 'Modèle d\'IA à usage général présentant un risque systémique'
            });
            result.articles.add('Articles 51-55');
        } else if (answers.gpai_systemic === 'no' || answers.system_type === 'gpai_provider') {
            this.upgradeRiskLevel(result, 'gpai_standard');
            result.triggers.push({
                question: 'Modèle GPAI standard',
                article: 'Article 53',
                reason: 'Modèle d\'IA à usage général'
            });
            result.articles.add('Article 53');
        }
    },

    /**
     * Check for limited risk (transparency obligations)
     */
    checkLimitedRisk(answers, result) {
        const transparencyChecks = [
            { id: 'chatbot', value: 'yes' },
            { id: 'content_generation', value: 'yes' },
            { id: 'emotion_detection', values: ['emotion', 'categorization', 'both'] }
        ];

        for (const check of transparencyChecks) {
            const answer = answers[check.id];
            if (!answer) continue;

            const question = QUESTIONS.find(q => q.id === check.id);
            if (!question || !question.riskIndicators) continue;

            if (check.values) {
                if (check.values.includes(answer) && question.riskIndicators[answer]) {
                    this.upgradeRiskLevel(result, 'limited');
                    result.triggers.push({
                        question: question.title,
                        article: question.riskIndicators[answer].article,
                        reason: 'Obligation de transparence'
                    });
                    result.articles.add(question.riskIndicators[answer].article);
                }
            } else if (answer === check.value && question.riskIndicators[answer]) {
                this.upgradeRiskLevel(result, 'limited');
                result.triggers.push({
                    question: question.title,
                    article: question.riskIndicators[answer].article,
                    reason: 'Obligation de transparence'
                });
                result.articles.add(question.riskIndicators[answer].article);
            }
        }
    },

    /**
     * Add context-specific recommendations
     */
    addContextRecommendations(answers, result) {
        // GDPR considerations
        if (answers.data_personal === 'yes') {
            result.recommendations.push(...this.RECOMMENDATIONS.gdpr);
        }

        // Human oversight
        if (answers.human_oversight === 'none' &&
            (result.riskLevel === 'high' || result.riskLevel === 'gpai_systemic')) {
            result.recommendations.push(...this.RECOMMENDATIONS.no_oversight);
        }

        // Documentation
        if (answers.documentation === 'none' &&
            (result.riskLevel === 'high' || result.riskLevel === 'gpai_systemic' || result.riskLevel === 'gpai_standard')) {
            result.recommendations.push(...this.RECOMMENDATIONS.no_documentation);
        }
    },

    /**
     * Upgrade risk level if new level is higher
     */
    upgradeRiskLevel(result, newLevel) {
        const currentRisk = this.RISK_LEVELS[result.riskLevel];
        const newRisk = this.RISK_LEVELS[newLevel];

        if (newRisk && (!currentRisk || newRisk.level > currentRisk.level)) {
            result.riskLevel = newLevel;
        }
    },

    /**
     * Finalize the result with obligations and recommendations
     */
    finalizeResult(result) {
        // Add standard obligations for the risk level
        const riskLevel = result.riskLevel;
        if (this.OBLIGATIONS[riskLevel]) {
            result.obligations = [...this.OBLIGATIONS[riskLevel]];
        }

        // Add standard recommendations for the risk level
        if (this.RECOMMENDATIONS[riskLevel]) {
            result.recommendations = [
                ...this.RECOMMENDATIONS[riskLevel],
                ...result.recommendations
            ];
        }

        // Remove duplicate recommendations
        const seenTitles = new Set();
        result.recommendations = result.recommendations.filter(rec => {
            if (seenTitles.has(rec.title)) return false;
            seenTitles.add(rec.title);
            return true;
        });

        // Convert articles Set to Array
        result.articles = Array.from(result.articles);

        // Add risk level details
        result.riskDetails = this.RISK_LEVELS[riskLevel];

        return result;
    },

    /**
     * Get summary statistics
     */
    getSummary(result) {
        return {
            riskLevel: result.riskDetails.label,
            obligationsCount: result.obligations.length,
            recommendationsCount: result.recommendations.length,
            triggersCount: result.triggers.length,
            articlesCount: result.articles.length,
            highPriorityItems: [
                ...result.obligations.filter(o => o.priority === 'critical' || o.priority === 'high'),
                ...result.recommendations.filter(r => r.priority === 'high')
            ].length
        };
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { RiskEngine };
}
