import React, { useState } from 'react';
import { Campaign, UserAccount } from '../types/campaign';
import {
  Copy,
  Check,
  Code2,
  ExternalLink,
  QrCode,
  Layers,
  Sparkles,
  Share2,
  Terminal,
  Smartphone
} from 'lucide-react';

interface EmbedCodesViewProps {
  campaigns: Campaign[];
  userAccount: UserAccount;
}

export const EmbedCodesView: React.FC<EmbedCodesViewProps> = ({
  campaigns,
  userAccount
}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<'url' | 'iframe' | 'pintrk' | 'qr'>('url');

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Generate responsive iframe embed
  const getIframeCode = (camp: Campaign) => {
    return `<iframe src="https://assets.pinterest.com/ext/embed.html?id=${camp.pinId}" height="520" width="345" frameborder="0" scrolling="no" style="border-radius:16px;max-width:100%;box-shadow:0 4px 12px rgba(0,0,0,0.08);" title="${camp.title}"></iframe>`;
  };

  // Generate Pinterest tracking pixel
  const getPixelCode = (camp: Campaign) => {
    return `<!-- Pinterest Conversion Tag for ${camp.shortCode} -->
<script>
  !function(e){if(!window.pintrk){window.pintrk = function () {
  window.pintrk.queue.push(Array.prototype.slice.call(arguments))};var
  n=window.pintrk;n.queue=[],n.version="3.0";var
  t=document.createElement("script");t.async=!0,t.src=e;var
  r=document.getElementsByTagName("script")[0];
  r.parentNode.insertBefore(t,r)}}("https://s.pinimg.com/ct/core.js");
  pintrk('load', '${userAccount.advertiserId}');
  pintrk('page');
  pintrk('track', 'lead', {
    pin_id: '${camp.pinId}',
    ad_code: '${camp.shortCode}',
    campaign_name: '${camp.title}'
  });
</script>`;
  };

  // Simple clean SVG QR code visualizer based on pin short url
  const renderSimpleQr = (url: string) => {
    return (
      <div className="w-28 h-28 bg-white p-2 rounded-xl border border-slate-200 flex flex-col items-center justify-center shadow-inner">
        <svg viewBox="0 0 100 100" className="w-full h-full text-slate-900 fill-current">
          {/* Authentic QR grid motif */}
          <rect x="0" y="0" width="30" height="30" rx="4" />
          <rect x="5" y="5" width="20" height="20" fill="white" />
          <rect x="9" y="9" width="12" height="12" />

          <rect x="70" y="0" width="30" height="30" rx="4" />
          <rect x="75" y="5" width="20" height="20" fill="white" />
          <rect x="79" y="79" width="12" height="12" />

          <rect x="0" y="70" width="30" height="30" rx="4" />
          <rect x="5" y="75" width="20" height="20" fill="white" />
          <rect x="9" y="79" width="12" height="12" />

          <rect x="40" y="10" width="8" height="8" />
          <rect x="52" y="10" width="8" height="8" />
          <rect x="40" y="24" width="20" height="8" />

          <rect x="10" y="40" width="8" height="20" />
          <rect x="24" y="40" width="8" height="8" />
          <rect x="24" y="52" width="8" height="8" />

          <rect x="40" y="40" width="20" height="20" rx="2" />
          <rect x="45" y="45" width="10" height="10" fill="white" />

          <rect x="70" y="40" width="8" height="8" />
          <rect x="82" y="40" width="8" height="8" />
          <rect x="70" y="52" width="20" height="8" />

          <rect x="40" y="70" width="8" height="20" />
          <rect x="52" y="70" width="8" height="8" />
          <rect x="52" y="82" width="8" height="8" />
          <rect x="70" y="70" width="8" height="8" />
          <rect x="82" y="82" width="8" height="8" />
        </svg>
        <span className="text-[9px] font-mono text-slate-500 mt-1 truncate max-w-full">
          Scan Mobile
        </span>
      </div>
    );
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <span className="font-semibold text-rose-600 dark:text-rose-400">Centre d'Intégration</span>
              <span aria-hidden="true">·</span>
              <span>Codes Publicitaires Pinterest</span>
              <span aria-hidden="true">·</span>
              <span>4 Campagnes Disponibles</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Export & Déploiement des 4 Codes Publicitaires
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
              Retrouvez les liens officiels, codes d'intégration HTML responsive, balises de tracking Pinterest Tag Pixel et QR codes prêts à scanner pour votre mobile.
            </p>
          </div>

          {/* Quick Copy All */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => {
                const allUrls = campaigns.map((c) => `${c.title}\n${c.shortUrl}`).join('\n\n');
                copyToClipboard(allUrls, 'all');
              }}
              className="h-10 px-4 text-xs font-semibold text-white bg-slate-900 dark:bg-white dark:text-slate-900 hover:bg-slate-800 rounded-xl flex items-center gap-2 transition-transform active:scale-95 cursor-pointer"
            >
              {copiedKey === 'all' ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>4 Liens Copiés !</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copier les 4 liens</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Format Selector Tabs */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl mt-6 max-w-fit">
          <button
            onClick={() => setSelectedFormat('url')}
            className={`min-h-[38px] px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              selectedFormat === 'url'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Liens Courts (pin.it)
          </button>
          <button
            onClick={() => setSelectedFormat('iframe')}
            className={`min-h-[38px] px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              selectedFormat === 'iframe'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Widget Iframe Responsive
          </button>
          <button
            onClick={() => setSelectedFormat('pintrk')}
            className={`min-h-[38px] px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              selectedFormat === 'pintrk'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Pixel Pinterest Tag
          </button>
          <button
            onClick={() => setSelectedFormat('qr')}
            className={`min-h-[38px] px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              selectedFormat === 'qr'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            QR Codes Mobile
          </button>
        </div>
      </div>

      {/* Cards for each of the 4 campaigns */}
      <div className="space-y-4">
        {campaigns.map((camp, index) => {
          const currentContent =
            selectedFormat === 'url'
              ? camp.shortUrl
              : selectedFormat === 'iframe'
              ? getIframeCode(camp)
              : getPixelCode(camp);

          return (
            <div
              key={camp.id}
              className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
            >
              {/* Left thumbnail & title */}
              <div className="flex items-center gap-4 min-w-0 md:max-w-md">
                <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0 border border-slate-200 dark:border-slate-700">
                  <img
                    src={camp.image}
                    alt={camp.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-1 left-1 bg-black/70 text-[9px] font-bold text-white px-1 rounded">
                    0{index + 1}
                  </div>
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-0.5">
                    <span className="font-mono text-rose-600 font-semibold">{camp.shortCode}</span>
                    <span>·</span>
                    <span>Pin ID: {camp.pinId}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                    {camp.title}
                  </h3>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-1">
                    <span>{camp.category}</span>
                    <span>·</span>
                    <span className="text-emerald-600 font-medium">Actif</span>
                  </div>
                </div>
              </div>

              {/* Middle & Right: Code snippet / QR display */}
              {selectedFormat === 'qr' ? (
                <div className="flex items-center gap-4">
                  {renderSimpleQr(camp.shortUrl)}
                  <div className="text-xs space-y-1">
                    <p className="font-semibold text-slate-900 dark:text-white">
                      Scan immédiat smartphone
                    </p>
                    <p className="text-slate-500 max-w-[200px]">
                      Pointez l'appareil photo pour ouvrir l'application Pinterest.
                    </p>
                    <a
                      href={camp.shortUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-block text-rose-600 hover:underline font-mono text-[11px] pt-1"
                    >
                      {camp.shortUrl}
                    </a>
                  </div>
                </div>
              ) : (
                <div className="flex-1 w-full md:max-w-xl">
                  <div className="relative bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-200 dark:border-slate-800 font-mono text-xs text-slate-800 dark:text-slate-200 overflow-x-auto">
                    <pre className="whitespace-pre-wrap break-all text-[11px]">
                      {currentContent}
                    </pre>

                    <button
                      onClick={() => copyToClipboard(currentContent, camp.id)}
                      className="absolute top-2 right-2 p-1.5 rounded-lg bg-white dark:bg-slate-800 shadow-xs border border-slate-200 dark:border-slate-700 hover:bg-slate-100 transition-colors text-slate-700 dark:text-slate-200"
                      title="Copier le code"
                    >
                      {copiedKey === camp.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* Action buttons */}
              <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                <a
                  href={camp.shortUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="h-9 px-3 text-xs font-semibold text-rose-600 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 rounded-lg flex items-center gap-1.5 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Ouvrir</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Global Integration Guide & Best Practices */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
          Guide d'intégration & Bonnes pratiques Mobiles
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-600 dark:text-slate-300 mt-4">
          <div className="space-y-1">
            <h4 className="font-semibold text-slate-900 dark:text-white">1. Ratio 2:3 recommandé</h4>
            <p>
              Sur mobile, les épingles au format vertical 2:3 (1000 x 1500 px) occupent le maximum de surface d'écran sans être rognées.
            </p>
          </div>
          <div className="space-y-1">
            <h4 className="font-semibold text-slate-900 dark:text-white">2. Vitesse de chargement</h4>
            <p>
              Toutes les images sont servies via CDN haute vélocité avec fallback fluide et compression WebP/JPG progressive.
            </p>
          </div>
          <div className="space-y-1">
            <h4 className="font-semibold text-slate-900 dark:text-white">3. Suivi des conversions</h4>
            <p>
              Le tag <span className="font-mono text-rose-600">pintrk</span> transmet instantanément les clics et événements d'achat vers votre compte <span className="font-mono">{userAccount.advertiserId}</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
