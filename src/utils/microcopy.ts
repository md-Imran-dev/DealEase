// Friendly microcopy and helpful texts throughout DealEase

export const microcopy = {
    // General app guidance
    welcome: {
        title: "Welcome to DealEase! 🎉",
        subtitle: "Your journey to finding the perfect business acquisition starts here.",
        description: "We've designed DealEase to make business acquisitions as smooth as possible. Let's get you set up!",
    },

    // Onboarding guidance
    onboarding: {
        buyer: {
            title: "Tell us about your investment goals 💼",
            subtitle: "This helps us match you with the right opportunities",
            intro: "Great choice! As a buyer, you'll discover amazing businesses ready for acquisition. Let's learn about what you're looking for.",
            completion: "Perfect! Your profile is taking shape. We'll use this to find businesses that match your criteria.",
        },
        seller: {
            title: "Let's showcase your business 🚀",
            subtitle: "Help potential buyers understand what makes your business special",
            intro: "Excellent! As a seller, you'll connect with serious buyers looking for businesses like yours. Let's highlight what makes your business unique.",
            completion: "Fantastic! Your business profile looks compelling. Potential buyers will love learning about your success story.",
        },
        tips: {
            honest: "💡 Tip: Be honest and detailed - it helps create better matches!",
            specific: "✨ The more specific you are, the better we can match you",
            complete: "📝 Complete profiles get 3x more engagement",
            timeline: "⏰ Most users complete this in under 5 minutes",
        }
    },

    // Dashboard guidance
    dashboard: {
        buyer: {
            empty: {
                title: "Ready to discover your next acquisition? 🔍",
                description: "Browse the marketplace to find businesses that match your investment criteria. We've already started curating opportunities for you!",
                cta: "Explore Marketplace",
            },
            withMatches: {
                title: "You've got matches! 🎯",
                description: "Some exciting opportunities are waiting for you. Check out your matches to start conversations.",
            }
        },
        seller: {
            empty: {
                title: "Your business is now live! 📈",
                description: "Potential buyers can now discover your business. While you wait for matches, consider enhancing your profile to attract more interest.",
                cta: "Enhance Profile",
            },
            withMatches: {
                title: "Buyers are interested! 💫",
                description: "You have interested buyers. Time to start those conversations and see if there's a good fit.",
            }
        }
    },

    // Marketplace guidance
    marketplace: {
        title: "Meet Your Potential Matches 🤝",
        subtitle: "These buyers have been carefully selected based on your business profile",
        filters: {
            help: "Use filters to find buyers that match your specific criteria",
            investment: "Filter by investment range to find serious buyers",
            industry: "Find buyers with experience in your industry",
        },
        cards: {
            verified: "✅ This buyer's identity and investment capacity has been verified",
            experienced: "🏆 This buyer has completed multiple acquisitions",
            newBuyer: "🌟 New to acquisitions but well-qualified",
            viewProfile: "Click to see their full investment criteria and experience",
        }
    },

    // Messaging guidance
    messaging: {
        firstMessage: {
            buyer: "👋 Start with a friendly introduction and mention what interests you about their business",
            seller: "💬 Respond warmly and share what makes your business unique",
        },
        tips: {
            responsive: "💡 Quick responses lead to better outcomes",
            professional: "🎯 Keep it professional but friendly",
            questions: "❓ Don't hesitate to ask detailed questions",
            documents: "📎 Share relevant documents when appropriate",
        },
        stages: {
            initial: "Getting to know each other - share your story!",
            interested: "Things are looking promising - time for deeper discussions",
            negotiation: "You're in active negotiations - keep the momentum going!",
            closing: "Almost there! Final details and paperwork",
        }
    },

    // Profile completion
    profile: {
        completion: {
            low: "Your profile needs some love! 💝 Complete it to get 3x more matches",
            medium: "Looking good! 👍 Add a few more details to boost your visibility",
            high: "Excellent profile! 🌟 You're all set to make great connections",
        },
        sections: {
            basic: "Basic info helps others know who they're talking to",
            professional: "Professional details build trust and credibility",
            preferences: "Your preferences help us make better matches",
            photo: "A profile photo makes you 5x more likely to get responses",
        }
    },

    // Form guidance
    forms: {
        investmentRange: {
            help: "What's your comfortable investment range? Don't worry, you can always adjust this later",
            tip: "💡 Consider both your available capital and financing options",
        },
        industries: {
            help: "Which industries interest you most? Select all that apply",
            tip: "🎯 Choosing 2-3 industries helps us focus on quality matches",
        },
        timeline: {
            help: "When would you ideally like to complete an acquisition?",
            tip: "⏰ Being flexible often leads to better opportunities",
        },
        experience: {
            help: "Your experience level helps us match you with appropriate opportunities",
            tip: "🚀 First-time buyers often get extra support from sellers",
        },
        businessAge: {
            help: "How long has your business been operating?",
            tip: "📈 Established businesses often attract more serious buyers",
        },
        valuation: {
            help: "What do you think your business is worth?",
            tip: "💰 Professional valuations can help validate your asking price",
        }
    },

    // Error states
    errors: {
        friendly: {
            network: "Oops! Looks like your internet hiccupped. Mind trying that again? 🌐",
            validation: "Just a few small details need fixing before we can continue 📝",
            unauthorized: "Looks like you need to sign in again. No worries, happens to the best of us! 🔐",
            notFound: "Hmm, we can't find what you're looking for. Let's get you back on track 🧭",
            server: "Our servers are taking a quick coffee break ☕ Please try again in a moment",
        }
    },

    // Success messages
    success: {
        profileUpdated: "Profile updated! ✨ You're looking great",
        messagesSent: "Message sent! 💌 They'll get a notification right away",
        matchCreated: "It's a match! 🎉 Time to start the conversation",
        documentUploaded: "Document uploaded successfully! 📄 Processing will begin shortly",
        settingsSaved: "Settings saved! ⚙️ Your preferences have been updated",
    },

    // Action tooltips
    tooltips: {
        like: "Express interest in this opportunity",
        pass: "Not interested right now (you can always change your mind)",
        message: "Send a message to start the conversation",
        viewProfile: "See their complete profile and investment criteria",
        editProfile: "Update your profile information",
        uploadDocument: "Share important documents securely",
        filterResults: "Narrow down results to find exactly what you're looking for",
        exportData: "Download your data for offline review",
        helpCenter: "Get help and find answers to common questions",
        notifications: "Manage your notification preferences",
        logout: "Sign out of your account safely",
        demoMode: "Manage demo settings and view sample data",
        aiAnalysis: "Get AI-powered insights on financial documents",
        dealProgress: "Track your acquisition progress through each stage",
        teamManagement: "Add team members to collaborate on deals",
    },

    // Empty states
    emptyStates: {
        noMatches: {
            title: "No matches yet 🌱",
            description: "Don't worry! Great matches take time. We're continuously adding new opportunities.",
            action: "Expand your criteria or check back soon",
        },
        noMessages: {
            title: "Your conversations will appear here 💬",
            description: "Once you start chatting with potential partners, all your conversations will be organized here.",
            action: "Visit the marketplace to find opportunities",
        },
        noDeals: {
            title: "No active deals yet 📊",
            description: "When you and a potential partner decide to move forward, you'll track your progress here.",
            action: "Start conversations to begin your first deal",
        },
        noDocuments: {
            title: "No documents uploaded 📁",
            description: "Upload important documents like financial statements, legal docs, or business plans to share with potential partners.",
            action: "Click the upload button to get started",
        }
    },

    // Loading states
    loading: {
        matches: "Finding your perfect matches... 🔍",
        profile: "Updating your awesome profile... ✨",
        messages: "Loading your conversations... 💬",
        documents: "Processing your documents... 📄",
        analysis: "AI is analyzing your documents... 🤖",
        deals: "Loading your deal progress... 📊",
    }
};

// Helper function to get contextual microcopy
export const getMicrocopy = (section: string, context?: any) => {
    const keys = section.split('.');
    let result: any = microcopy;

    for (const key of keys) {
        result = result?.[key];
    }

    return result || section;
};

// Responsive breakpoints for consistent spacing
export const spacing = {
    xs: 1,
    sm: 2,
    md: 3,
    lg: 4,
    xl: 6,
    xxl: 8,
};

// Friendly animations
export const animations = {
    fadeIn: {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5, ease: "easeOut" }
    },
    slideIn: {
        initial: { opacity: 0, x: -20 },
        animate: { opacity: 1, x: 0 },
        transition: { duration: 0.4, ease: "easeOut" }
    },
    bounce: {
        animate: {
            scale: [1, 1.05, 1],
            transition: { duration: 0.3, ease: "easeInOut" }
        }
    }
};
