import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import { Network } from "@aptos-labs/ts-sdk";

export function WalletProvider({ children }) {
  return (
    <AptosWalletAdapterProvider
      autoConnect={true}
      dappConfig={{ network: Network.DEVNET }}
      onError={(error) => {
        console.log("Wallet error:", error);
      }}
    >
      {children}
    </AptosWalletAdapterProvider>
  );
}