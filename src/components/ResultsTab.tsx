import { AlertTriangle, CheckCircle, XCircle, AlertCircle, RefreshCw, ArrowRight, TrendingUp, TrendingDown } from 'lucide-react';
import { Answer, RiskResult } from '../types';
import { sections } from '../data/questions';
import { getSectionScore } from '../utils/riskCalculator';

interface Props {
  result: RiskResult | null;
  answers: Answer[];
  onReset: () => void;
  onViewObligations: () => void;
}

const riskConfig = {
  minimal: {
    icon: CheckCircle,
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    textColor: 'text-green-700',
    iconColor: 'text-green-500',
    barColor: 'bg-green-500',
  },
  limited: {
    icon: AlertCircle,
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200',
    textColor: 'text-yellow-700',
    iconColor: 'text-yellow-500',
    barColor: 'bg-yellow-500',
  },
  high: {
    icon: AlertTriangle,
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    textColor: 'text-orange-700',
    iconColor: 'text-orange-500',
    barColor: 'bg-orange-500',
  },
  unacceptable: {
    icon: XCircle,
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    textColor: 'text-red-700',
    iconColor: 'text-red-500',
    barColor: 'bg-red-500',
  },
};

export default function ResultsTab({ result, answers, onReset, onViewObligations }: Props) {
  if (!result) {
    return (
      <div className="card text-center py-12">
        <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <h2 className="text-lg font-medium text-gray-600 mb-2">Aucun résultat disponible</h2>
        <p className="text-gray-500 mb-6">Complétez d'abord le questionnaire d'évaluation.</p>
        <button onClick={onReset} className="btn-primary">
          Commencer l'évaluation
        </button>
      </div>
    );
  }

  const config = riskConfig[result.level];
  const Icon = config.icon;

  return (
    <div className="space-y-6">
      {/* Main Result Card */}
      <div className={`card ${config.bgColor} ${config.borderColor} border-2`}>
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="flex-shrink-0">
            <div className={`w-20 h-20 rounded-2xl ${config.bgColor} border-2 ${config.borderColor} flex items-center justify-center`}>
              <Icon className={`w-10 h-10 ${config.iconColor}`} />
            </div>
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{result.emoji}</span>
              <h2 className={`text-2xl font-bold ${config.textColor}`}>
                {result.label}
              </h2>
            </div>
            <p className="text-gray-600 mb-4">{result.description}</p>

            {/* Score Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Score de risque</span>
                <span className={`font-semibold ${config.textColor}`}>
                  {result.score} / {result.maxScore} points ({result.percentage}%)
                </span>
              </div>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full ${config.barColor} rounded-full transition-all duration-500`}
                  style={{ width: `${result.percentage}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-400">
                <span>0% - Risque minimal</span>
                <span>100% - Risque inacceptable</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Score by Section */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Analyse par section</h3>
        <div className="space-y-4">
          {sections.map(section => {
            const { score, maxScore, percentage } = getSectionScore(answers, section.id);
            const isHighRisk = percentage > 60;
            const isLowRisk = percentage <= 30;

            return (
              <div key={section.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-700">{section.title}</span>
                    {isHighRisk && <TrendingUp className="w-4 h-4 text-orange-500" />}
                    {isLowRisk && <TrendingDown className="w-4 h-4 text-green-500" />}
                  </div>
                  <span className={`text-sm font-medium ${
                    isHighRisk ? 'text-orange-600' : isLowRisk ? 'text-green-600' : 'text-gray-600'
                  }`}>
                    {score}/{maxScore} ({percentage}%)
                  </span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isHighRisk ? 'bg-orange-400' : isLowRisk ? 'bg-green-400' : 'bg-yellow-400'
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Risk Scale Reference */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Échelle de risque AI Act</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { level: 'minimal', range: '0-25%', label: 'Risque minimal', emoji: '🟢' },
            { level: 'limited', range: '26-50%', label: 'Risque limité', emoji: '🟡' },
            { level: 'high', range: '51-75%', label: 'Haut risque', emoji: '🟠' },
            { level: 'unacceptable', range: '76-100%', label: 'Inacceptable', emoji: '🔴' },
          ].map(item => {
            const itemConfig = riskConfig[item.level as keyof typeof riskConfig];
            const isCurrentLevel = item.level === result.level;

            return (
              <div
                key={item.level}
                className={`p-3 rounded-lg border-2 ${
                  isCurrentLevel
                    ? `${itemConfig.bgColor} ${itemConfig.borderColor}`
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span>{item.emoji}</span>
                  <span className={`text-sm font-medium ${isCurrentLevel ? itemConfig.textColor : 'text-gray-600'}`}>
                    {item.label}
                  </span>
                </div>
                <span className="text-xs text-gray-500">{item.range}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button onClick={onViewObligations} className="btn-primary flex-1 flex items-center justify-center gap-2">
          Voir les obligations
          <ArrowRight className="w-4 h-4" />
        </button>
        <button onClick={onReset} className="btn-secondary flex items-center justify-center gap-2">
          <RefreshCw className="w-4 h-4" />
          Refaire l'évaluation
        </button>
      </div>
    </div>
  );
}
