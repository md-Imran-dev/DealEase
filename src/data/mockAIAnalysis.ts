import type { AIDocumentAnalysis, FinancialHighlight, RiskFlag, Recommendation } from "../types/aiAnalysis";

export const generateMockAIAnalysis = (documentName: string, documentType: string): AIDocumentAnalysis => {
  const analysisId = `analysis-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  // Generate different analysis based on document type
  const isCashFlow = documentName.toLowerCase().includes('cash') || documentType === 'cash-flow-statement';
  const isIncomeStatement = documentName.toLowerCase().includes('income') || documentType === 'income-statement';
  const isBalanceSheet = documentName.toLowerCase().includes('balance') || documentType === 'balance-sheet';

  return {
    id: analysisId,
    documentId: `doc-${Date.now()}`,
    documentName,
    analysisDate: new Date(),
    analysisStatus: 'completed',

    summary: {
      overview: generateOverview(documentName, documentType),
      keyMetrics: generateKeyMetrics(documentType),
      trends: generateTrendAnalysis(documentType),
      comparisons: generateComparisons(documentType),
      conclusion: generateConclusion(documentType),
    },

    highlights: generateHighlights(documentType),
    risks: generateRisks(documentType),
    recommendations: generateRecommendations(documentType),

    confidence: Math.floor(Math.random() * 15) + 85, // 85-100%
    processingTime: Math.floor(Math.random() * 30) + 15, // 15-45 seconds
    modelVersion: "FinanceAI v2.1",
    analysisType: documentType as any,

    approved: false,
  };
};

const generateOverview = (documentName: string, documentType: string): string => {
  const templates = {
    'income-statement': "This income statement analysis reveals a company with solid operational performance and consistent revenue growth. The financial data indicates strong market positioning with improving profitability metrics over the analyzed period.",
    'balance-sheet': "The balance sheet analysis demonstrates a financially stable organization with a healthy asset base and manageable debt levels. The company maintains strong liquidity positions and efficient capital structure management.",
    'cash-flow-statement': "Cash flow analysis shows strong operational cash generation with positive trends in working capital management. The company demonstrates good cash conversion efficiency and maintains adequate liquidity buffers.",
    'financial-statements': "Comprehensive financial analysis indicates a well-managed business with consistent performance across key financial metrics. The company shows balanced growth with attention to profitability and cash management.",
    'default': "Financial document analysis reveals key insights into the company's operational performance, financial health, and strategic positioning within its market segment."
  };

  return templates[documentType as keyof typeof templates] || templates.default;
};

const generateKeyMetrics = (documentType: string) => {
  const baseMetrics = [
    {
      name: "Revenue Growth",
      value: `${Math.floor(Math.random() * 20) + 10}%`,
      unit: "%",
      period: "YoY",
      change: {
        value: Math.floor(Math.random() * 5) + 2,
        period: "vs. previous year",
        direction: 'up' as const
      }
    },
    {
      name: "EBITDA Margin",
      value: `${Math.floor(Math.random() * 15) + 15}%`,
      unit: "%",
      period: "Current Year",
      benchmark: {
        value: "18%",
        source: "Industry Average",
        comparison: Math.random() > 0.5 ? 'above' as const : 'below' as const
      }
    },
    {
      name: "Current Ratio",
      value: (Math.random() * 1.5 + 1.2).toFixed(2),
      period: "Current",
      benchmark: {
        value: "1.5",
        source: "Industry Standard",
        comparison: 'above' as const
      }
    }
  ];

  if (documentType === 'cash-flow-statement') {
    baseMetrics.push({
      name: "Operating Cash Flow",
      value: `$${(Math.random() * 500 + 200).toFixed(0)}K`,
      unit: "$",
      period: "TTM",
      change: {
        value: Math.floor(Math.random() * 25) + 5,
        period: "YoY",
        direction: 'up' as const
      }
    });
  }

  return baseMetrics;
};

const generateTrendAnalysis = (documentType: string) => {
  const trends = [
    {
      metric: "Revenue",
      period: "3-year trend",
      direction: 'improving' as const,
      magnitude: Math.floor(Math.random() * 15) + 10,
      significance: 'high' as const,
      explanation: "Consistent revenue growth driven by market expansion and new customer acquisition."
    },
    {
      metric: "Profitability",
      period: "2-year trend",
      direction: Math.random() > 0.3 ? 'improving' as const : 'stable' as const,
      magnitude: Math.floor(Math.random() * 8) + 3,
      significance: 'medium' as const,
      explanation: "Profit margins have shown steady improvement through operational efficiency gains."
    }
  ];

  if (documentType === 'balance-sheet') {
    trends.push({
      metric: "Debt-to-Equity Ratio",
      period: "2-year trend",
      direction: 'improving' as const,
      magnitude: Math.floor(Math.random() * 10) + 5,
      significance: 'medium' as const,
      explanation: "Decreasing leverage ratio indicates improving capital structure management."
    });
  }

  return trends;
};

const generateComparisons = (documentType: string) => [
  {
    metric: "Revenue per Employee",
    companyValue: `$${Math.floor(Math.random() * 50 + 150)}K`,
    industryAverage: `$${Math.floor(Math.random() * 30 + 120)}K`,
    percentile: Math.floor(Math.random() * 30) + 60,
    comparison: 'outperforming' as const,
    context: "Company demonstrates higher productivity compared to industry peers."
  },
  {
    metric: "Gross Margin",
    companyValue: `${Math.floor(Math.random() * 15) + 35}%`,
    industryAverage: `${Math.floor(Math.random() * 10) + 30}%`,
    percentile: Math.floor(Math.random() * 25) + 65,
    comparison: 'outperforming' as const,
    context: "Strong pricing power and cost management relative to competitors."
  }
];

const generateConclusion = (documentType: string): string => {
  const conclusions = [
    "Overall, the financial analysis indicates a healthy, well-managed business with strong fundamentals and positive growth trajectory suitable for acquisition consideration.",
    "The company demonstrates solid financial performance with manageable risks and clear opportunities for value creation under new ownership.",
    "Financial metrics suggest a stable business with good operational efficiency and strategic positioning for continued growth and profitability."
  ];

  return conclusions[Math.floor(Math.random() * conclusions.length)];
};

const generateHighlights = (documentType: string): FinancialHighlight[] => {
  const highlights: FinancialHighlight[] = [
    {
      id: "highlight-1",
      category: "revenue",
      title: "Strong Revenue Growth",
      description: "Company has achieved consistent double-digit revenue growth over the past three years, indicating strong market demand and effective sales execution.",
      value: `${Math.floor(Math.random() * 20) + 15}% CAGR`,
      trend: "positive",
      importance: "high",
      supportingData: ["3-year revenue trend", "Market share analysis", "Customer acquisition metrics"]
    },
    {
      id: "highlight-2",
      category: "profitability",
      title: "Improving Profit Margins",
      description: "EBITDA margins have expanded consistently, demonstrating operational leverage and pricing power in the company's core markets.",
      value: `${Math.floor(Math.random() * 10) + 20}% EBITDA margin`,
      trend: "positive",
      importance: "high",
      supportingData: ["Margin analysis", "Cost structure review", "Operational efficiency metrics"]
    },
    {
      id: "highlight-3",
      category: "cash-flow",
      title: "Strong Cash Generation",
      description: "Operating cash flow conversion is excellent, with the company generating substantial cash relative to earnings.",
      value: `${Math.floor(Math.random() * 20) + 90}% cash conversion`,
      trend: "positive",
      importance: "medium",
      supportingData: ["Cash flow statement analysis", "Working capital trends"]
    }
  ];

  if (documentType === 'balance-sheet') {
    highlights.push({
      id: "highlight-4",
      category: "debt",
      title: "Conservative Debt Levels",
      description: "The company maintains a conservative capital structure with manageable debt levels and strong interest coverage.",
      value: `${(Math.random() * 2 + 1).toFixed(1)}x Net Debt/EBITDA`,
      trend: "positive",
      importance: "medium",
      supportingData: ["Debt analysis", "Interest coverage ratios", "Covenant compliance"]
    });
  }

  return highlights;
};

const generateRisks = (documentType: string): RiskFlag[] => {
  const risks: RiskFlag[] = [
    {
      id: "risk-1",
      severity: "medium",
      category: "financial",
      title: "Customer Concentration Risk",
      description: "The top 3 customers represent a significant portion of total revenue, creating potential vulnerability if key relationships are lost.",
      impact: "Revenue could decline by 25-40% if major customers are lost",
      likelihood: "medium",
      mitigation: [
        "Diversify customer base through new market penetration",
        "Strengthen customer relationships with long-term contracts",
        "Develop new products to increase customer stickiness"
      ],
      requiresAttention: true
    },
    {
      id: "risk-2",
      severity: "low",
      category: "operational",
      title: "Working Capital Management",
      description: "Accounts receivable days have increased slightly, suggesting potential collection issues or extended payment terms.",
      impact: "Cash flow timing and working capital requirements may be affected",
      likelihood: "low",
      mitigation: [
        "Review credit policies and collection procedures",
        "Implement more stringent payment terms for new customers",
        "Consider factoring arrangements if needed"
      ],
      requiresAttention: false
    }
  ];

  if (Math.random() > 0.5) {
    risks.push({
      id: "risk-3",
      severity: "high",
      category: "market",
      title: "Market Competition Intensity",
      description: "Increasing competitive pressure in core markets may impact pricing power and market share over time.",
      impact: "Potential margin compression and slower growth if competition intensifies",
      likelihood: "medium",
      mitigation: [
        "Invest in product differentiation and innovation",
        "Focus on customer service excellence",
        "Consider strategic partnerships or acquisitions"
      ],
      requiresAttention: true
    });
  }

  return risks;
};

const generateRecommendations = (documentType: string): Recommendation[] => [
  {
    id: "rec-1",
    type: "due-diligence",
    priority: "high",
    title: "Customer Concentration Analysis",
    description: "Conduct detailed analysis of customer relationships, contract terms, and retention rates for top revenue contributors.",
    rationale: "High customer concentration presents both risk and opportunity that requires thorough evaluation.",
    expectedOutcome: "Clear understanding of customer stability and potential mitigation strategies",
    timeline: "2-3 weeks during due diligence phase",
    assignedTo: "buyer"
  },
  {
    id: "rec-2",
    type: "investigation",
    priority: "medium",
    title: "Market Position Assessment",
    description: "Evaluate competitive positioning, market share trends, and barriers to entry in core business segments.",
    rationale: "Understanding market dynamics is crucial for assessing long-term value creation potential.",
    expectedOutcome: "Comprehensive market analysis and competitive intelligence",
    timeline: "3-4 weeks",
    assignedTo: "buyer"
  },
  {
    id: "rec-3",
    type: "negotiation",
    priority: "medium",
    title: "Working Capital Adjustment",
    description: "Consider working capital adjustments in deal structure to account for seasonal variations and growth requirements.",
    rationale: "Proper working capital treatment ensures fair value allocation and cash flow predictability.",
    expectedOutcome: "Agreed working capital mechanism in purchase agreement",
    timeline: "During LOI and purchase agreement negotiations",
    assignedTo: "both"
  }
];

export const mockAIAnalysisTemplates = {
  'TechFlow Financial Statements 2023.pdf': () => generateMockAIAnalysis('TechFlow Financial Statements 2023.pdf', 'financial-statements'),
  'Wellness Partners Income Statement.pdf': () => generateMockAIAnalysis('Wellness Partners Income Statement.pdf', 'income-statement'),
  'Q4 2023 Cash Flow Analysis.pdf': () => generateMockAIAnalysis('Q4 2023 Cash Flow Analysis.pdf', 'cash-flow-statement'),
  'Balance Sheet - Year End 2023.pdf': () => generateMockAIAnalysis('Balance Sheet - Year End 2023.pdf', 'balance-sheet'),
  'Management Accounts - 2023.pdf': () => generateMockAIAnalysis('Management Accounts - 2023.pdf', 'management-accounts'),
};
