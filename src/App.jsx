import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import Loader from './components/Loader';
import Hero from './components/Hero';
import InstructorSection from './components/InstructorSection';
import './App.css';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
if (typeof window !== 'undefined') {
  window.ScrollTrigger = ScrollTrigger;
}

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
    title: 'AI will take your job',
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
  { name: 'Mridul Gehlot', rating: 5, review: "It's was worth it.", profilePhoto: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Mridul' },
  { name: 'Tejas Rajguru', rating: 4, review: 'Good session overall.', profilePhoto: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Tejas' },
  { name: 'Ritesh Beuria', rating: 4, review: 'It was very insightful, fast-paced and long.', profilePhoto: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Ritesh' },
  { name: 'Sneha Kurcheeti', rating: 5, review: 'Great session!', profilePhoto: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Sneha' },
  { name: 'Shreya Singh', rating: 5, review: 'I loved how simply you broke down concepts that usually feel intimidating, like financial statements and VC, and made them so easy to understand.', profilePhoto: '/Testmonials/Shreya Singh.jpeg' },
  { name: 'Raghavendra Acharya', rating: 5, review: 'Amazing session. No BS, just straight-to-the-point useful information.', profilePhoto: '/Testmonials/Raghavendra Acharya.jpeg' },
  { name: 'Ansh Sambhariya', rating: 5, review: "I loved the session, the content, and the delivery! This information isn't easily available anywhere.", profilePhoto: '/Testmonials/Ansh Sambhariya.png' },
  { name: 'Aryan Singh', rating: 4, review: "Great session. I wouldn't say I'm a business master now, but it has really set up a base of context and curiosity for finance. Thanks!", profilePhoto: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Aryan' },
  { name: 'Viraj Joshi', rating: 5, review: 'It was literally great. Topics like P/E ratio that I had heard before are now crystal clear.', profilePhoto: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Viraj' },
  { name: 'Jyoti Bhandari', rating: 5, review: 'You simplified a lot of things for somebody from a non-finance background.', profilePhoto: '/Testmonials/photo-output - Jiya Bhandari.jpeg' },
  { name: 'Amogh Sridhar', rating: 4, review: 'The content was nice but felt a little basic. I understand it had to cater to a larger audience. Also, you could improve your speaking and presentation skills - no offense.', profilePhoto: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Amogh' },
  { name: 'Prajwal', rating: 5, review: 'The session explained Balance Sheets, P&L, Cash Flow, investing, stocks, and VC in a simple and practical way. It was engaging and provided a strong foundation for finance and entrepreneurship.', profilePhoto: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Prajwal' },
  { name: 'Gurtej Singh', rating: 5, review: 'It was my first finance class as a 12th grader. Learned a ton about stocks, VC pitching, and balance sheets.', profilePhoto: '/Testmonials/Gurtej_Passport_Photo - Gurtej Singh.jpeg' },
  { name: 'Geetha', rating: 5, review: "With no finance background, this session was extremely helpful. I've followed you since your IIM days and it was a pleasure to attend. Looking forward to future sessions.", profilePhoto: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Geetha' },
  { name: 'Yajnesh Amuru', rating: 5, review: 'The three modules on financial statements, stock investing, and venture capital were all valuable, even with my accounting background.', profilePhoto: '/Testmonials/PXL_20250701_220621067 - Yajnesh Amuru.jpg' },
  { name: 'Savar Jaiswal', rating: 5, review: "One of the most insightful finance sessions I've attended. Practical, engaging, and highly valuable.", profilePhoto: '/Testmonials/a5682ea0-b65f-449b-a7a2-41a0bc044655(1) - Savar Jaiswal.png' },
  { name: 'Moksh Kumar', rating: 5, review: "Best cohort I've done. Learned a lot in a short span. Kaafi cool session!", profilePhoto: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Moksh' },
  { name: 'Devesh Gupta', rating: 5, review: 'Great session. Biggest takeaways were balance sheet analysis and VC pitching. I now feel more confident analyzing companies.', profilePhoto: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Devesh' },
  { name: 'Harsh Mishra', rating: 5, review: 'Excellent content and delivery. Coming from a non-finance background, I understood almost everything in one go.', profilePhoto: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Harsh' },
  { name: 'Thanushree N', rating: 5, review: 'Very informative. Starting with real numbers was a great approach. Loved it!', profilePhoto: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Thanushree' },
  { name: 'Soham Waradkar', rating: 5, review: 'Saw a balance sheet for the first time and understood it easily despite coming from a medical background. The session was completely worth the money.', profilePhoto: '/Testmonials/1759850728997 - Soham Waradkar.jpg' },
  { name: 'Umar Fareed', rating: 5, review: 'Concepts were explained simply and practically. It felt like a meaningful conversation rather than a lecture. Highly recommended.', profilePhoto: '/Testmonials/umar_fareed - Mohammad Umar Fareed.png' },
  { name: 'Prajjwal Adarkar', rating: 5, review: "Coming from a humanities and marketing background, this session made finance accessible and enjoyable. I've followed your journey since your first video and loved every part of the workshop.", profilePhoto: '/Testmonials/1729054472298 - Prajwal Adarkar.jfif' }
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
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  // Debug: Check environment variable
  useEffect(() => {
    console.log("App Loaded - VITE_RAZORPAY_KEY_ID exists:", !!import.meta.env.VITE_RAZORPAY_KEY_ID);
    console.log("Key starts with rzp_:", import.meta.env.VITE_RAZORPAY_KEY_ID?.startsWith("rzp_"));
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  const outer1Ref = useRef(null);
  const track1Ref = useRef(null);
  const outer2Ref = useRef(null);
  const track2Ref = useRef(null);
  const outer3Ref = useRef(null);
  const track3Ref = useRef(null);

  const handleProceedToPayment = async () => {
    if (!userName.trim() || !userEmail.trim() || !userPhone.trim()) {
      alert("Please fill all fields!");
      return;
    }
    await openRazorpayCheckout();
  };

  const openRazorpayCheckout = async () => {
    try {
      setPaymentLoading(true);
      const key = import.meta.env.VITE_RAZORPAY_KEY_ID;
      const backendUrl = import.meta.env.VITE_BACKEND_WORKER_URL || "";

      console.log("Razorpay Key:", key ? "Loaded" : "Missing");
      console.log("Backend Worker URL:", backendUrl || "(relative)");
      console.log("window.Razorpay available:", typeof window.Razorpay !== "undefined");

      // Step 1: Try to create a Razorpay order via our backend
      let orderId = null;
      try {
        const orderRes = await fetch(`${backendUrl}/api/create-order`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
        if (orderRes.ok) {
          const orderData = await orderRes.json();
          if (orderData.success && orderData.order?.id) {
            orderId = orderData.order.id;
          }
        }
      } catch (_) {
        // Backend not reachable — proceed without order (fallback mode)
        console.warn("Backend unavailable, falling back to orderless checkout.");
      }

      const options = {
        key: key,
        amount: 100, // ₹1 in paise (for testing)
        currency: "INR",
        name: "Dhandha School",
        description: "Finance for Builders - Cohort 02",
        image: "/favicon.svg",
        ...(orderId && { order_id: orderId }),
        handler: async function (response) {
          // Step 2: Verify payment signature via backend
          try {
            const verifyRes = await fetch(`${backendUrl}/api/verify-payment`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                name: userName,
                email: userEmail,
                phone: userPhone,
              }),
            });
            if (verifyRes.ok) {
              const verifyData = await verifyRes.json();
              if (!verifyData.success) {
                console.warn("Signature verification failed on server.");
              }
            }
          } catch (_) {
            // Backend not reachable — still show success to user
            console.warn("Could not verify payment on backend (offline).");
          }

          // Show in-app success screen
          setShowPaymentModal(false);
          setPaymentSuccess(true);
          setUserName("");
          setUserEmail("");
          setUserPhone("");
        },
        prefill: {
          name: userName,
          email: userEmail,
          contact: userPhone,
        },
        notes: {
          address: "Dhandha School Office",
        },
        theme: {
          color: "#FFD93D",
        },
      };

      setPaymentLoading(false);

      if (typeof window.Razorpay === "undefined") {
        alert("Razorpay checkout failed to load. Please refresh the page and try again.");
        return;
      }

      const rzp1 = new window.Razorpay(options);
      rzp1.on("payment.failed", function (response) {
        alert(`Payment Failed! Reason: ${response.error.description}`);
      });
      rzp1.open();
    } catch (error) {
      setPaymentLoading(false);
      console.error("Razorpay Checkout Error:", error);
      alert("Failed to open checkout. Please check the console for details and try again!");
    }
  };

  useEffect(() => {
    if (window.innerWidth <= 768) {
      return;
    }
    const smoother = ScrollSmoother.create({
      smooth: 1.2,
      ease: 'power3.out',
      normalizeScroll: true,
      smoothTouch: false
    });

    window.__smoother = smoother;

    return () => {
      smoother.kill();
      delete window.__smoother;
    };
  }, []);

  useEffect(() => {
    if (loading) return;

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // ── DESKTOP ANIMATIONS (>= 769px) ──
      mm.add("(min-width: 769px)", () => {
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
          const verticalScrollAmount = window.innerHeight * 0.3; // Short pause before horizontal shift

          gsap.set(track2, { x: 0 }); // Start with section4 visible

          const timeline2 = gsap.timeline({
            scrollTrigger: {
              id: 'track2-trigger',
              trigger: outer2,
              pin: true,
              scrub: 1,
              start: 'top top',
              end: () => `+=${verticalScrollAmount + (track2.children[0]?.offsetWidth || window.innerWidth)}`,
              invalidateOnRefresh: true
            }
          });

          timeline2.to({}, { duration: verticalScrollAmount }); // Brief pause
          timeline2.to(track2, {
            x: () => -(track2.children[0]?.offsetWidth || window.innerWidth),
            ease: 'none',
            duration: (track2.children[0]?.offsetWidth || window.innerWidth)
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
              end: () => `+=${getScrollAmount3() + window.innerHeight * 0.4}`,
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
          timeline3.to({}, { duration: 0.3 });
        }
      });

      // ── MOBILE ANIMATIONS (<= 768px) ──
      mm.add("(max-width: 768px)", () => {
        // Trigger vertical highlights in Section 6 (Instructor)
        const instructorEl = document.getElementById('instructor');
        if (instructorEl) {
          ScrollTrigger.create({
            trigger: instructorEl,
            start: 'top center',
            end: 'bottom center',
            scrub: true,
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
          });
        }
      });
    });

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, [loading]);

  useEffect(() => {
    if (loading) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // ── DESKTOP ANIMATIONS (min-width: 769px) ──
      mm.add("(min-width: 769px)", () => {
        // Helper: only animate elements NOT inside horizontal scroll sections
        const outsideHScroll = (selector) =>
          gsap.utils.toArray(selector).filter(el => !el.closest('.horizontal-scroll-outer'));

        // Premium Apple-style entrance animations with scroll triggers
        outsideHScroll('.story-stage').forEach((stage, index) => {
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

        // Enhanced sticker/card animations (non-horizontal sections only)
        outsideHScroll('.sticker-card, .manifesto-card, .module-card, .difference-note, .pricing-poster').forEach((card, index) => {
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

        // ── CTA section inner elements ──
        const ctaShell = document.querySelector('.cta-shell');
        if (ctaShell) {
          gsap.utils.toArray([
            ctaShell.querySelector('.story-badge'),
            ctaShell.querySelector('.story-heading'),
            ctaShell.querySelector('.story-slant-capsule'),
            ctaShell.querySelector('.story-black-strip'),
            ctaShell.querySelector('.cta-actions')
          ].filter(Boolean)).forEach((el, i) => {
            gsap.fromTo(el,
              { autoAlpha: 0, y: 40 },
              {
                autoAlpha: 1, y: 0,
                duration: 0.9,
                delay: i * 0.12,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: ctaShell,
                  start: 'top 80%',
                  toggleActions: 'play none none reverse'
                }
              }
            );
          });
        }

        // ── Testimonials section ──
        const testimonialsStage = document.querySelector('.story-stage-testimonials');
        if (testimonialsStage) {
          const testBadge = testimonialsStage.querySelector('.story-badge');
          const testHeading = testimonialsStage.querySelector('.story-heading');
          const testMarquee = testimonialsStage.querySelector('.testimonials-marquee-container');

          [testBadge, testHeading, testMarquee].filter(Boolean).forEach((el, i) => {
            gsap.fromTo(el,
              { autoAlpha: 0, y: 50 },
              {
                autoAlpha: 1, y: 0,
                duration: 1,
                delay: i * 0.15,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: testimonialsStage,
                  start: 'top 80%',
                  toggleActions: 'play none none reverse'
                }
              }
            );
          });
        }

        // ── FAQ section ──
        const faqHeader = document.querySelector('.sec8-faq-header');
        if (faqHeader) {
          gsap.fromTo(faqHeader,
            { autoAlpha: 0, y: 50 },
            {
              autoAlpha: 1, y: 0,
              duration: 1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: faqHeader,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
              }
            }
          );
        }

        gsap.utils.toArray('.sec8-faq-item').forEach((item, i) => {
          gsap.fromTo(item,
            { autoAlpha: 0, y: 30 },
            {
              autoAlpha: 1, y: 0,
              duration: 0.8,
              delay: i * 0.08,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: item,
                start: 'top 92%',
                toggleActions: 'play none none reverse'
              }
            }
          );
        });

        // ── Footer ──
        const footerGrid = document.querySelector('.sec8-footer-grid');
        if (footerGrid) {
          gsap.utils.toArray(footerGrid.querySelectorAll('.sec8-col')).forEach((col, i) => {
            gsap.fromTo(col,
              { autoAlpha: 0, y: 40 },
              {
                autoAlpha: 1, y: 0,
                duration: 0.9,
                delay: i * 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: footerGrid,
                  start: 'top 85%',
                  toggleActions: 'play none none reverse'
                }
              }
            );
          });
        }

        // Helper: only animate elements NOT inside horizontal scroll sections
        const outsideHorizontal = (selector) =>
          gsap.utils.toArray(selector).filter(el => !el.closest('.horizontal-scroll-outer'));

        // ── Story badges, capsules, and black strips (non-horizontal sections only) ──
        outsideHorizontal('.story-badge').forEach((badge) => {
          gsap.fromTo(badge,
            { autoAlpha: 0, scale: 0.9, y: 20 },
            {
              autoAlpha: 1, scale: 1, y: 0,
              duration: 0.7,
              ease: 'back.out(1.7)',
              scrollTrigger: {
                trigger: badge,
                start: 'top 90%',
                toggleActions: 'play none none reverse'
              }
            }
          );
        });

        outsideHorizontal('.story-slant-capsule').forEach((capsule) => {
          gsap.fromTo(capsule,
            { autoAlpha: 0, x: -40, rotate: -6 },
            {
              autoAlpha: 1, x: 0, rotate: -2,
              duration: 0.9,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: capsule,
                start: 'top 88%',
                toggleActions: 'play none none reverse'
              }
            }
          );
        });

        outsideHorizontal('.story-black-strip').forEach((strip) => {
          gsap.fromTo(strip,
            { autoAlpha: 0, x: -30 },
            {
              autoAlpha: 1, x: 0,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: strip,
                start: 'top 88%',
                toggleActions: 'play none none reverse'
              }
            }
          );
        });

        // ── Story chip rows (non-horizontal sections only) ──
        outsideHorizontal('.story-chip').forEach((chip, i) => {
          gsap.fromTo(chip,
            { autoAlpha: 0, y: 15, scale: 0.95 },
            {
              autoAlpha: 1, y: 0, scale: 1,
              duration: 0.5,
              delay: (i % 5) * 0.06,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: chip,
                start: 'top 92%',
                toggleActions: 'play none none reverse'
              }
            }
          );
        });

        // ── Pricing list items (non-horizontal sections only) ──
        outsideHorizontal('.pricing-list li').forEach((li, i) => {
          gsap.fromTo(li,
            { autoAlpha: 0, x: -20 },
            {
              autoAlpha: 1, x: 0,
              duration: 0.6,
              delay: i * 0.08,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: li,
                start: 'top 92%',
                toggleActions: 'play none none reverse'
              }
            }
          );
        });
      });

      // ── MOBILE ANIMATIONS (max-width: 768px) ──
      mm.add("(max-width: 768px)", () => {
        // One-time only reveal transitions on scroll (Lazy Loading)
        const revealOnMobile = (elements, yOffset = 30, xOffset = 0, scaleStart = 1, delayTime = 0) => {
          gsap.utils.toArray(elements).forEach((el) => {
            gsap.fromTo(
              el,
              { autoAlpha: 0, y: yOffset, x: xOffset, scale: scaleStart },
              {
                autoAlpha: 1,
                y: 0,
                x: 0,
                scale: 1,
                duration: 0.8,
                delay: delayTime,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: el,
                  start: 'top 92%',
                  once: true // Runs ONLY ONCE when scroll from top to bottom
                }
              }
            );
          });
        };

        // Reveal entire stages, cards, and text layout components
        revealOnMobile('.story-stage', 45);
        revealOnMobile('.sticker-card, .manifesto-card, .module-card, .difference-note, .pricing-poster, .testimonial-card, .sec8-faq-item, .instructor-content', 25);
        revealOnMobile('.story-heading', 20);
        revealOnMobile('.story-badge', 15);
        revealOnMobile('.story-slant-capsule', 15);
        revealOnMobile('.story-black-strip', 15);
        revealOnMobile('.story-chip', 10);
        revealOnMobile('.pricing-list li', 8);
      });

      // ── GLOBAL FLOATING ANIMATIONS (Both Desktop & Mobile) ──
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
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="iisc-bg-overlay" />
          <div className="iim-bg-overlay" />
          <div className="mckinsey-bg-overlay" />

          <Hero setShowPaymentModal={setShowPaymentModal} />

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
                          {card.eyebrow === '01' && <img src="/graduation.png" className="card-cutout mobile-only-cutout" alt="" />}
                          {card.eyebrow === '02' && <img src="/job.png" className="card-cutout mobile-only-cutout" alt="" />}
                          {card.eyebrow === '03' && <img src="/credit.png" className="card-cutout mobile-only-cutout" alt="" />}
                        </article>
                      ))}
                    </div>
                  </div>
                  <div className="mobile-only-collage">
                    <img src="/book.png" className="collage-hand hand-book" alt="" />
                    <img src="/trophy.png" className="collage-hand hand-trophy" alt="" />
                    <img src="/graduation.png" className="collage-hand hand-graduation" alt="" />
                    <img src="/job.png" className="collage-hand hand-job" alt="" />
                    <img src="/credit.png" className="collage-hand hand-credit" alt="" />
                    <img src="/laptop.png" className="collage-hand hand-laptop" alt="" />
                  </div>
                </div>
              </section>

              <section className="placeholder-section section-2">
                <div className="story-stage story-stage-why story-panel">
                  <img src="/bill.png" alt="" aria-hidden="true" className="floating-cutout cutout-bill" />
                  <div className="story-topbar">
                    <span className="story-badge">02 / WHY WE EXIST</span>
                    <p className="story-top-copy">Turning ambitious learners into confident builders.</p>
                  </div>
                  <div className="manifesto-header">
                    <h2 className="story-heading">
                      <span className="story-highlight story-highlight-lavender">
                        Why Dhandha School <br className="manifesto-mobile-br" />needs to exist.
                      </span>
                    </h2>
                    <p className="story-body">
                      Business education in India is broken in two directions: <br className="manifesto-mobile-br" />
                      an expensive gate on one side, <br className="manifesto-mobile-br" />
                      chaos on the other.
                    </p>
                  </div>
                  <div className="manifesto-grid">
                    {whyCards.map((item, index) => (
                      <article key={item.title} className={`manifesto-card manifesto-card-${index + 1} story-panel`}>
                        <span className="manifesto-index">{item.index}</span>
                        <h3 className="manifesto-title">
                          {item.title}
                          {item.title === 'AI will take your job' && (
                            <img src="/toon_exclamation.png" alt="!!" className="toon-exclamation" />
                          )}
                        </h3>
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
              <section className="placeholder-section section-3" id="curriculum">
                <div className="story-stage story-stage-curriculum story-panel">
                  <div className="story-topbar">
                    <span className="story-badge">03 / MASTERCLASS </span>
                    <div className="story-marquee-inline">
                      <div className="story-marquee-track">
                        {(isMobile
                          ? sectionAnnouncements.filter(item => item !== 'Lifetime recordings')
                          : sectionAnnouncements.concat(sectionAnnouncements)
                        ).map((item, index) => (
                          <span key={`${item}-${index}`} className="story-chip">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="curriculum-header-outer">
                    <div className="curriculum-header-row">
                      <div className="curriculum-header">
                        <h2 className="story-heading">
                          <span className="story-highlight story-highlight-cyan">Finance,</span>
                          <span className="story-heading-line">for the ones actually building.</span>
                        </h2>
                      </div>
                      <img src="/laptop.png" alt="" aria-hidden="true" className="cutout-laptop-inline" />
                    </div>
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
                            <h3 className="module-title">
                              {module.title}
                              <span className="mobile-chevron mobile-only-inline">&gt;</span>
                            </h3>
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

              <section className="placeholder-section section-4" id="second-cohort">
                <div className="story-stage story-stage-pricing story-panel">
                  <div className="story-topbar">
                    <span className="story-badge">04 / SECOND COHORT</span>
                    <div className="story-chip-row">
                      <span className="story-chip">
                        <svg className="chip-icon mobile-only-inline" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '13px', height: '13px', marginRight: '6px', display: 'none', verticalAlign: 'middle' }}>
                          <path d="M23 7l-7 5 7 5V7z"></path>
                          <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                        </svg>
                        Online session
                      </span>
                      <span className="story-chip">
                        <svg className="chip-icon mobile-only-inline" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '13px', height: '13px', marginRight: '6px', display: 'none', verticalAlign: 'middle' }}>
                          <circle cx="12" cy="12" r="10"></circle>
                          <polygon points="10 8 16 12 10 16 10 8"></polygon>
                        </svg>
                        Lifetime recording access
                      </span>
                      <span className="story-chip">
                        <svg className="chip-icon mobile-only-inline" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '13px', height: '13px', marginRight: '6px', display: 'none', verticalAlign: 'middle' }}>
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                          <line x1="16" y1="2" x2="16" y2="6"></line>
                          <line x1="8" y1="2" x2="8" y2="6"></line>
                          <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                        Weekend
                      </span>
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
                      <div className="pricing-btn-wrapper">
                        <svg className="pricing-arrow pricing-arrow-left" viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M2 38C12 28 28 8 58 4" stroke="#000" strokeWidth="2.5" strokeLinecap="round" />
                          <path d="M48 2L58 4L52 12" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <svg className="pricing-arrow pricing-arrow-right" viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M58 38C48 28 32 8 2 4" stroke="#000" strokeWidth="2.5" strokeLinecap="round" />
                          <path d="M12 2L2 4L8 12" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <svg className="pricing-sparkle pricing-sparkle-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 2L14 10L22 12L14 14L12 22L10 14L2 12L10 10L12 2Z" fill="#f59e0b" />
                        </svg>
                        <svg className="pricing-sparkle pricing-sparkle-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 2L14 10L22 12L14 14L12 22L10 14L2 12L10 10L12 2Z" fill="#f59e0b" />
                        </svg>
                        <svg className="pricing-sparkle pricing-sparkle-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 2L14 10L22 12L14 14L12 22L10 14L2 12L10 10L12 2Z" fill="#f59e0b" />
                        </svg>
                        <button className="primer-btn get-started-btn pricing-primary-btn" onClick={() => setShowPaymentModal(true)}>Join &nbsp; ➔</button>
                      </div>
                    </div>
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
                  <button className="primer-btn get-started-btn" onClick={() => setShowPaymentModal(true)}>Join the masterclass</button>
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
                      <div className="testimonial-footer">
                        <span className="testimonial-name">— {testimonial.name}</span>
                        <img src={testimonial.profilePhoto} alt={testimonial.name} className="testimonial-profile-photo" />
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="section-8-container" id="pricing">


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
                      <a href="#curriculum" onClick={(e) => {
                        e.preventDefault();
                        if (window.__smoother) {
                          window.__smoother.scrollTo('#curriculum', { duration: 1.5, ease: 'power3.out' });
                        } else {
                          document.querySelector('#curriculum')?.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}>Curriculum</a>
                    </li>
                    <li>
                      <a href="#pricing" onClick={(e) => {
                        e.preventDefault();
                        if (window.__smoother) {
                          window.__smoother.scrollTo('#pricing', { duration: 1.5, ease: 'power3.out' });
                        } else {
                          document.querySelector('#pricing')?.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}>Pricing</a>
                    </li>
                    <li>
                      <a href="#faq" onClick={(e) => {
                        e.preventDefault();
                        if (window.__smoother) {
                          window.__smoother.scrollTo('#faq', { duration: 1.5, ease: 'power3.out' });
                        } else {
                          document.querySelector('#faq')?.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}>FAQ</a>
                    </li>
                  </ul>
                </div>

                <div className="sec8-col">
                  <h4 className="sec8-col-title">ABOUT</h4>
                  <ul className="sec8-col-links">
                    <li>
                      <a href="#instructor" onClick={(e) => {
                        e.preventDefault();
                        if (window.__smoother) {
                          window.__smoother.scrollTo('#instructor', { duration: 1.5, ease: 'power3.out' });
                        } else {
                          document.querySelector('#instructor')?.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}>Instructor</a>
                    </li>
                    <li>
                      <a href="#why" onClick={(e) => {
                        e.preventDefault();
                        if (window.__smoother) {
                          window.__smoother.scrollTo('#why', { duration: 1.5, ease: 'power3.out' });
                        } else {
                          document.querySelector('#why')?.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}>Why we exist</a>
                    </li>
                    <li>
                      <a href="#masterclass" onClick={(e) => {
                        e.preventDefault();
                        if (window.__smoother) {
                          window.__smoother.scrollTo('#masterclass', { duration: 1.5, ease: 'power3.out' });
                        } else {
                          document.querySelector('#masterclass')?.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}>Masterclass</a>
                    </li>
                  </ul>
                </div>

                <div className="sec8-col">
                  <h4 className="sec8-col-title">FOLLOW</h4>
                  <ul className="sec8-col-links">
                    <li>
                      <a href="https://www.instagram.com/whybhanshu?igsh=NDBqajI0ZTFpOGxz" target="_blank" rel="noopener noreferrer">Instagram</a>
                    </li>
                    <li>
                      <a href="https://youtube.com/@whybhanshu?si=Pe16UZHShdl5GCx-" target="_blank" rel="noopener noreferrer">YouTube</a>
                    </li>
                    <li>
                      <a href="https://www.linkedin.com/in/vibhanshu-golia-298a3019a" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                    </li>
                    <li>
                      <a href="https://discord.com/invite/FxDpfHG3Cc" target="_blank" rel="noopener noreferrer">Discord</a>
                    </li>
                  </ul>
                </div>

                <div className="sec8-col sec8-col-backtop">
                  <button
                    className="scroll-to-top-btn"
                    onClick={() => {
                      if (window.__smoother) {
                        window.__smoother.scrollTo(0, {
                          duration: 3.8,
                          ease: "power3.out"
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
                <a href="https://www.upforgeconsulting.com" target="_blank" rel="noopener noreferrer" className="footer-upforge-link">Made by UpForge</a>
                <span>Cohort 02 · 2026</span>
              </div>
            </footer>
          </section>
        </div>
      </div>

      {loading && <Loader onComplete={() => setLoading(false)} />}

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="payment-modal-overlay" onClick={() => setShowPaymentModal(false)}>
          <div className="payment-modal" onClick={(e) => e.stopPropagation()}>
            <button className="payment-modal-close" onClick={() => setShowPaymentModal(false)}>
              ×
            </button>
            <div className="payment-modal-header">
              <h2 className="payment-modal-title">Join the Masterclass</h2>
              <p className="payment-modal-subtitle">Fill in your details to proceed with payment</p>
            </div>
            <div className="payment-form">
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Your name"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  className="form-input"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  placeholder="your@email.com"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <input
                  type="tel"
                  className="form-input"
                  value={userPhone}
                  onChange={(e) => setUserPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                />
              </div>
              <div className="payment-modal-footer">
                <div className="payment-price">₹999</div>
                <button
                  className="primer-btn"
                  onClick={handleProceedToPayment}
                  disabled={paymentLoading}
                  style={paymentLoading ? { opacity: 0.7, cursor: 'not-allowed' } : {}}
                >
                  {paymentLoading ? (
                    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                      <span className="payment-btn-spinner" />
                      Opening Checkout…
                    </span>
                  ) : (
                    'Proceed to Payment'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Payment Success Screen */}
      {paymentSuccess && (
        <div className="payment-success-overlay" onClick={() => setPaymentSuccess(false)}>
          <div className="payment-success-modal" onClick={(e) => e.stopPropagation()}>
            <div className="payment-success-icon-wrap">
              <span className="payment-success-checkmark">✓</span>
              <div className="payment-success-ripple" />
              <div className="payment-success-ripple payment-success-ripple--2" />
            </div>
            <h2 className="payment-success-title">You&rsquo;re in!</h2>
            <p className="payment-success-msg">
              Welcome to <strong>Dhandha School</strong>. Your seat for <em>Finance for Builders — Cohort 02</em> is confirmed.
            </p>
            <p className="payment-success-sub">
              Check your email inbox for confirmation &amp; next steps. See you in the live session! 🚀
            </p>
            <a
              href="https://chat.whatsapp.com/HFcD0IULO1XGgtDGGf46C0"
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-join-btn"
            >
              <svg className="whatsapp-icon" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              Join our WhatsApp Community
            </a>
            <button
              className="primer-btn payment-success-close-btn"
              onClick={() => setPaymentSuccess(false)}
            >
              Back to Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
