import React from 'react';

export default function Equipe() {
  const members = [
    { name: "Mady CISSÉ", role: "Fondateur & Directeur Exécutif", initials: "MC", bio: "Expert en suivi-évaluation et renforcement de capacités organisationnelles." },
    { name: "Expert S&E", role: "Consultant Senior", initials: "SE", bio: "Cadre logique · Théorie du changement · Évaluation d'impact." },
    { name: "Analyste Données", role: "Spécialiste Data & Outils", initials: "FA", bio: "Collecte digitale · Dashboards · Analyse quantitative & qualitative." },
    { name: "Consultant Formation", role: "Ingénierie Pédagogique", initials: "CF", bio: "GAR · Recherche appliquée · Développement de curricula." }
  ];

  return (
    <section id="equipe" style={{background: 'var(--bg)'}}>
      <div className="container">
        <div className="section-label">Les personnes derrière EvalPraxis</div>
        <h2 className="section-title">Notre équipe</h2>
        <div className="divider"></div>
        <p className="section-sub">Une équipe pluridisciplinaire unie par la même passion : rendre le suivi-évaluation accessible, rigoureux et utile.</p>
        <div className="equipe-grid" style={{marginTop: '3rem'}}>
          {members.map((m, i) => (
            <div className="team-card" key={i}>
              <div className="team-avatar">{m.initials}</div>
              <h4>{m.name}</h4>
              <p className="team-role">{m.role}</p>
              <p>{m.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}