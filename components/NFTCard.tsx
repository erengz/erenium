import { FC } from 'react';
import { ThirdwebNftMedia, useContract, useNFT, Web3Button } from '@thirdweb-dev/react';


interface NFTCardProps {
    tokenId: number;

}

const NFTCard: FC<NFTCardProps> = ({ tokenId }) => {
    const stakingAddress = "0x2981C1F0501a7ed9fA61CD889327e9c5a75974fF";
    const ereniumAddress = "0x3aCcC520d703519A3adFd427E66BD95ba26795Bb";

    const { contract: stakingContract } = useContract(stakingAddress);
    const { contract: ereniumContract } = useContract(ereniumAddress, "nft-drop");

    const{ data: nft } =useNFT(ereniumContract, tokenId);

async function withdraw(nftId: string) {
    await stakingContract?.call("withdraw", [nftId]);

}


   return (
<>

{nft && (
<div>
    <h3>{nft.metadata.name}</h3>
    {nft.metadata && (
<ThirdwebNftMedia
 metadata ={nft.metadata}
 />
    )}
    <Web3Button
        contractAddress={stakingAddress}
        action={() =>  withdraw(nft.metadata.id)}       
        >Withdraw</Web3Button>
</div>

)}

</>


   )
}
export default NFTCard;