import { Scale, Info } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-erythix-600 rounded-xl">
              <Scale className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                AI Act Compliance
              </h1>
              <p className="text-sm text-gray-500">
                Évaluez le niveau de risque de votre système IA
              </p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2 text-sm text-gray-500 bg-blue-50 px-3 py-2 rounded-lg">
            <Info className="w-4 h-4 text-blue-500" />
            <span>Règlement UE 2024/1689</span>
          </div>
        </div>
      </div>
    </header>
  );
}
