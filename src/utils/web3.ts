import { Contract } from '@ethersproject/contracts'
import { getAddress } from '@ethersproject/address'
import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers'
import { RPC_URLS } from '../constants'

import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { NetworkConnector } from '@web3-react/network-connector'

export function isAddress(value: any): string | false {
  try {
    return getAddress(value)
  } catch {
    return false
  }
}

export function shortenAddress(address: string): string {
  return `${address.substr(0, 6)}...${address.substr(38, 4)}`
}

export function obscureAddress(address: string): string {
  return `${address.substr(0, 4)}XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`
}

export function getContract(
  address: string,
  ABI: any,
  library: Web3Provider,
  account?: string
): Contract {
  if (!isAddress(address)) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }

  return new Contract(
    address,
    ABI,
    getProviderOrSigner(library, account) as any
  )
}

export function getProviderOrSigner(
  library: Web3Provider,
  account?: string
): Web3Provider | JsonRpcSigner {
  return account ? getSigner(library, account) : library
}

export function getSigner(
  library: Web3Provider,
  account: string
): JsonRpcSigner {
  return library.getSigner(account).connectUnchecked()
}

export const injected = new InjectedConnector({ /*supportedChainIds: [1, 5]*/ })

export const walletConnect = new WalletConnectConnector({
  rpc: { 1: RPC_URLS[1] },
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
})

export const network = new NetworkConnector({
  urls: { 1: RPC_URLS[1] },
  defaultChainId: 1,
})
