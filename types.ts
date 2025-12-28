
export type Language = 'EN' | 'BN';

export enum UserRole {
  GUEST = 'GUEST',
  ESTIMATOR = 'ESTIMATOR',
  ADMIN = 'ADMIN'
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  email: string;
}

export interface RateItem {
  id: string;
  description: string;
  unit: string;
  quantity: number;
  unitRate: number;
  officialRate: number; // For ALR checking
  category: 'Material' | 'Labor' | 'Equipment';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  image?: string; // Base64 string for image analysis
  timestamp: Date;
}

export interface Project {
  id: string;
  title: string;
  location: string;
  status: 'Ongoing' | 'Completed' | 'Tender';
  description: string;
  imageUrl: string;
  specs?: string; // Technical specs for modal
}

export interface Task {
  id: string;
  title: string;
  status: 'pending' | 'completed';
  assignedTo: string;
}

export interface VisitorLog {
  id: string;
  hashedIp: string;
  timestamp: string;
  path: string;
}

export interface AdminConfig {
  allowPublicRegistrations: boolean;
  maintenanceMode: boolean;
  knowledgeBaseContext: string;
  enableVisitorLogs: boolean;
  logRetentionDays: number;
  publicWelcomeMessage: string;
  showTenderBanner: boolean;
}

export interface Notification {
  id: string;
  title: string;
  body: string;
  status: 'draft' | 'scheduled' | 'sent';
  sentAt?: string;
}

export interface EmailLog {
  id: string;
  recipient: string;
  subject: string;
  status: 'sent' | 'failed';
  timestamp: string;
}
