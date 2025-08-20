import React from 'react';
import '../css/Services.css';

function Services() {
  return (
    <div className="services-container">
      <h1 className="services-title">HİZMETLERİMİZ</h1>

      <section className="services-section">
        <h2>Kıymetli Madenler Ticareti</h2>
        <p>
          Harem Altın Kıymetli Madenler Ltd. Şti., kıymetli maden ticareti faaliyetlerinin tüm alanlarında uzmanlaşmış
          yenilikçi bir şirkettir. İstanbul’daki merkezi konumumuz, kıymetli madenler ticareti için tedarikçilere
          erişilebilir bir pazar sunar.
        </p>
        <p>
          Ticaretini yaptığımız değerli madenler; bankalar, kuyumcular, mücevher üreticileri ve yatırımcılar tarafından
          kullanılmak üzere yerel ve uluslararası pazarlarda satılmaktadır.
        </p>
        <div className="services-image">
          <img src="https://www.haremaltin.com/images/u/2020-01-09/Hizmetlerimiz1-024523.jpg" alt="Kıymetli Madenler Ticareti" />
        </div>
      </section>

      <section className="services-section">
        <h2>Uluslararası Lojistik Çözümleri</h2>
        <p>
          Kıymetli madenler tedarik zincirinin tamamında kapsamlı bir hizmet yelpazesi sunuyoruz. Bitmiş ürünün doğru
          pazarlarda satılması, bu değerli madenlerin etik tedarikçilerden sorumlu şekilde temin edilmesi ve
          menşei ülkesinden satış yerine güvenli nakliyesini içeren lojistik çözümleri sağlıyoruz.
        </p>
        <p>
          Kıymetli madenlerin transferi, lojistik sektörünün en güvenilir şirketleri aracılığıyla ve tam sigorta
          güvencesiyle gerçekleştirilmektedir.
        </p>
        <div className="services-image">
          <img src="https://www.haremaltin.com/images/u/2020-11-27/IMG_0120-134413.jpg" alt="Uluslararası Lojistik Çözümleri" />
        </div>
      </section>
    </div>
  );
}

export default Services;
