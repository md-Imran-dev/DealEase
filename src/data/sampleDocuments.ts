// Sample documents for demo purposes
export interface SampleDocument {
    id: string;
    name: string;
    type: string;
    size: string;
    uploadedAt: Date;
    uploadedBy: string;
    stage: string;
    dealId: string;
    url?: string; // For demo, we'll use placeholder URLs
    description?: string;
    category: 'financial' | 'legal' | 'operational' | 'technical' | 'other';
}

export const sampleDocuments: SampleDocument[] = [
    // Deal 1 Documents (TechFlow Solutions)
    {
        id: 'doc-1',
        name: 'Financial_Statements_2021-2023.pdf',
        type: 'application/pdf',
        size: '2.4 MB',
        uploadedAt: new Date('2024-01-18'),
        uploadedBy: 'seller-1',
        stage: 'data-room',
        dealId: 'deal-1',
        description: 'Audited financial statements for the past 3 years',
        category: 'financial',
        url: '/demo/documents/financial-statements.pdf'
    },
    {
        id: 'doc-2',
        name: 'Customer_Analysis_Q4_2023.xlsx',
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        size: '845 KB',
        uploadedAt: new Date('2024-01-20'),
        uploadedBy: 'seller-1',
        stage: 'due-diligence',
        dealId: 'deal-1',
        description: 'Detailed customer analysis including retention metrics',
        category: 'operational',
        url: '/demo/documents/customer-analysis.xlsx'
    },
    {
        id: 'doc-3',
        name: 'Software_Architecture_Overview.pdf',
        type: 'application/pdf',
        size: '1.8 MB',
        uploadedAt: new Date('2024-01-25'),
        uploadedBy: 'seller-1',
        stage: 'due-diligence',
        dealId: 'deal-1',
        description: 'Technical architecture and infrastructure documentation',
        category: 'technical',
        url: '/demo/documents/tech-architecture.pdf'
    },
    {
        id: 'doc-4',
        name: 'Employee_Handbook_2024.pdf',
        type: 'application/pdf',
        size: '567 KB',
        uploadedAt: new Date('2024-01-22'),
        uploadedBy: 'seller-1',
        stage: 'due-diligence',
        dealId: 'deal-1',
        description: 'Current employee handbook and HR policies',
        category: 'operational',
        url: '/demo/documents/employee-handbook.pdf'
    },
    {
        id: 'doc-5',
        name: 'IP_Portfolio_Summary.pdf',
        type: 'application/pdf',
        size: '923 KB',
        uploadedAt: new Date('2024-02-01'),
        uploadedBy: 'seller-1',
        stage: 'due-diligence',
        dealId: 'deal-1',
        description: 'Intellectual property portfolio including patents and trademarks',
        category: 'legal',
        url: '/demo/documents/ip-portfolio.pdf'
    },
    {
        id: 'doc-6',
        name: 'Insurance_Policies_2024.pdf',
        type: 'application/pdf',
        size: '1.2 MB',
        uploadedAt: new Date('2024-02-03'),
        uploadedBy: 'seller-1',
        stage: 'due-diligence',
        dealId: 'deal-1',
        description: 'Current insurance policies and coverage details',
        category: 'legal',
        url: '/demo/documents/insurance-policies.pdf'
    },
    {
        id: 'doc-7',
        name: 'Buyer_Financial_Capability.pdf',
        type: 'application/pdf',
        size: '1.5 MB',
        uploadedAt: new Date('2024-02-10'),
        uploadedBy: '1',
        stage: 'due-diligence',
        dealId: 'deal-1',
        description: 'Proof of funds and financing documentation',
        category: 'financial',
        url: '/demo/documents/buyer-financials.pdf'
    },

    // Deal 2 Documents (DoeFlow Solutions)
    {
        id: 'doc-8',
        name: 'Business_Valuation_Report.pdf',
        type: 'application/pdf',
        size: '3.1 MB',
        uploadedAt: new Date('2024-01-15'),
        uploadedBy: '1',
        stage: 'data-room',
        dealId: 'deal-2',
        description: 'Third-party business valuation report',
        category: 'financial',
        url: '/demo/documents/valuation-report.pdf'
    },
    {
        id: 'doc-9',
        name: 'Client_Contracts_Summary.pdf',
        type: 'application/pdf',
        size: '2.8 MB',
        uploadedAt: new Date('2024-01-18'),
        uploadedBy: '1',
        stage: 'data-room',
        dealId: 'deal-2',
        description: 'Summary of all active client contracts',
        category: 'legal',
        url: '/demo/documents/client-contracts.pdf'
    },
    {
        id: 'doc-10',
        name: 'Tax_Returns_2021-2023.pdf',
        type: 'application/pdf',
        size: '1.9 MB',
        uploadedAt: new Date('2024-02-01'),
        uploadedBy: '1',
        stage: 'due-diligence',
        dealId: 'deal-2',
        description: 'Business tax returns for the past 3 years',
        category: 'financial',
        url: '/demo/documents/tax-returns.pdf'
    },
    {
        id: 'doc-11',
        name: 'LOI_Draft_v2.docx',
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        size: '124 KB',
        uploadedAt: new Date('2024-03-05'),
        uploadedBy: 'buyer-3',
        stage: 'loi',
        dealId: 'deal-2',
        description: 'Second draft of Letter of Intent',
        category: 'legal',
        url: '/demo/documents/loi-draft.docx'
    },

    // Deal 3 Documents (TechFlow - Rodriguez Capital)
    {
        id: 'doc-12',
        name: 'NDA_Executed.pdf',
        type: 'application/pdf',
        size: '245 KB',
        uploadedAt: new Date('2024-01-16'),
        uploadedBy: 'seller-1',
        stage: 'nda',
        dealId: 'deal-3',
        description: 'Fully executed Non-Disclosure Agreement',
        category: 'legal',
        url: '/demo/documents/nda-executed.pdf'
    },
    {
        id: 'doc-13',
        name: 'Management_Presentation.pptx',
        type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        size: '8.7 MB',
        uploadedAt: new Date('2024-01-20'),
        uploadedBy: 'seller-1',
        stage: 'data-room',
        dealId: 'deal-3',
        description: 'Executive management presentation for potential buyers',
        category: 'operational',
        url: '/demo/documents/management-presentation.pptx'
    },
    {
        id: 'doc-14',
        name: 'SaaS_Metrics_Dashboard.pdf',
        type: 'application/pdf',
        size: '1.6 MB',
        uploadedAt: new Date('2024-01-25'),
        uploadedBy: 'seller-1',
        stage: 'data-room',
        dealId: 'deal-3',
        description: 'Key SaaS metrics including MRR, churn, and growth rates',
        category: 'operational',
        url: '/demo/documents/saas-metrics.pdf'
    },
];

// Sample AI analysis results for documents
import type { AIDocumentAnalysis } from "../types/aiAnalysis";
import { generateMockAIAnalysis } from "./mockAIAnalysis";

export const sampleAIAnalysis: AIDocumentAnalysis[] = [
    generateMockAIAnalysis('Financial_Statements_2021-2023.pdf', 'financial-statements'),
    generateMockAIAnalysis('Customer_Analysis_Q4_2023.xlsx', 'operational-analysis'),
    generateMockAIAnalysis('IP_Portfolio_Summary.pdf', 'legal-analysis'),
];
