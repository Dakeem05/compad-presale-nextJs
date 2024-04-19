'use client'

import React, { ReactNode } from 'react'
import { config, projectId } from '@/config'
import { validateMessage } from './validateMessage';

import { createWeb3Modal } from '@web3modal/wagmi/react'
import { SiweMessage } from 'siwe'
import { createSIWEConfig } from '@web3modal/siwe'
import type { SIWECreateMessageArgs, SIWEVerifyMessageArgs } from '@web3modal/siwe'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { State, WagmiProvider } from 'wagmi'

/* Function that creates a SIWE message */
async function createMessage({ nonce, address, chainId }) {
    try {
      const message = new SiweMessage({
        version: '1',
        domain: 'http://localhost:3000/',
        uri: 'http://localhost:3000/',
        address,
        chainId,
        nonce,
        statement: 'Sign in With Ethereum.'
      });
  
      return message.prepareMessage();
    } catch (error) {
      console.error('Error creating message:', error);
      throw error;
    }
  }

  async function checkAccountPermission() {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
  
      if (accounts.length === 0) {
        throw new Error('No connected accounts found');
      }
    } catch (error) {
      console.error('Account permission error:', error);
      throw error;
    }
  }

  
  async function requestSignature() {
    try {
      await checkAccountPermission();
  
      const { address, chainId } = await getSessionInfo();
      const nonce = 'YourNonceHere'; // Generate or fetch a nonce for the user
  
      const message = await createMessage({ nonce, address, chainId });
  
      const signature = await window.ethereum.request({
        method: 'eth_sign',
        params: [address, message],
      });
  
      return { message, signature };
    } catch (error) {
      console.error('Signature request error:', error);
      throw error;
    }
  }
  

  async function fetchSession() {
    try {
      // Check if the WalletConnect provider is available
      if (window.ethereum && window.ethereum.isWalletConnect) {
        // Get connected accounts
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
  
        // Get current chainId
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
  
        if (accounts.length === 0) {
          throw new Error('No connected accounts found');
        }
  
        return { address: accounts[0], chainId };
      } else {
        console.error('WalletConnect provider not found');
        return null;
      }
    } catch (error) {
      console.error('Error fetching session:', error);
      throw error;
    }
  }
  

  /* Function that returns the user's session */
  async function getSessionInfo() {
    try {
      // Fetch session using your preferred method
      const session = await fetchSession(); // Replace with your session fetching method
      if (!session) throw new Error('Failed to get session!');
  
      const { address, chainId } = session;
  
      return { address, chainId };
    } catch (error) {
      console.error('Error fetching session:', error);
      throw error;
    }
  }

  async function switchToBSC() {
    try {
      // Check if the WalletConnect provider is available
      if (window.ethereum && window.ethereum.isWalletConnect) {
        // Request to switch the network to BSC
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x38' }], // BSC chain ID
        });
      } else {
        console.error('WalletConnect provider not found');
      }
    } catch (error) {
      console.error('Error switching network to BSC:', error);
    }
  }
  
  

  /* Use your SIWE server to verify if the message and the signature are valid */
async function verifyMessage({ message, signature }: SIWEVerifyMessageArgs){
    try {
      const isValid = await validateMessage({ message, signature })
        
      if (isValid) {
        await switchToBSC();
      }
      return isValid
    } catch (error) {
      return false
    }
  }
  
  /* Create a SIWE configuration object */
  const siweConfig = createSIWEConfig({
    createMessage,
    // getNonce,
    getSession: getSessionInfo,
    verifyMessage,
    // signOut
  })

// Setup queryClient
const queryClient = new QueryClient()

if (!projectId) throw new Error('Project ID is not defined')

// Create modal
createWeb3Modal({
  wagmiConfig: config,
//   siweConfig,
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  enableOnramp: true // Optional - false as default
})

export default function Web3ModalProvider({
  children,
  initialState
}: {
  children: ReactNode
  initialState?: State
}) {
  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}