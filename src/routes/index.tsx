import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { Mail, Phone, MapPin, Linkedin, Code, Database, Cloud, Briefcase, Award, Target, Users, Menu, X } from 'lucide-react'

export const Route = createFileRoute('/')({
  component: Portfolio,
})

function Portfolio() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'skills', 'experience', 'projects', 'contact']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check on mount

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const NavLink = ({ href, children }: { href: string, children: React.ReactNode }) => {
    const section = href.replace('#', '')
    const isActive = activeSection === section
    return (
      <a
        href={href}
        className={`relative transition-all duration-300 ${isActive
          ? 'text-indigo-400 font-semibold'
          : 'text-white/80 hover:text-indigo-300'
          }`}
        onClick={() => setMobileMenuOpen(false)}
      >
        {children}
        {isActive && (
          <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full"></span>
        )}
      </a>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900 relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900"></div>

        {/* Animated mesh gradient */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-600/50 via-purple-600/50 to-pink-600/50 animate-gradient-shift"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-purple-600/40 via-pink-600/40 to-indigo-600/40 animate-gradient-shift-reverse"></div>
        </div>

        {/* Large animated blob elements */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-6000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-violet-500 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob animation-delay-8000"></div>

        {/* Medium animated blobs */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-indigo-400 rounded-full mix-blend-multiply filter blur-2xl opacity-25 animate-float"></div>
        <div className="absolute top-40 right-32 w-56 h-56 bg-purple-400 rounded-full mix-blend-multiply filter blur-2xl opacity-25 animate-float animation-delay-1000"></div>
        <div className="absolute bottom-32 right-20 w-60 h-60 bg-pink-400 rounded-full mix-blend-multiply filter blur-2xl opacity-25 animate-float animation-delay-3000"></div>
        <div className="absolute bottom-20 left-40 w-52 h-52 bg-cyan-400 rounded-full mix-blend-multiply filter blur-2xl opacity-25 animate-float animation-delay-5000"></div>
        <div className="absolute top-1/3 left-1/4 w-48 h-48 bg-violet-400 rounded-full mix-blend-multiply filter blur-2xl opacity-25 animate-float animation-delay-7000"></div>
        <div className="absolute top-2/3 right-1/3 w-44 h-44 bg-fuchsia-400 rounded-full mix-blend-multiply filter blur-2xl opacity-25 animate-float animation-delay-9000"></div>

        {/* Small floating orbs */}
        <div className="absolute top-1/4 left-1/5 w-32 h-32 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-orb-1"></div>
        <div className="absolute top-1/3 right-1/5 w-28 h-28 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-orb-2"></div>
        <div className="absolute bottom-1/4 left-1/6 w-36 h-36 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-orb-3"></div>
        <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-cyan-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-orb-4"></div>
        <div className="absolute top-1/2 left-1/3 w-30 h-30 bg-violet-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-orb-5"></div>
        <div className="absolute top-3/4 right-1/6 w-26 h-26 bg-fuchsia-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-orb-6"></div>

        {/* Geometric shapes */}
        <div className="absolute top-1/5 right-1/4 w-20 h-20 bg-indigo-400/20 rotate-45 animate-spin-slow"></div>
        <div className="absolute bottom-1/5 left-1/4 w-16 h-16 bg-purple-400/20 rotate-45 animate-spin-slow animation-delay-2000"></div>
        <div className="absolute top-2/3 left-1/5 w-14 h-14 bg-pink-400/20 rotate-45 animate-spin-slow animation-delay-4000"></div>
        <div className="absolute top-1/6 right-1/3 w-18 h-18 bg-cyan-400/20 rotate-45 animate-spin-slow animation-delay-6000"></div>

        {/* Animated particles/stars */}
        <div className="absolute top-10 left-10 w-2 h-2 bg-white/40 rounded-full animate-twinkle"></div>
        <div className="absolute top-32 left-32 w-1.5 h-1.5 bg-indigo-300/60 rounded-full animate-twinkle animation-delay-1000"></div>
        <div className="absolute top-56 left-56 w-2 h-2 bg-purple-300/60 rounded-full animate-twinkle animation-delay-2000"></div>
        <div className="absolute top-80 left-80 w-1.5 h-1.5 bg-pink-300/60 rounded-full animate-twinkle animation-delay-3000"></div>
        <div className="absolute top-20 right-20 w-2 h-2 bg-white/40 rounded-full animate-twinkle animation-delay-4000"></div>
        <div className="absolute top-44 right-44 w-1.5 h-1.5 bg-cyan-300/60 rounded-full animate-twinkle animation-delay-5000"></div>
        <div className="absolute top-68 right-68 w-2 h-2 bg-violet-300/60 rounded-full animate-twinkle animation-delay-6000"></div>
        <div className="absolute bottom-20 left-20 w-1.5 h-1.5 bg-white/40 rounded-full animate-twinkle animation-delay-7000"></div>
        <div className="absolute bottom-44 left-44 w-2 h-2 bg-indigo-300/60 rounded-full animate-twinkle animation-delay-8000"></div>
        <div className="absolute bottom-68 right-20 w-1.5 h-1.5 bg-purple-300/60 rounded-full animate-twinkle animation-delay-9000"></div>
        <div className="absolute bottom-32 right-32 w-2 h-2 bg-pink-300/60 rounded-full animate-twinkle animation-delay-10000"></div>
        <div className="absolute top-1/2 right-1/5 w-1.5 h-1.5 bg-cyan-300/60 rounded-full animate-twinkle animation-delay-11000"></div>

        {/* Animated grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] animate-grid-move"></div>

        {/* Shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 animate-shimmer"></div>

        {/* Wavy lines */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <svg className="absolute top-1/4 left-0 w-full h-64 animate-wave" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,60 C300,100 600,20 900,60 C1050,80 1150,40 1200,60 L1200,120 L0,120 Z" fill="url(#gradient1)"></path>
            <defs>
              <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#a855f7" stopOpacity="0.5" />
              </linearGradient>
            </defs>
          </svg>
          <svg className="absolute bottom-1/4 left-0 w-full h-64 animate-wave-reverse" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,60 C300,20 600,100 900,60 C1050,40 1150,80 1200,60 L1200,0 L0,0 Z" fill="url(#gradient2)"></path>
            <defs>
              <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ec4899" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.5" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/30 backdrop-blur-xl shadow-lg border-b border-white/20 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <a href="#" className="group">
              <div className="font-playfair text-2xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300">
                Tommaso <span className="text-white/90">Rossino</span>
              </div>
            </a>
            <div className="hidden md:flex space-x-8 items-center">
              <NavLink href="#about">About</NavLink>
              <NavLink href="#skills">Skills</NavLink>
              <NavLink href="#experience">Experience</NavLink>
              <NavLink href="#projects">Projects</NavLink>
              <NavLink href="#contact">Contact</NavLink>
            </div>
            <button
              className="md:hidden text-white hover:text-indigo-300 transition p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
          {mobileMenuOpen && (
            <div className="md:hidden pb-4 space-y-3 pt-4 border-t border-white/20">
              <NavLink href="#about">About</NavLink>
              <NavLink href="#skills">Skills</NavLink>
              <NavLink href="#experience">Experience</NavLink>
              <NavLink href="#projects">Projects</NavLink>
              <NavLink href="#contact">Contact</NavLink>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8 animate-fade-in">
            <h1 className="text-6xl md:text-8xl font-playfair font-bold text-white mb-6 leading-tight">
              Tommaso <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Rossino</span>
            </h1>
          </div>
          <p className="text-3xl md:text-4xl text-indigo-300 font-semibold mb-6 animate-fade-in-delay">
            Staff Software Engineer & Technical Lead
          </p>
          <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-12 animate-fade-in-delay-2">
            15+ years of experience architecting and developing complex web applications.
            <br />
            Translating business needs into scalable solutions.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-white/90 mb-12 animate-fade-in-delay-3">
            <div className="flex items-center gap-3 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/20 transition">
              <MapPin className="w-5 h-5 text-indigo-400" />
              <span>Los Angeles, California</span>
            </div>
            <a href="mailto:tommaso.rossino@gmail.com" className="flex items-center gap-3 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/20 transition">
              <Mail className="w-5 h-5 text-indigo-400" />
              <span>tommaso.rossino@gmail.com</span>
            </a>
            <div className="flex items-center gap-3 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <Phone className="w-5 h-5 text-indigo-400" />
              <span>+1 (747) 204-9585</span>
            </div>
          </div>
          <div className="flex justify-center gap-4 animate-fade-in-delay-4">
            <a
              href="https://www.linkedin.com/in/tommasorossino/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 shadow-2xl hover:shadow-indigo-500/50 hover:scale-105"
            >
              <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="font-semibold">LinkedIn</span>
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-white/5 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-playfair font-bold text-white mb-12 text-center">About</h2>
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl">
            <p className="text-white/90 leading-relaxed text-lg md:text-xl">
              Seasoned Staff Software Engineer and Technical Lead with 15+ years experience
              architecting and developing complex web applications. Known for translating business
              needs into scalable solutions, guiding international teams, modernizing architectures,
              and delivering high-quality products in agile environments. Proficient in React, Java,
              Groovy, microservices, and TDD.
            </p>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-playfair font-bold text-white mb-16 text-center">Core Skills</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <SkillCategory
              icon={<Code className="w-8 h-8" />}
              title="Frontend"
              skills={['React', 'JavaScript (ESNext)', 'TypeScript', 'Redux', 'Next.js', 'TanStack Query', 'AngularJS', 'D3.js']}
            />
            <SkillCategory
              icon={<Database className="w-8 h-8" />}
              title="Backend/Full-Stack"
              skills={['Node.js', 'Java', 'Groovy', 'Spring Framework', 'Microservices', 'REST/SOAP']}
            />
            <SkillCategory
              icon={<Cloud className="w-8 h-8" />}
              title="DevOps/Tooling"
              skills={['CI/CD', 'TDD', 'Git (GitHub/GitLab)', 'Docker', 'AWS', 'Jenkins', 'Figma']}
            />
            <SkillCategory
              icon={<Database className="w-8 h-8" />}
              title="Database"
              skills={['MySQL', 'Oracle SQL', 'PostgreSQL', 'Snowflake']}
            />
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-white/5 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-playfair font-bold text-white mb-16 text-center">Experience</h2>
          <div className="space-y-8">
            <ExperienceCard
              company="CleverFi"
              location="Los Angeles, California"
              role="Staff Front-End Engineer"
              period="Sep 2025 - Present"
              achievements={[
                {
                  icon: <Target className="w-5 h-5" />,
                  title: "Architectural Leadership",
                  description: "Guides the technical direction and front-end architecture for the core CleverFi platform, focusing on scalability, maintainability, and enterprise-grade performance within the React/TypeScript ecosystem."
                },
                {
                  icon: <Award className="w-5 h-5" />,
                  title: "Performance Optimization",
                  description: "Directed the implementation of critical performance optimization strategies and Web Vitals improvements, resulting in a 15% reduction in average platform load time and significant user experience uplift."
                },
                {
                  icon: <Users className="w-5 h-5" />,
                  title: "Cross-Functional Strategy",
                  description: "Drives cross-functional alignment with Product and Back-end teams (Node.js/Microservices) to define the technical roadmap and champion the adoption of next-generation technologies like Next.js for Server-Side Rendering (SSR)."
                },
                {
                  icon: <Code className="w-5 h-5" />,
                  title: "Design System & Efficiency",
                  description: "Acts as the technical owner of the Design System (leveraging Figma for design integration) and reusable component library, increasing front-end development efficiency by an estimated 20% through documentation and component standardization."
                }
              ]}
            />
            <ExperienceCard
              company="SoftServe"
              location="Los Angeles, California"
              role="Staff Software Engineer"
              period="Jun 2023 - Sep 2025"
              achievements={[
                {
                  icon: <Briefcase className="w-5 h-5" />,
                  title: "Splunk (a Cisco Company)",
                  description: "Directed a cross-functional team in engineering a new data ingestion and real-time visualization module for Splunk's core security platform. The solution improved data processing efficiency by 20% and was a key feature in a major product release."
                },
                {
                  icon: <Briefcase className="w-5 h-5" />,
                  title: "Tricon Residential",
                  description: "Directed the full-stack creation and evolution of the resident-facing mobile ecosystem (iOS/Android) used by 35,000+ real estate units. The app centralized all resident services, including smart-home functionality, secure rent payments, and digital document management. Achieved outstanding ratings (4.7 on App Store, 4.4 on Play Store)."
                },
                {
                  icon: <Briefcase className="w-5 h-5" />,
                  title: "Modivcare",
                  description: "Architected and led the development of a mission-critical Trip Validation Service built on a highly available architecture using Groovy. This service utilized complex Business Process Management (BPM) to govern and execute all travel validations, becoming the core system for a strategic partnership with Uber and enabling a new, significant revenue stream for the client."
                }
              ]}
            />
            <ExperienceCard
              company="HoverState"
              location="Torino, Italy - Los Angeles, CA"
              role="Staff Software Engineer & Italian Technical Lead"
              period="Aug 2018 - Jun 2023"
              achievements={[
                {
                  icon: <Briefcase className="w-5 h-5" />,
                  title: "UnitedHealthcare Group (UHC)",
                  description: "Masterminded the turnaround of a critical healthcare insurance platform over 8 years, leading a 7-developer team to migrate from AngularJS to React/Redux, boosting performance by 35% and cutting errors by 90%. Also directed development of key features like real-time quoting, establishing the platform as a market leader."
                },
                {
                  icon: <Users className="w-5 h-5" />,
                  title: "Italian Head of Technology",
                  description: "Entrusted with building the company's first European engineering division from scratch. Single-handedly managed the strategy, recruitment, and operational leadership, creating a highly profitable, strategic asset for the company's global operations."
                }
              ]}
            />
            <ExperienceCard
              company="ISCS Consulting"
              location="Turin, Italy"
              role="Senior JavaScript Engineer"
              period="December 2017 - July 2018"
              achievements={[
                {
                  icon: <Briefcase className="w-5 h-5" />,
                  title: "TopCon Agriculture",
                  description: "Architected and led the development of a high-performance precision agriculture data platform. The platform's web applications processed and visualized massive datasets from diverse field sensors and satellite imagery, providing farmers with actionable insights for crop optimization, resource management, and predictive yield analysis. This initiative was instrumental in achieving a 30% increase in user satisfaction."
                },
                {
                  icon: <Briefcase className="w-5 h-5" />,
                  title: "RGI Group",
                  description: "Engineered a high-performance insurance quoting engine for a major international insurer's primary web application."
                }
              ]}
            />
            <ExperienceCard
              company="EtiQa"
              location="Torino, Italy"
              role="Senior JavaScript Engineer"
              period="Nov 2014 - Nov 2017"
              achievements={[
                {
                  icon: <Briefcase className="w-5 h-5" />,
                  title: "Fiat Chrysler Automobiles (FCA)",
                  description: "Led a team of front-end developers in creating the cross-brand (Fiat, Jeep, Alfa Romeo) vehicle configurator. Assumed leadership of the project during a critical phase 2 months before the deadline, guiding it to a successful launch. The platform was successfully deployed in 10+ European markets and 15+ languages."
                },
                {
                  icon: <Briefcase className="w-5 h-5" />,
                  title: "UnitedHealthcare Group SmallBusiness (UHC)",
                  description: "As a consultant for Hoverstate, implemented foundational components for the application, managing integration with third party services (SOAP/REST)."
                }
              ]}
            />
            <ExperienceCard
              company="ZeroB"
              location="Torino, Italy"
              role="Full-stack Developer"
              period="Feb 2013 - Oct 2014"
              achievements={[
                {
                  icon: <Briefcase className="w-5 h-5" />,
                  title: "Internal Time-Tracking System",
                  description: "Engineered and deployed a company-wide, internal time-tracking and project reporting system, improving the accuracy of client billing and resource management."
                },
                {
                  icon: <Briefcase className="w-5 h-5" />,
                  title: "Juventus FC",
                  description: "Led the complete re-engineering of Juventus FC's internal team and player management system. The new platform, built with a Java/JavaScript framework, improved the club's operational efficiency by 30%."
                }
              ]}
            />
            <ExperienceCard
              company="SCAI GROUP SPA"
              location="Torino, Italy"
              role="Full-stack Developer"
              period="July 2012 - January 2013"
              achievements={[
                {
                  icon: <Briefcase className="w-5 h-5" />,
                  title: "Enterprise Resource Planning (ERP)",
                  description: "Engineered a custom enterprise resource planning (ERP) module using Java, Spring, and Hibernate to automate employee workflows. My solution reduced manual data entry across the company by 40%."
                }
              ]}
            />
            <ExperienceCard
              company="DGTMedia"
              location="Torino, Italy"
              role="Web Developer"
              period="June 2010 - October 2011"
              achievements={[
                {
                  icon: <Briefcase className="w-5 h-5" />,
                  title: "Avio",
                  description: "Developed a secure, internal web portal for the aerospace company to manage sensitive project documentation and vendor communications."
                },
                {
                  icon: <Briefcase className="w-5 h-5" />,
                  title: "Juventus FC Website",
                  description: "Contributed to the front-end development and launch of the club's new official public-facing website."
                }
              ]}
            />
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-playfair font-bold text-white mb-16 text-center">Key Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ProjectCard
              title="CleverFi Platform"
              description="Core financial platform with 15% performance improvement and enterprise-grade architecture"
              tech={['React', 'TypeScript', 'Next.js', 'Node.js']}
              highlight="15% load time reduction"
            />
            <ProjectCard
              title="Splunk Security Platform"
              description="Data ingestion and real-time visualization module improving processing efficiency by 20%"
              tech={['React', 'TypeScript', 'Microservices']}
              highlight="20% efficiency gain"
            />
            <ProjectCard
              title="Tricon Residential App"
              description="Mobile ecosystem for 35,000+ units with smart-home integration and payment systems"
              tech={['React Native', 'iOS', 'Android', 'Full-Stack']}
              highlight="4.7★ App Store rating"
            />
            <ProjectCard
              title="Modivcare Trip Validation"
              description="Mission-critical BPM service enabling strategic Uber partnership and new revenue stream"
              tech={['Groovy', 'BPM', 'Microservices']}
              highlight="Strategic partnership"
            />
            <ProjectCard
              title="UHC Healthcare Platform"
              description="Platform migration from AngularJS to React/Redux with 35% performance boost and 90% error reduction"
              tech={['React', 'Redux', 'AngularJS']}
              highlight="35% performance boost"
            />
            <ProjectCard
              title="FCA Vehicle Configurator"
              description="Cross-brand configurator deployed in 10+ European markets and 15+ languages"
              tech={['JavaScript', 'React', 'Multi-language']}
              highlight="10+ markets"
            />
            <ProjectCard
              title="TopCon Agriculture Platform"
              description="High-performance data platform processing massive datasets from sensors and satellite imagery"
              tech={['JavaScript', 'Data Visualization', 'D3.js']}
              highlight="30% satisfaction increase"
            />
            <ProjectCard
              title="Juventus FC Management System"
              description="Complete re-engineering of team and player management system improving efficiency by 30%"
              tech={['Java', 'JavaScript', 'Full-Stack']}
              highlight="30% efficiency gain"
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-white/5 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-playfair font-bold text-white mb-8">Get In Touch</h2>
          <p className="text-xl text-white/80 mb-12">
            I'm always open to discussing new opportunities, interesting projects, or just connecting with fellow engineers.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <a
              href="mailto:tommaso.rossino@gmail.com"
              className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 shadow-2xl hover:shadow-indigo-500/50 hover:scale-105"
            >
              <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="font-semibold">Email Me</span>
            </a>
            <a
              href="https://www.linkedin.com/in/tommasorossino/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full hover:from-blue-500 hover:to-cyan-500 transition-all duration-300 shadow-2xl hover:shadow-blue-500/50 hover:scale-105"
            >
              <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="font-semibold">LinkedIn</span>
            </a>
            <a
              href="tel:+17472049585"
              className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-gray-700 to-gray-800 text-white rounded-full hover:from-gray-600 hover:to-gray-700 transition-all duration-300 shadow-2xl hover:shadow-gray-500/50 hover:scale-105"
            >
              <Phone className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="font-semibold">Call Me</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-8 px-4 sm:px-6 lg:px-8 bg-black/40 backdrop-blur-sm border-t border-white/10 text-center">
        <p className="text-white/60">
          © {new Date().getFullYear()} Tommaso Rossino. All rights reserved.
        </p>
      </footer>
    </div>
  )
}

function SkillCategory({ icon, title, skills }: { icon: React.ReactNode, title: string, skills: string[] }) {
  return (
    <div className="group bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-2xl hover:bg-white/15 transition-all duration-300 hover:scale-105">
      <div className="text-indigo-400 mb-4 group-hover:scale-110 transition-transform duration-300">{icon}</div>
      <h3 className="text-xl font-semibold text-white mb-4">{title}</h3>
      <ul className="space-y-2">
        {skills.map((skill, idx) => (
          <li key={idx} className="text-white/80 flex items-center group/item">
            <span className="w-2 h-2 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full mr-3 group-hover/item:scale-150 transition-transform"></span>
            {skill}
          </li>
        ))}
      </ul>
    </div>
  )
}

function ExperienceCard({
  company,
  location,
  role,
  period,
  achievements
}: {
  company: string
  location: string
  role: string
  period: string
  achievements: Array<{ icon: React.ReactNode, title: string, description: string }>
}) {
  return (
    <div className="group bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-xl hover:shadow-2xl hover:bg-white/15 transition-all duration-300">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">{company}</h3>
          <p className="text-xl bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent font-semibold mb-1">{role}</p>
          <p className="text-white/70">{location}</p>
        </div>
        <div className="mt-4 md:mt-0">
          <span className="inline-block px-4 py-2 bg-indigo-500/20 text-indigo-300 rounded-full text-sm font-semibold border border-indigo-400/30">
            {period}
          </span>
        </div>
      </div>
      <div className="space-y-4">
        {achievements.map((achievement, idx) => (
          <div key={idx} className="relative pl-4 bg-gradient-to-r from-indigo-500/10 to-transparent rounded-r-lg p-3">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-l"></div>
            <div className="flex items-start gap-3 mb-2">
              <div className="text-indigo-400 mt-0.5">{achievement.icon}</div>
              <h4 className="font-semibold text-white">{achievement.title}</h4>
            </div>
            <p className="text-white/80 ml-8">{achievement.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function ProjectCard({
  title,
  description,
  tech,
  highlight
}: {
  title: string
  description: string
  tech: string[]
  highlight: string
}) {
  return (
    <div className="group bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-2xl hover:bg-white/15 transition-all duration-300 h-full flex flex-col hover:scale-105">
      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors">{title}</h3>
      <p className="text-white/80 mb-4 flex-grow">{description}</p>
      <div className="mb-4">
        <span className="inline-block px-3 py-1 bg-gradient-to-r from-indigo-500/30 to-purple-500/30 text-indigo-200 rounded-full text-sm font-semibold border border-indigo-400/30">
          {highlight}
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {tech.map((t, idx) => (
          <span key={idx} className="px-3 py-1 bg-white/10 text-white/90 rounded-lg text-xs border border-white/20 backdrop-blur-sm">
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}
