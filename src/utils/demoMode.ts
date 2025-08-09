import type { User } from "../types/auth";
import type { BuyerProfile } from "../types/buyer";
import type { SellerProfile } from "../types/seller";
import type { Match, Message, Notification } from "../types/match";
import type { AcquisitionDeal } from "../types/acquisition";
import type { AIDocumentAnalysis } from "../types/aiAnalysis";

import { mockBuyers } from "../data/mockBuyers";
import { mockSellers } from "../data/mockSellers";
import { mockMatches, mockMessages, mockNotifications } from "../data/mockMatches";
import { mockDeals } from "../data/mockDeals";

import { sampleDocuments, sampleAIAnalysis } from "../data/sampleDocuments";

export interface DemoModeData {
    users: User[];
    buyers: BuyerProfile[];
    sellers: SellerProfile[];
    matches: Match[];
    messages: Message[];
    notifications: Notification[];
    deals: AcquisitionDeal[];
    aiAnalysis: AIDocumentAnalysis[];
    documents: any[];
    lastSeeded: Date;
    demoSettings: {
        autoGenerateActivity: boolean;
        simulateRealTime: boolean;
        enableNotifications: boolean;
        dataDensity: 'light' | 'medium' | 'heavy';
    };
}

// Demo user profiles
const demoUsers: User[] = [
    {
        id: "demo-buyer-1",
        email: "buyer@demo.com",
        firstName: "John",
        lastName: "Doe",
        role: "buyer",
        company: "Growth Capital Partners",
        title: "Managing Partner",
        phone: "+1-555-DEMO-01",
        bio: "Experienced investor focused on SaaS and technology acquisitions",
        location: "San Francisco, CA",
        website: "https://growthcapital.demo",
        linkedin: "john-doe-demo",
        profilePicture: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
        industries: ["Technology", "SaaS", "Software"],
        skills: ["Due Diligence", "Financial Analysis", "Business Strategy"],
        isOnboarded: true,
        onboardingData: {
            desiredIndustries: ["Technology", "SaaS"],
            investmentRange: { min: 500000, max: 3000000 },
            acquisitionExperience: "experienced",
            desiredLocation: "Remote",
            timeline: "6-12 months",
            dealSize: "$1M - $3M",
            fundingSource: ["Self-Funded", "Investors"],
            bio: "Looking for profitable SaaS businesses with strong growth potential"
        },
        settings: {
            notifications: {
                email: true,
                push: true,
                sms: false
            },
            privacy: {
                profileVisible: true,
                contactInfoVisible: true
            }
        },
        createdAt: "2023-06-15T10:00:00Z",
        lastLoginAt: "2024-01-16T15:30:00Z"
    },
    {
        id: "demo-seller-1",
        email: "seller@demo.com",
        firstName: "Jane",
        lastName: "Smith",
        role: "seller",
        company: "TechFlow Solutions",
        title: "Founder & CEO",
        phone: "+1-555-DEMO-02",
        bio: "Building innovative SaaS solutions for 8 years, ready for next chapter",
        location: "Austin, TX",
        website: "https://techflow.demo",
        linkedin: "jane-smith-demo",
        profilePicture: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=400&h=400&fit=crop&crop=face",
        industries: ["Technology", "SaaS"],
        skills: ["Product Development", "Team Leadership", "Customer Success"],
        isOnboarded: true,
        onboardingData: {
            businessType: "SaaS",
            industry: "Technology",
            valuation: 2500000,
            reasonForSelling: ["Ready for retirement", "Want to focus on new ventures"],
            timeline: "6-9 months",
            businessAge: 8,
            employees: 25,
            grossRevenue: 1800000,
            netProfit: 540000,
            assetsIncluded: ["Software platform", "Customer contracts", "Team"],
            sellingPoints: "Profitable, growing, experienced team, proven product-market fit"
        },
        settings: {
            notifications: {
                email: true,
                push: true,
                sms: true
            },
            privacy: {
                profileVisible: true,
                contactInfoVisible: false
            }
        },
        createdAt: "2023-04-20T14:00:00Z",
        lastLoginAt: "2024-01-16T09:15:00Z"
    }
];

class DemoModeManager {
    private static instance: DemoModeManager;
    private data: DemoModeData | null = null;
    private activityTimer: number | null = null;

    static getInstance(): DemoModeManager {
        if (!DemoModeManager.instance) {
            DemoModeManager.instance = new DemoModeManager();
        }
        return DemoModeManager.instance;
    }

    // Initialize demo mode with all sample data
    initializeDemoMode(density: 'light' | 'medium' | 'heavy' = 'medium'): DemoModeData {
        const now = new Date();

        this.data = {
            users: [...demoUsers],
            buyers: density === 'light' ? mockBuyers.slice(0, 3) : mockBuyers,
            sellers: density === 'light' ? mockSellers.slice(0, 3) : mockSellers,
            matches: density === 'light' ? mockMatches.slice(0, 2) : mockMatches,
            messages: density === 'light' ? mockMessages.slice(0, 10) : mockMessages,
            notifications: density === 'light' ? mockNotifications.slice(0, 3) : mockNotifications,
            deals: density === 'light' ? mockDeals.slice(0, 1) : mockDeals,
            aiAnalysis: [...sampleAIAnalysis],
            documents: sampleDocuments,
            lastSeeded: now,
            demoSettings: {
                autoGenerateActivity: true,
                simulateRealTime: true,
                enableNotifications: true,
                dataDensity: density
            }
        };

        // Store in localStorage for persistence
        localStorage.setItem('dealease_demo_data', JSON.stringify(this.data));
        localStorage.setItem('dealease_demo_mode', 'true');

        if (this.data.demoSettings.autoGenerateActivity) {
            this.startActivitySimulation();
        }

        return this.data;
    }

    // Load existing demo data
    loadDemoData(): DemoModeData | null {
        const stored = localStorage.getItem('dealease_demo_data');
        if (stored) {
            try {
                this.data = JSON.parse(stored);
                return this.data;
            } catch (error) {
                console.error('Failed to parse demo data:', error);
                return null;
            }
        }
        return null;
    }

    // Check if demo mode is active
    isDemoMode(): boolean {
        return localStorage.getItem('dealease_demo_mode') === 'true';
    }

    // Get current demo data
    getDemoData(): DemoModeData | null {
        if (!this.data) {
            this.data = this.loadDemoData();
        }
        return this.data;
    }

    // Reset demo data to initial state
    resetDemoData(): DemoModeData {
        localStorage.removeItem('dealease_demo_data');
        return this.initializeDemoMode();
    }

    // Exit demo mode
    exitDemoMode(): void {
        localStorage.removeItem('dealease_demo_mode');
        localStorage.removeItem('dealease_demo_data');
        this.stopActivitySimulation();
        this.data = null;
    }

    // Add new activity to demo data
    addActivity(type: string, data: any): void {
        if (!this.data) return;

        // Add to appropriate collection based on type
        switch (type) {
            case 'new-message':
                this.data.messages.push(data);
                this.updateLastActivity(data.matchId);
                break;
            case 'new-notification':
                this.data.notifications.unshift(data);
                break;
            case 'new-match':
                this.data.matches.push(data);
                break;
            case 'deal-update':
                const dealIndex = this.data.deals.findIndex(d => d.id === data.dealId);
                if (dealIndex >= 0) {
                    this.data.deals[dealIndex] = { ...this.data.deals[dealIndex], ...data.updates };
                }
                break;
        }

        // Update stored data
        localStorage.setItem('dealease_demo_data', JSON.stringify(this.data));
    }

    // Update last activity for a match
    private updateLastActivity(matchId: string): void {
        if (!this.data) return;

        const matchIndex = this.data.matches.findIndex(m => m.id === matchId);
        if (matchIndex >= 0) {
            this.data.matches[matchIndex].lastActivity = new Date();
        }
    }

    // Start automatic activity simulation
    startActivitySimulation(): void {
        if (this.activityTimer) return;

        this.activityTimer = window.setInterval(() => {
            this.simulateRandomActivity();
        }, 30000); // Every 30 seconds
    }

    // Stop activity simulation
    stopActivitySimulation(): void {
        if (this.activityTimer) {
            window.clearInterval(this.activityTimer);
            this.activityTimer = null;
        }
    }

    // Simulate random demo activity
    private simulateRandomActivity(): void {
        if (!this.data || !this.data.demoSettings.autoGenerateActivity) return;

        const activities = [
            () => this.simulateNewMessage(),
            () => this.simulateNotification(),
            () => this.simulateDealProgress(),
        ];

        // Randomly choose an activity
        const randomActivity = activities[Math.floor(Math.random() * activities.length)];
        if (Math.random() > 0.7) { // 30% chance every interval
            randomActivity();
        }
    }

    // Simulate a new message
    private simulateNewMessage(): void {
        if (!this.data) return;

        const activeMatches = this.data.matches.filter(m => m.status === 'active');
        if (activeMatches.length === 0) return;

        const randomMatch = activeMatches[Math.floor(Math.random() * activeMatches.length)];
        const isFromBuyer = Math.random() > 0.5;

        const sampleMessages = [
            "Thanks for the additional information. I'll review and get back to you shortly.",
            "The numbers look great. When would be a good time for a call?",
            "I've shared this with my team. They're impressed with the growth metrics.",
            "Can you provide more details about the customer concentration?",
            "The due diligence is progressing well. No major concerns so far.",
        ];

        const newMessage = {
            id: `msg-${Date.now()}`,
            matchId: randomMatch.id,
            senderId: isFromBuyer ? randomMatch.buyerId : randomMatch.sellerId,
            receiverId: isFromBuyer ? randomMatch.sellerId : randomMatch.buyerId,
            content: sampleMessages[Math.floor(Math.random() * sampleMessages.length)],
            timestamp: new Date(),
            type: 'text' as const,
        };

        this.addActivity('new-message', newMessage);
    }

    // Simulate a notification
    private simulateNotification(): void {
        if (!this.data) return;

        const notifications = [
            {
                id: `notif-${Date.now()}`,
                userId: 'demo-buyer-1',
                type: 'system' as const,
                title: 'Weekly Market Update',
                message: 'New opportunities matching your criteria are available.',
                icon: '📊',
                createdAt: new Date(),
                priority: 'low' as const,
            },
            {
                id: `notif-${Date.now()}`,
                userId: 'demo-seller-1',
                type: 'system' as const,
                title: 'Profile Optimization Tip',
                message: 'Add more details about your customer base to attract better matches.',
                icon: '💡',
                createdAt: new Date(),
                priority: 'medium' as const,
            },
        ];

        const randomNotification = notifications[Math.floor(Math.random() * notifications.length)];
        this.addActivity('new-notification', randomNotification);
    }

    // Simulate deal progress
    private simulateDealProgress(): void {
        if (!this.data) return;

        const activeDeals = this.data.deals.filter(d => d.status === 'active');
        if (activeDeals.length === 0) return;

        const randomDeal = activeDeals[Math.floor(Math.random() * activeDeals.length)];
        const currentStageIndex = randomDeal.stages.findIndex(s => s.status === 'in-progress');

        if (currentStageIndex >= 0) {
            const updates = {
                dealId: randomDeal.id,
                updates: {
                    [`stages.${currentStageIndex}.progress`]: Math.min(
                        randomDeal.stages[currentStageIndex].progress + Math.floor(Math.random() * 10),
                        100
                    ),
                    lastUpdated: new Date(),
                }
            };

            this.addActivity('deal-update', updates);
        }
    }

    // Get demo statistics
    getDemoStats(): { [key: string]: number } {
        if (!this.data) return {};

        return {
            totalUsers: this.data.users.length,
            totalBuyers: this.data.buyers.length,
            totalSellers: this.data.sellers.length,
            totalMatches: this.data.matches.length,
            totalMessages: this.data.messages.length,
            totalDeals: this.data.deals.length,
            activeDeals: this.data.deals.filter(d => d.status === 'active').length,
            completedDeals: this.data.deals.filter(d => d.status === 'completed').length,
            totalDocuments: this.data.documents.length,
            aiAnalysisCount: this.data.aiAnalysis.length,
        };
    }

    // Export demo data for sharing
    exportDemoData(): string {
        return JSON.stringify(this.getDemoData(), null, 2);
    }

    // Import demo data
    importDemoData(jsonData: string): boolean {
        try {
            const importedData = JSON.parse(jsonData);
            this.data = importedData;
            localStorage.setItem('dealease_demo_data', JSON.stringify(this.data));
            return true;
        } catch (error) {
            console.error('Failed to import demo data:', error);
            return false;
        }
    }
}

// Export singleton instance
export const demoModeManager = DemoModeManager.getInstance();

// Utility functions for demo mode
export const initDemo = (density?: 'light' | 'medium' | 'heavy') => {
    return demoModeManager.initializeDemoMode(density);
};

export const isDemo = () => {
    return demoModeManager.isDemoMode();
};

export const exitDemo = () => {
    demoModeManager.exitDemoMode();
};

export const resetDemo = () => {
    return demoModeManager.resetDemoData();
};

export const getDemoStats = () => {
    return demoModeManager.getDemoStats();
};

// Demo mode hook for React components
export const useDemoMode = () => {
    const isActive = isDemo();
    const data = demoModeManager.getDemoData();
    const stats = getDemoStats();

    return {
        isActive,
        data,
        stats,
        init: initDemo,
        exit: exitDemo,
        reset: resetDemo,
    };
};
