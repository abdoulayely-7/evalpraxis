
export default function Blog() {
  const articles = [
    { num: "01", cat: "Méthodologie", title: "Comment concevoir un cadre logique efficace pour vos projets", excerpt: "Les erreurs fréquentes dans la conception des cadres logiques et comment les éviter pour améliorer le pilotage de vos projets." },
    { num: "02", cat: "Formation & Carrière", title: "Le S&E : un secteur porteur pour les jeunes diplômés africains", excerpt: "Pourquoi le suivi-évaluation représente une opportunité de carrière croissante et comment se préparer efficacement." },
    { num: "03", cat: "Bonnes pratiques", title: "Gestion Axée sur les Résultats : principes et mise en œuvre", excerpt: "Tour d'horizon des meilleures pratiques pour intégrer la GAR dans vos systèmes de pilotage organisationnel." }
  ];

  return (
    <section className="blog" id="blog">
      <div className="container">
        <div className="section-label">Ressources & réflexions</div>
        <h2 className="section-title">Blog & Publications</h2>
        <div className="divider"></div>
        <p className="section-sub">Nos experts partagent leurs réflexions sur les enjeux du suivi-évaluation et les bonnes pratiques du secteur.</p>
        <div className="blog-grid">
          {articles.map((a, i) => (
            <div className="blog-card" key={i}>
              <div className="blog-img"><span>{a.num}</span></div>
              <div className="blog-body">
                <div className="blog-cat">{a.cat}</div>
                <h4>{a.title}</h4>
                <p>{a.excerpt}</p>
                <a href="#" className="blog-link">Lire l'article</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
