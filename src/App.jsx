import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { navLinks } from "./navLinks";


import AppRoutes from "./components/AppRoutes";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchGoldPrices } from "./redux/goldPriceSlice";

function App() {
   
  const dispatch  = useDispatch();

  const {data,loading,lastUpdate,error} = useSelector((store)=>store.goldPrice);

  useEffect(() => {
  const fetchData = async () => {
    await dispatch(fetchGoldPrices());
  };

  fetchData();
}, [dispatch]);
  return (
    <>
      <Navbar links={navLinks} />
      <main>
        {error && (
          <div style={{ color: "red", textAlign: "center", padding: "10px" }}>
            Hata: {error}
          </div>
        )}
        <AppRoutes data={data} loading={loading} lastUpdate={lastUpdate} />
      </main>
      <Footer />
    </>
  );
}

export default App;
