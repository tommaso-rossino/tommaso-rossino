import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Mail, Phone, MapPin, Linkedin, Code, Database, Cloud, Briefcase, Award, Target, Users, Menu, X } from 'lucide-react'

export const Route = createFileRoute('/')({
  component: Portfolio,
})

function Portfolio() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-xl font-bold text-indigo-600">TR</div>
            <div className="hidden md:flex space-x-8">
              <a href="#about" className="text-gray-700 hover:text-indigo-600 transition">About</a>
              <a href="#skills" className="text-gray-700 hover:text-indigo-600 transition">Skills</a>
              <a href="#experience" className="text-gray-700 hover:text-indigo-600 transition">Experience</a>
              <a href="#projects" className="text-gray-700 hover:text-indigo-600 transition">Projects</a>
              <a href="#contact" className="text-gray-700 hover:text-indigo-600 transition">Contact</a>
            </div>
            <button
              className="md:hidden text-gray-700 hover:text-indigo-600 transition"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
          {mobileMenuOpen && (
            <div className="md:hidden pb-4 space-y-2">
              <a href="#about" className="block py-2 text-gray-700 hover:text-indigo-600 transition" onClick={() => setMobileMenuOpen(false)}>About</a>
              <a href="#skills" className="block py-2 text-gray-700 hover:text-indigo-600 transition" onClick={() => setMobileMenuOpen(false)}>Skills</a>
              <a href="#experience" className="block py-2 text-gray-700 hover:text-indigo-600 transition" onClick={() => setMobileMenuOpen(false)}>Experience</a>
              <a href="#projects" className="block py-2 text-gray-700 hover:text-indigo-600 transition" onClick={() => setMobileMenuOpen(false)}>Projects</a>
              <a href="#contact" className="block py-2 text-gray-700 hover:text-indigo-600 transition" onClick={() => setMobileMenuOpen(false)}>Contact</a>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
            Tommaso Rossino
          </h1>
          <p className="text-2xl md:text-3xl text-indigo-600 font-semibold mb-4">
            Staff Software Engineer & Technical Lead
          </p>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            15+ years of experience architecting and developing complex web applications.
            Translating business needs into scalable solutions.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-gray-600">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-indigo-600" />
              <span>Los Angeles, California</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-indigo-600" />
              <a href="mailto:tommaso.rossino@gmail.com" className="hover:text-indigo-600 transition">
                tommaso.rossino@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-indigo-600" />
              <span>+1 (747) 204-9585</span>
            </div>
          </div>
          <div className="mt-8 flex justify-center gap-4">
            <a
              href="https://www.linkedin.com/in/tommasorossino/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition shadow-lg"
            >
              <Linkedin className="w-5 h-5" />
              LinkedIn
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">About</h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed text-lg">
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
      <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Core Skills</h2>
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
      <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Experience</h2>
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
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Key Projects</h2>
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
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">Get In Touch</h2>
          <p className="text-xl text-gray-600 mb-12">
            I'm always open to discussing new opportunities, interesting projects, or just connecting with fellow engineers.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <a
              href="mailto:tommaso.rossino@gmail.com"
              className="flex items-center gap-3 px-6 py-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition shadow-lg"
            >
              <Mail className="w-5 h-5" />
              <span>Email Me</span>
            </a>
            <a
              href="https://www.linkedin.com/in/tommasorossino/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-lg"
            >
              <Linkedin className="w-5 h-5" />
              <span>LinkedIn</span>
            </a>
            <a
              href="tel:+17472049585"
              className="flex items-center gap-3 px-6 py-4 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition shadow-lg"
            >
              <Phone className="w-5 h-5" />
              <span>Call Me</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white text-center">
        <p className="text-gray-400">
          © {new Date().getFullYear()} Tommaso Rossino. All rights reserved.
        </p>
      </footer>
    </div>
  )
}

function SkillCategory({ icon, title, skills }: { icon: React.ReactNode, title: string, skills: string[] }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition">
      <div className="text-indigo-600 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-4">{title}</h3>
      <ul className="space-y-2">
        {skills.map((skill, idx) => (
          <li key={idx} className="text-gray-600 flex items-center">
            <span className="w-2 h-2 bg-indigo-600 rounded-full mr-3"></span>
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
    <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{company}</h3>
          <p className="text-xl text-indigo-600 font-semibold mb-1">{role}</p>
          <p className="text-gray-600">{location}</p>
        </div>
        <div className="mt-4 md:mt-0">
          <span className="inline-block px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold">
            {period}
          </span>
        </div>
      </div>
      <div className="space-y-4">
        {achievements.map((achievement, idx) => (
          <div key={idx} className="border-l-4 border-indigo-600 pl-4">
            <div className="flex items-start gap-3 mb-2">
              <div className="text-indigo-600 mt-0.5">{achievement.icon}</div>
              <h4 className="font-semibold text-gray-900">{achievement.title}</h4>
            </div>
            <p className="text-gray-700 ml-8">{achievement.description}</p>
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
    <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition h-full flex flex-col">
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 mb-4 flex-grow">{description}</p>
      <div className="mb-4">
        <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold">
          {highlight}
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {tech.map((t, idx) => (
          <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}
