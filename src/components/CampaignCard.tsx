import React, { useState } from 'react';
import { Campaign } from '../types/campaign';
import {
  ExternalLink,
  Copy,
  Check,
  ShoppingBag,
  ArrowUpRight,
  Edit2
} from 'lucide-react';

interface CampaignCardProps {
  campaign: Campaign;
  onToggleStatus?: (id: string) => void;
  onPreviewInSimulator?: (campaign: Campaign) => void;
  onEdit: (campaign: Campaign) => void;
  currency: 'EUR' | 'USD' | 'XOF';
}

export const CampaignCard: React.FC<CampaignCardProps> = ({
  campaign,
  onEdit,
  currency
}) => {
  const [copied, setCopied] = useState(false);
  const [imageError, setImageError] = useState(false);

  const formatPrice = (amount: number) => {
    if (currency === 'EUR') return `${amount.toFixed(2)} €`;
    if (currency === 'USD') return `$${amount.toFixed(2)}`;
    return `${Math.round(amount * 655.957).toLocaleString()} F`;
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(campaign.shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <article className="flex flex-col items-center group">
      {/* Computer / Laptop Frame Presentation ("sous forme ordinateur") */}
      <div className="w-full max-w-xl flex flex-col items-center">
        {/* Computer Screen Outer Shell (Bezel) */}
        <div className="w-full bg-slate-900 dark:bg-slate-950 p-2 sm:p-2.5 rounded-t-2xl sm:rounded-t-3xl shadow-xl border border-slate-700/60 dark:border-slate-800">
          {/* Top Bezel with Camera Dot */}
          <div className="flex items-center justify-center pb-1">
            <div className="w-1.5 h-1.5 rounded-full bg-slate-700 dark:bg-slate-600 ring-1 ring-slate-800" />
          </div>

          {/* Computer Display Screen (Inner) */}
          <div className="relative rounded-lg sm:rounded-xl overflow-hidden bg-black aspect-[16/10] flex flex-col justify-between">
            {/* Browser / Desktop Window Top Bar */}
            <div className="h-7 bg-slate-800/95 dark:bg-slate-900/95 backdrop-blur-md px-3 flex items-center justify-between z-20 shrink-0 border-b border-white/10 select-none">
              {/* macOS style Window control dots */}
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
              </div>

              {/* Minimal Browser Address Pill */}
              <div className="bg-slate-700/60 dark:bg-slate-800 px-3 py-0.5 rounded-md text-[10px] text-slate-300 font-mono truncate max-w-[170px] sm:max-w-xs flex items-center gap-1">
                <span className="text-slate-400">https://</span>
                <span className="text-white font-medium">{campaign.shortCode}</span>
              </div>

              {/* Action: Copy Link */}
              <button
                onClick={handleCopyLink}
                className="text-slate-400 hover:text-white transition-colors p-0.5"
                title="Copier le lien"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              </button>
            </div>

            {/* Screen Media Container (No clutter, pure clean imagery) */}
            <div className="relative flex-1 w-full bg-slate-950 overflow-hidden flex items-center justify-center">
              {!imageError ? (
                <img
                  src={campaign.image}
                  alt={campaign.title}
                  referrerPolicy="no-referrer"
                  onError={() => setImageError(true)}
                  className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-500"
                />
              ) : (
                <div className={`w-full h-full bg-gradient-to-br ${campaign.fallbackGradient} flex items-center justify-center text-white`}>
                  <span className="font-semibold text-sm">{campaign.shortCode}</span>
                </div>
              )}

              {/* Subtle top shade */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

              {/* FIXED PRICE BAR AT THE BOTTOM OF THE IMAGE ("fixe le prix en bas de chaque image") */}
              <div className="absolute bottom-0 left-0 right-0 z-20 bg-slate-950/90 backdrop-blur-md px-3.5 py-2.5 border-t border-white/10 flex items-center justify-between gap-3">
                {/* Price Display */}
                <div className="flex items-baseline gap-1.5">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                    Prix
                  </span>
                  <span className="text-lg sm:text-xl font-extrabold text-white font-mono tabular-nums tracking-tight">
                    {formatPrice(campaign.price || 29.99)}
                  </span>
                </div>

                {/* Direct Action Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onEdit(campaign)}
                    className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 transition-colors text-xs"
                    title="Modifier le prix ou l'offre"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href={campaign.destinationUrl || campaign.shortUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="h-8 px-3.5 rounded-lg bg-rose-600 hover:bg-rose-500 active:scale-95 text-white font-semibold text-xs flex items-center gap-1.5 shadow-md transition-all cursor-pointer whitespace-nowrap"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Commander</span>
                    <ArrowUpRight className="w-3 h-3 opacity-80" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Computer / Laptop Bottom Base (Chassis & Notch) */}
        <div className="relative w-[104%] h-3.5 sm:h-4 bg-gradient-to-b from-slate-300 via-slate-400 to-slate-500 dark:from-slate-700 dark:via-slate-800 dark:to-slate-900 rounded-b-xl shadow-lg flex items-start justify-center">
          {/* Trackpad / Opening notch */}
          <div className="w-16 sm:w-20 h-1 sm:h-1.5 bg-slate-400 dark:bg-slate-900 rounded-b-md mx-auto" />
        </div>

        {/* Clean, un-cluttered minimal title under the computer */}
        <div className="mt-3 w-full px-2 text-center">
          <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white truncate">
            {campaign.title}
          </h3>
        </div>
      </div>
    </article>
  );
};
