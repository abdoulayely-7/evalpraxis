import { useState } from 'react';
import { MapPin, Mail, Phone, Clock } from 'lucide-react';

const initialForm = {
  fullName: '',
  organization: '',
  email: '',
  phone: '',
  service: [],
  message: '',
};

const serviceGroups = [
  {
    label: 'Pour les Ministères et Agences publiques',
    options: [
      'Élaboration ou révision de cadres logiques et théories du changement',
      'Mise en place de systèmes de suivi-évaluation institutionnels',
      'Définition de cadres de performance (KPIs, indicateurs sectoriels)',
      'Évaluations : étude de base, mi-parcours, finale, impact',
      'Conception de plans de suivi-évaluation et manuels de procédures',
      'Collecte de données à grande échelle (enquêtes, audits de données)',
      'Développement de tableaux de bord (Power BI, Excel, Kobo/ODK)',
      'Renforcement de capacités (formations ciblées pour agents de suivi-évaluation)',
    ],
  },
  {
    label: 'Pour les Collectivités locales/Communes/Conseils départementaux et régionaux',
    options: [
      'Mise en place de dispositifs de suivi simples (fiches de suivi, registres, canevas)',
      'Diagnostic territorial / diagnostic participatif',
      'Formation des agents communaux et élus sur le suivi-évaluation et la redevabilité',
      'Conception de bases de données locales (projets, infrastructures, bénéficiaires)',
      'Évaluations participatives (bénéficiaires, focus groups, scorecards)',
      'Analyse et visualisation des données',
    ],
  },
  {
    label: 'Pour les ONGs',
    options: [
      'Évaluations externes : base, mi-parcours, finale, capitalisation',
      'Élaboration de plans suivi-évaluation et outils de collecte des données',
      'Digitalisation de la collecte de données (KoboToolbox, ODK, SurveyCTO)',
      'Développement de tableaux de bord et reporting automatisé',
      'Appui à la gestion axée sur les résultats (GAR/RBM)',
      'Études qualitatives (KII, FGD, études de cas)',
      'Analyse et visualisation des données',
      'Capitalisation et documentation de bonnes pratiques',
      'Coaching du responsable du suivi-évaluation et renforcement de l’équipe terrain',
    ],
  },
  {
    label: 'Pour les Associations de développement communautaire / Organisations locales',
    options: [
      'Conception d’un dispositif de suivi-évaluation simplifié (adapté au terrain)',
      'Élaboration d’indicateurs simples (réalisations, bénéficiaires, changements)',
      'Appui à la collecte de données communautaires',
      'Formation et coaching pratiques (comment suivre, comment remplir des fiches)',
      'Mise en place de fiches de suivi et registres bénéficiaires',
      'Analyse et visualisation des données',
      'Appui à la rédaction de rapports narratifs et financiers liés aux résultats',
      'Capitalisation des histoires de changement (« Most Significant Change »)',
    ],
  },
  {
    label: 'Pour Individus / Consultants / Professionnels (freelance, cadres projet, agents de suivi-évaluation)',
    options: [
      'Formations professionnelles (suivi-évaluation, GAR, indicateurs SMART)',
      'Coaching individuel',
      'Modèles prêts à l’emploi : cadre logique, plan de suivi-évaluation',
      'Formation et paramétrage KoboToolbox / ODK',
      'Création de dashboards et reporting automatisé',
      'Appui à la rédaction de TDR d’évaluation',
      'Mentorat sur la conduite d’évaluations (plan d’échantillonnage, analyse et visualisation des données)',
    ],
  },
];

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
  const service = values.service;
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

  if (service.length === 0) {
    errors.service = 'Veuillez sélectionner au moins un service.';
  } else if (service.length > 3) {
    errors.service = 'Vous pouvez sélectionner jusqu’à 3 services maximum.';
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

  const handleServiceToggle = (service) => {
    setForm((current) => {
      const isSelected = current.service.includes(service);
      const nextServices = isSelected
        ? current.service.filter((item) => item !== service)
        : [...current.service, service].slice(0, 3);

      setErrors((currentErrors) => ({
        ...currentErrors,
        service: nextServices.length === 0 ? currentErrors.service : undefined,
      }));

      return { ...current, service: nextServices };
    });
    setStatus((current) => current.type === 'error' ? { type: 'idle', message: '' } : current);
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
          service: form.service.join(', '),
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
  const selectedServicesCount = form.service.length;
  const hasReachedServiceLimit = selectedServicesCount >= 3;
  const remainingServicesCount = 3 - selectedServicesCount;
  const serviceHelpText = hasReachedServiceLimit
    ? '3 services sélectionnés. Décochez un service pour en choisir un autre.'
    : `Choisissez jusqu’à 3 services. ${remainingServicesCount} choix restant${remainingServicesCount > 1 ? 's' : ''}.`;

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
                <div className="service-field-header">
                  <label id="service-label">Types de services souhaités</label>
                  <span className="service-counter">{selectedServicesCount}/3</span>
                </div>
                <p className="service-help" id="service-help" aria-live="polite">{serviceHelpText}</p>
                <div
                  className="service-options"
                  role="group"
                  aria-labelledby="service-label"
                  aria-describedby={errors.service ? 'service-help service-error' : 'service-help'}
                  aria-invalid={Boolean(errors.service)}
                >
                  {serviceGroups.map((group) => (
                    <fieldset className="service-option-group" key={group.label}>
                      <legend>{group.label}</legend>
                      <div className="service-option-list">
                        {group.options.map((service) => {
                          const isSelected = form.service.includes(service);
                          const isDisabled = !isSelected && hasReachedServiceLimit;

                          return (
                            <label
                              className={`service-option${isSelected ? ' service-option-selected' : ''}${isDisabled ? ' service-option-disabled' : ''}`}
                              key={service}
                            >
                              <input
                                type="checkbox"
                                name="service"
                                value={service}
                                checked={isSelected}
                                disabled={isDisabled}
                                onChange={() => handleServiceToggle(service)}
                              />
                              <span>{service}</span>
                            </label>
                          );
                        })}
                      </div>
                    </fieldset>
                  ))}
                </div>
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
