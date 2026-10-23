import React from 'react';
import { UserAccount } from '../types/campaign';
import { Plus, Smartphone, Sparkles } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenAddModal: () => void;
  userAccount: UserAccount;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenAddModal,
  userAccount
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text element wordmark (Display face, no extra pill attachments) */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setActiveTab('campaigns')}
              className="text-left flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 rounded-lg"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-600 to-red-600 flex items-center justify-center text-white shadow-sm font-bold text-lg">
                V
              </div>
              <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap">
                Vente Digitale
              </span>
            </button>
          </div>

          {/* Zone 2: 4-5 clean single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600 dark:text-slate-300">
            <button
              onClick={() => setActiveTab('campaigns')}
              className={`hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 pb-0.5 border-b-2 ${
                activeTab === 'campaigns'
                  ? 'border-rose-600 text-slate-900 dark:text-white font-semibold'
                  : 'border-transparent'
              }`}
            >
              Vente Digitale
            </button>
            <button
              onClick={() => setActiveTab('simulator')}
              className={`hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 pb-0.5 border-b-2 ${
                activeTab === 'simulator'
                  ? 'border-rose-600 text-slate-900 dark:text-white font-semibold'
                  : 'border-transparent'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5 text-rose-600" />
              <span>Simulateur Mobile</span>
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 pb-0.5 border-b-2 ${
                activeTab === 'analytics'
                  ? 'border-rose-600 text-slate-900 dark:text-white font-semibold'
                  : 'border-transparent'
              }`}
            >
              Statistiques & ROI
            </button>
            <button
              onClick={() => setActiveTab('embeds')}
              className={`hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 pb-0.5 border-b-2 ${
                activeTab === 'embeds'
                  ? 'border-rose-600 text-slate-900 dark:text-white font-semibold'
                  : 'border-transparent'
              }`}
            >
              Codes d'Intégration
            </button>
            <button
              onClick={() => setActiveTab('account')}
              className={`hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 pb-0.5 border-b-2 ${
                activeTab === 'account'
                  ? 'border-rose-600 text-slate-900 dark:text-white font-semibold'
                  : 'border-transparent'
              }`}
            >
              Mon Compte
            </button>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenAddModal}
              className="h-10 px-4 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 active:scale-[0.98] rounded-xl transition-all shadow-sm flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Ajouter une pub</span>
              <span className="sm:hidden">Ajouter</span>
            </button>

            {/* Profile Avatar Trigger */}
            <button
              onClick={() => setActiveTab('account')}
              title={`Compte: ${userAccount.email}`}
              className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 flex items-center justify-center font-bold text-slate-700 dark:text-slate-200 text-xs border border-slate-200 dark:border-slate-700 transition-colors"
            >
              IC
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
