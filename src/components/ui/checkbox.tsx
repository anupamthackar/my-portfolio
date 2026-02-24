import { motion, type Variants } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Mail, Phone, Linkedin, Github, Calendar, Award, Code, Cpu, Database, Layers, Terminal, ExternalLink, BookOpen, ChevronDown, Folder, Sparkles } from 'lucide-react';

// Animation Variants
const fadeIn: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15
    }
  }
};

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
  }
};

const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }
  }
};

const slideInRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }
  }
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
  }
};

const hoverScale = {
  scale: 1.03,
  transition: { duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] as const }
};

// Blog data from your blogspot
const blogPosts = [
  {
    title: "Mastering Cross-Platform Swift Development: How to Set Up Skip, Manage Dependencies, and Write Smarter Code",
    date: "July 30, 2025",
    excerpt: "Unlock powerful insights every Swift developer should know for building truly native iOS and Android apps—all from one codebase using Skip.",
    url: "https://anupamthackarios.blogspot.com/2025/07/mastering-cross-platform-swift.html",
    tags: ["Swift", "Cross-platform", "Skip", "iOS", "Android"]
  }
];

// LinkedIn posts data
const linkedInPosts = [
  {
    title: "Build Native iOS and Android Apps with Swift and SwiftUI",
    date: "July 29, 2025",
    excerpt: "Sharing insights on cross-platform development using Swift and SwiftUI for both iOS and Android platforms.",
    url: "https://www.linkedin.com/posts/anupamthackar67_swiftlang-mobiledevelopment-android-activity-7355919622774177792-CAwg",
    tags: ["SwiftLang", "MobileDevelopment", "Android"]
  },
  {
    title: "Cross-Platform Swift Development",
    excerpt: "How to Set Up Skip, Manage Dependencies, and Write Smarter Code",
    url: "https://www.linkedin.com/posts/anupamthackar67_mastering-cross-platform-swift-development-activity-7356271487567171584-W7-d?utm_source=share&utm_medium=member_desktop&rcm=ACoAADMmWOwBT79Ntl7O_p-YlkML2KXDz3Qs14g",
    tags: ["JavaScript", "Interview", "Programming"]
  },
  {
    title: "The Future of iOS Coding!",
    excerpt: "How are you using AI in your iOS projects?",
    url: "https://www.linkedin.com/posts/anupamthackar67_iosdeveloper-ai-swift-activity-7381700419300917249--1wl?utm_source=share&utm_medium=member_desktop&rcm=ACoAADMmWOwBT79Ntl7O_p-YlkML2KXDz3Qs14g",
    tags: ["iOSDeveloper", "AI","Swift", "Xcode"]
  },
  {
    title: "My E-commerce UI App Built Entirely in SwiftUI",
    excerpt: "Over the past few weeks, I've been working solo on a personal project to sharpen my SwiftUI and iOS app development skills.",
    url: "https://www.linkedin.com/posts/anupamthackar67_iosdevelopment-swiftui-mobileappdesign-activity-7345400912565133313-CHMD?utm_source=share&utm_medium=member_desktop&rcm=ACoAADMmWOwBT79Ntl7O_p-YlkML2KXDz3Qs14g",
    tags: ["iOSDevelopment", "SwiftUI", "MobileAppDesign", "EcommerceApp", "UIDesign"]
  }
  
];

// Projects data from resume
const projects = [
  {
    title: "Tata Motor Fleet Edge",
    subtitle: "WatchOS Application",
    description: "SwiftUI-based watch application with seamless React Native mobile app integration",
    highlights: [
      "Implemented WatchConnectivity framework for real-time data synchronization between devices",
      "Integrated AI chat assistant with SSE streaming and speech-to-text functionality",
      "Built driving behavior analytics features to monitor and analyze user driving patterns"
    ],
    tags: ["SwiftUI", "WatchOS", "WatchConnectivity", "React Native", "SSE", "AI Integration"],
    icon: <Cpu className="w-6 h-6" />,
    color: "from-orange-500 to-red-500"
  },
  {
    title: "Cinko (US)",
    subtitle: "Travel/Hospitality Platform",
    description: "Led Phase 2 redesign migration from UIKit to SwiftUI, enhancing user interface and experience",
    highlights: [
      "Developed hotel booking system with radius-based discovery and location services",
      "Integrated Stripe and Apple Pay payment gateways for seamless transaction processing",
      "Implemented multi-provider authentication system and AI-driven chat assistant",
      "Migrated project dependencies from CocoaPods to Swift Package Manager"
    ],
    tags: ["SwiftUI", "UIKit", "CoreLocation", "Stripe", "Apple Pay", "SPM", "Authentication"],
    icon: <Sparkles className="w-6 h-6" />,
    color: "from-blue-500 to-cyan-500"
  },
  {
    title: "Tata AIG Insurance",
    subtitle: "Insurance Application",
    description: "Performed maintenance and feature enhancements using MVVM architecture",
    highlights: [
      "Developed policy linking, claims processing, and document sharing functionalities",
      "Implemented network locator feature for branch and service center discovery",
      "Ensured robust error handling and data validation across insurance workflows"
    ],
    tags: ["Swift", "MVVM", "Core Data", "Document Sharing", "Maps Integration"],
    icon: <Layers className="w-6 h-6" />,
    color: "from-green-500 to-teal-500"
  },
  {
    title: "Union Bank India",
    subtitle: "Mobile Banking Application",
    description: "Conducted stability improvements and performance optimizations",
    highlights: [
      "Resolved critical production issues ensuring minimal downtime",
      "Enhanced user experience through performance tuning and memory optimization",
      "Implemented security enhancements for banking-grade data protection"
    ],
    tags: ["Swift", "Performance Optimization", "Security", "Banking", "Maintenance"],
    icon: <Database className="w-6 h-6" />,
    color: "from-purple-500 to-pink-500"
  },
  {
    title: "NeoStore",
    subtitle: "E-commerce Training Project",
    description: "Built comprehensive e-commerce application with product catalog and order management",
    highlights: [
      "Implemented store locator functionality and user profile management system",
      "Developed shopping cart with real-time price calculations and inventory checks",
      "Created intuitive product catalog with filtering and search capabilities"
    ],
    tags: ["Swift", "UIKit", "E-commerce", "Maps", "User Management"],
    icon: <Folder className="w-6 h-6" />,
    color: "from-yellow-500 to-orange-500"
  }
];

function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState('hero');
  
  const skills = [
    { category: 'iOS Development', items: ['Swift', 'UIKit', 'SwiftUI', 'watchOS', 'WatchConnectivity', 'Combine','Concurrency', 'MVVM Architecture', 'async/await', 'Memory Management'], icon: <Code className="w-5 h-5" /> },
    { category: 'Backend & Integration', items: ['REST APIs', 'URLSession', 'Alamofire', 'SSE Streaming', 'AI Chat Assistant Integration', 'Speech-to-Text', 'React Native Bridging'], icon: <Cpu className="w-5 h-5" /> },
    { category: 'Data & Core Technologies', items: ['Core Data', 'CoreLocation', 'AVFoundation', 'CocoaPods', 'Swift Package Manager (SPM)', 'Git/GitHub'], icon: <Database className="w-5 h-5" /> },
    { category: 'Problem Solving & Algorithms', items: ['Data Structures & Algorithms', 'Python', 'SQL', 'Low-Level Design (LLD)'], icon: <Terminal className="w-5 h-5" /> }
  ];

  const certifications = [
    'Data Structures & Algorithms',
    'Python Programming',
    'SQL Database Management',
    'Low-Level Design (LLD)',
    'High-Level Design (HLD)'
  ];

  const achievements = [
    'Top 10% performer in Scaler Academy programming challenges',
    'Successfully solved 500+ Data Structures and Algorithms problems',
    'Experience in international client collaboration and timezone coordination (US client projects)'
  ];

  // Scroll spy to track active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'experience', 'skills', 'projects', 'education', 'blogs', 'certifications', 'contact'];
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div ref={containerRef} className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-x-hidden">
      {/* Fixed Navigation */}
      <motion.nav 
        className="fixed top-0 left-0 right-0 z-50 bg-slate-900/90 backdrop-blur-xl border-b border-slate-700/30"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <motion.h1 
            className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent cursor-pointer"
            onClick={() => scrollToSection('hero')}
            whileHover={{ scale: 1.05 }}
          >
            Anupam Thackar
          </motion.h1>
          <div className="hidden md:flex gap-1">
            {[
              { id: 'about', label: 'About' },
              { id: 'experience', label: 'Experience' },
              { id: 'skills', label: 'Skills' },
              { id: 'projects', label: 'Projects' },
              { id: 'blogs', label: 'Blogs' },
              { id: 'certifications', label: 'Certifications' },
              { id: 'contact', label: 'Contact' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                  activeSection === item.id 
                    ? 'bg-cyan-500/20 text-cyan-400' 
                    : 'text-slate-400 hover:text-cyan-400 hover:bg-slate-800/50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </motion.nav>

      {/* Hero Section - Full Screen with Fade In */}
      <motion.section 
        id="hero"
        className="min-h-screen flex items-center justify-center pt-20 px-6 relative"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6, type: 'spring' }}
          >
            <div className="relative inline-block">
              <img 
                src="/profile-hero.png" 
                alt="Anupam Thackar" 
                className="w-40 h-40 md:w-52 md:h-52 rounded-full object-cover border-4 border-cyan-500/30 shadow-2xl shadow-cyan-500/20"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500/20 to-transparent"></div>
            </div>
          </motion.div>
          
          <motion.div 
            className="mb-6 inline-block px-5 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-sm font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            iOS Developer
          </motion.div>
          
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-200 to-blue-300 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Anupam Thackar
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            Experienced iOS Developer with 1.8+ years of expertise in developing production-ready iOS and watchOS applications using Swift, UIKit, and SwiftUI. Proven track record in MVVM architecture, real-time feature integration, and cross-functional team collaboration.
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <motion.button 
              onClick={() => scrollToSection('contact')}
              className="px-8 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-lg shadow-cyan-500/25"
              whileHover={hoverScale}
              whileTap={{ scale: 0.98 }}
            >
              Get In Touch
            </motion.button>
            <motion.button 
              onClick={() => scrollToSection('experience')}
              className="px-8 py-3 rounded-full border border-slate-600 text-slate-300 font-semibold hover:border-cyan-500 hover:text-cyan-400 transition-colors"
              whileHover={hoverScale}
              whileTap={{ scale: 0.98 }}
            >
              View Experience
            </motion.button>
          </motion.div>

          <motion.div
            className="mt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <motion.div 
              className="animate-bounce cursor-pointer"
              onClick={() => scrollToSection('about')}
            >
              <ChevronDown className="w-8 h-8 text-slate-500 mx-auto" />
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* About Section with Photo Gallery */}
      <section id="about" className="min-h-screen flex items-center py-20 px-6">
        <div className="max-w-6xl mx-auto w-full">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
          >
            <motion.h2 
              className="text-3xl md:text-5xl font-bold mb-16 text-center"
              variants={fadeIn}
            >
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">About Me</span>
            </motion.h2>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div variants={slideInLeft} className="space-y-6">
                <p className="text-lg text-slate-300 leading-relaxed">
                  I'm a passionate iOS Developer based in India, currently working at NeoSoft. With a strong foundation in Computer Science from MIT ADT University and specialized training from Scaler Academy, I bring deep technical understanding along with practical, results-driven development experience to every project.
                </p>
                <p className="text-lg text-slate-300 leading-relaxed">
                  My journey in iOS development has been marked by continuous learning and innovation. I've successfully delivered production-ready applications across multiple domains including mobility, travel/hospitality, insurance, and banking sectors.
                </p>
                <div className="flex flex-wrap gap-3 pt-4">
                  {['Swift', 'SwiftUI', 'UIKit', 'watchOS', 'MVVM', 'Combine'].map((skill, i) => (
                    <span key={i} className="px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
              
              <motion.div variants={slideInRight} className="grid grid-cols-2 gap-4">
                <img src="/photo1.jpg" alt="Anupam" className="rounded-2xl shadow-xl hover:scale-105 transition-transform duration-300" />
                <img src="/photo3.jpg" alt="Anupam" className="rounded-2xl shadow-xl hover:scale-105 transition-transform duration-300 mt-12" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Work Experience Section - Fixed Padding */}
      <section id="experience" className="min-h-screen flex items-center py-20 px-6 bg-slate-900/50">
        <div className="max-w-5xl mx-auto w-full">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
          >
            <motion.h2 
              className="text-3xl md:text-5xl font-bold mb-16 text-center"
              variants={fadeIn}
            >
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Work Experience</span>
            </motion.h2>
            
            <motion.div 
              className="relative"
              variants={scaleIn}
            >
              {/* Timeline line */}
              <div className="absolute left-0 md:left-1/3 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/50 via-cyan-500/30 to-transparent hidden md:block"></div>
              
              <div className="bg-slate-800/40 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-slate-700/50 hover:border-cyan-500/30 transition-all duration-500">
                <div className="grid md:grid-cols-3 gap-8">
                  {/* Left - Company Info */}
                  <div className="md:text-right md:pr-8 relative">
                    <div className="flex items-center md:justify-end gap-2 text-cyan-400 mb-3">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm font-medium">April 2024 - Present</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-1">NeoSoft</h3>
                    <p className="text-slate-400">iOS Developer</p>
                    <div className="hidden md:block absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-cyan-500 shadow-lg shadow-cyan-500/50"></div>
                  </div>
                  
                  {/* Right - Responsibilities */}
                  <div className="md:col-span-2 md:pl-8">
                    <ul className="space-y-4">
                      {[
                        'Develop and maintain production iOS and watchOS applications using Swift, UIKit, and SwiftUI',
                        'Implement MVVM architecture patterns ensuring clean, scalable, and maintainable codebases',
                        'Integrate real-time features using Server-Sent Events (SSE) streaming for enhanced user experiences',
                        'Collaborate with cross-functional teams to deliver AI-assisted features including chat assistants and speech-to-text functionality',
                        'Lead modernization initiatives migrating legacy UIKit applications to SwiftUI',
                        'Provide ongoing maintenance and stability improvements across multiple industry verticals including mobility, travel/hospitality, insurance, and banking'
                      ].map((item, index) => (
                        <motion.li 
                          key={index}
                          className="flex items-start gap-4"
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1, duration: 0.4 }}
                        >
                          <span className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 mt-2 flex-shrink-0"></span>
                          <span className="text-slate-300 leading-relaxed">{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section - Staggered List Animation */}
      <section id="skills" className="min-h-screen flex items-center py-20 px-6">
        <div className="max-w-6xl mx-auto w-full">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
          >
            <motion.h2 
              className="text-3xl md:text-5xl font-bold mb-16 text-center"
              variants={fadeIn}
            >
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Technical Skills</span>
            </motion.h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {skills.map((skillGroup, index) => (
                <motion.div 
                  key={index}
                  className="group bg-slate-800/40 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 hover:border-cyan-500/50 hover:bg-slate-800/60 transition-all duration-500"
                  variants={staggerItem}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 text-cyan-400 group-hover:scale-110 transition-transform duration-300">
                      {skillGroup.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-white">{skillGroup.category}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map((skill, skillIndex) => (
                      <motion.span 
                        key={skillIndex}
                        className="px-4 py-2 rounded-full bg-slate-700/50 text-slate-300 text-sm border border-slate-600/50 hover:bg-cyan-500/10 hover:border-cyan-500/30 hover:text-cyan-400 transition-all duration-300 cursor-default"
                        whileHover={{ scale: 1.05 }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section - NEW */}
      <section id="projects" className="min-h-screen flex items-center py-20 px-6 bg-slate-900/50">
        <div className="max-w-6xl mx-auto w-full">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
          >
            <motion.h2 
              className="text-3xl md:text-5xl font-bold mb-16 text-center"
              variants={fadeIn}
            >
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Featured Projects</span>
            </motion.h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  className="group relative bg-slate-800/40 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-500 overflow-hidden"
                  variants={staggerItem}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                >
                  {/* Gradient accent */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${project.color}`}></div>
                  
                  {/* Icon */}
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${project.color} bg-opacity-10 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <div className="text-white">
                      {project.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-cyan-400 mb-3 font-medium">{project.subtitle}</p>
                  <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Highlights */}
                  <ul className="space-y-2 mb-6">
                    {project.highlights.slice(0, 2).map((highlight, hIndex) => (
                      <li key={hIndex} className="flex items-start gap-2 text-sm text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0"></span>
                        <span className="line-clamp-2">{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.slice(0, 4).map((tag, tagIndex) => (
                      <span 
                        key={tagIndex} 
                        className="px-2 py-1 rounded-full bg-slate-700/50 text-slate-400 text-xs border border-slate-600/30"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 4 && (
                      <span className="px-2 py-1 rounded-full bg-slate-700/50 text-slate-400 text-xs">
                        +{project.tags.length - 4}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="min-h-screen flex items-center py-20 px-6">
        <div className="max-w-5xl mx-auto w-full">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
          >
            <motion.h2 
              className="text-3xl md:text-5xl font-bold mb-16 text-center"
              variants={fadeIn}
            >
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Education</span>
            </motion.h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div 
                className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 hover:border-cyan-500/30 transition-all duration-500 group"
                variants={slideInLeft}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center gap-3 text-cyan-400 mb-4">
                  <Calendar className="w-5 h-5" />
                  <span className="text-sm font-medium">2018 - 2022</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">MIT ADT University</h3>
                <p className="text-slate-300 mb-3">B.Tech in Computer Science & Engineering</p>
                <p className="text-cyan-400/80 text-sm font-medium">CGPA: 7.16</p>
              </motion.div>
              
              <motion.div 
                className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 hover:border-cyan-500/30 transition-all duration-500 group"
                variants={slideInRight}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center gap-3 text-cyan-400 mb-4">
                  <Calendar className="w-5 h-5" />
                  <span className="text-sm font-medium">2022 - 2024</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">Scaler Academy</h3>
                <p className="text-slate-300">Specialization in Software Development & Problem Solving</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Blogs & LinkedIn Section */}
      <section id="blogs" className="min-h-screen flex items-center py-20 px-6 bg-slate-900/50">
        <div className="max-w-6xl mx-auto w-full">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
          >
            <motion.h2 
              className="text-3xl md:text-5xl font-bold mb-16 text-center"
              variants={fadeIn}
            >
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Blogs & Posts</span>
            </motion.h2>
            
            {/* Blog Posts */}
            <div className="mb-12">
              <motion.h3 
                className="text-xl font-semibold text-white mb-6 flex items-center gap-3"
                variants={fadeIn}
              >
                <BookOpen className="w-5 h-5 text-cyan-400" />
                Latest from My Blog
                <a 
                  href="https://anupamthackarios.blogspot.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="ml-auto text-sm text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                >
                  View All <ExternalLink className="w-4 h-4" />
                </a>
              </motion.h3>
              
              <div className="grid md:grid-cols-1 gap-6">
                {blogPosts.map((post, index) => (
                  <motion.a
                    key={index}
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block bg-slate-800/40 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-500"
                    variants={staggerItem}
                    whileHover={{ y: -5, scale: 1.01 }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3 text-cyan-400">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">{post.date}</span>
                      </div>
                      <ExternalLink className="w-5 h-5 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                    </div>
                    <h4 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors line-clamp-2">
                      {post.title}
                    </h4>
                    <p className="text-slate-400 mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
            
            {/* LinkedIn Posts */}
            <div>
              <motion.h3 
                className="text-xl font-semibold text-white mb-6 flex items-center gap-3"
                variants={fadeIn}
              >
                <Linkedin className="w-5 h-5 text-cyan-400" />
                LinkedIn Posts
                <a 
                  href="https://www.linkedin.com/in/anupamthackar/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="ml-auto text-sm text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                >
                  View Profile <ExternalLink className="w-4 h-4" />
                </a>
              </motion.h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                {linkedInPosts.map((post, index) => (
                  <motion.a
                    key={index}
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block bg-slate-800/40 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-500"
                    variants={staggerItem}
                    whileHover={{ y: -5, scale: 1.02 }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <Linkedin className="w-5 h-5 text-[#0A66C2]" />
                      <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                      {post.title}
                    </h4>
                    {post.date && <p className="text-sm text-slate-500 mb-2">{post.date}</p>}
                    <p className="text-slate-400 text-sm mb-3">{post.excerpt}</p>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="px-2 py-1 rounded-full bg-slate-700/50 text-slate-400 text-xs">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Certifications & Awards Section */}
      <section id="certifications" className="min-h-screen flex items-center py-20 px-6">
        <div className="max-w-5xl mx-auto w-full">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
          >
            <motion.h2 
              className="text-3xl md:text-5xl font-bold mb-16 text-center"
              variants={fadeIn}
            >
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Certifications & Awards</span>
            </motion.h2>
            
            <motion.div 
              className="mb-12"
              variants={staggerItem}
            >
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                <Layers className="w-5 h-5 text-cyan-400" />
                Scaler Academy Certification
              </h3>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {certifications.map((cert, index) => (
                  <motion.div 
                    key={index}
                    className="bg-slate-800/40 backdrop-blur-sm rounded-xl p-5 border border-slate-700/50 hover:border-cyan-500/30 transition-all duration-300"
                    variants={staggerItem}
                    whileHover={{ scale: 1.03, y: -3 }}
                  >
                    <span className="text-slate-300">{cert}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={staggerItem}>
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                <Award className="w-5 h-5 text-cyan-400" />
                Academic Achievements
              </h3>
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-start gap-4 bg-slate-800/30 backdrop-blur-sm rounded-xl p-5 border border-slate-700/30 hover:border-cyan-500/30 transition-all duration-300"
                    variants={staggerItem}
                    whileHover={{ x: 5 }}
                  >
                    <span className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 mt-2 flex-shrink-0"></span>
                    <span className="text-slate-300">{achievement}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen flex items-center py-20 px-6 bg-slate-900/50">
        <div className="max-w-4xl mx-auto w-full text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
          >
            <motion.h2 
              className="text-3xl md:text-5xl font-bold mb-8"
              variants={fadeIn}
            >
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Get In Touch</span>
            </motion.h2>
            
            <motion.p 
              className="text-lg text-slate-300 mb-12 max-w-xl mx-auto"
              variants={fadeIn}
            >
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap justify-center gap-6 mb-12"
              variants={staggerItem}
            >
              <motion.a 
                href="mailto:anupamthackar@gmail.com"
                className="flex items-center gap-3 px-8 py-5 bg-slate-800/40 backdrop-blur-sm rounded-2xl border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 group"
                whileHover={{ scale: 1.03, y: -3 }}
              >
                <Mail className="w-6 h-6 text-cyan-400 group-hover:scale-110 transition-transform" />
                <span className="text-slate-300">anupamthackar@gmail.com</span>
              </motion.a>
              <motion.a 
                href="tel:+918962219884"
                className="flex items-center gap-3 px-8 py-5 bg-slate-800/40 backdrop-blur-sm rounded-2xl border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 group"
                whileHover={{ scale: 1.03, y: -3 }}
              >
                <Phone className="w-6 h-6 text-cyan-400 group-hover:scale-110 transition-transform" />
                <span className="text-slate-300">+91 8962219884</span>
              </motion.a>
            </motion.div>

            <motion.div 
              className="flex justify-center gap-6"
              variants={staggerItem}
            >
              <motion.a 
                href="https://linkedin.com/in/anupamthackar"
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 rounded-2xl bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-all duration-300"
                whileHover={{ scale: 1.1, y: -3 }}
              >
                <Linkedin className="w-7 h-7" />
              </motion.a>
              <motion.a 
                href="https://github.com/anupamthackar"
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 rounded-2xl bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-all duration-300"
                whileHover={{ scale: 1.1, y: -3 }}
              >
                <Github className="w-7 h-7" />
              </motion.a>
              <motion.a 
                href="https://anupamthackarios.blogspot.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 rounded-2xl bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-all duration-300"
                whileHover={{ scale: 1.1, y: -3 }}
              >
                <BookOpen className="w-7 h-7" />
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-slate-500 text-sm">© 2024 Anupam Thackar. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;