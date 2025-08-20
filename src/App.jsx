import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { navLinks } from "./navLinks";


import useGoldPrices from "./hooks/useGoldPrices";
import AppRoutes from "./components/AppRoutes";

function App() {
  const { data, loading, lastUpdate, error } = useGoldPrices();

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
