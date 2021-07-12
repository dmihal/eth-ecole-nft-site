import styled from 'styled-components'
import React, { useState } from 'react'
import { useUserNFT, useNFTPrice, usePurchase, useRename } from 'src/hooks/nft'
import { useApprove, useBalance } from 'src/hooks/token'
import CovidModal from './CovidModal'
import NameBox from './NameBox'

const BoxWrapper = styled.div`
  background-color: #FFF;
`

const NFTDisplayContainer = styled.div`
  display: flex;

  @media (max-width: 700px) {
    flex-direction: column;
  }
`

const NFTImg = styled.img`
  flex: 1;
  max-width: 50%;
`

const NFTData = styled.div`
  flex: 1;
  padding: 8px;
`

const Title = styled.h2`
  margin: 4px 0;
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
        <NFTDisplayContainer>
          <NFTImg src="/nft.png" />
          <NFTData>
            <Title>NFT #{nft.id}</Title>
            <NameBox name={nft.name} onChange={(newName: string) => rename(newName)} />
          </NFTData>
        </NFTDisplayContainer>
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
