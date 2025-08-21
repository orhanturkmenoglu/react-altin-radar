import React, { useEffect, useRef, useState } from "react";

import "../css/GoldPrice.css";

function Price({ data, loading,lastUpdate }) {

  const [currentTime,setCurrentTime] = useState(new Date());
  const [selectedKey, setSelectedKey] = useState("GRAM ALTIN");
  const [side, setSide] = useState("sell"); // "buy" | "sell"
  const [gram, setGram] = useState(1);
  const [tl, setTl] = useState(0);
  const [flashes, setFlashes] = useState({}); // {"KEY-buy": "up"|"down", "KEY-sell": ...}
  const prevMapRef = useRef(new Map()); // key -> { buy, sell }
  const flashTimersRef = useRef(new Map()); // cellId -> timeoutId

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval); // Component unmount olunca temizle
  }, []);


  if (loading) return <p>Veriler yükleniyor...</p>;
  if (!data || !Array.isArray(data)) return <p>Veri bulunamadı.</p>;

  const formattedTime = lastUpdate
    ? new Date(lastUpdate).toLocaleTimeString()
    : "";

  const allowedKeys = [
    "HAS ALTIN", "ONS", "USD/KG", "EUR/KG", "22 AYAR",
    "GRAM ALTIN", "ALTIN GÜMÜŞ", "YENİ ÇEYREK", "ESKİ ÇEYREK",
    "YENİ YARIM", "ESKİ YARIM", "YENİ TAM", "ESKİ TAM",
    "YENİ ATA", "ESKİ ATA", "YENİ ATA5", "ESKİ ATA5",
    "YENİ GREMSE", "ESKİ GREMSE", "14 AYAR", "GÜMÜŞ TL",
    "GÜMÜŞ ONS", "GÜMÜŞ USD", "PLATİN ONS", "PALADYUM ONS",
    "PLATİN/USD", "PALADYUM/USD"
  ];

    const filteredData = data.filter(item => allowedKeys.includes(item.key));

  // Değişim tespiti ve geçici highlight
  useEffect(() => {
    const prevMap = prevMapRef.current;
    const nextMap = new Map();

    filteredData.forEach((item) => {
      const key = item.key;
      const prev = prevMap.get(key) || {};
      const curBuy = toNumber(item.buy);
      const curSell = toNumber(item.sell);
      const prevBuy = toNumber(prev.buy);
      const prevSell = toNumber(prev.sell);

      // BUY değişimi
      if (Number.isFinite(curBuy) && Number.isFinite(prevBuy) && curBuy !== prevBuy) {
        const dir = curBuy > prevBuy ? "up" : "down";
        const cellId = `${key}-buy`;
        setFlashes((f) => ({ ...f, [cellId]: dir }));
        if (flashTimersRef.current.has(cellId)) {
          clearTimeout(flashTimersRef.current.get(cellId));
        }
        const to = setTimeout(() => {
          setFlashes((f) => {
            const copy = { ...f };
            delete copy[cellId];
            return copy;
          });
          flashTimersRef.current.delete(cellId);
        }, 1500);
        flashTimersRef.current.set(cellId, to);
      }

      // SELL değişimi
      if (Number.isFinite(curSell) && Number.isFinite(prevSell) && curSell !== prevSell) {
        const dir = curSell > prevSell ? "up" : "down";
        const cellId = `${key}-sell`;
        setFlashes((f) => ({ ...f, [cellId]: dir }));
        if (flashTimersRef.current.has(cellId)) {
          clearTimeout(flashTimersRef.current.get(cellId));
        }
        const to = setTimeout(() => {
          setFlashes((f) => {
            const copy = { ...f };
            delete copy[cellId];
            return copy;
          });
          flashTimersRef.current.delete(cellId);
        }, 1500);
        flashTimersRef.current.set(cellId, to);
      }

      nextMap.set(key, { buy: item.buy, sell: item.sell });
    });

    prevMapRef.current = nextMap;

    return () => {
      // temizlik: component unmount veya data hızla değişirse timer'ları kes
      flashTimersRef.current.forEach((to) => clearTimeout(to));
      flashTimersRef.current.clear();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const lastUpdateIso = lastUpdate ? new Date(lastUpdate).toISOString() : "";

  const csvEscape = (value) => {
    const s = String(value ?? "");
    const escaped = s.replace(/"/g, '""');
    return `"${escaped}"`;
  };

  const handleDownloadCsv = () => {
    const header = ["Ad", "Alış", "Satış", "Fark", "Yön", "Güncelleme"];
    const rows = filteredData.map((item) => [
      item.key,
      item.buy,
      item.sell,
      item.percent,
      item.arrow === "up" ? "↑" : "↓",
      lastUpdateIso,
    ]);
    const csv = [header, ...rows]
      .map((r) => r.map(csvEscape).join(","))
      .join("\r\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `altin-fiyatlari-${Date.now()}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const toNumber = (val) => {
    if (val === null || val === undefined || val === "") return NaN;
    if (typeof val === "number") return val;
    const n = Number(String(val).replace(/,/g, "").trim());
    return Number.isFinite(n) ? n : NaN;
  };

  const findSelectedItem = () => filteredData.find((x) => x.key === selectedKey);
  const getUnitPrice = () => {
    const item = findSelectedItem();
    if (!item) return NaN;
    return toNumber(item[side]);
  };

  useEffect(() => {
    const price = getUnitPrice();
    if (!Number.isFinite(price) || price <= 0) {
      setTl(0);
      return;
    }
    setTl(Number((gram * price).toFixed(2)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedKey, side, data]);

  const handleGramChange = (e) => {
    const g = Number(e.target.value);
    if (!Number.isFinite(g)) return;
    setGram(g);
    const price = getUnitPrice();
    if (!Number.isFinite(price) || price <= 0) {
      setTl(0);
      return;
    }
    setTl(Number((g * price).toFixed(2)));
  };

  const handleTlChange = (e) => {
    const t = Number(e.target.value);
    if (!Number.isFinite(t)) return;
    setTl(t);
    const price = getUnitPrice();
    if (!Number.isFinite(price) || price <= 0) {
      setGram(0);
      return;
    }
    setGram(Number((t / price).toFixed(4)));
  };

  return (
    <div className="gold-container">
      <h2 className="gold-title">ALTIN FİYATLARI</h2>
       {formattedTime && (
        <p style={{ textAlign: "center", fontSize: "13px", color: "#888" }}>
          Son güncelleme: {formattedTime}
        </p>
      )}
      {/* Basit Gram Altın/TL Çevirici */}
      <div style={{
        maxWidth: 900,
        margin: "12px auto 20px",
        background: "#fff",
        border: "1px solid #eee",
        borderRadius: 8,
        padding: 12,
        boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
      }}>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <select
              value={selectedKey}
              onChange={(e) => setSelectedKey(e.target.value)}
              style={{ padding: "6px 8px", borderRadius: 6, border: "1px solid #ddd" }}
            >
              {allowedKeys.map((k) => (
                <option key={k} value={k}>{k}</option>
              ))}
            </select>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <label style={{ fontSize: 13, color: "#555" }}>Fiyat</label>
            <select
              value={side}
              onChange={(e) => setSide(e.target.value)}
              style={{ padding: "6px 8px", borderRadius: 6, border: "1px solid #ddd" }}
            >
              <option value="buy">ALIŞ</option>
              <option value="sell">SATIŞ</option>
            </select>
          </div>
          <div style={{ flex: 1 }} />
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <label style={{ fontSize: 13, color: "#555", minWidth: 60 }}>Gram</label>
            <input
              type="number"
              min="0"
              step="0.0001"
              value={gram}
              onChange={handleGramChange}
              style={{ padding: "6px 8px", borderRadius: 6, border: "1px solid #ddd", width: 140 }}
            />
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <label style={{ fontSize: 13, color: "#555", minWidth: 60 }}>TL</label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={tl}
              onChange={handleTlChange}
              style={{ padding: "6px 8px", borderRadius: 6, border: "1px solid #ddd", width: 160 }}
            />
          </div>
          <div style={{ fontSize: 12, color: "#777" }}>
            Birim fiyat: {(() => {
              const p = getUnitPrice();
              return Number.isFinite(p) ? `${p.toLocaleString(undefined, { maximumFractionDigits: 4 })} TL` : "-";
            })()}
          </div>
        </div>
      </div>
      <div className="table-wrapper">
      <div style={{ maxWidth: 900, margin: "0 auto 8px", display: "flex", justifyContent: "flex-end" }}>
        <button
          onClick={handleDownloadCsv}
          style={{
            padding: "6px 10px",
            borderRadius: 6,
            border: "1px solid #ddd",
            background: "#f7f7f7",
            cursor: "pointer",
          }}
        >
          CSV İndir
        </button>
      </div>
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
            const buyCellId = `${item.key}-buy`;
            const sellCellId = `${item.key}-sell`;
            const buyFlash = flashes[buyCellId];
            const sellFlash = flashes[sellCellId];
            return (
              <tr key={index}>
                <td>{item.key}</td>
                <td className={buyFlash ? (buyFlash === "up" ? "cell-flash-up" : "cell-flash-down") : undefined}>{item.buy}</td>
                <td className={sellFlash ? (sellFlash === "up" ? "cell-flash-up" : "cell-flash-down") : undefined}>{item.sell}</td>
                <td style={{ color: isUp ? "green" : "red" }}>{item.percent}</td>
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
