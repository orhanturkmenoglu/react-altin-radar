import React from "react";
import "../css/Contact.css"; // CSS dosyanı burada kullanabilirsin

function Contact() {
  return (
    <div className="contact-container">
      <h1 className="contact-title">İletişim</h1>

      <div className="contact-info">
        <p><strong>Adres:</strong> Kuyumcukent, Yenibosna Merkez, İstanbul, Türkiye</p>
        <p><strong>Telefon:</strong> +90 (212) 123 45 67</p>
        <p><strong>E-posta:</strong> info@haremaltn.com</p>
        <p><strong>Çalışma Saatleri:</strong> Pazartesi - Cuma: 09:00 - 18:00</p>
      </div>

      <div className="contact-form">
        <h2>Bize Ulaşın</h2>
        <form>
          <input type="text" placeholder="Adınız Soyadınız" required />
          <input type="email" placeholder="E-posta Adresiniz" required />
          <textarea placeholder="Mesajınız" rows="5" required></textarea>
          <button type="submit">Gönder</button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
