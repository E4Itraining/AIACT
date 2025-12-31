import { ExternalLink, Calendar, Video, GraduationCap, Mail, FileText, BookOpen, Scale, Globe, ArrowRight } from 'lucide-react';

const resources = [
  {
    title: 'Texte officiel AI Act',
    description: 'Règlement (UE) 2024/1689 du Parlement européen et du Conseil',
    url: 'https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:32024R1689',
    icon: Scale,
    category: 'Officiel',
  },
  {
    title: 'AI Act Explorer',
    description: 'Navigation interactive dans le texte de l\'AI Act',
    url: 'https://artificialintelligenceact.eu/',
    icon: Globe,
    category: 'Outil',
  },
  {
    title: 'Guide de la Commission Européenne',
    description: 'Documentation et FAQ officielles sur l\'AI Act',
    url: 'https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai',
    icon: BookOpen,
    category: 'Guide',
  },
  {
    title: 'Base de données EU des systèmes IA',
    description: 'Registre officiel des systèmes IA à haut risque',
    url: 'https://ec.europa.eu/digital-building-blocks/wikis/display/AI/AI+System+Database',
    icon: FileText,
    category: 'Registre',
  },
];

const timelineItems = [
  { date: '1 août 2024', event: 'Entrée en vigueur de l\'AI Act', status: 'past' },
  { date: '2 février 2025', event: 'Interdiction des pratiques IA prohibées', status: 'past' },
  { date: '2 août 2025', event: 'Règles pour les modèles GPAI + Gouvernance', status: 'current' },
  { date: '2 août 2026', event: 'Obligations systèmes haut risque (Annexe III)', status: 'future' },
  { date: '2 août 2027', event: 'Application complète de l\'AI Act', status: 'future' },
];

export default function ResourcesTab() {
  return (
    <div className="space-y-6">
      {/* Timeline */}
      <div className="card">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-erythix-600" />
          <h2 className="text-lg font-semibold text-gray-900">Dates clés AI Act 2024-2027</h2>
        </div>
        <div className="relative overflow-x-auto">
          <div className="flex items-center min-w-[600px] py-4">
            <div className="absolute left-0 right-0 h-1 bg-gray-200 top-1/2 transform -translate-y-1/2" />
            {timelineItems.map((item, index) => (
              <div key={index} className="flex-1 relative flex flex-col items-center">
                <div className={`w-4 h-4 rounded-full border-4 border-white z-10 ${
                  item.status === 'past'
                    ? 'bg-green-500'
                    : item.status === 'current'
                      ? 'bg-erythix-500 ring-4 ring-erythix-100'
                      : 'bg-gray-300'
                }`} />
                <div className={`mt-3 text-center px-2 ${
                  item.status === 'current' ? 'transform scale-105' : ''
                }`}>
                  <p className={`text-xs font-semibold ${
                    item.status === 'current' ? 'text-erythix-600' : 'text-gray-700'
                  }`}>
                    {item.date}
                  </p>
                  <p className={`text-xs mt-1 ${
                    item.status === 'current' ? 'text-erythix-500 font-medium' : 'text-gray-500'
                  }`}>
                    {item.event}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Resources Grid */}
      <div className="card">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="w-5 h-5 text-erythix-600" />
          <h2 className="text-lg font-semibold text-gray-900">Ressources officielles</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {resources.map((resource, index) => {
            const Icon = resource.icon;
            return (
              <a
                key={index}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 p-4 rounded-lg border border-gray-200 hover:border-erythix-300 hover:bg-erythix-50/50 transition-all group"
              >
                <div className="p-2 bg-gray-100 group-hover:bg-erythix-100 rounded-lg transition-colors">
                  <Icon className="w-5 h-5 text-gray-600 group-hover:text-erythix-600 transition-colors" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-gray-900 group-hover:text-erythix-700 transition-colors">
                      {resource.title}
                    </h3>
                    <ExternalLink className="w-3 h-3 text-gray-400 group-hover:text-erythix-500 transition-colors" />
                  </div>
                  <p className="text-sm text-gray-500 mt-0.5">{resource.description}</p>
                  <span className="inline-block mt-2 text-xs font-medium text-gray-400 bg-gray-100 px-2 py-0.5 rounded">
                    {resource.category}
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </div>

      {/* CTAs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Webinaire CTA */}
        <div className="card bg-gradient-to-br from-erythix-600 to-erythix-700 text-white">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <Video className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-xs font-medium text-erythix-200 uppercase tracking-wide">Webinaire</span>
              <h3 className="text-lg font-bold">Décryptage AI Act</h3>
            </div>
          </div>
          <p className="text-erythix-100 text-sm mb-4">
            Besoin d'accompagnement pour comprendre les implications de l'AI Act sur votre activité ?
          </p>
          <a
            href="#webinaire"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white text-erythix-700 font-medium rounded-lg hover:bg-erythix-50 transition-colors"
          >
            S'inscrire au webinaire
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Masterclass CTA */}
        <div className="card bg-gradient-to-br from-gray-800 to-gray-900 text-white">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">Formation</span>
              <h3 className="text-lg font-bold">Masterclass XAI</h3>
            </div>
          </div>
          <p className="text-gray-300 text-sm mb-4">
            Apprenez à rendre vos modèles IA explicables et conformes aux exigences de transparence.
          </p>
          <a
            href="#masterclass"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white text-gray-800 font-medium rounded-lg hover:bg-gray-100 transition-colors"
          >
            Découvrir la formation
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Contact */}
      <div className="card border-2 border-dashed border-gray-300">
        <div className="text-center py-4">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-erythix-100 rounded-full mb-4">
            <Mail className="w-6 h-6 text-erythix-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Besoin d'un accompagnement personnalisé ?
          </h3>
          <p className="text-gray-500 mb-4 max-w-md mx-auto">
            Notre équipe d'experts peut vous aider à évaluer et mettre en conformité vos systèmes IA avec l'AI Act.
          </p>
          <a
            href="mailto:contact@erythix.com"
            className="inline-flex items-center gap-2 btn-primary"
          >
            <Mail className="w-4 h-4" />
            Contacter Erythix
          </a>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
        <div className="flex gap-3">
          <div className="flex-shrink-0">
            <svg className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h4 className="text-sm font-medium text-amber-800">Avertissement</h4>
            <p className="text-sm text-amber-700 mt-1">
              Cet outil fournit une évaluation indicative et ne constitue pas un avis juridique.
              Pour une analyse complète de votre conformité à l'AI Act, nous vous recommandons de
              consulter un expert juridique spécialisé.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
