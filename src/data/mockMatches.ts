import type { Match, Message, Notification } from "../types/match";

export const mockMatches: Match[] = [
  {
    id: "match-1",
    buyerId: "buyer-1",
    sellerId: "seller-1",
    status: "active",
    createdAt: new Date('2024-01-14'),
    lastActivity: new Date('2024-01-16'),

    buyer: {
      id: "buyer-1",
      firstName: "Sarah",
      lastName: "Chen",
      company: "Chen Ventures",
      title: "Managing Partner",
      avatar: "SC",
      profilePicture: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=400&h=400&fit=crop&crop=face",
    },

    seller: {
      id: "seller-1",
      firstName: "Mark",
      lastName: "Thompson",
      company: "TechFlow Solutions",
      title: "Founder & CEO",
      avatar: "MT",
      profilePicture: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    },

    business: {
      id: "business-1",
      name: "TechFlow Solutions",
      industry: "Technology",
      location: "San Francisco, CA",
      revenue: "$2.5M",
      valuation: "$3.2M",
    },

    unreadCount: {
      buyer: 0,
      seller: 2,
    },

    lastMessage: {
      id: "msg-15",
      content: "I'd love to schedule a call this week to discuss the due diligence process. Are you available Thursday afternoon?",
      timestamp: new Date('2024-01-16T14:30:00'),
      senderId: "buyer-1",
      type: "text",
    },

    dealStage: "interest-confirmed",
    nextSteps: [
      "Schedule initial call",
      "Share financial statements",
      "Discuss timeline and process"
    ],

    matchScore: 92,
    matchReasons: [
      "Industry expertise match",
      "Investment range alignment",
      "Geographic preference match",
      "Experience level compatibility"
    ],
    mutualInterests: ["SaaS", "B2B Technology", "Growth Stage"]
  },

  {
    id: "match-2",
    buyerId: "buyer-2",
    sellerId: "seller-1",
    status: "active",
    createdAt: new Date('2024-01-12'),
    lastActivity: new Date('2024-01-15'),

    buyer: {
      id: "buyer-2",
      firstName: "Michael",
      lastName: "Rodriguez",
      company: "Rodriguez Capital Group",
      title: "Founder & CEO",
      avatar: "MR",
      profilePicture: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    },

    seller: {
      id: "seller-1",
      firstName: "Mark",
      lastName: "Thompson",
      company: "TechFlow Solutions",
      title: "Founder & CEO",
      avatar: "MT",
      profilePicture: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    },

    business: {
      id: "business-1",
      name: "TechFlow Solutions",
      industry: "Technology",
      location: "San Francisco, CA",
      revenue: "$2.5M",
      valuation: "$3.2M",
    },

    unreadCount: {
      buyer: 1,
      seller: 0,
    },

    lastMessage: {
      id: "msg-8",
      content: "Thank you for the detailed financial information. Our team will review and get back to you with questions by Friday.",
      timestamp: new Date('2024-01-15T16:45:00'),
      senderId: "seller-1",
      type: "text",
    },

    dealStage: "due-diligence",
    nextSteps: [
      "Review financial documents",
      "Prepare Q&A responses",
      "Schedule management presentation"
    ],

    matchScore: 78,
    matchReasons: [
      "Strong financial metrics",
      "Proven track record",
      "Geographic alignment"
    ],
    mutualInterests: ["Profitable businesses", "Tech sector"]
  },

  {
    id: "match-3",
    buyerId: "buyer-3",
    sellerId: "seller-2",
    status: "active",
    createdAt: new Date('2024-01-10'),
    lastActivity: new Date('2024-01-16'),

    buyer: {
      id: "buyer-3",
      firstName: "Emily",
      lastName: "Thompson",
      company: "Thompson Health Investments",
      title: "Principal",
      avatar: "ET",
      profilePicture: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    },

    seller: {
      id: "seller-2",
      firstName: "Dr. Lisa",
      lastName: "Park",
      company: "Wellness Partners Clinic",
      title: "Medical Director",
      avatar: "LP",
      profilePicture: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face",
    },

    business: {
      id: "business-2",
      name: "Wellness Partners Clinic",
      industry: "Healthcare",
      location: "Portland, OR",
      revenue: "$1.2M",
      valuation: "$900K",
    },

    unreadCount: {
      buyer: 3,
      seller: 0,
    },

    lastMessage: {
      id: "msg-22",
      content: "The practice has such a strong reputation in the community. I'd love to discuss how we can maintain that while growing the patient base.",
      timestamp: new Date('2024-01-16T11:20:00'),
      senderId: "buyer-3",
      type: "text",
    },

    dealStage: "negotiation",
    nextSteps: [
      "Finalize purchase price",
      "Agree on transition timeline",
      "Draft letter of intent"
    ],

    matchScore: 95,
    matchReasons: [
      "Healthcare expertise",
      "Mission alignment",
      "Local market knowledge",
      "Practice management experience"
    ],
    mutualInterests: ["Healthcare", "Community impact", "Patient care"]
  },

  {
    id: "match-4",
    buyerId: "buyer-4",
    sellerId: "seller-6",
    status: "active",
    createdAt: new Date('2024-01-08'),
    lastActivity: new Date('2024-01-16'),

    buyer: {
      id: "buyer-4",
      firstName: "David",
      lastName: "Park",
      company: "Park Consumer Partners",
      title: "Managing Director",
      avatar: "DP",
      profilePicture: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    },

    seller: {
      id: "seller-6",
      firstName: "Amanda",
      lastName: "Chen",
      company: "Foodie Heaven Restaurant Group",
      title: "Owner & Executive Chef",
      avatar: "AC",
      profilePicture: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    },

    business: {
      id: "business-6",
      name: "Foodie Heaven Restaurant Group",
      industry: "Food & Beverage",
      location: "Seattle, WA",
      revenue: "$3.1M",
      valuation: "$2.2M",
    },

    unreadCount: {
      buyer: 0,
      seller: 1,
    },

    lastMessage: {
      id: "msg-35",
      content: "I've reviewed the location performance data. The waterfront location's numbers are particularly impressive. Can we schedule a visit next week?",
      timestamp: new Date('2024-01-16T09:45:00'),
      senderId: "buyer-4",
      type: "text",
    },

    dealStage: "due-diligence",
    nextSteps: [
      "Schedule restaurant visits",
      "Review lease agreements",
      "Analyze customer demographics"
    ],

    matchScore: 88,
    matchReasons: [
      "Food & beverage expertise",
      "Multi-location experience",
      "Consumer business focus",
      "Investment range alignment"
    ],
    mutualInterests: ["Food & Beverage", "Multi-unit operations", "Consumer brands"]
  },

  {
    id: "match-5",
    buyerId: "buyer-2",
    sellerId: "seller-5",
    status: "active",
    createdAt: new Date('2024-01-05'),
    lastActivity: new Date('2024-01-15'),

    buyer: {
      id: "buyer-2",
      firstName: "Michael",
      lastName: "Rodriguez",
      company: "Rodriguez Capital Group",
      title: "Founder & CEO",
      avatar: "MR",
      profilePicture: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    },

    seller: {
      id: "seller-5",
      firstName: "Michael",
      lastName: "Brown",
      company: "Brown Manufacturing",
      title: "CEO & Owner",
      avatar: "MB",
      profilePicture: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face",
    },

    business: {
      id: "business-5",
      name: "Brown Manufacturing",
      industry: "Manufacturing",
      location: "Toledo, OH",
      revenue: "$4.2M",
      valuation: "$3.8M",
    },

    unreadCount: {
      buyer: 2,
      seller: 0,
    },

    lastMessage: {
      id: "msg-42",
      content: "The facility tour was excellent. Your operation is impressive - exactly the type of business I look for. Let's discuss next steps.",
      timestamp: new Date('2024-01-15T14:20:00'),
      senderId: "seller-5",
      type: "text",
    },

    dealStage: "negotiation",
    nextSteps: [
      "Prepare initial offer",
      "Financial analysis review",
      "Management transition discussion"
    ],

    matchScore: 94,
    matchReasons: [
      "Manufacturing expertise perfect match",
      "Investment size alignment",
      "Geographic preference",
      "Operational improvement potential"
    ],
    mutualInterests: ["Manufacturing", "Operational excellence", "Long-term growth"]
  },

  {
    id: "match-6",
    buyerId: "buyer-6",
    sellerId: "seller-4",
    status: "active",
    createdAt: new Date('2024-01-11'),
    lastActivity: new Date('2024-01-16'),

    buyer: {
      id: "buyer-6",
      firstName: "Robert",
      lastName: "Kim",
      company: "Kim Digital Ventures",
      title: "Founder",
      avatar: "RK",
      profilePicture: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face",
    },

    seller: {
      id: "seller-4",
      firstName: "Jennifer",
      lastName: "Walsh",
      company: "Creative Digital Agency",
      title: "Founder & Creative Director",
      avatar: "JW",
      profilePicture: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=400&h=400&fit=crop&crop=face",
    },

    business: {
      id: "business-4",
      name: "Creative Digital Agency",
      industry: "Digital Marketing",
      location: "Denver, CO",
      revenue: "$950K",
      valuation: "$750K",
    },

    unreadCount: {
      buyer: 1,
      seller: 0,
    },

    lastMessage: {
      id: "msg-48",
      content: "Your client retention rate is outstanding. I'd love to understand your process for onboarding new accounts and maintaining long-term relationships.",
      timestamp: new Date('2024-01-16T16:30:00'),
      senderId: "buyer-6",
      type: "text",
    },

    dealStage: "initial-contact",
    nextSteps: [
      "Share client case studies",
      "Discuss process documentation",
      "Review team capabilities"
    ],

    matchScore: 91,
    matchReasons: [
      "Digital marketing expertise",
      "SaaS/agency operational knowledge",
      "Perfect size for buyer's portfolio",
      "Growth automation potential"
    ],
    mutualInterests: ["Digital marketing", "Creative services", "Client relationships"]
  }
];

export const mockMessages: Message[] = [
  // Match 1 messages (Sarah Chen & Mark Thompson)
  {
    id: "msg-1",
    matchId: "match-1",
    senderId: "system",
    receiverId: "",
    content: "You've been matched! Start the conversation below.",
    timestamp: new Date('2024-01-14T10:00:00'),
    type: "system",
    systemData: {
      type: "match-created",
      data: {}
    }
  },
  {
    id: "msg-2",
    matchId: "match-1",
    senderId: "buyer-1",
    receiverId: "seller-1",
    content: "Hi Mark! I'm really excited about TechFlow Solutions. Your SaaS platform aligns perfectly with my investment thesis. I'd love to learn more about your growth trajectory and discuss how I might be able to help scale the business.",
    timestamp: new Date('2024-01-14T14:30:00'),
    type: "text",
    readAt: new Date('2024-01-14T15:45:00'),
  },
  {
    id: "msg-3",
    matchId: "match-1",
    senderId: "seller-1",
    receiverId: "buyer-1",
    content: "Hi Sarah! Thank you for reaching out. I've reviewed your background and I'm impressed with your track record in SaaS investments. We've been growing 40% year-over-year and are looking for the right partner to help us accelerate that growth.",
    timestamp: new Date('2024-01-14T16:15:00'),
    type: "text",
    readAt: new Date('2024-01-14T16:30:00'),
  },
  {
    id: "msg-4",
    matchId: "match-1",
    senderId: "buyer-1",
    receiverId: "seller-1",
    content: "That's fantastic growth! I'd love to understand more about your customer acquisition strategy and retention metrics. Could you share some high-level numbers?",
    timestamp: new Date('2024-01-15T09:20:00'),
    type: "text",
    readAt: new Date('2024-01-15T10:00:00'),
  },
  {
    id: "msg-5",
    matchId: "match-1",
    senderId: "seller-1",
    receiverId: "buyer-1",
    content: "Absolutely! Our customer acquisition cost has decreased 30% over the last year while our lifetime value has increased 25%. We have a 95% retention rate and net revenue retention of 120%.",
    timestamp: new Date('2024-01-15T11:45:00'),
    type: "text",
    readAt: new Date('2024-01-15T12:00:00'),
  },
  {
    id: "msg-15",
    matchId: "match-1",
    senderId: "buyer-1",
    receiverId: "seller-1",
    content: "I'd love to schedule a call this week to discuss the due diligence process. Are you available Thursday afternoon?",
    timestamp: new Date('2024-01-16T14:30:00'),
    type: "text",
  },

  // Match 2 messages (Michael Rodriguez & Mark Thompson)
  {
    id: "msg-6",
    matchId: "match-2",
    senderId: "system",
    receiverId: "",
    content: "You've been matched! Start the conversation below.",
    timestamp: new Date('2024-01-12T09:00:00'),
    type: "system",
    systemData: {
      type: "match-created",
      data: {}
    }
  },
  {
    id: "msg-7",
    matchId: "match-2",
    senderId: "buyer-2",
    receiverId: "seller-1",
    content: "Hello Mark, I'm interested in learning more about TechFlow Solutions. I have experience with tech acquisitions and focus on profitable, growing companies. Would you be open to sharing some financial information?",
    timestamp: new Date('2024-01-12T15:20:00'),
    type: "text",
    readAt: new Date('2024-01-12T16:30:00'),
  },
  {
    id: "msg-8",
    matchId: "match-2",
    senderId: "seller-1",
    receiverId: "buyer-2",
    content: "Thank you for the detailed financial information. Our team will review and get back to you with questions by Friday.",
    timestamp: new Date('2024-01-15T16:45:00'),
    type: "text",
  },

  // Match 3 messages (Emily Thompson & Dr. Lisa Park)
  {
    id: "msg-20",
    matchId: "match-3",
    senderId: "system",
    receiverId: "",
    content: "You've been matched! Start the conversation below.",
    timestamp: new Date('2024-01-10T11:00:00'),
    type: "system",
    systemData: {
      type: "match-created",
      data: {}
    }
  },
  {
    id: "msg-21",
    matchId: "match-3",
    senderId: "buyer-3",
    receiverId: "seller-2",
    content: "Dr. Park, I'm Emily from Thompson Health Investments. I'm really excited about the possibility of working with Wellness Partners Clinic. Your focus on community health aligns perfectly with my investment philosophy.",
    timestamp: new Date('2024-01-10T14:15:00'),
    type: "text",
    readAt: new Date('2024-01-10T15:00:00'),
  },
  {
    id: "msg-22",
    matchId: "match-3",
    senderId: "buyer-3",
    receiverId: "seller-2",
    content: "The practice has such a strong reputation in the community. I'd love to discuss how we can maintain that while growing the patient base.",
    timestamp: new Date('2024-01-16T11:20:00'),
    type: "text",
  },

  // Match 4 messages (David Park & Amanda Chen)
  {
    id: "msg-30",
    matchId: "match-4",
    senderId: "system",
    receiverId: "",
    content: "You've been matched! Start the conversation below.",
    timestamp: new Date('2024-01-08T10:00:00'),
    type: "system",
    systemData: {
      type: "match-created",
      data: {}
    }
  },
  {
    id: "msg-31",
    matchId: "match-4",
    senderId: "buyer-4",
    receiverId: "seller-6",
    content: "Hi Amanda! I'm really impressed with Foodie Heaven's growth story. Having 3 successful locations in the competitive Seattle market is no small feat. I'd love to learn more about your expansion strategy and operational systems.",
    timestamp: new Date('2024-01-08T15:20:00'),
    type: "text",
    readAt: new Date('2024-01-08T16:30:00'),
  },
  {
    id: "msg-32",
    matchId: "match-4",
    senderId: "seller-6",
    receiverId: "buyer-4",
    content: "Hi David! Thank you for reaching out. I've looked at your background in food & beverage acquisitions and I'm impressed with your operational approach. Each of our locations has unique characteristics but they all follow the same core systems we've developed over the years.",
    timestamp: new Date('2024-01-09T09:45:00'),
    type: "text",
    readAt: new Date('2024-01-09T10:15:00'),
  },
  {
    id: "msg-33",
    matchId: "match-4",
    senderId: "buyer-4",
    receiverId: "seller-6",
    content: "That's exactly what I like to hear - scalable systems. Can you tell me about your average unit economics? I'm particularly interested in labor costs and food cost management across the different locations.",
    timestamp: new Date('2024-01-10T14:30:00'),
    type: "text",
    readAt: new Date('2024-01-10T15:00:00'),
  },
  {
    id: "msg-34",
    matchId: "match-4",
    senderId: "seller-6",
    receiverId: "buyer-4",
    content: "Our food costs run about 28-30% across all locations, and labor is typically 32-35% depending on the location. The waterfront location has our highest margins due to the premium pricing we can command there. I can share detailed P&Ls for each location.",
    timestamp: new Date('2024-01-12T11:15:00'),
    type: "text",
    readAt: new Date('2024-01-12T12:00:00'),
  },
  {
    id: "msg-35",
    matchId: "match-4",
    senderId: "buyer-4",
    receiverId: "seller-6",
    content: "I've reviewed the location performance data. The waterfront location's numbers are particularly impressive. Can we schedule a visit next week?",
    timestamp: new Date('2024-01-16T09:45:00'),
    type: "text",
  },

  // Match 5 messages (Michael Rodriguez & Michael Brown)
  {
    id: "msg-36",
    matchId: "match-5",
    senderId: "system",
    receiverId: "",
    content: "You've been matched! Start the conversation below.",
    timestamp: new Date('2024-01-05T11:00:00'),
    type: "system",
    systemData: {
      type: "match-created",
      data: {}
    }
  },
  {
    id: "msg-37",
    matchId: "match-5",
    senderId: "buyer-2",
    receiverId: "seller-5",
    content: "Hello Michael! Brown Manufacturing caught my attention immediately. 25 years in precision manufacturing with automotive and aerospace clients - this is exactly the type of established, cash-generating business I focus on acquiring.",
    timestamp: new Date('2024-01-05T14:30:00'),
    type: "text",
    readAt: new Date('2024-01-05T16:00:00'),
  },
  {
    id: "msg-38",
    matchId: "match-5",
    senderId: "seller-5",
    receiverId: "buyer-2",
    content: "Michael, great to connect with you! I've reviewed your acquisition history and I'm impressed with how you've grown the businesses you've acquired. Our operation here in Toledo has been my life's work, and I want to make sure it goes to someone who understands manufacturing.",
    timestamp: new Date('2024-01-06T10:15:00'),
    type: "text",
    readAt: new Date('2024-01-06T11:00:00'),
  },
  {
    id: "msg-39",
    matchId: "match-5",
    senderId: "buyer-2",
    receiverId: "seller-5",
    content: "I completely understand that feeling. Manufacturing businesses require deep operational knowledge to run successfully. Can you tell me about your key customer relationships? I see automotive and aerospace - are these long-term contracts?",
    timestamp: new Date('2024-01-08T13:20:00'),
    type: "text",
    readAt: new Date('2024-01-08T14:30:00'),
  },
  {
    id: "msg-40",
    matchId: "match-5",
    senderId: "seller-5",
    receiverId: "buyer-2",
    content: "Yes, our top 5 customers have been with us for 8-15 years each. We have 3-year rolling contracts with most of them. The relationships are built on quality, on-time delivery, and competitive pricing. I'd be happy to arrange introductions during the process.",
    timestamp: new Date('2024-01-10T09:45:00'),
    type: "text",
    readAt: new Date('2024-01-10T10:30:00'),
  },
  {
    id: "msg-41",
    matchId: "match-5",
    senderId: "buyer-2",
    receiverId: "seller-5",
    content: "That level of customer loyalty is impressive and exactly what I look for. Would you be open to scheduling a facility tour? I'd love to see your operation firsthand and meet your management team.",
    timestamp: new Date('2024-01-12T11:00:00'),
    type: "text",
    readAt: new Date('2024-01-12T11:45:00'),
  },
  {
    id: "msg-42",
    matchId: "match-5",
    senderId: "seller-5",
    receiverId: "buyer-2",
    content: "The facility tour was excellent. Your operation is impressive - exactly the type of business I look for. Let's discuss next steps.",
    timestamp: new Date('2024-01-15T14:20:00'),
    type: "text",
  },

  // Match 6 messages (Robert Kim & Jennifer Walsh)
  {
    id: "msg-43",
    matchId: "match-6",
    senderId: "system",
    receiverId: "",
    content: "You've been matched! Start the conversation below.",
    timestamp: new Date('2024-01-11T09:00:00'),
    type: "system",
    systemData: {
      type: "match-created",
      data: {}
    }
  },
  {
    id: "msg-44",
    matchId: "match-6",
    senderId: "buyer-6",
    receiverId: "seller-4",
    content: "Hi Jennifer! Creative Digital Agency is exactly the type of business I've been looking for. I love your focus on mid-market companies and the recurring revenue model. As someone who's built and scaled digital businesses, I see huge potential for automation and growth.",
    timestamp: new Date('2024-01-11T13:15:00'),
    type: "text",
    readAt: new Date('2024-01-11T14:30:00'),
  },
  {
    id: "msg-45",
    matchId: "match-6",
    senderId: "seller-4",
    receiverId: "buyer-6",
    content: "Hi Robert! Your background in digital ventures is impressive. I started this agency because I wanted to help businesses tell their stories better, and it's grown beyond what I imagined. I'm excited about the possibility of working with someone who can help scale it further.",
    timestamp: new Date('2024-01-12T10:30:00'),
    type: "text",
    readAt: new Date('2024-01-12T11:00:00'),
  },
  {
    id: "msg-46",
    matchId: "match-6",
    senderId: "buyer-6",
    receiverId: "seller-4",
    content: "Your 95% client retention rate really stands out to me. That's exceptional in the agency world. What's your secret to keeping clients so engaged and satisfied?",
    timestamp: new Date('2024-01-13T15:45:00'),
    type: "text",
    readAt: new Date('2024-01-13T16:15:00'),
  },
  {
    id: "msg-47",
    matchId: "match-6",
    senderId: "seller-4",
    receiverId: "buyer-6",
    content: "It comes down to treating each client like a true partner, not just a customer. We do monthly strategy reviews, proactive campaign optimization, and we're always looking for new ways to drive results for them. Plus our team really cares about the work.",
    timestamp: new Date('2024-01-14T11:20:00'),
    type: "text",
    readAt: new Date('2024-01-14T12:00:00'),
  },
  {
    id: "msg-48",
    matchId: "match-6",
    senderId: "buyer-6",
    receiverId: "seller-4",
    content: "Your client retention rate is outstanding. I'd love to understand your process for onboarding new accounts and maintaining long-term relationships.",
    timestamp: new Date('2024-01-16T16:30:00'),
    type: "text",
  },
];

export const mockNotifications: Notification[] = [
  {
    id: "notif-1",
    userId: "seller-1",
    type: "new-message",
    title: "New message from Sarah Chen",
    message: "I'd love to schedule a call this week to discuss the due diligence process...",
    icon: "💬",
    createdAt: new Date('2024-01-16T14:30:00'),
    actionUrl: "/matches/match-1",
    matchId: "match-1",
    messageId: "msg-15",
    senderId: "buyer-1",
    priority: "medium",
  },
  {
    id: "notif-2",
    userId: "buyer-3",
    type: "match-created",
    title: "New match with Dr. Lisa Park",
    message: "You've been matched with Wellness Partners Clinic based on your healthcare investment preferences.",
    icon: "🤝",
    createdAt: new Date('2024-01-10T11:00:00'),
    readAt: new Date('2024-01-10T11:05:00'),
    actionUrl: "/matches/match-3",
    matchId: "match-3",
    priority: "high",
  },
  {
    id: "notif-3",
    userId: "buyer-2",
    type: "new-message",
    title: "Response from TechFlow Solutions",
    message: "Thank you for the detailed financial information. Our team will review...",
    icon: "📄",
    createdAt: new Date('2024-01-15T16:45:00'),
    actionUrl: "/matches/match-2",
    matchId: "match-2",
    messageId: "msg-8",
    senderId: "seller-1",
    priority: "medium",
  },
];
