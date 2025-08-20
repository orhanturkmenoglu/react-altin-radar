import { useState, useEffect } from "react";

const API_URL = "https://harem-altin-live-gold-price-data.p.rapidapi.com/harem_altin/prices";
const API_HEADERS = {
  "x-rapidapi-host": "harem-altin-live-gold-price-data.p.rapidapi.com",
  "x-rapidapi-key": "5978dcdd46msh7040dc340645555p10b164jsn8eb2ffbbdada",
};

function useGoldPrices() {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem("goldData");
    return saved ? JSON.parse(saved) : [];
  });
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; // component unmount kontrolü

    async function fetchData() {
      if (!isMounted) return;
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(API_URL, {
          method: "GET",
          headers: API_HEADERS,
        });

        const result = await res.json();

        if (result?.data && Array.isArray(result.data)) {
          if (isMounted) {
            setData(result.data);
            setLastUpdate(new Date());
            localStorage.setItem("goldData", JSON.stringify(result.data));
          }
        } else {
          throw new Error("API’den geçerli veri alınamadı.");
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchData();

    const interval = setInterval(fetchData, 900000 ); // 2 dakikada bir

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  return { data, loading, lastUpdate, error };
}

export default useGoldPrices;
