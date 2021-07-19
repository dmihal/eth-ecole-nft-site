import { Contract } from '@ethersproject/contracts'
import { useContract, useActiveWeb3React } from './web3'
import { DONATION_ADDRESSES, DONATION_ABI } from '../constants'
import { ethers } from 'ethers'

function useDonationContract(): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(
    chainId ? DONATION_ADDRESSES[chainId] : undefined,
    DONATION_ABI,
    true
  )
}

export function useDonate() {
  const contract = useDonationContract()

  return async (amount: string, name: string) => {
    const tx = await contract.purchase(ethers.utils.parseEther(amount), name)
    await tx.wait()
  }
}

export function useDonationAddress() {
  const { chainId } = useActiveWeb3React()
  return chainId ? DONATION_ADDRESSES[chainId] : undefined;
}
