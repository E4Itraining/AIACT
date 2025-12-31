export interface Question {
  id: string;
  text: string;
  section: string;
  options: QuestionOption[];
}

export interface QuestionOption {
  label: string;
  value: string;
  points: number;
}

export interface Answer {
  questionId: string;
  optionValue: string;
  points: number;
}

export type RiskLevel = 'minimal' | 'limited' | 'high' | 'unacceptable';

export interface RiskResult {
  level: RiskLevel;
  score: number;
  maxScore: number;
  percentage: number;
  label: string;
  description: string;
  color: string;
  emoji: string;
}

export interface Obligation {
  title: string;
  description: string;
  required: boolean;
  deadline?: string;
}

export interface ObligationsByLevel {
  minimal: Obligation[];
  limited: Obligation[];
  high: Obligation[];
  unacceptable: Obligation[];
}
