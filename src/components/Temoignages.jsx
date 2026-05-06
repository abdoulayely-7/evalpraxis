import React from 'react';

export default function Temoignages() {
  const temoignages = [
    { name: "Aminata M.", role: "Coordinatrice de programme, ONG nationale", initials: "AM", text: "EvalPrx a transformé notre approche du suivi de projet. Leur méthodologie rigoureuse et leur accompagnement terrain ont été décisifs." },
    { name: "Boubacar K.", role: "Responsable M&E, Administration publique", initials: "BK", text: "La formation suivie avec EvalPrx nous a permis de mieux structurer nos indicateurs et de produire des rapports qui répondent aux standards des bailleurs." },
    { name: "Fatou C.", role: "Directrice, Structure privée de développement", initials: "FC", text: "Un cabinet sérieux, disponible et à l'écoute. Leurs recommandations ont amélioré notre dispositif de pilotage." }
  ];

  return (
    <section id="temoignages">
      <div className="container">
        <div className="section-label">Ce qu'ils disent de nous</div>
        <h2 className="section-title">Témoignages</h2>
        <div className="divider"></div>
        <div className="temo-grid">
          {temoignages.map((t, i) => (
            <div className="temo-card" key={i}>
              <span className="temo-quote">"</span>
              <p>{t.text}</p>
              <div className="temo-author">
                <div className="temo-avatar">{t.initials}</div>
                <div>
                  <div className="temo-name">{t.name}</div>
                  <div className="temo-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}