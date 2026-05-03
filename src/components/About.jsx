import React from 'react';

export default function About() {
  return (
    <section className="about" id="about">
      <div className="container">
        <div className="section-label">Qui sommes-nous</div>
        <h2 className="section-title">À propos d'EvalPraxis</h2>
        <div className="divider"></div>
        <div className="about-grid">
          <div className="about-text">
            <p>EvalPraxis est un <strong>Cabinet d'Étude, de Conseils et de Formation</strong> qui travaille exclusivement dans le Suivi-Évaluation de projets/programmes et le renforcement de capacités dans le domaine.</p>
            <p>Notre mission principale est de collaborer avec les entreprises, les ONG, les structures ou administrations publiques ou privées dans le cadre de la mise en place d'un système fiable et efficace de suivi, supervision et évaluation des activités de leurs projets.</p>
            <p>Nous répondons également aux besoins en qualification des jeunes diplômés pour une meilleure insertion professionnelle dans le secteur.</p>
            <p>Notre équipe aux <strong>compétences pluridisciplinaires</strong> propose des services de formation, de consulting, d'étude, de suivi et évaluation de projets/programmes aux particuliers, structures et administrations publiques ou privées.</p>
            <a href="#contact" className="btn-primary" style={{marginTop: '1.2rem', display: 'inline-block'}}>Travailler avec nous</a>
          </div>
          <div className="about-visual">
            <div className="about-visual-inner">
              <div className="value-item">
                <h4>Intégrité</h4>
                <p>L'honnêteté, la sincérité et la transparence sont des qualités que nous entretenons au quotidien vis-à-vis du client et de nos institutions.</p>
              </div>
              <div className="value-item">
                <h4>Anticipation</h4>
                <p>Nous développons la proactivité, l'ouverture et l'innovation pour toujours être en harmonie avec les évolutions futures de notre environnement.</p>
              </div>
              <div className="value-item">
                <h4>Engagement</h4>
                <p>Nous utilisons tous nos moyens pour cerner les exigences du Client et garantir une véritable valeur ajoutée dans nos interventions.</p>
              </div>
              <div className="value-item">
                <h4>Concertation</h4>
                <p>L'esprit d'équipe, le partage et le soutien mutuel sont au cœur de notre culture pour offrir la prestation la plus appropriée.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}