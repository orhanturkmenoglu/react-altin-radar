import { useState, useEffect } from "react";

const ALLOWED_KEYS = [
  "HAS ALTIN", "ONS", "USD/KG", "EUR/KG", "22 AYAR",
  "GRAM ALTIN", "ALTIN GÜMÜŞ", "YENİ ÇEYREK", "ESKİ ÇEYREK",
  "YENİ YARIM", "ESKİ YARIM", "YENİ TAM", "ESKİ TAM",
  "YENİ ATA", "ESKİ ATA", "YENİ ATA5", "ESKİ ATA5",
  "YENİ GREMSE", "ESKİ GREMSE", "14 AYAR", "GÜMÜŞ TL",
  "GÜMÜŞ ONS", "GÜMÜŞ USD", "PLATİN ONS", "PALADYUM ONS",
  "PLATİN/USD", "PALADYUM/USD"
];

function useGoldPrices() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ws;
    let isUnmounted = false;
    let pingTimer;
    let reconnectTimer;

    const SOCKET_URL = "wss://socketweb.haremaltin.com/socket.io/?EIO=4&transport=websocket";

    const codeToKeyMap = new Map([
      ["ONS", "ONS"],
      ["USDKG", "USD/KG"],
      ["EURKG", "EUR/KG"],
      ["AYAR22", "22 AYAR"],
      ["KULCEALTIN", "GRAM ALTIN"],
      ["XAUXAG", "ALTIN GÜMÜŞ"],
      ["CEYREK_YENI", "YENİ ÇEYREK"],
      ["CEYREK_ESKI", "ESKİ ÇEYREK"],
      ["YARIM_YENI", "YENİ YARIM"],
      ["YARIM_ESKI", "ESKİ YARIM"],
      ["TEK_YENI", "YENİ TAM"],
      ["TEK_ESKI", "ESKİ TAM"],
      ["ATA_YENI", "YENİ ATA"],
      ["ATA_ESKI", "ESKİ ATA"],
      ["ATA5_YENI", "YENİ ATA5"],
      ["ATA5_ESKI", "ESKİ ATA5"],
      ["GREMESE_YENI", "YENİ GREMSE"],
      ["GREMESE_ESKI", "ESKİ GREMSE"],
      ["AYAR14", "14 AYAR"],
      ["GUMUSTRY", "GÜMÜŞ TL"],
      ["XAGUSD", "GÜMÜŞ ONS"],
      ["GUMUSUSD", "GÜMÜŞ USD"],
      ["XPTUSD", "PLATİN ONS"],
      ["XPDUSD", "PALADYUM ONS"],
      ["PLATIN", "PLATİN/USD"],
      ["PALADYUM", "PALADYUM/USD"],
      ["ALTIN", "HAS ALTIN"],
    ]);

    function toNumberSafe(value) {
      if (value === null || value === undefined || value === "") return NaN;
      if (typeof value === "number") return value;
      const n = Number(String(value).replace(/,/g, "").trim());
      return Number.isFinite(n) ? n : NaN;
    }

    function formatPercent(currentSell, close) {
      const cur = toNumberSafe(currentSell);
      const kap = toNumberSafe(close);
      if (!Number.isFinite(cur) || !Number.isFinite(kap) || kap === 0) return "";
      const p = ((cur - kap) / kap) * 100;
      return `${p.toFixed(2)}%`;
    }

    function mapSocketDataToRows(socketData) {
      const rows = [];
      for (const [code, payload] of Object.entries(socketData || {})) {
        const key = codeToKeyMap.get(code);
        if (!key) continue;

        const buy = payload?.alis ?? "-";
        const sell = payload?.satis ?? "-";
        const percent = formatPercent(sell, payload?.kapanis);
        const dir = payload?.dir?.satis_dir || payload?.dir?.alis_dir || "";
        const arrow = dir === "down" ? "down" : dir === "up" ? "up" : (percent.startsWith("-") ? "down" : "up");

        rows.push({ key, buy, sell, percent, arrow });
      }

      const byKey = new Map(rows.map((x) => [x.key, x]));
      return ALLOWED_KEYS.filter((k) => byKey.has(k)).map((k) => byKey.get(k));
    }

    function connect() {
      if (isUnmounted) return;
      try {
        ws = new WebSocket(SOCKET_URL);
      } catch (e) {
        scheduleReconnect();
        return;
      }

      ws.onopen = () => {
        // Engine açıldıktan sonra (genelde '0...' gelir) varsayılan namespace için Socket.IO connect gönder
        try {
          ws.send("40");
        } catch {}
      };

      ws.onmessage = (event) => {
        const msg = String(event.data);
        // Engine.IO ping
        if (msg === "2") {
          try { ws.send("3"); } catch {}
          return;
        }
        // Socket.IO bağlandı
        if (msg.startsWith("40")) {
          return;
        }
        // Socket.IO etkinliği: 42["event", payload]
        if (msg.startsWith("42")) {
          const start = msg.indexOf("[");
          if (start !== -1) {
            try {
              const arr = JSON.parse(msg.slice(start));
              const eventName = arr?.[0];
              const payload = arr?.[1];
              if (eventName === "price_changed" && payload?.data) {
                const rows = mapSocketDataToRows(payload.data);
                if (rows.length > 0) {
                  setData(rows);
                  setLastUpdate(new Date());
                  setError(null);
                  setLoading(false);
                }
              }
            } catch {
              // parse hatalarını yok say
            }
          }
          return;
        }
        // Engine.IO açılış çerçevesi pingInterval içerir; gerekirse ping zamanlamak için kullanılabilir
        if (msg.startsWith("0")) {
          // işlem yok
          return;
        }
      };

      ws.onerror = () => {
        scheduleReconnect();
      };

      ws.onclose = () => {
        scheduleReconnect();
      };

      // Ping/pong dışında etkinlik bekleniyorsa bağlantıyı canlı tut
      const keepAlive = () => {
        if (!ws || ws.readyState !== WebSocket.OPEN) return;
        try { ws.send("2"); } catch {}
      };
      pingTimer = setInterval(keepAlive, 20000);
    }

    function scheduleReconnect() {
      if (isUnmounted) return;
      if (pingTimer) clearInterval(pingTimer);
      if (ws && ws.readyState === WebSocket.OPEN) {
        try { ws.close(); } catch {}
      }
      if (reconnectTimer) clearTimeout(reconnectTimer);
      reconnectTimer = setTimeout(connect, 3000);
    }

    connect();

    return () => {
      isUnmounted = true;
      if (pingTimer) clearInterval(pingTimer);
      if (reconnectTimer) clearTimeout(reconnectTimer);
      try { ws && ws.close(); } catch {}
    };
  }, []);

  return { data, loading, lastUpdate, error };
}

export default useGoldPrices;
