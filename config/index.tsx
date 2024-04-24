import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'

import { cookieStorage, createStorage } from 'wagmi'
import { bsc, bscTestnet, } from 'wagmi/chains'

import { compad } from "./customChain";

// Get projectId at https://cloud.walletconnect.com
export const projectId = '064d0a124217d401cda6999baf496215'

if (!projectId) throw new Error('Project ID is not defined')

const metadata = {
  name: 'Compad | Private Presale',
  description: 'Compad private presale website',
  url: 'https://compad-private-presale.vercel.app/', // origin must match your domain & subdomain
  // url: 'http://localhost:3000/', // origin must match your domain & subdomain
  icons: ['https://pbs.twimg.com/profile_images/1685353964450004993/7q2iSxcW_400x400.jpg']
}
// const compad = {
//   name: 'Compad',
//   shortName: 'COM',
//   chainId: 56, // Replace with the actual chain ID for the new token
//   rpcUrl: 'https://bsc-dataseed1.binance.org/', // Replace with the actual RPC URL for the new token
//   blockExplorerUrl: 'http://bscscan.com/' // Replace with the actual block explorer URL for the new token
// };

// Create wagmiConfig
const chains = [ bsc] as const
export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage
  }),
//   ...wagmiOptions // Optional - Override createConfig parameters
})