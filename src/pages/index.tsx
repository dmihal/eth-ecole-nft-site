import ConnectWalletButton from 'src/components/ConnectWalletButton'
import NFTBox from 'src/components/NFTBox'
import { useWalletWeb3React } from 'src/hooks/web3'

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
