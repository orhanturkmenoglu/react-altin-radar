import "../css/About.css";
import { Outlet } from "react-router-dom";
import ToggleButton from "./ToggleButton";
import { useDispatch, useSelector } from "react-redux";
import { toggleAbout, toggleVision, toggleMission } from "../redux/aboutSlice"


function About() {
/*   const [showMoreAbout, setShowMoreAbout] = useState(false);
  const [showMoreVision, setShowMoreVision] = useState(false);
  const [showMoreMission, setShowMoreMission] = useState(false);
 */

   const dispatch = useDispatch();
  const {showMoreAbout,showMoreVision,showMoreMission} = useSelector((store)=>store.about)

 

  return (
    <div className="about-container">
      <h1 className="about-title">HAKKIMIZDA</h1>

      <section className="about-section">
        <h2>Harem Altın</h2>
        <p>
          Harem Altın ve Kıymetli Madenler Ltd. Şti.’nin temelleri 1980’li
          yılların başında Kapalıçarşı’da atıldı. Sektörünün lideri olma
          vizyonuyla yola çıkan Harem Altın, ilk günden itibaren işinin
          merkezine kaliteli hizmet ve güveni koydu.
        </p>
        <p>
          2006 yılında Avrupa’nın modern kuyumculuk üretim ve ticaret merkezi
          olan Kuyumcukent'te şube açarak, sektördeki konumunu daha da
          pekiştirdi.
        </p>

        {showMoreAbout && (
          <div className="about-extra">
            <p>
              Teknolojik yatırımlar, müşteri memnuniyeti ve etik ticaret
              anlayışıyla altın, gümüş, platin ve paladyum gibi kıymetli
              metallerde lider konuma ulaştı.
            </p>
            <p>
              Müşterilerine değerli metallerin tedarikinden satışına,
              nakliyatından lojistiğine kadar geniş bir hizmet yelpazesi sunan
              Harem Altın, 40 yılı aşkın tecrübesiyle güvenilir bir iş
              ortağıdır.
            </p>
          </div>
        )}

         <ToggleButton
          isOpen={showMoreAbout}
          onSelect={()=>{
            dispatch(toggleAbout())
          }}
        />
      </section>

      <section className="about-section">
        <h2>Vizyonumuz</h2>
        <p>
          Kıymetli Madenler uzmanlığını; kurumsal kimliğine yaraşır şube ve
          bayileri, dijital teknolojiye dayalı yenilikçi uygulamaları ve büyüyen
          müşteri portföyüyle geliştirerek Türkiye’nin sektör liderlerinden biri
          olmak. Global pazarlarda güçlü bir varlık göstermek.
        </p>

        {showMoreVision && (
          <div className="about-extra">
            <p>
              Teknolojik yatırımlar, müşteri memnuniyeti ve etik ticaret
              anlayışıyla altın, gümüş, platin ve paladyum gibi kıymetli
              metallerde lider konuma ulaştı.
            </p>
            <p>
              Müşterilerine değerli metallerin tedarikinden satışına,
              nakliyatından lojistiğine kadar geniş bir hizmet yelpazesi sunan
              Harem Altın, 40 yılı aşkın tecrübesiyle güvenilir bir iş
              ortağıdır.
            </p>
          </div>
        )}

         <ToggleButton
          isOpen={showMoreVision}
          onSelect={()=>{
            dispatch(toggleVision())
          }}
        />
      </section>

      <section className="about-section">
        <h2>Misyonumuz</h2>
        <p>
          Sürekli iyileştirdiği ürün ve hizmet kalitesiyle müşterilerin mevcut
          ve gelecek beklentilerini en iyi şekilde karşılamak. Alanının en uzman
          ekipleriyle, sektörün en güvenilir ve yenilikçi şirketi olarak
          müşterilerin her zaman en yakınında yer almak.
        </p>

        {showMoreMission && (
          <div className="about-extra">
            <p>
              Teknolojik yatırımlar, müşteri memnuniyeti ve etik ticaret
              anlayışıyla altın, gümüş, platin ve paladyum gibi kıymetli
              metallerde lider konuma ulaştı.
            </p>
            <p>
              Müşterilerine değerli metallerin tedarikinden satışına,
              nakliyatından lojistiğine kadar geniş bir hizmet yelpazesi sunan
              Harem Altın, 40 yılı aşkın tecrübesiyle güvenilir bir iş
              ortağıdır.
            </p>
          </div>
        )}

        <ToggleButton
          isOpen={showMoreMission}
          onSelect={()=>{
            dispatch(toggleMission())
          }}
        />
      </section>

      <div className="about-gallery">
        <img
          src="https://www.haremaltin.com/images/u/2020-01-21/hakkimizda-3-152941.jpg"
          alt="Harem Altın Ürün 1"
        />
        <img
          src="https://www.haremaltin.com/images/u/2020-01-21/hakkimizda-4-153051.jpg"
          alt="Harem Altın Ürün 2"
        />
        <img
          src="https://www.haremaltin.com/images/u/2020-01-21/hakkimizda-5-153149.jpg"
          alt="Harem Altın Ürün 3"
        />
      </div>

      <Outlet />
    </div>
  );
}

export default About;
