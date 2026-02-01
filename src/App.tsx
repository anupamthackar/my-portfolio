import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence, easeInOut } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Mail, Phone, Linkedin, Github, Calendar, Award, Code, Cpu, Database, Layers, Terminal, ExternalLink, BookOpen, ChevronDown, Sun, Moon, Watch, Plane, Shield, Building2, ShoppingBag } from 'lucide-react';

// Enhanced Liquid Cursor with trail
const LiquidCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [isHovering, setIsHovering] = useState(false);
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([]);
  
  const springConfig = { damping: 15, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setTrail(prev => [...prev.slice(-12), { x: e.clientX, y: e.clientY, id: Date.now() }]);
    };
    const handleHover = (e: MouseEvent) => setIsHovering(!!(e.target as HTMLElement).closest('button, a, [data-hover]'));
    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleHover);
    return () => { window.removeEventListener('mousemove', moveCursor); window.removeEventListener('mouseover', handleHover); };
  }, [cursorX, cursorY]);

  return (
    <div className="hidden md:block pointer-events-none fixed inset-0 z-[9999]">
      {trail.map((point, i) => (
        <motion.div key={point.id} className="absolute rounded-full bg-cyan-400" initial={{ opacity: 0.6, scale: 1 }} animate={{ opacity: 0, scale: 0 }} transition={{ duration: 0.8 }}
          style={{ left: point.x - 4, top: point.y - 4, width: 8 - i * 0.5, height: 8 - i * 0.5 }} />
      ))}
      <motion.div className="fixed mix-blend-difference" style={{ x: cursorXSpring, y: cursorYSpring, translateX: '-50%', translateY: '-50%' }}>
        <motion.div className="bg-cyan-400 rounded-full" animate={{ width: isHovering ? 60 : 24, height: isHovering ? 60 : 24, opacity: isHovering ? 0.7 : 1 }} transition={{ type: "spring", stiffness: 500, damping: 28 }} />
      </motion.div>
      <motion.div className="fixed border-2 border-cyan-400/50 rounded-full" style={{ x: useSpring(cursorX, { damping: 30, stiffness: 200 }), y: useSpring(cursorY, { damping: 30, stiffness: 200 }), translateX: '-50%', translateY: '-50%', width: 40, height: 40 }} />
    </div>
  );
};

// Text Scramble
type ScrambleTextProps = {
  text: string;
  className?: string;
};

const ScrambleText = ({ text, className }: ScrambleTextProps) => {
  const [display, setDisplay] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplay(text.split("").map((char, index) => char === " " ? " " : index < iteration ? text[index] : chars[Math.floor(Math.random() * chars.length)]).join(""));
      if (iteration >= text.length) clearInterval(interval);
      iteration += 0.4;
    }, 35);
    return () => clearInterval(interval);
  }, [text]);
  return <span className={className}>{display}</span>;
};

// 3D Tilt Card
type Card3DProps = {
  children: React.ReactNode;
  className?: string;
};

const Card3D = ({ children, className }: Card3DProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glare, setGlare] = useState({ x: 50, y: 50 });
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setRotateX((y - 0.5) * -12);
    setRotateY((x - 0.5) * 12);
    setGlare({ x: x * 100, y: y * 100 });
  };
  
  return (
    <motion.div ref={ref} className={`relative ${className}`} onMouseMove={handleMouseMove} onMouseLeave={() => { setRotateX(0); setRotateY(0); }}
      style={{ transformStyle: "preserve-3d", perspective: 1000 }} animate={{ rotateX, rotateY }} transition={{ type: "spring", stiffness: 400, damping: 30 }}>
      {children}
      <div className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-20 transition-opacity duration-300" style={{ background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, white, transparent 50%)` }} />
    </motion.div>
  );
};

// Magnetic Button
const MagneticBtn = ({ children, className, onClick, href }: { children?: any; className?: string; onClick?: (e?: any) => void; href?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 400, damping: 25 });
  const springY = useSpring(y, { stiffness: 400, damping: 25 });
  const handleMouse = (e: any) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.35);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.35);
  };
  const Tag: any = href ? 'a' : 'button';
  return (
    <motion.div ref={ref} onMouseMove={handleMouse} onMouseLeave={() => { x.set(0); y.set(0); }} style={{ x: springX, y: springY }}>
      <Tag href={href} target={href ? "_blank" : undefined} rel={href ? "noopener noreferrer" : undefined} className={className} onClick={onClick}>{children}</Tag>
    </motion.div>
  );
};

// Scroll Reveal Animation Variants
const revealVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeInOut } }
};

const revealFromLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: easeInOut } }
};

const revealFromRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: easeInOut } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } }
};

const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeInOut } }
};

// Floating Particles
const Particles = ({ isDark }: { isDark: boolean }) => (
  <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
    {[...Array(25)].map((_, i) => (
      <motion.div key={i} className={`absolute rounded-full ${isDark ? 'bg-cyan-400/20' : 'bg-cyan-600/10'}`}
        style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, width: Math.random() * 6 + 2, height: Math.random() * 6 + 2 }}
        animate={{ y: [0, -40, 0], x: [0, Math.random() * 30 - 15, 0], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: Math.random() * 15 + 10, repeat: Infinity, ease: "easeInOut" }} />
    ))}
  </div>
);

// Data
const blogPosts = [{ title: "Mastering Cross-Platform Swift Development: How to Set Up Skip, Manage Dependencies, and Write Smarter Code", date: "July 30, 2025", excerpt: "Unlock powerful insights every Swift developer should know for building truly native iOS and Android apps—all from one codebase using Skip.", url: "https://anupamthackarios.blogspot.com/2025/07/mastering-cross-platform-swift.html", tags: ["Swift", "Cross-platform", "Skip", "iOS", "Android"] }];
const linkedInPosts = [
  { title: "Build Native iOS and Android Apps with Swift and SwiftUI", date: "July 29, 2025", excerpt: "Sharing insights on cross-platform development using Swift and SwiftUI.", url: "#", tags: ["SwiftLang", "MobileDevelopment"] },
  { title: "Cross-Platform Swift Development", excerpt: "How to Set Up Skip, Manage Dependencies, and Write Smarter Code", url: "#", tags: ["Swift", "Skip"] },
  { title: "The Future of iOS Coding!", excerpt: "How are you using AI in your iOS projects?", url: "#", tags: ["iOSDeveloper", "AI", "Swift"] },
  { title: "My E-commerce UI App Built Entirely in SwiftUI", excerpt: "Personal project to sharpen my SwiftUI skills.", url: "#", tags: ["SwiftUI", "UIDesign"] }
];

const projects = [
  { title: "Tata Motor Fleet Edge", subtitle: "WatchOS Application", icon: <Watch className="w-6 h-6" />, color: "from-blue-500 to-cyan-500", tags: ["SwiftUI", "WatchOS", "AI", "SSE"],
    features: ["SwiftUI-based watch app with React Native mobile integration", "WatchConnectivity for real-time data sync", "AI chat assistant with SSE streaming & speech-to-text", "Driving behavior analytics features"],
    url: "https://apps.apple.com/in/app/tata-motors-fleet-edge/id1556047027" },
  { title: "Cinko (US)", subtitle: "Travel/Hospitality Platform", icon: <Plane className="w-6 h-6" />, color: "from-purple-500 to-pink-500", tags: ["SwiftUI", "Stripe", "Apple Pay", "AI"],
    features: ["Led Phase 2 redesign: UIKit to SwiftUI migration", "Hotel booking with radius-based discovery", "Stripe & Apple Pay payment integration", "Multi-provider auth & AI chat assistant", "Migrated CocoaPods to Swift Package Manager"],
    url: "https://apps.apple.com/in/app/cinko/id1548717649" },
  { title: "Tata AIG", subtitle: "Insurance Application", icon: <Shield className="w-6 h-6" />, color: "from-green-500 to-emerald-500", tags: ["MVVM", "UIKit", "CoreLocation"],
    features: ["Maintenance & feature enhancements with MVVM", "Policy linking & claims processing", "Document sharing functionalities", "Network locator for branches & service centers"],
    url: "https://apps.apple.com/in/app/tata-aig-insurance/id1586595850" },
  { title: "Union Bank India", subtitle: "Mobile Banking Application", icon: <Building2 className="w-6 h-6" />, color: "from-orange-500 to-red-500", tags: ["iOS", "Performance", "Production"],
    features: ["Stability improvements & performance optimization", "Resolved critical production issues", "Ensured minimal downtime", "Enhanced user experience"], url: "https://apps.apple.com/in/app/ekam/id6466278547" },
  { title: "NeoStore", subtitle: "E-commerce Training Project", icon: <ShoppingBag className="w-6 h-6" />, color: "from-cyan-500 to-blue-500", tags: ["UIKit", "MVVM", "CoreData"],
    features: ["Product catalog & shopping cart", "Order management system", "Store locator functionality", "User profile management"],
    url: "https://github.com/anupamthackar/NeoStore-Training-App" }
];

function App() {
  const [isDark, setIsDark] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  
  const [isDesktop, setIsDesktop] = useState<boolean>(() => typeof window !== 'undefined' ? window.innerWidth >= 768 : true);
  useEffect(() => {
    const onResize = () => setIsDesktop(window.innerWidth >= 768);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  const sections = [
    { id: 'hero', label: 'Home' }, { id: 'about', label: 'About' }, { id: 'experience', label: 'Experience' },
    { id: 'skills', label: 'Skills' }, { id: 'projects', label: 'Projects' }, { id: 'education', label: 'Education' },
    { id: 'blogs', label: 'Blogs' }, { id: 'certifications', label: 'Certs' }, { id: 'contact', label: 'Contact' }
  ];

  const skills = [
    { category: 'iOS Development', items: ['Swift', 'UIKit', 'SwiftUI', 'watchOS', 'WatchConnectivity', 'Combine', 'Concurrency', 'MVVM', 'async/await', 'Memory Management'], icon: <Code className="w-5 h-5" /> },
    { category: 'Backend & Integration', items: ['REST APIs', 'URLSession', 'Alamofire', 'SSE Streaming', 'AI Chat Integration', 'Speech-to-Text', 'React Native Bridging'], icon: <Cpu className="w-5 h-5" /> },
    { category: 'Data & Core Technologies', items: ['Core Data', 'CoreLocation', 'AVFoundation', 'CocoaPods', 'Swift Package Manager', 'Git/GitHub'], icon: <Database className="w-5 h-5" /> },
    { category: 'Problem Solving', items: ['Data Structures & Algorithms', 'Python', 'SQL', 'Low-Level Design (LLD)'], icon: <Terminal className="w-5 h-5" /> }
  ];

  const certifications = ['Data Structures & Algorithms', 'Python Programming', 'SQL Database Management', 'Low-Level Design (LLD)', 'High-Level Design (HLD)'];
  const achievements = ['Top 10% performer in Scaler Academy programming challenges', 'Successfully solved 500+ Data Structures and Algorithms problems', 'Experience in international client collaboration (US client projects)'];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => setMousePos({ x: (e.clientX / window.innerWidth - 0.5) * 2, y: (e.clientY / window.innerHeight - 0.5) * 2 });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el && scrollPosition >= el.offsetTop && scrollPosition < el.offsetTop + el.offsetHeight) {
          setActiveSection(section.id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const t = {
    bg: isDark ? 'bg-slate-950' : 'bg-gray-50',
    text: isDark ? 'text-white' : 'text-slate-900',
    muted: isDark ? 'text-slate-300' : 'text-slate-600',
    faint: isDark ? 'text-slate-400' : 'text-slate-500',
    card: isDark ? 'bg-slate-800/40 border-slate-700/50' : 'bg-white/80 border-gray-200',
    cardHover: isDark ? 'hover:border-cyan-500/50' : 'hover:border-cyan-400',
    section: isDark ? 'bg-slate-900/50' : 'bg-gray-100/50',
  };

  return (
    <div className={`relative overflow-x-hidden ${t.bg} transition-colors duration-500`}>
      {/* <LiquidCursor />
      <Particles isDark={isDark} /> */}
      {isDesktop && <LiquidCursor />}
+     {isDesktop && <Particles isDark={isDark} />}
      {/* Parallax Background */}
      <div className="fixed inset-0 -z-10">
        <motion.div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px]" animate={{ x: mousePos.x * 50, y: mousePos.y * 50, background: isDark ? "radial-gradient(circle, rgba(6,182,212,0.25), transparent 70%)" : "radial-gradient(circle, rgba(6,182,212,0.12), transparent 70%)" }} />
        <motion.div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full blur-[120px]" animate={{ x: mousePos.x * -30, y: mousePos.y * -30, background: isDark ? "radial-gradient(circle, rgba(59,130,246,0.25), transparent 70%)" : "radial-gradient(circle, rgba(59,130,246,0.12), transparent 70%)" }} />
      </div>

      {/* Theme Toggle */}
      <motion.button onClick={() => setIsDark(!isDark)} className={`fixed top-6 right-6 z-[9998] w-12 h-12 rounded-full backdrop-blur-xl border flex items-center justify-center shadow-xl ${isDark ? 'bg-slate-800/80 border-slate-700' : 'bg-white/80 border-gray-200'}`}
        whileHover={{ scale: 1.1, rotate: 180 }} whileTap={{ scale: 0.9 }}>
        <AnimatePresence mode="wait">
          {isDark ? <motion.div key="m" initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0 }}><Moon className="w-5 h-5 text-cyan-400" /></motion.div>
            : <motion.div key="s" initial={{ scale: 0, rotate: 180 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0 }}><Sun className="w-5 h-5 text-orange-500" /></motion.div>}
        </AnimatePresence>
      </motion.button>

      {/* Sidebar Navigation */}
      <motion.nav className="fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-center gap-2" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
        <div className="relative">
          <div className={`w-1 h-56 rounded-full ${isDark ? 'bg-slate-800' : 'bg-gray-300'}`}>
            <motion.div className="w-full bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.6)]" style={{ height: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }} />
          </div>
          <div className="absolute left-5 top-0 flex flex-col h-full justify-between py-0.5">
            {sections.map((s) => (
              <motion.button key={s.id} onClick={() => scrollTo(s.id)}
                className={`text-[9px] font-mono uppercase tracking-wider transition-all whitespace-nowrap ${activeSection === s.id ? 'text-cyan-400 translate-x-1 font-bold' : isDark ? 'text-slate-500 hover:text-slate-300' : 'text-slate-400 hover:text-slate-600'}`}
                whileHover={{ x: 5 }}>
                {activeSection === s.id && <span className="mr-1 text-cyan-400">›</span>}{s.label}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.nav>

      {/* HERO */}
      <section id="hero" className="min-h-screen flex items-center justify-center px-6 lg:pl-28 relative">
        <div className="absolute bottom-0 w-full h-1/2 opacity-20" style={{ backgroundImage: `linear-gradient(to bottom, transparent, rgba(6,182,212,0.1)), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)`, backgroundSize: "100% 100%, 50px 50px, 50px 50px", transform: "perspective(500px) rotateX(60deg)", transformOrigin: "bottom" }} />
        
        <div className="text-center relative z-10 max-w-4xl mx-auto">
          <motion.div className="mb-8 relative inline-block" initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 150, damping: 20, delay: 0.2 }}>
            <motion.div className="w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 p-1" animate={{ boxShadow: ["0 0 30px rgba(6,182,212,0.4)", "0 0 60px rgba(6,182,212,0.7)", "0 0 30px rgba(6,182,212,0.4)"] }} transition={{ duration: 2, repeat: Infinity }}>
              <div className={`w-full h-full rounded-full overflow-hidden ${isDark ? 'bg-slate-950' : 'bg-gray-50'}`}>
                <img src="/profile-hero.png" alt="Anupam Thackar" className="w-full h-full object-cover" />
              </div>
            </motion.div>
            <motion.div className="absolute inset-[-12px] rounded-full border-2 border-cyan-400/30" animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }}>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,1)]" />
            </motion.div>
            <motion.div className="absolute inset-[-24px] rounded-full border border-cyan-400/15" animate={{ rotate: -360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} />
          </motion.div>
          
          
          
                    <motion.h1
            className={`font-black mb-5 ${t.text} whitespace-nowrap max-w-full overflow-hidden`}
            style={{ fontSize: 'clamp(1.5rem, 6vw, 3.75rem)', lineHeight: 1 }}
          >
            {"ANUPAM THACKAR".split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 80, rotateX: -90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ delay: 0.5 + i * 0.04, type: "spring", stiffness: 150 }}
                className="inline-block cursor-default hover:text-cyan-400 hover:scale-110 transition-transform duration-200"
                style={{ textShadow: isDark ? "0 0 40px rgba(6,182,212,0.3)" : "none" }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h1>
          <motion.div className="mb-5 inline-block px-5 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 backdrop-blur-sm" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <ScrambleText text="iOS DEVELOPER" className="text-cyan-400 text-sm font-medium tracking-widest" />
          </motion.div>
          
          <motion.p className={`text-base md:text-lg ${t.muted} max-w-2xl mx-auto mb-8 leading-relaxed`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}>
            1.8+ years building production-ready iOS & watchOS applications. Swift, SwiftUI, MVVM Architecture. Proven track record in real-time feature integration.
          </motion.p>
          
          <motion.div className="flex flex-wrap justify-center gap-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3 }}>
            <MagneticBtn onClick={() => scrollTo('contact')} className="px-7 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-shadow">Get In Touch</MagneticBtn>
            <MagneticBtn onClick={() => scrollTo('projects')} className={`px-7 py-3 rounded-full border font-semibold transition-colors ${isDark ? 'border-slate-600 text-slate-300 hover:border-cyan-500 hover:text-cyan-400' : 'border-gray-300 text-slate-600 hover:border-cyan-500 hover:text-cyan-500'}`}>View Projects</MagneticBtn>
          </motion.div>
          
          <motion.div className="mt-14" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
            <motion.div className="cursor-pointer" onClick={() => scrollTo('about')} animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
              <ChevronDown className={`w-7 h-7 mx-auto ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="min-h-screen flex items-center py-20 px-6 lg:pl-28">
        <div className="max-w-5xl mx-auto w-full">
          <motion.h2 className="text-3xl md:text-4xl font-bold mb-12 text-center" variants={revealVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">About Me</span>
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="space-y-5">
              <motion.p variants={staggerItem} className={`text-base leading-relaxed ${t.muted}`}>I'm a passionate iOS Developer based in India, currently working at NeoSoft. With a strong foundation in Computer Science from MIT ADT University and specialized training from Scaler Academy, I bring both theoretical knowledge and practical expertise to every project.</motion.p>
              <motion.p variants={staggerItem} className={`text-base leading-relaxed ${t.muted}`}>My journey in iOS development has been marked by continuous learning and innovation. I've successfully delivered production-ready applications across multiple domains including mobility, travel/hospitality, insurance, and banking sectors.</motion.p>
              <motion.div variants={staggerItem} className="flex flex-wrap gap-2 pt-3">
                {['Swift', 'SwiftUI', 'UIKit', 'watchOS', 'MVVM', 'Combine'].map((s, i) => (
                  <motion.span key={i} className="px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-sm" whileHover={{ scale: 1.1 }}>{s}</motion.span>
                ))}
              </motion.div>
            </motion.div>
            <motion.div variants={revealFromRight} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}>
              <Card3D className="group">
                <div className={`rounded-2xl p-7 ${t.card} border backdrop-blur-sm ${t.cardHover} transition-all`}>
                  <div className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-3">1.8+</div>
                  <div className={`text-lg font-semibold ${t.text}`}>Years Experience</div>
                  <div className={t.faint}>Production iOS & watchOS Apps</div>
                </div>
              </Card3D>
            </motion.div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
       <section id="experience" className={`min-h-screen flex items-center py-20 px-6 lg:pl-28 ${t.section}`}>
        <div className="max-w-5xl mx-auto w-full">
          <motion.h2 className="text-3xl md:text-4xl font-bold mb-12 text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Work Experience</span>
          </motion.h2>
          <Card3D className="group">
            <motion.div className={`${t.card} border backdrop-blur-sm rounded-2xl p-7 md:p-10 ${t.cardHover} transition-all relative overflow-hidden`} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="md:text-right md:pr-6 md:border-r border-cyan-500/30">
                  <div className="flex items-center md:justify-end gap-2 text-cyan-400 mb-2"><Calendar className="w-4 h-4" /><span className="text-sm font-medium">April 2024 - Present</span></div>
                  <h3 className={`text-xl font-bold ${t.text} mb-1`}>NeoSoft</h3>
                  <p className={t.faint}>iOS Developer</p>
                </div>
                <div className="md:col-span-2 md:pl-6">
                  <ul className="space-y-3">
                    {['Develop and maintain production iOS and watchOS applications using Swift, UIKit, and SwiftUI', 'Implement MVVM architecture patterns ensuring clean, scalable codebases', 'Integrate real-time features using SSE streaming for enhanced user experiences', 'Deliver AI-assisted features including chat assistants and speech-to-text', 'Lead migration from UIKit to SwiftUI', 'Provide maintenance across mobility, travel, insurance, and banking sectors'].map((item, i) => (
                      <motion.li key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }} viewport={{ once: true }} className={`flex items-start gap-3 ${t.muted}`}>
                        <span className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 mt-2 flex-shrink-0 shadow-[0_0_6px_rgba(6,182,212,0.8)]" />{item}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </Card3D>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="min-h-screen flex items-center py-20 px-6 lg:pl-28">
        <div className="max-w-5xl mx-auto w-full">
          <motion.h2 className="text-3xl md:text-4xl font-bold mb-12 text-center" variants={revealVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Technical Skills</span>
          </motion.h2>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="grid md:grid-cols-2 gap-5">
            {skills.map((g, i) => (
              <motion.div key={i} variants={staggerItem}>
                <Card3D className="group h-full">
                  <div className={`${t.card} border backdrop-blur-sm rounded-2xl p-6 ${t.cardHover} transition-all h-full`}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2.5 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 text-cyan-400 group-hover:scale-110 transition-transform">{g.icon}</div>
                      <h3 className={`text-lg font-semibold ${t.text}`}>{g.category}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {g.items.map((s, j) => (
                        <motion.span key={j} className={`px-3 py-1.5 rounded-full text-xs ${isDark ? 'bg-slate-700/50 text-slate-300 border-slate-600/50' : 'bg-gray-100 text-slate-600 border-gray-200'} border hover:bg-cyan-500/10 hover:border-cyan-500/30 hover:text-cyan-400 transition-all cursor-default`} whileHover={{ scale: 1.05 }}>{s}</motion.span>
                      ))}
                    </div>
                  </div>
                </Card3D>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className={`py-20 px-6 lg:pl-28 ${t.section}`}>
        <div className="max-w-6xl mx-auto w-full">
          <motion.h2 className="text-3xl md:text-4xl font-bold mb-4 text-center" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Featured Projects</span>
          </motion.h2>
          <motion.p className={`text-center ${t.muted} mb-12 max-w-2xl mx-auto`} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            Production applications across mobility, travel, insurance, and banking sectors
          </motion.p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
  {projects.map((project, i) => (
    <Card3D key={i} className="group h-full">
      {project.url ? (
        <motion.a 
          href={project.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className={`${t.card} border backdrop-blur-sm rounded-2xl overflow-hidden ${t.cardHover} transition-all h-full flex flex-col relative`}
          initial={{ opacity: 0, y: 40 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ delay: i * 0.1 }} 
          viewport={{ once: true }}
          whileHover={{ y: -8 }}>
          
          {/* Top gradient bar */}
          <div className={`h-1.5 bg-gradient-to-r ${project.color}`} />
          
          <div className="p-6 flex flex-col flex-1">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${project.color} bg-opacity-20 text-white group-hover:scale-110 transition-transform shadow-lg`}>
                {project.icon}
              </div>
              <span className={`text-[10px] font-mono ${t.faint} uppercase tracking-wider`}>Project {String(i + 1).padStart(2, '0')}</span>
            </div>
            
            {/* Title */}
            <h3 className={`text-xl font-bold ${t.text} mb-1 group-hover:text-cyan-400 transition-colors`}>{project.title}</h3>
            <p className={`text-sm ${t.faint} mb-4`}>{project.subtitle}</p>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {project.tags.map((tag, j) => (
                <span key={j} className={`px-2 py-0.5 rounded-full text-[10px] font-mono bg-gradient-to-r ${project.color} bg-opacity-10 text-white border border-cyan-500/20`}>{tag}</span>
              ))}
            </div>
            
            {/* Features */}
            <ul className="space-y-2 flex-1">
              {project.features.map((feature, j) => (
                <motion.li 
                  key={j} 
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + j * 0.05 }}
                  viewport={{ once: true }}
                  className={`flex items-start gap-2 text-xs ${t.muted}`}>
                  <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${project.color} mt-1.5 flex-shrink-0 shadow-[0_0_4px_rgba(6,182,212,0.6)]`} />
                  {feature}
                </motion.li>
              ))}
            </ul>
          </div>
          
          {/* Corner accents */}
          <div className={`absolute top-2 right-2 w-4 h-4 border-t border-r ${isDark ? 'border-cyan-400/20' : 'border-cyan-500/20'} opacity-0 group-hover:opacity-100 transition-opacity`} />
          <div className={`absolute bottom-2 left-2 w-4 h-4 border-b border-l ${isDark ? 'border-cyan-400/20' : 'border-cyan-500/20'} opacity-0 group-hover:opacity-100 transition-opacity`} />
        </motion.a>
      ) : (
        <motion.div 
          className={`${t.card} border backdrop-blur-sm rounded-2xl overflow-hidden ${t.cardHover} transition-all h-full flex flex-col relative`}
          initial={{ opacity: 0, y: 40 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ delay: i * 0.1 }} 
          viewport={{ once: true }}
          whileHover={{ y: -8 }}>
          {/* ...existing card content (same as above) ... */}
        </motion.div>
      )}
    </Card3D>
  ))}
</div>
        </div>
      </section>

      {/* EDUCATION */}
      <section id="education" className="min-h-screen flex items-center py-20 px-6 lg:pl-28">
        <div className="max-w-5xl mx-auto w-full">
          <motion.h2 className="text-3xl md:text-4xl font-bold mb-12 text-center" variants={revealVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Education</span>
          </motion.h2>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="grid md:grid-cols-2 gap-6">
            {[{ period: '2018 - 2022', title: 'MIT ADT University', desc: 'B.Tech in Computer Science & Engineering', extra: 'CGPA: 7.16' }, { period: '2022 - 2024', title: 'Scaler Academy', desc: 'Specialization in Software Development & Problem Solving', extra: null }].map((edu, i) => (
              <motion.div key={i} variants={i === 0 ? revealFromLeft : revealFromRight}>
                <Card3D className="group h-full">
                  <div className={`${t.card} border backdrop-blur-sm rounded-2xl p-6 ${t.cardHover} transition-all h-full`}>
                    <div className="flex items-center gap-2 text-cyan-400 mb-3"><Calendar className="w-4 h-4" /><span className="text-sm font-medium">{edu.period}</span></div>
                    <h3 className={`text-xl font-bold ${t.text} mb-2 group-hover:text-cyan-400 transition-colors`}>{edu.title}</h3>
                    <p className={t.muted}>{edu.desc}</p>
                    {edu.extra && <p className="text-cyan-400/80 text-sm font-medium mt-2">{edu.extra}</p>}
                  </div>
                </Card3D>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* BLOGS */}
      <section id="blogs" className={`min-h-screen flex items-center py-20 px-6 lg:pl-28 ${t.section}`}>
        <div className="max-w-5xl mx-auto w-full">
          <motion.h2 className="text-3xl md:text-4xl font-bold mb-12 text-center" variants={revealVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Blogs & Posts</span>
          </motion.h2>
          
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="mb-10">
            <motion.h3 variants={staggerItem} className={`text-lg font-semibold ${t.text} mb-5 flex items-center gap-2`}><BookOpen className="w-5 h-5 text-cyan-400" />Latest from My Blog</motion.h3>
            {blogPosts.map((p, i) => (
              <motion.div key={i} variants={staggerItem}>
                <Card3D className="group">
                  <a href={p.url} target="_blank" rel="noopener noreferrer" className={`block ${t.card} border backdrop-blur-sm rounded-2xl p-6 ${t.cardHover} transition-all`}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2 text-cyan-400 text-sm"><Calendar className="w-4 h-4" />{p.date}</div>
                      <ExternalLink className={`w-4 h-4 ${t.faint} group-hover:text-cyan-400 transition-colors`} />
                    </div>
                    <h4 className={`text-lg font-bold ${t.text} mb-2 group-hover:text-cyan-400 transition-colors`}>{p.title}</h4>
                    <p className={`${t.muted} text-sm mb-3`}>{p.excerpt}</p>
                    <div className="flex flex-wrap gap-2">{p.tags.map((tag, j) => <span key={j} className="px-2 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs">{tag}</span>)}</div>
                  </a>
                </Card3D>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}>
            <motion.h3 variants={staggerItem} className={`text-lg font-semibold ${t.text} mb-5 flex items-center gap-2`}><Linkedin className="w-5 h-5 text-cyan-400" />LinkedIn Posts</motion.h3>
            <div className="grid md:grid-cols-2 gap-4">
              {linkedInPosts.map((p, i) => (
                <motion.div key={i} variants={staggerItem}>
                  <Card3D className="group h-full">
                    <a href={p.url} target="_blank" rel="noopener noreferrer" className={`block ${t.card} border backdrop-blur-sm rounded-xl p-5 ${t.cardHover} transition-all h-full`}>
                      <div className="flex items-center justify-between mb-2"><Linkedin className="w-4 h-4 text-[#0A66C2]" /><ExternalLink className={`w-3 h-3 ${t.faint} group-hover:text-cyan-400 transition-colors`} /></div>
                      <h4 className={`text-base font-bold ${t.text} mb-1 group-hover:text-cyan-400 transition-colors`}>{p.title}</h4>
                      {p.date && <p className={`text-xs ${t.faint} mb-1`}>{p.date}</p>}
                      <p className={`${t.muted} text-xs mb-2`}>{p.excerpt}</p>
                      <div className="flex flex-wrap gap-1">{p.tags.slice(0, 3).map((tag, j) => <span key={j} className={`px-2 py-0.5 rounded-full text-[10px] ${isDark ? 'bg-slate-700/50 text-slate-400' : 'bg-gray-100 text-slate-500'}`}>#{tag}</span>)}</div>
                    </a>
                  </Card3D>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section id="certifications" className="min-h-screen flex items-center py-20 px-6 lg:pl-28">
        <div className="max-w-5xl mx-auto w-full">
          <motion.h2 className="text-3xl md:text-4xl font-bold mb-12 text-center" variants={revealVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Certifications & Awards</span>
          </motion.h2>
          
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="mb-10">
            <motion.h3 variants={staggerItem} className={`text-lg font-semibold ${t.text} mb-5 flex items-center gap-2`}><Layers className="w-5 h-5 text-cyan-400" />Scaler Academy Certification</motion.h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
              {certifications.map((c, i) => (
                <motion.div key={i} variants={staggerItem} className={`${t.card} border backdrop-blur-sm rounded-xl p-4 ${t.cardHover} transition-all flex items-center gap-2`} whileHover={{ scale: 1.03, y: -2 }}>
                  <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(6,182,212,0.8)]" /><span className={t.muted}>{c}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}>
            <motion.h3 variants={staggerItem} className={`text-lg font-semibold ${t.text} mb-5 flex items-center gap-2`}><Award className="w-5 h-5 text-cyan-400" />Academic Achievements</motion.h3>
            <div className="space-y-3">
              {achievements.map((a, i) => (
                <motion.div key={i} variants={staggerItem} className={`flex items-start gap-3 ${t.card} border backdrop-blur-sm rounded-xl p-4 ${t.cardHover} transition-all`} whileHover={{ x: 5 }}>
                  <span className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 mt-2 flex-shrink-0 shadow-[0_0_6px_rgba(6,182,212,0.8)]" /><span className={t.muted}>{a}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className={`min-h-screen flex items-center py-20 px-6 lg:pl-28 ${t.section}`}>
        <div className="max-w-4xl mx-auto w-full text-center">
          <motion.h2 className="text-3xl md:text-4xl font-bold mb-6" variants={revealVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Get In Touch</span>
          </motion.h2>
          <motion.p className={`text-base ${t.muted} mb-10 max-w-xl mx-auto`} variants={revealVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}>
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision. and I'm looking forward to abroad opportunities as well. Feel free to reach out to me via email or phone, or connect with me on social media.
          </motion.p>
          
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="flex flex-wrap justify-center gap-4 mb-10">
            <motion.div variants={staggerItem}>
              <MagneticBtn href="mailto:anupamthackar@gmail.com" className={`flex items-center gap-3 px-6 py-4 ${t.card} border backdrop-blur-sm rounded-xl ${t.cardHover} transition-all group`}>
                <Mail className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" /><span className={t.muted}>anupamthackar@gmail.com</span>
              </MagneticBtn>
            </motion.div>
            <motion.div variants={staggerItem}>
              <MagneticBtn href="tel:+918962219884" className={`flex items-center gap-3 px-6 py-4 ${t.card} border backdrop-blur-sm rounded-xl ${t.cardHover} transition-all group`}>
                <Phone className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" /><span className={t.muted}>+91 8962219884</span>
              </MagneticBtn>
            </motion.div>
          </motion.div>
          
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="flex justify-center gap-5">
            <motion.div variants={staggerItem}>
              <MagneticBtn href="https://linkedin.com/in/anupamthackar67" className={`w-14 h-14 flex items-center justify-center rounded-xl ${t.card} border backdrop-blur-sm ${isDark ? 'text-slate-400' : 'text-slate-500'} hover:text-cyan-400 ${t.cardHover} transition-all`}>
                <Linkedin className="w-6 h-6" />
              </MagneticBtn>
            </motion.div>
            <motion.div variants={staggerItem}>
              <MagneticBtn href="https://github.com/anupamthackar" className={`w-14 h-14 flex items-center justify-center rounded-xl ${t.card} border backdrop-blur-sm ${isDark ? 'text-slate-400' : 'text-slate-500'} hover:text-cyan-400 ${t.cardHover} transition-all`}>
                <Github className="w-6 h-6" />
              </MagneticBtn>
            </motion.div>
            <motion.div variants={staggerItem}>
              <MagneticBtn href="https://anupamthackarios.blogspot.com/" className={`w-14 h-14 flex items-center justify-center rounded-xl ${t.card} border backdrop-blur-sm ${isDark ? 'text-slate-400' : 'text-slate-500'} hover:text-cyan-400 ${t.cardHover} transition-all`}>
                <BookOpen className="w-6 h-6" />
              </MagneticBtn>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-6 px-6 border-t ${isDark ? 'border-slate-800' : 'border-gray-200'}`}>
        <div className="max-w-4xl mx-auto text-center">
          <p className={`text-sm ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>© 2024 Anupam Thackar. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;