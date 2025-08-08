import type { StageTemplate, DealStage } from "../types/acquisition";

export const stageTemplates: Record<DealStage, StageTemplate> = {
  'nda': {
    stage: 'nda',
    name: 'NDA & Initial Review',
    description: 'Sign non-disclosure agreements and conduct initial business review',
    estimatedDuration: 7,
    defaultChecklist: [
      {
        title: 'Execute Mutual NDA',
        description: 'Both parties sign a mutual non-disclosure agreement',
        required: true,
        owner: 'both',
        priority: 'high',
        category: 'legal'
      },
      {
        title: 'Initial Business Overview',
        description: 'Seller provides high-level business overview presentation',
        required: true,
        owner: 'seller',
        priority: 'high',
        category: 'business'
      },
      {
        title: 'Buyer Investment Criteria Confirmation',
        description: 'Confirm business meets buyer\'s investment criteria',
        required: true,
        owner: 'buyer',
        priority: 'medium',
        category: 'business'
      },
      {
        title: 'Key Stakeholder Introductions',
        description: 'Introduce key team members and stakeholders',
        required: false,
        owner: 'both',
        priority: 'low',
        category: 'team'
      }
    ],
    requiredDocuments: [
      {
        name: 'Signed NDA',
        description: 'Executed mutual non-disclosure agreement',
        category: 'legal',
        required: true,
        owner: 'both'
      },
      {
        name: 'Business Overview Presentation',
        description: 'High-level overview of the business opportunity',
        category: 'operational',
        required: true,
        owner: 'seller'
      }
    ],
    milestones: [
      {
        name: 'NDA Signed',
        description: 'All parties have executed the NDA',
        daysFromStart: 3
      },
      {
        name: 'Initial Review Complete',
        description: 'Buyer confirms interest to proceed',
        daysFromStart: 7
      }
    ]
  },

  'data-room': {
    stage: 'data-room',
    name: 'Data Room Setup',
    description: 'Establish secure data room and provide comprehensive business information',
    estimatedDuration: 14,
    defaultChecklist: [
      {
        title: 'Set Up Virtual Data Room',
        description: 'Create secure online repository for business documents',
        required: true,
        owner: 'seller',
        priority: 'high',
        category: 'technical'
      },
      {
        title: 'Upload Financial Statements (3 years)',
        description: 'Historical financial statements and tax returns',
        required: true,
        owner: 'seller',
        priority: 'high',
        category: 'financial'
      },
      {
        title: 'Provide Legal Documents',
        description: 'Corporate documents, contracts, and legal agreements',
        required: true,
        owner: 'seller',
        priority: 'high',
        category: 'legal'
      },
      {
        title: 'Upload Operational Documents',
        description: 'Process documentation, policies, and procedures',
        required: true,
        owner: 'seller',
        priority: 'medium',
        category: 'operational'
      },
      {
        title: 'HR and Employee Information',
        description: 'Employee records, contracts, and HR policies',
        required: true,
        owner: 'seller',
        priority: 'medium',
        category: 'hr'
      },
      {
        title: 'Grant Buyer Data Room Access',
        description: 'Provide secure access credentials to buyer',
        required: true,
        owner: 'seller',
        priority: 'high',
        category: 'technical'
      }
    ],
    requiredDocuments: [
      {
        name: 'Financial Statements (3 years)',
        description: 'Audited or reviewed financial statements',
        category: 'financial',
        required: true,
        owner: 'seller'
      },
      {
        name: 'Tax Returns (3 years)',
        description: 'Business tax returns and supporting schedules',
        category: 'financial',
        required: true,
        owner: 'seller'
      },
      {
        name: 'Articles of Incorporation',
        description: 'Corporate formation documents',
        category: 'legal',
        required: true,
        owner: 'seller'
      },
      {
        name: 'Material Contracts',
        description: 'Key customer, supplier, and vendor agreements',
        category: 'contracts',
        required: true,
        owner: 'seller'
      },
      {
        name: 'Employee Handbook',
        description: 'HR policies and procedures',
        category: 'hr',
        required: false,
        owner: 'seller'
      }
    ],
    milestones: [
      {
        name: 'Data Room Created',
        description: 'Virtual data room is set up and accessible',
        daysFromStart: 5
      },
      {
        name: 'Core Documents Uploaded',
        description: 'Financial and legal documents are available',
        daysFromStart: 10
      },
      {
        name: 'Data Room Complete',
        description: 'All requested documents have been uploaded',
        daysFromStart: 14
      }
    ]
  },

  'offer': {
    stage: 'offer',
    name: 'Initial Offer',
    description: 'Buyer submits preliminary offer based on initial review',
    estimatedDuration: 10,
    defaultChecklist: [
      {
        title: 'Prepare Initial Offer',
        description: 'Draft preliminary offer with key terms and conditions',
        required: true,
        owner: 'buyer',
        priority: 'high',
        category: 'business'
      },
      {
        title: 'Review with Legal Counsel',
        description: 'Have legal team review offer terms',
        required: true,
        owner: 'buyer',
        priority: 'high',
        category: 'legal'
      },
      {
        title: 'Submit Formal Offer',
        description: 'Present written offer to seller',
        required: true,
        owner: 'buyer',
        priority: 'high',
        category: 'business'
      },
      {
        title: 'Seller Review and Response',
        description: 'Seller reviews offer and provides response',
        required: true,
        owner: 'seller',
        priority: 'high',
        category: 'business'
      },
      {
        title: 'Negotiate Key Terms',
        description: 'Discuss and negotiate primary deal terms',
        required: true,
        owner: 'both',
        priority: 'medium',
        category: 'business'
      }
    ],
    requiredDocuments: [
      {
        name: 'Initial Offer Letter',
        description: 'Formal written offer with key terms',
        category: 'legal',
        required: true,
        owner: 'buyer'
      },
      {
        name: 'Seller Response Letter',
        description: 'Formal response to initial offer',
        category: 'legal',
        required: true,
        owner: 'seller'
      }
    ],
    milestones: [
      {
        name: 'Offer Submitted',
        description: 'Buyer has submitted formal initial offer',
        daysFromStart: 5
      },
      {
        name: 'Offer Response Received',
        description: 'Seller has responded to the offer',
        daysFromStart: 10
      }
    ]
  },

  'due-diligence': {
    stage: 'due-diligence',
    name: 'Due Diligence',
    description: 'Comprehensive review of business operations, finances, and legal matters',
    estimatedDuration: 45,
    defaultChecklist: [
      {
        title: 'Financial Due Diligence',
        description: 'Detailed review of financial statements and records',
        required: true,
        owner: 'buyer',
        priority: 'high',
        category: 'financial'
      },
      {
        title: 'Legal Due Diligence',
        description: 'Review of legal structure, contracts, and compliance',
        required: true,
        owner: 'buyer',
        priority: 'high',
        category: 'legal'
      },
      {
        title: 'Operational Due Diligence',
        description: 'Assessment of business operations and processes',
        required: true,
        owner: 'buyer',
        priority: 'high',
        category: 'operational'
      },
      {
        title: 'Customer and Market Analysis',
        description: 'Review customer base and market position',
        required: true,
        owner: 'buyer',
        priority: 'medium',
        category: 'business'
      },
      {
        title: 'Management Interviews',
        description: 'Conduct interviews with key management team',
        required: true,
        owner: 'buyer',
        priority: 'medium',
        category: 'hr'
      },
      {
        title: 'Site Visits and Inspections',
        description: 'Physical inspection of business locations',
        required: false,
        owner: 'buyer',
        priority: 'low',
        category: 'operational'
      },
      {
        title: 'Third-Party Verifications',
        description: 'Verify key information with external parties',
        required: true,
        owner: 'buyer',
        priority: 'medium',
        category: 'compliance'
      },
      {
        title: 'Quality of Earnings Report',
        description: 'Independent financial analysis by accounting firm',
        required: false,
        owner: 'buyer',
        priority: 'medium',
        category: 'financial'
      }
    ],
    requiredDocuments: [
      {
        name: 'Due Diligence Checklist',
        description: 'Comprehensive list of required information',
        category: 'other',
        required: true,
        owner: 'buyer'
      },
      {
        name: 'Financial Analysis Report',
        description: 'Detailed financial review findings',
        category: 'financial',
        required: true,
        owner: 'buyer'
      },
      {
        name: 'Legal Review Summary',
        description: 'Summary of legal due diligence findings',
        category: 'legal',
        required: true,
        owner: 'buyer'
      },
      {
        name: 'Management Presentation',
        description: 'Detailed business presentation by management',
        category: 'operational',
        required: true,
        owner: 'seller'
      }
    ],
    milestones: [
      {
        name: 'Due Diligence Started',
        description: 'Formal due diligence process has begun',
        daysFromStart: 1
      },
      {
        name: 'Financial Review Complete',
        description: 'Financial due diligence has been completed',
        daysFromStart: 20
      },
      {
        name: 'Legal Review Complete',
        description: 'Legal due diligence has been completed',
        daysFromStart: 30
      },
      {
        name: 'Due Diligence Report',
        description: 'Comprehensive due diligence report completed',
        daysFromStart: 45
      }
    ]
  },

  'loi': {
    stage: 'loi',
    name: 'Letter of Intent',
    description: 'Execute letter of intent with detailed terms and conditions',
    estimatedDuration: 21,
    defaultChecklist: [
      {
        title: 'Negotiate Final Terms',
        description: 'Finalize key deal terms based on due diligence',
        required: true,
        owner: 'both',
        priority: 'high',
        category: 'business'
      },
      {
        title: 'Draft Letter of Intent',
        description: 'Prepare comprehensive LOI document',
        required: true,
        owner: 'buyer',
        priority: 'high',
        category: 'legal'
      },
      {
        title: 'Legal Review of LOI',
        description: 'Both parties review LOI with legal counsel',
        required: true,
        owner: 'both',
        priority: 'high',
        category: 'legal'
      },
      {
        title: 'Negotiate LOI Terms',
        description: 'Finalize LOI terms and conditions',
        required: true,
        owner: 'both',
        priority: 'high',
        category: 'legal'
      },
      {
        title: 'Execute Letter of Intent',
        description: 'Both parties sign the LOI',
        required: true,
        owner: 'both',
        priority: 'high',
        category: 'legal'
      },
      {
        title: 'Establish Closing Timeline',
        description: 'Set target closing date and milestones',
        required: true,
        owner: 'both',
        priority: 'medium',
        category: 'business'
      }
    ],
    requiredDocuments: [
      {
        name: 'Letter of Intent (Draft)',
        description: 'Initial draft of the LOI',
        category: 'legal',
        required: true,
        owner: 'buyer'
      },
      {
        name: 'Letter of Intent (Executed)',
        description: 'Signed letter of intent',
        category: 'legal',
        required: true,
        owner: 'both'
      },
      {
        name: 'Term Sheet',
        description: 'Detailed terms and conditions',
        category: 'legal',
        required: true,
        owner: 'both'
      }
    ],
    milestones: [
      {
        name: 'Terms Agreed',
        description: 'Key terms have been negotiated and agreed',
        daysFromStart: 10
      },
      {
        name: 'LOI Draft Complete',
        description: 'Letter of intent has been drafted',
        daysFromStart: 15
      },
      {
        name: 'LOI Executed',
        description: 'Letter of intent has been signed',
        daysFromStart: 21
      }
    ]
  },

  'closing': {
    stage: 'closing',
    name: 'Closing Process',
    description: 'Finalize all legal documents and complete the transaction',
    estimatedDuration: 60,
    defaultChecklist: [
      {
        title: 'Draft Purchase Agreement',
        description: 'Prepare comprehensive purchase agreement',
        required: true,
        owner: 'buyer',
        priority: 'high',
        category: 'legal'
      },
      {
        title: 'Negotiate Purchase Agreement',
        description: 'Review and negotiate purchase agreement terms',
        required: true,
        owner: 'both',
        priority: 'high',
        category: 'legal'
      },
      {
        title: 'Secure Financing',
        description: 'Finalize financing arrangements if applicable',
        required: false,
        owner: 'buyer',
        priority: 'high',
        category: 'financial'
      },
      {
        title: 'Obtain Required Approvals',
        description: 'Get board and regulatory approvals as needed',
        required: true,
        owner: 'both',
        priority: 'high',
        category: 'compliance'
      },
      {
        title: 'Prepare Closing Documents',
        description: 'Draft all required closing documentation',
        required: true,
        owner: 'both',
        priority: 'high',
        category: 'legal'
      },
      {
        title: 'Title and Asset Transfer',
        description: 'Prepare asset and title transfer documents',
        required: true,
        owner: 'seller',
        priority: 'high',
        category: 'legal'
      },
      {
        title: 'Closing Date Coordination',
        description: 'Coordinate closing logistics and timeline',
        required: true,
        owner: 'both',
        priority: 'medium',
        category: 'business'
      },
      {
        title: 'Final Walk-through',
        description: 'Conduct final review before closing',
        required: true,
        owner: 'buyer',
        priority: 'medium',
        category: 'operational'
      },
      {
        title: 'Execute Closing',
        description: 'Complete the transaction and transfer ownership',
        required: true,
        owner: 'both',
        priority: 'high',
        category: 'business'
      },
      {
        title: 'Post-Closing Integration',
        description: 'Begin integration and transition planning',
        required: false,
        owner: 'buyer',
        priority: 'low',
        category: 'operational'
      }
    ],
    requiredDocuments: [
      {
        name: 'Purchase Agreement',
        description: 'Comprehensive asset or stock purchase agreement',
        category: 'legal',
        required: true,
        owner: 'both'
      },
      {
        name: 'Disclosure Schedules',
        description: 'Detailed disclosure schedules to purchase agreement',
        category: 'legal',
        required: true,
        owner: 'seller'
      },
      {
        name: 'Financing Documents',
        description: 'Loan agreements and financing documentation',
        category: 'financial',
        required: false,
        owner: 'buyer'
      },
      {
        name: 'Bill of Sale',
        description: 'Asset transfer documentation',
        category: 'legal',
        required: true,
        owner: 'seller'
      },
      {
        name: 'Transition Services Agreement',
        description: 'Post-closing transition and integration plan',
        category: 'operational',
        required: false,
        owner: 'both'
      }
    ],
    milestones: [
      {
        name: 'Purchase Agreement Signed',
        description: 'Definitive purchase agreement executed',
        daysFromStart: 30
      },
      {
        name: 'Financing Secured',
        description: 'All financing arrangements finalized',
        daysFromStart: 45
      },
      {
        name: 'Closing Conditions Met',
        description: 'All closing conditions satisfied',
        daysFromStart: 55
      },
      {
        name: 'Transaction Closed',
        description: 'Deal successfully completed',
        daysFromStart: 60
      }
    ]
  }
};
