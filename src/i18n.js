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
                "signoutText": "Sign out from account"
            },
            "sidebar": {
                "overview": "Overview",
                "templates": "Templates",
                "community": "Community",
                "library": "Library",
                "billing": "Billing",
                "profile": "Profile",
                "help": "Help",
                "generators": "AI Generators",
                "textToVideo": "Text to Video",
                "imageToVideo": "Image to Video",
                "textToImage": "Text to Image",
                "imageToImage": "Image to Image",
                "adminPanel": "Admin Panel",
                "admin": {
                    "dashboard": "Dashboard",
                    "users": "Users",
                    "payments": "Payments",
                    "models": "Models",
                    "analytics": "Analytics"
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
                    subscriptionActive: "Subscription activated successfully!"
                }
            },
            "generator": {
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
                    "useVideo": "Use This Video"
                },
                "styles": {
                    "cinematic": "Cinematic",
                    "animated": "Animated",
                    "realistic": "Realistic",
                    "artistic": "Artistic",
                    "cinematicDesc": "Movie-style dramatic sequences",
                    "animatedDesc": "Stylized animation effects",
                    "realisticDesc": "Photorealistic motion",
                    "artisticDesc": "Painterly artistic style"
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
                "uses": "uses",
                "categories": {
                    "all": "All",
                    "business": "Business",
                    "social": "Social Media",
                    "education": "Education",
                    "entertainment": "Entertainment",
                    "personal": "Personal",
                    "other": "Other"
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
                        cookies: "Cookies"
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
                    badge: "Join 50,000+ Creators",
                    title: "Ready to Create Your",
                    titleHighlight: "First AI Masterpiece",
                    titleEnd: "?",
                    description: "Join thousands of creators who are already producing stunning videos 10x faster with Pixora's advanced AI technology.",
                    features: {
                        noCard: "No credit card required",
                        trial: "7-day free trial",
                        fastStart: "Start in 30 seconds"
                    },
                    buttons: {
                        startTrial: "Start Free Trial",
                        watchDemo: "Watch Demo"
                    },
                    trustedBy: "Trusted by teams at"
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
                "signoutText": "Salir de la cuenta"
            },
            "sidebar": {
                "overview": "Resumen",
                "templates": "Plantillas",
                "community": "Comunidad",
                "library": "Biblioteca",
                "billing": "Facturación",
                "profile": "Perfil",
                "help": "Ayuda",
                "generators": "Generadores IA",
                "textToVideo": "Texto a Video",
                "imageToVideo": "Imagen a Video",
                "textToImage": "Texto a Imagen",
                "imageToImage": "Imagen a Imagen",
                "adminPanel": "Panel Admin",
                "admin": {
                    "dashboard": "Tablero",
                    "users": "Usuarios",
                    "payments": "Pagos",
                    "models": "Modelos",
                    "analytics": "Analítica"
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
                "popularTemplates": "Plantillas Populares",
                "browseAll": "Explorar todo",
                "useTemplate": "Usar Plantilla",
                "recommended": "Recomendado para ti",
                "recentProjects": "Proyectos Recientes",
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
                    subscriptionActive: "¡Suscripción activada exitosamente!"
                }
            },
            "generator": {
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
                    "useVideo": "Usar este Video"
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
            "templates": {
                "title": "Plantillas de Video",
                "subtitle": "Elige entre plantillas diseñadas profesionalmente",
                "searchPlaceholder": "Buscar plantillas...",
                "loading": "Cargando plantillas...",
                "noResults": "No se encontraron plantillas",
                "noResultsSub": "Intenta ajustar tu búsqueda o filtros",
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
                        cookies: "Cookies"
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
                    badge: "Únete a 50,000+ Creadores",
                    title: "¿Listo para Crear Tu",
                    titleHighlight: "Primera Obra Maestra de IA",
                    titleEnd: "?",
                    description: "Únete a miles de creadores que ya están produciendo videos impresionantes 10x más rápido con la avanzada tecnología IA de Pixora.",
                    features: {
                        noCard: "No se requiere tarjeta de crédito",
                        trial: "Prueba gratuita de 7 días",
                        fastStart: "Empieza en 30 segundos"
                    },
                    buttons: {
                        startTrial: "Empezar Prueba Gratis",
                        watchDemo: "Ver Demo"
                    },
                    trustedBy: "Con la confianza de equipos en"
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
                "signoutText": "Se déconnecter du compte"
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
                    "users": "Utilisateurs",
                    "payments": "Paiements",
                    "models": "Modèles",
                    "analytics": "Analytique"
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
                    subscriptionActive: "Abonnement activé avec succès !"
                }
            },
            "generator": {
                "textToVideo": {
                    "describe": "Décrivez votre Vidéo",
                    "placeholder": "Décrivez la scène, l'ambiance, les mouvements de caméra...",
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
                    "useVideo": "Utiliser cette Vidéo"
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
                        cookies: "Cookies"
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
                                h3: "Personnalisable"
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
                                f1: "Tous les outils IA",
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
                    badge: "Rejoignez 50,000+ Créateurs",
                    title: "Prêt à Créer Votre",
                    titleHighlight: "Premier Chef-d'œuvre IA",
                    titleEnd: "?",
                    description: "Rejoignez des milliers de créateurs qui produisent déjà des vidéos époustouflantes 10x plus vite avec la technologie IA avancée de Pixora.",
                    features: {
                        noCard: "Pas de carte de crédit requise",
                        trial: "Essai gratuit de 7 jours",
                        fastStart: "Démarrez en 30 secondes"
                    },
                    buttons: {
                        startTrial: "Essai Gratuit",
                        watchDemo: "Voir la Démo"
                    },
                    trustedBy: "Approuvé par les équipes chez"
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
