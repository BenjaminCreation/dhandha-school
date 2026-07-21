import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './InstructorSection.css';

// Helpers for GSAP split text animation (Word-based Blur Reveal)
function splitTextWords(element) {
  if (!element) return [];
  if (element.dataset.split) return element.querySelectorAll('.word');
  const text = element.innerText;
  element.innerHTML = '';
  const words = text.split(' ');
  const wordElements = [];
  words.forEach((word, index) => {
    const span = document.createElement('span');
    span.innerText = word;
    span.className = 'word';
    span.style.display = 'inline-block';
    span.style.willChange = 'transform, filter, opacity';
    element.appendChild(span);
    wordElements.push(span);

    if (index < words.length - 1) {
      element.appendChild(document.createTextNode(' '));
    }
  });
  element.dataset.split = 'true';
  return wordElements;
}

function playAnim(el, color) {
  if (!el) return;
  const words = splitTextWords(el);
  if (!words.length) return;
  gsap.killTweensOf(words);
  el.style.color = color;
  el.style.opacity = 1;
  gsap.fromTo(words, 
    { opacity: 0, y: -50, filter: 'blur(10px)' }, 
    { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.15, stagger: 0.03, ease: 'power3.out' }
  );
}

function resetAnim(el) {
  if (!el) return;
  const words = splitTextWords(el);
  gsap.killTweensOf(words);
  el.style.opacity = 0; // Hide the container entirely
  gsap.set(words, { opacity: 0, y: -50, filter: 'blur(10px)' });
}

function setStatic(el, color) {
  if (!el) return;
  const words = splitTextWords(el);
  gsap.killTweensOf(words);
  el.style.color = color;
  el.style.opacity = 1;
  gsap.set(words, { opacity: 1, y: 0, filter: 'blur(0px)' });
}

const InstructorSection = () => {
  const iiscRef = useRef(null);
  const iimRef = useRef(null);
  const mckinseyRef = useRef(null);
  const logoIiscRef = useRef(null);
  const logoIimRef = useRef(null);
  const logoMckinseyRef = useRef(null);

  useEffect(() => {
    if (window.innerWidth <= 768) {
      setStatic(iiscRef.current, '#125c99');
      setStatic(iimRef.current, '#b52c31');
      setStatic(mckinseyRef.current, '#2c457d');
      const nameEl = document.getElementById('instructor-name');
      if (nameEl) nameEl.style.color = '#2c457d';
      logoIiscRef.current?.classList.add('active');
      logoIimRef.current?.classList.add('active');
      logoMckinseyRef.current?.classList.add('active');
      return;
    }

    let currentZone = -1;

    // Initialize/Reset
    resetAnim(iiscRef.current);
    resetAnim(iimRef.current);
    resetAnim(mckinseyRef.current);

    const handleScroll = (e) => {
      const { progress, isActive } = e.detail;

      if (!isActive) {
        // Clean up global body classes
        document.body.classList.remove('inverted-theme', 'show-iisc-bg', 'show-iim-bg', 'show-mckinsey-bg');
        
        const iiscEl = iiscRef.current;
        const iimEl = iimRef.current;
        const mckinseyEl = mckinseyRef.current;
        const nameEl = document.getElementById('instructor-name');

        if (progress <= 0) {
          // Reset to standard unhighlighted state when above the section
          resetAnim(iiscEl);
          resetAnim(iimEl);
          resetAnim(mckinseyEl);
          if (nameEl) nameEl.style.color = '';
          logoIiscRef.current?.classList.remove('active');
          logoIimRef.current?.classList.remove('active');
          logoMckinseyRef.current?.classList.remove('active');
          currentZone = -1;
        } else if (progress >= 1) {
          // Keep all highlighted and active when scrolled below the section
          setStatic(iiscEl, '#125c99');
          setStatic(iimEl, '#b52c31');
          setStatic(mckinseyEl, '#2c457d');
          if (nameEl) nameEl.style.color = '#2c457d';
          logoIiscRef.current?.classList.add('active');
          logoIimRef.current?.classList.add('active');
          logoMckinseyRef.current?.classList.add('active');
          currentZone = 3;
        }
        return;
      }

      // Calculate thresholds for horizontal movement cutoff vs locked animation phase
      const track = document.querySelector('.horizontal-scroll-track');
      if (!track) return;
      const scrollAmount = track.scrollWidth - window.innerWidth;
      const lockedAmount = window.innerHeight * 1.5;
      const totalAmount = scrollAmount + lockedAmount;
      const cutoff = scrollAmount / totalAmount;

      let newZone = 0;
      let isThemeInverted = false;

      if (progress <= cutoff) {
        // Horizontal sliding phase
        const horizontalProgress = cutoff > 0 ? progress / cutoff : 0;
        newZone = 0;
        isThemeInverted = horizontalProgress > 0.5;
      } else {
        // Locked animation phase
        isThemeInverted = true;
        const animProgress = (progress - cutoff) / (1 - cutoff);
        if (animProgress > 0.7) newZone = 3;
        else if (animProgress > 0.4) newZone = 2;
        else if (animProgress > 0.1) newZone = 1;
      }

      // Toggle inverted theme on body
      if (isThemeInverted) {
        document.body.classList.add('inverted-theme');
      } else {
        document.body.classList.remove('inverted-theme');
      }

      // Toggle body background image overlays
      if (newZone === 1) {
        document.body.classList.add('show-iisc-bg');
      } else {
        document.body.classList.remove('show-iisc-bg');
      }

      if (newZone === 2) {
        document.body.classList.add('show-iim-bg');
      } else {
        document.body.classList.remove('show-iim-bg');
      }

      if (newZone === 3) {
        document.body.classList.add('show-mckinsey-bg');
      } else {
        document.body.classList.remove('show-mckinsey-bg');
      }

      // Update zone animation and colors
      if (newZone !== currentZone) {
        const iiscEl = iiscRef.current;
        const iimEl = iimRef.current;
        const mckinseyEl = mckinseyRef.current;
        const nameEl = document.getElementById('instructor-name');

        resetAnim(iiscEl);
        resetAnim(iimEl);
        resetAnim(mckinseyEl);
        if (nameEl) nameEl.style.color = '';
        
        logoIiscRef.current?.classList.remove('active');
        logoIimRef.current?.classList.remove('active');
        logoMckinseyRef.current?.classList.remove('active');

        if (newZone >= 1) {
           if (newZone === 1 && currentZone < 1) playAnim(iiscEl, '#125c99');
           else setStatic(iiscEl, '#125c99');
           if (nameEl) nameEl.style.color = '#125c99';
           logoIiscRef.current?.classList.add('active');
        }
        if (newZone >= 2) {
           if (newZone === 2 && currentZone < 2) playAnim(iimEl, '#b52c31');
           else setStatic(iimEl, '#b52c31');
           if (nameEl) nameEl.style.color = '#b52c31';
           logoIimRef.current?.classList.add('active');
        }
        if (newZone >= 3) {
           if (newZone === 3 && currentZone < 3) playAnim(mckinseyEl, '#2c457d');
           else setStatic(mckinseyEl, '#2c457d');
           if (nameEl) nameEl.style.color = '#2c457d';
           logoMckinseyRef.current?.classList.add('active');
        }

        currentZone = newZone;
      }
    };

    window.addEventListener('instructor-scroll', handleScroll);
    return () => {
      window.removeEventListener('instructor-scroll', handleScroll);
      document.body.classList.remove('inverted-theme', 'show-iisc-bg', 'show-iim-bg', 'show-mckinsey-bg');
    };
  }, []);

  return (
    <section className="placeholder-section section-6" id="instructor">
      <div className="story-stage story-stage-instructor story-panel instructor-content" style={{ overflow: 'hidden' }}>
        <div className="iisc-bg-overlay" />
        <div className="iim-bg-overlay" />
        <div className="mckinsey-bg-overlay" />
        <h3 className="font-geist" id="instructor-name" style={{ position: 'relative', zIndex: 2 }}>Vibhanshu Golia (WhyBhanshu)</h3>
        <div className="instructor-split" style={{ position: 'relative', zIndex: 2 }}>
          <div className="instructor-image">
            <img src="/founder.jpeg" alt="Vibhanshu Golia" />
          </div>
          <div className="instructor-text">
            <p className="font-new-spirit">I've had an unusual route through Indian business education.</p>
            <p className="font-new-spirit">
              <span className="vcard-text" id="vcard-iisc" ref={iiscRef}>Gold medal at IISc Bangalore.</span>{' '}
              <span className="vcard-text" id="vcard-iim" ref={iimRef}>MBA from IIM Bangalore.</span> <br />
              <span className="vcard-text" id="vcard-mckinsey" ref={mckinseyRef}>Strategy consultant at McKinsey &amp; Company.</span>
            </p>
            <p className="font-new-spirit">Three of the most expensive, most exclusive rooms business education in India has to offer, and I've sat in all of them.</p>
            <p className="font-new-spirit">Dhandha School is my attempt to take what I learned in those rooms and put it within reach of every Indian who wants to build something.</p>
            
            <div className="inst-logos">
              <img src="/iisc.png" id="logo-iisc" className="inst-logo" alt="IISc Logo" ref={logoIiscRef} />
              <img src="/iimb.png" id="logo-iim" className="inst-logo" alt="IIM Bangalore Logo" ref={logoIimRef} />
              <img src="/mckinsey.png" id="logo-mckinsey" className="inst-logo" alt="McKinsey Logo" ref={logoMckinseyRef} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstructorSection;
