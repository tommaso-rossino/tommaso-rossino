import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "tricon",
    title: "Tricon Residential App",
    company: "SoftServe",
    description:
      "Mobile ecosystem for 35,000+ units with smart-home integration, secure rent payments, and digital document management.",
    tech: ["React Native", "iOS", "Android", "Node.js", "Full-Stack"],
    highlight: "4.7★ App Store rating",
    accentColor: "blue",
    imageUrl:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
    appScreenshots: [
      "/tricon-app-thermostat.png",
      "/tricon-app-pay.png",
      "/tricon-app-tech.png",
    ],
    screenshotLayout: "phone",
    caseStudy: {
      challenge:
        "Tricon Residential needed a unified mobile platform to serve 35,000+ residential units across their portfolio. Existing processes were fragmented — residents used separate systems for rent payments, maintenance requests, smart-home controls, and document management, leading to poor satisfaction and high support overhead.",
      solution:
        "Directed the full-stack creation and evolution of the resident-facing mobile ecosystem for both iOS and Android. The app centralized all resident services into a single, intuitive interface with smart-home functionality, secure rent payments via integrated payment gateways, and digital document management. Built with React Native for cross-platform consistency and Node.js microservices on the backend.",
      impact:
        "Achieved outstanding ratings of 4.7 on the App Store and 4.4 on Google Play Store. Significantly reduced support ticket volume by giving residents self-service capabilities. The platform became the primary touchpoint for all resident interactions across Tricon's portfolio.",
    },
  },
  {
    id: "fca",
    title: "FCA Vehicle Configurator",
    company: "EtiQa",
    description:
      "Cross-brand vehicle configurator for Fiat, Jeep, and Alfa Romeo deployed across 10+ European markets and 15+ languages.",
    tech: ["JavaScript", "React", "Multi-language", "REST APIs"],
    highlight: "10+ European markets",
    accentColor: "slate",
    imageUrl:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
    appScreenshots: [
      "/fca-configurator-exterior.png",
      "/fca-configurator-interior.png",
      "/fca-configurator-powertrain.png",
    ],
    screenshotLayout: "landscape",
    caseStudy: {
      challenge:
        "Fiat Chrysler Automobiles needed a unified vehicle configurator that could serve multiple brands (Fiat, Jeep, Alfa Romeo) across diverse European markets, each with unique pricing, regulations, and language requirements. The project was in a critical phase with only 2 months until deadline when leadership was needed.",
      solution:
        "Assumed leadership of the project during its critical phase, guiding the front-end development team to a successful launch. Architected a flexible, brand-agnostic configuration engine that could adapt to each brand's unique design language while sharing core business logic. Implemented robust internationalization supporting 15+ languages with dynamic pricing and regulatory compliance per market.",
      impact:
        "Successfully deployed across 10+ European markets and 15+ languages on time despite the compressed timeline. The platform enabled customers to configure and customize vehicles with real-time pricing updates, becoming a key digital sales tool for FCA's European operations.",
    },
  },
  {
    id: "cleverfi",
    title: "CleverFi Platform",
    company: "CleverFi",
    description:
      "Core financial platform with enterprise-grade architecture, design system ownership, and performance optimization.",
    tech: ["React", "TypeScript", "Next.js", "Node.js", "Figma"],
    highlight: "15% load time reduction",
    accentColor: "amber",
    imageUrl: "/cleverfi-logo.svg",
    caseStudy: {
      challenge:
        "CleverFi's financial platform needed enterprise-grade performance improvements to handle growing user demand. The front-end architecture lacked scalability, the design system was fragmented, and Web Vitals scores were impacting user experience and SEO rankings.",
      solution:
        "Guided the technical direction and front-end architecture, focusing on scalability and maintainability within the React/TypeScript ecosystem. Directed the implementation of critical performance optimization strategies and Web Vitals improvements. Took ownership of the Design System, leveraging Figma for design integration and building a reusable component library with comprehensive documentation.",
      impact:
        "Achieved a 15% reduction in average platform load time. Increased front-end development efficiency by an estimated 20% through component standardization. Championed the adoption of Next.js for SSR, driving cross-functional alignment with Product and Back-end teams.",
    },
  },
  {
    id: "uhc",
    title: "UHC Healthcare Platform",
    company: "HoverState",
    description:
      "Critical healthcare insurance platform turnaround — migrated from AngularJS to React/Redux, boosting performance by 35% and cutting errors by 90%.",
    tech: ["React", "Redux", "AngularJS", "TypeScript", "REST/SOAP"],
    highlight: "35% performance boost",
    accentColor: "emerald",
    imageUrl:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
    appScreenshots: [
      "/uhc-homepage.png",
      "/uhc-plans.png",
    ],
    screenshotLayout: "landscape",
    caseStudy: {
      challenge:
        "UnitedHealthcare's critical insurance platform was built on aging AngularJS architecture, suffering from poor performance, high error rates, and difficulty attracting modern engineering talent. The platform needed a complete overhaul while maintaining continuous service for millions of healthcare consumers.",
      solution:
        "Masterminded the turnaround over 8 years, leading a 7-developer team through an incremental migration from AngularJS to React/Redux. Implemented a strangler fig pattern to gradually replace legacy components without service disruption. Directed development of key features like real-time quoting engines and plan comparison tools.",
      impact:
        "Boosted platform performance by 35% and cut errors by 90%. Established the platform as a market leader in the healthcare insurance space. The successful migration approach became a template for other legacy modernization projects within the organization.",
    },
  },
];
