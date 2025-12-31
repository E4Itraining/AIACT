import { ObligationsByLevel } from '../types';

export const obligations: ObligationsByLevel = {
  minimal: [
    {
      title: 'Bonnes pratiques recommandées',
      description: 'Adoption volontaire des codes de conduite et bonnes pratiques de l\'industrie.',
      required: false,
    },
    {
      title: 'Transparence de base',
      description: 'Information aux utilisateurs qu\'ils interagissent avec une IA (si génération de contenu).',
      required: false,
    },
    {
      title: 'Documentation interne',
      description: 'Maintien d\'une documentation technique minimale pour référence interne.',
      required: false,
    },
  ],
  limited: [
    {
      title: 'Obligation de transparence',
      description: 'Informer clairement les utilisateurs qu\'ils interagissent avec un système d\'IA.',
      required: true,
      deadline: 'Applicable depuis le 2 août 2025',
    },
    {
      title: 'Marquage du contenu généré',
      description: 'Les contenus générés par IA (texte, image, audio, vidéo) doivent être identifiables comme tels.',
      required: true,
      deadline: 'Applicable depuis le 2 août 2025',
    },
    {
      title: 'Information sur les deepfakes',
      description: 'Obligation d\'indiquer que le contenu a été généré ou manipulé artificiellement.',
      required: true,
      deadline: 'Applicable depuis le 2 août 2025',
    },
    {
      title: 'Détection du contenu IA',
      description: 'Mise en place de mécanismes permettant de détecter le contenu généré par IA.',
      required: true,
    },
  ],
  high: [
    {
      title: 'Système de gestion des risques',
      description: 'Mise en place d\'un système de gestion des risques tout au long du cycle de vie du système IA.',
      required: true,
      deadline: '2 août 2027',
    },
    {
      title: 'Gouvernance des données',
      description: 'Pratiques de gouvernance des données incluant traçabilité, qualité et représentativité des données.',
      required: true,
      deadline: '2 août 2027',
    },
    {
      title: 'Documentation technique',
      description: 'Documentation technique complète incluant conception, fonctionnement, limites et risques.',
      required: true,
      deadline: '2 août 2027',
    },
    {
      title: 'Journalisation (logging)',
      description: 'Conservation des logs permettant la traçabilité des décisions pendant toute la durée de vie.',
      required: true,
      deadline: '2 août 2027',
    },
    {
      title: 'Transparence pour les utilisateurs',
      description: 'Instructions d\'utilisation claires pour les déployeurs, incluant capacités et limites.',
      required: true,
      deadline: '2 août 2027',
    },
    {
      title: 'Supervision humaine',
      description: 'Conception permettant une surveillance humaine effective pendant l\'utilisation.',
      required: true,
      deadline: '2 août 2027',
    },
    {
      title: 'Exactitude et robustesse',
      description: 'Niveau approprié d\'exactitude, robustesse et cybersécurité.',
      required: true,
      deadline: '2 août 2027',
    },
    {
      title: 'Évaluation de conformité',
      description: 'Évaluation de conformité avant mise sur le marché (auto-évaluation ou organisme notifié selon la catégorie).',
      required: true,
      deadline: '2 août 2027',
    },
    {
      title: 'Enregistrement EU',
      description: 'Enregistrement dans la base de données européenne des systèmes IA à haut risque.',
      required: true,
      deadline: '2 août 2027',
    },
    {
      title: 'Marquage CE',
      description: 'Apposition du marquage CE attestant la conformité.',
      required: true,
      deadline: '2 août 2027',
    },
    {
      title: 'Déclaration de conformité',
      description: 'Établissement d\'une déclaration UE de conformité.',
      required: true,
      deadline: '2 août 2027',
    },
    {
      title: 'Surveillance post-marché',
      description: 'Système de surveillance après mise sur le marché avec reporting des incidents.',
      required: true,
      deadline: '2 août 2027',
    },
  ],
  unacceptable: [
    {
      title: 'INTERDICTION TOTALE',
      description: 'Ce système IA est interdit par l\'AI Act et ne peut être déployé dans l\'Union Européenne.',
      required: true,
      deadline: '2 février 2025',
    },
    {
      title: 'Exemples de systèmes interdits',
      description: 'Manipulation subliminale, exploitation des vulnérabilités, scoring social par autorités publiques, reconnaissance faciale en temps réel dans l\'espace public (sauf exceptions).',
      required: true,
    },
    {
      title: 'Action immédiate requise',
      description: 'Arrêt immédiat du déploiement ou reconception complète du système pour sortir de cette catégorie.',
      required: true,
    },
    {
      title: 'Sanctions applicables',
      description: 'Amendes jusqu\'à 35 millions d\'euros ou 7% du CA mondial annuel.',
      required: true,
    },
  ],
};

export const timelineEvents = [
  {
    date: '1er août 2024',
    title: 'Entrée en vigueur',
    description: 'L\'AI Act entre officiellement en vigueur.',
    status: 'past',
  },
  {
    date: '2 février 2025',
    title: 'Interdictions applicables',
    description: 'Les systèmes IA à risque inacceptable deviennent interdits.',
    status: 'past',
  },
  {
    date: '2 août 2025',
    title: 'Obligations GPAI',
    description: 'Obligations pour les modèles d\'IA à usage général (GPAI) et règles de gouvernance.',
    status: 'current',
  },
  {
    date: '2 août 2026',
    title: 'Obligations haut risque (Annexe III)',
    description: 'Application des obligations pour les systèmes IA à haut risque listés à l\'Annexe III.',
    status: 'future',
  },
  {
    date: '2 août 2027',
    title: 'Application complète',
    description: 'Toutes les dispositions de l\'AI Act sont applicables, y compris pour les systèmes IA à haut risque intégrés dans des produits (Annexe I).',
    status: 'future',
  },
];
