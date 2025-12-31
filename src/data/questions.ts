import { Question } from '../types';

export const sections = [
  {
    id: 'identification',
    title: 'Identification du système IA',
    description: 'Caractéristiques générales de votre système d\'intelligence artificielle',
    icon: 'cpu',
  },
  {
    id: 'domain',
    title: 'Domaine d\'application',
    description: 'Secteur et contexte d\'utilisation du système',
    icon: 'building',
  },
  {
    id: 'data',
    title: 'Données et entraînement',
    description: 'Gestion des données et processus d\'entraînement',
    icon: 'database',
  },
  {
    id: 'transparency',
    title: 'Transparence et explicabilité',
    description: 'Information et recours des utilisateurs',
    icon: 'eye',
  },
  {
    id: 'governance',
    title: 'Gouvernance',
    description: 'Organisation et processus de supervision',
    icon: 'shield',
  },
];

export const questions: Question[] = [
  // Section 1: Identification du système IA
  {
    id: 'q1_type',
    section: 'identification',
    text: 'Quel type de système IA utilisez-vous ?',
    options: [
      { label: 'ML classique (régression, classification)', value: 'ml_classic', points: 1 },
      { label: 'Deep Learning (réseaux de neurones)', value: 'deep_learning', points: 2 },
      { label: 'IA Générative / LLM', value: 'genai_llm', points: 3 },
      { label: 'Système autonome / agents IA', value: 'autonomous', points: 4 },
    ],
  },
  {
    id: 'q2_decisions',
    section: 'identification',
    text: 'Le système prend-il des décisions automatisées affectant des personnes ?',
    options: [
      { label: 'Non, aucune décision automatisée', value: 'no', points: 0 },
      { label: 'Oui, mais avec validation humaine systématique', value: 'yes_validated', points: 2 },
      { label: 'Oui, décisions semi-automatiques', value: 'semi_auto', points: 3 },
      { label: 'Oui, décisions entièrement automatisées', value: 'full_auto', points: 5 },
    ],
  },
  {
    id: 'q3_criticality',
    section: 'identification',
    text: 'Quelle est la criticité des décisions ou recommandations ?',
    options: [
      { label: 'Information uniquement (pas d\'impact direct)', value: 'info', points: 0 },
      { label: 'Recommandation (aide à la décision)', value: 'recommendation', points: 2 },
      { label: 'Décision importante (impact significatif)', value: 'important', points: 4 },
      { label: 'Décision critique (santé, sécurité, droits)', value: 'critical', points: 5 },
    ],
  },
  {
    id: 'q4_status',
    section: 'identification',
    text: 'Quel est le statut actuel du système ?',
    options: [
      { label: 'En phase de recherche / POC', value: 'research', points: 0 },
      { label: 'En développement', value: 'development', points: 1 },
      { label: 'En pré-production / tests', value: 'preprod', points: 2 },
      { label: 'En production', value: 'production', points: 3 },
    ],
  },
  {
    id: 'q5_users',
    section: 'identification',
    text: 'Qui sont les utilisateurs finaux du système ?',
    options: [
      { label: 'Employés internes uniquement', value: 'internal', points: 1 },
      { label: 'Clients B2B (entreprises)', value: 'b2b', points: 2 },
      { label: 'Clients B2C (particuliers)', value: 'b2c', points: 3 },
      { label: 'Grand public sans restriction', value: 'public', points: 4 },
    ],
  },

  // Section 2: Domaine d'application
  {
    id: 'q6_sector',
    section: 'domain',
    text: 'Dans quel secteur le système est-il principalement utilisé ?',
    options: [
      { label: 'Commerce, marketing, divertissement', value: 'commercial', points: 1 },
      { label: 'Finance, assurance, banque', value: 'finance', points: 3 },
      { label: 'Santé, médecine, pharmaceutique', value: 'health', points: 4 },
      { label: 'Justice, police, sécurité publique', value: 'justice', points: 5 },
    ],
  },
  {
    id: 'q7_infrastructure',
    section: 'domain',
    text: 'Le système concerne-t-il une infrastructure critique ?',
    options: [
      { label: 'Non, aucune infrastructure critique', value: 'no', points: 0 },
      { label: 'Indirectement (services support)', value: 'indirect', points: 2 },
      { label: 'Oui, énergie, transport ou télécoms', value: 'yes_infra', points: 4 },
      { label: 'Oui, défense ou sécurité nationale', value: 'defense', points: 5 },
    ],
  },
  {
    id: 'q8_biometric',
    section: 'domain',
    text: 'Le système traite-t-il des données biométriques ?',
    options: [
      { label: 'Non, aucune donnée biométrique', value: 'no', points: 0 },
      { label: 'Oui, pour authentification optionnelle', value: 'optional_auth', points: 2 },
      { label: 'Oui, pour identification de personnes', value: 'identification', points: 4 },
      { label: 'Oui, reconnaissance faciale temps réel', value: 'realtime_facial', points: 5 },
    ],
  },
  {
    id: 'q9_scoring',
    section: 'domain',
    text: 'Le système effectue-t-il du scoring ou profiling de personnes ?',
    options: [
      { label: 'Non, aucun scoring personnel', value: 'no', points: 0 },
      { label: 'Oui, scoring produit/service (recommandation)', value: 'product', points: 1 },
      { label: 'Oui, scoring comportemental', value: 'behavioral', points: 3 },
      { label: 'Oui, scoring social ou de solvabilité', value: 'social_credit', points: 5 },
    ],
  },
  {
    id: 'q10_hr',
    section: 'domain',
    text: 'Le système est-il utilisé pour le recrutement ou la gestion RH ?',
    options: [
      { label: 'Non, pas d\'usage RH', value: 'no', points: 0 },
      { label: 'Oui, outils d\'aide (sourcing, matching)', value: 'support', points: 2 },
      { label: 'Oui, tri de candidatures', value: 'screening', points: 4 },
      { label: 'Oui, décisions RH automatisées', value: 'auto_decision', points: 5 },
    ],
  },

  // Section 3: Données et entraînement
  {
    id: 'q11_data_type',
    section: 'data',
    text: 'Quelles données sont utilisées par le système ?',
    options: [
      { label: 'Données publiques uniquement', value: 'public', points: 0 },
      { label: 'Données internes non personnelles', value: 'internal_non_personal', points: 1 },
      { label: 'Données personnelles non sensibles', value: 'personal', points: 3 },
      { label: 'Données sensibles (santé, opinions, origine...)', value: 'sensitive', points: 5 },
    ],
  },
  {
    id: 'q12_data_origin',
    section: 'data',
    text: 'L\'origine des données d\'entraînement est-elle documentée ?',
    options: [
      { label: 'Oui, complètement documentée et traçable', value: 'full', points: 0 },
      { label: 'Partiellement documentée', value: 'partial', points: 2 },
      { label: 'Peu documentée', value: 'minimal', points: 3 },
      { label: 'Non documentée / inconnue', value: 'unknown', points: 5 },
    ],
  },
  {
    id: 'q13_bias',
    section: 'data',
    text: 'Des tests de biais ont-ils été réalisés ?',
    options: [
      { label: 'Oui, tests réguliers et documentés', value: 'regular', points: 0 },
      { label: 'Oui, tests ponctuels', value: 'occasional', points: 2 },
      { label: 'Prévu mais non réalisé', value: 'planned', points: 3 },
      { label: 'Non, aucun test de biais', value: 'none', points: 4 },
    ],
  },
  {
    id: 'q14_versioning',
    section: 'data',
    text: 'La traçabilité des versions de modèles est-elle assurée ?',
    options: [
      { label: 'Oui, versioning complet (modèles, données, code)', value: 'complete', points: 0 },
      { label: 'Oui, versioning des modèles uniquement', value: 'models_only', points: 1 },
      { label: 'Versioning partiel', value: 'partial', points: 2 },
      { label: 'Non, pas de versioning', value: 'none', points: 4 },
    ],
  },
  {
    id: 'q15_lineage',
    section: 'data',
    text: 'Le data lineage (traçabilité des données) est-il documenté ?',
    options: [
      { label: 'Oui, lineage complet et automatisé', value: 'full_auto', points: 0 },
      { label: 'Oui, lineage manuel documenté', value: 'manual', points: 1 },
      { label: 'Partiellement', value: 'partial', points: 2 },
      { label: 'Non, pas de documentation du lineage', value: 'none', points: 4 },
    ],
  },

  // Section 4: Transparence et explicabilité
  {
    id: 'q16_disclosure',
    section: 'transparency',
    text: 'Les utilisateurs savent-ils qu\'ils interagissent avec une IA ?',
    options: [
      { label: 'Oui, information claire et visible', value: 'clear', points: 0 },
      { label: 'Oui, mentionné dans les CGU/documentation', value: 'documented', points: 2 },
      { label: 'Parfois, selon le contexte', value: 'sometimes', points: 3 },
      { label: 'Non, pas d\'information', value: 'no', points: 5 },
    ],
  },
  {
    id: 'q17_explainability',
    section: 'transparency',
    text: 'Les décisions de l\'IA sont-elles explicables ?',
    options: [
      { label: 'Oui, explications détaillées disponibles', value: 'detailed', points: 0 },
      { label: 'Oui, explications simplifiées', value: 'simplified', points: 1 },
      { label: 'Partiellement (boîte grise)', value: 'partial', points: 3 },
      { label: 'Non, modèle "boîte noire"', value: 'blackbox', points: 4 },
    ],
  },
  {
    id: 'q18_human_recourse',
    section: 'transparency',
    text: 'Existe-t-il une possibilité de recours humain ?',
    options: [
      { label: 'Oui, recours facile et rapide', value: 'easy', points: 0 },
      { label: 'Oui, procédure de contestation définie', value: 'defined', points: 1 },
      { label: 'Oui, mais processus complexe', value: 'complex', points: 3 },
      { label: 'Non, aucun recours possible', value: 'none', points: 5 },
    ],
  },
  {
    id: 'q19_documentation',
    section: 'transparency',
    text: 'La documentation technique est-elle disponible ?',
    options: [
      { label: 'Oui, documentation complète et à jour', value: 'complete', points: 0 },
      { label: 'Oui, documentation de base', value: 'basic', points: 1 },
      { label: 'Documentation partielle ou obsolète', value: 'partial', points: 3 },
      { label: 'Non, pas de documentation', value: 'none', points: 4 },
    ],
  },
  {
    id: 'q20_audit',
    section: 'transparency',
    text: 'Les logs et l\'audit trail sont-ils conservés ?',
    options: [
      { label: 'Oui, logs complets avec rétention définie', value: 'complete', points: 0 },
      { label: 'Oui, logs principaux', value: 'main', points: 1 },
      { label: 'Logs partiels ou temporaires', value: 'partial', points: 2 },
      { label: 'Non, pas de conservation des logs', value: 'none', points: 4 },
    ],
  },

  // Section 5: Gouvernance
  {
    id: 'q21_responsible',
    section: 'governance',
    text: 'Un responsable IA est-il identifié dans l\'organisation ?',
    options: [
      { label: 'Oui, rôle dédié avec autorité', value: 'dedicated', points: 0 },
      { label: 'Oui, responsabilité partagée/comité', value: 'committee', points: 1 },
      { label: 'Informel, pas de rôle défini', value: 'informal', points: 3 },
      { label: 'Non, aucun responsable identifié', value: 'none', points: 4 },
    ],
  },
  {
    id: 'q22_validation',
    section: 'governance',
    text: 'Existe-t-il un processus de validation avant mise en production ?',
    options: [
      { label: 'Oui, processus formel multi-étapes', value: 'formal', points: 0 },
      { label: 'Oui, validation technique + métier', value: 'dual', points: 1 },
      { label: 'Validation technique uniquement', value: 'tech_only', points: 2 },
      { label: 'Non, pas de processus de validation', value: 'none', points: 4 },
    ],
  },
  {
    id: 'q23_monitoring',
    section: 'governance',
    text: 'Un monitoring en production est-il actif ?',
    options: [
      { label: 'Oui, monitoring complet (perf + biais + drift)', value: 'complete', points: 0 },
      { label: 'Oui, monitoring des performances', value: 'performance', points: 1 },
      { label: 'Monitoring basique', value: 'basic', points: 2 },
      { label: 'Non, pas de monitoring', value: 'none', points: 4 },
    ],
  },
  {
    id: 'q24_incident',
    section: 'governance',
    text: 'Un plan de gestion des incidents IA existe-t-il ?',
    options: [
      { label: 'Oui, procédure complète et testée', value: 'complete', points: 0 },
      { label: 'Oui, procédure définie', value: 'defined', points: 1 },
      { label: 'En cours d\'élaboration', value: 'wip', points: 2 },
      { label: 'Non, aucun plan d\'incident', value: 'none', points: 4 },
    ],
  },
  {
    id: 'q25_impact',
    section: 'governance',
    text: 'Une évaluation d\'impact (EIAD/AIPD) a-t-elle été réalisée ?',
    options: [
      { label: 'Oui, évaluation complète et documentée', value: 'complete', points: 0 },
      { label: 'Oui, évaluation partielle', value: 'partial', points: 2 },
      { label: 'Prévue mais non réalisée', value: 'planned', points: 3 },
      { label: 'Non, aucune évaluation d\'impact', value: 'none', points: 4 },
    ],
  },
];
