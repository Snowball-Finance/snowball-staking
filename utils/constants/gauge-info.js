import { ethers } from 'ethers'
import { SNOWGLOBE_ABI, JOE_LP_ABI, PANGOLIN_LP_ABI, ERC20_ABI } from 'libs/abis'

const GAUGE_INFO = async (pool) => {
  const ethersProvider = new ethers.providers.Web3Provider(window.web3.currentProvider)
  const signer = ethersProvider.getSigner()

  let token_0, token_1, token_0_symbol, token_1_symbol, token_0_decimals, token_1_decimals, 
      token_name, pool_name, symbol, lp_symbol, vault
  const vaults = ['0xA42BE3dB9aff3aee48167b240bFEE5e1697e1281', 
                  '0xdE1A11C331a0E45B9BA8FeE04D4B51A745f1e4A4', 
                  '0xE730AFB0C84416e33f17a6C781e46E59C6780CC4']

  if (vaults.includes(pool)) {
    vault = true
    const TOKEN_ADDRESSES = {
      "DAI": "0xbA7dEebBFC5fA1100Fb055a87773e1E99Cd3507a",
      "TUSD": "0x1C20E891Bab6b1727d14Da358FAe2984Ed9B59EB",
      "FRAX": "0xDC42728B0eA910349ed3c6e1c9Dc06b5FB591f98",
      "USDT": "0xde3A24028580884448a5397872046a019649b084",
      "BUSD": "0xaEb044650278731Ef3DC244692AB9F64C78FfaEA"
    }
  
    const VAULT_CONTRACT = new ethers.Contract(pool, ERC20_ABI, signer)
    symbol = await VAULT_CONTRACT.symbol()
    let name = await VAULT_CONTRACT.name()
  
    let tokens = name.split(" ")[1].split("+")
  
    token_0 = TOKEN_ADDRESSES[tokens[0]]
    token_1 = TOKEN_ADDRESSES[tokens[1]]
  }
  else {
    const SNOWGLOBE_CONTRACT = new ethers.Contract(pool, SNOWGLOBE_ABI, signer)

    let g_symbol = await SNOWGLOBE_CONTRACT.symbol()
    let lp_address = await SNOWGLOBE_CONTRACT.token()
  
    let LP_TOKEN_CONTRACT
  
    switch (g_symbol) {
      case 'sPGL':
        LP_TOKEN_CONTRACT = new ethers.Contract(lp_address, PANGOLIN_LP_ABI, signer)
      case 'sJLP':
        LP_TOKEN_CONTRACT = new ethers.Contract(lp_address, JOE_LP_ABI, signer)
      default: //New networks can be added here in the future
        null
    }
  
    lp_symbol = await LP_TOKEN_CONTRACT.symbol()
    token_0 = await LP_TOKEN_CONTRACT.token0()
    token_1 = await LP_TOKEN_CONTRACT.token1()
  }

  const TOKEN_0_CONTRACT = new ethers.Contract(token_0, ERC20_ABI, signer)
  const TOKEN_1_CONTRACT = new ethers.Contract(token_1, ERC20_ABI, signer)
  token_0_symbol = await TOKEN_0_CONTRACT.symbol()
  token_1_symbol = await TOKEN_1_CONTRACT.symbol()
  token_0_decimals = await TOKEN_0_CONTRACT.decimals()
  token_1_decimals = await TOKEN_1_CONTRACT.decimals()


  if (vault) {
    token_name = symbol
    pool_name = `StableVault ${symbol} Pool`
  }
  else {
    token_name = `${lp_symbol} ${token_0_symbol}-${token_1_symbol}`
    pool_name = `${token_0_symbol}-${token_1_symbol} pool`
  }

  return {
    tokenName: token_name,
    poolName: pool_name,
    a: {
      address: token_0,
      priceId: token_0_symbol,
      decimals: token_0_decimals
    },
    b: {
      address: token_1,
      priceId: token_1_symbol,
      decimals: token_1_decimals
    }
  }
}

export default GAUGE_INFO;