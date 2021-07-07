import React, { useState } from 'react'
import { useUserNFT, useNFTPrice, usePurchase } from 'src/hooks/nft'
import { useApprove } from 'src/hooks/token'

const NFTBox = () => {
  const nft = useUserNFT()
  const { price, token, contract } = useNFTPrice()
  const approve = useApprove(token, contract, price)
  const purchase = usePurchase()
  const [name, setName] = useState('')

  const approveAndPurchase = async () => {
    await approve()
    await purchase(name)
  }

  return (
    <div>
      {nft ? JSON.stringify(nft) : (
        <div>
          <input placeholder="Name" value={name} onChange={(e: any) => setName(e.target.value)} />
          <button disabled={name.length === 0} onClick={approveAndPurchase}>Purchase</button>
        </div>
      )}
    </div>
  )
}

export default NFTBox
