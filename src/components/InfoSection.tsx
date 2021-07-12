import styled from 'styled-components'

import { _Wrapper, _Container } from './styles'

export const Title = styled.h2`
  margin: 2em 0em 0.5em 0em;
`

const Paragraph = styled.p`
  margin: 2px 0;
`

const InfoSection = () => {
  return (
    <div>
      <Title>How it works</Title>
      <Paragraph>
        The ticket is a Polygon NFT. To purchase your ticket you'll need to switch to Polygon, and purchase the NFT using Polygon Dai. The price for the ticket is 10DAI, which gives you one entry to the conference.
      </Paragraph>
      <Paragraph>
        To enter the conference, we'll use the name you added to you NFT for reference. Make sure this is the same as your ID. If you transfer this ticket to someone else, they can use this site and change the name.
      </Paragraph>
    </div>
  )
}

export default InfoSection
