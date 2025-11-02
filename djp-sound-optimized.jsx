import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, X, Music, Clapperboard, MicVocal, 
  Twitter, Instagram, Facebook, Mail, Phone, 
  Calendar, Headphones, Speaker, Disc
} from "lucide-react";

// --- NEW DATA STRUCTURES ---
const navLinks = {
  "primary": [
    { "name": "Accueil", "href": "#home" },
    { "name": "Services", "href": "#services" },
    { "name": "Équipement", "href": "#equipment" },
    { "name": "Réalisations", "href": "#portfolio" }
  ],
  "secondary": [
    { "name": "À Propos", "href": "#about" },
    { "name": "FAQ", "href": "#faq" },
    { "name": "Contact", "href": "#contact" }
  ]
};

const servicesData = [
  {
    "icon": Music,
    "title": "DJ Privé",
    "tags": ["Événements", "Mariages", "Soirées"],
    "description": "Ambiance sur mesure pour vos événements privés avec sélection musicale personnalisée."
  },
  {
    "icon": Speaker,
    "title": "Sonorisation",
    "tags": ["Événements", "Locations"],
    "description": "Location complète de système son pros pour petits et grands événements."
  },
  {
    "icon": Disc,
    "title": "Production",
    "tags": ["Création", "Mix"],
    "description": "Création de mix exclusifs et accompagnement artistique."
  },
  {
    "icon": Headphones,
    "title": "Podcast",
    "tags": ["Enregistrement", "Post-prod"],
    "description": "Studio mobile pour enregistrement et post-production de podcasts."
  }
];

const equipmentList = [
  {
    "category": "Mixage",
    "items": [
      "Pioneer DJM-900NXS2",
      "Technics SL-1200MK7",
      "Denon SC6000"
    ]
  },
  {
    "category": "Sonorisation",
    "items": [
      "L-Acoustics Kara",
      "D&B Audiotechnik",
      "Nexo STM"
    ]
  }
];

// --- CONTAINER COMPONENT ---
export default function DjpSoundContainer() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("Tous");

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <DjpSoundApp
      isMenuOpen={isMenuOpen}
      toggleMenu={toggleMenu}
      navLinks={navLinks}
      services={servicesData}
      equipment={equipmentList}
      activeFilter={activeFilter}
      setActiveFilter={setActiveFilter}
    />
  );
}

// --- UI COMPONENTS ---

function DjpSoundApp({ isMenuOpen, toggleMenu, navLinks, services, equipment, activeFilter, setActiveFilter }) {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <DynamicHeader 
        isMenuOpen={isMenuOpen} 
        toggleMenu={toggleMenu} 
        navLinks={navLinks} 
      />
      
      <HeroSection />
      
      <FeaturesSection services={services} />
      
      <EquipmentSection equipment={equipment} />
      
      <PortfolioSection />
      
      <FAQSection />
      
      <ContactSection />
      
      <Footer />
    </div>
  );
}

// Updated Components with Optimizations:

function DynamicHeader({ isMenuOpen, toggleMenu, navLinks }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-gray-900/95 py-2 shadow-xl' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <LogoComponent />
          
          <DesktopNav navLinks={navLinks} />
          
          <MobileMenuToggle 
            isMenuOpen={isMenuOpen} 
            toggleMenu={toggleMenu} 
          />
        </div>
      </div>
      
      <AnimatePresence>
        {isMenuOpen && (
          <MobileMenu 
            navLinks={navLinks} 
            toggleMenu={toggleMenu} 
          />
        )}
      </AnimatePresence>
    </header>
  );
}

function LogoComponent() {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="flex items-center space-x-2"
    >
      <Music className="text-cyan-400 h-8 w-8" />
      <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
        DJP SOUND
      </span>
    </motion.div>
  );
}

function DesktopNav({ navLinks }) {
  return (
    <nav className="hidden md:flex space-x-8">
      {navLinks.primary.map((link) => (
        <NavLinkItem key={link.name} link={link} />
      ))}
      <div className="relative group">
        <button className="flex items-center text-gray-300 hover:text-cyan-400">
          Plus <X className="ml-1 h-4 w-4 transform group-hover:rotate-90 transition-transform" />
        </button>
        <div className="absolute hidden group-hover:block pt-2 right-0">
          <div className="bg-gray-800 rounded-md shadow-lg py-1 min-w-[180px]">
            {navLinks.secondary.map((link) => (
              <NavLinkItem key={link.name} link={link} isSubItem />
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLinkItem({ link, isSubItem = false }) {
  return (
    <motion.div whileHover={{ scale: 1.05 }}>
      <a
        href={link.href}
        className={`block ${isSubItem ? 'px-4 py-2 hover:bg-gray-700' : ''} text-gray-300 hover:text-cyan-400 transition-colors`}
      >
        {link.name}
      </a>
    </motion.div>
  );
}

function MobileMenuToggle({ isMenuOpen, toggleMenu }) {
  return (
    <button 
      onClick={toggleMenu}
      className="md:hidden p-2 rounded-md text-gray-300 hover:text-white focus:outline-none"
      aria-label="Menu"
    >
      {isMenuOpen ? (
        <X className="h-6 w-6" />
      ) : (
        <Menu className="h-6 w-6" />
      )}
    </button>
  );
}

function MobileMenu({ navLinks, toggleMenu }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="md:hidden fixed inset-0 bg-gray-900 pt-20 z-40 overflow-y-auto"
    >
      <div className="container px-4 py-8">
        <div className="space-y-1">
          <h3 className="px-3 text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
            Navigation principale
          </h3>
          {[...navLinks.primary, ...navLinks.secondary].map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={toggleMenu}
              className="block px-3 py-4 text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800 rounded-md"
            >
              {link.name}
            </a>
          ))}
        </div>
        
        <CTAButton 
          text="Réserver" 
          className="mt-8 w-full" 
          icon={<Calendar className="h-5 w-5" />}
        />
      </div>
    </motion.div>
  );
}

function FeaturesSection({ services }) {
  const [filteredServices, setFilteredServices] = useState(services);
  const [activeFilter, setActiveFilter] = useState("Tous");
  
  const filters = ["Tous", "Événements", "Création", "Locations"];

  useEffect(() => {
    if (activeFilter === "Tous") {
      setFilteredServices(services);
    } else {
      setFilteredServices(
        services.filter(service => 
          service.tags.some(tag => 
            tag.toLowerCase().includes(activeFilter.toLowerCase())
          )
        )
      );
    }
  }, [activeFilter, services]);

  return (
    <SectionWrapper id="services" title="Nos Expertises" subtitle="Services premium">
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {filters.map(filter => (
          <FilterButton
            key={filter}
            filter={filter}
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
          />
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredServices.map((service, index) => (
          <AnimatedServiceCard
            key={index}
            service={service}
            index={index}
          />
        ))}
      </div>
    </SectionWrapper>
  );
}

function AnimatedServiceCard({ service, index }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
    >
      <div className="p-8 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-cyan-900/20">
          <service.icon className="h-8 w-8 text-cyan-400" />
        </div>
        <h3 className="mt-4 text-xl font-bold">{service.title}</h3>
        <div className="mt-2 flex justify-center gap-1 mb-4">
          {service.tags.map(tag => (
            <span key={tag} className="text-xs bg-gray-800 text-cyan-200 px-2 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
        <p className="text-gray-400">{service.description}</p>
      </div>
    </motion.div>
  );
}