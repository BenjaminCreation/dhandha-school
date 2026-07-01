import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import 'lenis/dist/lenis.css';
import Loader from './components/Loader';
import Hero from './components/Hero';
import InstructorSection from './components/InstructorSection';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

const faqData = [
  {
    question: "What's the format? Live or recorded?",
    answer: "One 3-hour live session, online. Q&A throughout. The session is recorded and you get lifetime access — so missing the live class isn't fatal, but the live experience (questions, discussion, peers) is the most valuable part. Exact date is announced once the cohort is confirmed."
  },
  {
    question: "What language will the session be in?",
    answer: "Primarily English, with Hinglish where it makes the idea clearer. The goal is clarity, not formality. If demand grows for fully regional-language cohorts, we'll build those."
  },
  {
    question: "Why is it ₹499? What's the catch?",
    answer: "Because this is cohort 01 and our entire reason for existing is accessibility. Early students take a leap of faith with us; founding member pricing is our way of saying thank you. The price will go up for future cohorts. No catch — just the floor we wanted to start at."
  },
  {
    question: "What if it's not for me?",
    answer: "If you join the live session and feel it's not what you signed up for, message us within 48 hours and we'll refund you. No forms, no friction."
  }
];

function App() {
  const [loading, setLoading] = useState(true);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // Section 1 -> Section 2 Refs (Track 1)
  const outer1Ref = useRef(null);
  const track1Ref = useRef(null);

  // Section 3 -> Section 4 Refs (Track 2)
  const outer2Ref = useRef(null);
  const track2Ref = useRef(null);

  // Section 5 -> Section 6 Refs (Track 3)
  const outer3Ref = useRef(null);
  const track3Ref = useRef(null);

  useEffect(() => {
    // Initialize Lenis smooth scroll synced with GSAP ScrollTrigger
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 2.0,
      smoothTouch: false,
    });

    window.__lenis = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const updateRaf = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateRaf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateRaf);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  // Set up GSAP ScrollTrigger horizontal scroll pinning for all 3 tracks
  useEffect(() => {
    if (loading) return;

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    const ctx = gsap.context(() => {
      // Track 1: Section 1 (left) -> Section 2 (right)
      const track1 = track1Ref.current;
      const outer1 = outer1Ref.current;
      if (track1 && outer1) {
        const getScrollAmount1 = () => track1.scrollWidth - window.innerWidth;
        gsap.to(track1, {
          x: () => -getScrollAmount1(),
          ease: 'none',
          scrollTrigger: {
            trigger: outer1,
            pin: true,
            scrub: 1,
            start: 'top top',
            end: () => `+=${getScrollAmount1()}`,
            invalidateOnRefresh: true,
          },
        });
      }

      // Track 2: Section 3 (right) -> Section 4 (left)
      const track2 = track2Ref.current;
      const outer2 = outer2Ref.current;
      if (track2 && outer2) {
        const shiftAmount = window.innerWidth;
        gsap.fromTo(
          track2,
          { x: () => -shiftAmount },
          {
            x: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: outer2,
              pin: true,
              scrub: 1,
              start: 'top top',
              end: () => `+=${shiftAmount}`,
              invalidateOnRefresh: true,
            },
          }
        );
      }

      // Track 3: Section 5 (left) -> Section 6 (right)
      const track3 = track3Ref.current;
      const outer3 = outer3Ref.current;
      if (track3 && outer3) {
        const getScrollAmount3 = () => track3.scrollWidth - window.innerWidth;
        
        const timeline3 = gsap.timeline({
          scrollTrigger: {
            trigger: outer3,
            pin: true,
            scrub: 1,
            start: 'top top',
            end: () => `+=${getScrollAmount3() + window.innerHeight * 1.5}`,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const event = new CustomEvent('instructor-scroll', {
                detail: {
                  progress: self.progress,
                  isActive: self.isActive,
                }
              });
              window.dispatchEvent(event);
            },
            onToggle: (self) => {
              const event = new CustomEvent('instructor-scroll', {
                detail: {
                  progress: self.progress,
                  isActive: self.isActive,
                }
              });
              window.dispatchEvent(event);
            }
          },
        });

        timeline3.to(track3, {
          x: () => -getScrollAmount3(),
          ease: 'none',
        });
        timeline3.to({}, { duration: 1.5 }); // Locked phase for instructor content animation
      }
    });

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, [loading]);

  return (
    <div style={{ position: 'relative', minHeight: '100vh', backgroundColor: '#fbf9f4' }}>
      <div className="iisc-bg-overlay" />
      <div className="iim-bg-overlay" />
      <div className="mckinsey-bg-overlay" />

      {/* Hero is rendered underneath so it reveals instantly as loader fades out */}
      <Hero />

      {/* Track 1: Horizontal Scroll Container for Section 1 -> Section 2 */}
      <div className="horizontal-scroll-outer" id="why" ref={outer1Ref}>
        <div className="horizontal-scroll-track" ref={track1Ref}>
          {/* Section 1 */}
          <section className="placeholder-section section-1">
            <div className="section-content-box">
              <h2 className="section-title">Section 1</h2>
              <p className="section-description">
                Scroll down to transition horizontally into Section 2.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section className="placeholder-section section-2">
            <div className="section-content-box">
              <h2 className="section-title">Section 2</h2>
              <p className="section-description">
                Horizontal scroll complete! Continue scrolling down to reach Section 3.
              </p>
            </div>
          </section>
        </div>
      </div>

      {/* Track 2: Horizontal Scroll Container for Section 3 (right) -> Section 4 (left) */}
      <div className="horizontal-scroll-outer" id="masterclass" ref={outer2Ref}>
        <div className="horizontal-scroll-track" ref={track2Ref}>
          {/* Section 4 (Positioned on Left) */}
          <section className="placeholder-section section-4">
            <div className="section-content-box">
              <h2 className="section-title">Section 4</h2>
              <p className="section-description">
                Horizontal scroll complete! Scroll down vertically to reach Section 5.
              </p>
            </div>
          </section>

          {/* Section 3 (Positioned on Right, Shown First on Scroll) */}
          <section className="placeholder-section section-3">
            <div className="section-content-box">
              <h2 className="section-title">Section 3</h2>
              <p className="section-description">
                Section 3 is in view! Scroll down to reveal Section 4 horizontally to the left.
              </p>
            </div>
          </section>
        </div>
      </div>

      {/* Track 3: Horizontal Scroll Container for Section 5 -> Section 6 */}
      <div className="horizontal-scroll-outer" id="whatsnext" ref={outer3Ref}>
        <div className="horizontal-scroll-track" ref={track3Ref}>
          {/* Section 5 */}
          <section className="placeholder-section section-5">
            <div className="section-content-box">
              <h2 className="section-title">Section 5</h2>
              <p className="section-description">
                Vertical scroll to Section 5 complete! Scroll down to transition horizontally to Section 6.
              </p>
            </div>
          </section>

          {/* Section 6: Interactive Instructor Panel from collab_test */}
          <InstructorSection />
        </div>
      </div>

      {/* Section 7 (Normal Vertical Scroll below Section 6) */}
      <section className="placeholder-section section-7">
        <div className="section-content-box">
          <h2 className="section-title">Section 7</h2>
          <p className="section-description">
            Vertical scroll to Section 7 complete! Scroll down vertically to reach Section 8.
          </p>
        </div>
      </section>

      {/* Section 8: FAQ Top 70% + Footer Bottom 30% */}
      <section className="section-8-container" id="pricing">
        {/* Static Top-Right Buttons matching Hero position */}
        <div className="sec8-right-buttons">
          <a href="#signin" className="nav-link sign-in">Sign in</a>
          <button className="primer-btn get-started-btn">Get started</button>
        </div>

        {/* Top 70%: FAQ Section */}
        <div className="sec8-faq-top">
          <div className="sec8-faq-header">
            <span className="sec8-faq-badge">FAQ</span>
            <h2 className="sec8-faq-title">Frequently Asked Questions</h2>
          </div>
          <div className="sec8-faq-list">
            {faqData.map((item, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div key={index} className={`sec8-faq-item ${isOpen ? 'is-open' : ''}`}>
                  <div
                    className="sec8-faq-question"
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  >
                    <span>{item.question}</span>
                    <span className="sec8-faq-icon">{isOpen ? '−' : '+'}</span>
                  </div>
                  {isOpen && (
                    <div className="sec8-faq-answer">
                      <p>{item.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom 30%: Reference Design Footer with Moving Gradient BG */}
        <footer className="sec8-footer-bottom">
          <div className="footer-gradient-bg">
            <div className="gradient-blobs-container">
              <div className="hero-circ_blue2"></div>
              <div className="hero-circ_pink2"></div>
              <div className="hero-circ_blue"></div>
              <div className="hero-circ_pink"></div>
            </div>
          </div>

          <div className="sec8-footer-grid">
            {/* Column 1: Brand */}
            <div className="sec8-col sec8-col-brand">
              <div className="sec8-brand-logo">
                <span className="brand-dhandha">DHANDHA</span>
                <span className="brand-school">school</span>
              </div>
              <p className="sec8-brand-desc">
                A new kind of business school for India. Practical, affordable, and built for the people actually building things.
              </p>
            </div>

            {/* Column 2: Masterclass */}
            <div className="sec8-col">
              <h4 className="sec8-col-title">MASTERCLASS</h4>
              <ul className="sec8-col-links">
                <li><a href="#curriculum">Curriculum</a></li>
                <li><a href="#pricing">Pricing</a></li>
                <li><a href="#faq">FAQ</a></li>
              </ul>
            </div>

            {/* Column 3: About */}
            <div className="sec8-col">
              <h4 className="sec8-col-title">ABOUT</h4>
              <ul className="sec8-col-links">
                <li><a href="#instructor">Instructor</a></li>
                <li><a href="#why">Why we exist</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>

            {/* Column 4: Follow */}
            <div className="sec8-col">
              <h4 className="sec8-col-title">FOLLOW</h4>
              <ul className="sec8-col-links">
                <li><a href="#instagram">Instagram</a></li>
                <li><a href="#youtube">YouTube</a></li>
                <li><a href="#linkedin">LinkedIn</a></li>
              </ul>
            </div>

            {/* Column 5: Scroll to Top Circle Button */}
            <div className="sec8-col sec8-col-backtop">
              <button
                className="scroll-to-top-btn"
                onClick={() => {
                  if (window.__lenis) {
                    window.__lenis.scrollTo(0, {
                      duration: 3.8,
                      easing: (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
                    });
                  } else {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                title="Scroll to top"
                aria-label="Scroll to top"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="19" x2="12" y2="5"></line>
                  <polyline points="5 12 12 5 19 12"></polyline>
                </svg>
              </button>
            </div>
          </div>

          {/* Bottom copyright bar */}
          <div className="sec8-footer-bottom-bar">
            <span>© 2026 Dhandha School · Made in India · All rights reserved</span>
            <span>Cohort 01 · 2026</span>
          </div>
        </footer>
      </section>

      {loading && <Loader onComplete={() => setLoading(false)} />}
    </div>
  );
}

export default App;
