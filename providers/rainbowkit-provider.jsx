'use client';

import * as React from 'react';
import {
  RainbowKitProvider,
  getDefaultWallets,
  getDefaultConfig,
  connectorsForWallets
} from '@rainbow-me/rainbowkit';
import {
  argentWallet,
  trustWallet,
  ledgerWallet,
  walletConnectWallet,
  
  // WalletConnectProvider 
} from '@rainbow-me/rainbowkit/wallets';
import {
  bsc,
  bscTestnet
} from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { getWalletConnectConnector} from '@rainbow-me/rainbowkit';

const { wallets } = getDefaultWallets();
// const walletConnectProvider = new WalletConnectProvider();
// const connectors = connectorsForWallets(
//   [
//     {
//       groupName: 'Recommended',
//       wallets: [rainbowWallet, walletConnectWallet],
//     },
//   ],
//   {
//     appName: 'Compad - presale test',
//     projectId: '064d0a124217d401cda6999baf496215',
//   }
// );

const config = getDefaultConfig({
  appName: 'Compad - presale test',
  projectId: '064d0a124217d401cda6999baf496215',
  wallets: [
    ...wallets,
    {
      groupName: 'Other',
      wallets: [argentWallet, trustWallet, ledgerWallet, walletConnectWallet],
    },
  ],
  chains: [
    
    bscTestnet
  ],
  ssr: true,
});

// walletConnectProvider.enable()
//   .then(response => {
//     // Handle successful connection
//     console.log("Wallet Connect connected:", response);

//     // You can now access the connected provider instance using:
//     // const provider = walletConnectProvider.provider;

//     // Optionally, you can listen for chain changes, disconnects, etc.
//     walletConnectProvider.provider.on('chainChanged', (chainId) => {
//       console.log('Chain changed to:', chainId);
//     });

//     walletConnectProvider.provider.on('disconnect', (error) => {
//       console.log('Disconnected:', error);
//     });

//     // Handle the connected response, e.g., update UI or fetch account details
//   })
//   .catch(error => {
//     // Handle connection error
//     console.error("Error connecting Wallet Connect:", error);

//     // You can provide user feedback about the connection error
//     // e.g., show an error message to the user
//     alert("Failed to connect with Wallet Connect. Please try again.");
//   });

const queryClient = new QueryClient();

export function Providers({ children }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
      {/* <WalletConnectProvider> */}
        <RainbowKitProvider>
          {children}
        </RainbowKitProvider>
        {/* </WalletConnectProvider> */}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
