export interface Match {
  id: string;
  buyerId: string;
  sellerId: string;
  businessId?: string; // If specific to a business listing
  
  // Match details
  status: 'active' | 'archived' | 'blocked' | 'completed';
  createdAt: Date;
  lastActivity: Date;
  
  // Participants
  buyer: {
    id: string;
    firstName: string;
    lastName: string;
    company?: string;
    title?: string;
    avatar?: string;
    profilePicture?: string;
  };
  
  seller: {
    id: string;
    firstName: string;
    lastName: string;
    company?: string;
    title?: string;
    avatar?: string;
    profilePicture?: string;
  };
  
  // Business context
  business?: {
    id: string;
    name: string;
    industry: string;
    location: string;
    revenue: string;
    valuation: string;
  };
  
  // Communication
  unreadCount: {
    buyer: number;
    seller: number;
  };
  lastMessage?: {
    id: string;
    content: string;
    timestamp: Date;
    senderId: string;
    type: 'text' | 'file' | 'system';
  };
  
  // Progress tracking
  dealStage?: 'initial-contact' | 'interest-confirmed' | 'due-diligence' | 'negotiation' | 'closing' | 'completed';
  nextSteps?: string[];
  scheduledMeetings?: ScheduledMeeting[];
  
  // Match metadata
  matchScore?: number; // Algorithm-generated compatibility score
  matchReasons?: string[]; // Why they were matched
  mutualInterests?: string[];
}

export interface ScheduledMeeting {
  id: string;
  title: string;
  datetime: Date;
  duration: number; // minutes
  type: 'video' | 'phone' | 'in-person';
  location?: string;
  agenda?: string;
  participants: string[];
  status: 'scheduled' | 'completed' | 'cancelled' | 'rescheduled';
}

export interface Message {
  id: string;
  matchId: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'file' | 'system' | 'meeting-request' | 'document-share';
  
  // Message metadata
  readAt?: Date;
  editedAt?: Date;
  replyTo?: string; // Message ID being replied to
  
  // Attachments
  attachments?: MessageAttachment[];
  
  // System messages
  systemData?: {
    type: 'match-created' | 'meeting-scheduled' | 'document-shared' | 'deal-stage-updated';
    data: any;
  };
}

export interface MessageAttachment {
  id: string;
  name: string;
  type: 'image' | 'document' | 'video' | 'audio';
  url: string;
  size: number;
  uploadedAt: Date;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'match-created' | 'new-message' | 'meeting-request' | 'deal-update' | 'system';
  
  // Notification content
  title: string;
  message: string;
  icon?: string;
  
  // Metadata
  createdAt: Date;
  readAt?: Date;
  actionUrl?: string; // Where to navigate when clicked
  
  // Related data
  matchId?: string;
  messageId?: string;
  senderId?: string;
  
  // Notification priority
  priority: 'low' | 'medium' | 'high' | 'urgent';
}

export interface MatchFilters {
  status?: Match['status'][];
  dealStage?: Match['dealStage'][];
  hasUnreadMessages?: boolean;
  lastActivityDays?: number;
  searchTerm?: string;
}
