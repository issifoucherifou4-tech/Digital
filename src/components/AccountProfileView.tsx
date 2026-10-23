import React, { useState } from 'react';
import { UserAccount } from '../types/campaign';
import {
  User,
  Mail,
  ShieldCheck,
  CreditCard,
  Sliders,
  Bell,
  RefreshCw,
  Check,
  Sparkles,
  Key,
  Copy,
  Receipt
} from 'lucide-react';

interface AccountProfileViewProps {
  userAccount: UserAccount;
  onUpdateAccount: (updated: Partial<UserAccount>) => void;
}

export const AccountProfileView: React.FC<AccountProfileViewProps> = ({
  userAccount,
  onUpdateAccount
}) => {
  const [name, setName] = useState(userAccount.name);
  const [email, setEmail] = useState(userAccount.email);
  const [currency, setCurrency] = useState(userAccount.currency);
  const [dailyBudgetLimit, setDailyBudgetLimit] = useState(userAccount.dailyBudgetLimit);
  const [autoRenew, setAutoRenew] = useState(userAccount.autoRenew);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [copiedToken, setCopiedToken] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateAccount({
      name,
      email,
      currency,
      dailyBudgetLimit: Number(dailyBudgetLimit),
      autoRenew,
      lastSyncTime: 'À l\'instant'
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const copyApiToken = () => {
    navigator.clipboard.writeText(`pntk_live_${userAccount.advertiserId.replace('ADV-', '')}_89f928e4`);
    setCopiedToken(true);
    setTimeout(() => setCopiedToken(false), 2000);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Account Header */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-rose-600 to-red-600 text-white flex items-center justify-center font-bold text-xl shadow-md">
              IC
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <span className="font-semibold text-rose-600 dark:text-rose-400">Compte Publicitaire</span>
                <span aria-hidden="true">·</span>
                <span>Partenaire Certifié</span>
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                {userAccount.name}
              </h1>
              <p className="text-xs text-slate-500 font-mono mt-0.5">
                {userAccount.email} · {userAccount.advertiserId}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-3 py-1.5 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 rounded-xl text-xs font-semibold flex items-center gap-2 border border-emerald-200 dark:border-emerald-800">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Compte Vérifié & Sécurisé</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Account Edit Form */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
          <h2 className="text-base font-bold text-slate-900 dark:text-white mb-4">
            Paramètres Généraux du Compte
          </h2>

          <form onSubmit={handleSave} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Nom du Titulaire
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full h-11 pl-9 pr-4 rounded-xl text-xs bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Adresse Email Associée
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-11 pl-9 pr-4 rounded-xl text-xs bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Devise de Facturation
                </label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value as any)}
                  className="w-full h-11 px-3 rounded-xl text-xs bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500 cursor-pointer"
                >
                  <option value="EUR">Euro (€ EUR) - France & Europe</option>
                  <option value="USD">Dollar ($ USD) - International</option>
                  <option value="XOF">Franc CFA (FCFA XOF) - Afrique de l'Ouest</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Plafond Quotidien Global
                </label>
                <div className="relative">
                  <Sliders className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="number"
                    min="10"
                    max="5000"
                    value={dailyBudgetLimit}
                    onChange={(e) => setDailyBudgetLimit(Number(e.target.value))}
                    className="w-full h-11 pl-9 pr-4 rounded-xl text-xs bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500 tabular-nums"
                  />
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-900 dark:text-white">
                  Renouvellement automatique du solde
                </p>
                <p className="text-[11px] text-slate-500">
                  Prélèvement automatique dès que le solde descend sous 50 {currency}
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={autoRenew}
                  onChange={(e) => setAutoRenew(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-slate-500">
                Dernière synchronisation : {userAccount.lastSyncTime}
              </span>

              <button
                type="submit"
                className="h-11 px-6 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 active:scale-95 rounded-xl shadow-sm transition-all flex items-center gap-2 cursor-pointer"
              >
                {savedSuccess ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-300" />
                    <span>Modifications Enregistrées !</span>
                  </>
                ) : (
                  <span>Enregistrer les préférences</span>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Account Details & API Token Card */}
        <div className="space-y-6">
          {/* Balance card */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
            <span className="text-xs font-medium text-slate-500">Solde Publicitaire Disponible</span>
            <div className="text-3xl font-extrabold text-slate-900 dark:text-white tabular-nums mt-1">
              {userAccount.balance.toFixed(2)} {userAccount.currency}
            </div>
            <p className="text-xs text-emerald-600 font-medium mt-1">
              Suffisant pour 3.2 jours au rythme actuel
            </p>

            <button
              onClick={() => {
                onUpdateAccount({ balance: userAccount.balance + 100 });
                alert('100 ' + userAccount.currency + ' crédités sur votre compte !');
              }}
              className="mt-4 w-full h-10 rounded-xl text-xs font-semibold text-slate-900 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-white flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <CreditCard className="w-4 h-4" />
              <span>Recharger le solde (+100 {userAccount.currency})</span>
            </button>
          </div>

          {/* API Token */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
              <Key className="w-4 h-4 text-rose-600" />
              <span>Clé d'accès API Pinterest</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Pour connecter vos applications mobiles tierces, WordPress ou Shopify.
            </p>

            <div className="mt-3 p-2.5 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2">
              <span className="font-mono text-[11px] text-slate-700 dark:text-slate-300 truncate">
                pntk_live_{userAccount.advertiserId.replace('ADV-', '')}_89f928e4
              </span>
              <button
                onClick={copyApiToken}
                className="p-1 rounded-md hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
                title="Copier le jeton API"
              >
                {copiedToken ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
