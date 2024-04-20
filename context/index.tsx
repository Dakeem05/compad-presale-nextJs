'use client'

import React, { ReactNode } from 'react'
import { config, projectId } from '../config/index'

import { createWeb3Modal } from '@web3modal/wagmi/react'
import { SiweMessage } from 'siwe'
import { createSIWEConfig } from '@web3modal/siwe'
import type { SIWECreateMessageArgs, SIWEVerifyMessageArgs } from '@web3modal/siwe'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { State, WagmiProvider } from 'wagmi'




// Setup queryClient
const queryClient = new QueryClient()

if (!projectId) throw new Error('Project ID is not defined')
// Create modal
console.log(projectId)
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