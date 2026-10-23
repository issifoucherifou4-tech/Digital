/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Campaign, UserAccount } from './types/campaign';
import { INITIAL_CAMPAIGNS, INITIAL_USER_ACCOUNT } from './data/initialCampaigns';
import { Navbar } from './components/Navbar';
import { BottomMobileNav } from './components/BottomMobileNav';
import { CampaignsList } from './components/CampaignsList';
import { MobileSimulator } from './components/MobileSimulator';
import { AnalyticsView } from './components/AnalyticsView';
import { EmbedCodesView } from './components/EmbedCodesView';
import { AccountProfileView } from './components/AccountProfileView';
import { AddCampaignModal } from './components/AddCampaignModal';
import { EditCampaignModal } from './components/EditCampaignModal';

export default function App() {
  const [campaigns, setCampaigns] = useState<Campaign[]>(() => {
    const saved = localStorage.getItem('pinads_campaigns');
    if (saved) {
      try {
        const parsed: Campaign[] = JSON.parse(saved);
        const existingIds = new Set(parsed.map((c) => c.id));
        const missing = INITIAL_CAMPAIGNS.filter((c) => !existingIds.has(c.id));
        if (missing.length > 0) {
          const merged = [...parsed, ...missing];
          localStorage.setItem('pinads_campaigns', JSON.stringify(merged));
          return merged;
        }
        return parsed;
      } catch (e) {
        return INITIAL_CAMPAIGNS;
      }
    }
    return INITIAL_CAMPAIGNS;
  });

  const [userAccount, setUserAccount] = useState<UserAccount>(() => {
    const saved = localStorage.getItem('pinads_account');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_USER_ACCOUNT;
      }
    }
    return INITIAL_USER_ACCOUNT;
  });

  const [activeTab, setActiveTab] = useState<string>('campaigns');
  const [selectedCampaignId, setSelectedCampaignId] = useState<string>(INITIAL_CAMPAIGNS[0].id);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null);

  // Sync with localStorage
  useEffect(() => {
    localStorage.setItem('pinads_campaigns', JSON.stringify(campaigns));
  }, [campaigns]);

  useEffect(() => {
    localStorage.setItem('pinads_account', JSON.stringify(userAccount));
  }, [userAccount]);

  const handleToggleStatus = (id: string) => {
    setCampaigns((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, status: c.status === 'active' ? 'paused' : 'active' } : c
      )
    );
  };

  const handlePreviewInSimulator = (camp: Campaign) => {
    setSelectedCampaignId(camp.id);
    setActiveTab('simulator');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddCampaign = (newCamp: Campaign) => {
    setCampaigns((prev) => [newCamp, ...prev]);
  };

  const handleUpdateCampaign = (updated: Campaign) => {
    setCampaigns((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
  };

  const handleUpdateAccount = (updated: Partial<UserAccount>) => {
    setUserAccount((prev) => ({ ...prev, ...updated }));
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col antialiased">
      {/* Universal 3-Zone Top Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAddModal={() => setIsAddModalOpen(true)}
        userAccount={userAccount}
      />

      {/* Main Viewport Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-24 md:pb-12">
        {activeTab === 'campaigns' && (
          <CampaignsList
            campaigns={campaigns}
            userAccount={userAccount}
            onToggleStatus={handleToggleStatus}
            onPreviewInSimulator={handlePreviewInSimulator}
            onEdit={(camp) => setEditingCampaign(camp)}
            onOpenAddModal={() => setIsAddModalOpen(true)}
          />
        )}

        {activeTab === 'simulator' && (
          <MobileSimulator
            campaigns={campaigns}
            selectedCampaignId={selectedCampaignId}
            onSelectCampaign={(id) => setSelectedCampaignId(id)}
            userAccount={userAccount}
          />
        )}

        {activeTab === 'analytics' && (
          <AnalyticsView
            campaigns={campaigns}
            userAccount={userAccount}
          />
        )}

        {activeTab === 'embeds' && (
          <EmbedCodesView
            campaigns={campaigns}
            userAccount={userAccount}
          />
        )}

        {activeTab === 'account' && (
          <AccountProfileView
            userAccount={userAccount}
            onUpdateAccount={handleUpdateAccount}
          />
        )}
      </main>

      {/* Mobile Touch-First Fixed Bottom Navigation */}
      <BottomMobileNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Modal Dialogs */}
      <AddCampaignModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddCampaign={handleAddCampaign}
        currency={userAccount.currency}
      />

      <EditCampaignModal
        isOpen={!!editingCampaign}
        campaign={editingCampaign}
        onClose={() => setEditingCampaign(null)}
        onSave={handleUpdateCampaign}
        currency={userAccount.currency}
      />

      {/* Subtle Desktop Footer */}
      <footer className="hidden md:block border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-800 dark:text-slate-200">Vente Digitale</span>
            <span aria-hidden="true">·</span>
            <span>Compte {userAccount.name} ({userAccount.email})</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono text-[11px]">{userAccount.advertiserId}</span>
          </div>

          <div className="flex items-center gap-4 text-slate-500">
            <span>4 Codes Publicitaires Actifs</span>
            <span aria-hidden="true">·</span>
            <span>Mobile-First & Responsive</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
