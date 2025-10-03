import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { LandingPage } from "./components/LandingPage";
import { MainApp } from "./components/MainApp";
import { WalletProvider } from "./utils/WalletProvider";

function AppContent() {
  const { connected } = useWallet();

  // Fallback UI for safety
  try {
    return connected ? <MainApp /> : <LandingPage />;
  } catch (error) {
    console.error("AppContent error:", error);
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#f9f9f9",
          color: "#333",
          fontFamily: "Arial, sans-serif",
          textAlign: "center",
          padding: "1rem",
        }}
      >
        <h2>Something went wrong</h2>
        <p>Please refresh the page or try reconnecting your wallet.</p>
      </div>
    );
  }
}

function App() {
  return (
    <WalletProvider>
      <AppContent />
    </WalletProvider>
  );
}

export default App;
