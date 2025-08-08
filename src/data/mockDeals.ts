import type { AcquisitionDeal, DealStageData } from "../types/acquisition";
import { stageTemplates } from "./stageTemplates";

// Helper function to create stage data from template
const createStageFromTemplate = (
  stage: keyof typeof stageTemplates,
  status: DealStageData['status'] = 'pending',
  progress: number = 0,
  startedAt?: Date,
  completedAt?: Date
): DealStageData => {
  const template = stageTemplates[stage];
  return {
    stage,
    name: template.name,
    description: template.description,
    status,
    progress,
    startedAt,
    completedAt,
    checklist: template.defaultChecklist.map((item, index) => ({
      id: `${stage}-checklist-${index + 1}`,
      ...item,
      completed: progress === 100 ? true : Math.random() > 0.7, // Some items completed randomly
      completedBy: progress === 100 || Math.random() > 0.7 ? 'user-1' : undefined,
      completedAt: progress === 100 || Math.random() > 0.7 ? new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000) : undefined,
    })),
    documents: [],
    comments: [],
    approvals: [],
    owner: 'both',
  };
};

export const mockDeals: AcquisitionDeal[] = [
  {
    id: 'deal-1',
    matchId: 'match-1',
    businessId: 'business-1',
    buyerId: 'buyer-1',
    sellerId: 'seller-1',
    
    buyer: {
      id: 'buyer-1',
      firstName: 'Sarah',
      lastName: 'Chen',
      company: 'Chen Ventures',
      email: 'sarah@chenventures.com',
      avatar: 'SC',
    },
    
    seller: {
      id: 'seller-1',
      firstName: 'Mark',
      lastName: 'Thompson',
      company: 'TechFlow Solutions',
      email: 'mark@techflow.com',
      avatar: 'MT',
    },
    
    business: {
      id: 'business-1',
      name: 'TechFlow Solutions',
      industry: 'Technology',
      location: 'San Francisco, CA',
      revenue: '$2.5M',
      valuation: '$3.2M',
      description: 'SaaS platform for workflow automation',
    },
    
    createdAt: new Date('2024-01-14'),
    lastUpdated: new Date('2024-01-20'),
    targetClosingDate: new Date('2024-04-15'),
    
    currentStage: 'due-diligence',
    overallProgress: 45,
    status: 'active',
    
    dealValue: 3200000,
    dealStructure: 'Asset Purchase',
    financingType: ['Cash', 'Seller Financing'],
    
    stages: [
      createStageFromTemplate('nda', 'completed', 100, new Date('2024-01-14'), new Date('2024-01-18')),
      createStageFromTemplate('data-room', 'completed', 100, new Date('2024-01-19'), new Date('2024-01-28')),
      createStageFromTemplate('offer', 'completed', 100, new Date('2024-01-29'), new Date('2024-02-05')),
      createStageFromTemplate('due-diligence', 'in-progress', 60, new Date('2024-02-06')),
      createStageFromTemplate('loi', 'pending'),
      createStageFromTemplate('closing', 'pending'),
    ],
    
    dealTeam: [
      {
        id: 'team-1',
        name: 'Sarah Chen',
        email: 'sarah@chenventures.com',
        role: 'Principal',
        company: 'Chen Ventures',
        side: 'buyer',
        permissions: ['view-all', 'upload-documents', 'comment', 'approve', 'admin'],
        addedAt: new Date('2024-01-14'),
        avatar: 'SC',
      },
      {
        id: 'team-2',
        name: 'Mark Thompson',
        email: 'mark@techflow.com',
        role: 'CEO & Founder',
        company: 'TechFlow Solutions',
        side: 'seller',
        permissions: ['view-all', 'upload-documents', 'comment', 'approve', 'admin'],
        addedAt: new Date('2024-01-14'),
        avatar: 'MT',
      },
      {
        id: 'team-3',
        name: 'Jennifer Walsh',
        email: 'jennifer@legalfirm.com',
        role: 'Attorney',
        company: 'Walsh & Associates',
        side: 'buyer',
        permissions: ['view-all', 'upload-documents', 'comment'],
        addedAt: new Date('2024-01-20'),
        avatar: 'JW',
      },
      {
        id: 'team-4',
        name: 'Robert Kim',
        email: 'robert@kimcpa.com',
        role: 'CPA',
        company: 'Kim Accounting',
        side: 'buyer',
        permissions: ['view-all', 'comment'],
        addedAt: new Date('2024-02-01'),
        avatar: 'RK',
      },
    ],
    
    keyDates: [
      {
        id: 'date-1',
        title: 'Due Diligence Deadline',
        date: new Date('2024-03-15'),
        type: 'deadline',
        description: 'Complete all due diligence activities',
        completed: false,
        owner: 'buyer',
      },
      {
        id: 'date-2',
        title: 'Management Presentation',
        date: new Date('2024-02-22'),
        type: 'meeting',
        description: 'Detailed business presentation by management team',
        completed: false,
        owner: 'seller',
      },
      {
        id: 'date-3',
        title: 'LOI Target Date',
        date: new Date('2024-03-20'),
        type: 'milestone',
        description: 'Target date for signing letter of intent',
        completed: false,
        owner: 'both',
      },
    ],
    
    activity: [
      {
        id: 'activity-1',
        type: 'stage-started',
        description: 'Due diligence stage initiated',
        performedBy: 'buyer-1',
        performedByName: 'Sarah Chen',
        performedByRole: 'buyer',
        timestamp: new Date('2024-02-06T10:00:00'),
        stage: 'due-diligence',
      },
      {
        id: 'activity-2',
        type: 'document-uploaded',
        description: 'Uploaded financial statements for 2021-2023',
        performedBy: 'seller-1',
        performedByName: 'Mark Thompson',
        performedByRole: 'seller',
        timestamp: new Date('2024-02-08T14:30:00'),
        stage: 'due-diligence',
      },
      {
        id: 'activity-3',
        type: 'team-member-added',
        description: 'Added Jennifer Walsh (Attorney) to deal team',
        performedBy: 'buyer-1',
        performedByName: 'Sarah Chen',
        performedByRole: 'buyer',
        timestamp: new Date('2024-01-20T09:15:00'),
      },
      {
        id: 'activity-4',
        type: 'comment-added',
        description: 'Added comment on customer concentration analysis',
        performedBy: 'buyer-1',
        performedByName: 'Sarah Chen',
        performedByRole: 'buyer',
        timestamp: new Date('2024-02-15T16:45:00'),
        stage: 'due-diligence',
      },
    ],
  },
  
  {
    id: 'deal-2',
    matchId: 'match-3',
    businessId: 'business-2',
    buyerId: 'buyer-3',
    sellerId: 'seller-2',
    
    buyer: {
      id: 'buyer-3',
      firstName: 'Emily',
      lastName: 'Thompson',
      company: 'Thompson Health Investments',
      email: 'emily@thi.com',
      avatar: 'ET',
    },
    
    seller: {
      id: 'seller-2',
      firstName: 'Dr. Lisa',
      lastName: 'Park',
      company: 'Wellness Partners Clinic',
      email: 'lisa@wellnesspartners.com',
      avatar: 'LP',
    },
    
    business: {
      id: 'business-2',
      name: 'Wellness Partners Clinic',
      industry: 'Healthcare',
      location: 'Portland, OR',
      revenue: '$1.2M',
      valuation: '$900K',
      description: 'Primary care medical practice with focus on preventive medicine',
    },
    
    createdAt: new Date('2024-01-10'),
    lastUpdated: new Date('2024-02-18'),
    targetClosingDate: new Date('2024-05-01'),
    
    currentStage: 'loi',
    overallProgress: 75,
    status: 'active',
    
    dealValue: 900000,
    dealStructure: 'Asset Purchase',
    financingType: ['Cash', 'SBA Loan'],
    
    stages: [
      createStageFromTemplate('nda', 'completed', 100, new Date('2024-01-10'), new Date('2024-01-15')),
      createStageFromTemplate('data-room', 'completed', 100, new Date('2024-01-16'), new Date('2024-01-30')),
      createStageFromTemplate('offer', 'completed', 100, new Date('2024-01-31'), new Date('2024-02-08')),
      createStageFromTemplate('due-diligence', 'completed', 100, new Date('2024-02-09'), new Date('2024-02-28')),
      createStageFromTemplate('loi', 'in-progress', 80, new Date('2024-03-01')),
      createStageFromTemplate('closing', 'pending'),
    ],
    
    dealTeam: [
      {
        id: 'team-5',
        name: 'Emily Thompson',
        email: 'emily@thi.com',
        role: 'Principal',
        company: 'Thompson Health Investments',
        side: 'buyer',
        permissions: ['view-all', 'upload-documents', 'comment', 'approve', 'admin'],
        addedAt: new Date('2024-01-10'),
        avatar: 'ET',
      },
      {
        id: 'team-6',
        name: 'Dr. Lisa Park',
        email: 'lisa@wellnesspartners.com',
        role: 'Medical Director',
        company: 'Wellness Partners Clinic',
        side: 'seller',
        permissions: ['view-all', 'upload-documents', 'comment', 'approve', 'admin'],
        addedAt: new Date('2024-01-10'),
        avatar: 'LP',
      },
    ],
    
    keyDates: [
      {
        id: 'date-4',
        title: 'LOI Execution',
        date: new Date('2024-03-15'),
        type: 'milestone',
        description: 'Sign letter of intent',
        completed: false,
        owner: 'both',
      },
      {
        id: 'date-5',
        title: 'SBA Loan Application',
        date: new Date('2024-03-20'),
        type: 'deadline',
        description: 'Submit SBA loan application',
        completed: false,
        owner: 'buyer',
      },
    ],
    
    activity: [
      {
        id: 'activity-5',
        type: 'stage-completed',
        description: 'Due diligence stage completed successfully',
        performedBy: 'buyer-3',
        performedByName: 'Emily Thompson',
        performedByRole: 'buyer',
        timestamp: new Date('2024-02-28T17:00:00'),
        stage: 'due-diligence',
      },
      {
        id: 'activity-6',
        type: 'stage-started',
        description: 'Letter of Intent negotiations began',
        performedBy: 'buyer-3',
        performedByName: 'Emily Thompson',
        performedByRole: 'buyer',
        timestamp: new Date('2024-03-01T09:00:00'),
        stage: 'loi',
      },
    ],
  },
  
  {
    id: 'deal-3',
    matchId: 'match-2',
    businessId: 'business-1',
    buyerId: 'buyer-2',
    sellerId: 'seller-1',
    
    buyer: {
      id: 'buyer-2',
      firstName: 'Michael',
      lastName: 'Rodriguez',
      company: 'Rodriguez Capital Group',
      email: 'michael@rcg.com',
      avatar: 'MR',
    },
    
    seller: {
      id: 'seller-1',
      firstName: 'Mark',
      lastName: 'Thompson',
      company: 'TechFlow Solutions',
      email: 'mark@techflow.com',
      avatar: 'MT',
    },
    
    business: {
      id: 'business-1',
      name: 'TechFlow Solutions',
      industry: 'Technology',
      location: 'San Francisco, CA',
      revenue: '$2.5M',
      valuation: '$3.2M',
      description: 'SaaS platform for workflow automation',
    },
    
    createdAt: new Date('2024-01-12'),
    lastUpdated: new Date('2024-02-01'),
    targetClosingDate: new Date('2024-06-01'),
    
    currentStage: 'data-room',
    overallProgress: 25,
    status: 'active',
    
    dealValue: 3500000,
    dealStructure: 'Stock Purchase',
    financingType: ['Cash'],
    
    stages: [
      createStageFromTemplate('nda', 'completed', 100, new Date('2024-01-12'), new Date('2024-01-16')),
      createStageFromTemplate('data-room', 'in-progress', 40, new Date('2024-01-17')),
      createStageFromTemplate('offer', 'pending'),
      createStageFromTemplate('due-diligence', 'pending'),
      createStageFromTemplate('loi', 'pending'),
      createStageFromTemplate('closing', 'pending'),
    ],
    
    dealTeam: [
      {
        id: 'team-7',
        name: 'Michael Rodriguez',
        email: 'michael@rcg.com',
        role: 'Managing Director',
        company: 'Rodriguez Capital Group',
        side: 'buyer',
        permissions: ['view-all', 'upload-documents', 'comment', 'approve', 'admin'],
        addedAt: new Date('2024-01-12'),
        avatar: 'MR',
      },
      {
        id: 'team-8',
        name: 'Mark Thompson',
        email: 'mark@techflow.com',
        role: 'CEO & Founder',
        company: 'TechFlow Solutions',
        side: 'seller',
        permissions: ['view-all', 'upload-documents', 'comment', 'approve', 'admin'],
        addedAt: new Date('2024-01-12'),
        avatar: 'MT',
      },
    ],
    
    keyDates: [
      {
        id: 'date-6',
        title: 'Data Room Complete',
        date: new Date('2024-02-20'),
        type: 'deadline',
        description: 'Complete data room setup and document upload',
        completed: false,
        owner: 'seller',
      },
    ],
    
    activity: [
      {
        id: 'activity-7',
        type: 'stage-started',
        description: 'Data room setup initiated',
        performedBy: 'seller-1',
        performedByName: 'Mark Thompson',
        performedByRole: 'seller',
        timestamp: new Date('2024-01-17T11:00:00'),
        stage: 'data-room',
      },
    ],
  },
];
