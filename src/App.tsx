import { useState } from 'react';
import { ClipboardCheck, BarChart3, FileText, BookOpen } from 'lucide-react';
import { Answer, RiskResult } from './types';
import QuestionnaireTab from './components/QuestionnaireTab';
import ResultsTab from './components/ResultsTab';
import ObligationsTab from './components/ObligationsTab';
import ResourcesTab from './components/ResourcesTab';
import Header from './components/Header';

type TabId = 'questionnaire' | 'results' | 'obligations' | 'resources';

const tabs = [
  { id: 'questionnaire' as TabId, label: 'Évaluation', icon: ClipboardCheck },
  { id: 'results' as TabId, label: 'Résultat', icon: BarChart3 },
  { id: 'obligations' as TabId, label: 'Obligations', icon: FileText },
  { id: 'resources' as TabId, label: 'Ressources', icon: BookOpen },
];

function App() {
  const [activeTab, setActiveTab] = useState<TabId>('questionnaire');
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [result, setResult] = useState<RiskResult | null>(null);
  const [isComplete, setIsComplete] = useState(false);

  const handleAnswerChange = (questionId: string, optionValue: string, points: number) => {
    setAnswers(prev => {
      const filtered = prev.filter(a => a.questionId !== questionId);
      return [...filtered, { questionId, optionValue, points }];
    });
  };

  const handleComplete = (riskResult: RiskResult) => {
    setResult(riskResult);
    setIsComplete(true);
    setActiveTab('results');
  };

  const handleReset = () => {
    setAnswers([]);
    setResult(null);
    setIsComplete(false);
    setActiveTab('questionnaire');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'questionnaire':
        return (
          <QuestionnaireTab
            answers={answers}
            onAnswerChange={handleAnswerChange}
            onComplete={handleComplete}
          />
        );
      case 'results':
        return (
          <ResultsTab
            result={result}
            answers={answers}
            onReset={handleReset}
            onViewObligations={() => setActiveTab('obligations')}
          />
        );
      case 'obligations':
        return <ObligationsTab result={result} />;
      case 'resources':
        return <ResourcesTab />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />

      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Tabs Navigation */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
          <nav className="flex" aria-label="Onglets">
            {tabs.map((tab, index) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              const isDisabled = (tab.id === 'results' || tab.id === 'obligations') && !isComplete;

              return (
                <button
                  key={tab.id}
                  onClick={() => !isDisabled && setActiveTab(tab.id)}
                  disabled={isDisabled}
                  className={`
                    flex-1 flex items-center justify-center gap-2 py-4 px-4 text-sm font-medium
                    border-b-2 transition-all duration-200
                    ${index > 0 ? 'border-l border-gray-100' : ''}
                    ${isActive
                      ? 'border-b-erythix-600 text-erythix-600 bg-erythix-50/50'
                      : isDisabled
                        ? 'border-b-transparent text-gray-300 cursor-not-allowed'
                        : 'border-b-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="animate-fadeIn">
          {renderTabContent()}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-5xl mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">
              Outil d'aide à l'évaluation - Ne constitue pas un avis juridique
            </p>
            <p className="text-sm text-gray-400">
              Powered by Erythix
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
