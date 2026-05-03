import React from 'react';
import heroBg from '../assets/hero-bg.jpg';

export default function Hero() {
  return (
    <section className="hero" style={{backgroundImage: `url(${heroBg})`}}>
      <div className="hero-inner">
        <div className="hero-badge">Cabinet d'Étude · Conseil · Formation en Suivi-Évaluation</div>
        <h1>Expertise. Rigueur.<br /><span>Impact mesurable.</span></h1>
        <p className="hero-slogan">Votre partenaire en suivi-évaluation stratégique</p>
        <div className="hero-btns">
          <a href="#services" className="btn-primary">Découvrir nos services</a>
          <a href="#contact" className="btn-outline">Prendre contact</a>
        </div>
        <div className="hero-stats">
          <div className="stat-item">
            <div className="stat-num">S&E</div>
            <div className="stat-label">Expertise exclusive</div>
          </div>
          <div className="stat-item">
            <div className="stat-num">3</div>
            <div className="stat-label">Pôles d'excellence</div>
          </div>
          <div className="stat-item">
            <div className="stat-num">360°</div>
            <div className="stat-label">Accompagnement</div>
          </div>
          <div className="stat-item">
            <div className="stat-num">100%</div>
            <div className="stat-label">Engagement qualité</div>
          </div>
        </div>
      </div>
    </section>
  );
}