import { useEffect, useState } from 'react'
import { useWalletWeb3React } from './web3'
import { Contract } from '@ethersproject/contracts'
import { useContract, useActiveWeb3React } from './web3'
import { NFT_ADDRESSES, NFT_ABI } from '../constants'

function useNFTContract(): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(
    chainId ? NFT_ADDRESSES[chainId] : undefined,
    NFT_ABI,
    true
  )
}

export function useUserNFT() {
  const [nft, setNFT] = useState<any>(null)
  const { account } = useWalletWeb3React()
  const contract = useNFTContract()

  useEffect(() => {
    const loadNFT = () => {
      contract && contract.addressToNFT(account).then(async (id) => {
        if (id.toString() !== '0') {
          const name = await contract.nftName(id)
          setNFT({ id: id.toString(), name })
        } else {
          setNFT(null)
        }
      })
    }
    loadNFT();

    const timeout = setInterval(loadNFT, 5000)

    return () => clearInterval(timeout)
  }, [account, contract])

  return nft;
}

export function useNFTPrice() {
  const contract = useNFTContract()
  const [price, setPrice] = useState<any>({ price: null, token: null, contract: contract.address })

  useEffect(() => {
    contract && Promise.all([contract.purchasePrice(), contract.paymentToken()])
      .then(([price, token]) => setPrice((p: any) => ({ ...p, price, token })))
  }, [contract])

  return price;
}

export function usePurchase() {
  const { account } = useWalletWeb3React()
  const contract = useNFTContract()

  return async (name: string) => {
    const tx = await contract.purchase(account, name)
    await tx.wait()
  }
}

export function useRename(id: string) {
  const contract = useNFTContract()

  if (!id) {
    return async () => null
  }

  return async (newName: string) => {
    const tx = await contract.rename(id, newName)
    await tx.wait()
  }
}
