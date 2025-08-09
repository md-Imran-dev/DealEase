import type { SellerProfile } from "../types/seller";

export const mockSellers: SellerProfile[] = [
    {
        id: "seller-1",
        firstName: "Mark",
        lastName: "Thompson",
        email: "mark.thompson@techflow.com",
        avatar: "MT",
        profilePicture: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
        company: "TechFlow Solutions",
        title: "Founder & CEO",
        phone: "+1-415-555-0345",
        linkedIn: "mark-thompson-techflow",
        website: "https://techflowsolutions.com",
        location: "San Francisco, CA",

        // Business Information
        businessName: "TechFlow Solutions",
        industry: "Technology",
        businessType: "SaaS",
        businessAge: 8,
        employees: 45,

        // Financial Information
        grossRevenue: 2500000,
        netProfit: 750000,
        ebitda: 900000,
        valuation: 3200000,
        debtAmount: 150000,

        // Business Details
        description: "Leading SaaS platform for workflow automation and business process optimization. Serving 500+ enterprise clients with 98% customer satisfaction and 15% month-over-month growth.",
        reasonsForSelling: ["Ready for retirement", "Want to focus on new ventures", "Time for business to scale beyond my capabilities"],
        timeline: "6-9 months",
        assetsIncluded: ["Software platform", "Customer contracts", "Intellectual property", "Development team", "Office lease"],
        sellingPoints: "Proven revenue model, excellent customer retention, experienced team, scalable technology platform, strong market position",

        // Operational Info
        managementStays: true,
        keyEmployees: [
            {
                name: "Sarah Chen",
                role: "VP of Engineering",
                tenure: 5,
                staysWithBusiness: true
            },
            {
                name: "Mike Rodriguez",
                role: "Head of Sales",
                tenure: 3,
                staysWithBusiness: true
            }
        ],

        customerBase: {
            totalCustomers: 512,
            topCustomerConcentration: 8, // Top customer is 8% of revenue
            averageContractLength: 24, // months
            churnRate: 2.5, // 2.5% monthly
            monthlyRecurringRevenue: 195000
        },

        facilities: [
            {
                type: "Corporate Office",
                location: "San Francisco, CA",
                owned: false,
                size: "8,500 sq ft"
            }
        ],

        // Deal Structure Preferences
        preferredDealStructure: ["Asset Purchase", "Stock Purchase"],
        minimumDownPayment: 70,
        sellerFinancingAvailable: true,
        sellerFinancingTerms: "Up to 30% over 3 years at 6% interest",

        // Profile metrics
        profileCompleteness: 96,
        responseRate: 92,
        lastActive: new Date('2024-01-16'),
        verifiedStatus: true,

        // Professional details
        yearsInBusiness: 8,
        previousExits: 1,

        // Badges and verification
        badges: [
            {
                id: "verified-business",
                name: "Verified Business",
                description: "Financial statements and business operations verified",
                icon: "✅",
                color: "#10B981",
                earnedDate: new Date('2023-08-15'),
                category: 'verification',
            },
            {
                id: "high-growth",
                name: "High Growth",
                description: "Demonstrated consistent revenue growth",
                icon: "📈",
                color: "#3B82F6",
                earnedDate: new Date('2023-10-20'),
                category: 'achievement',
            },
            {
                id: "tech-innovator",
                name: "Tech Innovator",
                description: "Recognized for technology innovation",
                icon: "🚀",
                color: "#8B5CF6",
                earnedDate: new Date('2023-06-10'),
                category: 'expertise',
            },
        ],

        references: [
            {
                id: "ref-1",
                name: "Jennifer Walsh",
                title: "CTO",
                company: "Enterprise Solutions Inc.",
                relationship: "Major Customer",
                message: "TechFlow has been instrumental in optimizing our operations. Their platform saved us 40% in process time and the support team is exceptional.",
                rating: 5,
                date: new Date('2023-11-15'),
                verified: true,
            },
            {
                id: "ref-2",
                name: "David Park",
                title: "VP of Operations",
                company: "Global Manufacturing Corp",
                relationship: "Customer",
                message: "Outstanding product and team. We've seen ROI within 6 months and their platform scales beautifully with our growth.",
                rating: 5,
                date: new Date('2023-09-22'),
                verified: true,
            },
        ],

        certifications: ["Certified SaaS Metrics", "AWS Solutions Architect"],
        awards: ["SaaS Startup of the Year 2022", "Top 50 Tech CEOs Under 40"],
    },

    {
        id: "seller-2",
        firstName: "Dr. Lisa",
        lastName: "Park",
        email: "lisa.park@wellnesspartners.com",
        avatar: "LP",
        profilePicture: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face",
        company: "Wellness Partners Clinic",
        title: "Medical Director & Owner",
        phone: "+1-503-555-0267",
        linkedIn: "dr-lisa-park-wellness",
        website: "https://wellnesspartnersclinic.com",
        location: "Portland, OR",

        // Business Information
        businessName: "Wellness Partners Clinic",
        industry: "Healthcare",
        businessType: "Medical Practice",
        businessAge: 12,
        employees: 18,

        // Financial Information
        grossRevenue: 1200000,
        netProfit: 340000,
        ebitda: 420000,
        valuation: 900000,
        debtAmount: 45000,

        // Business Details
        description: "Full-service family medicine clinic with preventive care focus. Serving 3,500+ patients with comprehensive primary care, wellness programs, and chronic disease management.",
        reasonsForSelling: ["Approaching retirement", "Want to focus on research", "Clinic ready for expansion under new leadership"],
        timeline: "12-18 months",
        assetsIncluded: ["Medical equipment", "Patient records", "Office building", "Pharmacy license", "Staff contracts"],
        sellingPoints: "Established patient base, excellent reputation, modern facility, experienced staff, strong community relationships",

        // Operational Info
        managementStays: false,
        keyEmployees: [
            {
                name: "Jennifer Adams",
                role: "Practice Manager",
                tenure: 8,
                staysWithBusiness: true
            },
            {
                name: "Dr. Michael Wong",
                role: "Associate Physician",
                tenure: 4,
                staysWithBusiness: true
            }
        ],

        customerBase: {
            totalCustomers: 3500,
            topCustomerConcentration: 2, // Insurance providers
            averageContractLength: 0, // N/A for medical practice
            churnRate: 5, // 5% annual patient turnover
        },

        facilities: [
            {
                type: "Medical Clinic",
                location: "Portland, OR",
                owned: true,
                size: "4,200 sq ft"
            },
            {
                type: "Parking Lot",
                location: "Portland, OR",
                owned: true,
                size: "0.5 acres"
            }
        ],

        // Deal Structure Preferences
        preferredDealStructure: ["Asset Purchase", "Real Estate Included"],
        minimumDownPayment: 60,
        sellerFinancingAvailable: true,
        sellerFinancingTerms: "Up to 40% over 5 years at 5.5% interest",

        // Profile metrics
        profileCompleteness: 89,
        responseRate: 95,
        lastActive: new Date('2024-01-15'),
        verifiedStatus: true,

        // Professional details
        yearsInBusiness: 12,
        previousExits: 0,

        // Badges and verification
        badges: [
            {
                id: "verified-business",
                name: "Verified Business",
                description: "Financial statements and business operations verified",
                icon: "✅",
                color: "#10B981",
                earnedDate: new Date('2023-09-20'),
                category: 'verification',
            },
            {
                id: "community-leader",
                name: "Community Leader",
                description: "Recognized for community health impact",
                icon: "🏥",
                color: "#EF4444",
                earnedDate: new Date('2023-04-15'),
                category: 'achievement',
            },
        ],

        references: [
            {
                id: "ref-3",
                name: "Mary Johnson",
                title: "Hospital Administrator",
                company: "Portland General Hospital",
                relationship: "Professional Partner",
                message: "Dr. Park runs an exemplary practice with the highest standards of care. Her clinic is a model for family medicine.",
                rating: 5,
                date: new Date('2023-10-10'),
                verified: true,
            },
        ],

        certifications: ["Board Certified Family Medicine", "Healthcare Quality Certification"],
        awards: ["Community Healthcare Provider of the Year 2023"],
    },

    {
        id: "seller-3",
        firstName: "Robert",
        lastName: "Martinez",
        email: "robert@premiumauto.com",
        avatar: "RM",
        profilePicture: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
        company: "Premium Auto Services",
        title: "Owner & General Manager",
        phone: "+1-512-555-0189",
        linkedIn: "robert-martinez-auto",
        website: "https://premiumautoservices.com",
        location: "Austin, TX",

        // Business Information
        businessName: "Premium Auto Services",
        industry: "Automotive",
        businessType: "Service Business",
        businessAge: 15,
        employees: 22,

        // Financial Information
        grossRevenue: 1800000,
        netProfit: 450000,
        ebitda: 520000,
        valuation: 1600000,
        debtAmount: 85000,

        // Business Details
        description: "Full-service automotive repair and maintenance facility specializing in luxury and imported vehicles. ASE-certified technicians, state-of-the-art equipment, and excellent customer retention.",
        reasonsForSelling: ["Health reasons", "Want to travel", "Business runs independently"],
        timeline: "3-6 months",
        assetsIncluded: ["Building and land", "All equipment", "Customer database", "Vendor relationships", "Trained staff"],
        sellingPoints: "Prime location, loyal customer base, modern equipment, skilled workforce, strong reputation, established vendor relationships",

        // Operational Info
        managementStays: false,
        keyEmployees: [
            {
                name: "Carlos Rodriguez",
                role: "Shop Foreman",
                tenure: 12,
                staysWithBusiness: true
            },
            {
                name: "Lisa Thompson",
                role: "Service Manager",
                tenure: 7,
                staysWithBusiness: true
            }
        ],

        customerBase: {
            totalCustomers: 2800,
            topCustomerConcentration: 1, // No single customer dominance
            averageContractLength: 0, // N/A for auto service
            churnRate: 8, // 8% annual customer turnover
        },

        facilities: [
            {
                type: "Service Facility",
                location: "Austin, TX",
                owned: true,
                size: "12,000 sq ft"
            },
            {
                type: "Customer Parking",
                location: "Austin, TX",
                owned: true,
                size: "1.2 acres"
            }
        ],

        // Deal Structure Preferences
        preferredDealStructure: ["Asset Purchase", "Real Estate Included", "Management Buyout"],
        minimumDownPayment: 50,
        sellerFinancingAvailable: true,
        sellerFinancingTerms: "Up to 50% over 7 years at 6.5% interest",

        // Profile metrics
        profileCompleteness: 84,
        responseRate: 88,
        lastActive: new Date('2024-01-14'),
        verifiedStatus: true,

        // Professional details
        yearsInBusiness: 15,
        previousExits: 0,

        // Badges and verification
        badges: [
            {
                id: "verified-business",
                name: "Verified Business",
                description: "Financial statements and business operations verified",
                icon: "✅",
                color: "#10B981",
                earnedDate: new Date('2023-07-10'),
                category: 'verification',
            },
            {
                id: "customer-champion",
                name: "Customer Champion",
                description: "Outstanding customer satisfaction ratings",
                icon: "⭐",
                color: "#F59E0B",
                earnedDate: new Date('2023-11-05'),
                category: 'achievement',
            },
        ],

        references: [
            {
                id: "ref-4",
                name: "Patricia Williams",
                title: "Fleet Manager",
                company: "Corporate Services Ltd",
                relationship: "Commercial Customer",
                message: "Premium Auto has maintained our fleet for 8 years. Excellent service, fair pricing, and they always deliver on time.",
                rating: 5,
                date: new Date('2023-12-01'),
                verified: true,
            },
        ],

        certifications: ["ASE Master Technician", "Texas Auto Dealer License"],
        awards: ["Austin Business Excellence Award 2022"],
    },

    {
        id: "seller-4",
        firstName: "Jennifer",
        lastName: "Walsh",
        email: "jennifer@creativedigital.com",
        avatar: "JW",
        profilePicture: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=400&h=400&fit=crop&crop=face",
        company: "Creative Digital Agency",
        title: "Founder & Creative Director",
        phone: "+1-303-555-0245",
        linkedIn: "jennifer-walsh-creative",
        website: "https://creativedigitalagency.com",
        location: "Denver, CO",

        // Business Information
        businessName: "Creative Digital Agency",
        industry: "Digital Marketing",
        businessType: "Service Agency",
        businessAge: 6,
        employees: 12,

        // Financial Information
        grossRevenue: 950000,
        netProfit: 285000,
        ebitda: 320000,
        valuation: 750000,
        debtAmount: 25000,

        // Business Details
        description: "Full-service digital marketing agency specializing in brand strategy, web design, and digital advertising for mid-market companies. Award-winning creative work with 95% client retention.",
        reasonsForSelling: ["Starting a family", "Want to pivot to consulting", "Agency ready for next level growth"],
        timeline: "6-12 months",
        assetsIncluded: ["Client contracts", "Creative assets", "Technology stack", "Team", "Office equipment"],
        sellingPoints: "Strong client base, proven processes, talented creative team, recurring revenue model, award-winning work",

        // Operational Info
        managementStays: true,
        keyEmployees: [
            {
                name: "Alex Chen",
                role: "Account Director",
                tenure: 4,
                staysWithBusiness: true
            },
            {
                name: "Maya Patel",
                role: "Senior Designer",
                tenure: 3,
                staysWithBusiness: true
            }
        ],

        customerBase: {
            totalCustomers: 28,
            topCustomerConcentration: 18, // Top client is 18% of revenue
            averageContractLength: 12, // months
            churnRate: 5, // 5% annual churn
            monthlyRecurringRevenue: 65000
        },

        facilities: [
            {
                type: "Creative Studio",
                location: "Denver, CO",
                owned: false,
                size: "3,500 sq ft"
            }
        ],

        // Deal Structure Preferences
        preferredDealStructure: ["Asset Purchase", "Earnout Structure"],
        minimumDownPayment: 60,
        sellerFinancingAvailable: true,
        sellerFinancingTerms: "Up to 30% over 2 years at 7% interest",

        // Profile metrics
        profileCompleteness: 91,
        responseRate: 97,
        lastActive: new Date('2024-01-16'),
        verifiedStatus: true,

        // Professional details
        yearsInBusiness: 6,
        previousExits: 0,

        // Badges and verification
        badges: [
            {
                id: "verified-business",
                name: "Verified Business",
                description: "Financial statements and business operations verified",
                icon: "✅",
                color: "#10B981",
                earnedDate: new Date('2023-05-20'),
                category: 'verification',
            },
            {
                id: "creative-excellence",
                name: "Creative Excellence",
                description: "Recognized for outstanding creative work",
                icon: "🎨",
                color: "#8B5CF6",
                earnedDate: new Date('2023-08-15'),
                category: 'expertise',
            },
        ],

        references: [
            {
                id: "ref-5",
                name: "David Kim",
                title: "CMO",
                company: "TechStart Solutions",
                relationship: "Long-term Client",
                message: "Creative Digital transformed our brand and digital presence. Their strategic approach and creative execution delivered exceptional results.",
                rating: 5,
                date: new Date('2023-09-18'),
                verified: true,
            },
        ],

        certifications: ["Google Ads Certified", "HubSpot Certified"],
        awards: ["Denver Digital Agency of the Year 2023"],
    },

    {
        id: "seller-5",
        firstName: "Michael",
        lastName: "Brown",
        email: "michael@brownmanufacturing.com",
        avatar: "MB",
        profilePicture: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face",
        company: "Brown Manufacturing",
        title: "CEO & Owner",
        phone: "+1-419-555-0156",
        linkedIn: "michael-brown-manufacturing",
        website: "https://brownmanufacturing.com",
        location: "Toledo, OH",

        // Business Information
        businessName: "Brown Manufacturing",
        industry: "Manufacturing",
        businessType: "Manufacturing",
        businessAge: 25,
        employees: 85,

        // Financial Information
        grossRevenue: 4200000,
        netProfit: 630000,
        ebitda: 820000,
        valuation: 3800000,
        debtAmount: 450000,

        // Business Details
        description: "Precision metal fabrication and machining company serving automotive and aerospace industries. ISO 9001 certified with long-term contracts and strong supplier relationships.",
        reasonsForSelling: ["Succession planning", "No family interested", "Ready to retire"],
        timeline: "9-15 months",
        assetsIncluded: ["Manufacturing facility", "All machinery", "Contracts", "Inventory", "Intellectual property"],
        sellingPoints: "Long-term customer contracts, modern equipment, skilled workforce, established supply chain, strong safety record",

        // Operational Info
        managementStays: true,
        keyEmployees: [
            {
                name: "Susan Garcia",
                role: "Operations Manager",
                tenure: 15,
                staysWithBusiness: true
            },
            {
                name: "Tom Wilson",
                role: "Quality Manager",
                tenure: 12,
                staysWithBusiness: true
            }
        ],

        customerBase: {
            totalCustomers: 45,
            topCustomerConcentration: 25, // Top customer is 25% of revenue
            averageContractLength: 36, // months
            churnRate: 2, // 2% annual churn
        },

        facilities: [
            {
                type: "Manufacturing Plant",
                location: "Toledo, OH",
                owned: true,
                size: "45,000 sq ft"
            },
            {
                type: "Warehouse",
                location: "Toledo, OH",
                owned: true,
                size: "15,000 sq ft"
            }
        ],

        // Deal Structure Preferences
        preferredDealStructure: ["Asset Purchase", "Management Buyout", "Private Equity Partnership"],
        minimumDownPayment: 40,
        sellerFinancingAvailable: true,
        sellerFinancingTerms: "Up to 60% over 10 years at 5.5% interest",

        // Profile metrics
        profileCompleteness: 87,
        responseRate: 85,
        lastActive: new Date('2024-01-13'),
        verifiedStatus: true,

        // Professional details
        yearsInBusiness: 25,
        previousExits: 0,

        // Badges and verification
        badges: [
            {
                id: "verified-business",
                name: "Verified Business",
                description: "Financial statements and business operations verified",
                icon: "✅",
                color: "#10B981",
                earnedDate: new Date('2023-03-15'),
                category: 'verification',
            },
            {
                id: "industry-veteran",
                name: "Industry Veteran",
                description: "25+ years of successful business operations",
                icon: "🏭",
                color: "#6B7280",
                earnedDate: new Date('2023-06-01'),
                category: 'achievement',
            },
        ],

        references: [
            {
                id: "ref-6",
                name: "James Parker",
                title: "Procurement Director",
                company: "Aerospace Components Inc.",
                relationship: "Major Customer",
                message: "Brown Manufacturing has been our trusted partner for over 15 years. Their quality and reliability are unmatched in the industry.",
                rating: 5,
                date: new Date('2023-10-25'),
                verified: true,
            },
        ],

        certifications: ["ISO 9001:2015", "AS9100 Aerospace Certification"],
        awards: ["Manufacturing Excellence Award 2022"],
    },

    {
        id: "seller-6",
        firstName: "Amanda",
        lastName: "Chen",
        email: "amanda@foodieheaven.com",
        avatar: "AC",
        profilePicture: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
        company: "Foodie Heaven Restaurant Group",
        title: "Owner & Executive Chef",
        phone: "+1-206-555-0234",
        linkedIn: "amanda-chen-chef",
        website: "https://foodieheaven.com",
        location: "Seattle, WA",

        // Business Information
        businessName: "Foodie Heaven Restaurant Group",
        industry: "Food & Beverage",
        businessType: "Restaurant Chain",
        businessAge: 10,
        employees: 65,

        // Financial Information
        grossRevenue: 3100000,
        netProfit: 465000,
        ebitda: 580000,
        valuation: 2200000,
        debtAmount: 220000,

        // Business Details
        description: "Upscale casual restaurant group with 3 locations specializing in Pacific Northwest cuisine. Farm-to-table concept with strong local brand recognition and loyal customer base.",
        reasonsForSelling: ["Expanding to new market", "Focus on catering business", "Partner buyout opportunity"],
        timeline: "4-8 months",
        assetsIncluded: ["Restaurant locations", "Equipment", "Recipes", "Brand", "Staff", "Supplier relationships"],
        sellingPoints: "Prime locations, established brand, experienced management team, strong local reputation, profitable operations",

        // Operational Info
        managementStays: true,
        keyEmployees: [
            {
                name: "Carlos Rodriguez",
                role: "General Manager",
                tenure: 7,
                staysWithBusiness: true
            },
            {
                name: "Emily Davis",
                role: "Sous Chef",
                tenure: 5,
                staysWithBusiness: true
            }
        ],

        customerBase: {
            totalCustomers: 8500, // Regular customers
            topCustomerConcentration: 0, // No single customer concentration
            averageContractLength: 0, // N/A for restaurants
            churnRate: 15, // 15% annual customer turnover
        },

        facilities: [
            {
                type: "Main Restaurant",
                location: "Seattle Downtown",
                owned: false,
                size: "4,500 sq ft"
            },
            {
                type: "Suburban Location",
                location: "Bellevue, WA",
                owned: false,
                size: "3,800 sq ft"
            },
            {
                type: "Waterfront Location",
                location: "Seattle Waterfront",
                owned: false,
                size: "5,200 sq ft"
            }
        ],

        // Deal Structure Preferences
        preferredDealStructure: ["Asset Purchase", "Lease Assignment"],
        minimumDownPayment: 55,
        sellerFinancingAvailable: true,
        sellerFinancingTerms: "Up to 35% over 4 years at 6.8% interest",

        // Profile metrics
        profileCompleteness: 92,
        responseRate: 90,
        lastActive: new Date('2024-01-15'),
        verifiedStatus: true,

        // Professional details
        yearsInBusiness: 10,
        previousExits: 0,

        // Badges and verification
        badges: [
            {
                id: "verified-business",
                name: "Verified Business",
                description: "Financial statements and business operations verified",
                icon: "✅",
                color: "#10B981",
                earnedDate: new Date('2023-04-10'),
                category: 'verification',
            },
            {
                id: "culinary-excellence",
                name: "Culinary Excellence",
                description: "Recognized for outstanding cuisine and service",
                icon: "🍽️",
                color: "#F59E0B",
                earnedDate: new Date('2023-07-20'),
                category: 'expertise',
            },
        ],

        references: [
            {
                id: "ref-7",
                name: "Rebecca Johnson",
                title: "Food Critic",
                company: "Seattle Food & Wine",
                relationship: "Industry Professional",
                message: "Foodie Heaven consistently delivers exceptional dining experiences. Amanda's vision and execution have created something truly special.",
                rating: 5,
                date: new Date('2023-08-30'),
                verified: true,
            },
        ],

        certifications: ["Culinary Institute Graduate", "ServSafe Certified"],
        awards: ["Seattle Restaurant of the Year 2023"],
    },
];
