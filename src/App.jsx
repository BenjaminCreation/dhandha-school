import React, { useEffect, useRef, useState } from 'react';
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
    question: 'Who is Finance for Builders for?',
    answer:
      "Founders, operators, working professionals, and serious aspirants who want to understand the financial side of a business without doing an MBA. Zero prior finance background needed."
  },
  {
    question: "What's the format? Live or recorded?",
    answer:
      "One 4-hour live session, online. Q&A throughout. The session is recorded and you get lifetime access, so missing the live class is not fatal, but the live experience is the most valuable part."
  },
  {
    question: 'What language will the session be in?',
    answer:
      "Primarily English, with Hinglish where it makes the idea clearer. The goal is clarity, not formality. If demand grows for fully regional-language cohorts, we'll build those."
  },
  {
    question: "Why is it ₹999? What's the catch?",
    answer:
      `Because you're joining early. Cohort 02 is intentionally priced at ₹999 to reward early believers and help us build the community with your feedback.`
  },
  {
    question: "What if it's not for me?",
    answer:
      "If you join the live session and feel it's not what you signed up for, message us within 48 hours and we'll refund you. No forms, no friction."
  }
];

const premiseChips = ['99% do not clear JEE / NEET', 'AI is rewriting jobs', '₹30 lakh MBAs stay gated'];

const premiseCards = [
  {
    tone: 'yellow',
    eyebrow: '01',
    title: 'Study hard.',
    body: 'You are told the system is fair if you just keep grinding.'
  },
  {
    tone: 'blue',
    eyebrow: '02',
    title: 'Get filtered.',
    body: 'Most people never make it through the exam funnel or the MBA paywall.'
  },
  {
    tone: 'pink',
    eyebrow: '03',
    title: 'Still feel lost.',
    body: 'Nobody teaches you how a business works, how money moves, or how to build.'
  }
];

const whyCards = [
  {
    index: 'i.',
    title: 'The MBA is a wall.',
    body: 'The best business education in this country is gated by CAT scores, two-year programs, and lakhs of rupees.'
  },
  {
    index: 'ii.',
    title: 'AI will take your job.',
    body: 'Automation is rising, but building with leverage has never been easier. That makes business literacy more urgent, not less.'
  },
  {
    index: 'iii.',
    title: 'Content without structure.',
    body: 'The internet has facts. It rarely has sequence, curation, or a real syllabus made by someone who has used the frameworks.'
  },
  {
    index: 'iv.',
    title: '63 million dreamers.',
    body: 'India has millions of MSMEs and many more future founders. Almost none get practical, structured business education.'
  }
];

const curriculumModules = [
  {
    index: 'Day 1',
    ribbon: 'Signal',
    title: 'Reading Financial Statements',
    body: 'The three statements every business runs on: P&L, balance sheet, and cash flow, explained the way they actually work.',
    tags: ['P&L', 'Balance Sheet', 'Cash Flow', 'Red Flags'],
    accent: 'yellow',
    timing: '2 hr'
  },
  {
    index: 'Day 1',
    ribbon: 'Markets',
    title: 'Stock Market Basics',
    body: 'How public markets price businesses and how to read an annual report the way an analyst does.',
    tags: ['Annual Reports', 'Multiples', 'Market Cap', 'P/E'],
    accent: 'blue',
    timing: '1 hr'
  },
  {
    index: 'Day 2',
    ribbon: 'Fundraise',
    title: 'Pitching VCs',
    body: 'What VCs are really looking for, the story you need in the room, and the questions you will be asked.',
    tags: ['VC Mindset', 'The Pitch', 'Term Sheets', 'Dilution'],
    accent: 'pink',
    timing: '1 hr'
  },
  {
    index: 'Day 2',
    ribbon: 'Value',
    title: 'Valuation Fundamentals',
    body: 'DCF intuition without the scary math, comparable multiples, and the frameworks you need to negotiate.',
    tags: ['DCF', 'Comps', 'Multiples', 'Negotiation'],
    accent: 'purple',
    timing: '1 hr'
  }
];

const pricingPerks = [
  '4-hour live session with Vibhanshu',
  'Workbook with templates for all 4 modules',
  'Live Q&A across the full session',
  'Lifetime access to recordings',
  'Private community of cohort 02',
  'Discounted access to future masterclasses'
];

const differenceItems = [
  {
    index: '01',
    title: 'Built for India.',
    body: 'Every example, every case study, and every framework is grounded in Indian businesses. Not Harvard. Not Silicon Valley.'
  },
  {
    index: '02',
    title: 'Live, not pre-recorded.',
    body: 'Real-time sessions, real questions, and real answers that apply to your specific situation.'
  },
  {
    index: '03',
    title: 'Practical, not theoretical.',
    body: 'Every module ends with something tangible: a template, worksheet, or decision framework you can use the same day.'
  },
  {
    index: '04',
    title: 'A real cohort.',
    body: 'You learn alongside other builders at the same stage. The network should outlast the lesson.'
  }
];

const testimonials = [
  { name: 'Mridul gehlot', rating: 5, review: 'It was worth it.' },
  { name: 'Tejas Rajguru', rating: 4, review: 'Good session overall.' },
  { name: 'Ritesh Beuria', rating: 4, review: 'Very insightful, fast-paced session.' },
  { name: 'Sneha Kurcheeti', rating: 5, review: 'Great session!' },
  { name: 'Shreya Singh', rating: 5, review: 'Loved how you broke down intimidating concepts like financial statements and VC so simply.' },
  { name: 'Raghavendra Acharya', rating: 5, review: 'Amazing session — no BS, just straight to the point useful information.' },
  { name: 'Ansh Sambhariya', rating: 5, review: 'Loved the session, content, and delivery! This info isn\'t easily available anywhere.' },
  { name: 'Aryan Singh', rating: 4, review: 'Great session! Not a business master yet, but it set a solid base and curiosity for finance.' },
  { name: 'Viraj Joshi', rating: 5, review: 'Literally great! Topics like P/E ratio are now crystal clear.' },
  { name: 'Jyoti Bhandari', rating: 5, review: 'Simplified a lot for someone from a non-financial background.' },
  { name: 'Prajwal', rating: 5, review: 'Highly insightful and practical! Explained balance sheet, P&L, cash flow, stocks, and VC simply.' },
  { name: 'Gurtej Singh', rating: 5, review: 'First finance class as a 12th grader — learned a ton about stocks, VC pitch, and balance sheet.' },
  { name: 'Geetha', rating: 5, review: 'No prior finance exposure — this session was so helpful and engaging!' },
  { name: 'Yajnesh Amuru', rating: 5, review: 'Covered financial statements, stock market, and VC in depth — extremely useful!' },
  { name: 'Savar Jaiswal', rating: 5, review: 'One of the most insightful finance sessions — complex concepts broken into simple, practical lessons.' },
  { name: 'Moksh Kumar', rating: 5, review: 'Best cohort I\'ve done. Learned a lot quickly — kaafi cool session!' },
  { name: 'Devesh Gupta', rating: 5, review: 'Great session! Takeaways: balance sheet analysis and VC pitching. Now more confident analyzing companies.' },
  { name: 'Harsh Mishra', rating: 5, review: 'Content and delivery were excellent. Non-finance background but understood almost everything.' },
  { name: 'Thanushree N', rating: 5, review: 'Very informative — starting with real numbers was a great approach!' },
  { name: 'Soham waradkar', rating: 5, review: 'First time seeing a balance sheet and understood it easily. From medical background, learned a lot about VC and pitch decks. Worth the money!' },
  { name: 'Umar Fareed', rating: 5, review: 'Really enjoyed the session! Concepts explained simply and relatable. Great practical approach and vibe.' },
  { name: 'Prajjwal Adarkar', rating: 5, review: 'From humanities background, always struggled with finance — this session made it easier!' },
  { name: 'Vartika Yadav', rating: 5, review: 'Best finance class! Heard terms before but now financial statements feel simple. Looking forward to more!' },
  { name: 'Sarthak Goswami', rating: 4, review: 'All modules gave a fundamental understanding of finance. Vibhanshu\'s insights maximized learning.' },
  { name: 'Annangi Hruday', rating: 4, review: 'Really great, content-packed session — completely worth it!' },
  { name: 'Aditi', rating: 5, review: 'Great session! Everything you\'d want in a basic course covered in one session.' },
  { name: 'Gagan Deep Kardam', rating: 5, review: 'Understood finance like never before — hooked for 3 straight hours!' },
  { name: 'Pooja Kewat', rating: 5, review: 'Best class, learned a lot, built new perspective. Appreciate the priceless content!' }
];

const sectionAnnouncements = [
  'Finance for Builders · 4 modules',
  'Live cohort energy',
  'India-first case studies',
  'Practical templates',
  'Lifetime recordings'
];

function App() {
  const [loading, setLoading] = useState(true);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const outer1Ref = useRef(null);
  const track1Ref = useRef(null);
  const outer2Ref = useRef(null);
  const track2Ref = useRef(null);
  const outer3Ref = useRef(null);
  const track3Ref = useRef(null);

  const openRazorpayCheckout = () => {
    // Razorpay test key - replace with your live key in production
    const key = "rzp_test_YourKeyHere";
    
    const options = {
      key: key,
      amount: 99900, // Amount in paise (₹999)
      currency: "INR",
      name: "Dhandha School",
      description: "Finance for Builders - Cohort 02",
      image: "/favicon.svg",
      handler: function (response) {
        alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
        // Here you can send the payment details to your backend for verification
      },
      prefill: {
        name: "",
        email: "",
        contact: ""
      },
      notes: {
        "address": "Dhandha School Office"
      },
      theme: {
        color: "#FFD93D"
      }
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.on('payment.failed', function (response){
      alert(`Payment Failed! Reason: ${response.error.description}`);
    });
    rzp1.open();
  };

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      smoothTouch: false
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

  useEffect(() => {
    if (loading) return;

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    const ctx = gsap.context(() => {
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
            invalidateOnRefresh: true
          }
        });
      }

      const track2 = track2Ref.current;
      const outer2 = outer2Ref.current;
      if (track2 && outer2) {
        const shiftAmount = window.innerWidth;
        const verticalScrollAmount = window.innerHeight * 1.2; // Allow scrolling down section4 first with some extra space
        
        gsap.set(track2, { x: 0 }); // Start with section4 visible
        
        const timeline2 = gsap.timeline({
          scrollTrigger: {
            trigger: outer2,
            pin: true,
            scrub: 1,
            start: 'top top',
            end: () => `+=${verticalScrollAmount + shiftAmount}`,
            invalidateOnRefresh: true
          }
        });
        
        timeline2.to({}, { duration: verticalScrollAmount / 1000 }); // First: vertical scroll to see all of section4
        timeline2.to(track2, {
          x: () => -shiftAmount,
          ease: 'none'
        }); // Then: horizontal scroll to section3
      }

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
                detail: { progress: self.progress, isActive: self.isActive }
              });
              window.dispatchEvent(event);
            },
            onToggle: (self) => {
              const event = new CustomEvent('instructor-scroll', {
                detail: { progress: self.progress, isActive: self.isActive }
              });
              window.dispatchEvent(event);
            }
          }
        });

        timeline3.to(track3, {
          x: () => -getScrollAmount3(),
          ease: 'none'
        });
        timeline3.to({}, { duration: 1.5 });
      }
    });

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, [loading]);

  useEffect(() => {
    if (loading) return;

    const ctx = gsap.context(() => {
      // Premium Apple-style entrance animations with scroll triggers
      gsap.utils.toArray('.story-stage').forEach((stage, index) => {
        gsap.fromTo(
          stage,
          { autoAlpha: 0, y: 80 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1.4,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: stage,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );

        // Animate individual elements inside each story stage for narrative flow
        const heading = stage.querySelector('.story-heading');
        if (heading) {
          gsap.fromTo(
            heading,
            { autoAlpha: 0, y: 40, scale: 0.96 },
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 1.1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: stage,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
              }
            }
          );
        }

        const highlights = stage.querySelectorAll('.story-highlight');
        if (highlights.length > 0) {
          gsap.fromTo(
            highlights,
            { autoAlpha: 0, x: -30, scale: 0.98 },
            {
              autoAlpha: 1,
              x: 0,
              scale: 1,
              duration: 1,
              stagger: 0.15,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: stage,
                start: 'top 75%',
                toggleActions: 'play none none reverse'
              }
            }
          );
        }
      });

      // Enhanced sticker/card animations
      gsap.utils.toArray('.sticker-card, .manifesto-card, .module-card, .difference-note, .pricing-poster').forEach((card, index) => {
        gsap.fromTo(
          card,
          { autoAlpha: 0, y: 50, rotate: index % 2 === 0 ? 2 : -2, scale: 0.97 },
          {
            autoAlpha: 1,
            y: 0,
            rotate: 0,
            scale: 1,
            duration: 1,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });

      // Elegant floating cutout animations with smoother timing
      gsap.utils.toArray('.floating-cutout').forEach((item, index) => {
        gsap.to(item, {
          y: index % 2 === 0 ? -24 : 24,
          x: index % 3 === 0 ? 14 : -14,
          rotation: index % 2 === 0 ? 5 : -5,
          duration: 4.2 + index * 0.3,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });
      });

      // Premium marquee animation enhancement
      const marqueeTracks = document.querySelectorAll('.story-marquee-track');
      marqueeTracks.forEach(track => {
        gsap.to(track, {
          x: '-50%',
          duration: 35,
          repeat: -1,
          ease: 'none'
        });
      });
    });

    return () => {
      ctx.revert();
    };
  }, [loading]);

  return (
    <div className="app-shell">
      <div className="iisc-bg-overlay" />
      <div className="iim-bg-overlay" />
      <div className="mckinsey-bg-overlay" />

      <Hero />

      <div className="horizontal-scroll-outer" id="why" ref={outer1Ref}>
        <div className="horizontal-scroll-track" ref={track1Ref}>
          <section className="placeholder-section section-1">
            <div className="story-stage story-stage-premise story-panel">
              <div className="story-gradient story-gradient-left">
                <div className="gradient-blobs-container">
                  <div className="hero-circ_blue2" />
                  <div className="hero-circ_pink2" />
                  <div className="hero-circ_blue" />
                  <div className="hero-circ_pink" />
                </div>
              </div>
              <img src="/graduation.png" alt="" aria-hidden="true" className="floating-cutout cutout-graduation" />
              <img src="/job.png" alt="" aria-hidden="true" className="floating-cutout cutout-job" />
              <div className="story-topbar">
                <span className="story-badge">01 / THE PREMISE</span>
                <div className="story-chip-row">
                  {premiseChips.map((chip) => (
                    <span key={chip} className="story-chip">
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
              <div className="premise-layout">
                <div className="premise-copy story-panel">
                  <h2 className="story-heading">
                    <span className="story-highlight story-highlight-yellow">Indian education</span>
                    <span className="story-heading-line">system is a scam.</span>
                    <span className="story-heading-line story-heading-line-offset">We need an alternative.</span>
                  </h2>
                  <div className="story-slant-capsule">
                    <span className="story-capsule-text">The current path teaches obedience, not ownership.</span>
                  </div>
                  <p className="story-black-strip">
                    Real wealth is built by people who know how to build businesses, but the system rarely teaches that language.
                  </p>
                </div>
                <div className="premise-stack">
                  {premiseCards.map((card) => (
                    <article key={card.title} className={`sticker-card sticker-${card.tone} story-panel`}>
                      <span className="sticker-eyebrow">{card.eyebrow}</span>
                      <h3 className="sticker-title">{card.title}</h3>
                      <p className="sticker-body">{card.body}</p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="placeholder-section section-2">
            <div className="story-stage story-stage-why story-panel">
              <img src="/book.png" alt="" aria-hidden="true" className="floating-cutout cutout-book" />
              <img src="/bill.png" alt="" aria-hidden="true" className="floating-cutout cutout-bill" />
              <div className="story-topbar">
                <span className="story-badge">02 / WHY WE EXIST</span>
                <p className="story-top-copy">Turning ambitious learners into confident builders.</p>
              </div>
              <div className="manifesto-header">
                <h2 className="story-heading">
                  <span className="story-highlight story-highlight-lavender">Why Dhandha School needs to exist.</span>
                </h2>
                <p className="story-body">
                  Business education in India is broken in two directions: an expensive gate on one side, chaos on the other.
                </p>
              </div>
              <div className="manifesto-grid">
                {whyCards.map((item, index) => (
                  <article key={item.title} className={`manifesto-card manifesto-card-${index + 1} story-panel`}>
                    <span className="manifesto-index">{item.index}</span>
                    <h3 className="manifesto-title">{item.title}</h3>
                    <p className="manifesto-body">{item.body}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>

      <div className="horizontal-scroll-outer" id="masterclass" ref={outer2Ref}>
        <div className="horizontal-scroll-track" ref={track2Ref}>
          <section className="placeholder-section section-4">
            <div className="story-stage story-stage-pricing story-panel">
              <img src="/credit.png" alt="" aria-hidden="true" className="floating-cutout cutout-credit" />
              <div className="story-topbar">
                <span className="story-badge">04 / Second Cohort</span>
                <div className="story-chip-row">
                  <span className="story-chip">Online session</span>
                  <span className="story-chip">Lifetime recording access</span>
                  <span className="story-chip">Weekend</span>
                </div>
              </div>
              <div className="pricing-layout">
                <div className="pricing-copy story-panel">
                  <h2 className="story-heading">
                    <span className="story-highlight story-highlight-blue">₹999</span>
                    <span className="story-heading-line">for the second leap.</span>
                  </h2>
                  <div className="story-slant-capsule story-slant-capsule-dark">
                    <span className="story-capsule-text story-capsule-text-dark">Early member pricing for the second cohort only.</span>
                  </div>
                  <p className="story-body">
                    Tight, dense, live, and useful the same day. The offer is small on price so the ambition can be big on access.
                  </p>
                </div>
                <div className="pricing-poster story-panel">
                  <div className="pricing-poster-top">
                    <span className="pricing-eyebrow">Finance for Builders</span>
                    <div className="pricing-amounts">
                      <span className="pricing-old">₹1,999</span>
                      <span className="pricing-new">₹999</span>
                    </div>
                  </div>
                  <ul className="pricing-list">
                    {pricingPerks.map((perk) => (
                      <li key={perk}>{perk}</li>
                    ))}
                  </ul>
                  <button className="primer-btn get-started-btn pricing-primary-btn" onClick={openRazorpayCheckout}>Join</button>
                </div>
              </div>
            </div>
          </section>

          <section className="placeholder-section section-3" id="curriculum">
            <div className="story-stage story-stage-curriculum story-panel">
              <img src="/laptop.png" alt="" aria-hidden="true" className="floating-cutout cutout-laptop" />
              <img src="/trophy.png" alt="" aria-hidden="true" className="floating-cutout cutout-trophy" />
              <div className="story-topbar">
                <span className="story-badge">03 / MASTERCLASS </span>
                <div className="story-marquee-inline">
                  <div className="story-marquee-track">
                    {sectionAnnouncements.concat(sectionAnnouncements).map((item, index) => (
                      <span key={`${item}-${index}`} className="story-chip">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="curriculum-header">
                <h2 className="story-heading">
                  <span className="story-highlight story-highlight-cyan">Finance,</span>
                  <span className="story-heading-line">for the ones actually building.</span>
                </h2>
                <p className="story-black-strip story-black-strip-wide">
                  Four modules. Three hours. No MBA theater. No jargon for jargon&apos;s sake.
                </p>
              </div>
              <div className="curriculum-stack">
                {curriculumModules.map((module) => (
                  <article key={module.title} className={`module-card module-card-${module.accent} story-panel`}>
                    <div className="module-ribbon">
                      <span>{module.index}</span>
                      <span>{module.ribbon}</span>
                      <span>{module.timing}</span>
                    </div>
                    <div className="module-main">
                      <div className="module-copy">
                        <h3 className="module-title">{module.title}</h3>
                        <p className="module-body">{module.body}</p>
                      </div>
                      <div className="module-tags">
                        {module.tags.map((tag) => (
                          <span key={tag} className="module-tag">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>

      <div className="horizontal-scroll-outer" id="whatsnext" ref={outer3Ref}>
        <div className="horizontal-scroll-track" ref={track3Ref}>
          <section className="placeholder-section section-5">
            <div className="story-stage story-stage-difference story-panel">
              <img src="/medal.png" alt="" aria-hidden="true" className="floating-cutout cutout-medal" />
              <div className="story-topbar">
                <span className="story-badge">05 / THE DIFFERENCE</span>
                <div className="story-chip-row">
                  <span className="story-chip">Live</span>
                  <span className="story-chip">Practical</span>
                  <span className="story-chip">India-first</span>
                  <span className="story-chip">Cohort-led</span>
                </div>
              </div>
              <div className="difference-layout">
                <div className="difference-copy story-panel">
                  <h2 className="story-heading">
                    <span className="story-highlight story-highlight-peach">Not another</span>
                    <span className="story-heading-line">online course.</span>
                  </h2>
                  <p className="story-body">
                    We do not believe in 40-hour content libraries you will never finish. We believe in one session dense enough to change how you think.
                  </p>
                </div>
                <div className="difference-board">
                  {differenceItems.map((item, index) => (
                    <article key={item.title} className={`difference-note difference-note-${index + 1} story-panel`}>
                      <span className="difference-index">{item.index}</span>
                      <h3 className="difference-title">{item.title}</h3>
                      <p className="difference-body">{item.body}</p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <InstructorSection />
        </div>
      </div>

      <section className="placeholder-section section-7">
        <div className="story-stage story-stage-cta story-panel">
          <div className="story-gradient story-gradient-right">
            <div className="gradient-blobs-container">
              <div className="hero-circ_blue2" />
              <div className="hero-circ_pink2" />
              <div className="hero-circ_blue" />
              <div className="hero-circ_pink" />
            </div>
          </div>
          <img src="/book.png" alt="" aria-hidden="true" className="floating-cutout cutout-book-cta" />
          <img src="/trophy.png" alt="" aria-hidden="true" className="floating-cutout cutout-trophy-cta" />
          <div className="cta-shell">
            <span className="story-badge">06 / YOUR MOVE</span>
            <h2 className="story-heading story-heading-center">
              <span className="story-highlight story-highlight-yellow">Four hours</span>
              <span className="story-heading-line">can change how you read a business.</span>
            </h2>
            <div className="story-slant-capsule">
              <span className="story-capsule-text">Two masterclass . Only Leap</span>
            </div>
            <p className="story-black-strip">
              One language every builder eventually has to learn.
            </p>
            <div className="cta-actions">
              <button className="primer-btn get-started-btn" onClick={openRazorpayCheckout}>Join the masterclass</button>
            </div>
          </div>
        </div>
      </section>

      <section className="placeholder-section section-testimonials">
        <div className="story-stage story-stage-testimonials story-panel">
          <div className="story-topbar">
            <span className="story-badge">07 / TESTIMONIALS</span>
          </div>
          <h2 className="story-heading">
            <span className="story-highlight story-highlight-pink">What our students say</span>
          </h2>
          <div className="testimonials-marquee-container">
            <div className="testimonials-marquee-track">
              {[...testimonials, ...testimonials].map((testimonial, index) => (
                <article key={index} className={`testimonial-card story-panel testimonial-card-${(index % 4) + 1}`}>
                  <div className="testimonial-rating">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < testimonial.rating ? 'star-filled' : 'star-empty'}>★</span>
                    ))}
                  </div>
                  <p className="testimonial-review">{testimonial.review}</p>
                  <span className="testimonial-name">— {testimonial.name}</span>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-8-container" id="pricing">
        <div className="sec8-right-buttons">
          <a href="#signin" className="nav-link sign-in">
            Sign in
          </a>
          <button className="primer-btn get-started-btn" onClick={openRazorpayCheckout}>Get started</button>
        </div>

        <div className="sec8-faq-top" id="faq">
          <div className="sec8-faq-header story-panel">
            <span className="sec8-faq-badge">FAQ</span>
            <h2 className="sec8-faq-title">The honest answers to the obvious questions.</h2>
          </div>
          <div className="sec8-faq-list">
            {faqData.map((item, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div key={item.question} className={`sec8-faq-item story-panel ${isOpen ? 'is-open' : ''}`}>
                  <div className="sec8-faq-question" onClick={() => setOpenFaqIndex(isOpen ? null : index)}>
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

        <footer className="sec8-footer-bottom">
          <div className="footer-gradient-bg">
            <div className="gradient-blobs-container">
              <div className="hero-circ_blue2" />
              <div className="hero-circ_pink2" />
              <div className="hero-circ_blue" />
              <div className="hero-circ_pink" />
            </div>
          </div>

          <div className="sec8-footer-grid">
            <div className="sec8-col sec8-col-brand">
              <div className="sec8-brand-logo">
                <span className="brand-dhandha">DHANDHA</span>
                <span className="brand-school">school</span>
              </div>
              <p className="sec8-brand-desc">
                A new kind of business school for India. Practical, affordable, and built for the people actually building things.
              </p>
            </div>

            <div className="sec8-col">
              <h4 className="sec8-col-title">MASTERCLASS</h4>
              <ul className="sec8-col-links">
                <li>
                  <a href="#curriculum">Curriculum</a>
                </li>
                <li>
                  <a href="#pricing">Pricing</a>
                </li>
                <li>
                  <a href="#faq">FAQ</a>
                </li>
              </ul>
            </div>

            <div className="sec8-col">
              <h4 className="sec8-col-title">ABOUT</h4>
              <ul className="sec8-col-links">
                <li>
                  <a href="#instructor">Instructor</a>
                </li>
                <li>
                  <a href="#why">Why we exist</a>
                </li>
                <li>
                  <a href="#masterclass">Masterclass</a>
                </li>
              </ul>
            </div>

            <div className="sec8-col">
              <h4 className="sec8-col-title">FOLLOW</h4>
              <ul className="sec8-col-links">
                <li>
                  <a href="#instagram">Instagram</a>
                </li>
                <li>
                  <a href="#youtube">YouTube</a>
                </li>
                <li>
                  <a href="#linkedin">LinkedIn</a>
                </li>
              </ul>
            </div>

            <div className="sec8-col sec8-col-backtop">
              <button
                className="scroll-to-top-btn"
                onClick={() => {
                  if (window.__lenis) {
                    window.__lenis.scrollTo(0, {
                      duration: 3.8,
                      easing: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
                    });
                  } else {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                title="Scroll to top"
                aria-label="Scroll to top"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="12" y1="19" x2="12" y2="5" />
                  <polyline points="5 12 12 5 19 12" />
                </svg>
              </button>
            </div>
          </div>

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
