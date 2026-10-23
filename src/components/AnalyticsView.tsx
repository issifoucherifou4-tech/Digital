import React, { useState } from 'react';
import { Campaign, UserAccount } from '../types/campaign';
import { MOCK_TRENDS_7D } from '../data/initialCampaigns';
import {
  TrendingUp,
  Smartphone,
  Monitor,
  Tablet,
  DollarSign,
  MousePointerClick,
  Eye,
  Bookmark,
  Calendar,
  Download,
  CheckCircle2
} from 'lucide-react';

interface AnalyticsViewProps {
  campaigns: Campaign[];
  userAccount: UserAccount;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({
  campaigns,
  userAccount
}) => {
  const [selectedMetric, setSelectedMetric] = useState<'impressions' | 'clicks' | 'spend'>('clicks');
  const [budgetMultiplier, setBudgetMultiplier] = useState(1);

  const totalImpressions = campaigns.reduce((acc, c) => acc + c.impressions, 0);
  const totalClicks = campaigns.reduce((acc, c) => acc + c.clicks, 0);
  const totalSpent = campaigns.reduce((acc, c) => acc + c.totalSpent, 0);
  const totalRevenue = campaigns.reduce((acc, c) => acc + c.revenue, 0);
  const totalConversions = campaigns.reduce((acc, c) => acc + c.conversions, 0);
  const averageCTR = ((totalClicks / totalImpressions) * 100).toFixed(2);
  const roas = (totalRevenue / totalSpent).toFixed(2);
  const cpc = (totalSpent / totalClicks).toFixed(2);

  const formatCurrency = (amount: number) => {
    if (userAccount.currency === 'EUR') return `${amount.toFixed(2)} €`;
    if (userAccount.currency === 'USD') return `$${amount.toFixed(2)}`;
    return `${Math.round(amount * 655.957).toLocaleString()} F`;
  };

  // Max value in 7D trends for the graph scaling
  const maxMetricValue = Math.max(...MOCK_TRENDS_7D.map((t) => t[selectedMetric]));

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <span className="font-semibold text-rose-600 dark:text-rose-400">Rapports & ROI</span>
              <span aria-hidden="true">·</span>
              <span>Données Certifiées Pinterest</span>
              <span aria-hidden="true">·</span>
              <span>Derniers 30 Jours</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mt-1">
              Tableau de Bord des Performances & Conversion
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
              Analyse détaillée du trafic, du taux de clics (CTR) et de la rentabilité des 4 publicités de votre compte.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const csvData = [
                  'ID,Code,Titre,Impressions,Clics,CTR,Depense,Revenus,ROAS',
                  ...campaigns.map(
                    (c) =>
                      `"${c.id}","${c.shortCode}","${c.title}",${c.impressions},${c.clicks},${(
                        (c.clicks / c.impressions) *
                        100
                      ).toFixed(2)}%,${c.totalSpent},${c.revenue},${(c.revenue / c.totalSpent).toFixed(2)}`
                  )
                ].join('\n');
                const blob = new Blob([csvData], { type: 'text/csv' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `pinterest-ads-report-${new Date().toISOString().slice(0, 10)}.csv`;
                a.click();
              }}
              className="h-10 px-4 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 rounded-xl flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Exporter CSV</span>
            </button>
          </div>
        </div>

        {/* 4 Primary Top Metrics Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
          <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Coût par Clic (CPC)</span>
              <MousePointerClick className="w-4 h-4 text-slate-400" />
            </div>
            <div className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums mt-1">
              {formatCurrency(Number(cpc))}
            </div>
            <div className="text-[11px] text-emerald-600 font-medium mt-1">
              -14% sous la moyenne marché
            </div>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Taux de Clics (CTR)</span>
              <TrendingUp className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 tabular-nums mt-1">
              {averageCTR}%
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Excellent sur audience mobile
            </div>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Total Conversions</span>
              <CheckCircle2 className="w-4 h-4 text-rose-500" />
            </div>
            <div className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums mt-1">
              {totalConversions.toLocaleString()}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Ventes et inscriptions vérifiées
            </div>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>ROAS Global</span>
              <Bookmark className="w-4 h-4 text-rose-600" />
            </div>
            <div className="text-2xl font-bold text-rose-600 dark:text-rose-400 tabular-nums mt-1">
              {roas}x
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Pour 1 € investi : {roas} € générés
            </div>
          </div>
        </div>
      </div>

      {/* 7-Day Performance Trend Chart */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Évolution sur les 7 derniers jours
            </h2>
            <p className="text-xs text-slate-500">
              Distribution journalière des volumes et interactions
            </p>
          </div>

          {/* Metric Selector Button Group */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
            <button
              onClick={() => setSelectedMetric('clicks')}
              className={`min-h-[34px] px-3 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                selectedMetric === 'clicks'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Clics
            </button>
            <button
              onClick={() => setSelectedMetric('impressions')}
              className={`min-h-[34px] px-3 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                selectedMetric === 'impressions'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Impressions
            </button>
            <button
              onClick={() => setSelectedMetric('spend')}
              className={`min-h-[34px] px-3 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                selectedMetric === 'spend'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Dépense
            </button>
          </div>
        </div>

        {/* Bar Visualizer */}
        <div className="h-60 flex items-end justify-between gap-3 pt-8 pb-2 px-2">
          {MOCK_TRENDS_7D.map((item) => {
            const val = item[selectedMetric];
            const heightPercent = Math.max(15, Math.round((val / maxMetricValue) * 100));
            return (
              <div key={item.day} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                <div className="text-[10px] font-mono font-medium text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  {selectedMetric === 'spend' ? formatCurrency(val) : val.toLocaleString()}
                </div>
                <div
                  style={{ height: `${heightPercent}%` }}
                  className="w-full max-w-[48px] rounded-t-xl bg-gradient-to-t from-rose-600 to-red-500 group-hover:from-rose-500 group-hover:to-red-400 transition-all duration-300 relative shadow-sm"
                />
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  {item.day}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Device & Audience Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Répartition par Appareil
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Prédominance nette des smartphones
            </p>

            <div className="space-y-4 mt-6">
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <div className="flex items-center gap-2 font-medium text-slate-800 dark:text-slate-200">
                    <Smartphone className="w-4 h-4 text-rose-600" />
                    <span>Smartphones (Mobile)</span>
                  </div>
                  <span className="font-bold tabular-nums">88.5%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-rose-600 rounded-full" style={{ width: '88.5%' }} />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <div className="flex items-center gap-2 font-medium text-slate-800 dark:text-slate-200">
                    <Tablet className="w-4 h-4 text-amber-500" />
                    <span>Tablettes (iPad / Android)</span>
                  </div>
                  <span className="font-bold tabular-nums">4.5%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: '4.5%' }} />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <div className="flex items-center gap-2 font-medium text-slate-800 dark:text-slate-200">
                    <Monitor className="w-4 h-4 text-blue-500" />
                    <span>Ordinateurs de Bureau</span>
                  </div>
                  <span className="font-bold tabular-nums">7.0%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: '7.0%' }} />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-3 bg-rose-50 dark:bg-rose-950/40 rounded-2xl border border-rose-100 dark:border-rose-900/50 text-xs text-rose-900 dark:text-rose-200">
            <span className="font-semibold">Recommandation Mobile :</span> 9 utilisateurs sur 10 consultent vos 4 annonces depuis l'application mobile. Le format vertical 2:3 est maximisé.
          </div>
        </div>

        {/* Detailed Comparison Table */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">
            Comparatif des 4 Publicités
          </h3>

          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 pb-2">
                  <th className="pb-3 font-semibold">Campagne & Code</th>
                  <th className="pb-3 font-semibold text-right">Clics</th>
                  <th className="pb-3 font-semibold text-right">CTR</th>
                  <th className="pb-3 font-semibold text-right">Dépense</th>
                  <th className="pb-3 font-semibold text-right">ROAS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {campaigns.map((c) => {
                  const ctrVal = ((c.clicks / c.impressions) * 100).toFixed(2);
                  const roasVal = (c.revenue / c.totalSpent).toFixed(2);
                  return (
                    <tr key={c.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="py-3">
                        <div className="font-medium text-slate-900 dark:text-white truncate max-w-[200px] sm:max-w-xs">
                          {c.title}
                        </div>
                        <div className="text-[11px] font-mono text-rose-600">
                          {c.shortCode} · {c.category}
                        </div>
                      </td>
                      <td className="py-3 text-right font-bold text-slate-900 dark:text-white tabular-nums">
                        {c.clicks.toLocaleString()}
                      </td>
                      <td className="py-3 text-right font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">
                        {ctrVal}%
                      </td>
                      <td className="py-3 text-right text-slate-700 dark:text-slate-300 tabular-nums">
                        {formatCurrency(c.totalSpent)}
                      </td>
                      <td className="py-3 text-right font-bold text-rose-600 dark:text-rose-400 tabular-nums">
                        {roasVal}x
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
