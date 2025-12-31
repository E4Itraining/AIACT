# AI Act Compliance - Outil d'évaluation

Outil interactif d'auto-évaluation de conformité au Règlement européen sur l'Intelligence Artificielle (AI Act - Règlement UE 2024/1689).

## Fonctionnalités

### Onglet 1 - Questionnaire d'évaluation
- 25 questions à choix multiples
- 5 sections thématiques :
  1. **Identification du système IA** - Type, décisions automatisées, criticité
  2. **Domaine d'application** - Secteur, infrastructure critique, biométrie
  3. **Données et entraînement** - Types de données, traçabilité, biais
  4. **Transparence et explicabilité** - Information utilisateurs, recours
  5. **Gouvernance** - Responsable IA, validation, monitoring

### Onglet 2 - Résultat automatique
Calcul automatique du niveau de risque basé sur les réponses :

| Niveau | Score | Indicateur |
|--------|-------|------------|
| Risque minimal | 0-25% | Pas d'obligation spécifique |
| Risque limité | 26-50% | Obligations de transparence |
| Haut risque | 51-75% | Conformité complète requise |
| Inacceptable | 76-100% | Usage interdit |

### Onglet 3 - Obligations par niveau
- Tableau récapitulatif des obligations AI Act
- Documentation technique requise
- Évaluation de conformité
- Exigences de supervision humaine
- Timeline de mise en conformité

### Onglet 4 - Ressources
- Liens vers le texte officiel AI Act
- Timeline AI Act (dates clés 2024-2027)
- CTAs vers formations et accompagnement

## Installation

```bash
# Cloner le dépôt
git clone <url-du-repo>
cd AIACT

# Installer les dépendances
npm install

# Lancer en développement
npm run dev

# Build pour production
npm run build
```

## Technologies

- React 18 + TypeScript
- Vite
- Tailwind CSS
- Lucide React (icônes)

## Structure du projet

```
src/
├── components/
│   ├── Header.tsx
│   ├── QuestionnaireTab.tsx
│   ├── ResultsTab.tsx
│   ├── ObligationsTab.tsx
│   └── ResourcesTab.tsx
├── data/
│   ├── questions.ts
│   └── obligations.ts
├── types/
│   └── index.ts
├── utils/
│   └── riskCalculator.ts
├── App.tsx
├── main.tsx
└── index.css
```

## Avertissement

Cet outil fournit une évaluation indicative et ne constitue pas un avis juridique. Pour une analyse complète de votre conformité à l'AI Act, consultez un expert juridique spécialisé.

## Licence

GNU General Public License v3.0

---

Powered by [Erythix](https://erythix.com)
