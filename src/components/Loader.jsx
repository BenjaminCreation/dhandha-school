import React, { useEffect, useState } from 'react';
import './Loader.css';

const Loader = ({ onComplete }) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    // Sequence of animations:
    // Phase 0: Initial (Gradient circle on white bg)
    // Phase 1: White circle grows
    const t1 = setTimeout(() => setPhase(1), 300); 
    // Phase 2: Split semicircles, show text & +
    const t2 = setTimeout(() => setPhase(2), 1200);
    // Phase 3: Gradient grows & elements shrink/fade
    const t3 = setTimeout(() => setPhase(3), 2500);
    // Phase 4: Fast fade out the whole loader overlay
    const t4 = setTimeout(() => setPhase(4), 3300);
    // Unmount
    const t5 = setTimeout(() => onComplete(), 3650);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [onComplete]);

  return (
    <div className={`new-loader phase-${phase}`}>
      <div className="gradient-circle">
        <div className="gradient-blobs-container">
          <div className="hero-circ_blue2"></div>
          <div className="hero-circ_pink2"></div>
          <div className="hero-circ_blue"></div>
          <div className="hero-circ_pink"></div>
        </div>
      </div>
      
      <div className="loader-center-content">
        <div className="center-symbol-wrapper">
          <div className="white-circle-container">
            <div className="semi-left">
              <svg className="curved-svg left-svg" viewBox="0 0 160 160">
                <path id="curve-left-path" d="M 85, 132 A 54,54 0 0,1 85, 28" fill="none" />
                <text className="curved-text text-dhandha">
                  <textPath href="#curve-left-path" startOffset="50%" textAnchor="middle">
                    Dhandha
                  </textPath>
                </text>
              </svg>
            </div>
            <div className="semi-right">
              <svg className="curved-svg right-svg" viewBox="0 0 160 160">
                <path id="curve-right-path" d="M 75, 28 A 54,54 0 0,1 75, 132" fill="none" />
                <text className="curved-text text-school">
                  <textPath href="#curve-right-path" startOffset="50%" textAnchor="middle">
                    School
                  </textPath>
                </text>
              </svg>
            </div>
          </div>
          <div className="plus-sign">+</div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
