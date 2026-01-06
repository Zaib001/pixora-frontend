import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';


const resources = {
    en: {
        translation: {
            "common": {
                "loading": "Loading...",
                "error": "Error",
                "success": "Success",
                "viewAll": "View all",
                "backToHome": "Back to Home",
                "logout": "Logout",
                "signoutText": "Sign out from account",
                "logoutConfirm": "Are you sure you want to logout?",
                "language": "Language",
                "credits": "Credits",
                "free": "Free",
                "brandName": "Pixora Studio"
            },
            "sidebar": {
                "overview": "Overview",
                "templates": "Templates",
                "community": "Community",
                "library": "Library",
                "billing": "Billing",
                "profile": "Profile",
                "settings": "Settings",
                "help": "Help",
                "generators": "AI Generators",
                "textToVideo": "Text to Video",
                "imageToVideo": "Image to Video",
                "textToImage": "Text to Image",
                "imageToImage": "Image to Image",
                "generators_video": "Video Creation",
                "generators_image": "Image Creation",
                "adminPanel": "Admin Panel",
                "admin": {
                    "dashboard": "Dashboard",
                    "templates": "Templates",
                    "users": "Users",
                    "payments": "Payments",
                    "models": "AI Models",
                    "analytics": "Analytics",
                    "community": "Community",
                    "help": "Help Support",
                    "portal": "Admin Portal",
                    "superAdmin": "Super Admin",
                    "administrator": "Administrator"
                },
                "upgradeNow": "Upgrade Now",
                "unlockPremium": "Unlock Premium",
                "unlockPremiumDesc": "Get unlimited generations, priority support, and exclusive templates.",
                "status": {
                    "title": "System Status",
                    "operational": "All Systems Operational"
                }
            },
            "admin": {
                "dashboard": {
                    "title": "Admin Dashboard",
                    "subtitle": "System Overview & Management",
                    "loading": "Loading dashboard...",
                    "error": "Error Loading Dashboard",
                    "stats": {
                        "totalUsers": "Total Users",
                        "totalRevenue": "Total Revenue",
                        "activeSubs": "Active Subscriptions",
                        "pendingApprovals": "Pending Approvals",
                        "today": "today",
                        "thisMonth": "this month",
                        "allActive": "All active",
                        "requiresAttention": "Requires attention",
                        "allClear": "All clear"
                    },
                    "activity": {
                        "title": "Recent Activity",
                        "viewAll": "View All",
                        "noActivity": "No recent activity",
                        "credits": "credits"
                    },
                    "actions": {
                        "users": {
                            "title": "Manage Users",
                            "desc": "View and manage all users, roles, and permissions",
                            "cta": "Go to Users"
                        },
                        "payments": {
                            "title": "Payments",
                            "desc": "Review transactions and manage approvals",
                            "cta": "View Payments"
                        },
                        "analytics": {
                            "title": "Analytics",
                            "desc": "View detailed reports and insights",
                            "cta": "View Analytics"
                        },
                        "help": {
                            "title": "Help Content",
                            "desc": "Manage tutorials and FAQs",
                            "cta": "Manage Content"
                        }
                    }
                }
            },
            "dashboard": {
                "welcomeTitle": "Welcome to",
                "welcomeSubtitle": "Create stunning visuals, animations & videos powered by cutting-edge AI technology. Start creating magic in seconds.",
                "newProject": "New Project",
                "stats": {
                    "projects": "Projects Created",
                    "credits": "Credits Used",
                    "timeSaved": "Time Saved"
                },
                "exploreTemplates": {
                    "title": "Explore Templates",
                    "popular": "POPULAR",
                    "unavailable": "Unavailable",
                    "duration": "Duration",
                    "rating": "Rating",
                    "uses": "Uses",
                    "cost": "Cost",
                    "useTemplate": "Use Template",
                    "noTemplates": "No Templates Available",
                    "noTemplatesDesc": "There are no active templates available right now. Check back soon!",
                    "exploreAll": "Explore All Templates"
                },
                "quickStart": {
                    "t2v": { "title": "Text → Video", "desc": "Transform descriptions into stunning videos with AI" },
                    "i2v": { "title": "Image → Video", "desc": "Animate your images with cinematic motion" },
                    "t2i": { "title": "Text → Image", "desc": "Generate photorealistic images from text prompts" },
                    "i2i": { "title": "Image → Image", "desc": "Transform and enhance images with AI magic" },
                    "trending": "Trending",
                    "startCreating": "Start Creating"
                },
                "popularTemplates": "Popular Templates",
                "browseAll": "Browse all",
                "useTemplate": "Use Template",
                "recommended": "Recommended for You",
                "explorePack": "Explore pack",
                "viewAll": "View all",
                "recentProjects": "Recent Projects",
                billing: {
                    title: "Billing & Credits",
                    subtitle: "Manage your subscription and purchase credits",
                    tabs: {
                        credits: "Buy Credits",
                        subscription: "Subscription",
                        history: "Transaction History"
                    },
                    credits: {
                        title: "Credit Packs",
                        discount: "Bulk discounts available",
                        save: "Save",
                        purchase: "Purchase Now",
                        processing: "Processing...",
                        paymentMethods: "Payment Methods",
                        addPayment: "Add Payment Method",
                        packs: {
                            basic: { features: ["Basic generation", "Standard quality", "Email support"] },
                            pro: { features: ["All basic features", "High quality", "Priority support", "Faster processing"] },
                            ultra: { features: ["All premium features", "Ultra quality", "24/7 support", "Batch processing", "Commercial license"] }
                        }
                    },
                    subscription: {
                        current: "Current Plan",
                        active: "Your active subscription",
                        renews: "Renews On",
                        includes: "Your Plan Includes",
                        upgrade: "Upgrade or Change Plan",
                        choose: "Choose Your Plan",
                        selected: "Current Plan",
                        select: "Select Plan"
                    },
                    history: {
                        title: "Transaction History",
                        export: "Export CSV"
                    },
                    success: "Success!",
                    error: "Payment Error",
                    creditsAdded: "Credits added successfully!",
                    subscriptionActive: "Subscription activated successfully!",
                    processing: "Processing..."
                },
                "profile": {
                    "title": "Profile Settings",
                    "subtitle": "Manage your account information and preferences",
                    "personalInfo": "Personal Information",
                    "edit": "Edit Profile",
                    "save": "Save Changes",
                    "labels": {
                        "name": "Full Name",
                        "email": "Email Address",
                        "bio": "Bio",
                        "location": "Location",
                        "website": "Website"
                    },
                    "placeholders": {
                        "bio": "Tell us about yourself...",
                        "location": "City, Country",
                        "website": "https://yourwebsite.com"
                    },
                    "noData": "Not specified",
                    "noBio": "No bio added yet.",
                    "stats": {
                        "memberSince": "Member Since",
                        "successRate": "Success Rate"
                    },
                    "quickActions": {
                        "title": "Quick Actions",
                        "export": "Export Data",
                        "notifications": "Notification Settings",
                        "privacy": "Privacy & Security",
                        "billing": "Billing & Subscription"
                    },
                    "accountStatus": {
                        "title": "Account Status",
                        "plan": "Plan Type",
                        "subscription": "Subscription",
                        "renewal": "Renewal Date",
                        "manage": "Manage Subscription"
                    }
                }
            },
            "freeTier": {
                "title": "Free Tier",
                "remaining": "remaining",
                "generation": "generation",
                "generations": "generations",
                "exhausted": "Free tier exhausted - Upgrade to continue",
                "watermark": "Free content includes watermark"
            },
            "generator": {
                "studio": {
                    "enhance": "Optimize",
                    "enhancing": "Refining...",
                    "ideas": "Get Ideas",
                    "loadingIdeas": "Thinking...",
                    "conceptualInput": "Conceptual Input",
                    "technicalParameters": "Technical Parameters",
                    "liveCanvas": "Live Evolution Canvas",
                    "creativeVoid": "Enter the Creative Void",
                    "creativeVoidDesc": "Your digital manifestations will materialize within this primary visual interface.",
                    "qualityNotice": "Quality generation consumes standard credits.",
                    "systemIntegrated": "System Integrated",
                    "engineVersion": "Pixora Cinematic Engine v2.0",
                    "chronicle": "Chronicle",
                    "chronicleDesc": "Previous Manifestations"
                },
                "textToVideo": {
                    "title": "Text → Video",
                    "subtitle": "Transform your ideas into stunning videos with AI",
                    "describe": "Describe Your Video",
                    "placeholder": "Describe the scene, mood, camera movements, and details you want in your video...",
                    "inspiration": "Need inspiration? Try these:",
                    "style": "Video Style",
                    "duration": "Duration",
                    "settings": "Video Settings",
                    "advanced": "Advanced Settings",
                    "generate": "Generate Video",
                    "generating": "Generating Video...",
                    "preview": "Video Preview",
                    "download": "Download",
                    "share": "Share",
                    "creating": "Creating Your Video",
                    "creatingSub": "This may take a few moments...",
                    "awaiting": "Your Video Awaits",
                    "awaitingSub": "Describe your vision and generate your first AI video",
                    "useVideo": "Use This Video",
                    "refining": "Refining...",
                    "optimize": "Optimize Prompt",
                    "promptHint": "Add a description first to use AI optimization.",
                    "thinking": "Thinking...",
                    "getIdeas": "Get Ideas",
                    "aspectRatio": "Aspect Ratio",
                    "model": "Model"
                },
                "imageToVideo": {
                    "title": "Image → Video",
                    "subtitle": "Bring your static images to life with AI motion",
                    "visualSource": "Visual Source",
                    "dropImage": "Drop Image Source",
                    "enhance": "Enhance",
                    "ideas": "Ideas",
                    "motionStyle": "Motion Style",
                    "duration": "Duration",
                    "resolution": "Resolution",
                    "highDef": "High-Definition (HD)",
                    "animate": "Animate Image",
                    "animating": "Animating..."
                },
                "textToImage": {
                    "title": "Image Studio",
                    "subtitle": "Architect the perfect visual one prompt at a time.",
                    "artisticStyle": "Artistic Style",
                    "aspectRatio": "Aspect Ratio",
                    "modelAccuracy": "Model Accuracy",
                    "balancedPrecision": "Balanced Precision",
                    "generate": "Generate Image",
                    "visualizing": "Visualizing..."
                },
                "imageToImage": {
                    "title": "Image Refinement",
                    "subtitle": "Iterate, enhance, and perfect your visual assets.",
                    "base": "Base",
                    "mask": "Mask",
                    "refinementStyle": "Refinement Style",
                    "refine": "Refine Image",
                    "transforming": "Transforming...",
                    "source": "Source",
                    "optional": "Optional"
                },

                "styles": {
                    "cinematic": "Cinematic",
                    "animated": "Animated",
                    "realistic": "Realistic",
                    "artistic": "Artistic",
                    "subtle": "Subtle",
                    "dynamic": "Dynamic",
                    "cyberpunk": "Cyberpunk",
                    "fantasy": "Fantasy",
                    "anime": "Anime",
                    "3dRender": "3D Render",
                    "cinematicDesc": "Movie-style dramatic sequences",
                    "animatedDesc": "Stylized animation effects",
                    "realisticDesc": "Photorealistic motion",
                    "artisticDesc": "Painterly artistic style"
                }
            },
            "library": {
                "title": "Your Library",
                "subtitle": "Manage and organize your generated content",
                "stats": {
                    "total": "Total Items",
                    "images": "Images",
                    "videos": "Videos",
                    "storage": "Storage Used"
                },
                "search": "Search your library...",
                "filters": {
                    "all": "All Content",
                    "images": "Images",
                    "videos": "Videos"
                },
                "empty": {
                    "title": "Your Library is Empty",
                    "noResults": "No items found",
                    "subtitle": "Generated images and videos will appear here. Start creating amazing content with AI!",
                    "noResultsSub": "Try adjusting your search or filters.",
                    "start": "Start Creating"
                },
                "actions": {
                    "view": "View Fullscreen",
                    "download": "Download",
                    "share": "Share",
                    "delete": "Delete"
                },
                "messages": {
                    "downloadStart": "Preparing download...",
                    "downloadStarted": "Download started!",
                    "downloadError": "Download failed. Opening in new tab.",
                    "noUrl": "No download URL available",
                    "shareTitle": "Share Content",
                    "shareDefault": "AI Generated Content",
                    "shareSuccess": "Link copied to clipboard!",
                    "shareError": "Failed to share. Please copy the URL manually.",
                    "deleteSuccess": "Content deleted successfully!",
                    "deleteError": "Failed to delete content"
                },
                "ui": {
                    "loading": "Loading your masterpiece...",
                    "untitled": "Untitled Creation",
                    "noDescription": "No description provided.",
                    "deleteTitle": "Delete Content?",
                    "deleteConfirm": "Are you sure you want to delete \"{{title}}\"? This action cannot be undone.",
                    "cancel": "Cancel",
                    "delete": "Delete",
                    "shareUrl": "Share URL",
                    "copyLink": "Copy Link",
                    "copy": "Copy"
                }
            },
            "templates": {
                "title": "Video Templates",
                "subtitle": "Choose from professionally designed templates",
                "searchPlaceholder": "Search templates...",
                "loading": "Loading templates...",
                "noResults": "No templates found",
                "noResultsSub": "Try adjusting your search or filter criteria",
                "preview": "Preview",
                "useTemplate": "Use Template",
                "popular": "POPULAR",
                "credits": "credits",
                "uses": "Uses",
                "categories": {
                    "all": "All",
                    "business": "Business",
                    "social": "Social",
                    "education": "Education",
                    "entertainment": "Entertainment",
                    "personal": "Personal",
                    "other": "Other"
                },
                "general": {
                    "name": "General / Story",
                    "placeholder": "Imagine a futuristic city with flying cars and neon lights...",
                    "helperText": "Describe your scene in detail for the best results."
                },
                "marketing": {
                    "name": "Marketing Video",
                    "placeholder": "Introducing the new Pixora AI platform...",
                    "helperText": "Highlight your product value and add a CTA.",
                    "ctaLabel": "Call to Action",
                    "ctaPlaceholder": "Click the link below to learn more!"
                },
                "storytelling": {
                    "name": "Cinematic Storytelling",
                    "placeholder": "The ancient gates creaked open, revealing a world lost to time...",
                    "helperText": "Focus on atmosphere, lighting, and camera movement.",
                    "cameraLabel": "Camera Movement",
                    "cameraPlaceholder": "Slow zoom in, pan left..."
                },
                "productDemo": {
                    "name": "Product Demo",
                    "placeholder": "Showcase a sleek smartphone resting on a marble surface...",
                    "helperText": "Perfect for e-commerce and retail showcases.",
                    "brandLabel": "Primary Brand Color",
                    "brandPlaceholder": "#FFFFFF or Royal Blue"
                }
            },
            "refundPolicy": {
                "title": "Refund Policy",
                "subtitle": "We believe in fair and transparent pricing. Here's how we handle refunds and credit returns.",
                "creditPurchase": {
                    "title": "Credit Purchases",
                    "desc1": "If you purchase a credit pack and are not satisfied, you may request a full refund within 14 days of purchase, provided that you have not used more than 10% of the purchased credits.",
                    "desc2": "Refunds for credit packs will result in the deduction of the purchased credits from your account balance."
                },
                "generationFailures": {
                    "title": "Generation Failures",
                    "desc": "Our system automatically detects if a generation fails. In such cases, your credits are automatically returned to your balance instantly."
                },
                "subscriptions": {
                    "title": "Subscriptions",
                    "desc1": "Subscriptions can be cancelled at any time from your dashboard. Cancellation will prevent future renewals.",
                    "desc2": "We generally do not offer refunds for partial subscription periods unless there is a system-wide outage."
                },
                "contact": "Need help?",
                "contactBtn": "Contact Support"
            },
            "profile": {
                "title": "Profile Settings",
                "subtitle": "Manage your account information and preferences",
                "personalInfo": "Personal Information",
                "edit": "Edit Profile",
                "save": "Save Changes",
                "labels": {
                    "name": "Full Name",
                    "email": "Email Address",
                    "bio": "Bio",
                    "location": "Location",
                    "website": "Website"
                },
                "stats": {
                    "memberSince": "Member Since",
                    "successRate": "Success Rate"
                },
                "quickActions": {
                    "title": "Quick Actions",
                    "export": "Export Data",
                    "notifications": "Notification Settings",
                    "privacy": "Privacy & Security",
                    "billing": "Billing & Subscription"
                },
                "accountStatus": {
                    "title": "Account Status",
                    "plan": "Plan Type",
                    "subscription": "Subscription",
                    "renewal": "Renewal Date",
                    "manage": "Manage Subscription"
                },
                "freeTier": {
                    "title": "Free Tier",
                    "remaining": "remaining",
                    "generation": "generation",
                    "generations": "generations",
                    "exhausted": "Free tier exhausted - Upgrade to continue",
                    "watermark": "Free content includes watermark"
                }
            },
            settings: {
                title: "Settings",
                subtitle: "Manage your account preferences",
                save: "Save Changes",
                sections: {
                    notifications: "Notifications",
                    privacy: "Privacy & Security",
                    appearance: "Appearance",
                    billing: "Billing & Plans"
                },
                notifications: {
                    email: "Email",
                    emailDesc: "Receive notifications for email",
                    push: "Push",
                    pushDesc: "Receive notifications for push",
                    projectUpdates: "Project Updates",
                    projectUpdatesDesc: "Receive notifications for project updates",
                    creditAlerts: "Credit Alerts",
                    creditAlertsDesc: "Receive notifications for credit alerts"
                },
                privacy: {
                    profileVisibility: "Profile Visibility",
                    dataCollection: "Data Collection",
                    dataCollectionDesc: "Allow data collection",
                    analytics: "Analytics",
                    analyticsDesc: "Allow analytics"
                },
                appearance: {
                    theme: "Theme",
                    language: "Language",
                    options: {
                        dark: "Dark",
                        light: "Light",
                        system: "System"
                    }
                }
            },
            auth: {
                login: {
                    title: "Welcome Back",
                    subtitle: "Sign in to your account to continue creating",
                    emailPlaceholder: "Enter your email",
                    passwordPlaceholder: "Enter your password",
                    forgotPassword: "Forgot password?",
                    submit: "Sign In to Your Account",
                    success: "Login successful!",
                    error: "Invalid credentials. Please try again."
                },
                signup: {
                    title: "Create Account",
                    subtitle: "Join thousands of creators today",
                    nameLabel: "Full Name",
                    namePlaceholder: "Enter your full name",
                    emailLabel: "Email Address",
                    passwordLabel: "Password",
                    passwordPlaceholder: "Create a strong password",
                    confirmPasswordLabel: "Confirm Password",
                    confirmPasswordPlaceholder: "Confirm your password",
                    submit: "Create Your Account",
                    terms: {
                        agree: "I agree to the",
                        service: "Terms of Service",
                        and: "and",
                        privacy: "Privacy Policy"
                    },
                    errors: {
                        match: "Passwords do not match"
                    },
                    requirements: {
                        length: "At least 8 characters",
                        uppercase: "One uppercase letter",
                        number: "One number",
                        special: "One special character"
                    }
                },
                forgotPassword: {
                    title: "Reset Your Password",
                    subtitle: "Enter your registered email address and we'll send you an OTP to reset your password",
                    emailPlaceholder: "Enter your email address",
                    submit: "Send OTP",
                    sending: "Sending OTP...",
                    success: "OTP sent successfully! Check your email.",
                    error: {
                        noEmail: "Please enter your email address",
                        failed: "Failed to send OTP. Please try again."
                    },
                    helpText: "We'll send a 6-digit verification code to your email address"
                },
                resendVerification: {
                    title: "Resend Verification Email",
                    subtitle: "Didn’t receive your verification link? Enter your email to resend.",
                    emailLabel: "Email Address",
                    emailPlaceholder: "Enter your email",
                    submit: "Resend Verification",
                    sending: "Sending...",
                    successTitle: "Verification Sent",
                    successDesc: "A new verification link has been sent to",
                    error: "Failed to resend email"
                },
                resetPassword: {
                    title: "Create New Password",
                    subtitle: "Enter your new password and confirm it to secure your account",
                    passwordPlaceholder: "Enter new password",
                    confirmPlaceholder: "Confirm new password",
                    submit: "Reset Password",
                    resetting: "Resetting Password...",
                    success: "Password reset successfully! Redirecting to login...",
                    error: {
                        required: "Password is required",
                        length: "Password must be at least 6 characters",
                        confirm: "Please confirm your password",
                        mismatch: "Passwords do not match",
                        failed: "Failed to reset password. Please try again."
                    },
                    strength: {
                        title: "Password strength",
                        vWeak: "Very Weak",
                        weak: "Weak",
                        fair: "Fair",
                        good: "Good",
                        strong: "Strong"
                    },
                    requirements: {
                        title: "Password Requirements:",
                        length: "At least 6 characters long",
                        match: "Passwords must match"
                    }
                },
                verify: {
                    title: "Verify Your Account",
                    resetTitle: "Verify Password Reset",
                    subtitle: "Enter the 6-digit OTP sent to your email",
                    resetSubtitle: "Enter the 6-digit OTP sent to your email to reset your password",
                    sentTo: "OTP sent to",
                    submit: "Verify OTP",
                    resendPrefix: "Didn’t receive the code?",
                    resendLink: "Resend OTP",
                    resending: "Resending...",
                    back: "Back to Login",
                    success: "OTP verified successfully! Redirecting...",
                    error: {
                        incomplete: "Please enter the 6-digit OTP",
                        failed: "Failed to verify OTP",
                        resendFailed: "Failed to resend OTP"
                    },
                    resendSuccess: "OTP resent successfully!"
                }
            },
            landing: {
                navbar: {
                    features: "Features",
                    templates: "Templates",
                    pricing: "Pricing",
                    contact: "Contact",
                    signIn: "Sign In",
                    getStarted: "Get Started Free",
                    dropdowns: {
                        videoGen: "AI Video Generation",
                        videoGenDesc: "Create videos with AI",
                        smartTemplates: "Smart Templates",
                        smartTemplatesDesc: "500+ templates",
                        creditSystem: "Credit System",
                        creditSystemDesc: "Pay per use"
                    }
                },
                footer: {
                    description: "Create stunning videos with AI-powered tools that understand your vision. Join thousands of creators transforming their content creation workflow.",
                    stayInLoop: "Stay in the loop",
                    updates: "Get the latest updates on new features, templates, and AI advancements.",
                    subscribe: "Subscribe",
                    emailPlaceholder: "Enter your email",
                    product: "Product",
                    resources: "Resources",
                    company: "Company",
                    madeWith: "Made with",
                    forCreators: "for creators worldwide.",
                    links: {
                        features: "Features",
                        templates: "Templates",
                        pricing: "Pricing",
                        useCases: "Use Cases",
                        apiDocs: "API Docs",
                        docs: "Documentation",
                        helpCenter: "Help Center",
                        blog: "Blog",
                        community: "Community",
                        tutorials: "Tutorials",
                        about: "About Us",
                        careers: "Careers",
                        contact: "Contact",
                        press: "Press Kit",
                        legal: "Legal",
                        privacy: "Privacy Policy",
                        terms: "Terms of Service",
                        cookies: "Cookies",
                        refund: "Refund Policy"
                    }
                },
                hero: {
                    title: {
                        start: "Experience",
                        highlight: "AI Motion",
                        end: "Like Never Before"
                    },
                    description: "Designed for next-generation creators — Pixora helps you craft cinematic videos and animated campaigns with intelligent automation.",
                    startFree: "Start Free",
                    exploreDemos: "Explore Demos"
                },
                features: {
                    badge: "Why Creators Love Pixora",
                    title: {
                        start: "Designed for",
                        highlight: "Creative Excellence"
                    },
                    description: "Transform your creative workflow with AI-powered tools that understand your vision and amplify your productivity.",
                    learnMore: "Learn More",
                    items: {
                        videoGen: {
                            title: "AI Video Generation",
                            desc: "Produce realistic ad videos in seconds with our Comet-powered engine that understands context and emotion with advanced neural networks.",
                            stats: "2.3s avg generation",
                            highlights: {
                                h1: "Real-time rendering",
                                h2: "4K Quality",
                                h3: "60 FPS"
                            }
                        },
                        smartTemplates: {
                            title: "Smart Templates",
                            desc: "Choose from hundreds of animated ad presets for every industry, all customizable with AI-powered editing and automatic branding.",
                            stats: "500+ templates",
                            highlights: {
                                h1: "Auto-branding",
                                h2: "One-click apply",
                                h3: "Customizable"
                            }
                        },
                        creditSystem: {
                            title: "Credit-Based System",
                            desc: "Pay only for what you generate. Flexible pricing for creators and brands with volume discounts and enterprise solutions.",
                            stats: "Pay per use",
                            highlights: {
                                h1: "No subscriptions",
                                h2: "Volume discounts",
                                h3: "Enterprise plans"
                            }
                        }
                    }
                },
                templates: {
                    title: "Premium",
                    titleHighlight: "Templates",
                    description: "Professionally designed templates to kickstart your creative projects with AI-powered customization",
                    cardDesc: "Professionally designed template with AI-powered customization options and seamless integration.",
                    useTemplate: "Use Template",
                    categories: {
                        business: "Business",
                        marketing: "Marketing",
                        corporate: "Corporate",
                        creative: "Creative",
                        minimal: "Minimal",
                        modern: "Modern"
                    }
                },
                pricing: {
                    badge: "Transparent Pricing",
                    title: "Simple, Transparent",
                    titleHighlight: "Pricing",
                    description: "Choose the plan that's right for you. Change or cancel anytime.",
                    joinText: "Join 50,000+ creators",
                    descriptionEnd: "already creating with Pixora.",
                    popularBadge: "MOST POPULAR",
                    period: "/month",
                    save: "Save",
                    savings: "35% savings",
                    plans: {
                        free: {
                            name: "Free",
                            price: "$0",
                            credits: "10/month",
                            desc: "Perfect for exploring Pixora.",
                            button: "Get Started",
                            features: {
                                f1: "Basic image generation",
                                f2: "Standard quality",
                                f3: "Community support",
                                f4: "Watermarked exports"
                            }
                        },
                        pro: {
                            name: "Pro",
                            price: "$19",
                            credits: "500/month",
                            desc: "For serious creators.",
                            button: "Subscribe Now",
                            features: {
                                f1: "All AI tools",
                                f2: "High quality",
                                f3: "Priority support",
                                f4: "No watermarks",
                                f5: "Commercial use"
                            }
                        },
                        enterprise: {
                            name: "Enterprise",
                            price: "$99",
                            credits: "Unlimited",
                            desc: "For teams and power users.",
                            button: "Contact Sales",
                            features: {
                                f1: "All Pro features",
                                f2: "Ultra quality",
                                f3: "Dedicated support",
                                f4: "Custom models",
                                f5: "API access"
                            }
                        }
                    }
                },
                cta: {
                    badge: "Join Active Creators",
                    title: {
                        start: "Ready to Create Your",
                        highlight: "First AI Masterpiece"
                    },
                    titleEnd: "?",
                    description: "Join thousands of creators who are already producing stunning videos and images with Pixora's advanced AI technology.",
                    features: {
                        noCard: "No credit card required",
                        trial: "3 Free Generations",
                        fastStart: "Instant generation"
                    },
                    buttons: {
                        startTrial: "Start Creating Now",
                        watchDemo: "Explore Library"
                    },
                    trustedBy: "Trusted by creative teams worldwide"
                }
            }
        }
    },
    es: {
        translation: {
            "common": {
                "loading": "Cargando...",
                "error": "Error",
                "success": "Éxito",
                "viewAll": "Ver todo",
                "backToHome": "Volver al Inicio",
                "logout": "Cerrar Sesión",
                "signoutText": "Salir de la cuenta",
                "logoutConfirm": "¿Estás seguro de que quieres cerrar sesión?",
                "language": "Idioma",
                "credits": "Créditos",
                "free": "Gratis",
                "brandName": "Pixora Studio"
            },
            "sidebar": {
                "overview": "Resumen",
                "templates": "Plantillas",
                "community": "Comunidad",
                "library": "Biblioteca",
                "billing": "Facturación",
                "profile": "Perfil",
                "settings": "Ajustes",
                "help": "Ayuda",
                "generators": "Generadores IA",
                "textToVideo": "Texto a Video",
                "imageToVideo": "Imagen a Video",
                "textToImage": "Texto a Imagen",
                "imageToImage": "Imagen a Imagen",
                "generators_video": "Creación de Video",
                "generators_image": "Creación de Imagen",
                "adminPanel": "Panel Admin",
                "admin": {
                    "dashboard": "Tablero",
                    "templates": "Plantillas",
                    "users": "Usuarios",
                    "payments": "Pagos",
                    "models": "Modelos IA",
                    "analytics": "Analítica",
                    "community": "Comunidad",
                    "help": "Ayuda",
                    "portal": "Portal Admin",
                    "superAdmin": "Súper Admin",
                    "administrator": "Administrador"
                },
                "upgradeNow": "Actualizar Ahora",
                "unlockPremium": "Desbloquear Premium",
                "unlockPremiumDesc": "Obtén generaciones ilimitadas, soporte prioritario y plantillas exclusivas.",
                "status": {
                    "title": "Estado del Sistema",
                    "operational": "Todos los sistemas operativos"
                }
            },
            "admin": {
                "dashboard": {
                    "title": "Panel de Administración",
                    "subtitle": "Descripción General y Gestión del Sistema",
                    "loading": "Cargando panel...",
                    "error": "Error al cargar el panel",
                    "stats": {
                        "totalUsers": "Usuarios Totales",
                        "totalRevenue": "Ingresos Totales",
                        "activeSubs": "Suscripciones Activas",
                        "pendingApprovals": "Aprobaciones Pendientes",
                        "today": "hoy",
                        "thisMonth": "este mes",
                        "allActive": "Todos activos",
                        "requiresAttention": "Requiere atención",
                        "allClear": "Todo despejado"
                    },
                    "activity": {
                        "title": "Actividad Reciente",
                        "viewAll": "Ver Todo",
                        "noActivity": "No hay actividad reciente",
                        "credits": "créditos"
                    },
                    "actions": {
                        "users": {
                            "title": "Gestionar Usuarios",
                            "desc": "Ver y gestionar todos los usuarios, roles y permisos",
                            "cta": "Ir a Usuarios"
                        },
                        "payments": {
                            "title": "Pagos",
                            "desc": "Revisar transacciones y gestionar aprobaciones",
                            "cta": "Ver Pagos"
                        },
                        "analytics": {
                            "title": "Analítica",
                            "desc": "Ver informes y perspectivas detalladas",
                            "cta": "Ver Analítica"
                        },
                        "help": {
                            "title": "Contenido de Ayuda",
                            "desc": "Gestionar tutoriales y preguntas frecuentes",
                            "cta": "Gestionar Contenido"
                        }
                    }
                }
            },
            "dashboard": {
                "welcomeTitle": "Bienvenido a",
                "welcomeSubtitle": "Crea visuales impresionantes, animaciones y videos con tecnología IA de vanguardia. Empieza a crear magia en segundos.",
                "newProject": "Nuevo Proyecto",
                "stats": {
                    "projects": "Proyectos Creados",
                    "credits": "Créditos Usados",
                    "timeSaved": "Tiempo Ahorrado"
                },
                "exploreTemplates": {
                    "title": "Explorar Plantillas",
                    "unavailable": "No disponible",
                    "duration": "Duración",
                    "rating": "Calificación",
                    "uses": "Usos",
                    "cost": "Costo",
                    "useTemplate": "Usar Plantilla",
                    "noTemplates": "No hay plantillas disponibles",
                    "noTemplatesDesc": "No hay plantillas activas disponibles en este momento. ¡Vuelve pronto!",
                    "exploreAll": "Explorar todas las plantillas"
                },
                "quickStart": {
                    "t2v": { "title": "Texto → Video", "desc": "Transforma descripciones en videos increíbles con IA" },
                    "i2v": { "title": "Imagen → Video", "desc": "Anima tus imágenes con movimiento cinematográfico" },
                    "t2i": { "title": "Texto → Imagen", "desc": "Genera imágenes fotorrealistas a partir de textos" },
                    "i2i": { "title": "Imagen → Imagen", "desc": "Transforma y mejora imágenes con magia IA" },
                    "trending": "Tendencia",
                    "startCreating": "Empezar a crear"
                },
                "popularTemplates": "Plantillas Populares",
                "browseAll": "Explorar todo",
                "useTemplate": "Usar Plantilla",
                "recommended": "Recomendado para ti",
                "recentProjects": "Proyectos Récientes",
                "explorePack": "Explorar pack",
                "viewAll": "Ver todos",
                billing: {
                    title: "Facturación y Créditos",
                    subtitle: "Gestiona tu suscripción y compra créditos",
                    tabs: {
                        credits: "Comprar Créditos",
                        subscription: "Suscripción",
                        history: "Historial de Transacciones"
                    },
                    credits: {
                        title: "Paquetes de Crédito",
                        discount: "Descuentos por volumen disponibles",
                        save: "Ahorra",
                        purchase: "Comprar Ahora",
                        processing: "Procesando...",
                        paymentMethods: "Métodos de Pago",
                        addPayment: "Añadir Método de Pago",
                        packs: {
                            basic: { features: ["Generación básica", "Calidad estándar", "Soporte por correo"] },
                            pro: { features: ["Todas las funciones básicas", "Alta calidad", "Soporte prioritario", "Procesamiento más rápido"] },
                            ultra: { features: ["Todas las funciones premium", "Calidad Ultra", "Soporte 24/7", "Procesamiento por lotes", "Licencia comercial"] }
                        }
                    },
                    subscription: {
                        current: "Plan Actual",
                        active: "Tu suscripción activa",
                        renews: "Renueva el",
                        includes: "Tu Plan Incluye",
                        upgrade: "Mejorar o Cambiar Plan",
                        choose: "Elige Tu Plan",
                        selected: "Plan Actual",
                        select: "Seleccionar Plan"
                    },
                    history: {
                        title: "Historial de Transacciones",
                        export: "Exportar CSV"
                    },
                    success: "¡Éxito!",
                    error: "Error de Pago",
                    creditsAdded: "¡Créditos añadidos exitosamente!",
                    subscriptionActive: "¡Suscripción activada exitosamente!",
                    processing: "Procesando..."
                },
                "profile": {
                    "title": "Configuración del Perfil",
                    "subtitle": "Administra tu información de cuenta y preferencias",
                    "personalInfo": "Información Personal",
                    "edit": "Editar Perfil",
                    "save": "Guardar Cambios",
                    "labels": {
                        "name": "Nombre Completo",
                        "email": "Correo Electrónico",
                        "bio": "Biografía",
                        "location": "Ubicación",
                        "website": "Sitio Web"
                    },
                    "placeholders": {
                        "bio": "Cuéntanos sobre ti...",
                        "location": "Ciudad, País",
                        "website": "https://tusitioweb.com"
                    },
                    "noData": "No especificado",
                    "noBio": "Sin biografía aún.",
                    "stats": {
                        "memberSince": "Miembro desde",
                        "successRate": "Tasa de Éxito"
                    },
                    "quickActions": {
                        "title": "Acciones Rápidas",
                        "export": "Exportar Datos",
                        "notifications": "Ajustes de Notificaciones",
                        "privacy": "Privacidad y Seguridad",
                        "billing": "Facturación y Suscripción"
                    },
                    "accountStatus": {
                        "title": "Estado de la Cuenta",
                        "plan": "Tipo de Plan",
                        "subscription": "Suscripción",
                        "renewal": "Fecha de Renovación",
                        "manage": "Administrar Suscripción"
                    },
                    "freeTier": {
                        "title": "Nivel Gratuito",
                        "remaining": "restante",
                        "generation": "generación",
                        "generations": "generaciones",
                        "exhausted": "Nivel gratuito agotado - Actualiza para continuar",
                        "watermark": "El contenido gratuito incluye marca de agua"
                    }
                }
            },
            "generator": {
                "studio": {
                    "enhance": "Optimizar",
                    "enhancing": "Refinando...",
                    "ideas": "Obtener Ideas",
                    "loadingIdeas": "Pensando...",
                    "conceptualInput": "Entrada Conceptual",
                    "technicalParameters": "Parámetros Técnicos",
                    "liveCanvas": "Lienzo de Evolución en Vivo",
                    "creativeVoid": "Entra en el Vacío Creativo",
                    "creativeVoidDesc": "Tus manifestaciones digitales se materializarán dentro de esta interfaz visual principal.",
                    "qualityNotice": "La generación de calidad consume créditos estándar.",
                    "systemIntegrated": "Sistema Integrado",
                    "engineVersion": "Motor Cinemático Pixora v2.0",
                    "chronicle": "Crónica",
                    "chronicleDesc": "Manifestaciones Anteriores"
                },
                "textToVideo": {
                    "title": "Texto → Video",
                    "subtitle": "Transforma tus ideas en videos impresionantes con IA",
                    "describe": "Describe tu Video",
                    "placeholder": "Describe la escena, ambiente, movimientos de cámara y detalles...",
                    "inspiration": "Necesitas inspiración? Prueba estos:",
                    "style": "Estilo de Video",
                    "duration": "Duración",
                    "settings": "Configuración de Video",
                    "advanced": "Configuración Avanzada",
                    "generate": "Generar Video",
                    "generating": "Generando Video...",
                    "preview": "Vista Previa",
                    "download": "Descargar",
                    "share": "Compartir",
                    "creating": "Creando tu Video",
                    "creatingSub": "Esto puede tomar unos momentos...",
                    "awaiting": "Tu Video Espera",
                    "awaitingSub": "Describe tu visión y genera tu primer video IA",
                    "useVideo": "Usar este Video",
                    "refining": "Refinando...",
                    "optimize": "Optimizar Prompt",
                    "promptHint": "Agrega una descripción primero para usar la optimización IA.",
                    "thinking": "Pensando...",
                    "getIdeas": "Obtener Ideas",
                    "aspectRatio": "Relación de Aspecto",
                    "model": "Modelo"
                },
                "imageToVideo": {
                    "title": "Imagen → Video",
                    "subtitle": "Da vida a tus imágenes estáticas con movimiento IA",
                    "visualSource": "Origen Visual",
                    "dropImage": "Suelta la Imagen de Origen",
                    "enhance": "Mejorar",
                    "ideas": "Ideas",
                    "motionStyle": "Estilo de Movimiento",
                    "duration": "Duración",
                    "resolution": "Resolución",
                    "highDef": "Alta Definición (HD)",
                    "animate": "Animar Imagen",
                    "animating": "Animando..."
                },
                "textToImage": {
                    "title": "Estudio de Imagen",
                    "subtitle": "Diseña la visual perfecta un prompt a la vez.",
                    "artisticStyle": "Estilo Artístico",
                    "aspectRatio": "Relación de Aspecto",
                    "modelAccuracy": "Precisión del Modelo",
                    "balancedPrecision": "Precisión Equilibrada",
                    "generate": "Generar Imagen",
                    "visualizing": "Visualizando..."
                },
                "imageToImage": {
                    "title": "Refinamiento de Imagen",
                    "subtitle": "Itera, mejora y perfecciona tus activos visuales.",
                    "base": "Base",
                    "mask": "Máscara",
                    "refinementStyle": "Estilo de Refinamiento",
                    "refine": "Refinar Imagen",
                    "transforming": "Transformando...",
                    "source": "Origen",
                    "optional": "Opcional"
                },

                "styles": {
                    "cinematic": "Cinematográfico",
                    "animated": "Animado",
                    "realistic": "Realista",
                    "artistic": "Artístico",
                    "cinematicDesc": "Secuencias dramáticas estilo cine",
                    "animatedDesc": "Efectos de animación estilizados",
                    "realisticDesc": "Movimiento fotorealista",
                    "artisticDesc": "Estilo artístico pictórico"
                }
            },
            "library": {
                "title": "Tu Biblioteca",
                "subtitle": "Administra y organiza tu contenido generado",
                "stats": {
                    "total": "Artículos Totales",
                    "images": "Imágenes",
                    "videos": "Videos",
                    "storage": "Almacenamiento Usado"
                },
                "search": "Buscar en tu biblioteca...",
                "filters": {
                    "all": "Todo el Contenido",
                    "images": "Imágenes",
                    "videos": "Videos"
                },
                "empty": {
                    "title": "Tu Biblioteca es Vacía",
                    "noResults": "No se encontraron artículos",
                    "subtitle": "Las imágenes y videos generados aparecerán aquí. ¡Comienza a crear contenido increíble con IA!",
                    "noResultsSub": "Prueba ajustando tu búsqueda o filtros.",
                    "start": "Empezar a Crear"
                },
                "actions": {
                    "view": "Ver en Pantalla Completa",
                    "download": "Descargar",
                    "share": "Compartir",
                    "delete": "Eliminar"
                },
                "messages": {
                    "downloadStart": "Preparando descarga...",
                    "downloadStarted": "¡Descarga iniciada!",
                    "downloadError": "Fallo en la descarga. Abriendo en nueva pestaña.",
                    "noUrl": "URL de descarga no disponible",
                    "shareTitle": "Compartir Contenido",
                    "shareDefault": "Contenido Generado por IA",
                    "shareSuccess": "¡Enlace copiado al portapapeles!",
                    "shareError": "Fallo al compartir. Por favor copia la URL manualmente.",
                    "deleteSuccess": "¡Contenido eliminado exitosamente!",
                    "deleteError": "Fallo al eliminar contenido"
                },
                "ui": {
                    "loading": "Cargando tu obra maestra...",
                    "untitled": "Creación Sin Título",
                    "noDescription": "Sin descripción.",
                    "deleteTitle": "¿Eliminar Contenido?",
                    "deleteConfirm": "¿Estás seguro de que quieres eliminar \"{{title}}\"? Esta acción no se puede deshacer.",
                    "cancel": "Cancelar",
                    "delete": "Eliminar",
                    "shareUrl": "Compartir URL",
                    "copyLink": "Copiar Enlace",
                    "copy": "Copiar"
                }
            },
            "templates": {
                "title": "Plantillas de Video",
                "subtitle": "Elige entre plantillas diseñadas profesionalmente",
                "searchPlaceholder": "Buscar plantillas...",
                "loading": "Cargando plantillas...",
                "noResults": "No se encontraron plantillas",
                "noResultsSub": "Intenta ajustando tu búsqueda o filtros",
                "preview": "Vista Previa",
                "useTemplate": "Usar Plantilla",
                "popular": "POPULAR",
                "credits": "créditos",
                "uses": "usos",
                "categories": {
                    "all": "Todo",
                    "business": "Negocios",
                    "social": "Redes Sociales",
                    "education": "Educación",
                    "entertainment": "Entretenimiento",
                    "personal": "Personal",
                    "other": "Otro"
                }
            },
            "refundPolicy": {
                "title": "Política de Reembolso",
                "subtitle": "Creemos en precios justos y transparentes. Así es como manejamos los reembolsos y devoluciones de créditos.",
                "creditPurchase": {
                    "title": "Compras de Créditos",
                    "desc1": "Si compras un paquete de créditos y no estás satisfecho, puedes solicitar un reembolso completo dentro de los 14 días posteriores a la compra, siempre que no hayas usado más del 10% de los créditos comprados.",
                    "desc2": "Los reembolsos de paquetes de créditos resultarán en la deducción de los créditos comprados de tu saldo."
                },
                "generationFailures": {
                    "title": "Fallos de Generación",
                    "desc": "Nuestro sistema detecta automáticamente si una generación falla. En tales casos, tus créditos se devuelven automáticamente a tu saldo al instante."
                },
                "subscriptions": {
                    "title": "Suscripciones",
                    "desc1": "Las suscripciones pueden cancelarse en cualquier momento desde tu panel. La cancelación evitará futuras renovaciones.",
                    "desc2": "Generalmente no ofrecemos reembolsos por períodos de suscripción parciales a menos que haya una interrupción del sistema."
                },
                "contact": "¿Necesitas ayuda?",
                "contactBtn": "Contactar Soporte"
            },
            "profile": {
                "title": "Ajustes de Perfil",
                "subtitle": "Gestiona tu información de cuenta y preferencias",
                "personalInfo": "Información Personal",
                "edit": "Editar Perfil",
                "save": "Guardar Cambios",
                "labels": {
                    "name": "Nombre Completo",
                    "email": "Correo Electrónico",
                    "bio": "Biografía",
                    "location": "Ubicación",
                    "website": "Sitio Web"
                },
                "stats": {
                    "memberSince": "Miembro desde",
                    "successRate": "Tasa de Éxito"
                },
                "quickActions": {
                    "title": "Acciones Rápidas",
                    "export": "Exportar Datos",
                    "notifications": "Ajustes de Notificación",
                    "privacy": "Privacidad y Seguridad",
                    "billing": "Facturación y Suscripción"
                },
                "accountStatus": {
                    "title": "Estado de Cuenta",
                    "plan": "Tipo de Plan",
                    "subscription": "Suscripción",
                    "renewal": "Fecha de Renovación",
                    "manage": "Gestionar Suscripción"
                },
                "freeTier": {
                    "title": "Nivel Gratuito",
                    "remaining": "restante",
                    "generation": "generación",
                    "generations": "generaciones",
                    "exhausted": "Nivel gratuito agotado - Actualiza para continuar",
                    "watermark": "El contenido gratuito incluye marca de agua"
                }
            },
            settings: {
                title: "Ajustes",
                subtitle: "Gestiona tus preferencias de cuenta",
                save: "Guardar Cambios",
                sections: {
                    notifications: "Notificaciones",
                    privacy: "Privacidad y Seguridad",
                    appearance: "Apariencia",
                    billing: "Facturación y Planes"
                },
                notifications: {
                    email: "Correo",
                    emailDesc: "Recibir notificaciones por correo",
                    push: "Push",
                    pushDesc: "Recibir notificaciones push",
                    projectUpdates: "Actualizaciones del Proyecto",
                    projectUpdatesDesc: "Recibir notificaciones de actualizaciones",
                    creditAlerts: "Alertas de Crédito",
                    creditAlertsDesc: "Recibir alertas de crédito"
                },
                privacy: {
                    profileVisibility: "Visibilidad del Perfil",
                    dataCollection: "Recolección de Datos",
                    dataCollectionDesc: "Permitir recolección de datos",
                    analytics: "Analítica",
                    analyticsDesc: "Permitir analítica"
                },
                appearance: {
                    theme: "Tema",
                    language: "Idioma",
                    options: {
                        dark: "Oscuro",
                        light: "Claro",
                        system: "Sistema"
                    }
                }
            },
            auth: {
                login: {
                    title: "Bienvenido de nuevo",
                    subtitle: "Inicia sesión para continuar creando",
                    emailPlaceholder: "Ingresa tu correo",
                    passwordPlaceholder: "Ingresa tu contraseña",
                    forgotPassword: "¿Olvidaste tu contraseña?",
                    submit: "Iniciar Sesión",
                    success: "¡Inicio de sesión exitoso!",
                    error: "Credenciales inválidas. Inténtalo de nuevo."
                },
                signup: {
                    title: "Crear Cuenta",
                    subtitle: "Únete a miles de creadores hoy",
                    nameLabel: "Nombre Completo",
                    namePlaceholder: "Ingresa tu nombre completo",
                    emailLabel: "Correo Electrónico",
                    passwordLabel: "Contraseña",
                    passwordPlaceholder: "Crea una contraseña segura",
                    confirmPasswordLabel: "Confirmar Contraseña",
                    confirmPasswordPlaceholder: "Confirma tu contraseña",
                    submit: "Crear Tu Cuenta",
                    terms: {
                        agree: "Acepto los",
                        service: "Términos de Servicio",
                        and: "y",
                        privacy: "Política de Privacidad"
                    },
                    errors: {
                        match: "Las contraseñas no coinciden"
                    },
                    requirements: {
                        length: "Al menos 8 caracteres",
                        uppercase: "Una letra mayúscula",
                        number: "Un número",
                        special: "Un carácter especial"
                    }
                },
                forgotPassword: {
                    title: "Restablecer tu contraseña",
                    subtitle: "Ingresa tu correo y te enviaremos un código",
                    emailPlaceholder: "Ingresa tu correo",
                    submit: "Enviar Código",
                    sending: "Enviando...",
                    success: "¡Código enviado! Revisa tu correo.",
                    error: {
                        noEmail: "Ingresa tu correo",
                        failed: "Error al enviar código"
                    },
                    helpText: "Enviaremos un código de 6 dígitos"
                },
                resendVerification: {
                    title: "Reenviar Verificación",
                    subtitle: "¿No recibiste el enlace? Ingresa tu correo.",
                    emailLabel: "Correo Electrónico",
                    emailPlaceholder: "Ingresa tu correo",
                    submit: "Reenviar",
                    sending: "Enviando...",
                    successTitle: "Enviado",
                    successDesc: "Un nuevo enlace ha sido enviado a",
                    error: "Error al enviar correo"
                },
                resetPassword: {
                    title: "Nueva Contraseña",
                    subtitle: "Crea tu nueva contraseña",
                    passwordPlaceholder: "Nueva contraseña",
                    confirmPlaceholder: "Confirmar contraseña",
                    submit: "Restablecer",
                    resetting: "Restableciendo...",
                    success: "¡Contraseña restablecida!",
                    error: {
                        required: "Requerido",
                        length: "Mínimo 6 caracteres",
                        confirm: "Confirma la contraseña",
                        mismatch: "No coinciden",
                        failed: "Error"
                    },
                    strength: {
                        title: "Fortaleza",
                        vWeak: "Muy débil",
                        weak: "Débil",
                        fair: "Regular",
                        good: "Buena",
                        strong: "Fuerte"
                    },
                    requirements: {
                        title: "Requisitos:",
                        length: "Mínimo 6 caracteres",
                        match: "Deben coincidir"
                    }
                },
                verify: {
                    title: "Verificar Cuenta",
                    resetTitle: "Verificar Restablecimiento",
                    subtitle: "Ingresa el código de 6 dígitos",
                    resetSubtitle: "Ingresa el código para restablecer",
                    sentTo: "Enviado a",
                    submit: "Verificar",
                    resendPrefix: "¿No tienes código?",
                    resendLink: "Reenviar",
                    resending: "Enviando...",
                    back: "Volver al Login",
                    success: "¡Verificado!",
                    error: {
                        incomplete: "Ingresa el código",
                        failed: "Error",
                        resendFailed: "Error al reenviar"
                    },
                    resendSuccess: "¡Código reenviado!"
                }
            },
            landing: {
                navbar: {
                    features: "Características",
                    templates: "Plantillas",
                    pricing: "Precios",
                    contact: "Contacto",
                    signIn: "Iniciar Sesión",
                    getStarted: "Empezar Gratis",
                    dropdowns: {
                        videoGen: "Generación de Video IA",
                        videoGenDesc: "Crea videos con IA",
                        smartTemplates: "Plantillas Inteligentes",
                        smartTemplatesDesc: "500+ plantillas",
                        creditSystem: "Sistema de Créditos",
                        creditSystemDesc: "Pago por uso"
                    }
                },
                footer: {
                    description: "Crea videos impresionantes con herramientas impulsadas por IA que entienden tu visión. Únete a miles de creadores transformando su flujo de trabajo.",
                    stayInLoop: "Mantente al día",
                    updates: "Recibe las últimas actualizaciones sobre nuevas funciones, plantillas y avances de IA.",
                    subscribe: "Suscribirse",
                    emailPlaceholder: "Ingresa tu correo",
                    product: "Producto",
                    resources: "Recursos",
                    company: "Empresa",
                    madeWith: "Hecho con",
                    forCreators: "para creadores de todo el mundo.",
                    links: {
                        features: "Características",
                        templates: "Plantillas",
                        pricing: "Precios",
                        useCases: "Casos de Uso",
                        apiDocs: "Docs API",
                        docs: "Documentación",
                        helpCenter: "Centro de Ayuda",
                        blog: "Blog",
                        community: "Comunidad",
                        tutorials: "Tutoriales",
                        about: "Nosotros",
                        careers: "Carreras",
                        contact: "Contacto",
                        press: "Kit de Prensa",
                        legal: "Legal",
                        privacy: "Política de Privacidad",
                        terms: "Términos de Servicio",
                        cookies: "Cookies",
                        refund: "Política de Reembolso"
                    }
                },
                hero: {
                    title: {
                        start: "Experimenta",
                        highlight: "Movimiento IA",
                        end: "Como Nunca Antes"
                    },
                    description: "Diseñado para creadores de próxima generación — Pixora te ayuda a crear videos cinematográficos y campañas animadas con automatización inteligente.",
                    startFree: "Empezar Gratis",
                    exploreDemos: "Explorar Demos"
                },
                features: {
                    badge: "Por Qué los Creadores Aman Pixora",
                    title: {
                        start: "Diseñado para",
                        highlight: "Excelencia Creativa"
                    },
                    description: "Transforma tu flujo de trabajo creativo con herramientas impulsadas por IA que entienden tu visión y amplifican tu productividad.",
                    learnMore: "Aprender Más",
                    items: {
                        videoGen: {
                            title: "Generación de Video IA",
                            desc: "Produce videos publicitarios realistas en segundos con nuestro motor Comet que entiende contexto y emoción con redes neuronales avanzadas.",
                            stats: "2.3s promedio",
                            highlights: {
                                h1: "Renderizado en tiempo real",
                                h2: "Calidad 4K",
                                h3: "60 FPS"
                            }
                        },
                        smartTemplates: {
                            title: "Plantillas Inteligentes",
                            desc: "Elige entre cientos de ajustes preestablecidos de anuncios animados para cada industria, todos personalizables con edición impulsada por IA y marca automática.",
                            stats: "500+ plantillas",
                            highlights: {
                                h1: "Marca automática",
                                h2: "Aplicación en un clic",
                                h3: "Personalizable"
                            }
                        },
                        creditSystem: {
                            title: "Sistema de Créditos",
                            desc: "Paga solo por lo que generas. Precios flexibles para creadores y marcas con descuentos por volumen y soluciones empresariales.",
                            stats: "Pago por uso",
                            highlights: {
                                h1: "Sin suscripciones",
                                h2: "Descuentos por volumen",
                                h3: "Planes empresariales"
                            }
                        }
                    }
                },
                templates: {
                    title: "Plantillas",
                    titleHighlight: "Premium",
                    description: "Plantillas diseñadas profesionalmente para impulsar tus proyectos creativos con personalización impulsada por IA",
                    cardDesc: "Plantilla diseñada profesionalmente con opciones de personalización impulsada por IA e integración perfecta.",
                    useTemplate: "Usar Plantilla",
                    categories: {
                        business: "Negocios",
                        marketing: "Marketing",
                        corporate: "Corporativo",
                        creative: "Creativo",
                        minimal: "Minimalista",
                        modern: "Moderno"
                    }
                },
                pricing: {
                    badge: "Precios Transparentes",
                    title: "Simple, Transparente",
                    titleHighlight: "Precios",
                    description: "Elige el plan adecuado para ti. Cambia o cancela en cualquier momento.",
                    joinText: "Únete a 50,000+ creadores",
                    descriptionEnd: "ya creando con Pixora.",
                    popularBadge: "MÁS POPULAR",
                    period: "/mes",
                    save: "Ahorra",
                    savings: "35% ahorro",
                    plans: {
                        free: {
                            name: "Gratis",
                            price: "$0",
                            credits: "10/mes",
                            desc: "Perfecto para explorar Pixora.",
                            button: "Empezar",
                            features: {
                                f1: "Generación básica de imágenes",
                                f2: "Calidad estándar",
                                f3: "Soporte comunitario",
                                f4: "Exportaciones con marca de agua"
                            }
                        },
                        pro: {
                            name: "Pro",
                            price: "$19",
                            credits: "500/mes",
                            desc: "Para creadores serios.",
                            button: "Suscribirse Ahora",
                            features: {
                                f1: "Todas las herramientas IA",
                                f2: "Alta calidad",
                                f3: "Soporte prioritario",
                                f4: "Sin marcas de agua",
                                f5: "Uso comercial"
                            }
                        },
                        enterprise: {
                            name: "Empresa",
                            price: "$99",
                            credits: "Ilimitado",
                            desc: "Para equipos y usuarios avanzados.",
                            button: "Contactar Ventas",
                            features: {
                                f1: "Todas las funciones Pro",
                                f2: "Ultra calidad",
                                f3: "Soporte dedicado",
                                f4: "Modelos personalizados",
                                f5: "Acceso API"
                            }
                        }
                    }
                },
                cta: {
                    badge: "Únete a Creadores Activos",
                    title: {
                        start: "Listo para Crear tu",
                        highlight: "Primera Obra Maestra de IA"
                    },
                    titleEnd: "?",
                    description: "Únete a miles de creadores que ya están produciendo videos e imágenes impresionantes con la avanzada tecnología IA de Pixora.",
                    features: {
                        noCard: "No se requiere tarjeta de crédito",
                        trial: "3 Generaciones Gratis",
                        fastStart: "Generación instantánea"
                    },
                    buttons: {
                        startTrial: "Empieza a Crear Ahora",
                        watchDemo: "Explorar Galería"
                    },
                    trustedBy: "Con la confianza de equipos creativos en todo el mundo"
                }
            }
        }
    },
    fr: {
        translation: {
            "common": {
                "loading": "Chargement...",
                "error": "Erreur",
                "success": "Succès",
                "viewAll": "Voir tout",
                "backToHome": "Retour à l'accueil",
                "logout": "Déconnexion",
                "signoutText": "Se déconnecter du compte",
                "language": "Langue",
                "credits": "Crédits",
                "free": "Gratuit",
                "brandName": "Pixora Studio"
            },
            "sidebar": {
                "overview": "Aperçu",
                "templates": "Modèles",
                "community": "Communauté",
                "library": "Bibliothèque",
                "billing": "Facturation",
                "profile": "Profil",
                "help": "Aide",
                "generators": "Générateurs IA",
                "textToVideo": "Texte en Vidéo",
                "imageToVideo": "Image en Vidéo",
                "textToImage": "Texte en Image",
                "imageToImage": "Image en Image",
                "adminPanel": "Admin",
                "admin": {
                    "dashboard": "Tableau de bord",
                    "templates": "Modèles",
                    "users": "Utilisateurs",
                    "payments": "Paiements",
                    "models": "Modèles IA",
                    "analytics": "Analytique",
                    "community": "Communauté",
                    "help": "Aide",
                    "portal": "Portail Admin",
                    "superAdmin": "Super Admin",
                    "administrator": "Administrateur"
                },
                "upgradeNow": "Mettre à Niveau",
                "unlockPremium": "Débloquer le Premium",
                "unlockPremiumDesc": "Obtenez des générations illimitées, un support prioritaire et des modèles exclusifs.",
                "status": {
                    "title": "État du Système",
                    "operational": "Tous les systèmes sont opérationnels"
                }
            },
            "admin": {
                "dashboard": {
                    "title": "Tableau de Bord Admin",
                    "subtitle": "Aperçu et Gestion du Système",
                    "loading": "Chargement du tableau de bord...",
                    "error": "Erreur lors du chargement du tableau de bord",
                    "stats": {
                        "totalUsers": "Utilisateurs Totaux",
                        "totalRevenue": "Revenu Total",
                        "activeSubs": "Abonnements Actifs",
                        "pendingApprovals": "Approbations en Attente",
                        "today": "aujourd'hui",
                        "thisMonth": "ce mois-ci",
                        "allActive": "Tous actifs",
                        "requiresAttention": "Nécessite une attention",
                        "allClear": "Tout est clair"
                    },
                    "activity": {
                        "title": "Activité Récente",
                        "viewAll": "Voir Tout",
                        "noActivity": "Aucune activité récente",
                        "credits": "crédits"
                    },
                    "actions": {
                        "users": {
                            "title": "Gérer les Utilisateurs",
                            "desc": "Voir et gérer tous les utilisateurs, rôles et permissions",
                            "cta": "Aller aux Utilisateurs"
                        },
                        "payments": {
                            "title": "Paiements",
                            "desc": "Examiner les transactions et gérer les approbations",
                            "cta": "Voir les Paiements"
                        },
                        "analytics": {
                            "title": "Analytique",
                            "desc": "Voir les rapports et analyses détaillés",
                            "cta": "Voir l'Analytique"
                        },
                        "help": {
                            "title": "Contenu d'Aide",
                            "desc": "Gérer les tutoriels et la FAQ",
                            "cta": "Gérer le Contenu"
                        }
                    }
                }
            },
            "dashboard": {
                "welcomeTitle": "Bienvenue à",
                "welcomeSubtitle": "Créez des visuels époustouflants, des animations et des vidéos grâce à une technologie IA de pointe.",
                "newProject": "Nouveau Projet",
                "stats": {
                    "projects": "Projets Créés",
                    "credits": "Crédits Utilisés",
                    "timeSaved": "Temps Gagné"
                },
                "exploreTemplates": {
                    "title": "Explorer les Modèles",
                    "unavailable": "Indisponible",
                    "duration": "Durée",
                    "rating": "Évaluation",
                    "uses": "Utilisations",
                    "cost": "Coût",
                    "useTemplate": "Utiliser le Modèle",
                    "noTemplates": "Aucun modèle disponible",
                    "noTemplatesDesc": "Il n'y a aucun modèle actif disponible pour le moment. Revenez bientôt !",
                    "exploreAll": "Explorer tous les modèles"
                },
                "quickStart": {
                    "t2v": { "title": "Texte → Vidéo", "desc": "Transformez vos descriptions en vidéos époustouflantes avec l'IA" },
                    "i2v": { "title": "Image → Vidéo", "desc": "Animez vos images avec un mouvement cinématographique" },
                    "t2i": { "title": "Texte → Image", "desc": "Générez des images photoréalistes à partir de texte" },
                    "i2i": { "title": "Image → Image", "desc": "Transformez et améliorez vos images avec la magie de l'IA" },
                    "trending": "Tendance",
                    "startCreating": "Commencer à créer"
                },
                "popularTemplates": "Modèles Populaires",
                "browseAll": "Tout parcourir",
                "useTemplate": "Utiliser le modèle",
                "recommended": "Recommandé pour vous",
                "recentProjects": "Projets Récents",
                "explorePack": "Explorer le pack",
                "viewAll": "Voir tout",
                billing: {
                    title: "Facturation et Crédits",
                    subtitle: "Gérez votre abonnement et achetez des crédits",
                    tabs: {
                        credits: "Acheter des Crédits",
                        subscription: "Abonnement",
                        history: "Historique des Transactions"
                    },
                    credits: {
                        title: "Packs de Crédits",
                        discount: "Remises sur volume disponibles",
                        save: "Économisez",
                        purchase: "Acheter Maintenant",
                        processing: "Traitement...",
                        paymentMethods: "Méthodes de Paiement",
                        addPayment: "Ajouter Méthode de Paiement",
                        packs: {
                            basic: { features: ["Génération basique", "Qualité standard", "Support email"] },
                            pro: { features: ["Toutes fonctions basiques", "Haute qualité", "Support prioritaire", "Traitement plus rapide"] },
                            ultra: { features: ["Toutes fonctions premium", "Qualité Ultra", "Support 24/7", "Traitement par lots", "Licence commerciale"] }
                        }
                    },
                    subscription: {
                        current: "Plan Actuel",
                        active: "Votre abonnement actif",
                        renews: "Renouvelle le",
                        includes: "Votre Plan Inclut",
                        upgrade: "Mettre à niveau ou Changer de Plan",
                        choose: "Choisissez Votre Plan",
                        selected: "Plan Actuel",
                        select: "Sélectionner Plan"
                    },
                    history: {
                        title: "Historique des Transactions",
                        export: "Exporter CSV"
                    },
                    success: "Succès !",
                    error: "Erreur de Paiement",
                    creditsAdded: "Crédits ajoutés avec succès !",
                    subscriptionActive: "Abonnement activé avec succès !",
                    processing: "Traitement..."
                },
                "profile": {
                    "title": "Paramètres du Profil",
                    "subtitle": "Gérez vos informations de compte et préférences",
                    "personalInfo": "Informations Personnelles",
                    "edit": "Modifier le Profil",
                    "save": "Enregistrer les Modifications",
                    "labels": {
                        "name": "Nom Complet",
                        "email": "Adresse E-mail",
                        "bio": "Bio",
                        "location": "Localisation",
                        "website": "Site Web"
                    },
                    "placeholders": {
                        "bio": "Parlez-nous de vous...",
                        "location": "Ville, Pays",
                        "website": "https://vootresiteweb.com"
                    },
                    "noData": "Non spécifié",
                    "noBio": "Pas de bio encore.",
                    "stats": {
                        "memberSince": "Membre depuis",
                        "successRate": "Taux de Réussite"
                    },
                    "quickActions": {
                        "title": "Actions Rapides",
                        "export": "Exporter les Données",
                        "notifications": "Paramètres de Notification",
                        "privacy": "Confidentialité et Sécurité",
                        "billing": "Facturation et Abonnement"
                    },
                    "accountStatus": {
                        "title": "État du Compte",
                        "plan": "Type de Plan",
                        "subscription": "Abonnement",
                        "renewal": "Date de Renouvellement",
                        "manage": "Gérer l'Abonnement",
                    },
                    "freeTier": {
                        "title": "Niveau Gratuit",
                        "remaining": "restant",
                        "generation": "génération",
                        "generations": "générations",
                        "exhausted": "Niveau gratuit épuisé - Passez à l'offre supérieure pour continuer",
                        "watermark": "Le contenu gratuit inclut un filigrane"
                    }
                }
            },
            "generator": {
                "studio": {
                    "enhance": "Optimiser",
                    "enhancing": "Raffinement...",
                    "ideas": "Obtenir des Idées",
                    "loadingIdeas": "Réflexion...",
                    "conceptualInput": "Entrée Conceptuelle",
                    "technicalParameters": "Paramètres Techniques",
                    "liveCanvas": "Canevas d'Évolution en Direct",
                    "creativeVoid": "Entrez dans le Vide Créatif",
                    "creativeVoidDesc": "Vos manifestations numériques se matérialiseront dans cette interface visuelle principale.",
                    "qualityNotice": "La génération de qualité consomme des crédits standard.",
                    "systemIntegrated": "Système Intégré",
                    "engineVersion": "Moteur Cinématique Pixora v2.0",
                    "chronicle": "Chronique",
                    "chronicleDesc": "Manifestations Précédentes"
                },
                "textToVideo": {
                    "title": "Texte → Vidéo",
                    "subtitle": "Transformez vos idées en vidéos époustouflantes avec l'IA",
                    "describe": "Décrivez votre Vidéo",
                    "placeholder": "Décrivez la scène, l'ambiance, les mouvements de caméra et les détails que vous souhaitez dans votre vidéo...",
                    "inspiration": "Besoin d'inspiration ? Essayez ceci :",
                    "style": "Style Vidéo",
                    "duration": "Durée",
                    "settings": "Paramètres Vidéo",
                    "advanced": "Paramètres Avancés",
                    "generate": "Générer Vidéo",
                    "generating": "Génération de Vidéo...",
                    "preview": "Aperçu Vidéo",
                    "download": "Télécharger",
                    "share": "Partager",
                    "creating": "Création de votre Vidéo",
                    "creatingSub": "Cela peut prendre quelques instants...",
                    "awaiting": "Votre Vidéo Attend",
                    "awaitingSub": "Décrivez votre vision et générez votre première vidéo IA",
                    "useVideo": "Utiliser cette Vidéo",
                    "refining": "Raffinement...",
                    "optimize": "Optimiser le Prompt",
                    "promptHint": "Ajoutez d'abord une description pour utiliser l'optimisation IA.",
                    "thinking": "Réflexion...",
                    "getIdeas": "Obtenir des Idées",
                    "aspectRatio": "Ratio d'Aspect",
                    "model": "Modèle"
                },
                "imageToVideo": {
                    "title": "Image → Vidéo",
                    "subtitle": "Donnez vie à vos images statiques avec le mouvement IA",
                    "visualSource": "Source Visuelle",
                    "dropImage": "Déposez l'image source",
                    "enhance": "Améliorer",
                    "ideas": "Idées",
                    "motionStyle": "Style de Mouvement",
                    "duration": "Durée",
                    "resolution": "Résolution",
                    "highDef": "Haute Définition (HD)",
                    "animate": "Animer l'Image",
                    "animating": "Animation..."
                },
                "textToImage": {
                    "title": "Studio Image",
                    "subtitle": "Concevez le visuel parfait, un prompt à la fois.",
                    "artisticStyle": "Style Artistique",
                    "aspectRatio": "Ratio d'Aspect",
                    "modelAccuracy": "Précision du Modèle",
                    "balancedPrecision": "Précision Équilibrée",
                    "generate": "Générer l'Image",
                    "visualizing": "Visualisation..."
                },
                "imageToImage": {
                    "title": "Raffinement d'Image",
                    "subtitle": "Itez, améliorez et perfectionnez vos actifs visuels.",
                    "base": "Base",
                    "mask": "Masque",
                    "refinementStyle": "Style de Raffinement",
                    "refine": "Raffiner l'Image",
                    "transforming": "Transformation...",
                    "source": "Source",
                    "optional": "Optionnel"
                },

                "styles": {
                    "cinematic": "Cinématographique",
                    "animated": "Animé",
                    "realistic": "Réaliste",
                    "artistic": "Artistique",
                    "cinematicDesc": "Séquences dramatiques de style cinéma",
                    "animatedDesc": "Effets d'animation stylisés",
                    "realisticDesc": "Mouvement photoréaliste",
                    "artisticDesc": "Style artistique pictural"
                }
            },
            "library": {
                "title": "Votre Bibliothèque",
                "subtitle": "Gérez et organisez votre contenu généré",
                "stats": {
                    "total": "Total des Éléments",
                    "images": "Images",
                    "videos": "Vidéos",
                    "storage": "Espace Utilisé"
                },
                "search": "Rechercher dans votre bibliothèque...",
                "filters": {
                    "all": "Tout le Contenu",
                    "images": "Images",
                    "videos": "Vidéos"
                },
                "empty": {
                    "title": "Votre Bibliothèque est Vide",
                    "noResults": "Aucun élément trouvé",
                    "subtitle": "Les images et vidéos générées apparaîtront ici. Commencez à créer du contenu incroyable avec l'IA !",
                    "noResultsSub": "Essayez d'ajuster votre recherche ou vos filtres.",
                    "start": "Commencer à Créer"
                },
                "actions": {
                    "view": "Plein Écran",
                    "download": "Télécharger",
                    "share": "Partager",
                    "delete": "Supprimer"
                },
                "messages": {
                    "downloadStart": "Préparation du téléchargement...",
                    "downloadStarted": "Téléchargement commencé !",
                    "downloadError": "Échec du téléchargement. Ouverture dans un nouvel onglet.",
                    "noUrl": "URL de téléchargement non disponible",
                    "shareTitle": "Partager le Contenu",
                    "shareDefault": "Contenu Généré par IA",
                    "shareSuccess": "Lien copié dans le presse-papiers !",
                    "shareError": "Échec du partage. Veuillez copier l'URL manuellement.",
                    "deleteSuccess": "Contenu supprimé avec succès !",
                    "deleteError": "Échec de la suppression du contenu"
                },
                "ui": {
                    "loading": "Chargement de votre chef-d'œuvre...",
                    "untitled": "Création Sans Titre",
                    "noDescription": "Aucune description fournie.",
                    "deleteTitle": "Supprimer le Contenu ?",
                    "deleteConfirm": "Êtes-vous sûr de vouloir supprimer \"{{title}}\" ? Cette action est irréversible.",
                    "cancel": "Annuler",
                    "delete": "Supprimer",
                    "shareUrl": "Partager URL",
                    "copyLink": "Copier le Lien",
                    "copy": "Copier"
                }
            },
            "templates": {
                "title": "Modèles Vidéo",
                "subtitle": "Choisissez parmi des modèles conçus par des professionnels",
                "searchPlaceholder": "Rechercher des modèles...",
                "loading": "Chargement des modèles...",
                "noResults": "Aucun modèle trouvé",
                "noResultsSub": "Essayez d'ajuster votre recherche ou vos filtres",
                "preview": "Aperçu",
                "useTemplate": "Utiliser le modèle",
                "popular": "POPULAIRE",
                "credits": "crédits",
                "uses": "utilisations",
                "categories": {
                    "all": "Tout",
                    "business": "Affaires",
                    "social": "Réseaux Sociaux",
                    "education": "Éducation",
                    "entertainment": "Divertissement",
                    "personal": "Personnel",
                    "other": "Autre"
                }
            },
            "refundPolicy": {
                "title": "Politique de Remboursement",
                "subtitle": "Nous croyons en une tarification juste et transparente. Voici comment nous traitons les remboursements.",
                "creditPurchase": {
                    "title": "Achats de Crédits",
                    "desc1": "Si vous achetez un pack de crédits et n'êtes pas satisfait, vous pouvez demander un remboursement complet dans les 14 jours, à condition de ne pas avoir utilisé plus de 10% des crédits.",
                    "desc2": "Les remboursements de packs de crédits entraîneront la déduction des crédits achetés de votre solde."
                },
                "generationFailures": {
                    "title": "Échecs de Génération",
                    "desc": "Notre système détecte automatiquement si une génération échoue. Dans ce cas, vos crédits sont automatiquement restitués à votre solde instantanément."
                },
                "subscriptions": {
                    "title": "Abonnements",
                    "desc1": "Les abonnements peuvent être annulés à tout moment. L'annulation empêchera les renouvellements futurs.",
                    "desc2": "Nous n'offrons généralement pas de remboursements pour les périodes d'abonnement partiel sauf en cas de panne système."
                },
                "contact": "Besoin d'aide ?",
                "contactBtn": "Contacter le Support"
            },
            "profile": {
                "title": "Paramètres du Profil",
                "subtitle": "Gérez vos informations de compte et préférences",
                "personalInfo": "Informations Personnelles",
                "edit": "Modifier le Profil",
                "save": "Enregistrer",
                "labels": {
                    "name": "Nom Complet",
                    "email": "Adresse Email",
                    "bio": "Bio",
                    "location": "Emplacement",
                    "website": "Site Web"
                },
                "stats": {
                    "memberSince": "Membre depuis",
                    "successRate": "Taux de Succès"
                },
                "quickActions": {
                    "title": "Actions Rapides",
                    "export": "Exporter Données",
                    "notifications": "Paramètres de Notification",
                    "privacy": "Confidentialité et Sécurité",
                    "billing": "Facturation et Abonnement"
                },
                "accountStatus": {
                    "title": "Statut du Compte",
                    "plan": "Type de Plan",
                    "subscription": "Abonnement",
                    "renewal": "Date de Renouvellement",
                    "manage": "Gérer l'Abonnement"
                }
            },
            settings: {
                title: "Paramètres",
                subtitle: "Gérez vos préférences de compte",
                save: "Enregistrer",
                sections: {
                    notifications: "Notifications",
                    privacy: "Confidentialité et Sécurité",
                    appearance: "Apparence",
                    billing: "Facturation et Plans"
                },
                notifications: {
                    email: "Email",
                    emailDesc: "Recevoir notifications par email",
                    push: "Push",
                    pushDesc: "Recevoir notifications push",
                    projectUpdates: "Mises à jour Projet",
                    projectUpdatesDesc: "Recevoir mises à jour du projet",
                    creditAlerts: "Alertes Crédit",
                    creditAlertsDesc: "Recevoir alertes de crédit"
                },
                privacy: {
                    profileVisibility: "Visibilité du Profil",
                    dataCollection: "Collecte de Données",
                    dataCollectionDesc: "Autoriser la collecte de données",
                    analytics: "Analytique",
                    analyticsDesc: "Autoriser l'analytique"
                },
                appearance: {
                    theme: "Thème",
                    language: "Langue",
                    options: {
                        dark: "Sombre",
                        light: "Clair",
                        system: "Système"
                    }
                }
            },
            auth: {
                login: {
                    title: "Bon retour",
                    subtitle: "Connectez-vous pour continuer à créer",
                    emailPlaceholder: "Entrez votre email",
                    passwordPlaceholder: "Entrez votre mot de passe",
                    forgotPassword: "Mot de passe oublié ?",
                    submit: "Se Connecter",
                    success: "Connexion réussie !",
                    error: "Identifiants invalides. Veuillez réessayer."
                },
                signup: {
                    title: "Créer un Compte",
                    subtitle: "Rejoignez des milliers de créateurs aujourd'hui",
                    nameLabel: "Nom Complet",
                    namePlaceholder: "Entrez votre nom complet",
                    emailLabel: "Adresse Email",
                    passwordLabel: "Mot de Passe",
                    passwordPlaceholder: "Créez un mot de passe fort",
                    confirmPasswordLabel: "Confirmer le Mot de Passe",
                    confirmPasswordPlaceholder: "Confirmez votre mot de passe",
                    submit: "Créer Votre Compte",
                    terms: {
                        agree: "J'accepte les",
                        service: "Conditions d'Utilisation",
                        and: "et",
                        privacy: "Politique de Confidentialité"
                    },
                    errors: {
                        match: "Les mots de passe ne correspondent pas"
                    },
                    requirements: {
                        length: "Au moins 8 caractères",
                        uppercase: "Une lettre majuscule",
                        number: "Un chiffre",
                        special: "Un caractère spécial"
                    }
                },
                forgotPassword: {
                    title: "Réinitialiser le mot de passe",
                    subtitle: "Entrez votre email et nous vous enverrons un code",
                    emailPlaceholder: "Votre email",
                    submit: "Envoyer code",
                    sending: "Envoi...",
                    success: "Code envoyé ! Vérifiez vos emails.",
                    error: {
                        noEmail: "Email requis",
                        failed: "Échec de l'envoi"
                    },
                    helpText: "Nous enverrons un code de 6 chiffres"
                },
                resendVerification: {
                    title: "Renvoyer vérification",
                    subtitle: "Pas reçu le lien ?",
                    emailLabel: "Email",
                    emailPlaceholder: "Email",
                    submit: "Renvoyer",
                    sending: "Envoi...",
                    successTitle: "Envoyé",
                    successDesc: "Un nouveau lien a été envoyé à",
                    error: "Échec de l'envoi"
                },
                resetPassword: {
                    title: "Nouveau mot de passe",
                    subtitle: "Créez votre nouveau mot de passe",
                    passwordPlaceholder: "Nouveau mot de passe",
                    confirmPlaceholder: "Confirmer mot de passe",
                    submit: "Réinitialiser",
                    resetting: "Réinitialisation...",
                    success: "Mot de passe réinitialisé !",
                    error: {
                        required: "Requis",
                        length: "6 caractères min",
                        confirm: "Confirmez le mot de passe",
                        mismatch: "Ne correspondent pas",
                        failed: "Échec"
                    },
                    strength: {
                        title: "Force",
                        vWeak: "Très faible",
                        weak: "Faible",
                        fair: "Moyen",
                        good: "Bon",
                        strong: "Fort"
                    },
                    requirements: {
                        title: "Requis:",
                        length: "Min 6 caractères",
                        match: "Doivent correspondre"
                    }
                },
                verify: {
                    title: "Vérifier Compte",
                    resetTitle: "Vérifier Réinitialisation",
                    subtitle: "Entrez le code à 6 chiffres",
                    resetSubtitle: "Entrez le code pour réinitialiser",
                    sentTo: "Envoyé à",
                    submit: "Vérifier",
                    resendPrefix: "Pas de code ?",
                    resendLink: "Renvoyer",
                    resending: "Envoi...",
                    back: "Retour Login",
                    success: "Vérifié !",
                    error: {
                        incomplete: "Entrez le code",
                        failed: "Échec",
                        resendFailed: "Échec renvoi"
                    },
                    resendSuccess: "Code renvoyé !"
                }
            },
            landing: {
                navbar: {
                    features: "Fonctionnalités",
                    templates: "Modèles",
                    pricing: "Tarification",
                    contact: "Contact",
                    signIn: "Se Connecter",
                    getStarted: "Commencer Gratuitement",
                    dropdowns: {
                        videoGen: "Génération Vidéo IA",
                        videoGenDesc: "Créez des vidéos avec l'IA",
                        smartTemplates: "Modèles Intelligents",
                        smartTemplatesDesc: "500+ modèles",
                        creditSystem: "Système de Crédit",
                        creditSystemDesc: "Paiement à l'usage"
                    }
                },
                footer: {
                    description: "Créez des vidéos époustouflantes avec des outils IA qui comprennent votre vision. Rejoignez des milliers de créateurs transformant leur flux de travail.",
                    stayInLoop: "Restez informé",
                    updates: "Recevez les dernières mises à jour sur les nouvelles fonctionnalités, modèles et avancées de l'IA.",
                    subscribe: "S'abonner",
                    emailPlaceholder: "Entrez votre email",
                    product: "Produit",
                    resources: "Ressources",
                    company: "Entreprise",
                    madeWith: "Fait avec",
                    forCreators: "pour les créateurs du monde entier.",
                    links: {
                        features: "Fonctionnalités",
                        templates: "Modèles",
                        pricing: "Tarification",
                        useCases: "Cas d'Utilisation",
                        apiDocs: "Docs API",
                        docs: "Documentation",
                        helpCenter: "Centre d'Aide",
                        blog: "Blog",
                        community: "Communauté",
                        tutorials: "Tutoriels",
                        about: "À Propos",
                        careers: "Carrières",
                        contact: "Contact",
                        press: "Presse",
                        legal: "Légal",
                        privacy: "Confidentialité",
                        terms: "Conditions",
                        cookies: "Cookies",
                        refund: "Politique de Remboursement"
                    }
                },
                hero: {
                    title: {
                        start: "Découvrez",
                        highlight: "Le Mouvement IA",
                        end: "Comme Jamais Auparavant"
                    },
                    description: "Conçu pour les créateurs de nouvelle génération — Pixora vous aide à créer des vidéos cinématographiques et des campagnes animées avec une automatisation intelligente.",
                    startFree: "Commencer Gratuitement",
                    exploreDemos: "Explorer les démos"
                },
                features: {
                    badge: "Pourquoi les Créateurs Aiment Pixora",
                    title: {
                        start: "Conçu pour",
                        highlight: "L'Excellence Créative"
                    },
                    description: "Transformez votre flux de travail créatif avec des outils alimentés par l'IA qui comprennent votre vision et amplifient votre productivité.",
                    learnMore: "En savoir plus",
                    items: {
                        videoGen: {
                            title: "Génération Vidéo IA",
                            desc: "Produisez des vidéos publicitaires réalistes en quelques secondes avec notre moteur Comet qui comprend le contexte et l'émotion grâce à des réseaux neuronaux avancés.",
                            stats: "2.3s génération moy.",
                            highlights: {
                                h1: "Rendu en temps réel",
                                h2: "Qualité 4K",
                                h3: "60 FPS"
                            }
                        },
                        smartTemplates: {
                            title: "Modèles Intelligents",
                            desc: "Choisissez parmi des centaines de préréglages publicitaires animés pour chaque industrie, tous personnalisables avec une édition assistée par IA et une image de marque automatique.",
                            stats: "500+ modèles",
                            highlights: {
                                h1: "Image de marque auto",
                                h2: "Application en un clic",
                                h3: "Personalizable"
                            }
                        },
                        creditSystem: {
                            title: "Système de Crédit",
                            desc: "Payez uniquement ce que vous générez. Tarification flexible pour les créateurs et les marques avec des remises sur volume et des solutions d'entreprise.",
                            stats: "Paiement à l'usage",
                            highlights: {
                                h1: "Pas d'abonnement",
                                h2: "Remises sur volume",
                                h3: "Plans d'entreprise"
                            }
                        }
                    }
                },
                templates: {
                    title: "Modèles",
                    titleHighlight: "Premium",
                    description: "Modèles conçus par des professionnels pour démarrer vos projets créatifs avec une personnalisation assistée par IA",
                    cardDesc: "Modèle professionnel avec options de personnalisation IA et intégration transparente.",
                    useTemplate: "Utiliser le Modèle",
                    categories: {
                        business: "Affaires",
                        marketing: "Marketing",
                        corporate: "Entreprise",
                        creative: "Créatif",
                        minimal: "Minimal",
                        modern: "Moderne"
                    }
                },
                pricing: {
                    badge: "Tarification Transparente",
                    title: "Simple, Transparente",
                    titleHighlight: "Tarification",
                    description: "Choisissez le plan qui vous convient. Changez ou annulez à tout moment.",
                    joinText: "Rejoignez 50,000+ créateurs",
                    descriptionEnd: "déjà créateurs avec Pixora.",
                    popularBadge: "LE PLUS POPULAIRE",
                    period: "/mois",
                    save: "Économisez",
                    savings: "35% d'économie",
                    plans: {
                        free: {
                            name: "Gratuit",
                            price: "$0",
                            credits: "10/mois",
                            desc: "Parfait pour explorer Pixora.",
                            button: "Commencer",
                            features: {
                                f1: "Génération d'images basique",
                                f2: "Qualité standard",
                                f3: "Support communautaire",
                                f4: "Exportations filigranées"
                            }
                        },
                        pro: {
                            name: "Pro",
                            price: "$19",
                            credits: "500/mois",
                            desc: "Pour les créateurs sérieux.",
                            button: "S'abonner Maintenant",
                            features: {
                                f1: "Toutes les outils IA",
                                f2: "Haute qualité",
                                f3: "Support prioritaire",
                                f4: "Pas de filigrane",
                                f5: "Usage commercial"
                            }
                        },
                        enterprise: {
                            name: "Entreprise",
                            price: "$99",
                            credits: "Illimité",
                            desc: "Pour les équipes et utilisateurs avancés.",
                            button: "Contacter Ventes",
                            features: {
                                f1: "Toutes les fonctions Pro",
                                f2: "Qualité Ultra",
                                f3: "Support dédié",
                                f4: "Modèles personnalisés",
                                f5: "Accès API"
                            }
                        }
                    }
                },
                cta: {
                    badge: "Rejoignez les Créateurs Actifs",
                    title: {
                        start: "Prêt à Créer Votre",
                        highlight: "Premier Chef-d'œuvre IA"
                    },
                    titleEnd: "?",
                    description: "Rejoignez des milliers de créateurs qui produisent déjà des vidéos et des images époustouflantes avec la technologie IA avancée de Pixora.",
                    features: {
                        noCard: "Aucune carte de crédit requise",
                        trial: "3 Générations Gratuit",
                        fastStart: "Génération instantanée"
                    },
                    buttons: {
                        startTrial: "Commencer à Créer Maintenant",
                        watchDemo: "Explorer la Galerie"
                    },
                    trustedBy: "Approuvé par des équipes créatives du monde entier"
                }
            }
        }
    },
    ar: {
        translation: {
            "common": {
                "loading": "جاري التحميل...",
                "error": "خطأ",
                "success": "تم بنجاح",
                "viewAll": "عرض الكل",
                "backToHome": "العودة للرئيسية",
                "logout": "تسجيل الخروج",
                "signoutText": "الخروج من الحساب",
                "logoutConfirm": "هل أنت متأكد أنك تريد تسجيل الخروج؟",
                "language": "اللغة",
                "credits": "رصيد",
                "free": "مجاني",
                "brandName": "بيكسورا ستوديو"
            },
            "sidebar": {
                "overview": "نظرة عامة",
                "templates": "القوالب",
                "community": "المجتمع",
                "library": "المكتبة",
                "billing": "الفواتير",
                "profile": "الملف الشخصي",
                "settings": "الإعدادات",
                "help": "المساعدة",
                "generators": "مولدات الذكاء الاصطناعي",
                "textToVideo": "نص إلى فيديو",
                "imageToVideo": "صورة إلى فيديو",
                "textToImage": "نص إلى صورة",
                "imageToImage": "صورة إلى صورة",
                "generators_video": "إنشاء الفيديو",
                "generators_image": "إنشاء الصور",
                "adminPanel": "لوحة الإدارة",
                "admin": {
                    "dashboard": "لوحة القيادة",
                    "templates": "القوالب",
                    "users": "المستخدمين",
                    "payments": "المدفوعات",
                    "models": "نماذج الذكاء الاصطناعي",
                    "analytics": "التحليلات",
                    "community": "المجتمع",
                    "help": "المساعدة",
                    "portal": "بوابة الإدارة",
                    "superAdmin": "مشرف عام",
                    "administrator": "مدير النظام"
                },
                "upgradeNow": "ترقية الآن",
                "unlockPremium": "فتح باقة بريميوم",
                "unlockPremiumDesc": "احصل على إنشاءات غير محدودة، ودعم ذو أولوية، وقوالب حصرية.",
                "status": {
                    "title": "حالة النظام",
                    "operational": "جميع الأنظمة تعمل بكفاءة"
                }
            },
            "admin": {
                "dashboard": {
                    "title": "لوحة تحكم الإدارة",
                    "subtitle": "نظرة عامة على النظام وإدارته",
                    "loading": "جاري تحميل لوحة التحكم...",
                    "error": "خطأ في تحميل لوحة التحكم",
                    "stats": {
                        "totalUsers": "إجمالي المستخدمين",
                        "totalRevenue": "إجمالي الإيرادات",
                        "activeSubs": "الاشتراكات النشطة",
                        "pendingApprovals": "الموافقات المعلقة",
                        "today": "اليوم",
                        "thisMonth": "هذا الشهر",
                        "allActive": "الكل نشط",
                        "requiresAttention": "يتطلب اهتماماً",
                        "allClear": "الكل سليم"
                    },
                    "activity": {
                        "title": "النشاط الأخير",
                        "viewAll": "عرض الكل",
                        "noActivity": "لا يوجد نشاط أخير",
                        "credits": "رصيد"
                    },
                    "actions": {
                        "users": {
                            "title": "إدارة المستخدمين",
                            "desc": "عرض وإدارة جميع المستخدمين والأدوار والأذونات",
                            "cta": "انتقل للمستخدمين"
                        },
                        "payments": {
                            "title": "المدفوعات",
                            "desc": "مراجعة المعاملات وإدارة الموافقات",
                            "cta": "عرض المدفوعات"
                        },
                        "analytics": {
                            "title": "التحليلات",
                            "desc": "عرض التقارير والبيانات التفصيلية",
                            "cta": "عرض التحليلات"
                        },
                        "help": {
                            "title": "محتوى المساعدة",
                            "desc": "إدارة الشروحات والأسئلة الشائعة",
                            "cta": "إدارة المحتوى"
                        }
                    }
                }
            },
            "dashboard": {
                "welcomeTitle": "مرحباً بك في",
                "welcomeSubtitle": "أنشئ صوراً ومؤثرات وفيديوهات مذهلة مدعومة بأحدث تقنيات الذكاء الاصطناعي. ابدأ في صنع السحر في ثوانٍ.",
                "newProject": "مشروع جديد",
                "stats": {
                    "projects": "المشاريع المنشأة",
                    "credits": "الرصيد المستخدم",
                    "timeSaved": "الوقت الموفر"
                },
                "exploreTemplates": {
                    "title": "استكشاف القوالب",
                    "unavailable": "غير متاح",
                    "duration": "المدة",
                    "rating": "التقييم",
                    "uses": "الاستخدامات",
                    "cost": "التكلفة",
                    "useTemplate": "استخدام القالب",
                    "noTemplates": "لا توجد قوالب متاحة",
                    "noTemplatesDesc": "لا توجد قوالب نشطة متاحة حالياً. تفقد الموقع لاحقاً!",
                    "exploreAll": "استكشاف جميع القوالب"
                },
                "quickStart": {
                    "t2v": { "title": "نص → فيديو", "desc": "حول الأوصاف إلى فيديوهات مذهلة بالذكاء الاصطناعي" },
                    "i2v": { "title": "صورة → فيديو", "desc": "حرك صورك بحركة سينمائية" },
                    "t2i": { "title": "نص → صورة", "desc": "أنشئ صوراً واقعية من الأوصاف النصية" },
                    "i2i": { "title": "صورة → صورة", "desc": "حول وحسن الصور بسحر الذكاء الاصطناعي" },
                    "trending": "شائع",
                    "startCreating": "ابدأ الإنشاء"
                },
                "popularTemplates": "القوالب الشائعة",
                "browseAll": "تصفح الكل",
                "useTemplate": "استخدام القالب",
                "recommended": "موصى به لك",
                "explorePack": "استكشاف الحزمة",
                "viewAll": "عرض الكل",
                "recentProjects": "المشاريع الأخيرة",
                billing: {
                    title: "الفواتير والرصيد",
                    subtitle: "إدارة اشتراكك وشراء الرصيد",
                    tabs: {
                        credits: "شراء رصيد",
                        subscription: "الاشتراك",
                        history: "سجل المعاملات"
                    },
                    credits: {
                        title: "حزم الرصيد",
                        discount: "خصومات الكمية متاحة",
                        save: "وفر",
                        purchase: "اشترِ الآن",
                        processing: "جاري المعالجة...",
                        paymentMethods: "طرق الدفع",
                        addPayment: "إضافة طريقة دفع",
                        packs: {
                            basic: { features: ["إنشاء أساسي", "جودة قياسية", "دعم عبر البريد الإلكتروني"] },
                            pro: { features: ["جميع الميزات الأساسية", "جودة عالية", "دعم ذو أولوية", "معالجة أسرع"] },
                            ultra: { features: ["جميع الميزات المتميزة", "جودة فائقة", "دعم 24/7", "معالجة جماعية", "ترخيص تجاري"] }
                        }
                    },
                    subscription: {
                        current: "الخطة الحالية",
                        active: "اشتراكك النشط",
                        renews: "يتجدد في",
                        includes: "خطتك تشمل",
                        upgrade: "ترقية أو تغيير الخطة",
                        choose: "اختر خطتك",
                        selected: "الخطة الحالية",
                        select: "اختر الخطة"
                    },
                    history: {
                        title: "سجل المعاملات",
                        export: "تصدير CSV"
                    },
                    success: "نجاح!",
                    error: "خطأ في الدفع",
                    creditsAdded: "تم إضافة الرصيد بنجاح!",
                    subscriptionActive: "تم تفعيل الاشتراك بنجاح!"
                }
            },
            "generator": {
                "textToVideo": {
                    "title": "نص ← فيديو",
                    "subtitle": "حول أفكارك إلى فيديوهات مذهلة باستخدام الذكاء الاصطناعي",
                    "describe": "صف فيديوك",
                    "placeholder": "صف المشهد، والجو العام، وحركات الكاميرا، والتفاصيل التي تريدها في فيديوك...",
                    "inspiration": "تحتاج إلهام؟ جرب هذه:",
                    "style": "نمط الفيديو",
                    "duration": "المدة",
                    "settings": "إعدادات الفيديو",
                    "advanced": "إعدادات متقدمة",
                    "generate": "إنشاء فيديو",
                    "generating": "جاري إنشاء الفيديو...",
                    "preview": "معاينة الفيديو",
                    "download": "تنزيل",
                    "share": "مشاركة",
                    "creating": "جاري إنشاء فيديوك",
                    "creatingSub": "قد يستغرق هذا بضع لحظات...",
                    "awaiting": "فيديورك في الانتظار",
                    "awaitingSub": "صف رؤيتك وأنشئ أول فيديو بالذكاء الاصطناعي",
                    "useVideo": "استخدم هذا الفيديو",
                    "refining": "جاري التحسين...",
                    "optimize": "تحسين الوصف",
                    "promptHint": "أضف وصفاً أولاً لاستخدام ميزة التحسين بالذكاء الاصطناعي.",
                    "thinking": "جاري التفكير...",
                    "getIdeas": "احصل على أفكار",
                    "aspectRatio": "نسبة العرض",
                    "model": "نموذج"
                },
                "imageToVideo": {
                    "title": "صورة ← فيديو",
                    "subtitle": "حول صورك الثابتة إلى حياة مع حركة الذكاء الاصطناعي",
                    "visualSource": "المصدر المرئي",
                    "dropImage": "أسقط صورة المصدر",
                    "enhance": "تحسين",
                    "ideas": "أفكار",
                    "motionStyle": "نمط الحركة",
                    "duration": "المدة",
                    "resolution": "الدقة",
                    "highDef": "عالي الدقة (HD)",
                    "animate": "تحريك الصورة",
                    "animating": "جاري التحريك..."
                },
                "textToImage": {
                    "title": "استوديو الصور",
                    "subtitle": "صمم الصورة المثالية وصفاً تلو الآخر.",
                    "artisticStyle": "النمط الفني",
                    "aspectRatio": "نسبة العرض",
                    "modelAccuracy": "دقة النموذج",
                    "balancedPrecision": "دقة متوازنة",
                    "generate": "إنشاء صورة",
                    "visualizing": "جاري التصور..."
                },
                "imageToImage": {
                    "title": "تحسين الصور",
                    "subtitle": "كرر وحسن وصقل أصولك المرئية.",
                    "base": "الأساس",
                    "mask": "القناع",
                    "refinementStyle": "نمط التحسين",
                    "refine": "تحسين الصورة",
                    "transforming": "جاري التحويل...",
                    "source": "المصدر",
                    "optional": "اختياري"
                },

                "styles": {
                    "cinematic": "سينمائي",
                    "animated": "متحرك",
                    "realistic": "واقعي",
                    "artistic": "فني",
                    "subtle": "خفيف",
                    "dynamic": "ديناميكي",
                    "cyberpunk": "سايبربانك",
                    "fantasy": "خيالي",
                    "anime": "أنمي",
                    "3dRender": "ريندر ثلاثي الأبعاد",
                    "cinematicDesc": "تسلسلات درامية بأسلوب سينمائي",
                    "animatedDesc": "تأثيرات رسوم متحركة مميزة",
                    "realisticDesc": "حركة تصويرية واقعية",
                    "artisticDesc": "أسلوب فني زيتي"
                },
                "studio": {
                    "enhance": "تحسين",
                    "enhancing": "جاري التحسين...",
                    "ideas": "احصل على أفكار",
                    "loadingIdeas": "جارٍ التفكير...",
                    "conceptualInput": "المدخلات المفاهيمية",
                    "technicalParameters": "المعايير الفنية",
                    "liveCanvas": "لوحة التطور المباشر",
                    "creativeVoid": "ادخل إلى الفراغ الإبداعي",
                    "creativeVoidDesc": "سوف تتجسد تجلياتك الرقمية داخل هذه الواجهة المرئية الأساسية.",
                    "qualityNotice": "الإنتاج بجودة عالية يستهلك رصيداً قياسياً.",
                    "systemIntegrated": "نظام مدمج",
                    "engineVersion": "محرك بيكسورا السينمائي v2.0",
                    "chronicle": "السجل",
                    "chronicleDesc": "التجليات السابقة"
                }
            },
            "library": {
                "title": "مكتبتك",
                "subtitle": "قم بإدارة وتنظيم المحتوى الذي أنشأته",
                "stats": {
                    "total": "إجمالي العناصر",
                    "images": "الصور",
                    "videos": "الفيديوهات",
                    "storage": "المساحة المستخدمة"
                },
                "search": "ابحث في مكتبتك...",
                "filters": {
                    "all": "كل المحتوى",
                    "images": "الصور",
                    "videos": "الفيديوهات"
                },
                "empty": {
                    "title": "مكتبتك فارغة",
                    "noResults": "لم يتم العثور على عناصر",
                    "subtitle": "ستظهر الصور والفيديوهات التي تنشئها هنا. ابدأ بإنشاء محتوى مذهل باستخدام الذكاء الاصطناعي!",
                    "noResultsSub": "حاول تعديل بحثك أو عوامل التصفية.",
                    "start": "ابدأ الإنشاء"
                },
                "actions": {
                    "view": "عرض بملء الشاشة",
                    "download": "تنزيل",
                    "share": "مشاركة",
                    "delete": "حذف"
                },
                "messages": {
                    "downloadStart": "جاري تحضير التنزيل...",
                    "downloadStarted": "بدأ التنزيل!",
                    "downloadError": "فشل التنزيل. جاري الفتح في علامة تبويب جديدة.",
                    "noUrl": "رابط التنزيل غير متوفر",
                    "shareTitle": "مشاركة المحتوى",
                    "shareDefault": "محتوى تم إنشاؤه بواسطة الذكاء الاصطناعي",
                    "shareSuccess": "تم نسخ الرابط إلى الحافظة!",
                    "shareError": "فشل المشاركة. يرجى نسخ الرابط يدوياً.",
                    "deleteSuccess": "تم حذف المحتوى بنجاح!",
                    "deleteError": "فشل حذف المحتوى"
                },
                "ui": {
                    "loading": "جاري تحميل تحفتك الفنية...",
                    "untitled": "إبداع بدون عنوان",
                    "noDescription": "لم يتم تقديم وصف.",
                    "deleteTitle": "حذف المحتوى؟",
                    "deleteConfirm": "هل أنت متأكد أنك تريد حذف \"{{title}}\"؟ لا يمكن التراجع عن هذا الإجراء.",
                    "cancel": "إلغاء",
                    "delete": "حذف",
                    "shareUrl": "مشاركة الرابط",
                    "copyLink": "نسخ الرابط",
                    "copy": "نسخ"
                }
            },
            "templates": {
                "title": "قوالب الفيديو",
                "subtitle": "اختر من بين قوالب مصممة باحتراف",
                "searchPlaceholder": "البحث عن قوالب...",
                "loading": "جاري تحميل القوالب...",
                "noResults": "لم يتم العثور على قوالب",
                "noResultsSub": "حاول تعديل البحث أو معايير التصفية",
                "preview": "معاينة",
                "useTemplate": "استخدام القالب",
                "popular": "شائع",
                "credits": "رصيد",
                "uses": "استخدامات",
                "categories": {
                    "all": "الكل",
                    "business": "الأعمال",
                    "social": "وسائل التواصل",
                    "education": "التعليم",
                    "entertainment": "الترفيه",
                    "personal": "شخصي",
                    "other": "آخر"
                },
                "general": {
                    "name": "عام / قصة",
                    "placeholder": "تخيل مدينة مستقبلية بها سيارات طائرة وأضواء نيون...",
                    "helperText": "صف مشهدك بالتفصيل للحصول على أفضل النتائج."
                },
                "marketing": {
                    "name": "فيديو تسويقي",
                    "placeholder": "نقدم لكم منصة بيكسورا الجديدة للذكاء الاصطناعي...",
                    "helperText": "سلط الضوء على قيمة منتجك وأضف دعوة لاتخاذ إجراء.",
                    "ctaLabel": "دعوة لاتخاذ إجراء",
                    "ctaPlaceholder": "انقر على الرابط أدناه لمعرفة المزيد!"
                },
                "storytelling": {
                    "name": "رواية قصص سينمائية",
                    "placeholder": "اصطدمت البوابات القديمة وهي تفتح، لتكشف عن عالم ضاع في الزمان...",
                    "helperText": "ركز على الأجواء والإضاءة وحركة الكاميرا.",
                    "cameraLabel": "حركة الكاميرا",
                    "cameraPlaceholder": "زوم بطيء، حركة يمين..."
                },
                "productDemo": {
                    "name": "عرض منتج",
                    "placeholder": "عرض هاتف ذكي أنيق يستقر على سطح رخامي...",
                    "helperText": "مثالي لعروض التجارة الإلكترونية والتجزئة.",
                    "brandLabel": "لون العلامة التجارية الأساسي",
                    "brandPlaceholder": "#FFFFFF أو أزرق ملكي"
                }
            },
            "refundPolicy": {
                "title": "سياسة الاسترداد",
                "subtitle": "نحن نؤمن بتسعير عادل وشفاف. إليك كيف نتعامل مع الاسترداد وإعادة الرصيد.",
                "creditPurchase": {
                    "title": "شراء الرصيد",
                    "desc1": "إذا اشتريت حزمة رصيد ولم تكن راضياً، يمكنك طلب استرداد كامل خلال 14 يوماً من الشراء، بشرط عدم استخدام أكثر من 10% من الرصيد المشتري.",
                    "desc2": "سيؤدي استرداد حزم الرصيد إلى خصم الرصيد المشتري من رصيد حسابك."
                },
                "generationFailures": {
                    "title": "فشل الإنشاء",
                    "desc": "يكتشف نظامنا تلقائياً إذا فشل الإنشاء. في هذه الحالات، يتم إعادة رصيدك تلقائياً إلى حسابك فوراً."
                },
                "subscriptions": {
                    "title": "الاشتراكات",
                    "desc1": "يمكن إلغاء الاشتراكات في أي وقت من لوحة التحكم. الإلغاء سيمنع التجديدات المستقبلية.",
                    "desc2": "نحن بشكل عام لا نقدم مبالغ مستردة لفترات الاشتراك الجزئية إلا في حالة حدوث عطل في النظام بالكامل."
                },
                "contact": "تحتاج مساعدة؟",
                "contactBtn": "اتصل بالدعم"
            },
            "profile": {
                "title": "إعدادات الملف الشخصي",
                "subtitle": "إدارة معلومات حسابك وتفضيلاتك",
                "personalInfo": "المعلومات الشخصية",
                "edit": "تعديل الملف الشخصي",
                "save": "حفظ التغييرات",
                "labels": {
                    "name": "الاسم الكامل",
                    "email": "البريد الإلكتروني",
                    "bio": "السيرة الذاتية",
                    "location": "الموقع",
                    "website": "الموقع الإلكتروني"
                },
                "placeholders": {
                    "bio": "أخبرنا عن نفسك...",
                    "location": "المدينة، الدولة",
                    "website": "https://yourwebsite.com"
                },
                "noData": "غير محدد",
                "noBio": "لا توجد سيرة ذاتية بعد.",
                "stats": {
                    "memberSince": "عضو منذ",
                    "successRate": "معدل النجاح"
                },
                "quickActions": {
                    "title": "إجراءات سريعة",
                    "export": "تصدير البيانات",
                    "notifications": "إعدادات التنبيهات",
                    "privacy": "الخصوصية والأمان",
                    "billing": "الفواتير والاشتراك"
                },
                "accountStatus": {
                    "title": "حالة الحساب",
                    "plan": "نوع الخطة",
                    "subscription": "الاشتراك",
                    "renewal": "تاريخ التجديد",
                    "manage": "إدارة الاشتراك"
                },
                "freeTier": {
                    "title": "الفئة المجانية",
                    "remaining": "متبقية",
                    "generation": "إنشاء",
                    "generations": "عمليات إنشاء",
                    "exhausted": "نفدت الفئة المجانية - قم بالترقية للمتابعة",
                    "watermark": "المحتوى المجاني يتضمن علامة مائية"
                }
            },
            settings: {
                title: "الإعدادات",
                subtitle: "إدارة تفضيلات حسابك",
                save: "حفظ التغييرات",
                sections: {
                    notifications: "التنبيهات",
                    privacy: "الخصوصية والأمان",
                    appearance: "المظهر",
                    billing: "الفواتير والخطط"
                },
                notifications: {
                    email: "البريد الإلكتروني",
                    emailDesc: "تلقي التنبيهات عبر البريد",
                    push: "تنبيهات الدفع",
                    pushDesc: "تلقي تنبيهات الدفع",
                    projectUpdates: "تحديثات المشروع",
                    projectUpdatesDesc: "تلقي تنبيهات عن تحديثات المشروع",
                    creditAlerts: "تنبيهات الرصيد",
                    creditAlertsDesc: "تلقي تنبيهات الرصيد"
                },
                privacy: {
                    profileVisibility: "ظهور الملف الشخصي",
                    dataCollection: "جمع البيانات",
                    dataCollectionDesc: "السماح بجمع البيانات",
                    analytics: "التحليلات",
                    analyticsDesc: "السماح بالتحليلات"
                },
                appearance: {
                    theme: "المظهر",
                    language: "اللغة",
                    options: {
                        dark: "داكن",
                        light: "فاتح",
                        system: "النظام"
                    }
                }
            },
            auth: {
                login: {
                    title: "مرحباً بك مجدداً",
                    subtitle: "سجل الدخول للمتابعة في الإبداع",
                    emailPlaceholder: "أدخل بريدك الإلكتروني",
                    passwordPlaceholder: "أدخل كلمة المرور",
                    forgotPassword: "نسيت كلمة المرور؟",
                    submit: "تسجيل الدخول",
                    success: "تم تسجيل الدخول بنجاح!",
                    error: "بيانات الاعتماد غير صالحة. حاول مرة أخرى."
                },
                signup: {
                    title: "إنشاء حساب",
                    subtitle: "انضم إلى آلاف المبدعين اليوم",
                    nameLabel: "الاسم الكامل",
                    namePlaceholder: "أدخل اسمك الكامل",
                    emailLabel: "البريد الإلكتروني",
                    passwordLabel: "كلمة المرور",
                    passwordPlaceholder: "أنشئ كلمة مرور قوية",
                    confirmPasswordLabel: "تأكيد كلمة المرور",
                    confirmPasswordPlaceholder: "أكد كلمة المرور",
                    submit: "إنشاء الحساب",
                    terms: {
                        agree: "أوافق على",
                        service: "شروط الخدمة",
                        and: "و",
                        privacy: "سياسة الخصوصية"
                    },
                    errors: {
                        match: "كلمات المرور غير متطابقة"
                    },
                    requirements: {
                        length: "8 أحرف على الأقل",
                        uppercase: "حرف كبير واحد",
                        number: "رقم واحد",
                        special: "رمز خاص واحد"
                    }
                },
                forgotPassword: {
                    title: "إعادة تعيين كلمة المرور",
                    subtitle: "أدخل بريدك الإلكتروني وسنرسل لك رمزاً لإعادة التعيين",
                    emailPlaceholder: "أدخل بريدك الإلكتروني",
                    submit: "إرسال الرمز",
                    sending: "جاري الإرسال...",
                    success: "تم إرسال الرمز بنجاح! تحقق من بريدك.",
                    error: {
                        noEmail: "يرجى إدخال بريدك الإلكتروني",
                        failed: "فشل إرسال الرمز. حاول مرة أخرى."
                    },
                    helpText: "سنرسل رمزاً مكوناً من 6 أرقام إلى بريدك"
                },
                resendVerification: {
                    title: "إعادة إرسال بريد التحقق",
                    subtitle: "لم تستلم رابط التحقق؟ أدخل بريدك لإعادة الإرسال.",
                    emailLabel: "البريد الإلكتروني",
                    emailPlaceholder: "أدخل بريدك الإلكتروني",
                    submit: "إعادة الإرسال",
                    sending: "جاري الإرسال...",
                    successTitle: "تم الإرسال",
                    successDesc: "تم إرسال رابط تحقق جديد إلى",
                    error: "فشل في إعادة إرسال البريد"
                },
                resetPassword: {
                    title: "إنشاء كلمة مرور جديدة",
                    subtitle: "أدخل كلمة المرور الجديدة وتأكد منها",
                    passwordPlaceholder: "كلمة المرور الجديدة",
                    confirmPlaceholder: "تأكيد كلمة المرور",
                    submit: "إعادة تعيين",
                    resetting: "جاري الإعادة...",
                    success: "تمت الإعادة بنجاح! جاري التوجيه...",
                    error: {
                        required: "كلمة المرور مطلوبة",
                        length: "يجب ألا تقل عن 6 أحرف",
                        confirm: "يرجى تأكيد كلمة المرور",
                        mismatch: "الكلمات غير متطابقة",
                        failed: "فشل في إعادة التعيين."
                    },
                    strength: {
                        title: "قوة كلمة المرور",
                        vWeak: "ضعيفة جداً",
                        weak: "ضعيفة",
                        fair: "متوسطة",
                        good: "جيدة",
                        strong: "قوية"
                    },
                    requirements: {
                        title: "متطلبات كلمة المرور:",
                        length: "6 أحرف على الأقل",
                        match: "يجب أن تتطابق الكلمات"
                    }
                },
                verify: {
                    title: "تحقق من حسابك",
                    resetTitle: "تحقق لإعادة التعيين",
                    subtitle: "أدخل الرمز المكون من 6 أرقام",
                    resetSubtitle: "أدخل الرمز لإعادة تعيين كلمة المرور",
                    sentTo: "تم إرسال الرمز إلى",
                    submit: "تحقق",
                    resendPrefix: "لم تستلم الرمز؟",
                    resendLink: "إعادة إرسال",
                    resending: "جاري الإعادة...",
                    back: "العودة لتسجيل الدخول",
                    success: "تم التحقق بنجاح!",
                    error: {
                        incomplete: "يرجى إدخال الرمز بالكامل",
                        failed: "فشل التحقق",
                        resendFailed: "فشل إعادة الإرسال"
                    },
                    resendSuccess: "تمت إعادة إرسال الرمز!"
                }
            },
            landing: {
                navbar: {
                    features: "الميزات",
                    templates: "القوالب",
                    pricing: "الأسعار",
                    contact: "اتصل بنا",
                    signIn: "دخول",
                    getStarted: "ابدأ مجاناً",
                    dropdowns: {
                        videoGen: "إنشاء فيديو بالذكاء الاصطناعي",
                        videoGenDesc: "أنشئ فيديوهات بالذكاء الاصطناعي",
                        smartTemplates: "قوالب ذكية",
                        smartTemplatesDesc: "أكثر من 500 قالب",
                        creditSystem: "نظام الرصيد",
                        creditSystemDesc: "ادفع مقابل الاستخدام"
                    }
                },
                footer: {
                    description: "أنشئ فيديوهات مذهلة بأدوات الذكاء الاصطناعي. انضم إلى آلاف المبدعين اليوم.",
                    stayInLoop: "ابق على اطلاع",
                    updates: "احصل على آخر التحديثات.",
                    subscribe: "اشترك",
                    emailPlaceholder: "البريد الإلكتروني",
                    product: "المنتج",
                    resources: "الموارد",
                    company: "الشركة",
                    madeWith: "صنع بـ",
                    forCreators: "للمبدعين حول العالم.",
                    links: {
                        features: "الميزات",
                        templates: "القوالب",
                        pricing: "الأسعار",
                        useCases: "حالات الاستخدام",
                        apiDocs: "وثائق API",
                        docs: "الوثائق",
                        helpCenter: "مركز المساعدة",
                        blog: "المدونة",
                        community: "المجتمع",
                        tutorials: "دروس تعليمية",
                        about: "من نحن",
                        careers: "وظائف",
                        contact: "اتصل بنا",
                        press: "الصحافة",
                        legal: "قانوني",
                        privacy: "سياسة الخصوصية",
                        terms: "شروط الخدمة",
                        cookies: "ملفات تعريف الارتباط",
                        refund: "سياسة الاسترداد"
                    }
                },
                hero: {
                    title: {
                        start: "اختبر",
                        highlight: "الحركة الذكية",
                        end: "كما لم تفعل من قبل"
                    },
                    description: "مصمم للجيل القادم من المبدعين - بيكسورا يساعدك على صياغة فيديوهات سينمائية وحملات متحركة بأتمتة ذكية.",
                    startFree: "ابدأ مجاناً",
                    exploreDemos: "استكشف العروض"
                },
                features: {
                    badge: "لماذا يحب المبدعون بيكسورا",
                    title: {
                        start: "مصمم من أجل",
                        highlight: "التميز الإبداعي"
                    },
                    description: "حول سير عملك الإبداعي بأدوات تفهم رؤيتك.",
                    learnMore: "تعرف على المزيد",
                    items: {
                        videoGen: {
                            title: "إنشاء فيديو بالذكاء الاصطناعي",
                            desc: "أنتج فيديوهات إعلانية واقعية في ثوانٍ مع محركنا المتطور.",
                            stats: "2.3 ثانية متوسط الإنشاء",
                            highlights: {
                                h1: "رندر حي",
                                h2: "جودة 4K",
                                h3: "60 إطار"
                            }
                        },
                        smartTemplates: {
                            title: "قوالب ذكية",
                            desc: "اختر من بين مئات القوالب الجاهزة القابلة للتخصيص.",
                            stats: "500+ قالب",
                            highlights: {
                                h1: "هوية تلقائية",
                                h2: "تطبيق بضغطة واحدة",
                                h3: "قابل للتخصيص"
                            }
                        },
                        creditSystem: {
                            title: "نظام قائم على الرصيد",
                            desc: "ادفع فقط مقابل ما تنشئه. تسعير مرن للمبدعين.",
                            stats: "ادفع حسب الاستخدام",
                            highlights: {
                                h1: "لا اشتراكات إجبارية",
                                h2: "خصومات الكمية",
                                h3: "خطط للشركات"
                            }
                        }
                    }
                },
                templates: {
                    title: "قوالب",
                    titleHighlight: "متميزة",
                    description: "قوالب مصممة باحتراف لبدء مشاريعك الإبداعية.",
                    cardDesc: "قالب احترافي مع خيارات تخصيص ذكية.",
                    useTemplate: "استخدم القالب",
                    categories: {
                        business: "أعمال",
                        marketing: "تسويق",
                        corporate: "شركات",
                        creative: "إبداعي",
                        minimal: "بسيط",
                        modern: "عصري"
                    }
                },
                pricing: {
                    badge: "تسعير شفاف",
                    title: "بسيط وشفاف",
                    titleHighlight: "التسعير",
                    description: "اختر الخطة المناسبة لك.",
                    joinText: "انضم إلى 50,000+ مبدع",
                    descriptionEnd: "يبدعون بالفعل مع بيكسورا.",
                    popularBadge: "الأكثر شعبية",
                    period: "/شهر",
                    save: "وفر",
                    savings: "توفير 35%",
                    plans: {
                        free: {
                            name: "مجاني",
                            price: "$0",
                            credits: "10/شهر",
                            desc: "مثالي لاستكشاف بيكسورا.",
                            button: "ابدأ الآن",
                            features: {
                                f1: "إنشاء صور أساسي",
                                f2: "جودة قياسية",
                                f3: "دعم المجتمع",
                                f4: "علامة مائية"
                            }
                        },
                        pro: {
                            name: "برو",
                            price: "$19",
                            credits: "500/شهر",
                            desc: "للمبدعين الجادين.",
                            button: "اشترك الآن",
                            features: {
                                f1: "جميع أدوات الذكاء الاصطناعي",
                                f2: "جودة عالية",
                                f3: "دعم ذو أولوية",
                                f4: "بدون علامة مائية",
                                f5: "استخدام تجاري"
                            }
                        },
                        enterprise: {
                            name: "للشركات",
                            price: "$99",
                            credits: "غير محدود",
                            desc: "للفرق والمستخدمين المحترفين.",
                            button: "اتصل بالمبيعات",
                            features: {
                                f1: "جميع ميزات برو",
                                f2: "جودة فائقة",
                                f3: "دعم مخصص",
                                f4: "نماذج مخصصة",
                                f5: "وصول API"
                            }
                        }
                    }
                },
                cta: {
                    badge: "انضم إلى المبدعين النشطين",
                    title: {
                        start: "هل أنت مستعد لإنشاء",
                        highlight: "أول تحفة فنية بالذكاء الاصطناعي"
                    },
                    titleEnd: "؟",
                    description: "انضم إلى آلاف المبدعين الذين ينتجون بالفعل فيديوهات وصوراً مذهلة باستخدام تقنية Pixora المتقدمة للذكاء الاصطناعي.",
                    features: {
                        noCard: "لا يلزم وجود بطاقة ائتمان",
                        trial: "3 أجيال مجانية",
                        fastStart: "توليد فوري"
                    },
                    buttons: {
                        startTrial: "ابدأ الابتكار الآن",
                        watchDemo: "استكشف المعرض"
                    },
                    trustedBy: "موثوق به من قبل فرق إبداعية في جميع أنحاء العالم"
                }
            }
        }
    }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;