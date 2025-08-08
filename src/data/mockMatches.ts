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
