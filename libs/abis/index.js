
import MAIN_GAUGE_PROXY_ABI from 'libs/abis/main/gauge-proxy.json'
import TEST_GAUGE_PROXY_ABI from 'libs/abis/test/gauge-proxy.json'
import MAIN_SNOWBALL_ABI from 'libs/abis/main/snowball.json'
import TEST_SNOWBALL_ABI from 'libs/abis/test/snowball.json'
import MAIN_SNOWCONE_ABI from 'libs/abis/main/snowcone.json'
import TEST_SNOWCONE_ABI from 'libs/abis/test/snowcone.json'
import MAIN_GAUGE_ABI from 'libs/abis/main/gauge.json'
import TEST_GAUGE_ABI from 'libs/abis/test/gauge.json'
import MAIN_GAUGE_TOKEN_ABI from 'libs/abis/main/gauge-token.json'
import TEST_GAUGE_TOKEN_ABI from 'libs/abis/test/gauge-token.json'
import MAIN_FEE_DISTRIBUTOR_ABI from 'libs/abis/main/fee-distributor.json'
import TEST_FEE_DISTRIBUTOR_ABI from 'libs/abis/test/fee-distributor.json'
import { IS_MAINNET } from 'config'

const GAUGE_PROXY_ABI = IS_MAINNET ? MAIN_GAUGE_PROXY_ABI : TEST_GAUGE_PROXY_ABI
const SNOWBALL_ABI = IS_MAINNET ? MAIN_SNOWBALL_ABI : TEST_SNOWBALL_ABI
const SNOWCONE_ABI = IS_MAINNET ? MAIN_SNOWCONE_ABI : TEST_SNOWCONE_ABI
const GAUGE_ABI = IS_MAINNET ? MAIN_GAUGE_ABI : TEST_GAUGE_ABI
const GAUGE_TOKEN_ABI = IS_MAINNET ? MAIN_GAUGE_TOKEN_ABI : TEST_GAUGE_TOKEN_ABI
const FEE_DISTRIBUTOR_ABI = IS_MAINNET ? MAIN_FEE_DISTRIBUTOR_ABI : TEST_FEE_DISTRIBUTOR_ABI

export {
    GAUGE_PROXY_ABI,
    SNOWBALL_ABI,
    SNOWCONE_ABI,
    GAUGE_ABI,
    GAUGE_TOKEN_ABI,
    FEE_DISTRIBUTOR_ABI
}