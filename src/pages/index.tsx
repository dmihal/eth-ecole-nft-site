import ConnectWalletButton from 'src/components/ConnectWalletButton'
import NFTBox from 'src/components/NFTBox'
import { useWalletWeb3React } from 'src/hooks/web3'
import HeadlineSection from 'src/components/HeadlineSection'
import InfoSection from 'src/components/InfoSection'

export default function Home() {
  const { active: isConnected, chainId } = useWalletWeb3React()

  return (
    <div>
      <HeadlineSection />
      <ConnectWalletButton />
      {isConnected ? (
        <div>
          {chainId == '5' || chainId == '137' ? <NFTBox /> : 'Please switch to Polygon'}
        </div>
      ) : (
        <div>
        </div>
      )}
      <InfoSection />
    </div>
  );
}
