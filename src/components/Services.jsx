import { CheckCircle, Building2, BookOpen, BarChart3, Users, Monitor } from 'lucide-react';

export default function Services() {
  const services = [
    { icon: CheckCircle, title: "Suivi & Évaluation de projets", desc: "Conception et mise en œuvre de dispositifs de suivi-évaluation performants pour vos projets et programmes.", tag: "→ ONG · Bailleurs · Projets de développement" },
    { icon: Building2, title: "Conseil aux organisations", desc: "Accompagnement des entreprises et administrations dans la structuration de leurs systèmes de pilotage.", tag: "→ Structures publiques & privées" },
    { icon: BookOpen, title: "Formation professionnelle", desc: "Formations qualifiantes et certifiantes sur les méthodes de recherche, le S&E, la GAR, les outils digitaux.", tag: "→ Particuliers · Équipes · Diplômés" },
    { icon: BarChart3, title: "Études & Recherches", desc: "Réalisation d'études diagnostiques, d'évaluation d'impact et de capitalisation d'expériences.", tag: "→ Tous secteurs" },
    { icon: Users, title: "Renforcement de capacités", desc: "Accompagnement pour renforcer les compétences internes de vos équipes en matière de gestion des données.", tag: "→ ONG · Administrations · Équipes IT" },
    { icon: Monitor, title: "Infrastructure & Outils digitaux", desc: "Déploiement de solutions technologiques cloud pour la collecte, le stockage et la visualisation des données.", tag: "→ Data-driven organizations" }
  ];

  return (
    <section id="services">
      <div className="container">
        <div className="section-label">Ce que nous proposons</div>
        <h2 className="section-title">Nos services</h2>
        <div className="divider"></div>
        <p className="section-sub">Des prestations sur mesure en formation, consulting, étude et suivi-évaluation pour tous types d'organisations.</p>
        <div className="services-grid">
          {services.map((s, i) => (
            <div className="service-card" key={i}>
              <div className="service-icon">
                <s.icon size={24} />
              </div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <span className="service-tag">{s.tag}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
