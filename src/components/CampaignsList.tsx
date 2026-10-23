import React, { useState } from 'react';
import { Campaign, UserAccount } from '../types/campaign';
import { CampaignCard } from './CampaignCard';
import {
  Search,
  Plus,
  Monitor,
  Tag
} from 'lucide-react';

interface CampaignsListProps {
  campaigns: Campaign[];
  userAccount: UserAccount;
  onToggleStatus: (id: string) => void;
  onPreviewInSimulator: (campaign: Campaign) => void;
  onEdit: (campaign: Campaign) => void;
  onOpenAddModal: () => void;
}

export const CampaignsList: React.FC<CampaignsListProps> = ({
  campaigns,
  userAccount,
  onToggleStatus,
  onPreviewInSimulator,
  onEdit,
  onOpenAddModal
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'default' | 'priceAsc' | 'priceDesc'>('default');

  const filteredCampaigns = campaigns
    .filter((camp) => {
      const q = searchQuery.toLowerCase();
      return (
        camp.title.toLowerCase().includes(q) ||
        camp.shortCode.toLowerCase().includes(q)
      );
    })
    .sort((a, b) => {
      if (sortBy === 'priceAsc') return (a.price || 0) - (b.price || 0);
      if (sortBy === 'priceDesc') return (b.price || 0) - (a.price || 0);
      return 0;
    });

  return (
    <div className="space-y-8 pb-12">
      {/* Clean Header: Vente Digitale */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs text-rose-600 dark:text-rose-400 font-semibold mb-1">
            <Monitor className="w-4 h-4" />
            <span>Catalogue Ordinateur</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Vente Digitale
          </h1>
        </div>

        {/* Minimal Actions: Search & Add */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher..."
              className="h-10 pl-9 pr-3 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500 w-44 sm:w-60"
            />
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="h-10 px-3 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500 cursor-pointer"
          >
            <option value="default">Ordre par défaut</option>
            <option value="priceAsc">Prix croissant</option>
            <option value="priceDesc">Prix décroissant</option>
          </select>

          <button
            onClick={onOpenAddModal}
            className="h-10 px-4 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 active:scale-95 rounded-xl flex items-center gap-2 transition-transform cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Ajouter</span>
          </button>
        </div>
      </div>

      {/* Grid of Computer Mockups with Fixed Prices */}
      {filteredCampaigns.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          {filteredCampaigns.map((camp) => (
            <CampaignCard
              key={camp.id}
              campaign={camp}
              onToggleStatus={onToggleStatus}
              onPreviewInSimulator={onPreviewInSimulator}
              onEdit={onEdit}
              currency={userAccount.currency}
            />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
          <p className="text-slate-500 text-sm">
            Aucun produit trouvé.
          </p>
        </div>
      )}
    </div>
  );
};
