import React, { useState } from 'react'
import { useUserNFT, useNFTPrice, usePurchase } from 'src/hooks/nft'
import { useApprove, useBalance } from 'src/hooks/token'

const NFTBox = () => {
  const nft = useUserNFT()
  const { price, token, contract } = useNFTPrice()
  const approve = useApprove(token, contract, price)
  const purchase = usePurchase()
  const [name, setName] = useState('')
  const balance = useBalance(token)
  const [loading, setLoading] = useState(false)

  const approveAndPurchase = async () => {
    setLoading(true)
    try {
      await approve()
      await purchase(name)
    } catch (e) {
      console.warn(e)
    }
    setLoading(false)
  }

  return (
    <div>
      {nft ? (
        <div>
          {JSON.stringify(nft)}
          <img src="/nft.jpg" style={{ width: 300 }} />
        </div>
      ) : (
        <div>
          {balance === '0.0' && (
            <div>
              You need Polygon Dai to purchase this NFT.
            </div>
          )}
          <input placeholder="Name" value={name} onChange={(e: any) => setName(e.target.value)} />
          <button
            disabled={balance === null || balance === '0.0' || name.length === 0 || loading}
            onClick={approveAndPurchase}
          >
            Purchase
          </button>
        </div>
      )}
    </div>
  )
}

export default NFTBox
