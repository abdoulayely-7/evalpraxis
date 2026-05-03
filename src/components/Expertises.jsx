import React from 'react';

export default function Expertises() {
  return (
    <section className="expertises" id="expertises">
      <div className="container">
        <div className="section-label">Nos domaines phares</div>
        <h2 className="section-title">Nos expertises</h2>
        <div className="divider"></div>
        <p className="section-sub">Deux pôles d'excellence pour répondre aux enjeux de performance organisationnelle et de développement professionnel.</p>
        <div className="exp-grid">
          <div className="exp-card">
            <h3>Expertise Entreprises & Structures publiques/privées</h3>
            <p style={{color: '#fff'}}>Nous accompagnons les organisations dans la mise en place d'un dispositif de suivi-évaluation robuste qui soutient efficacement la prise de décision.</p>
            <div className="exp-phase">
              <h4>Phase 1 — Feuille de Route & Plan de Mise en Œuvre</h4>
              <ul className="exp-list">
                <li>Évaluation des capacités en gestion de données et infrastructure technologique</li>
                <li>Élaboration d'une feuille de route détaillée et plan de mise en œuvre</li>
                <li>Déploiement d'une infrastructure technologique appropriée</li>
                <li>Développement de dashboards et supports visuels de pilotage</li>
              </ul>
            </div>
            <div className="exp-phase">
              <h4>Phase 2 — Mise en Œuvre</h4>
              <ul className="exp-list">
                <li>Executive Coaching et formation à la maîtrise des données</li>
                <li>Consultation et accompagnement à la transformation</li>
                <li>Recours à la technologie cloud pour l'analyse visuelle</li>
              </ul>
            </div>
            <div className="exp-targets">
              <span className="exp-tag">Entreprises privées</span>
              <span className="exp-tag">Administrations</span>
              <span className="exp-tag">ONG</span>
              <span className="exp-tag">Institutions</span>
            </div>
          </div>
          <div className="exp-card">
            <h3>Expertise Formation & Insertion professionnelle</h3>
            <p style={{color: '#fff'}}>EvalPraxis a mis en place un dispositif d'accompagnement pédagogique et d'évaluation qui aide les apprenants à définir leurs objectifs.</p>
            <div className="exp-phase">
              <h4>Programmes de formation proposés</h4>
              <ul className="exp-list">
                <li>Recherche et évaluation en sciences sociales</li>
                <li>Méthodes quantitatives et qualitatives de recherche</li>
                <li>Le suivi-évaluation de projet et méthodes d'évaluation</li>
                <li>Gestion Axée sur les Résultats (GAR)</li>
              </ul>
            </div>
            <div className="exp-targets">
              <span className="exp-tag">Jeunes diplômés</span>
              <span className="exp-tag">Professionnels</span>
              <span className="exp-tag">Intra / Inter / E-learning</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}