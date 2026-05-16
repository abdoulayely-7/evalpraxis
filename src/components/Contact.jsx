import { useState } from 'react';
import { MapPin, Mail, Phone, Clock } from 'lucide-react';

const initialForm = {
  fullName: '',
  organization: '',
  email: '',
  phone: '',
  service: '',
  message: '',
};

const mailApiUrl = import.meta.env.VITE_MAIL_API_URL?.replace(/\/$/, '');
const contactEndpoint = mailApiUrl ? `${mailApiUrl}/contact` : '/api/contact';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const phonePattern = /^\+?[0-9\s().-]{8,20}$/;

const validateContactForm = (values) => {
  const errors = {};
  const fullName = values.fullName.trim();
  const organization = values.organization.trim();
  const email = values.email.trim();
  const phone = values.phone.trim();
  const service = values.service.trim();
  const message = values.message.trim();

  if (!fullName) {
    errors.fullName = 'Le nom complet est obligatoire.';
  } else if (fullName.length < 2) {
    errors.fullName = 'Le nom doit contenir au moins 2 caractères.';
  }

  if (organization && organization.length < 2) {
    errors.organization = "L'organisation doit contenir au moins 2 caractères.";
  }

  if (!email) {
    errors.email = "L'adresse email est obligatoire.";
  } else if (!emailPattern.test(email)) {
    errors.email = 'Veuillez saisir une adresse email valide.';
  }

  if (!phone) {
    errors.phone = 'Le téléphone est obligatoire.';
  } else if (!phonePattern.test(phone)) {
    errors.phone = 'Veuillez saisir un numéro de téléphone valide.';
  }

  if (!service) {
    errors.service = 'Veuillez sélectionner un service.';
  }

  if (!message) {
    errors.message = 'Le message est obligatoire.';
  } else if (message.length < 10) {
    errors.message = 'Le message doit contenir au moins 10 caractères.';
  }

  return errors;
};

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: 'idle', message: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setStatus((current) => current.type === 'error' ? { type: 'idle', message: '' } : current);
    setErrors((current) => {
      if (!current[name]) {
        return current;
      }

      const nextErrors = validateContactForm({ ...form, [name]: value });
      return { ...current, [name]: nextErrors[name] };
    });
  };

  const handleBlur = (event) => {
    const { name } = event.target;
    const nextErrors = validateContactForm(form);
    setErrors((current) => ({ ...current, [name]: nextErrors[name] }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nextErrors = validateContactForm(form);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus({
        type: 'error',
        message: 'Veuillez corriger les champs signalés avant l’envoi.',
      });
      return;
    }

    setStatus({ type: 'loading', message: 'Envoi du message...' });

    try {
      const response = await fetch(contactEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...form,
          fullName: form.fullName.trim(),
          organization: form.organization.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          service: form.service.trim(),
          message: form.message.trim(),
        }),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.message || "Le message n'a pas pu être envoyé.");
      }

      setForm(initialForm);
      setErrors({});
      setStatus({
        type: 'success',
        message: result.message || 'Votre message a bien été envoyé.',
      });
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.message || "Une erreur est survenue pendant l'envoi.",
      });
    }
  };

  const isSubmitting = status.type === 'loading';

  return (
    <section className="contact" id="contact">
      <div className="container">
        <div className="section-label">Travaillons ensemble</div>
        <h2 className="section-title">Contactez-nous</h2>
        <div className="divider"></div>
        <p className="section-sub">Vous avez un projet, une question ou souhaitez un devis ? Notre équipe vous répond dans les meilleurs délais.</p>
        <div className="contact-grid">
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="fullName">Nom complet</label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="Votre nom et prénom"
                  value={form.fullName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={Boolean(errors.fullName)}
                  aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                />
                {errors.fullName && <span className="field-error" id="fullName-error">{errors.fullName}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="organization">Organisation</label>
                <input
                  id="organization"
                  name="organization"
                  type="text"
                  placeholder="Votre structure"
                  value={form.organization}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={Boolean(errors.organization)}
                  aria-describedby={errors.organization ? 'organization-error' : undefined}
                />
                {errors.organization && <span className="field-error" id="organization-error">{errors.organization}</span>}
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="votre@email.com"
                value={form.email}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email && <span className="field-error" id="email-error">{errors.email}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="phone">Téléphone</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+221 XX XXX XX XX"
                value={form.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? 'phone-error' : undefined}
              />
              {errors.phone && <span className="field-error" id="phone-error">{errors.phone}</span>}
            </div>
<div className="form-group">
                <label htmlFor="service">Type de service souhaité</label>
                <select
                  id="service"
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={Boolean(errors.service)}
                  aria-describedby={errors.service ? 'service-error' : undefined}
                >
                  <option value="">— Sélectionner —</option>
                  <optgroup label="Pour les Ministères et Agences publiques">
                    <option value="Élaboration ou révision de cadres logiques et théories du changement">Élaboration ou révision de cadres logiques et théories du changement</option>
                    <option value="Mise en place de systèmes de suivi-évaluation institutionnels">Mise en place de systèmes de suivi-évaluation institutionnels</option>
                    <option value="Définition de cadres de performance (KPIs, indicateurs sectoriels)">Définition de cadres de performance (KPIs, indicateurs sectoriels)</option>
                    <option value="Évaluations : étude de base, mi-parcours, finale, impact">Évaluations : étude de base, mi-parcours, finale, impact</option>
                    <option value="Conception de plans de suivi-évaluation et manuels de procédures">Conception de plans de suivi-évaluation et manuels de procédures</option>
                    <option value="Collecte de données à grande échelle (enquêtes, audits de données)">Collecte de données à grande échelle (enquêtes, audits de données)</option>
                    <option value="Développement de tableaux de bord (Power BI, Excel, Kobo/ODK)">Développement de tableaux de bord (Power BI, Excel, Kobo/ODK)</option>
                    <option value="Renforcement de capacités (formations ciblées pour agents de suivi-évaluation)">Renforcement de capacités (formations ciblées pour agents de suivi-évaluation)</option>
                  </optgroup>
                  <optgroup label="Pour les Collectivités locales/Communes/Conseils départementaux et régionaux">
                    <option value="Mise en place de dispositifs de suivi simples (fiches de suivi, registres, canevas)">Mise en place de dispositifs de suivi simples (fiches de suivi, registres, canevas)</option>
                    <option value="Diagnostic territorial / diagnostic participatif">Diagnostic territorial / diagnostic participatif</option>
                    <option value="Formation des agents communaux et élus sur le suivi-évaluation et la redevabilité">Formation des agents communaux et élus sur le suivi-évaluation et la redevabilité</option>
                    <option value="Conception de bases de données locales (projets, infrastructures, bénéficiaires)">Conception de bases de données locales (projets, infrastructures, bénéficiaires)</option>
                    <option value="Évaluations participatives (bénéficiaires, focus groups, scorecards)">Évaluations participatives (bénéficiaires, focus groups, scorecards)</option>
                    <option value="Analyse et visualisation des données">Analyse et visualisation des données</option>
                  </optgroup>
                  <optgroup label="Pour les ONGs">
                    <option value="Évaluations externes : base, mi-parcours, finale, capitalisation">Évaluations externes : base, mi-parcours, finale, capitalisation</option>
                    <option value="Élaboration de plans suivi-évaluation et outils de collecte des données">Élaboration de plans suivi-évaluation et outils de collecte des données</option>
                    <option value="Digitalisation de la collecte de données (KoboToolbox, ODK, SurveyCTO)">Digitalisation de la collecte de données (KoboToolbox, ODK, SurveyCTO)</option>
                    <option value="Développement de tableaux de bord et reporting automatisé">Développement de tableaux de bord et reporting automatisé</option>
                    <option value="Appui à la gestion axée sur les résultats (GAR/RBM)">Appui à la gestion axée sur les résultats (GAR/RBM)</option>
                    <option value="Études qualitatives (KII, FGD, études de cas)">Études qualitatives (KII, FGD, études de cas)</option>
                    <option value="Analyse et visualisation des données">Analyse et visualisation des données</option>
                    <option value="Capitalisation et documentation de bonnes pratiques">Capitalisation et documentation de bonnes pratiques</option>
                    <option value="Coaching du responsable du suivi-évaluation et renforcement de l’équipe terrain">Coaching du responsable du suivi-évaluation et renforcement de l’équipe terrain</option>
                  </optgroup>
                  <optgroup label="Pour les Associations de développement communautaire / Organisations locales">
                    <option value="Conception d’un dispositif de suivi-évaluation simplifié (adapté au terrain)">Conception d’un dispositif de suivi-évaluation simplifié (adapté au terrain)</option>
                    <option value="Élaboration d’indicateurs simples (réalisations, bénéficiaires, changements)">Élaboration d’indicateurs simples (réalisations, bénéficiaires, changements)</option>
                    <option value="Appui à la collecte de données communautaires">Appui à la collecte de données communautaires</option>
                    <option value="Formation et coaching pratiques (comment suivre, comment remplir des fiches)">Formation et coaching pratiques (comment suivre, comment remplir des fiches)</option>
                    <option value="Mise en place de fiches de suivi et registres bénéficiaires">Mise en place de fiches de suivi et registres bénéficiaires</option>
                    <option value="Analyse et visualisation des données">Analyse et visualisation des données</option>
                    <option value="Appui à la rédaction de rapports narratifs et financiers liés aux résultats">Appui à la rédaction de rapports narratifs et financiers liés aux résultats</option>
                    <option value="Capitalisation des histoires de changement (« Most Significant Change »)">Capitalisation des histoires de changement (« Most Significant Change »)</option>
                  </optgroup>
                  <optgroup label="Pour Individus / Consultants / Professionnels (freelance, cadres projet, agents de suivi-évaluation)">
                    <option value="Formations professionnelles (suivi-évaluation, GAR, indicateurs SMART)">Formations professionnelles (suivi-évaluation, GAR, indicateurs SMART)</option>
                    <option value="Coaching individuel">Coaching individuel</option>
                    <option value="Modèles prêts à l’emploi : cadre logique, plan de suivi-évaluation">Modèles prêts à l’emploi : cadre logique, plan de suivi-évaluation</option>
                    <option value="Formation et paramétrage KoboToolbox / ODK">Formation et paramétrage KoboToolbox / ODK</option>
                    <option value="Création de dashboards et reporting automatisé">Création de dashboards et reporting automatisé</option>
                    <option value="Appui à la rédaction de TDR d’évaluation">Appui à la rédaction de TDR d’évaluation</option>
                    <option value="Mentorat sur la conduite d’évaluations (plan d’échantillonnage, analyse et visualisation des données)">Mentorat sur la conduite d’évaluations (plan d’échantillonnage, analyse et visualisation des données)</option>
                  </optgroup>
                </select>
                {errors.service && <span className="field-error" id="service-error">{errors.service}</span>}
              </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                placeholder="Décrivez votre besoin ou votre projet..."
                value={form.message}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? 'message-error' : undefined}
              ></textarea>
              {errors.message && <span className="field-error" id="message-error">{errors.message}</span>}
            </div>
            {status.message && (
              <p className={`form-status form-status-${status.type}`} role="status">
                {status.message}
              </p>
            )}
            <button
              className="btn-primary"
              type="submit"
              disabled={isSubmitting}
              style={{alignSelf: 'flex-start', border: 'none', cursor: isSubmitting ? 'wait' : 'pointer', fontSize: '14px'}}
            >
              {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message →'}
            </button>
          </form>
          <div className="contact-info">
           
            <div className="contact-item">
              <div className="contact-item-icon">
                <MapPin size={20} />
              </div>
              <div>
                <h5>Adresse</h5>
                <p>964 Rue Y x Avenue Bourguiba<br />Dakar, Sénégal</p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-item-icon">
                <Mail size={20} />
              </div>
              <div>
                <h5>Email</h5>
                <p><a href="mailto:contact@evalprx.org">contact@evalprx.org</a></p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-item-icon">
                <Phone size={20} />
              </div>
              <div>
                <h5>Téléphone</h5>
                <p><a href="tel:+221776434535">+221 77 643 45 35</a></p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-item-icon">
                <Clock size={20} />
              </div>
              <div>
                <h5>Disponibilité</h5>
                <p>Lundi – Vendredi : 8h00 – 18h00</p>
              </div>
            </div>
            <a href="https://wa.me/221776434535?text=Bonjour%20EvalPraxis%2C%20je%20souhaite%20en%20savoir%20plus%20sur%20vos%20services." className="btn-primary" style={{marginTop: '1rem', display: 'inline-flex', alignItems: 'center', gap: '8px'}}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              Contactez-nous sur WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
