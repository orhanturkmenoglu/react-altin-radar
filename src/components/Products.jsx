import React from 'react';
import '../css/Products.css';

function Products() {
  return (
    <div className="products-container">
      <h1 className="products-title">YATIRIMLIK ÜRÜNLER</h1>

      <section className="products-section">
        <h2>Gramlık Külçe Altın</h2>
        <p>
          Gramlık külçe altın; standart ağırlık ve saflıktaki, garantili işlenmemiş altın külçeleridir. 1 gr, 5 gr, 
          10 gr, 20 gr, 50 gr ve 100 gr ağırlıklarında, 995 ya da 999.9 saflıkta üretilir.
        </p>
        <p>
          <strong>Gramlık Külçe Altın Sertifikası:</strong> Bu sertifika, gram altının ayar, gramaj ve dünya
          standartlarına uygunluğunu garanti eder. Sertifika, altının üretildiği rafineriyi de belgelemektedir.
        </p>
        <p>
          Gram altın paketlerinde ayrıca QR kod bulunur. Bu kodu okutarak altının anlık fiyat bilgisine
          ulaşabilirsiniz.
        </p>
        <div className="products-image">
          <img src="https://www.haremaltin.com/images/u/2020-01-09/Y%C3%9C3-023738.jpg" alt="Gramlık Külçe Altın" />
        </div>
      </section>

      <section className="products-section">
        <h2>Sarrafiye Altın</h2>
        <p>
          Türkiye Büyük Millet Meclisi kararıyla standartları belirlenmiş ve para yerine geçebilen, T.C. Darphane ve
          Damga Matbaası Genel Müdürlüğü tarafından üretilen altın çeşitleridir.
        </p>
        <p>
          Cumhuriyet altınları; sikke ve ziynet olmak üzere ikiye ayrılır. Çeyrek, yarım, tam, ikibuçuk ve beşli olmak
          üzere beş farklı çeşit ve 10 farklı çap/ağırlıkta üretilir. Tüm sarrafiye altınlar 22 ayar saflıktadır.
        </p>
        <div className="products-image">
          <img src="https://www.haremaltin.com/images/u/2020-01-09/Y%C3%9C2-023836.jpg" alt="Sarrafiye Altın" />
        </div>
      </section>
    </div>
  );
}

export default Products;
