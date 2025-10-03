import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";
import "@aptos-labs/wallet-adapter-ant-design/dist/index.css";
import { useState } from "react";

export function MainApp() {
  const { account } = useWallet();
  const address = account?.address?.toString();
  const [activeSection, setActiveSection] = useState("swap");

  // States for swap inputs
  const [usdtAmount, setUsdtAmount] = useState("");
  const [ngnAmount, setNgnAmount] = useState("");
  const [error, setError] = useState("");

  const EXCHANGE_RATE = 1500; // 1 USDT = 1500 NGN
  const MIN_USDT = 1;
  const MAX_USDT = 50000;
  const MIN_NGN = 1500;
  const MAX_NGN = 75000000;

  // Frontend-only transaction history
  const [transactions, setTransactions] = useState([]);

  const validateAmounts = (usdt, ngn) => {
    if (usdt < MIN_USDT || ngn < MIN_NGN) {
      setError(`Minimum swap is ${MIN_USDT} USDT (₦${MIN_NGN.toLocaleString()})`);
      return false;
    }
    if (usdt > MAX_USDT || ngn > MAX_NGN) {
      setError(`Maximum swap is ${MAX_USDT.toLocaleString()} USDT (₦${MAX_NGN.toLocaleString()})`);
      return false;
    }
    setError("");
    return true;
  };

  const handleUsdtChange = (e) => {
    const value = e.target.value;
    setUsdtAmount(value);

    if (value === "" || isNaN(Number(value))) {
      setNgnAmount("");
      setError("");
      return;
    }

    const usdt = Number(value);
    const ngn = usdt * EXCHANGE_RATE;
    setNgnAmount(ngn);
    validateAmounts(usdt, ngn);
  };

  const handleNgnChange = (e) => {
    const value = e.target.value;
    setNgnAmount(value);

    if (value === "" || isNaN(Number(value))) {
      setUsdtAmount("");
      setError("");
      return;
    }

    const ngn = Number(value);
    const usdt = ngn / EXCHANGE_RATE;
    setUsdtAmount(usdt);
    validateAmounts(usdt, ngn);
  };

  // Frontend-only swap handler
  const handleSwap = () => {
    const usdt = Number(usdtAmount);
    const ngn = Number(ngnAmount);

    if (!validateAmounts(usdt, ngn)) return;

    const bankSelect = document.querySelector("select");
    const accountInput = document.querySelector('input[placeholder="Enter your account number"]');

    const tx = {
      id: Date.now(),
      user: address,
      usdtAmount: usdt,
      ngnAmount: ngn,
      bank: bankSelect?.value || "",
      accountNumber: accountInput?.value || "",
    };

    setTransactions([tx, ...transactions]);
    alert(`Swap successful! ${usdt} USDT → ₦${ngn.toLocaleString()}`);

    // Reset input fields
    setUsdtAmount("");
    setNgnAmount("");
    bankSelect.value = "";
    accountInput.value = "";
  };

  if (!address) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="text-3xl font-bold text-[#08CB00] mb-4">APAY</div>
          <p className="text-gray-600 mb-6">Loading your wallet...</p>
          <WalletSelector />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex justify-between items-center">
          <div className="text-3xl font-black text-[#08CB00]">APAY</div>
          <div className="flex items-center gap-4">
            <span className="hidden sm:block text-sm font-mono bg-gray-100 px-4 py-2 rounded-lg text-gray-700">
              {address.slice(0, 6)}...{address.slice(-4)}
            </span>
            <WalletSelector />
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Section Switcher */}
        <div className="flex justify-center gap-4 mb-10">
          {["swap", "staking", "history"].map((section) => (
            <button
              key={section}
              onClick={() => setActiveSection(section)}
              className={`px-6 py-2 rounded-full font-semibold border-2 transition-all ${
                activeSection === section
                  ? "bg-[#08CB00] text-white border-[#08CB00]"
                  : "bg-white text-[#08CB00] border-[#08CB00] hover:bg-[#08CB00] hover:text-white"
              }`}
            >
              {section === "swap"
                ? "Swap"
                : section === "staking"
                ? "Staking"
                : "Transaction History"}
            </button>
          ))}
        </div>

        {/* Swap Section */}
        {activeSection === "swap" && (
          <div className="max-w-lg mx-auto bg-white p-8 rounded-2xl shadow-xl">
            <h2 className="text-2xl font-bold text-center text-[#253900] mb-6">
              Swap USDT to Naira
            </h2>

            <div className="space-y-4">
              <p className="text-sm text-gray-500 text-center mb-2">
                Exchange Rate: 1 USDT = ₦{EXCHANGE_RATE}
              </p>

              <div>
                <label className="block mb-2 font-semibold text-[#253900]">
                  From (USDT)
                </label>
                <input
                  type="number"
                  placeholder="Enter USDT amount"
                  value={usdtAmount}
                  onChange={handleUsdtChange}
                  className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-[#08CB00]"
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold text-[#253900]">
                  To (NGN)
                </label>
                <input
                  type="number"
                  placeholder="Enter Naira amount"
                  value={ngnAmount}
                  onChange={handleNgnChange}
                  className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-[#08CB00]"
                />
              </div>

              {error && (
                <p className="text-sm text-red-500 font-medium text-center">{error}</p>
              )}

              <div>
                <label className="block mb-2 font-semibold text-[#253900]">
                  Bank Name
                </label>
                <select className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-[#08CB00]">
                  <option value="">Select Bank</option>
                  <option>GTBank</option>
                  <option>Access Bank</option>
                  <option>Zenith Bank</option>
                  <option>First Bank</option>
                  <option>UBA</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 font-semibold text-[#253900]">
                  Account Number
                </label>
                <input
                  type="text"
                  placeholder="Enter your account number"
                  className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-[#08CB00]"
                />
              </div>

              <button
                disabled={!!error || !usdtAmount || !ngnAmount}
                onClick={handleSwap}
                className={`w-full py-4 rounded-lg font-semibold shadow-md transition-transform ${
                  !!error || !usdtAmount || !ngnAmount
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-[#08CB00] to-[#253900] text-white hover:scale-[1.02]"
                }`}
              >
                Swap Now
              </button>
            </div>
          </div>
        )}

        {/* Staking Section */}
        {activeSection === "staking" && (
          <div className="relative">
            <div className="filter blur-[2px] pointer-events-none select-none">
              <h2 className="text-2xl font-bold text-center text-[#253900] mb-10">
                Staking Pools
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { apy: "2.5%", name: "Flexible Pool", min: "₦10,000" },
                  { apy: "8.5%", name: "30-Day Lock", min: "₦50,000" },
                  { apy: "15%", name: "90-Day Lock", min: "₦100,000" },
                  { apy: "25%", name: "365-Day Lock", min: "₦500,000" },
                ].map((pool, i) => (
                  <div
                    key={i}
                    className="bg-white p-6 rounded-xl shadow-lg border-2 border-transparent hover:border-[#08CB00] transition-all"
                  >
                    <div className="text-2xl font-black text-[#08CB00] mb-2">
                      {pool.apy} APY
                    </div>
                    <div className="text-gray-600 mb-4">
                      <strong>{pool.name}</strong>
                      <br />
                      Minimum: {pool.min}
                    </div>
                    <button className="bg-[#08CB00] text-white px-4 py-2 rounded-lg font-semibold w-full">
                      Stake Now
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white bg-opacity-40 backdrop-blur-md rounded-3xl p-12 shadow-2xl border border-white border-opacity-50">
                <div className="text-center">
                  <div className="text-6xl font-black mb-4 bg-gradient-to-r from-[#08CB00] to-[#253900] bg-clip-text text-transparent">
                    Coming Soon
                  </div>
                  <p className="text-xl text-gray-800 font-semibold">
                    Staking feature will be available soon
                  </p>
                  <div className="mt-6 inline-block px-6 py-2 bg-white bg-opacity-60 rounded-full backdrop-blur-sm border border-[#08CB00] border-opacity-30">
                    <span className="text-[#08CB00] font-bold">🚀 Stay Tuned</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Transaction History Section */}
        {activeSection === "history" && (
          <div>
            <h2 className="text-2xl font-bold text-center text-[#253900] mb-10">
              Transaction History
            </h2>
            <div className="space-y-4 max-w-lg mx-auto">
              {transactions.length === 0 ? (
                <div className="bg-white rounded-xl shadow-lg overflow-hidden p-6 text-center text-gray-500">
                  No transactions yet.
                </div>
              ) : (
                transactions.map((tx) => (
                  <div key={tx.id} className="bg-white p-4 rounded-xl shadow-md border border-gray-200">
                    <p>
                      <strong>User:</strong> {tx.user.slice(0, 6)}...{tx.user.slice(-4)}
                    </p>
                    <p>
                      <strong>Swapped:</strong> {tx.usdtAmount} USDT → ₦{tx.ngnAmount.toLocaleString()}
                    </p>
                    <p>
                      <strong>Bank:</strong> {tx.bank} | <strong>Account:</strong> {tx.accountNumber}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
