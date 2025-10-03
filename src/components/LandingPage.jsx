import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";
import "@aptos-labs/wallet-adapter-ant-design/dist/index.css";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex justify-between items-center">
            <div className="text-4xl font-black text-[#08CB00]">
              APAY
            </div>
            <WalletSelector />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center mb-16">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6">
            <span className="text-[#08CB00]">Seamless USDT to Naira</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Trade your USDT directly to your bank account instantly. Stake your Naira and earn
            competitive yields on Aptos blockchain.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Card 1 */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-[#08CB00] hover:shadow-xl transition-all duration-300 group">
            <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform">
              ⚡
            </div>
            <h3 className="text-2xl font-bold mb-3 text-gray-900">
              Instant Swaps
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Convert USDT to Naira instantly and receive money directly in your bank account
              without delays.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-[#08CB00] hover:shadow-xl transition-all duration-300 group">
            <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform">
              💰
            </div>
            <h3 className="text-2xl font-bold mb-3 text-gray-900">
              Staking Rewards
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Stake your Naira in liquidity pools and earn competitive yields based on lock-up
              periods.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-[#08CB00] hover:shadow-xl transition-all duration-300 group">
            <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform">
              🔒
            </div>
            <h3 className="text-2xl font-bold mb-3 text-gray-900">
              Secure & Decentralized
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Built on Aptos blockchain for maximum security and transparency in all
              transactions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}