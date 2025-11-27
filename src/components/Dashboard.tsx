"use client"

import { useState } from "react"
import {
  scanWatchlist,
  startInvestigation,
  getInvestigationStatus,
  type Investigation,
  type ScanResponse,
} from "../lib/api"
import { Search, AlertCircle, CheckCircle, Clock, Loader2, Activity } from "lucide-react"

export default function Dashboard() {
  const [watchlist, setWatchlist] = useState<string[]>(["AAPL", "MSFT", "GOOGL", "TSLA"])
  const [newTicker, setNewTicker] = useState("")
  const [scanResult, setScanResult] = useState<ScanResponse | null>(null)
  const [investigations, setInvestigations] = useState<Record<string, Investigation>>({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleAddTicker = () => {
    if (newTicker && !watchlist.includes(newTicker.toUpperCase())) {
      setWatchlist([...watchlist, newTicker.toUpperCase()])
      setNewTicker("")
    }
  }

  const handleRemoveTicker = (ticker: string) => {
    setWatchlist(watchlist.filter((t) => t !== ticker))
  }

  const handleScan = async () => {
    setLoading(true)
    setError(null)
    setScanResult(null)

    try {
      const result = await scanWatchlist(watchlist)
      setScanResult(result)

      if (result.stocks_analyzed.length === 0) {
        setError("Unable to fetch data for these stocks")
      }
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to scan watchlist")
      console.error("Scan error:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleInvestigate = async (ticker: string) => {
    try {
      const result = await startInvestigation(ticker)

      setInvestigations((prev) => ({
        ...prev,
        [ticker]: {
          investigation_id: result.investigation_id,
          ticker: ticker,
          status: "pending",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      }))

      pollInvestigation(result.investigation_id, ticker)
    } catch (err: any) {
      console.error("Investigation error:", err)
      alert(err.response?.data?.detail || "Failed to start investigation")
    }
  }

  const pollInvestigation = async (investigationId: string, ticker: string) => {
    const maxAttempts = 60
    let attempts = 0

    const poll = async () => {
      try {
        const status = await getInvestigationStatus(investigationId)

        setInvestigations((prev) => ({
          ...prev,
          [ticker]: status,
        }))

        if (status.status === "completed" || status.status === "failed") {
          return
        }

        attempts++
        if (attempts < maxAttempts) {
          setTimeout(poll, 5000)
        }
      } catch (err) {
        console.error("Polling error:", err)
      }
    }

    poll()
  }

  const getScoreColor = (score: number) => {
    if (score >= 7) return "text-red-400 font-bold"
    if (score >= 5) return "text-orange-400 font-semibold"
    if (score >= 3) return "text-yellow-400"
    return "text-green-400"
  }

  const getRSIStatus = (rsi: number) => {
    if (rsi < 30) return { text: "Oversold", color: "text-red-400" }
    if (rsi > 70) return { text: "Overbought", color: "text-orange-400" }
    return { text: "Normal", color: "text-green-400" }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-400" />
      case "failed":
        return <AlertCircle className="w-4 h-4 text-red-400" />
      case "in_progress":
        return <Loader2 className="w-4 h-4 text-blue-400" />
      default:
        return <Clock className="w-4 h-4 text-gray-400" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-50 mb-2">Market Anomaly Detection</h1>
          <p className="text-gray-400">AI-powered real-time market monitoring and investigation</p>
        </div>

        {/* Watchlist Management */}
        <div className="bg-gray-900 p-6 mb-8 border border-gray-800">
          <h2 className="text-xl font-semibold text-gray-50 mb-4">Watchlist</h2>

          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={newTicker}
              onChange={(e) => setNewTicker(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleAddTicker()}
              placeholder="Add ticker (e.g., AAPL)"
              className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 text-gray-50 placeholder-gray-500 focus:outline-none focus:border-cyan-500"
            />
            <button
              onClick={handleAddTicker}
              className="px-6 py-2 bg-cyan-600 text-gray-950 hover:bg-cyan-500 transition font-semibold"
            >
              Add
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {watchlist.map((ticker) => (
              <span
                key={ticker}
                className="px-3 py-1 bg-gray-800 text-cyan-400 border border-cyan-700 flex items-center gap-2"
              >
                {ticker}
                <button onClick={() => handleRemoveTicker(ticker)} className="text-cyan-400 hover:text-cyan-300">
                  ×
                </button>
              </span>
            ))}
          </div>

          <button
            onClick={handleScan}
            disabled={loading || watchlist.length === 0}
            className="w-full py-3 bg-green-600 hover:bg-green-500 disabled:bg-gray-700 disabled:cursor-not-allowed transition text-gray-950 font-semibold flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5" />
                Scanning...
              </>
            ) : (
              <>
                <Search className="w-5 h-5" />
                Scan Stocks
              </>
            )}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-950 border border-red-800 p-4 mb-8">
            <p className="text-red-300">{error}</p>
          </div>
        )}

        {/* Scan Results */}
        {scanResult && (
          <div className="bg-gray-900 p-6 mb-8 border border-gray-800">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-50 flex items-center gap-2">
                <Activity className="w-6 h-6" />
                Analysis Results
              </h2>
              <div className="text-sm text-gray-400">
                {scanResult.total_scanned} stocks analyzed | {scanResult.anomalies_found} anomalies found
              </div>
            </div>

            <div className="grid gap-4">
              {scanResult.stocks_analyzed.map((stock) => (
                <div
                  key={stock.ticker}
                  className={`border-2 p-6 transition ${
                    stock.is_anomaly ? "border-red-700 bg-gray-900" : "border-gray-800 bg-gray-900"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <h3 className="text-2xl font-bold text-gray-50">{stock.ticker}</h3>
                        {stock.is_anomaly && (
                          <span className="px-3 py-1 bg-red-900 text-red-100 text-xs font-semibold uppercase border border-red-700">
                            {stock.severity}
                          </span>
                        )}
                        <span className={`text-xl ${getScoreColor(stock.anomaly_score)}`}>
                          Score: {stock.anomaly_score}/9
                        </span>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-400 mb-1">Price</p>
                          <p className="text-lg font-bold text-gray-50">${stock.price.toFixed(2)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400 mb-1">Change</p>
                          <p
                            className={`text-lg font-bold ${
                              stock.price_change_percent < 0 ? "text-red-400" : "text-green-400"
                            }`}
                          >
                            {stock.price_change_percent > 0 && "+"}
                            {stock.price_change_percent.toFixed(2)}%
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400 mb-1">Volume Ratio</p>
                          <p className="text-lg font-semibold text-gray-50">{stock.volume_ratio.toFixed(1)}x</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400 mb-1">RSI</p>
                          <p className={`text-lg font-semibold ${getRSIStatus(stock.rsi).color}`}>
                            {stock.rsi.toFixed(1)}
                            <span className="text-xs ml-1">({getRSIStatus(stock.rsi).text})</span>
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400 mb-1">Volatility</p>
                          <p className="text-lg font-semibold text-gray-50">{stock.volatility.toFixed(2)}%</p>
                        </div>
                      </div>

                      {investigations[stock.ticker] && (
                        <div className="mt-4 p-4 bg-gray-800 border border-gray-700">
                          <div className="flex items-center gap-2 mb-2">
                            {getStatusIcon(investigations[stock.ticker].status)}
                            <span className="font-semibold text-gray-50">
                              Investigation: {investigations[stock.ticker].status}
                            </span>
                          </div>

                          {investigations[stock.ticker].status === "completed" && (
                            <div className="mt-3 space-y-2">
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-gray-300">Confidence:</span>
                                <span className="text-lg font-bold text-green-400">
                                  {((investigations[stock.ticker].confidence || 0) * 100).toFixed(0)}%
                                </span>
                              </div>
                              <div>
                                <span className="font-medium text-gray-300">Root Cause:</span>
                                <p className="mt-1 text-gray-300">{investigations[stock.ticker].root_cause}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {stock.is_anomaly && (
                      <button
                        onClick={() => handleInvestigate(stock.ticker)}
                        disabled={!!investigations[stock.ticker]}
                        className="px-4 py-2 bg-red-600 hover:bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition font-medium text-gray-50"
                      >
                        {investigations[stock.ticker] ? "Investigating..." : "Investigate"}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
