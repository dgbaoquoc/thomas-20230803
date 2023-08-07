export interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number | null;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi: object | null;
  last_updated: string;
  sparkline_in_7d: {
    price: number[];
  };
  price_change_percentage_1h_in_currency: number;
  price_change_percentage_24h_in_currency: number;
  price_change_percentage_7d_in_currency: number;
  market_data: {
    market_cap_rank: number;
    current_price: {
      usd: number;
    };
    market_cap: {
      usd: number;
    };
    total_volume: {
      usd: number;
    };
    low_24h: {
      usd: number;
    };
    high_24h: {
      usd: number;
    };
    low_7d: {
      usd: number;
    };
    high_7d: {
      usd: number;
    };
    ath: {
      usd: number;
    };
    ath_date: {
      usd: string;
    };
    atl: {
      usd: number;
    };
    atl_string: {
      usd: Date;
    };
    price_change_24h: number;
    price_change_percentage_24h: number;
    price_change_percentage_7d: number;
    price_change_percentage_14d: number;
    price_change_percentage_30d: number;
    price_change_percentage_60d: number;
    price_change_percentage_200d: number;
    price_change_percentage_1y: number;
  };
  price_change_percentage_7d: number;
  price_change_percentage_30d: number;
}

export type CoinTab = {
  title: string;
  value: "overview" | "market" | "about";
  disabled: boolean;
};

export interface TrendingCoin {
  id: string;
  name: string;
  market_cap_rank: number;
  thumb: string;
  symbol: string;
}

export interface GlobalData {
  active_cryptocurrencies: number;
  markets: number;
  total_market_cap: {
    usd: number;
  };
  total_volume: {
    usd: number;
  };
  market_cap_change_percentage_24h_usd: number;
}
