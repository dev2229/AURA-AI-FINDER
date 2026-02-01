
export enum PricingModel {
  FREE = 'Free',
  FREEMIUM = 'Freemium',
  PAID = 'Paid'
}

export interface AITool {
  id: string;
  name: string;
  description: string;
  pricing_model: PricingModel;
  rating: number;
  review_count: string;
  url: string;
  category: string;
  tags: string[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
}
