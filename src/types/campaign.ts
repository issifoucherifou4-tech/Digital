export type CampaignStatus = 'active' | 'paused' | 'scheduled';

export type AdFormat = 'standard' | 'shopping' | 'video' | 'collection';

export interface Campaign {
  id: string;
  shortCode: string;
  pinId: string;
  shortUrl: string;
  pinterestUrl: string;
  title: string;
  kicker: string;
  description: string;
  category: string;
  image: string;
  fallbackGradient: string;
  status: CampaignStatus;
  price: number;
  dailyBudget: number;
  totalSpent: number;
  impressions: number;
  clicks: number;
  saves: number;
  conversions: number;
  revenue: number;
  targetAudience: string;
  destinationUrl: string;
  adFormat: AdFormat;
  ctaText: string;
  createdDate: string;
  tags: string[];
  mobileEngagementRate: number; // percentage e.g. 84%
}

export interface UserAccount {
  name: string;
  email: string;
  advertiserId: string;
  accountType: string;
  currency: 'EUR' | 'USD' | 'XOF';
  balance: number;
  dailyBudgetLimit: number;
  activeCampaignsCount: number;
  autoRenew: boolean;
  pixelStatus: 'verified' | 'pending';
  lastSyncTime: string;
}

export interface MetricTrendPoint {
  day: string;
  impressions: number;
  clicks: number;
  conversions: number;
  spend: number;
}
