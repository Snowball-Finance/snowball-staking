import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { useWeb3React } from '@web3-react/core'
import detectEthereumProvider from '@metamask/detect-provider'
import Web3 from 'web3'

import { CONTRACTS } from 'config'
import { GAUGE_TOKEN_ABI, GAUGE_ABI } from 'libs/abis'
import { isEmpty, delay } from 'utils/helpers/utility'
import getPairDataPrefill from 'utils/helpers/getPairDataPrefill'
import GAUGE_INFO from 'utils/constants/gauge-info'

const useGauge = ({
  prices,
  gaugeProxyContract,
  setLoading
}) => {
  const { library, account } = useWeb3React()
  const [gauges, setGauges] = useState([])

  useEffect(() => {
    if (!isEmpty(gaugeProxyContract) && !isEmpty(prices)) {
      getGaugeProxyInfo()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prices, gaugeProxyContract])

  const getGaugeProxyInfo = async () => {
    try {
      const tokens = await gaugeProxyContract.tokens()
      const totalWeight = await gaugeProxyContract.totalWeight()

      // add any denylist item here
      const approve = token => {
        return token != 0x53B37b9A6631C462d74D65d61e1c056ea9dAa637 
      }
      const approvedTokens = tokens.filter(approve) 

      const gaugeAddresses = await Promise.all(
        approvedTokens.map((token) => {
          return gaugeProxyContract.getGauge(token)
        }),
      )

      const balancesUserInfosHarvestables = await Promise.all(
        approvedTokens.map(async (token, index) => {
          const { a, b } = await GAUGE_INFO(token)
          const gaugeTokenContract = new ethers.Contract(token, GAUGE_TOKEN_ABI, library.getSigner())
          const aTokenContract = new ethers.Contract(a.address, GAUGE_TOKEN_ABI, library.getSigner())
          const bTokenContract = new ethers.Contract(b.address, GAUGE_TOKEN_ABI, library.getSigner())
          const gaugeContract = new ethers.Contract(gaugeAddresses[index], GAUGE_ABI, library.getSigner())

          let gaugeWeight = await gaugeProxyContract.weights(token)
          let rewardRate = await gaugeContract.rewardRate()
          let derivedSupply = await gaugeContract.derivedSupply()
          let totalSupply = await gaugeContract.totalSupply()
          let balance = await gaugeTokenContract.balanceOf(account)
          let staked = await gaugeContract.balanceOf(account)
          let harvestable = await gaugeContract.earned(account)
          let userWeight = await gaugeProxyContract.votes(account, token)
          let userCurrentWeights = await gaugeProxyContract.usedWeights(account)
          let numAInPairBN = await aTokenContract.balanceOf(token)
          let numBInPair = await bTokenContract.balanceOf(token)
          let totalSupplyBN = await gaugeTokenContract.totalSupply()
          let iceQueenPairSupply = await gaugeTokenContract.balanceOf(CONTRACTS.ICE_QUEEN)

          return {
            gaugeWeight: gaugeWeight || 0,
            rewardRate: rewardRate || 0,
            derivedSupply: derivedSupply || 0,
            totalSupply: totalSupply || 0,
            balance: balance || 0,
            staked: staked || 0,
            harvestable: harvestable || 0,
            userWeight: userWeight || 0,
            userCurrentWeights: userCurrentWeights || 0,
            numAInPairBN: numAInPairBN || 0,
            numBInPair: numBInPair || 0,
            totalSupplyBN: totalSupplyBN || 0,
            iceQueenPairSupply: iceQueenPairSupply || 0,
            a: a,
            b: b
          }
        }),
      )

      const gauges = await Promise.all(
        approvedTokens.map(async (token, idx) => {
        const address = gaugeAddresses[idx]
        const gauge_infos = balancesUserInfosHarvestables[idx]
        const rewardRatePerYear = gauge_infos.derivedSupply
          ? (gauge_infos.rewardRate / gauge_infos.derivedSupply) * 3600 * 24 * 365
          : Number.POSITIVE_INFINITY

        const { tokenName, poolName } = await GAUGE_INFO(token)
        const { totalValueOfPair, pricePerToken } = getPairDataPrefill(
          prices,
          token,
          gauge_infos.numAInPairBN,
          gauge_infos.numBInPair,
          gauge_infos.totalSupplyBN
        )

        const fullApy = (rewardRatePerYear * prices['snowball']) / pricePerToken

        return {
          allocPoint: gauge_infos.gaugeWeight / totalWeight.toString() || 0,
          token,
          address,
          gaugeAddress: address,
          gaugeWeight: gauge_infos.gaugeWeight,
          totalWeight: +totalWeight.toString(),
          userWeight: gauge_infos.userWeight,
          userCurrentWeights: gauge_infos.userCurrentWeights,
          rewardRate: gauge_infos.rewardRate,
          derivedSupply: gauge_infos.derivedSupply,
          totalSupply: gauge_infos.totalSupply,
          balance: gauge_infos.balance,
          staked: gauge_infos.staked,
          harvestable: gauge_infos.harvestable,
          depositTokenName: tokenName,
          poolName,
          rewardRatePerYear,
          fullApy,
          usdPerToken: pricePerToken,
          totalValue: totalValueOfPair,
          a: gauge_infos.a,
          b: gauge_infos.b
        }
      }))

      setGauges(gauges)
    } catch (error) {
      console.log('[Error] gaugeProxyContract => ', error)
    }
  }

  const voteFarms = async (tokens, weights) => {
    setLoading(true)
    try {
      let loop = true
      let tx = null
      const ethereumProvider = await detectEthereumProvider()
      const web3 = new Web3(ethereumProvider)

      const weightsData = weights.map((weight) => ethers.BigNumber.from(weight))
      const gasLimit = await gaugeProxyContract.estimateGas.vote(
        tokens,
        weightsData,
      )
      const { hash } = await gaugeProxyContract.vote(
        tokens,
        weightsData,
        { gasLimit },
      )

      while (loop) {
        tx = await web3.eth.getTransactionReceipt(hash)
        if (isEmpty(tx)) {
          await delay(300)
        } else {
          loop = false
        }
      }

      if (tx.status) {
        await getGaugeProxyInfo()
      }
    } catch (error) {
      console.log('[Error] vote => ', error)
    }
    setLoading(false)
  }

  return {
    gauges,
    voteFarms
  }
}

export default useGauge