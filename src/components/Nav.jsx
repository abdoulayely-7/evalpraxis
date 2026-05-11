import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from '../assets/logo.png';

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav>
      <div className="nav-inner">
        <img src={Logo} alt="EvalPraxis" className="logo-img" />
        <div className="nav-links">
          <a href="#about">À propos</a>
          <a href="#services">Services</a>
          <a href="#expertises">Expertises</a>
          <a href="#valeurs">Valeurs</a>
          <a href="#equipe">Équipe</a>
          <a href="#blog">Blog</a>
          <a href="#contact" className="nav-cta">Contact</a>
        </div>
        <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </div>
      </div>
      <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
        <a href="#about" onClick={() => setIsOpen(false)}>À propos</a>
        <a href="#services" onClick={() => setIsOpen(false)}>Services</a>
        <a href="#expertises" onClick={() => setIsOpen(false)}>Expertises</a>
        <a href="#valeurs" onClick={() => setIsOpen(false)}>Valeurs</a>
        <a href="#equipe" onClick={() => setIsOpen(false)}>Équipe</a>
        <a href="#blog" onClick={() => setIsOpen(false)}>Blog</a>
        <a href="#contact" onClick={() => setIsOpen(false)}>Contact</a>
      </div>
    </nav>
  );
}
