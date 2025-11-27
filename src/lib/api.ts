import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface StockAnalysis {
  ticker: string;
  price: number;
  price_change_percent: number;
  volume: number;
  volume_ratio: number;
  volatility: number;
  rsi: number;
  timestamp: string;
  anomaly_score: number;
  is_anomaly: boolean;
  severity?: string;
}

export interface ScanResponse {
  total_scanned: number;
  anomalies_found: number;
  stocks_analyzed: StockAnalysis[];
}

export interface Investigation {
  investigation_id: string;
  ticker: string;
  status: string;
  created_at: string;
  updated_at: string;
  explanation_found?: boolean;
  confidence?: number;
  root_cause?: string;
  quality?: string;
}

export const scanWatchlist = async (tickers: string[]): Promise<ScanResponse> => {
  const response = await api.post('/scan', { tickers });
  return response.data;
};

export const startInvestigation = async (ticker: string) => {
  const response = await api.post(`/investigate/${ticker}`);
  return response.data;
};

export const getInvestigationStatus = async (investigationId: string): Promise<Investigation> => {
  const response = await api.get(`/investigation/${investigationId}`);
  return response.data;
};

export const getInvestigationDetails = async (investigationId: string) => {
  const response = await api.get(`/investigation/${investigationId}/details`);
  return response.data;
};

export const listInvestigations = async () => {
  const response = await api.get('/investigations');
  return response.data;
};

export default api;
