import Web3Modal from 'web3modal'
import React, { useState, useEffect } from 'react'
import WalletConnectProvider from '@walletconnect/web3-provider'

import Button from './Button'
import ENSName from './ENSName'
import { useWalletWeb3React } from 'src/hooks/web3'
import {
  walletConnect,
  injected,
  shortenAddress,
} from 'src/utils/web3'

let web3Modal: Web3Modal

const WalletButton = () => {
  const [web3Provider, setWeb3Provider] = useState()
  const walletWeb3ReactContext = useWalletWeb3React()
  const isConnected = walletWeb3ReactContext.active
  const walletAddress = walletWeb3ReactContext.account
  const [connectClick, setConnectClick] = useState(false)


  useEffect(() => {
    if (connectClick) {
      if (!web3Modal) {
        web3Modal = new Web3Modal({
          network: 'mainnet',
          cacheProvider: true,
          providerOptions: {
            walletconnect: {
              package: WalletConnectProvider,
              options: {
                // infuraId: INFURA_ID,
              },
              connector: async () => {
                return 'walletconnect'
              },
            },
            injected: {
              package: null,
              connector: async () => {
                return 'injected'
              },
            },
          },
        })
      } else {
        web3Modal.clearCachedProvider()
      }
      web3Modal
        .connect()

        .then((provider) => {
          setWeb3Provider(provider)
          if (provider.isMetaMask) {
            return walletWeb3ReactContext.activate(injected)
          } else {
            return walletWeb3ReactContext.activate(walletConnect)
          }
        })
        .then(() => {
          setConnectClick(false)
        })
        .catch(() => {
          setConnectClick(false)
        })
    }
  }, [connectClick])

  return (
    <React.Fragment>
      <Button
        theme={isConnected ? 'green' : 'pink'}
        thin={true}
        uppercase={false}
        disabled={isConnected}
        onClick={() => {
          !isConnected ? setConnectClick(true) : null
        }}
      >
        {isConnected ? (
          <ENSName
            provider={web3Provider}
            address={walletAddress}
            fallback={shortenAddress(walletAddress)}
          />
        ) : (
          'Connect a Wallet'
        )}
      </Button>
    </React.Fragment>
  )
}

export default WalletButton
