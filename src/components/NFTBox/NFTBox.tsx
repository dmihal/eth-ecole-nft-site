import styled from 'styled-components'
import React, { useState } from 'react'
import { useUserNFT, useNFTPrice, usePurchase, useRename } from 'src/hooks/nft'
import { useApprove, useBalance } from 'src/hooks/token'
import CovidModal from './CovidModal'
import NameBox from './NameBox'

const BoxWrapper = styled.div`
  background-color: #FFF;
`

const NFTBox = () => {
  const nft = useUserNFT()
  const { price, token, contract } = useNFTPrice()
  const approve = useApprove(token, contract, price)
  const purchase = usePurchase()
  const [name, setName] = useState('')
  const balance = useBalance(token)
  const [loading, setLoading] = useState(false)
  const [modalPromises, setModalPromises] = useState<any>(null)
  const rename = useRename(nft?.id)

  const showCovidModal = () => {
    return new Promise((resolve, reject) => {
      const complete = () => {
        setModalPromises(null)
        resolve(null)
      }
      const cancel = () => {
        setModalPromises(null)
        reject('Cancelled')
      }
      setModalPromises({ cancel, complete })
    })
  }

  const approveAndPurchase = async () => {
    setLoading(true)
    try {
      await showCovidModal()
      await approve()
      await purchase(name)
    } catch (e) {
      console.warn(e)
    }
    setLoading(false)
  }


  return (
    <BoxWrapper>
      <CovidModal
        isOpen={!!modalPromises}
        onCancel={modalPromises?.cancel}
        onComplete={modalPromises?.complete}
      />
      
      {nft ? (
        <div style={{ display: 'flex' }}>
          <img src="/nft.png" style={{ width: 300 }} />
          <div>
            <div>NFT #{nft.id}</div>
            <NameBox name={nft.name} onChange={(newName: string) => rename(newName)} />
          </div>
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
    </BoxWrapper>
  )
}

export default NFTBox
