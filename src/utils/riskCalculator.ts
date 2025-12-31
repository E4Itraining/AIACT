import { Answer, RiskLevel, RiskResult } from '../types';
import { questions } from '../data/questions';

const MAX_POINTS_PER_QUESTION = 5;
const TOTAL_QUESTIONS = questions.length;
const MAX_POSSIBLE_SCORE = TOTAL_QUESTIONS * MAX_POINTS_PER_QUESTION;

export function calculateRiskLevel(answers: Answer[]): RiskResult {
  const totalScore = answers.reduce((sum, answer) => sum + answer.points, 0);
  const percentage = Math.round((totalScore / MAX_POSSIBLE_SCORE) * 100);

  let level: RiskLevel;
  let label: string;
  let description: string;
  let color: string;
  let emoji: string;

  if (percentage <= 25) {
    level = 'minimal';
    label = 'Risque minimal';
    description = 'Votre système IA ne présente pas de risque significatif. Pas d\'obligation spécifique sous l\'AI Act, mais les bonnes pratiques sont recommandées.';
    color = 'green';
    emoji = '🟢';
  } else if (percentage <= 50) {
    level = 'limited';
    label = 'Risque limité';
    description = 'Votre système IA présente un risque limité. Des obligations de transparence s\'appliquent pour informer les utilisateurs.';
    color = 'yellow';
    emoji = '🟡';
  } else if (percentage <= 75) {
    level = 'high';
    label = 'Haut risque';
    description = 'Votre système IA est classé à haut risque. Une conformité complète aux exigences de l\'AI Act est requise.';
    color = 'orange';
    emoji = '🟠';
  } else {
    level = 'unacceptable';
    label = 'Risque inacceptable';
    description = 'Votre système IA présente un risque inacceptable. Son usage est interdit sous l\'AI Act. Une révision complète est nécessaire.';
    color = 'red';
    emoji = '🔴';
  }

  return {
    level,
    score: totalScore,
    maxScore: MAX_POSSIBLE_SCORE,
    percentage,
    label,
    description,
    color,
    emoji,
  };
}

export function getSectionScore(answers: Answer[], sectionId: string): { score: number; maxScore: number; percentage: number } {
  const sectionQuestions = questions.filter(q => q.section === sectionId);
  const sectionAnswers = answers.filter(a =>
    sectionQuestions.some(q => q.id === a.questionId)
  );

  const score = sectionAnswers.reduce((sum, a) => sum + a.points, 0);
  const maxScore = sectionQuestions.length * MAX_POINTS_PER_QUESTION;
  const percentage = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;

  return { score, maxScore, percentage };
}
