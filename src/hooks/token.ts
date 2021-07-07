import { Contract } from '@ethersproject/contracts'
import { useContract } from './web3'

const ERC20_ABI = [
  'function approve(address spender, uint256 amount) external',
]

function useTokenContract(address: string): Contract | null {
  return useContract(address, ERC20_ABI, true)
}

export function useApprove(address: string, spender: string, amount: any) {
  const contract = useTokenContract(address)

  return async () => {
    if (contract) {
      const tx = await contract.approve(spender, amount)
      await tx.wait()
    }
  }
}

