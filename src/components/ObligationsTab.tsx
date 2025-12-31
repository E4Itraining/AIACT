import { CheckCircle, XCircle, AlertTriangle, Clock, FileCheck, Shield, Database, Eye, Users, FileText, AlertCircle } from 'lucide-react';
import { RiskResult } from '../types';
import { obligations, timelineEvents } from '../data/obligations';

interface Props {
  result: RiskResult | null;
}

const levelLabels = {
  minimal: 'Risque minimal',
  limited: 'Risque limité',
  high: 'Haut risque',
  unacceptable: 'Risque inacceptable',
};

const levelColors = {
  minimal: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700', badge: 'bg-green-100 text-green-700' },
  limited: { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-700', badge: 'bg-yellow-100 text-yellow-700' },
  high: { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-700', badge: 'bg-orange-100 text-orange-700' },
  unacceptable: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', badge: 'bg-red-100 text-red-700' },
};

const obligationIcons = [FileCheck, Shield, Database, Eye, Users, FileText, AlertTriangle, CheckCircle, Clock];

export default function ObligationsTab({ result }: Props) {
  if (!result) {
    return (
      <div className="card text-center py-12">
        <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <h2 className="text-lg font-medium text-gray-600 mb-2">Aucun niveau de risque déterminé</h2>
        <p className="text-gray-500">Complétez d'abord le questionnaire pour voir les obligations applicables.</p>
      </div>
    );
  }

  const currentObligations = obligations[result.level];
  const colors = levelColors[result.level];

  return (
    <div className="space-y-6">
      {/* Current Level Summary */}
      <div className={`card ${colors.bg} ${colors.border} border-2`}>
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">{result.emoji}</span>
          <div>
            <h2 className={`text-xl font-bold ${colors.text}`}>
              Obligations pour : {levelLabels[result.level]}
            </h2>
            <p className="text-gray-600 text-sm">
              Score : {result.percentage}% • {currentObligations.length} obligations identifiées
            </p>
          </div>
        </div>
      </div>

      {/* Obligations List */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Obligations détaillées
        </h3>
        <div className="space-y-4">
          {currentObligations.map((obligation, index) => {
            const Icon = obligationIcons[index % obligationIcons.length];

            return (
              <div
                key={index}
                className={`p-4 rounded-lg border ${
                  obligation.required
                    ? 'border-gray-200 bg-white'
                    : 'border-gray-100 bg-gray-50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${obligation.required ? 'bg-erythix-100' : 'bg-gray-100'}`}>
                    <Icon className={`w-5 h-5 ${obligation.required ? 'text-erythix-600' : 'text-gray-400'}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-gray-900">{obligation.title}</h4>
                      {obligation.required ? (
                        <span className="px-2 py-0.5 text-xs font-medium bg-erythix-100 text-erythix-700 rounded">
                          Obligatoire
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-500 rounded">
                          Recommandé
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{obligation.description}</p>
                    {obligation.deadline && (
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        {obligation.deadline}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Comparison Table */}
      <div className="card overflow-hidden">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Comparaison des niveaux de risque
        </h3>
        <div className="overflow-x-auto -mx-6">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Exigence
                </th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  🟢 Minimal
                </th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  🟡 Limité
                </th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  🟠 Haut
                </th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  🔴 Interdit
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                { label: 'Documentation technique', minimal: false, limited: false, high: true, unacceptable: null },
                { label: 'Évaluation de conformité', minimal: false, limited: false, high: true, unacceptable: null },
                { label: 'Enregistrement base EU', minimal: false, limited: false, high: true, unacceptable: null },
                { label: 'Supervision humaine', minimal: false, limited: false, high: true, unacceptable: null },
                { label: 'Transparence utilisateurs', minimal: false, limited: true, high: true, unacceptable: null },
                { label: 'Gestion des risques', minimal: false, limited: false, high: true, unacceptable: null },
                { label: 'Marquage du contenu IA', minimal: false, limited: true, high: true, unacceptable: null },
                { label: 'Surveillance post-marché', minimal: false, limited: false, high: true, unacceptable: null },
              ].map((row, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                  <td className="px-6 py-3 text-sm font-medium text-gray-700">
                    {row.label}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {row.minimal ? (
                      <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                    ) : (
                      <span className="text-gray-300">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {row.limited ? (
                      <CheckCircle className="w-5 h-5 text-yellow-500 mx-auto" />
                    ) : (
                      <span className="text-gray-300">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {row.high ? (
                      <CheckCircle className="w-5 h-5 text-orange-500 mx-auto" />
                    ) : (
                      <span className="text-gray-300">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {row.unacceptable === null ? (
                      <XCircle className="w-5 h-5 text-red-500 mx-auto" />
                    ) : row.unacceptable ? (
                      <CheckCircle className="w-5 h-5 text-red-500 mx-auto" />
                    ) : (
                      <span className="text-gray-300">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500 mt-4 px-6">
          ✓ = Obligatoire • — = Non requis • ✗ = Usage interdit
        </p>
      </div>

      {/* Timeline */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Calendrier d'application AI Act
        </h3>
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200" />
          <div className="space-y-6">
            {timelineEvents.map((event, index) => (
              <div key={index} className="relative pl-10">
                <div className={`absolute left-2 w-4 h-4 rounded-full border-2 border-white ${
                  event.status === 'past'
                    ? 'bg-green-500'
                    : event.status === 'current'
                      ? 'bg-erythix-500 ring-4 ring-erythix-100'
                      : 'bg-gray-300'
                }`} />
                <div className={`p-4 rounded-lg ${
                  event.status === 'current'
                    ? 'bg-erythix-50 border border-erythix-200'
                    : 'bg-gray-50'
                }`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-sm font-semibold ${
                      event.status === 'current' ? 'text-erythix-600' : 'text-gray-700'
                    }`}>
                      {event.date}
                    </span>
                    {event.status === 'current' && (
                      <span className="px-2 py-0.5 text-xs font-medium bg-erythix-100 text-erythix-700 rounded">
                        Actuel
                      </span>
                    )}
                    {event.status === 'past' && (
                      <span className="px-2 py-0.5 text-xs font-medium bg-green-100 text-green-700 rounded">
                        Appliqué
                      </span>
                    )}
                  </div>
                  <h4 className="font-medium text-gray-900">{event.title}</h4>
                  <p className="text-sm text-gray-600">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
