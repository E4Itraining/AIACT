import { useState } from 'react';
import { ChevronRight, ChevronLeft, CheckCircle2, Cpu, Building2, Database, Eye, Shield } from 'lucide-react';
import { Answer, RiskResult } from '../types';
import { questions, sections } from '../data/questions';
import { calculateRiskLevel } from '../utils/riskCalculator';

interface Props {
  answers: Answer[];
  onAnswerChange: (questionId: string, optionValue: string, points: number) => void;
  onComplete: (result: RiskResult) => void;
}

const sectionIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  identification: Cpu,
  domain: Building2,
  data: Database,
  transparency: Eye,
  governance: Shield,
};

export default function QuestionnaireTab({ answers, onAnswerChange, onComplete }: Props) {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const currentSection = sections[currentSectionIndex];
  const sectionQuestions = questions.filter(q => q.section === currentSection.id);

  const getSectionProgress = (sectionId: string) => {
    const sectionQs = questions.filter(q => q.section === sectionId);
    const answered = sectionQs.filter(q => answers.some(a => a.questionId === q.id)).length;
    return { answered, total: sectionQs.length };
  };

  const isSectionComplete = (sectionId: string) => {
    const { answered, total } = getSectionProgress(sectionId);
    return answered === total;
  };

  const allSectionsComplete = sections.every(s => isSectionComplete(s.id));

  const handleNext = () => {
    if (currentSectionIndex < sections.length - 1) {
      setCurrentSectionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    const result = calculateRiskLevel(answers);
    onComplete(result);
  };

  const Icon = sectionIcons[currentSection.id] || Cpu;

  return (
    <div className="space-y-6">
      {/* Section Progress */}
      <div className="card">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-sm font-medium text-gray-500">Progression</span>
          <span className="text-sm text-gray-400">
            {answers.length} / {questions.length} questions
          </span>
        </div>
        <div className="flex gap-2">
          {sections.map((section, index) => {
            const { answered, total } = getSectionProgress(section.id);
            const isComplete = answered === total;
            const isCurrent = index === currentSectionIndex;
            const SectionIcon = sectionIcons[section.id] || Cpu;

            return (
              <button
                key={section.id}
                onClick={() => setCurrentSectionIndex(index)}
                className={`
                  flex-1 p-3 rounded-lg border-2 transition-all duration-200
                  ${isCurrent
                    ? 'border-erythix-500 bg-erythix-50'
                    : isComplete
                      ? 'border-green-300 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }
                `}
              >
                <div className="flex flex-col items-center gap-1">
                  <div className={`p-1.5 rounded-lg ${isCurrent ? 'bg-erythix-100' : isComplete ? 'bg-green-100' : 'bg-gray-100'}`}>
                    {isComplete ? (
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                    ) : (
                      <SectionIcon className={`w-4 h-4 ${isCurrent ? 'text-erythix-600' : 'text-gray-400'}`} />
                    )}
                  </div>
                  <span className={`text-xs font-medium hidden lg:block ${isCurrent ? 'text-erythix-700' : 'text-gray-600'}`}>
                    {section.title.split(' ')[0]}
                  </span>
                  <span className="text-xs text-gray-400">
                    {answered}/{total}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Current Section */}
      <div className="card">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
          <div className="p-2 bg-erythix-100 rounded-lg">
            <Icon className="w-5 h-5 text-erythix-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              {currentSectionIndex + 1}. {currentSection.title}
            </h2>
            <p className="text-sm text-gray-500">{currentSection.description}</p>
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-8">
          {sectionQuestions.map((question, qIndex) => {
            const currentAnswer = answers.find(a => a.questionId === question.id);

            return (
              <div key={question.id} className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  <span className="text-erythix-600 mr-2">Q{qIndex + 1}.</span>
                  {question.text}
                </label>
                <div className="space-y-2">
                  {question.options.map(option => (
                    <label
                      key={option.value}
                      className={`
                        flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all duration-200
                        ${currentAnswer?.optionValue === option.value
                          ? 'border-erythix-500 bg-erythix-50'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }
                      `}
                    >
                      <input
                        type="radio"
                        name={question.id}
                        value={option.value}
                        checked={currentAnswer?.optionValue === option.value}
                        onChange={() => onAnswerChange(question.id, option.value, option.points)}
                        className="input-radio"
                      />
                      <span className="ml-3 text-sm text-gray-700">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
          <button
            onClick={handlePrevious}
            disabled={currentSectionIndex === 0}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors
              ${currentSectionIndex === 0
                ? 'text-gray-300 cursor-not-allowed'
                : 'text-gray-600 hover:bg-gray-100'
              }
            `}
          >
            <ChevronLeft className="w-4 h-4" />
            Précédent
          </button>

          <div className="flex items-center gap-1">
            {sections.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentSectionIndex ? 'bg-erythix-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          {currentSectionIndex < sections.length - 1 ? (
            <button
              onClick={handleNext}
              className="flex items-center gap-2 btn-primary"
            >
              Suivant
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!allSectionsComplete}
              className={`
                flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-all
                ${allSectionsComplete
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }
              `}
            >
              <CheckCircle2 className="w-4 h-4" />
              Voir les résultats
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
