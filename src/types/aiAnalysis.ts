export interface AIDocumentAnalysis {
  id: string;
  documentId: string;
  documentName: string;
  analysisDate: Date;
  analysisStatus: 'processing' | 'completed' | 'failed' | 'queued';
  
  // Core analysis results
  summary: FinancialSummary;
  highlights: FinancialHighlight[];
  risks: RiskFlag[];
  recommendations: Recommendation[];
  
  // Analysis metadata
  confidence: number; // 0-100
  processingTime: number; // seconds
  modelVersion: string;
  analysisType: DocumentType;
  
  // User interaction
  reviewedBy?: string;
  reviewedAt?: Date;
  userNotes?: string;
  approved: boolean;
}

export interface FinancialSummary {
  overview: string;
  keyMetrics: KeyMetric[];
  trends: TrendAnalysis[];
  comparisons: ComparisonData[];
  conclusion: string;
}

export interface FinancialHighlight {
  id: string;
  category: HighlightCategory;
  title: string;
  description: string;
  value?: string | number;
  trend?: 'positive' | 'negative' | 'neutral';
  importance: 'low' | 'medium' | 'high' | 'critical';
  supportingData?: string[];
}

export type HighlightCategory = 
  | 'revenue'
  | 'profitability'
  | 'cash-flow'
  | 'growth'
  | 'margins'
  | 'efficiency'
  | 'debt'
  | 'assets'
  | 'working-capital'
  | 'valuation';

export interface RiskFlag {
  id: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  category: RiskCategory;
  title: string;
  description: string;
  impact: string;
  likelihood: 'low' | 'medium' | 'high';
  mitigation?: string[];
  relatedData?: string[];
  requiresAttention: boolean;
}

export type RiskCategory = 
  | 'financial'
  | 'operational'
  | 'market'
  | 'regulatory'
  | 'technology'
  | 'customer'
  | 'supplier'
  | 'legal'
  | 'environmental';

export interface Recommendation {
  id: string;
  type: 'action' | 'investigation' | 'negotiation' | 'due-diligence';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  title: string;
  description: string;
  rationale: string;
  expectedOutcome?: string;
  timeline?: string;
  assignedTo?: 'buyer' | 'seller' | 'both';
}

export interface KeyMetric {
  name: string;
  value: string | number;
  unit?: string;
  period: string;
  change?: {
    value: number;
    period: string;
    direction: 'up' | 'down' | 'stable';
  };
  benchmark?: {
    value: string | number;
    source: string;
    comparison: 'above' | 'below' | 'inline';
  };
}

export interface TrendAnalysis {
  metric: string;
  period: string;
  direction: 'improving' | 'declining' | 'stable' | 'volatile';
  magnitude: number; // percentage change
  significance: 'low' | 'medium' | 'high';
  explanation: string;
}

export interface ComparisonData {
  metric: string;
  companyValue: string | number;
  industryAverage?: string | number;
  percentile?: number;
  comparison: 'outperforming' | 'underperforming' | 'average';
  context: string;
}

export type DocumentType = 
  | 'income-statement'
  | 'balance-sheet'
  | 'cash-flow-statement'
  | 'financial-statements'
  | 'tax-returns'
  | 'budget-forecast'
  | 'audit-report'
  | 'management-accounts'
  | 'other-financial';

export interface AIAnalysisRequest {
  documentId: string;
  documentType: DocumentType;
  analysisDepth: 'basic' | 'standard' | 'comprehensive';
  focusAreas?: HighlightCategory[];
  customPrompts?: string[];
}

export interface AIAnalysisProgress {
  stage: 'upload' | 'parsing' | 'analysis' | 'validation' | 'complete';
  progress: number; // 0-100
  message: string;
  estimatedTimeRemaining?: number; // seconds
}

export interface AIInsights {
  documentAnalyses: AIDocumentAnalysis[];
  aggregatedInsights: AggregatedInsights;
  recommendations: StrategicRecommendation[];
}

export interface AggregatedInsights {
  overallScore: number; // 0-100
  strengthAreas: string[];
  concernAreas: string[];
  keyTakeaways: string[];
  dealImpact: 'positive' | 'negative' | 'neutral';
  confidenceLevel: number; // 0-100
}

export interface StrategicRecommendation {
  id: string;
  category: 'valuation' | 'structure' | 'timing' | 'terms' | 'diligence';
  recommendation: string;
  reasoning: string;
  impact: 'low' | 'medium' | 'high';
  confidence: number; // 0-100
  supportingAnalyses: string[]; // document analysis IDs
}
