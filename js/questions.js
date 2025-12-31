/**
 * AI Act Compliance Simulator - Questions Database
 * Based on EU Regulation 2024/1689 (AI Act)
 */

const QUESTIONS = [
    // ============================================
    // SECTION 1: Identification du système
    // ============================================
    {
        id: 'system_type',
        category: 'Identification',
        title: 'Quel type de système d\'IA développez-vous ou déployez-vous ?',
        description: 'Sélectionnez la catégorie qui correspond le mieux à votre système.',
        help: 'Un système d\'IA est défini comme un système basé sur une machine conçu pour fonctionner avec différents niveaux d\'autonomie et qui peut générer des sorties telles que des prédictions, recommandations ou décisions.',
        type: 'single',
        options: [
            {
                value: 'provider',
                label: 'Fournisseur d\'un système d\'IA',
                description: 'Je développe ou fais développer un système d\'IA pour le mettre sur le marché ou en service sous mon nom'
            },
            {
                value: 'deployer',
                label: 'Déployeur d\'un système d\'IA',
                description: 'J\'utilise un système d\'IA dans le cadre de mon activité professionnelle'
            },
            {
                value: 'importer',
                label: 'Importateur ou distributeur',
                description: 'J\'importe ou distribue des systèmes d\'IA dans l\'UE'
            },
            {
                value: 'gpai_provider',
                label: 'Fournisseur de modèle GPAI',
                description: 'Je développe un modèle d\'IA à usage général (foundation model, LLM)'
            }
        ]
    },

    // ============================================
    // SECTION 2: Pratiques interdites (Article 5)
    // ============================================
    {
        id: 'manipulation',
        category: 'Pratiques Interdites',
        title: 'Votre système utilise-t-il des techniques subliminales ou manipulatrices ?',
        description: 'Techniques qui altèrent le comportement de manière à causer un préjudice significatif.',
        help: '<strong>Article 5(1)(a) :</strong> Sont interdits les systèmes d\'IA qui déploient des techniques subliminales agissant sur l\'inconscient ou des techniques délibérément manipulatrices ou trompeuses pour altérer substantiellement le comportement d\'une personne d\'une manière qui cause ou est susceptible de causer un préjudice significatif.',
        type: 'single',
        options: [
            { value: 'yes', label: 'Oui', description: 'Le système utilise de telles techniques' },
            { value: 'no', label: 'Non', description: 'Le système n\'utilise pas de telles techniques' },
            { value: 'unknown', label: 'Je ne sais pas', description: 'Je ne suis pas certain' }
        ],
        riskIndicators: {
            yes: { level: 'unacceptable', article: 'Article 5(1)(a)' }
        }
    },
    {
        id: 'vulnerability_exploitation',
        category: 'Pratiques Interdites',
        title: 'Votre système exploite-t-il des vulnérabilités de personnes ?',
        description: 'Exploitation de vulnérabilités liées à l\'âge, au handicap ou à la situation sociale/économique.',
        help: '<strong>Article 5(1)(b) :</strong> Sont interdits les systèmes exploitant les vulnérabilités d\'une personne ou d\'un groupe en raison de leur âge, handicap ou situation sociale/économique pour altérer substantiellement leur comportement de manière préjudiciable.',
        type: 'single',
        options: [
            { value: 'yes', label: 'Oui', description: 'Le système cible des groupes vulnérables' },
            { value: 'no', label: 'Non', description: 'Le système ne cible pas de groupes vulnérables' },
            { value: 'unknown', label: 'Je ne sais pas', description: 'Je ne suis pas certain' }
        ],
        riskIndicators: {
            yes: { level: 'unacceptable', article: 'Article 5(1)(b)' }
        }
    },
    {
        id: 'social_scoring',
        category: 'Pratiques Interdites',
        title: 'Votre système effectue-t-il une notation sociale par les autorités publiques ?',
        description: 'Évaluation ou classification de personnes basée sur leur comportement social.',
        help: '<strong>Article 5(1)(c) :</strong> Sont interdits les systèmes d\'IA utilisés par les autorités publiques pour évaluer ou classifier des personnes sur la base de leur comportement social ou de caractéristiques personnelles, menant à un traitement préjudiciable dans des contextes sans rapport.',
        type: 'single',
        options: [
            { value: 'yes', label: 'Oui', description: 'Le système effectue une notation sociale' },
            { value: 'no', label: 'Non', description: 'Pas de notation sociale' },
            { value: 'not_public', label: 'Non applicable', description: 'Je ne suis pas une autorité publique' }
        ],
        riskIndicators: {
            yes: { level: 'unacceptable', article: 'Article 5(1)(c)' }
        }
    },
    {
        id: 'biometric_realtime',
        category: 'Pratiques Interdites',
        title: 'Votre système effectue-t-il une identification biométrique en temps réel dans des espaces publics ?',
        description: 'Identification de personnes via reconnaissance faciale en temps réel dans les lieux publics.',
        help: '<strong>Article 5(1)(h) :</strong> L\'utilisation de systèmes d\'identification biométrique à distance en temps réel dans les espaces publics à des fins répressives est interdite, sauf exceptions strictement limitées (recherche de victimes, menaces terroristes, infractions graves).',
        type: 'single',
        options: [
            { value: 'yes', label: 'Oui', description: 'Identification biométrique en temps réel dans les espaces publics' },
            { value: 'no', label: 'Non', description: 'Pas d\'identification biométrique en temps réel' },
            { value: 'exception', label: 'Oui, mais avec autorisation légale', description: 'Usage autorisé par la loi pour des cas spécifiques' }
        ],
        riskIndicators: {
            yes: { level: 'unacceptable', article: 'Article 5(1)(h)' }
        }
    },
    {
        id: 'emotion_recognition_work',
        category: 'Pratiques Interdites',
        title: 'Votre système effectue-t-il une reconnaissance des émotions sur le lieu de travail ou dans l\'éducation ?',
        description: 'Détection des émotions des employés ou des étudiants.',
        help: '<strong>Article 5(1)(f) :</strong> Sont interdits les systèmes d\'IA utilisés pour déduire les émotions d\'une personne sur le lieu de travail ou dans les établissements d\'enseignement, sauf pour des raisons médicales ou de sécurité.',
        type: 'single',
        options: [
            { value: 'yes', label: 'Oui', description: 'Reconnaissance des émotions au travail/école' },
            { value: 'no', label: 'Non', description: 'Pas de reconnaissance des émotions' },
            { value: 'medical', label: 'Oui, pour raisons médicales/sécurité', description: 'Usage médical ou de sécurité autorisé' }
        ],
        riskIndicators: {
            yes: { level: 'unacceptable', article: 'Article 5(1)(f)' }
        }
    },
    {
        id: 'biometric_categorization',
        category: 'Pratiques Interdites',
        title: 'Votre système catégorise-t-il des personnes sur la base de données biométriques sensibles ?',
        description: 'Classification basée sur la race, opinions politiques, religion, orientation sexuelle, etc.',
        help: '<strong>Article 5(1)(g) :</strong> Sont interdits les systèmes de catégorisation biométrique qui classent individuellement des personnes sur la base de leurs données biométriques pour déduire leur race, opinions politiques, appartenance syndicale, croyances religieuses, vie sexuelle ou orientation sexuelle.',
        type: 'single',
        options: [
            { value: 'yes', label: 'Oui', description: 'Catégorisation basée sur des données sensibles' },
            { value: 'no', label: 'Non', description: 'Pas de telle catégorisation' }
        ],
        riskIndicators: {
            yes: { level: 'unacceptable', article: 'Article 5(1)(g)' }
        }
    },
    {
        id: 'facial_scraping',
        category: 'Pratiques Interdites',
        title: 'Votre système effectue-t-il un scraping non ciblé d\'images faciales ?',
        description: 'Collecte massive d\'images faciales depuis Internet ou la vidéosurveillance.',
        help: '<strong>Article 5(1)(e) :</strong> Sont interdits les systèmes d\'IA qui créent ou étendent des bases de données de reconnaissance faciale par le scraping non ciblé d\'images faciales depuis Internet ou des enregistrements de vidéosurveillance.',
        type: 'single',
        options: [
            { value: 'yes', label: 'Oui', description: 'Scraping d\'images faciales' },
            { value: 'no', label: 'Non', description: 'Pas de scraping d\'images faciales' }
        ],
        riskIndicators: {
            yes: { level: 'unacceptable', article: 'Article 5(1)(e)' }
        }
    },

    // ============================================
    // SECTION 3: Systèmes à Haut Risque - Annexe I
    // ============================================
    {
        id: 'annex1_product',
        category: 'Haut Risque - Produits',
        title: 'Votre système d\'IA est-il intégré dans un produit couvert par la législation d\'harmonisation de l\'UE (Annexe I) ?',
        description: 'Composant de sécurité d\'un produit réglementé par des directives européennes.',
        help: '<strong>Article 6(1) et Annexe I :</strong> Un système d\'IA est à haut risque s\'il est destiné à être utilisé comme composant de sécurité d\'un produit couvert par la législation listée à l\'Annexe I, ou s\'il est lui-même un tel produit, et doit faire l\'objet d\'une évaluation de conformité par un tiers.',
        type: 'multiple',
        options: [
            { value: 'machinery', label: 'Machines et équipements', description: 'Directive 2006/42/CE sur les machines' },
            { value: 'toys', label: 'Jouets', description: 'Directive 2009/48/CE sur la sécurité des jouets' },
            { value: 'medical', label: 'Dispositifs médicaux', description: 'Règlement 2017/745 sur les dispositifs médicaux' },
            { value: 'ivd', label: 'Dispositifs de diagnostic in vitro', description: 'Règlement 2017/746 sur les DIV' },
            { value: 'vehicles', label: 'Véhicules', description: 'Règlement 2019/2144 sur les véhicules' },
            { value: 'aviation', label: 'Aviation civile', description: 'Règlement 2018/1139 sur l\'aviation' },
            { value: 'marine', label: 'Équipements marins', description: 'Directive 2014/90/UE' },
            { value: 'rail', label: 'Systèmes ferroviaires', description: 'Directive 2016/797 sur l\'interopérabilité ferroviaire' },
            { value: 'lifts', label: 'Ascenseurs', description: 'Directive 2014/33/UE sur les ascenseurs' },
            { value: 'pressure', label: 'Équipements sous pression', description: 'Directive 2014/68/UE' },
            { value: 'radio', label: 'Équipements radioélectriques', description: 'Directive 2014/53/UE' },
            { value: 'none', label: 'Aucun de ces produits', description: 'Mon système n\'est pas intégré dans ces produits' }
        ],
        riskIndicators: {
            machinery: { level: 'high', article: 'Annexe I, point 1' },
            toys: { level: 'high', article: 'Annexe I, point 2' },
            medical: { level: 'high', article: 'Annexe I, point 10' },
            ivd: { level: 'high', article: 'Annexe I, point 11' },
            vehicles: { level: 'high', article: 'Annexe I, point 14' },
            aviation: { level: 'high', article: 'Annexe I, point 17' },
            marine: { level: 'high', article: 'Annexe I, point 18' },
            rail: { level: 'high', article: 'Annexe I, point 19' },
            lifts: { level: 'high', article: 'Annexe I, point 5' },
            pressure: { level: 'high', article: 'Annexe I, point 7' },
            radio: { level: 'high', article: 'Annexe I, point 8' }
        }
    },

    // ============================================
    // SECTION 4: Systèmes à Haut Risque - Annexe III
    // ============================================
    {
        id: 'biometric_identification',
        category: 'Haut Risque - Biométrie',
        title: 'Votre système effectue-t-il une identification ou une vérification biométrique à distance ?',
        description: 'Identification ou authentification de personnes par des données biométriques.',
        help: '<strong>Annexe III, point 1 :</strong> Systèmes d\'IA destinés à être utilisés pour l\'identification biométrique à distance des personnes (hors vérification dont le seul but est de confirmer qu\'une personne est bien celle qu\'elle prétend être).',
        type: 'single',
        options: [
            { value: 'remote_id', label: 'Identification biométrique à distance', description: 'Identification de personnes dans un groupe' },
            { value: 'verification', label: 'Vérification biométrique', description: 'Confirmation d\'identité 1:1' },
            { value: 'no', label: 'Non', description: 'Pas de biométrie' }
        ],
        riskIndicators: {
            remote_id: { level: 'high', article: 'Annexe III, point 1(a)' },
            verification: { level: 'limited', article: 'Annexe III, exception' }
        }
    },
    {
        id: 'critical_infrastructure',
        category: 'Haut Risque - Infrastructures',
        title: 'Votre système est-il utilisé dans la gestion d\'infrastructures critiques ?',
        description: 'Composant de sécurité dans la gestion du trafic, approvisionnement en eau, gaz, électricité, etc.',
        help: '<strong>Annexe III, point 2 :</strong> Systèmes d\'IA destinés à être utilisés comme composants de sécurité dans la gestion et l\'exploitation d\'infrastructures critiques numériques, du trafic routier, de l\'approvisionnement en eau, gaz, chauffage et électricité.',
        type: 'single',
        options: [
            { value: 'yes', label: 'Oui', description: 'Gestion d\'infrastructures critiques' },
            { value: 'no', label: 'Non', description: 'Pas d\'infrastructure critique' }
        ],
        riskIndicators: {
            yes: { level: 'high', article: 'Annexe III, point 2' }
        }
    },
    {
        id: 'education',
        category: 'Haut Risque - Éducation',
        title: 'Votre système est-il utilisé dans l\'éducation ou la formation professionnelle ?',
        description: 'Détermination d\'accès, affectation, évaluation ou détection de tricherie.',
        help: '<strong>Annexe III, point 3 :</strong> Systèmes d\'IA destinés à déterminer l\'accès, l\'admission ou l\'affectation à des établissements d\'enseignement, à évaluer les résultats d\'apprentissage, ou à détecter les comportements interdits pendant les examens.',
        type: 'multiple',
        options: [
            { value: 'admission', label: 'Admission/Affectation', description: 'Décisions d\'accès aux établissements' },
            { value: 'assessment', label: 'Évaluation des apprentissages', description: 'Notation ou évaluation des étudiants' },
            { value: 'cheating', label: 'Détection de tricherie', description: 'Surveillance des examens' },
            { value: 'career', label: 'Orientation professionnelle', description: 'Recommandations de carrière' },
            { value: 'none', label: 'Aucun de ces usages', description: 'Pas d\'usage éducatif' }
        ],
        riskIndicators: {
            admission: { level: 'high', article: 'Annexe III, point 3(a)' },
            assessment: { level: 'high', article: 'Annexe III, point 3(b)' },
            cheating: { level: 'high', article: 'Annexe III, point 3(c)' },
            career: { level: 'high', article: 'Annexe III, point 3(d)' }
        }
    },
    {
        id: 'employment',
        category: 'Haut Risque - Emploi',
        title: 'Votre système est-il utilisé dans le recrutement ou la gestion des travailleurs ?',
        description: 'Recrutement, évaluation, promotion, licenciement, surveillance des employés.',
        help: '<strong>Annexe III, point 4 :</strong> Systèmes d\'IA destinés au recrutement, à la sélection de candidats, à la prise de décisions affectant les conditions de travail, à la promotion/licenciement, à l\'attribution des tâches ou à la surveillance des travailleurs.',
        type: 'multiple',
        options: [
            { value: 'recruitment', label: 'Recrutement/Tri de CV', description: 'Sélection de candidats' },
            { value: 'interviews', label: 'Analyse d\'entretiens', description: 'Évaluation lors des entretiens' },
            { value: 'performance', label: 'Évaluation de performance', description: 'Notation des employés' },
            { value: 'promotion', label: 'Promotion/Licenciement', description: 'Décisions de carrière' },
            { value: 'task', label: 'Attribution des tâches', description: 'Répartition du travail' },
            { value: 'monitoring', label: 'Surveillance des employés', description: 'Monitoring du comportement' },
            { value: 'none', label: 'Aucun de ces usages', description: 'Pas d\'usage RH' }
        ],
        riskIndicators: {
            recruitment: { level: 'high', article: 'Annexe III, point 4(a)' },
            interviews: { level: 'high', article: 'Annexe III, point 4(a)' },
            performance: { level: 'high', article: 'Annexe III, point 4(b)' },
            promotion: { level: 'high', article: 'Annexe III, point 4(b)' },
            task: { level: 'high', article: 'Annexe III, point 4(c)' },
            monitoring: { level: 'high', article: 'Annexe III, point 4(d)' }
        }
    },
    {
        id: 'essential_services',
        category: 'Haut Risque - Services Essentiels',
        title: 'Votre système influence-t-il l\'accès à des services essentiels ?',
        description: 'Évaluation de crédit, assurance, services publics, services d\'urgence.',
        help: '<strong>Annexe III, point 5 :</strong> Systèmes d\'IA destinés à évaluer l\'éligibilité pour des prestations ou services publics, la solvabilité, les primes d\'assurance, ou à dispatcher les services d\'urgence.',
        type: 'multiple',
        options: [
            { value: 'credit', label: 'Scoring de crédit', description: 'Évaluation de solvabilité' },
            { value: 'public_benefits', label: 'Prestations publiques', description: 'Éligibilité aux aides sociales' },
            { value: 'insurance', label: 'Assurance', description: 'Évaluation des risques, primes' },
            { value: 'emergency', label: 'Services d\'urgence', description: 'Dispatch pompiers, police, SAMU' },
            { value: 'none', label: 'Aucun de ces usages', description: 'Pas de service essentiel' }
        ],
        riskIndicators: {
            credit: { level: 'high', article: 'Annexe III, point 5(a)' },
            public_benefits: { level: 'high', article: 'Annexe III, point 5(b)' },
            insurance: { level: 'high', article: 'Annexe III, point 5(c)' },
            emergency: { level: 'high', article: 'Annexe III, point 5(d)' }
        }
    },
    {
        id: 'law_enforcement',
        category: 'Haut Risque - Application de la Loi',
        title: 'Votre système est-il utilisé par les forces de l\'ordre ?',
        description: 'Évaluation de risques, détection de mensonges, profilage, analyse criminelle.',
        help: '<strong>Annexe III, point 6 :</strong> Systèmes d\'IA destinés à évaluer le risque de commission d\'infractions, à servir de polygraphes, à évaluer la fiabilité de preuves, à profiler des suspects ou à analyser des données criminelles.',
        type: 'multiple',
        options: [
            { value: 'risk_assessment', label: 'Évaluation de risque criminel', description: 'Prédiction de récidive' },
            { value: 'polygraph', label: 'Détection de mensonges', description: 'Polygraphes IA' },
            { value: 'evidence', label: 'Analyse de preuves', description: 'Évaluation de fiabilité' },
            { value: 'profiling', label: 'Profilage', description: 'Profilage de suspects' },
            { value: 'crime_analysis', label: 'Analyse criminelle', description: 'Analyse de données criminelles' },
            { value: 'none', label: 'Aucun de ces usages', description: 'Pas d\'usage répressif' }
        ],
        riskIndicators: {
            risk_assessment: { level: 'high', article: 'Annexe III, point 6(a)' },
            polygraph: { level: 'high', article: 'Annexe III, point 6(b)' },
            evidence: { level: 'high', article: 'Annexe III, point 6(c)' },
            profiling: { level: 'high', article: 'Annexe III, point 6(d)' },
            crime_analysis: { level: 'high', article: 'Annexe III, point 6(e)' }
        }
    },
    {
        id: 'migration',
        category: 'Haut Risque - Migration',
        title: 'Votre système est-il utilisé dans la gestion de la migration et des frontières ?',
        description: 'Évaluation de demandes d\'asile, contrôles aux frontières, détection de risques.',
        help: '<strong>Annexe III, point 7 :</strong> Systèmes d\'IA destinés à évaluer des demandes d\'asile/visa, à détecter des risques aux frontières, ou à évaluer des risques liés à l\'immigration irrégulière.',
        type: 'multiple',
        options: [
            { value: 'asylum', label: 'Demandes d\'asile/visa', description: 'Évaluation de demandes' },
            { value: 'border', label: 'Contrôle aux frontières', description: 'Détection de risques' },
            { value: 'irregular', label: 'Immigration irrégulière', description: 'Évaluation de risques' },
            { value: 'none', label: 'Aucun de ces usages', description: 'Pas d\'usage migratoire' }
        ],
        riskIndicators: {
            asylum: { level: 'high', article: 'Annexe III, point 7(a)' },
            border: { level: 'high', article: 'Annexe III, point 7(b)' },
            irregular: { level: 'high', article: 'Annexe III, point 7(c)' }
        }
    },
    {
        id: 'justice',
        category: 'Haut Risque - Justice',
        title: 'Votre système est-il utilisé dans l\'administration de la justice ?',
        description: 'Aide à la décision judiciaire, résolution de litiges, influence sur les élections.',
        help: '<strong>Annexe III, point 8 :</strong> Systèmes d\'IA destinés à aider les autorités judiciaires à rechercher et interpréter les faits et le droit, ou à influencer le résultat d\'élections ou de référendums.',
        type: 'multiple',
        options: [
            { value: 'judicial', label: 'Aide à la décision judiciaire', description: 'Assistance aux juges' },
            { value: 'adr', label: 'Résolution alternative de litiges', description: 'Médiation, arbitrage' },
            { value: 'elections', label: 'Processus électoraux', description: 'Influence sur les votes' },
            { value: 'none', label: 'Aucun de ces usages', description: 'Pas d\'usage judiciaire' }
        ],
        riskIndicators: {
            judicial: { level: 'high', article: 'Annexe III, point 8(a)' },
            adr: { level: 'high', article: 'Annexe III, point 8(a)' },
            elections: { level: 'high', article: 'Annexe III, point 8(b)' }
        }
    },

    // ============================================
    // SECTION 5: Obligations de Transparence (Article 50)
    // ============================================
    {
        id: 'chatbot',
        category: 'Transparence',
        title: 'Votre système interagit-il directement avec des personnes ?',
        description: 'Chatbots, assistants virtuels, systèmes conversationnels.',
        help: '<strong>Article 50(1) :</strong> Les fournisseurs doivent veiller à ce que les systèmes d\'IA destinés à interagir directement avec des personnes soient conçus de manière à informer celles-ci qu\'elles interagissent avec un système d\'IA, sauf si cela est évident.',
        type: 'single',
        options: [
            { value: 'yes', label: 'Oui', description: 'Le système interagit avec des utilisateurs' },
            { value: 'no', label: 'Non', description: 'Pas d\'interaction directe' }
        ],
        riskIndicators: {
            yes: { level: 'limited', article: 'Article 50(1)' }
        }
    },
    {
        id: 'content_generation',
        category: 'Transparence',
        title: 'Votre système génère-t-il du contenu synthétique (texte, audio, image, vidéo) ?',
        description: 'Génération de contenu qui pourrait être confondu avec du contenu authentique.',
        help: '<strong>Article 50(2) et (4) :</strong> Les déployeurs de systèmes générant du contenu synthétique (deepfakes) doivent informer que le contenu a été généré ou manipulé artificiellement. Le contenu doit être marqué de manière lisible par machine.',
        type: 'single',
        options: [
            { value: 'yes', label: 'Oui', description: 'Génération de contenu synthétique' },
            { value: 'no', label: 'Non', description: 'Pas de génération de contenu' }
        ],
        riskIndicators: {
            yes: { level: 'limited', article: 'Article 50(2) et (4)' }
        }
    },
    {
        id: 'emotion_detection',
        category: 'Transparence',
        title: 'Votre système détecte-t-il les émotions ou effectue-t-il une catégorisation biométrique ?',
        description: 'Hors des cas interdits (travail/éducation), ces systèmes requièrent transparence.',
        help: '<strong>Article 50(3) :</strong> Les déployeurs de systèmes de reconnaissance des émotions ou de catégorisation biométrique doivent en informer les personnes exposées et traiter les données conformément au RGPD.',
        type: 'single',
        options: [
            { value: 'emotion', label: 'Détection d\'émotions', description: 'Analyse des expressions, voix, etc.' },
            { value: 'categorization', label: 'Catégorisation biométrique', description: 'Classification par caractéristiques physiques' },
            { value: 'both', label: 'Les deux', description: 'Émotions et catégorisation' },
            { value: 'no', label: 'Aucun', description: 'Pas de détection d\'émotions ni de catégorisation' }
        ],
        riskIndicators: {
            emotion: { level: 'limited', article: 'Article 50(3)' },
            categorization: { level: 'limited', article: 'Article 50(3)' },
            both: { level: 'limited', article: 'Article 50(3)' }
        }
    },

    // ============================================
    // SECTION 6: Modèles GPAI (Chapitre V)
    // ============================================
    {
        id: 'gpai_systemic',
        category: 'Modèles GPAI',
        title: 'Si vous fournissez un modèle GPAI, présente-t-il un risque systémique ?',
        description: 'Modèles entraînés avec plus de 10^25 FLOP ou capacités d\'impact élevé.',
        help: '<strong>Article 51 :</strong> Un modèle GPAI présente un risque systémique s\'il a des capacités d\'impact élevé ou si la quantité de calcul cumulée pour l\'entraînement dépasse 10^25 opérations en virgule flottante.',
        type: 'single',
        options: [
            { value: 'yes', label: 'Oui, risque systémique', description: 'Modèle dépassant les seuils ou désigné' },
            { value: 'no', label: 'Non, risque standard', description: 'Modèle GPAI sans risque systémique' },
            { value: 'not_gpai', label: 'Non applicable', description: 'Je ne fournis pas de modèle GPAI' }
        ],
        riskIndicators: {
            yes: { level: 'gpai_systemic', article: 'Articles 51-55' },
            no: { level: 'gpai_standard', article: 'Articles 53' }
        }
    },

    // ============================================
    // SECTION 7: Questions supplémentaires
    // ============================================
    {
        id: 'data_personal',
        category: 'Données',
        title: 'Votre système traite-t-il des données personnelles ?',
        description: 'Données permettant d\'identifier directement ou indirectement des personnes.',
        help: 'Le traitement de données personnelles implique des obligations RGPD en plus de l\'AI Act. Une analyse d\'impact (AIPD) peut être requise.',
        type: 'single',
        options: [
            { value: 'yes', label: 'Oui', description: 'Traitement de données personnelles' },
            { value: 'no', label: 'Non', description: 'Pas de données personnelles' },
            { value: 'anonymous', label: 'Données anonymisées', description: 'Données anonymisées uniquement' }
        ]
    },
    {
        id: 'human_oversight',
        category: 'Surveillance',
        title: 'Votre système prévoit-il une surveillance humaine ?',
        description: 'Mécanismes permettant à un humain de superviser et intervenir.',
        help: '<strong>Article 14 :</strong> Les systèmes à haut risque doivent être conçus pour permettre une surveillance humaine effective, incluant la capacité de comprendre les capacités et limites du système, d\'interpréter ses sorties, et d\'intervenir ou l\'arrêter.',
        type: 'single',
        options: [
            { value: 'full', label: 'Supervision complète', description: 'Humain dans la boucle pour chaque décision' },
            { value: 'partial', label: 'Supervision partielle', description: 'Revue humaine pour certains cas' },
            { value: 'override', label: 'Capacité d\'intervention', description: 'Possibilité d\'arrêter ou corriger' },
            { value: 'none', label: 'Aucune supervision', description: 'Système entièrement automatisé' }
        ]
    },
    {
        id: 'documentation',
        category: 'Documentation',
        title: 'Disposez-vous d\'une documentation technique complète ?',
        description: 'Documentation décrivant le système, son développement et son fonctionnement.',
        help: '<strong>Article 11 :</strong> Les systèmes à haut risque doivent être accompagnés d\'une documentation technique démontrant la conformité, incluant la description générale, les processus de conception, les performances et les limites.',
        type: 'single',
        options: [
            { value: 'complete', label: 'Documentation complète', description: 'Toute la documentation requise' },
            { value: 'partial', label: 'Documentation partielle', description: 'Documentation incomplète' },
            { value: 'none', label: 'Pas de documentation', description: 'Documentation absente ou insuffisante' }
        ]
    },
    {
        id: 'conformity_assessment',
        category: 'Conformité',
        title: 'Avez-vous effectué une évaluation de conformité ?',
        description: 'Processus vérifiant que le système respecte les exigences applicables.',
        help: '<strong>Articles 43-48 :</strong> Avant mise sur le marché, les systèmes à haut risque doivent faire l\'objet d\'une évaluation de conformité, soit par auto-évaluation soit par un organisme notifié selon le type de système.',
        type: 'single',
        options: [
            { value: 'third_party', label: 'Évaluation par un tiers', description: 'Organisme notifié' },
            { value: 'internal', label: 'Auto-évaluation', description: 'Évaluation interne documentée' },
            { value: 'planned', label: 'Planifiée', description: 'Évaluation prévue mais non réalisée' },
            { value: 'none', label: 'Non réalisée', description: 'Pas d\'évaluation effectuée' }
        ]
    }
];

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { QUESTIONS };
}
