
export enum AppScreen {
  LOGIN = 'LOGIN',
  DASHBOARD = 'DASHBOARD',
  SPA = 'SPA',
  WALL = 'WALL',
  PROFILE = 'PROFILE',
  REPAYMENT = 'REPAYMENT',
  DEBT_DETAILS = 'DEBT_DETAILS'
}

export interface Victory {
  id: string;
  title: string;
  amount: string;
  date: string;
  type: 'credit' | 'loan' | 'milestone';
  status?: string;
}

export type SparkCategory = 'story' | 'feeling';

export interface Spark {
  id: string;
  content: string;
  time: string;
  likes: number;
  secondaryStat: number;
  type: 'green' | 'blue' | 'purple';
  icon: string;
  category: SparkCategory;
  replies?: string[];
}

export interface Mood {
  id: string;
  name: string;
  icon: string;
}

export interface DebtInstitution {
  id: string;
  name: string;
  total: number;
  paid: number;
  remaining: number;
  percentage: number;
  type: 'bank' | 'fintech' | 'personal';
}
