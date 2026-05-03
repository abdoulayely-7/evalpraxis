import React from 'react';

export default function Valeurs() {
  const valeurs = [
    { title: "Intégrité", desc: "Honnêteté, sincérité et transparence envers nos clients, nos équipes et nos institutions partenaires." },
    { title: "Anticipation", desc: "Proactivité, ouverture et innovation dans nos interventions pour préparer nos clients aux mutations de leur environnement." },
    { title: "Engagement", desc: "Mobilisation totale de nos capacités intellectuelles pour cerner les exigences du client et garantir une vraie valeur ajoutée." },
    { title: "Concertation", desc: "Esprit d'équipe, partage et soutien mutuel entre consultants pour offrir la prestation la plus appropriée." }
  ];

  return (
    <section className="valeurs" id="valeurs">
      <div className="container">
        <div className="section-label">Ce qui nous guide</div>
        <h2 className="section-title">Nos valeurs & engagements</h2>
        <div className="divider"></div>
        <div className="valeurs-grid">
          {valeurs.map((v, i) => (
            <div className="valeur-card" key={i}>
              <div className="valeur-icon">★</div>
              <h3>{v.title}</h3>
              <p>{v.desc}</p>
            </div>
          ))}
        </div>
        <div className="engagements" style={{marginTop: '3rem', padding: '3rem 2rem', background: 'var(--navy)'}}>
          <div className="section-label" style={{color: 'var(--gold-light)'}}>Ce que vous pouvez attendre de nous</div>
          <h3 style={{fontFamily: "'Playfair Display',serif", fontSize: '28px', color: '#fff', marginBottom: '0.6rem'}}>Nos engagements qualité</h3>
          <div className="divider" style={{background: 'var(--gold)'}}></div>
          <div className="eng-grid">
            {['Relation contractuelle claire', 'Consultants qualifiés', 'Confidentialité & Professionnalisme', 'Suivi des prestations'].map((title, i) => (
              <div className="eng-item" key={i}>
                <div className="eng-num">{String(i + 1).padStart(2, '0')}</div>
                <h4>{title}</h4>
                <p>Description détaillée de cet engagement qualité.</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}