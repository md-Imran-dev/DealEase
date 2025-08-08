export interface AcquisitionDeal {
  id: string;
  matchId: string;
  businessId?: string;
  
  // Deal parties
  buyerId: string;
  sellerId: string;
  buyer: {
    id: string;
    firstName: string;
    lastName: string;
    company?: string;
    email: string;
    avatar?: string;
  };
  seller: {
    id: string;
    firstName: string;
    lastName: string;
    company?: string;
    email: string;
    avatar?: string;
  };
  
  // Business information
  business: {
    id: string;
    name: string;
    industry: string;
    location: string;
    revenue: string;
    valuation: string;
    description?: string;
  };
  
  // Deal timeline
  createdAt: Date;
  lastUpdated: Date;
  targetClosingDate?: Date;
  actualClosingDate?: Date;
  
  // Current status
  currentStage: DealStage;
  overallProgress: number; // 0-100
  status: 'active' | 'on-hold' | 'cancelled' | 'completed';
  
  // Deal details
  dealValue?: number;
  dealStructure?: string;
  financingType?: string[];
  
  // Workflow stages
  stages: DealStageData[];
  
  // Deal team
  dealTeam?: DealTeamMember[];
  
  // Important dates
  keyDates?: KeyDate[];
  
  // Deal notes and activity
  activity: DealActivity[];
  
  // Notifications
  notifications?: DealNotification[];
}

export type DealStage = 
  | 'nda'
  | 'data-room'
  | 'offer'
  | 'due-diligence'
  | 'loi'
  | 'closing';

export interface DealStageData {
  stage: DealStage;
  name: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed' | 'blocked';
  startedAt?: Date;
  completedAt?: Date;
  dueDate?: Date;
  
  // Stage progress
  progress: number; // 0-100
  
  // Requirements and checklists
  checklist: ChecklistItem[];
  
  // Uploaded documents
  documents: DealDocument[];
  
  // Stage-specific comments
  comments: StageComment[];
  
  // Approvals required
  approvals: StageApproval[];
  
  // Stage owner/responsibility
  owner: 'buyer' | 'seller' | 'both';
  assignee?: string;
}

export interface ChecklistItem {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  completedBy?: string;
  completedAt?: Date;
  required: boolean;
  owner: 'buyer' | 'seller' | 'both';
  category?: string;
  priority: 'low' | 'medium' | 'high';
}

export interface DealDocument {
  id: string;
  name: string;
  type: 'pdf' | 'doc' | 'excel' | 'image' | 'other';
  size: number;
  uploadedBy: string;
  uploadedAt: Date;
  url: string;
  description?: string;
  category: DocumentCategory;
  confidentialityLevel: 'public' | 'confidential' | 'highly-confidential';
  version: number;
  status: 'draft' | 'review' | 'approved' | 'rejected';
  reviewedBy?: string;
  reviewedAt?: Date;
  reviewComments?: string;
}

export type DocumentCategory = 
  | 'legal'
  | 'financial'
  | 'operational'
  | 'technical'
  | 'hr'
  | 'contracts'
  | 'compliance'
  | 'other';

export interface StageComment {
  id: string;
  content: string;
  authorId: string;
  authorName: string;
  authorRole: 'buyer' | 'seller';
  createdAt: Date;
  editedAt?: Date;
  attachments?: string[];
  isPrivate: boolean;
  mentions?: string[];
}

export interface StageApproval {
  id: string;
  title: string;
  description: string;
  requiredFrom: 'buyer' | 'seller' | 'both';
  status: 'pending' | 'approved' | 'rejected' | 'requires-changes';
  approvedBy?: string;
  approvedAt?: Date;
  rejectionReason?: string;
  conditions?: string[];
}

export interface DealTeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  company: string;
  side: 'buyer' | 'seller' | 'advisor';
  permissions: DealPermission[];
  addedAt: Date;
  avatar?: string;
}

export type DealPermission = 
  | 'view-all'
  | 'upload-documents'
  | 'comment'
  | 'approve'
  | 'edit-checklist'
  | 'invite-members'
  | 'admin';

export interface KeyDate {
  id: string;
  title: string;
  date: Date;
  type: 'milestone' | 'deadline' | 'meeting' | 'other';
  description?: string;
  completed: boolean;
  owner: 'buyer' | 'seller' | 'both';
}

export interface DealActivity {
  id: string;
  type: ActivityType;
  description: string;
  performedBy: string;
  performedByName: string;
  performedByRole: 'buyer' | 'seller';
  timestamp: Date;
  stage?: DealStage;
  metadata?: Record<string, any>;
}

export type ActivityType = 
  | 'stage-started'
  | 'stage-completed'
  | 'document-uploaded'
  | 'comment-added'
  | 'checklist-updated'
  | 'approval-requested'
  | 'approval-given'
  | 'team-member-added'
  | 'deadline-set'
  | 'meeting-scheduled'
  | 'status-changed'
  | 'note-added';

export interface DealNotification {
  id: string;
  dealId: string;
  recipientId: string;
  type: 'deadline-approaching' | 'approval-required' | 'document-uploaded' | 'stage-completed' | 'comment-mention';
  title: string;
  message: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  createdAt: Date;
  readAt?: Date;
  actionUrl?: string;
}

export interface DealFilters {
  stage?: DealStage[];
  status?: AcquisitionDeal['status'][];
  dealValue?: {
    min?: number;
    max?: number;
  };
  lastUpdated?: {
    days: number;
  };
  searchTerm?: string;
  myRole?: 'buyer' | 'seller';
}

// Stage configuration and templates
export interface StageTemplate {
  stage: DealStage;
  name: string;
  description: string;
  estimatedDuration: number; // days
  defaultChecklist: Omit<ChecklistItem, 'id' | 'completed' | 'completedBy' | 'completedAt'>[];
  requiredDocuments: {
    name: string;
    description: string;
    category: DocumentCategory;
    required: boolean;
    owner: 'buyer' | 'seller' | 'both';
  }[];
  milestones: {
    name: string;
    description: string;
    daysFromStart: number;
  }[];
}
