import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { useWeb3React } from '@web3-react/core'

import { CONTRACTS } from 'config'
import GAUGE_TOKEN_ABI from 'libs/abis/gauge-token.json'
import GAUGE_ABI from 'libs/abis/gauge.json'
import { isEmpty } from 'utils/helpers/utility'
import getPairDataPrefill from 'utils/helpers/getPairDataPrefill'
import GAUGE_INFO from 'utils/constants/gauge-info'

const useGauge = ({
  prices,
  gaugeProxyContract
}) => {
  const { library, account } = useWeb3React();
  const [gauges, setGauges] = useState([]);

  useEffect(() => {
    if (!isEmpty(gaugeProxyContract)) {
      getGaugeProxyInfo()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gaugeProxyContract])

  const getGaugeProxyInfo = async () => {
    try {
      // const iceQueenContract = new ethers.Contract(CONTRACTS.ICE_QUEEN, ICE_QUEEN_ABI, library.getSigner());
      const tokens = await gaugeProxyContract.tokens();
      const totalWeight = await gaugeProxyContract.totalWeight();

      const gaugeAddresses = await Promise.all(
        tokens.map((token) => {
          return gaugeProxyContract.getGauge(token);
        }),
      );

      const balancesUserInfosHarvestables = await Promise.all(
        tokens.flatMap((token, index) => {
          const { a, b } = GAUGE_INFO[token];
          const gaugeTokenContract = new ethers.Contract(token, GAUGE_TOKEN_ABI, library.getSigner());
          const aTokenContract = new ethers.Contract(a.address, GAUGE_TOKEN_ABI, library.getSigner());
          const bTokenContract = new ethers.Contract(b.address, GAUGE_TOKEN_ABI, library.getSigner());
          const gaugeContract = new ethers.Contract(gaugeAddresses[index], GAUGE_ABI, library.getSigner());

          return [
            gaugeProxyContract.weights(token),
            gaugeContract.rewardRate(),
            gaugeContract.derivedSupply(),
            gaugeContract.totalSupply(),
            gaugeTokenContract.balanceOf(account),
            gaugeContract.balanceOf(account),
            gaugeContract.earned(account),
            gaugeProxyContract.votes(account, token),
            gaugeProxyContract.usedWeights(account),
            aTokenContract.balanceOf(token),
            bTokenContract.balanceOf(token),
            gaugeTokenContract.totalSupply(),
            gaugeTokenContract.balanceOf(CONTRACTS.ICE_QUEEN),
          ];
        }),
      );

      const gauges = tokens.map((token, idx) => {
        const gaugeWeight = +balancesUserInfosHarvestables[idx * 13].toString();
        const rewardRate = +balancesUserInfosHarvestables[idx * 13 + 1].toString();
        const derivedSupply = +balancesUserInfosHarvestables[idx * 13 + 2].toString();
        const totalSupply = +balancesUserInfosHarvestables[idx * 13 + 3].toString();
        const balance = balancesUserInfosHarvestables[idx * 13 + 4];
        const staked = balancesUserInfosHarvestables[idx * 13 + 5];
        const harvestable = balancesUserInfosHarvestables[idx * 13 + 6];
        const userWeight = +balancesUserInfosHarvestables[idx * 13 + 7].toString();
        const userCurrentWeights = +balancesUserInfosHarvestables[idx * 13 + 8].toString();
        const numAInPairBN = balancesUserInfosHarvestables[idx * 13 + 9];
        const numBInPair = balancesUserInfosHarvestables[idx * 13 + 10];
        const totalSupplyBN = balancesUserInfosHarvestables[idx * 13 + 11];
        const iceQueenPairSupply = balancesUserInfosHarvestables[idx * 13 + 12];
        const rewardRatePerYear = derivedSupply
          ? (rewardRate / derivedSupply) * 3600 * 24 * 365
          : Number.POSITIVE_INFINITY;
        const { tokenName, poolName, icon } = GAUGE_INFO[token];
        const { totalValueOfPair, pricePerToken } = getPairDataPrefill(
          prices,
          token,
          numAInPairBN,
          numBInPair,
          totalSupplyBN
        );

        const numTokensInPool = parseFloat(ethers.utils.formatEther(iceQueenPairSupply));
        const valueStakedInGauge = pricePerToken * numTokensInPool;
        const fullApy = (rewardRatePerYear * prices['snowball']) / pricePerToken;

        return {
          allocPoint: gaugeWeight / totalWeight.toString() || 0,
          token,
          gaugeAddress: gaugeAddresses[idx],
          gaugeWeight,
          totalWeight: +totalWeight.toString(),
          userWeight,
          userCurrentWeights,
          rewardRate,
          derivedSupply,
          totalSupply,
          balance,
          staked,
          harvestable,
          depositTokenName: tokenName,
          poolName,
          icon,
          rewardRatePerYear,
          fullApy,
          usdPerToken: pricePerToken,
          totalValue: totalValueOfPair,
          valueStakedInGauge,
          numTokensInPool,
          //     depositToken: erc20.attach(gauge.token),
        };
      });

      console.log(gauges)
      setGauges(gauges)
    } catch (error) {
      console.log('[Error] gaugeProxyContract => ', error)
    }
  }

  return { gauges }
}

export default useGauge