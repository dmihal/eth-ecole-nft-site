import Countdown from 'react-countdown'
import ConnectWalletButton from 'src/components/ConnectWalletButton'
import NFTBox from 'src/components/NFTBox'
import { useWalletWeb3React } from 'src/hooks/web3'
import HeadlineSection from 'src/components/HeadlineSection'
import InfoSection from 'src/components/InfoSection'
import { switchToPolygon } from '../utils/web3'

export default function Home() {
  const { active: isConnected, chainId } = useWalletWeb3React()

  return (
    <div>
      <HeadlineSection />
      <div>
        <Countdown
          date={new Date('2021-07-13T14:00:00.000Z')}
          renderer={({ hours, minutes, seconds }: any) => `${hours}:${minutes}:${seconds}`}
        />
      </div>
      <div>Ticket sales start at Tuesday 13 / July 2pm UTC</div>
      <div>Make sure you have Dai on Polygon to buy your tickets!</div>
    </div>
  )

  return (
    <div>
      <HeadlineSection />
      <ConnectWalletButton />
      {isConnected ? (
        <div>
          {chainId == '5' || chainId == '137' ? <NFTBox /> : (
            <div>
              <div>Switch your network to Polygon</div>
              <button onClick={switchToPolygon}>Add Polygon</button>
            </div>
          )}
        </div>
      ) : (
        <div>
        </div>
      )}
      <InfoSection />
    </div>
  );
}
