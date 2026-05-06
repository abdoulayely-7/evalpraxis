import React from 'react';

export default function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-logo">
          <img src="/assets/logo.png" alt="EvalPrx Logo" />
        </div>
        <div className="footer-info">
          <p>© 2025 <span>EvalPrx</span> — Cabinet d'Étude, de Conseils et de Formation en Suivi-Évaluation</p>
          <p style={{marginTop: '4px'}}>Dakar, Sénégal &nbsp;·&nbsp; contact@EvalPrx.org &nbsp;·&nbsp; +221 77 643 45 35</p>
          <p style={{marginTop: '8px', fontSize: '12px', color: 'rgba(255,255,255,0.2)'}}>Développé par LyDevTech — lydevtech@gmail.com  —  +221 77 379 53 83</p>
        </div>
      </div>
    </footer>
  );
}