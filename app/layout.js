import './globals.css'
// import type { Metadata } from 'next'
import { headers } from 'next/headers'

import { cookieToInitialState } from 'wagmi'

import { config } from '../config/index'
import Web3ModalProvider from '../context/index'


export default function RootLayout({ children }) {
  const initialState = cookieToInitialState(config, headers().get('cookie'))
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta name="description" content="Compad private presale website" />
        {/* <link rel="icon" type="image/x-icon" href="@/public/favicon.ico" /> */}
        <title>Compad | Private Presale</title>
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://privatesale.compad.org" />
        <meta property="og:title" content="Compad | Private Sale" />
        <meta property="og:description" content="Compad private sale website" />
        <meta property="og:image" content="https://pbs.twimg.com/profile_images/1685353964450004993/7q2iSxcW_400x400.jpg" />
        <meta name="twitter:card" content="Compad private presale website" />
        <meta name="twitter:url" content="https://x.com/Compadofficial?t=O7E36yY3IgiypnzQ9f9MwQ&s=09" />
        <meta name="twitter:title" content="Compad | Private Sale" />
        <meta name="twitter:description" content="Compad private sale website" />
        <meta name="twitter:image" content="https://pbs.twimg.com/profile_images/1685353964450004993/7q2iSxcW_400x400.jpg" />
        <meta name="robots" content="follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large"/>
      </head>
      <body>
        <Web3ModalProvider initialState={initialState}>{children}</Web3ModalProvider>
      </body>
    </html>
  )
}