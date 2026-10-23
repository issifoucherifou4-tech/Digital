import React, { useState } from 'react';
import { Campaign, UserAccount } from '../types/campaign';
import {
  Smartphone,
  Share2,
  Bookmark,
  ExternalLink,
  Heart,
  MessageCircle,
  MoreHorizontal,
  ChevronLeft,
  RotateCw,
  Sparkles,
  Check,
  Compass,
  Bell,
  User,
  Search
} from 'lucide-react';

interface MobileSimulatorProps {
  campaigns: Campaign[];
  selectedCampaignId: string;
  onSelectCampaign: (id: string) => void;
  userAccount: UserAccount;
}

export const MobileSimulator: React.FC<MobileSimulatorProps> = ({
  campaigns,
  selectedCampaignId,
  onSelectCampaign,
  userAccount
}) => {
  const [deviceModel, setDeviceModel] = useState<'iphone' | 'pixel' | 'fullscreen'>('iphone');
  const [viewFormat, setViewFormat] = useState<'closeup' | 'feed'>('closeup');
  const [savedCount, setSavedCount] = useState<Record<string, number>>({});
  const [likedCount, setLikedCount] = useState<Record<string, number>>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const currentCampaign =
    campaigns.find((c) => c.id === selectedCampaignId) || campaigns[0];

  const handleSave = (id: string) => {
    setSavedCount((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
    showToast('Enregistré dans vos tableaux Pinterest !');
  };

  const handleLike = (id: string) => {
    setLikedCount((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
    showToast('Ajouté à vos mentions "J\'aime"');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: currentCampaign.title,
        url: currentCampaign.shortUrl
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(currentCampaign.shortUrl);
      showToast('Lien publicitaire copié dans le presse-papier !');
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header with Title and Device Controls */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <span className="font-semibold text-rose-600 dark:text-rose-400">Simulateur Mobile</span>
              <span aria-hidden="true">·</span>
              <span>Rendu Smartphone & Tactile</span>
              <span aria-hidden="true">·</span>
              <span>100% Responsive</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mt-1">
              Aperçu en conditions réelles sur Smartphone
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
              Testez l'ergonomie, la réactivité et l'engagement de vos 4 publicités telles que vos visiteurs les découvrent sur l'application mobile Pinterest.
            </p>
          </div>

          {/* Device & View Controls */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
              <button
                onClick={() => setViewFormat('closeup')}
                className={`min-h-[36px] px-3 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  viewFormat === 'closeup'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                Fiche Épinglée
              </button>
              <button
                onClick={() => setViewFormat('feed')}
                className={`min-h-[36px] px-3 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  viewFormat === 'feed'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                Fil d'actualité
              </button>
            </div>

            <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
              <button
                onClick={() => setDeviceModel('iphone')}
                className={`min-h-[36px] px-3 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  deviceModel === 'iphone'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                iPhone 16 Pro
              </button>
              <button
                onClick={() => setDeviceModel('pixel')}
                className={`min-h-[36px] px-3 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  deviceModel === 'pixel'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                Google Pixel 9
              </button>
            </div>
          </div>
        </div>

        {/* Campaign Selection Tabs */}
        <div className="flex items-center gap-2 mt-5 pt-5 border-t border-slate-100 dark:border-slate-800 overflow-x-auto no-scrollbar pb-1">
          {campaigns.map((camp) => (
            <button
              key={camp.id}
              onClick={() => onSelectCampaign(camp.id)}
              className={`min-h-[44px] px-3.5 py-2 rounded-xl text-xs font-semibold transition-all shrink-0 flex items-center gap-2 cursor-pointer ${
                selectedCampaignId === camp.id
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <span className="font-mono text-[11px] opacity-90">{camp.shortCode}</span>
              <span className="truncate max-w-[150px] sm:max-w-xs">{camp.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Phone Stage */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-8 py-4">
        {/* Device Frame */}
        <div
          className={`relative mx-auto transition-all duration-300 ${
            deviceModel === 'iphone'
              ? 'w-[375px] h-[780px] rounded-[52px] border-[12px] border-slate-900 shadow-2xl bg-black'
              : 'w-[380px] h-[780px] rounded-[44px] border-[10px] border-slate-800 shadow-2xl bg-black'
          } p-2 flex flex-col overflow-hidden`}
        >
          {/* Inner Screen */}
          <div className="relative w-full h-full bg-white dark:bg-slate-950 rounded-[40px] flex flex-col overflow-hidden text-slate-900 dark:text-white select-none">
            {/* Dynamic Island / Camera Notch */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 z-50">
              {deviceModel === 'iphone' ? (
                <div className="w-28 h-6 bg-black rounded-full flex items-center justify-between px-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-900" />
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                </div>
              ) : (
                <div className="w-3.5 h-3.5 bg-black rounded-full" />
              )}
            </div>

            {/* Simulated Phone Status Bar */}
            <div className="h-10 px-6 flex items-center justify-between text-[11px] font-semibold text-slate-900 dark:text-white shrink-0 pt-1">
              <span>09:41</span>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px]">5G</span>
                <div className="w-5 h-2.5 border border-current rounded-sm p-0.5 flex items-center">
                  <div className="w-full h-full bg-current rounded-xs" />
                </div>
              </div>
            </div>

            {/* Pinterest Mobile App Top Header */}
            <div className="h-12 px-4 flex items-center justify-between border-b border-slate-100 dark:border-slate-900 shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-rose-600 flex items-center justify-center text-white font-black text-xs">
                  P
                </div>
                <span className="font-bold text-xs tracking-tight">Pinterest</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleShare}
                  className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-900"
                  title="Partager"
                >
                  <Share2 className="w-4 h-4 text-slate-700 dark:text-slate-300" />
                </button>
                <MoreHorizontal className="w-4 h-4 text-slate-700 dark:text-slate-300" />
              </div>
            </div>

            {/* Mobile Scrollable View Area */}
            <div className="flex-1 overflow-y-auto no-scrollbar pb-16">
              {viewFormat === 'closeup' ? (
                /* Fiche Épinglée Closeup */
                <div className="p-3 space-y-4">
                  {/* High-res Ad Creative */}
                  <div className="relative rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900 shadow-sm">
                    <img
                      src={currentCampaign.image}
                      alt={currentCampaign.title}
                      referrerPolicy="no-referrer"
                      className="w-full object-cover max-h-[380px]"
                    />
                    <div className="absolute top-3 left-3 bg-black/60 text-white text-[10px] font-medium px-2 py-0.5 rounded-full backdrop-blur-md">
                      Sponsorisé · {currentCampaign.shortCode}
                    </div>
                  </div>

                  {/* Title & Interactive CTA Bar */}
                  <div className="space-y-3 px-1">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs shrink-0">
                          IC
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                            {userAccount.name}
                          </p>
                          <p className="text-[10px] text-slate-500 truncate">
                            Compte vérifié
                          </p>
                        </div>
                      </div>

                      {/* Primary Save Button (Pinterest Red) */}
                      <button
                        onClick={() => handleSave(currentCampaign.id)}
                        className="h-10 px-5 rounded-full bg-rose-600 hover:bg-rose-700 active:scale-95 text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition-transform cursor-pointer shrink-0"
                      >
                        <Bookmark className="w-3.5 h-3.5 fill-current" />
                        <span>Enregistrer</span>
                        {(savedCount[currentCampaign.id] || 0) > 0 && (
                          <span className="ml-1 text-[10px] bg-white/20 px-1.5 py-0.2 rounded-full">
                            +{(savedCount[currentCampaign.id] || 0)}
                          </span>
                        )}
                      </button>
                    </div>

                    {/* Headline */}
                    <h2 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                      {currentCampaign.title}
                    </h2>

                    {/* Description */}
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {currentCampaign.description}
                    </p>

                    {/* Destination CTA Button (Visit Site) */}
                    <a
                      href={currentCampaign.destinationUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full h-10 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-900 dark:text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors border border-slate-200 dark:border-slate-800"
                    >
                      <span>{currentCampaign.ctaText}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                    </a>

                    {/* Social Feedback Bar */}
                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-900 text-xs text-slate-500">
                      <button
                        onClick={() => handleLike(currentCampaign.id)}
                        className="flex items-center gap-1 hover:text-rose-600 transition-colors p-1"
                      >
                        <Heart className="w-4 h-4 text-rose-500" />
                        <span>
                          {currentCampaign.saves + (likedCount[currentCampaign.id] || 0)}
                        </span>
                      </button>

                      <div className="flex items-center gap-1">
                        <MessageCircle className="w-4 h-4" />
                        <span>{Math.round(currentCampaign.clicks / 24)} avis</span>
                      </div>

                      <button
                        onClick={handleShare}
                        className="flex items-center gap-1 hover:text-slate-900 dark:hover:text-white p-1"
                      >
                        <Share2 className="w-4 h-4" />
                        <span>Partager</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                /* Fil d'actualité Pinterest Mobile Feed */
                <div className="p-2 space-y-3">
                  <div className="text-[11px] font-semibold text-slate-500 px-1">
                    Fil Recommandé pour vous
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {campaigns.map((camp) => (
                      <div
                        key={camp.id}
                        onClick={() => {
                          onSelectCampaign(camp.id);
                          setViewFormat('closeup');
                        }}
                        className={`rounded-2xl overflow-hidden bg-slate-50 dark:bg-slate-900 border transition-all cursor-pointer ${
                          camp.id === currentCampaign.id
                            ? 'border-rose-500 ring-2 ring-rose-500/20'
                            : 'border-slate-200 dark:border-slate-800'
                        }`}
                      >
                        <div className="relative aspect-[3/4] bg-slate-950 overflow-hidden">
                          <img
                            src={camp.image}
                            alt={camp.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute bottom-2 left-2 bg-black/60 text-white text-[9px] px-1.5 py-0.5 rounded backdrop-blur-sm">
                            Sponsorisé
                          </div>
                        </div>
                        <div className="p-2">
                          <p className="text-[11px] font-semibold line-clamp-2 leading-tight text-slate-900 dark:text-white">
                            {camp.title}
                          </p>
                          <div className="flex items-center justify-between text-[10px] text-slate-500 mt-1">
                            <span className="font-mono">{camp.shortCode}</span>
                            <span className="text-emerald-600 font-medium">Actif</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Bottom Navigation Bar within Simulated App */}
            <div className="absolute bottom-0 left-0 right-0 h-14 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-t border-slate-100 dark:border-slate-900 flex items-center justify-around px-4 text-slate-400">
              <button
                onClick={() => setViewFormat('feed')}
                className={`p-2 ${viewFormat === 'feed' ? 'text-slate-900 dark:text-white' : ''}`}
              >
                <Compass className="w-5 h-5" />
              </button>
              <button className="p-2">
                <Search className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleSave(currentCampaign.id)}
                className="w-8 h-8 rounded-full bg-rose-600 text-white flex items-center justify-center"
              >
                <Bookmark className="w-4 h-4 fill-current" />
              </button>
              <button className="p-2">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2">
                <User className="w-5 h-5" />
              </button>
            </div>

            {/* In-app Toast message */}
            {toastMessage && (
              <div className="absolute top-14 left-4 right-4 bg-slate-900/90 text-white text-xs px-3 py-2 rounded-xl text-center shadow-lg backdrop-blur-md flex items-center justify-center gap-1.5 z-50">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>{toastMessage}</span>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Diagnostics & Pin Details */}
        <div className="w-full lg:w-96 space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800">
            <span className="text-xs font-semibold text-rose-600 dark:text-rose-400">
              Audit Responsive & Mobile
            </span>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1">
              Paramètres Publicitaires Mobile
            </h3>

            <div className="space-y-3 mt-4 text-xs">
              <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Lien court Pinterest:</span>
                <a
                  href={currentCampaign.shortUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-rose-600 hover:underline font-semibold"
                >
                  {currentCampaign.shortCode}
                </a>
              </div>

              <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Taux Mobile:</span>
                <span className="font-bold text-slate-900 dark:text-white tabular-nums">
                  {currentCampaign.mobileEngagementRate}%
                </span>
              </div>

              <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Format d'annonce:</span>
                <span className="font-medium text-slate-700 dark:text-slate-300 capitalize">
                  {currentCampaign.adFormat}
                </span>
              </div>

              <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Bouton Call-To-Action:</span>
                <span className="font-medium text-slate-900 dark:text-white">
                  "{currentCampaign.ctaText}"
                </span>
              </div>

              <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Cible d'audience:</span>
                <span className="font-medium text-slate-700 dark:text-slate-300 text-right truncate max-w-[180px]">
                  {currentCampaign.targetAudience}
                </span>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
              <a
                href={currentCampaign.pinterestUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full h-10 px-4 rounded-xl text-xs font-semibold text-rose-600 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 flex items-center justify-center gap-2 transition-colors"
              >
                <span>Ouvrir l'épingle originale sur Pinterest</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={handleShare}
                className="w-full h-10 px-4 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Partager le lien court ({currentCampaign.shortCode})</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
