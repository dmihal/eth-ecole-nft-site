import React from 'react'
import { useUserNFT, useNFTPrice, usePurchase } from 'src/hooks/nft'
import { useApprove } from 'src/hooks/token'

const NFTBox = () => {
  const nft = useUserNFT()
  const { price, token, contract } = useNFTPrice()
  const approve = useApprove(token, contract, price)
  const purchase = usePurchase()

  const approveAndPurchase = async () => {
    await approve()
    await purchase('Test')
  }

  return (
    <div>
      {nft ? JSON.stringify(nft) : (
        <button onClick={approveAndPurchase}>Purchase</button>
      )}
    </div>
  )
}

export default NFTBox
