import React, { useState } from 'react';
import { Campaign } from '../types/campaign';
import { X, Plus, Sparkles, Link, Image as ImageIcon } from 'lucide-react';

interface AddCampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCampaign: (newCampaign: Campaign) => void;
  currency: 'EUR' | 'USD' | 'XOF';
}

export const AddCampaignModal: React.FC<AddCampaignModalProps> = ({
  isOpen,
  onClose,
  onAddCampaign,
  currency
}) => {
  const [urlOrCode, setUrlOrCode] = useState('');
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState(29.99);
  const [kicker, setKicker] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('E-commerce & Tech');
  const [dailyBudget, setDailyBudget] = useState(25);
  const [targetAudience, setTargetAudience] = useState('Tous les publics (18-45 ans)');
  const [ctaText, setCtaText] = useState('Commander');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Extract shortcode or pin id
    let cleanCode = urlOrCode.trim();
    if (cleanCode.includes('pin.it/')) {
      cleanCode = cleanCode.split('pin.it/')[1].split('/')[0].split('?')[0];
    } else if (cleanCode.includes('/pin/')) {
      cleanCode = cleanCode.split('/pin/')[1].split('/')[0].split('?')[0];
    }

    const newCamp: Campaign = {
      id: `camp-${Date.now()}`,
      shortCode: cleanCode || `PIN-${Math.floor(1000 + Math.random() * 9000)}`,
      pinId: `${Date.now()}`,
      shortUrl: cleanCode.startsWith('http') ? cleanCode : `https://pin.it/${cleanCode}`,
      pinterestUrl: `https://www.pinterest.com/pin/${Date.now()}/`,
      title: title || 'Nouvelle Vente Digitale',
      kicker: kicker || category,
      description: description || 'Produit digital sur Pinterest.',
      category,
      image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
      fallbackGradient: 'from-rose-900 via-slate-900 to-black',
      status: 'active',
      price: Number(price),
      dailyBudget: Number(dailyBudget),
      totalSpent: 0,
      impressions: 120,
      clicks: 14,
      saves: 5,
      conversions: 1,
      revenue: 0,
      targetAudience,
      destinationUrl: 'https://pinterest.com',
      adFormat: 'standard',
      ctaText,
      createdDate: 'Aujourd\'hui',
      tags: ['Sponsorisé', 'Nouveau'],
      mobileEngagementRate: 90.0
    };

    onAddCampaign(newCamp);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 relative my-8">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-xs text-rose-600 font-semibold mb-1">
          <Plus className="w-4 h-4" />
          <span>Nouveau Code Publicitaire</span>
        </div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Ajouter une Campagne Publicitaire
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Collez votre lien Pinterest (ex: https://pin.it/xxxx) ou renseignez les paramètres de votre publicité.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 mt-5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Lien Court ou Code Pinterest *
            </label>
            <div className="relative">
              <Link className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                placeholder="https://pin.it/1AoTfLnED"
                value={urlOrCode}
                onChange={(e) => setUrlOrCode(e.target.value)}
                className="w-full h-11 pl-9 pr-4 rounded-xl text-xs bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Titre de l'Annonce *
            </label>
            <input
              type="text"
              required
              placeholder="Ex: Gourmet Pizza Artigianale Restaurant"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full h-11 px-3 rounded-xl text-xs bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Catégorie
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full h-11 px-3 rounded-xl text-xs bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500 cursor-pointer"
              >
                <option value="Gastronomie & Recettes">Gastronomie & Recettes</option>
                <option value="Cuisine & Masterclass">Cuisine & Masterclass</option>
                <option value="Gaming & Ergonomie">Gaming & Ergonomie</option>
                <option value="Déco & Setup Tech">Déco & Setup Tech</option>
                <option value="Mode & Lifestyle">Mode & Lifestyle</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Prix Fixe ({currency}) *
              </label>
              <input
                type="number"
                step="0.01"
                min="0.5"
                required
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full h-11 px-3 rounded-xl text-xs bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-mono font-bold focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Texte du Bouton CTA
            </label>
            <input
              type="text"
              placeholder="Ex: Découvrir la recette"
              value={ctaText}
              onChange={(e) => setCtaText(e.target.value)}
              className="w-full h-11 px-3 rounded-xl text-xs bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Description de l'Annonce
            </label>
            <textarea
              rows={2}
              placeholder="Brève description de la campagne et de l'offre..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 rounded-xl text-xs bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="h-10 px-4 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="h-10 px-5 rounded-xl text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 transition-colors shadow-sm"
            >
              Ajouter au Compte
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
