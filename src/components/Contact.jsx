import React from 'react';
import { MapPin, Mail, Phone, Clock } from 'lucide-react';

export default function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="container">
        <div className="section-label">Travaillons ensemble</div>
        <h2 className="section-title">Contactez-nous</h2>
        <div className="divider"></div>
        <p className="section-sub">Vous avez un projet, une question ou souhaitez un devis ? Notre équipe vous répond dans les meilleurs délais.</p>
        <div className="contact-grid">
          <div className="contact-form">
            <div className="form-row">
              <div className="form-group">
                <label>Nom complet</label>
                <input type="text" placeholder="Votre nom et prénom" />
              </div>
              <div className="form-group">
                <label>Organisation</label>
                <input type="text" placeholder="Votre structure" />
              </div>
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="votre@email.com" />
            </div>
            <div className="form-group">
              <label>Téléphone</label>
              <input type="tel" placeholder="+221 XX XXX XX XX" />
            </div>
            <div className="form-group">
              <label>Type de service souhaité</label>
              <select>
                <option value="">— Sélectionner —</option>
                <option>Suivi & Évaluation de projets</option>
                <option>Conseil aux organisations</option>
                <option>Formation professionnelle</option>
                <option>Études & Recherches</option>
                <option>Renforcement de capacités</option>
                <option>Infrastructure & Outils digitaux</option>
                <option>Autre</option>
              </select>
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea placeholder="Décrivez votre besoin ou votre projet..."></textarea>
            </div>
            <button className="btn-primary" style={{alignSelf: 'flex-start', border: 'none', cursor: 'pointer', fontSize: '14px'}}>Envoyer le message →</button>
          </div>
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
                <p><a href="mailto:madycisse@evalpraxis.org">madycisse@evalpraxis.org</a></p>
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