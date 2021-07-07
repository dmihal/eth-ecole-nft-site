import { useMemo } from 'react'
import { Web3Provider } from '@ethersproject/providers'
import { Contract } from '@ethersproject/contracts'
import { useWeb3React as useWeb3ReactCore } from '@web3-react/core'
import { Web3ReactContextInterface } from '@web3-react/core/dist/types'
import { DefaultProviderName } from '../constants'
import { getContract } from 'src/utils/web3'

export function useActiveWeb3React(): Web3ReactContextInterface<Web3Provider> & {
  chainId?
} {
  const walletNetwork = useWeb3ReactCore<Web3Provider>()
  const defaultNetwork = useWeb3ReactCore<Web3Provider>(DefaultProviderName)
  return walletNetwork.active ? walletNetwork : defaultNetwork
}

export function useWalletWeb3React(): Web3ReactContextInterface<Web3Provider> & {
  chainId?
} {
  const walletNetwork = useWeb3ReactCore<Web3Provider>()
  return walletNetwork
}

export function useDefaultWeb3React(): Web3ReactContextInterface<Web3Provider> & {
  chainId?
} {
  const defaultNetwork = useWeb3ReactCore<Web3Provider>(DefaultProviderName)
  return defaultNetwork
}

// returns null on errors
export function useContract(
  address: string | undefined,
  ABI: any,
  withSignerIfPossible = true
): Contract | null {
  const { library, account } = useActiveWeb3React()
  return useMemo(() => {
    if (!address || !ABI || !library) return null
    try {
      return getContract(
        address,
        ABI,
        library,
        withSignerIfPossible && account ? account : undefined
      )
    } catch (error) {
      console.error('Failed to get contract', error)
      return null
    }
  }, [address, ABI, library, withSignerIfPossible, account])
}