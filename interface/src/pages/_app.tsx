import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import '@rainbow-me/rainbowkit/styles.css';

import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { sepolia,hardhat, } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';



const { chains, provider } = configureChains(
  [sepolia,hardhat],
  [
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'Token Vendor Machine',
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})

export default function App({ Component, pageProps }: AppProps) {



  return(
  <WagmiConfig client={wagmiClient}>
  <RainbowKitProvider chains={chains}>
  <Component {...pageProps} />
  </RainbowKitProvider>
    </WagmiConfig>)
}
