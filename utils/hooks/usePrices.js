import { useState, useEffect } from 'react'
import CoinGecko from 'coingecko-api'

const usePrices = () => {
  const [prices, setPrices] = useState({});

  useEffect(() => {
    const getPrices = async () => {
      const CoinGeckoClient = new CoinGecko();
      const { data: response } = await CoinGeckoClient.simple.price({
        ids: [
          'snowball-token',
          'pangolin',
          'wrapped-avax'
        ],
        vs_currencies: ['usd'],
      });

      const prices = {
        snowball: response['snowball-token']?.usd || 0,
        png: response['pangolin']?.usd || 0,
        wavax: response['wrapped-avax']?.usd || 0,
      };
      setPrices(prices);
    };

    getPrices();
    setInterval(() => getPrices(), 120000);
  }, []);

  return { prices }
}

export default usePrices;