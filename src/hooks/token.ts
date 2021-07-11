import { useState, useEffect } from 'react';
import { Contract } from '@ethersproject/contracts'
import { useContract, useActiveWeb3React } from './web3'
import { ethers } from 'ethers'

const ERC20_ABI = [
  'function balanceOf(address owner) external view returns (uint256)',
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

export function useBalance(token: string) {
  const [balance, setBalance] = useState<null | string>(null)
  const contract = useTokenContract(token)
  const { account } = useActiveWeb3React()

  useEffect(() => {
    let timer: any;
    const updateBalance = async () => {
      const balance = await contract.balanceOf(account)
      console.log(ethers.utils.formatEther(balance))
      setBalance(ethers.utils.formatEther(balance))
      timer = setTimeout(updateBalance, 5000)
    }
    console.log({contract})
    if (contract) {
      updateBalance()
    }

    return () => {
      if (timer) {
        clearTimeout(timer)
      }
    }
  }, [contract, account]);

  return balance;
}
