import styled from 'styled-components'
import ConnectWalletButton from 'src/components/ConnectWalletButton'
import NFTBox from 'src/components/NFTBox'
import { useWalletWeb3React } from 'src/hooks/web3'

const Title = styled.h1`
  color: red;
  font-size: 50px;
`

export default function Home() {
  const { active: isConnected, chainId } = useWalletWeb3React()

  return (
    <div>
      {isConnected ? (
        <div>
          {chainId == '5' || chainId == '137' ? <NFTBox /> : 'Please switch to Polygon'}
        </div>
      ) : (
        <div>
          <ConnectWalletButton />
        </div>
      )}
    </div>
  );
}
