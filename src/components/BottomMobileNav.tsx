import React from 'react';
import { Monitor, Smartphone, BarChart3, Code2, User } from 'lucide-react';

interface BottomMobileNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const BottomMobileNav: React.FC<BottomMobileNavProps> = ({
  activeTab,
  setActiveTab
}) => {
  const tabs = [
    { id: 'campaigns', label: 'Vente', icon: Monitor },
    { id: 'simulator', label: 'Simulateur', icon: Smartphone },
    { id: 'analytics', label: 'Stats & ROI', icon: BarChart3 },
    { id: 'embeds', label: 'Codes Pub', icon: Code2 },
    { id: 'account', label: 'Mon Compte', icon: User }
  ];

  return (
    <nav
      aria-label="Navigation Mobile"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 pb-safe shadow-lg"
    >
      <div className="grid grid-cols-5 h-16 items-center px-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`min-h-[44px] min-w-[44px] flex flex-col items-center justify-center transition-colors focus-visible:outline-none ${
                isActive
                  ? 'text-rose-600 font-semibold'
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.25]' : 'stroke-[1.75]'}`} />
              <span className="text-[10px] tracking-tight mt-1 whitespace-nowrap">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
