import { type Chain } from "viem";

export const compad: Chain = {
 id: 56,
  name: 'CompadCoin',
  nativeCurrency: {
    decimals: 18,
    name: 'COM',
    symbol: 'COM',
  },
  rpcUrls: {
    default: { http: ['https://bsc-dataseed1.binance.org/'] },
  },
  blockExplorers: {
    default: {
      name: 'BscScan',
      url: 'https://bscscan.com',
      apiUrl: 'https://api.bscscan.com/api',
    },
  },
  contracts: {
    multicall3: {
      address: '0x2Ba9f8C4ea161eAc788570FFd414eCBA4aa38eB1',
      blockCreated: 38036234,
    },
  },
  testnet: false,
};