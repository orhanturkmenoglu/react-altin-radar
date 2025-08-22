import React, { useEffect, useState } from "react";

import "../css/GoldPrice.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchGoldPrices } from "../redux/goldPriceSlice";

function Price() {
  const dispatch = useDispatch();

  const { data, loading, lastUpdate, error } = useSelector(
    (store) => store.goldPrice
  );

  const [currentTime, setCurrentTime] = useState(new Date());

  // Component mount olunca ve belirli aralıklarla veri çek
  useEffect(() => {
    dispatch(fetchGoldPrices());

    const interval = setInterval(() => {
      dispatch(fetchGoldPrices());
    }, 900000); // 15 dk

    return () => clearInterval(interval);
  }, [dispatch]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval); // Component unmount olunca temizle
  }, []);

  if (loading) return <p>Veriler yükleniyor...</p>;
  if (error) return <p>Hata: {error}</p>;
  if (!data || !Array.isArray(data)) return <p>Veri bulunamadı.</p>;

  const formattedTime = lastUpdate
    ? new Date(lastUpdate).toLocaleTimeString()
    : "";

  const allowedKeys = [
    "HAS ALTIN",
    "ONS",
    "USD/KG",
    "EUR/KG",
    "22 AYAR",
    "GRAM ALTIN",
    "ALTIN GÜMÜŞ",
    "YENİ ÇEYREK",
    "ESKİ ÇEYREK",
    "YENİ YARIM",
    "ESKİ YARIM",
    "YENİ TAM",
    "ESKİ TAM",
    "YENİ ATA",
    "ESKİ ATA",
    "YENİ ATA5",
    "ESKİ ATA5",
    "YENİ GREMSE",
    "ESKİ GREMSE",
    "14 AYAR",
    "GÜMÜŞ TL",
    "GÜMÜŞ ONS",
    "GÜMÜŞ USD",
    "PLATİN ONS",
    "PALADYUM ONS",
    "PLATİN/USD",
    "PALADYUM/USD",
  ];

  const filteredData = data.filter((item) => allowedKeys.includes(item.key));

  return (
    <div className="gold-container">
      <h2 className="gold-title">ALTIN FİYATLARI</h2>
      {formattedTime && (
        <p style={{ textAlign: "center", fontSize: "13px", color: "#888" }}>
          Son güncelleme: {formattedTime}
        </p>
      )}
      <div className="table-wrapper">
        <table className="gold-table">
          <thead>
            <tr>
              <th>{currentTime.toLocaleTimeString()}</th>
              <th>ALIŞ</th>
              <th>SATIŞ</th>
              <th>FARK</th>
              <th>YÖN</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => {
              const isUp = item.arrow === "up";
              return (
                <tr key={index}>
                  <td>{item.key}</td>
                  <td>{item.buy}</td>
                  <td>{item.sell}</td>
                  <td style={{ color: isUp ? "green" : "red" }}>
                    {item.percent}
                  </td>
                  <td style={{ color: isUp ? "green" : "red" }}>
                    {isUp ? "↑" : "↓"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Price;
