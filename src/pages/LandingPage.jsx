// InVisitor Landing Page
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Check, X, Shield, Users, Clock, Bell, Printer, 
  BarChart, Calendar, Headphones, Menu, X as CloseIcon,
  Mail, Phone, MapPin, MessageCircle, Send, Globe, User
} from 'lucide-react';

const Logo = ({ color = "white" }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
    <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="25" r="15" fill={color} />
      <path d="M20 55C20 49.4772 24.4772 45 30 45H70C75.5228 45 80 49.4772 80 55V60H20V55Z" fill={color} />
      <path d="M20 65H80V75C80 80.5228 75.5228 85 70 85H30C24.4772 85 20 80.5228 20 75V65Z" fill={color} />
    </svg>
    <span style={{ fontSize: '1.5rem', fontWeight: 800, color: color, letterSpacing: '-0.02em' }}>InVisitor</span>
  </div>
);

const FeatureItem = ({ icon, label, value }) => (
  <li style={{ 
    display: 'flex', 
    alignItems: 'center', 
    padding: '0.75rem 0', 
    borderBottom: '1px solid #f1f5f9',
    fontSize: '0.85rem'
  }}>
    <span style={{ color: '#94a3b8', marginRight: '0.75rem' }}>{icon}</span>
    <span style={{ flex: 1, color: '#444' }}>{label}</span>
    <span style={{ fontWeight: 600, color: '#0d2331' }}>{value}</span>
  </li>
);

const LandingPage = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isYearly, setIsYearly] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const slides = [
    {
      title: "Streamline Your Front Desk",
      text: "InVisitor is the world's most intuitive visitor management system. Enhance security, improve workplace efficiency, and provide an exceptional experience for every guest."
    },
    {
      title: "Secure Your Workplace",
      text: "Verify guests instantly with advanced screening and real-time alerts. Ensure only authorized personnel enter your building with our state-of-the-art security platform."
    },
    {
      title: "Elevate Guest Experience",
      text: "Make a lasting impression with digital check-ins and instant host alerts. Ditch the paper logs and upgrade to a touchless, modern visitor experience."
    },
    {
      title: "Data-Driven Insights",
      text: "Understand your building traffic with real-time analytics and detailed reporting. Peak hours, host performance, and visitor trends—all in one dashboard."
    }
  ];

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const plans = [
    {
      name: 'Free Trial',
      price: '0',
      duration: '14 days',
      tagline: 'Explore our features',
      visitors: '10/mo',
      hosts: '1',
      history: '14 days',
      notif: 'Basic Alert',
      badge: false,
      reporting: 'Basic',
      support: 'Email',
      security: 'None',
      calendar: false,
      color: '#64748b'
    },
    {
      name: 'Starter Plan',
      price: '25,000',
      duration: 'per month',
      tagline: 'Perfect for small shops',
      visitors: '500/mo',
      hosts: '10',
      history: '30 days',
      notif: 'Email + SMS',
      badge: true,
      reporting: 'Standard',
      support: 'Priority Email',
      security: 'Basic Whitelist',
      calendar: 'Basic',
      color: '#00a3ff',
      popular: true
    },
    {
      name: 'Professional Plan',
      price: '75,000',
      duration: 'per month',
      tagline: 'Scaling businesses',
      visitors: '5,000/mo',
      hosts: '100',
      history: '90 days',
      notif: 'Push + Email + SMS',
      badge: 'Advanced',
      reporting: 'Detailed',
      support: '24/7 Phone/Email',
      security: 'Geo + Blacklist',
      calendar: 'Advanced Sync',
      color: '#8b5cf6'
    },
    {
      name: 'Enterprise Plan',
      price: '150,000',
      duration: 'per month',
      tagline: 'Large scale operations',
      visitors: 'Unlimited',
      hosts: 'Unlimited',
      history: 'Unlimited',
      notif: 'Custom',
      badge: 'Multi-Location',
      reporting: 'Custom Analytics',
      support: 'Dedicated Manager',
      security: 'Advanced SOC2',
      calendar: 'Multi-Team',
      color: '#0d2331'
    }
  ];

  return (
    <div className="landing-container">
      {/* Navigation */}
      <nav style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: scrolled ? '1rem 2rem' : '1.5rem 2rem',
        background: scrolled ? 'rgba(13, 35, 49, 0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
        transition: 'all 0.3s ease',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
        >
          <Logo color="white" />
        </button>
        
        {/* Desktop Menu */}
        <div className="desktop-menu" style={{ display: 'none', gap: '2rem', alignItems: 'center' }}>
          {['Home', 'About', 'Why Choose Us?', 'Pricing', 'Contact'].map((item) => (
            <button 
              key={item} 
              onClick={() => scrollTo(item.toLowerCase().replace(' ', '-'))}
              style={{ background: 'none', border: 'none', color: 'white', fontWeight: 500, cursor: 'pointer', opacity: 0.8 }}
            >
              {item}
            </button>
          ))}
          <button onClick={() => navigate('/login')} className="btn btn-primary" style={{ width: 'auto', padding: '0.6rem 1.5rem', fontSize: '0.9rem', background: '#00a3ff' }}>
            Login
          </button>
        </div>

        {/* Mobile Menu Icon */}
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }} className="mobile-menu-btn">
          {isMenuOpen ? <CloseIcon /> : <Menu />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            style={{ 
              position: 'fixed', top: 0, right: 0, bottom: 0, width: '80%', 
              background: '#0d2331', zIndex: 101, padding: '2rem',
              display: 'flex', flexDirection: 'column', gap: '2rem'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button onClick={() => setIsMenuOpen(false)} style={{ background: 'none', border: 'none', color: 'white' }}><CloseIcon /></button>
            </div>
            {['Home', 'About', 'Why Choose', 'Pricing', 'Contact'].map((item) => (
              <button 
                key={item} 
                onClick={() => scrollTo(item.toLowerCase().replace(' ', '-'))}
                style={{ background: 'none', border: 'none', color: 'white', fontSize: '1.25rem', textAlign: 'left' }}
              >
                {item}
              </button>
            ))}
            <button onClick={() => navigate('/login')} className="btn btn-primary" style={{ marginTop: 'auto' }}>Login</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section with Carousel */}
      <section id="home" style={{ 
        background: 'radial-gradient(circle at center, #1a3c52 0%, #0d2331 100%)',
        color: 'white',
        padding: '12rem 2rem 8rem',
        textAlign: 'center',
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h1 style={{ fontSize: '4.5rem', fontWeight: 800, marginBottom: '2rem', lineHeight: 1.1, letterSpacing: '-0.03em' }}>
                {slides[currentSlide].title}
              </h1>
              <p style={{ fontSize: '1.4rem', opacity: 0.8, maxWidth: '800px', margin: '0 auto 4rem', lineHeight: 1.6, fontWeight: 400 }}>
                {slides[currentSlide].text}
              </p>
            </motion.div>
          </AnimatePresence>
          
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
            <button onClick={() => scrollTo('pricing')} className="btn btn-primary" style={{ width: 'auto', padding: '1.25rem 3rem', background: '#00a3ff', fontSize: '1.1rem' }}>Get Started Now</button>
            <button onClick={() => scrollTo('about')} className="btn btn-outline" style={{ width: 'auto', padding: '1.25rem 3rem', color: 'white', borderColor: 'rgba(255,255,255,0.3)', fontSize: '1.1rem' }}>Learn More</button>
          </div>

          {/* Carousel Indicators */}
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', marginTop: '4rem' }}>
            {slides.map((_, i) => (
              <div 
                key={i}
                onClick={() => setCurrentSlide(i)}
                style={{ 
                  width: i === currentSlide ? '40px' : '10px',
                  height: '10px',
                  borderRadius: '10px',
                  background: i === currentSlide ? '#00a3ff' : 'rgba(255,255,255,0.2)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Trusted By Section (Infinite Slide) */}
      <section style={{ 
        padding: '3rem 0', 
        background: 'white', 
        borderBottom: '1px solid #f1f5f9',
        overflow: 'hidden',
        whiteSpace: 'nowrap'
      }}>
        <p style={{ textAlign: 'center', color: '#64748b', fontSize: '0.9rem', marginBottom: '2rem', fontWeight: 600, letterSpacing: '0.05em' }}>
          TRUSTED BY INNOVATIVE COMPANIES GLOBALLY
        </p>
        <div style={{ display: 'flex', overflow: 'hidden' }}>
          <motion.div 
            animate={{ x: [0, -1035] }}
            transition={{ 
              duration: 25, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            style={{ display: 'flex', gap: '4rem', paddingLeft: '4rem' }}
          >
            {[
              "TechGlobal", "InnovateHQ", "SecureCorp", "CloudNative", "FutureScale", 
              "EliteSystems", "PrimeBuilders", "NexGen", "TechGlobal", "InnovateHQ", "SecureCorp"
            ].map((company, i) => (
              <div key={i} style={{ 
                fontSize: '1.5rem', 
                fontWeight: 700, 
                color: '#cbd5e1',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <Globe size={24} style={{ opacity: 0.5 }} />
                {company}
              </div>
            ))}
          </motion.div>
          <motion.div 
            animate={{ x: [0, -1035] }}
            transition={{ 
              duration: 25, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            style={{ display: 'flex', gap: '4rem', paddingLeft: '4rem' }}
          >
            {[
              "TechGlobal", "InnovateHQ", "SecureCorp", "CloudNative", "FutureScale", 
              "EliteSystems", "PrimeBuilders", "NexGen", "TechGlobal", "InnovateHQ", "SecureCorp"
            ].map((company, i) => (
              <div key={i} style={{ 
                fontSize: '1.5rem', 
                fontWeight: 700, 
                color: '#cbd5e1',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <Globe size={24} style={{ opacity: 0.5 }} />
                {company}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" style={{ padding: '8rem 2rem', background: '#f8fafc' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '2.5rem', color: '#0d2331', marginBottom: '1.5rem' }}>Revolutionizing Global Guest Management</h2>
            <p style={{ color: '#64748b', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '2rem' }}>
              InVisitor was born out of a simple need: to make building security and guest check-ins faster, safer, and friendlier. 
              We've developed a comprehensive suite of tools that bridge the gap between physical security and digital convenience.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div style={{ borderLeft: '4px solid #00a3ff', paddingLeft: '1rem' }}>
                <h4 style={{ fontSize: '1.5rem', color: '#0d2331' }}>10k+</h4>
                <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Locations Globally</p>
              </div>
              <div style={{ borderLeft: '4px solid #8b5cf6', paddingLeft: '1rem' }}>
                <h4 style={{ fontSize: '1.5rem', color: '#0d2331' }}>1M+</h4>
                <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Visitors Checked-In</p>
              </div>
            </div>
          </div>
          <div style={{ position: 'relative' }}>
             <div style={{ 
               width: '100%', aspectRatio: '16/10', background: '#0d2331', borderRadius: '24px',
               boxShadow: '0 30px 60px rgba(0,0,0,0.1)', overflow: 'hidden', display: 'flex', 
               alignItems: 'center', justifyContent: 'center', color: 'white'
             }}>
               <Logo color="white" />
             </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section id="why-choose" style={{ padding: '8rem 2rem' }}>
        <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '1rem', color: '#0d2331' }}>Designed for Modern Workplaces</h2>
        <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '4rem' }}>Why top companies trust InVisitor for their security</p>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {[
            { icon: <Shield size={32} color="#00a3ff" />, title: 'Real-time Security', text: 'Instantly screen visitors against internal watchlists and government databases.' },
            { icon: <Users size={32} color="#8b5cf6" />, title: 'Host Notifications', text: 'Hosts are instantly notified via Email, SMS, or Push when their guest arrives.' },
            { icon: <Printer size={32} color="#0ea5e9" />, title: 'Custom Badges', text: 'Print professional, high-quality badges with photos and access permissions.' },
            { icon: <BarChart size={32} color="#f59e0b" />, title: 'Data & Analytics', text: 'Insightful reporting to help you understand traffic patterns and peak hours.' },
            { icon: <Calendar size={32} color="#10b981" />, title: 'Pre-registration', text: 'Invite guests ahead of time and provide them with easy check-in QR codes.' },
            { icon: <Headphones size={32} color="#ef4444" />, title: 'Global Support', text: 'Our dedicated support team is available 24/7 to ensure your operations run smooth.' }
          ].map((item, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5 }}
              style={{ background: '#f8fafc', padding: '2.5rem', borderRadius: '20px', transition: 'all 0.3s ease' }}
            >
              <div style={{ marginBottom: '1.5rem' }}>{item.icon}</div>
              <h3 style={{ marginBottom: '0.75rem', fontSize: '1.25rem', color: '#0d2331' }}>{item.title}</h3>
              <p style={{ color: '#64748b', lineHeight: 1.6, fontSize: '0.95rem' }}>{item.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" style={{ padding: '8rem 1rem', background: '#f8fafc' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '1rem', color: '#0d2331' }}>Simple, Transparent Pricing</h2>
          <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '2.5rem' }}>Choose the plan that fits your business needs</p>
          
          {/* Billing Toggle */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginBottom: '4rem' }}>
            <span style={{ fontWeight: 600, color: !isYearly ? '#0d2331' : '#94a3b8' }}>Monthly</span>
            <div 
              onClick={() => setIsYearly(!isYearly)}
              style={{ 
                width: '60px', height: '32px', background: '#0d2331', borderRadius: '30px', 
                padding: '4px', cursor: 'pointer', position: 'relative'
              }}
            >
              <motion.div 
                animate={{ x: isYearly ? 28 : 0 }}
                style={{ width: '24px', height: '24px', background: 'white', borderRadius: '50%' }}
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontWeight: 600, color: isYearly ? '#0d2331' : '#94a3b8' }}>Yearly</span>
              <span style={{ background: '#dcfce7', color: '#16a34a', fontSize: '0.7rem', padding: '0.25rem 0.5rem', borderRadius: '20px', fontWeight: 700 }}>Save 20%</span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {plans.map((plan, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                style={{ 
                  background: 'white',
                  borderRadius: '24px',
                  padding: '2.5rem 1.5rem',
                  boxShadow: plan.popular ? '0 20px 40px rgba(0, 163, 255, 0.1)' : '0 10px 30px rgba(0,0,0,0.02)',
                  border: plan.popular ? '2px solid #00a3ff' : '1px solid #eef2f6',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                {plan.popular && (
                  <div style={{ 
                    position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%)',
                    background: '#00a3ff', color: 'white', padding: '0.5rem 1rem', borderRadius: '20px',
                    fontSize: '0.8rem', fontWeight: 700
                  }}>
                    MOST POPULAR
                  </div>
                )}
                
                <div style={{ marginBottom: '2rem' }}>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: plan.popular ? '#00a3ff' : '#0d2331' }}>{plan.name}</h3>
                  <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '0.5rem' }}>{plan.tagline}</p>
                  <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'baseline' }}>
                    <span style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0d2331' }}>
                      {plan.price !== 'Custom' ? '₦' : ''}
                      {plan.price === 'Custom' ? 'Custom' : (
                        isYearly 
                        ? (parseInt(plan.price.replace(',', '')) * 0.8).toLocaleString() 
                        : plan.price
                      )}
                    </span>
                    <span style={{ color: '#64748b', marginLeft: '0.5rem' }}>/{isYearly ? 'yr' : 'mo'}</span>
                  </div>
                </div>

                <div style={{ flex: 1 }}>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    <FeatureItem icon={<Users size={16}/>} label="Visitors" value={plan.visitors} />
                    <FeatureItem icon={<Users size={16}/>} label="Hosts" value={plan.hosts} />
                    <FeatureItem icon={<Clock size={16}/>} label="History" value={plan.history} />
                    <FeatureItem icon={<Bell size={16}/>} label="Alerts" value={plan.notif} />
                    <FeatureItem icon={<Printer size={16}/>} label="Badges" value={plan.badge === true ? 'Basic' : plan.badge || 'No'} />
                    <FeatureItem icon={<BarChart size={16}/>} label="Reports" value={plan.reporting} />
                    <FeatureItem icon={<Headphones size={16}/>} label="Support" value={plan.support} />
                    <FeatureItem icon={<Shield size={16}/>} label="Security" value={plan.security} />
                    <FeatureItem icon={<Calendar size={16}/>} label="Calendar" value={plan.calendar || 'No'} />
                  </ul>
                </div>

                <button 
                  onClick={() => navigate('/register')}
                  className="btn" 
                  style={{ 
                    marginTop: '2rem',
                    background: plan.popular ? '#00a3ff' : '#0d2331',
                    color: 'white'
                  }}
                >
                  Get Started
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" style={{ padding: '8rem 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '4rem' }}>
          <div>
            <h2 style={{ fontSize: '2.5rem', color: '#0d2331', marginBottom: '1.5rem' }}>Get in Touch</h2>
            <p style={{ color: '#64748b', fontSize: '1.1rem', marginBottom: '2.5rem' }}>
              Have questions about how InVisitor can secure your building? Our experts are ready to help.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(0,163,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#00a3ff' }}><Mail size={20}/></div>
                <div><h5 style={{ margin: 0 }}>Email Us</h5><p style={{ margin: 0, color: '#64748b' }}>support@invisitor.com</p></div>
              </div>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(139,92,246,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8b5cf6' }}><Phone size={20}/></div>
                <div><h5 style={{ margin: 0 }}>Call Us</h5><p style={{ margin: 0, color: '#64748b' }}>+1 (888) INVISIT</p></div>
              </div>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(16,185,129,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981' }}><MapPin size={20}/></div>
                <div><h5 style={{ margin: 0 }}>Visit Us</h5><p style={{ margin: 0, color: '#64748b' }}>123 Enterprise Way, Tech City</p></div>
              </div>
            </div>
          </div>
          <div style={{ background: '#f8fafc', padding: '3rem', borderRadius: '24px' }}>
            <div className="form-group"><label>Full Name</label><input type="text" placeholder="John Doe" /></div>
            <div className="form-group"><label>Work Email</label><input type="email" placeholder="john@company.com" /></div>
            <div className="form-group"><label>Message</label><textarea style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--input-border)', minHeight: '120px' }} placeholder="How can we help?"></textarea></div>
            <button className="btn btn-primary">Send Message</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#0d2331', color: 'white', padding: '5rem 2rem 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '4rem', marginBottom: '4rem' }}>
            <div>
              <Logo color="white" />
              <p style={{ marginTop: '1.5rem', opacity: 0.6, fontSize: '0.9rem', lineHeight: 1.6 }}>
                Secure, modern, and efficient visitor management for the 21st century.
              </p>
            </div>
            <div>
              <h5 style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>Platform</h5>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem', opacity: 0.7, fontSize: '0.9rem' }}>
                <li>Features</li>
                <li>Security</li>
                <li>Integrations</li>
                <li>Pricing</li>
              </ul>
            </div>
            <div>
              <h5 style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>Company</h5>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem', opacity: 0.7, fontSize: '0.9rem' }}>
                <li>About</li>
                <li>Blog</li>
                <li>Careers</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h5 style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>Follow Us</h5>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <Globe size={20} style={{ opacity: 0.7, cursor: 'pointer' }} />
                <MessageCircle size={20} style={{ opacity: 0.7, cursor: 'pointer' }} />
                <User size={20} style={{ opacity: 0.7, cursor: 'pointer' }} />
                <Send size={20} style={{ opacity: 0.7, cursor: 'pointer' }} />
              </div>
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', opacity: 0.5 }}>
            <p>© 2026 InVisitor. All rights reserved.</p>
            <div style={{ display: 'flex', gap: '2rem' }}>
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
