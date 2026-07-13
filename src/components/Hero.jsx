import React, { useState, useEffect } from 'react';
import './Hero.css';

const Hero = ({ setShowPaymentModal }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [visibleItemsCount, setVisibleItemsCount] = useState(0);
  const [menuBgColor, setMenuBgColor] = useState('#050505');
  const defaultMenuBg = '#050505';

  const menuItems = [
    { num: '01', label: 'THE PREMISE', href: '#why', color: '#F94125' },
    { num: '02', label: 'MASTERCLASS', href: '#masterclass', color: '#3E82F7' },
    { num: '03', label: 'WHY US', href: '#whatsnext', color: '#000000' },
    { num: '04', label: 'PRICING', href: '#pricing', color: '#6B4EE6' }
  ];

  const handleMenuScroll = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      if (window.__smoother) {
        window.__smoother.scrollTo(target, { duration: 1.5, ease: 'power3.out' });
      } else {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Control scrolling state based on sticker completion
  useEffect(() => {
    // We're using ScrollSmoother now, no need for Lenis-specific logic here
    // But we can still keep the scroll lock behavior
  }, [visibleItemsCount]);

  // Virtual scroll listener: Strictly locks scroll until all 6 stickers are popped up
  useEffect(() => {
    let accumulatedDelta = 0;

    const handleWheel = (e) => {
      // PHASE 1: While stickers are still popping up (less than 6 visible)
      if (visibleItemsCount < 6) {
        if (window.scrollY > 0) {
          window.scrollTo(0, 0);
          if (window.__smoother) {
            window.__smoother.scrollTo(0, { immediate: true });
          }
        }
        e.preventDefault();

        if (e.deltaY > 0) {
          accumulatedDelta += e.deltaY;
          if (accumulatedDelta > 35) {
            setVisibleItemsCount((prev) => Math.min(prev + 1, 6));
            accumulatedDelta = 0;
          }
        } else if (e.deltaY < 0) {
          accumulatedDelta += e.deltaY;
          if (accumulatedDelta < -35) {
            setVisibleItemsCount((prev) => Math.max(prev - 1, 0));
            accumulatedDelta = 0;
          }
        }
        return;
      }

      // PHASE 2: All 6 stickers are popped up!
      // If user is scrolled down in Section 1 or below, allow 100% normal scrolling
      if (window.scrollY > 5) {
        return;
      }

      // At top of page with 6 stickers visible:
      if (e.deltaY < 0) {
        // Scrolling UP at top of page -> un-pop last sticker and lock page back at top
        e.preventDefault();
        accumulatedDelta += e.deltaY;
        if (accumulatedDelta < -35) {
          setVisibleItemsCount(5);
          accumulatedDelta = 0;
        }
      }
      // If e.deltaY > 0 at top of page with 6 stickers, do NOT preventDefault -> smoothly scroll down to Section 1!
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [visibleItemsCount]);

  const announcements = [
    "Admissions for 2026 Fall Cohort are now open",
    "Join our upcoming Founder Workshop this Saturday at 10 AM",
    "Dhandha School expands to 5 new campuses across the country",
    "100% Merit Scholarships available for ambitious students",
    "Voted #1 Innovative Education Model of the Year"
  ];

  // 6 Images in exact order (medal & bill removed), equidistant across screen
  const heroImages = [
    { id: 1, name: "book.png", left: "5%" },
    { id: 2, name: "trophy.png", left: "23%" },
    { id: 3, name: "graduation.png", left: "41%" },
    { id: 4, name: "job.png", left: "59%" },
    { id: 5, name: "credit.png", left: "77%" },
    { id: 6, name: "laptop.png", left: "95%" },
  ];

  const subheadings = [
    "Every milestone looks like progress—until you ask where it's actually taking you.",
    "Every journey begins in a classroom.",
    "Achievement becomes the goal.",
    "Years of effort distilled into one ceremony.",
    "Congratulations. You're officially employable.",
    "Salary arrives. So do the bills.",
    "This is where the conventional path ends—and yours begins."
  ];

  const [leftBoxOffsetY, setLeftBoxOffsetY] = useState(0);
  const [leftBoxVisible, setLeftBoxVisible] = useState(true);

  // Dynamic tracking for left box group: follow in Hero, appear in Section 8, hide in middle
  useEffect(() => {
    const handleScroll = () => {
      const vh = window.innerHeight;
      const currentScroll = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;

      // 1. HERO PHASE (Top of page down to Section 1)
      if (currentScroll <= vh * 1.5) {
        const offset = Math.min(0, vh - currentScroll);
        setLeftBoxOffsetY(offset);
        setLeftBoxVisible(true);
        return;
      }

      // 2. SECTION 8 PHASE (Bottom of page in Section 8)
      const distFromBottom = docHeight - (currentScroll + vh);
      if (distFromBottom <= vh * 1.2) {
        const offset = Math.min(0, -distFromBottom);
        setLeftBoxOffsetY(offset);
        setLeftBoxVisible(true);
        return;
      }

      // 3. MIDDLE SECTIONS (Section 1 to Section 7)
      setLeftBoxVisible(false);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Bright pastel color palette for the word 'build' on each scroll step
  const pastelColors = [
    "#3b82f6", // Vibrant Electric Blue
    "#ff4757", // Bright Coral Pink
    "#ffa502", // Warm Golden Amber
    "#2ed573", // Vibrant Mint Green
    "#a55eea", // Bright Lavender Purple
    "#ff6b81", // Soft Pastel Rose
    "#00d2d3"  // Bright Pastel Cyan
  ];

  return (
    <div className={`primer-hero-wrapper ${menuOpen ? 'menu-is-open' : ''}`}>
      {/* Blurred Backdrop Overlay when Menu is Open */}
      <div className="menu-backdrop-blur" onClick={() => setMenuOpen(false)}></div>

      {/* Top Navigation Bar */}
      <header className="primer-nav">
        <div className="nav-container">
          {/* Left Box Group */}
          <div
            className="nav_left_box_wrapper"
            style={{
              transform: `translateY(${leftBoxOffsetY}px)`,
              opacity: leftBoxVisible ? 1 : 0,
              pointerEvents: leftBoxVisible ? 'auto' : 'none'
            }}
          >
            <div className="nav_left_box_simplified">
              <div className="nav_logo_parent">
                <span className="nav-brand-dhandha">DHANDHA</span>
                <span className="nav-brand-school">school</span>
              </div>
              
              <div className={`nav_trigger_simplified ${menuOpen ? 'is-active' : ''}`} onClick={toggleMenu}>
                {menuOpen ? (
                  <svg className="close-x-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  <>
                    <div className="nav_trigger-line"></div>
                    <div className="nav_trigger-line"></div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Right Links */}
          <div className="nav_right_box">
            <button className="primer-btn get-started-btn" onClick={() => setShowPaymentModal(true)}>Get started</button>
          </div>
        </div>
      </header>

      {/* Main Body with Hero Heading & Dynamic Subheading matching reference image */}
      <main className="primer-hero-main">
        <div className="hero-text-content">
          <h1 className="hero-heading">
            <div className="hero-yellow-box">
              <span className="hero-heading-text">They taught you</span>
              <span className="hero-heading-text">to crack exams.</span>
            </div>
            <span className="hero-heading-text hero-heading-plain">Nobody taught you to build.</span>
          </h1>

          <div className="hero-subheading-capsule">
            <span className="capsule-blue-text">12 years of school. Zero lessons on how to earn, build, or create wealth.</span>
          </div>

          <button className="hero-cta-btn" onClick={() => setShowPaymentModal(true)}>
            Join the Masterclass
          </button>
        </div>
      </main>

      {/* Fixed Bottom Container for Appearing Images */}
      <div className="fixed-bottom-bar-container">
        <div className="hero-images-overlay">
          {heroImages.map((img, index) => {
            const isVisible = index < visibleItemsCount;
            return (
              <div
                key={img.id}
                className={`scroll-image-item ${isVisible ? 'is-visible' : ''}`}
                style={{ left: img.left }}
              >
                <img src={`/${img.name}`} alt={img.name.replace('.png', '')} className="pop-image" />
              </div>
            );
          })}
        </div>
      </div>

      {/* Fullscreen Menu Overlay from react_copyover */}
      <div className={`menu-overlay ${menuOpen ? 'active' : ''}`}>
        <div className="menu-bg" style={{ background: menuBgColor }}></div>
        <button className="menu-close" onClick={() => setMenuOpen(false)}>
          <span className="close-x-text">✕</span> CLOSE
        </button>
        <div className="menu-content">
          {menuItems.map((item, idx) => (
            <a
              key={idx}
              href={item.href}
              className="menu-item"
              onMouseEnter={() => setMenuBgColor(item.color)}
              onMouseLeave={() => setMenuBgColor(defaultMenuBg)}
              onClick={(e) => handleMenuScroll(e, item.href)}
            >
              <span className="menu-item__num">{item.num}</span>
              <span className="menu-item__label">{item.label}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
