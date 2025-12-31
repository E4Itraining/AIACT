# AI Act Compliance Simulator

Simulateur web permettant d'évaluer la conformité d'un système d'intelligence artificielle au Règlement (UE) 2024/1689, communément appelé "AI Act".

## Aperçu

L'AI Act est le premier cadre juridique complet au monde régissant l'intelligence artificielle. Ce simulateur aide les organisations à :

- **Identifier le niveau de risque** de leur système d'IA (inacceptable, haut, limité, minimal)
- **Comprendre les obligations** applicables selon la classification
- **Obtenir des recommandations** personnalisées pour la mise en conformité
- **Générer un rapport** exportable de l'évaluation

## Fonctionnalités

### Questionnaire Interactif
- Questions basées sur les articles et annexes du Règlement
- Couverture des pratiques interdites (Article 5)
- Évaluation des systèmes à haut risque (Annexes I et III)
- Vérification des obligations de transparence (Article 50)
- Support des modèles GPAI (Chapitre V)

### Classification des Risques

| Niveau | Description | Conséquence |
|--------|-------------|-------------|
| **Inacceptable** | Pratiques interdites par l'Article 5 | Système interdit dans l'UE |
| **Haut** | Annexes I et III | Obligations strictes de conformité |
| **Limité** | Article 50 | Obligations de transparence |
| **Minimal** | Autres systèmes | Codes de conduite volontaires |

### Rapport de Conformité
- Synthèse du niveau de risque
- Liste des obligations applicables
- Recommandations d'actions
- Export PDF pour documentation

## Structure du Projet

```
AIACT/
├── index.html          # Page principale
├── css/
│   └── styles.css      # Styles de l'application
├── js/
│   ├── app.js          # Application principale
│   ├── questions.js    # Base de données des questions
│   ├── risk-engine.js  # Moteur d'évaluation des risques
│   └── report.js       # Génération de rapports
├── assets/             # Ressources (images, icônes)
├── LICENSE             # Licence du projet
└── README.md           # Documentation
```

## Installation

### Utilisation Locale

1. Clonez le dépôt :
```bash
git clone https://github.com/votre-repo/AIACT.git
cd AIACT
```

2. Ouvrez `index.html` dans un navigateur web moderne.

### Serveur Local (optionnel)

Pour éviter les restrictions CORS lors du développement :

```bash
# Avec Python 3
python -m http.server 8000

# Avec Node.js
npx serve .

# Avec PHP
php -S localhost:8000
```

Puis accédez à `http://localhost:8000`

## Utilisation

1. **Accueil** : Consultez les informations sur l'AI Act et démarrez l'évaluation
2. **Simulateur** : Répondez aux questions sur votre système d'IA
3. **Résultats** : Visualisez votre niveau de risque et les obligations
4. **Rapport** : Téléchargez le rapport PDF de conformité

### Guide Intégré

L'application inclut un guide complet sur :
- Classification des risques
- Obligations par niveau de risque
- Calendrier d'application
- Sanctions applicables

## Base Réglementaire

Ce simulateur est basé sur :

- **Règlement (UE) 2024/1689** du Parlement européen et du Conseil
- Entré en vigueur le **1er août 2024**
- Application progressive jusqu'au **2 août 2027**

### Articles Clés Couverts

| Article | Sujet |
|---------|-------|
| Art. 5 | Pratiques interdites |
| Art. 6-7 | Classification des systèmes à haut risque |
| Art. 9-15 | Exigences pour les systèmes à haut risque |
| Art. 50 | Obligations de transparence |
| Art. 51-55 | Modèles GPAI |
| Annexe I | Législation d'harmonisation de l'UE |
| Annexe III | Domaines à haut risque |

## Technologies

- **HTML5** : Structure et sémantique
- **CSS3** : Design responsive et animations
- **JavaScript ES6+** : Logique applicative
- **Aucune dépendance externe** : Fonctionne hors ligne

## Navigateurs Supportés

- Chrome/Edge 88+
- Firefox 85+
- Safari 14+
- Opera 74+

## Avertissement

Ce simulateur est fourni **à titre informatif uniquement** et ne constitue pas un avis juridique. Pour une analyse complète de conformité :

1. Consultez des experts juridiques spécialisés
2. Référez-vous au [texte officiel du Règlement](https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:32024R1689)
3. Contactez les autorités nationales compétentes

## Ressources

- [Texte officiel (EUR-Lex)](https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:32024R1689)
- [Commission Européenne - Cadre réglementaire pour l'IA](https://digital-strategy.ec.europa.eu/fr/policies/regulatory-framework-ai)
- [AI Act Explorer](https://artificialintelligenceact.eu/)

## Licence

Ce projet est sous licence [GPL-3.0](LICENSE).

## Contribution

Les contributions sont bienvenues ! Veuillez :

1. Fork le projet
2. Créer une branche (`git checkout -b feature/amelioration`)
3. Commit les changements (`git commit -am 'Ajout fonctionnalité'`)
4. Push la branche (`git push origin feature/amelioration`)
5. Ouvrir une Pull Request

## Changelog

### v1.0.0 (Décembre 2024)
- Version initiale
- Questionnaire complet basé sur l'AI Act
- Moteur d'évaluation des risques
- Génération de rapports PDF
- Guide intégré sur l'AI Act
- Interface responsive

---

**AI Act Compliance Simulator** - Facilitez votre mise en conformité avec le Règlement Européen sur l'IA.
