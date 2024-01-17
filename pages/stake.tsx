import {
    ConnectWallet,
    MediaRenderer,
    Web3Button,
    useAddress,
    useContract,
    useContractMetadata,
    useContractRead,
  } from "@thirdweb-dev/react";
  import { NFT_CONTRACT_ADDRESS } from "../consts/addresses";
  import styles from "../styles/Home.module.css";
  import { NextPage } from "next";
  import { use, useEffect, useState } from "react";
  import NFTCard from "../components/NFTCard";
  import { BigNumber } from "ethers/lib/ethers";
import { ethers } from "ethers";
  
  const Home: NextPage = () => {
    const address = useAddress();
    const stakingAddress = "0x2981C1F0501a7ed9fA61CD889327e9c5a75974fF";
    const ereniumAddress = "0x3aCcC520d703519A3adFd427E66BD95ba26795Bb";
    const { contract: stakingContract } = useContract(stakingAddress);
    const { contract: ereniumContract } = useContract(ereniumAddress, "nft-drop");
    const { contract } = useContract(NFT_CONTRACT_ADDRESS);
    const { data: contractMetadata } = useContractMetadata(contract);
    const { data: stakedERNNFTs} = useContractRead(stakingContract, "getStakeInfo",);
    async function stakeNFT(nftId: string) {
      
  if(!address) return;
  
  const isApproved = await ereniumContract?.isApproved(
    address,
    stakingAddress
  );
  
  if(!isApproved) {
  
  await ereniumContract?.setApprovalForAll(stakingAddress, true);
  
  
  }
  
  await stakingContract?.call("stake", [nftId])
  
    }
  
  
  const nft = {
  
    metadata: {
      id: "0",
    },
  
  };
  
  const [claimableRewards, setClaimableRewards] = useState<BigNumber>();

  useEffect(() => {
    if (!stakingContract || !address) return;
  
    async function loadClaimableRewards() {
      const stakeInfo = await stakingContract?.call("getStakeInfo", [address]);
      setClaimableRewards(stakeInfo[1]);
    }
  
    loadClaimableRewards();
  }, [address, stakingContract]);
  




    return (
      <div className={styles.container}>
        {address ? (
          <div className={styles.nftClaim}>
            <MediaRenderer
              src={contractMetadata?.image}
              width="auto"
              height="60%"
              style={{
                borderRadius: "20px",
                maxWidth: "500px",
              }}
            />
            <h1>{contractMetadata?.name}</h1>
  
            <Web3Button
            contractAddress={stakingAddress}
            action={() => stakeNFT(nft.metadata.id) }
            >STAKE ERN</Web3Button>
  
          </div>
        ) : (
          <div className={styles.loginContainer}>
            <ConnectWallet btnTitle="Login" />
          </div>
        )}
  
  <h1>Staked ERN:</h1>
  <div>
    {stakedERNNFTs && stakedERNNFTs[0].map((stakedNFT: BigNumber) => (
  <div key={stakedNFT.toString()}>
  <NFTCard tokenId={stakedNFT.toNumber()} />
  </div>
    ))}
  </div>
  
  <br />
  <h1>Claimable $ERN:</h1>
{!claimableRewards ? "Loading..." : ethers.utils.formatUnits(claimableRewards, 18)}
<Web3Button
 contractAddress={stakingAddress}
 action={(stakingContract) => stakingContract.call("claimRewards")}
>Claim $ERN</Web3Button>
      </div>
    );
  };
  
  export default Home;
  