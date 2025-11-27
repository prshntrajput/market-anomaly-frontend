import { Terminal, Activity, Search, FileText, Zap, CheckCircle } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-950">
      <div className="bg-gray-900 text-gray-50 py-16 border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Market Anomaly Detection Agent</h1>
          <p className="text-xl text-gray-400">
            AI-powered real-time stock market monitoring and root cause investigation
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* What is this */}
        <section className="bg-gray-900 p-8 mb-8 border border-gray-800">
          <div className="flex items-center gap-3 mb-6">
            <Activity className="w-8 h-8 text-cyan-400" />
            <h2 className="text-3xl font-bold text-gray-50">What is this project?</h2>
          </div>
          <div className="space-y-4 text-gray-300">
            <p className="text-lg">
              This is a full-stack <strong>Market Anomaly Detection Agent</strong> that combines real-time market data
              analysis with AI-powered investigation capabilities.
            </p>
            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <div className="border-l-4 border-cyan-500 pl-4">
                <h3 className="font-semibold text-lg mb-2 text-gray-50">Monitors</h3>
                <p className="text-sm text-gray-400">
                  Tracks multiple stocks simultaneously using multi-factor analysis
                </p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="font-semibold text-lg mb-2 text-gray-50">Detects</h3>
                <p className="text-sm text-gray-400">
                  Identifies unusual market behavior like price crashes and volume spikes
                </p>
              </div>
              <div className="border-l-4 border-red-500 pl-4">
                <h3 className="font-semibold text-lg mb-2 text-gray-50">Investigates</h3>
                <p className="text-sm text-gray-400">
                  Uses AI to find root causes through web search and evidence analysis
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CLI Usage */}
        <section className="bg-gray-900 p-8 mb-8 border border-gray-800">
          <div className="flex items-center gap-3 mb-6">
            <Terminal className="w-8 h-8 text-green-400" />
            <h2 className="text-3xl font-bold text-gray-50">Using the CLI</h2>
          </div>

          <div className="space-y-6">
            {/* Prerequisites */}
            <div>
              <h3 className="text-xl font-semibold mb-3 text-gray-50">Prerequisites</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Python 3.10 or higher installed</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Backend repository cloned</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Virtual environment created and dependencies installed</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>.env file configured with API keys (Google Gemini, Tavily)</span>
                </li>
              </ul>
            </div>

            {/* Installation */}
            <div>
              <h3 className="text-xl font-semibold mb-3 text-gray-50">Installation</h3>
              <div className="bg-gray-800 text-green-400 p-4 overflow-x-auto border border-gray-700">
                <pre className="text-sm">
                  {`# Clone the repository
git clone <repository-url>
cd market-anomaly-agent

# Create virtual environment
python -m venv .venv

# Activate virtual environment
# On Linux/Mac:
source .venv/bin/activate
# On Windows:
.venv\\Scripts\\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file and add API keys
GOOGLE_API_KEY=your_gemini_api_key
TAVILY_API_KEY=your_tavily_api_key`}
                </pre>
              </div>
            </div>

            {/* Basic Usage */}
            <div>
              <h3 className="text-xl font-semibold mb-3 text-gray-50">Basic Usage</h3>
              <p className="text-gray-300 mb-3">Monitor stocks with a single scan:</p>
              <div className="bg-gray-800 text-green-400 p-4 border border-gray-700">
                <pre className="text-sm">{`python main.py --watchlist AAPL MSFT GOOGL TSLA`}</pre>
              </div>
              <div className="mt-4 p-4 bg-gray-800 border-l-4 border-cyan-500">
                <p className="text-sm text-gray-300">
                  <strong>Output:</strong> For each stock, you will see price, percentage change, volume ratio,
                  volatility, RSI, and an anomaly score (0-9). Stocks with score 5 or higher trigger investigations.
                </p>
              </div>
            </div>

            {/* Continuous Mode */}
            <div>
              <h3 className="text-xl font-semibold mb-3 text-gray-50">Continuous Monitoring</h3>
              <p className="text-gray-300 mb-3">Run in continuous mode (scans every 5 minutes):</p>
              <div className="bg-gray-800 text-green-400 p-4 border border-gray-700">
                <pre className="text-sm">{`python main.py --watchlist AAPL MSFT GOOGL --continuous`}</pre>
              </div>
              <p className="text-sm text-gray-400 mt-2">Press Ctrl+C to stop the monitoring loop.</p>
            </div>

            {/* Example Output */}
            <div>
              <h3 className="text-xl font-semibold mb-3 text-gray-50">Example Output</h3>
              <div className="bg-gray-800 text-gray-300 p-4 overflow-x-auto border border-gray-700">
                <pre className="text-sm">
                  {`📊 Analyzing AAPL...
   💰 Price: $277.55 (+0.21%)
   📈 Volume: 0.66x average
   🎲 Volatility: 1.22%
   📊 RSI: 63.0
   ✅ Normal (Score: 0/9)

📊 Analyzing TSLA...
   💰 Price: $265.00 (-14.50%)
   📈 Volume: 6.2x average
   🎲 Volatility: 3.85%
   📊 RSI: 28.5
   🚨 ANOMALY DETECTED! (Score: 7/9)
   Reasons: Large price move: -14.50%, Volume spike: 6.2x, Extreme RSI: 28.5`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* How Detection Works */}
        <section className="bg-gray-900 p-8 mb-8 border border-gray-800">
          <div className="flex items-center gap-3 mb-6">
            <Zap className="w-8 h-8 text-yellow-400" />
            <h2 className="text-3xl font-bold text-gray-50">How Anomaly Detection Works</h2>
          </div>

          <p className="text-gray-300 mb-6">The system uses a multi-factor scoring approach to identify anomalies:</p>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Factor Cards */}
            <div className="border-2 border-red-700 bg-gray-800 p-5">
              <h3 className="font-bold text-lg mb-2 text-red-400">Price Change</h3>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>&gt;10% change = +3 points</li>
                <li>5-10% change = +2 points</li>
                <li>2-5% change = +1 point</li>
              </ul>
            </div>

            <div className="border-2 border-orange-700 bg-gray-800 p-5">
              <h3 className="font-bold text-lg mb-2 text-orange-400">Volume Spike</h3>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>&gt;5x average = +2 points</li>
                <li>3-5x average = +1 point</li>
              </ul>
            </div>

            <div className="border-2 border-yellow-700 bg-gray-800 p-5">
              <h3 className="font-bold text-lg mb-2 text-yellow-400">Volatility</h3>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>&gt;2% volatility = +1 point</li>
              </ul>
            </div>

            <div className="border-2 border-purple-700 bg-gray-800 p-5">
              <h3 className="font-bold text-lg mb-2 text-purple-400">RSI (Relative Strength Index)</h3>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>RSI &lt;30 (oversold) = +1 point</li>
                <li>RSI &gt;70 (overbought) = +1 point</li>
              </ul>
            </div>

            <div className="border-2 border-cyan-700 bg-gray-800 p-5">
              <h3 className="font-bold text-lg mb-2 text-cyan-400">Price Gap</h3>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>&gt;3% gap between open and previous close = +1 point</li>
              </ul>
            </div>

            <div className="border-2 border-green-700 bg-gray-800 p-5">
              <h3 className="font-bold text-lg mb-2 text-green-400">Final Decision</h3>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>Total score &ge; 5 = ANOMALY</li>
                <li>Total score &lt; 5 = NORMAL</li>
              </ul>
            </div>
          </div>
        </section>

        {/* AI Investigation */}
        <section className="bg-gray-900 p-8 mb-8 border border-gray-800">
          <div className="flex items-center gap-3 mb-6">
            <Search className="w-8 h-8 text-purple-400" />
            <h2 className="text-3xl font-bold text-gray-50">AI-Powered Investigation</h2>
          </div>

          <p className="text-gray-300 mb-6">
            When an anomaly is detected, the system can automatically investigate the root cause:
          </p>

          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-cyan-600 text-gray-50 font-bold flex items-center justify-center">
                1
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1 text-gray-50">Generate Search Queries</h3>
                <p className="text-gray-400 text-sm">
                  Uses Chain-of-Thought reasoning, expert role prompts, and meta-optimization to create targeted search
                  queries
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-cyan-600 text-gray-50 font-bold flex items-center justify-center">
                2
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1 text-gray-50">Web Search</h3>
                <p className="text-gray-400 text-sm">
                  Executes searches using Tavily API to find relevant news, filings, and reports
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-cyan-600 text-gray-50 font-bold flex items-center justify-center">
                3
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1 text-gray-50">Evaluate Evidence</h3>
                <p className="text-gray-400 text-sm">
                  Scores sources by credibility (SEC.gov = 100%, Twitter = 40%) and analyzes content relevance and
                  specificity
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-cyan-600 text-gray-50 font-bold flex items-center justify-center">
                4
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1 text-gray-50">Synthesize Root Cause</h3>
                <p className="text-gray-400 text-sm">
                  Uses LLM to determine the most likely explanation (earnings miss, regulatory fine, CEO resignation,
                  etc.)
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-cyan-600 text-gray-50 font-bold flex items-center justify-center">
                5
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1 text-gray-50">Generate Report</h3>
                <p className="text-gray-400 text-sm">
                  Creates detailed markdown report with confidence scores, evidence quality metrics, and recommendations
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-800 border-l-4 border-purple-500">
            <p className="text-sm text-gray-300">
              <strong>Self-Correction:</strong> If confidence is below 70%, the system automatically refines queries and
              retries (up to 3 iterations).
            </p>
          </div>
        </section>

        {/* Frontend Usage */}
        <section className="bg-gray-900 p-8 mb-8 border border-gray-800">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="w-8 h-8 text-indigo-400" />
            <h2 className="text-3xl font-bold text-gray-50">Using this Web Dashboard</h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>This frontend is a visual interface for the same backend logic used by the CLI:</p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="border border-gray-800 p-4">
                <h3 className="font-semibold mb-2 text-gray-50">Add Tickers</h3>
                <p className="text-sm text-gray-400">Manage your watchlist by adding or removing stock tickers</p>
              </div>

              <div className="border border-gray-800 p-4">
                <h3 className="font-semibold mb-2 text-gray-50">Scan Stocks</h3>
                <p className="text-sm text-gray-400">Click scan to analyze all stocks in your watchlist</p>
              </div>

              <div className="border border-gray-800 p-4">
                <h3 className="font-semibold mb-2 text-gray-50">View Analysis</h3>
                <p className="text-sm text-gray-400">
                  See detailed metrics for each stock including score and indicators
                </p>
              </div>

              <div className="border border-gray-800 p-4">
                <h3 className="font-semibold mb-2 text-gray-50">Investigate Anomalies</h3>
                <p className="text-sm text-gray-400">
                  Trigger AI investigation for detected anomalies with real-time status
                </p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gray-800 border-l-4 border-indigo-500">
              <p className="text-sm">
                <strong>Note:</strong> The frontend and CLI use identical detection logic. Results should match for the
                same watchlist and timeframe.
              </p>
            </div>
          </div>
        </section>

        {/* Architecture */}
        <section className="bg-gray-900 p-8 mb-8 border border-gray-800">
          <h2 className="text-3xl font-bold mb-6 text-gray-50">System Architecture</h2>

          <div className="bg-gray-800 p-6 border border-gray-700">
            <pre className="text-sm text-gray-300 overflow-x-auto">
              {`┌─────────────────┐
│  Next.js        │
│  Frontend       │ ← You are here
└────────┬────────┘
         │ HTTP/REST
         ▼
┌─────────────────┐
│  FastAPI        │
│  Backend        │
└────────┬────────┘
         │
    ┌────┴────┐
    ▼         ▼
┌─────────┐ ┌──────────────┐
│ yfinance│ │ LangGraph    │
│ (Market │ │ Investigation│
│  Data)  │ │   Agent      │
└─────────┘ └──────┬───────┘
                   │
              ┌────┴────┐
              ▼         ▼
        ┌──────────┐ ┌─────────┐
        │ Tavily   │ │ Gemini  │
        │ (Search) │ │ (LLM)   │
        └──────────┘ └─────────┘`}
            </pre>
          </div>
        </section>

        {/* Quick Start */}
        <section className="bg-gray-800 text-gray-50 p-8 border border-gray-700">
          <h2 className="text-3xl font-bold mb-4">Quick Start Workflow</h2>

          <ol className="space-y-3">
            <li className="flex gap-3">
              <span className="font-bold">1.</span>
              <span>Clone backend repository and install dependencies</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold">2.</span>
              <span>Configure .env file with API keys</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold">3.</span>
              <div className="flex-1">
                <div>Test with CLI:</div>
                <div className="bg-gray-900 px-3 py-2 mt-1 font-mono text-sm border border-gray-700 text-green-400">
                  python main.py --watchlist AAPL MSFT
                </div>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="font-bold">4.</span>
              <div className="flex-1">
                <div>Start backend API:</div>
                <div className="bg-gray-900 px-3 py-2 mt-1 font-mono text-sm border border-gray-700 text-green-400">
                  python api.py
                </div>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="font-bold">5.</span>
              <span>Use this dashboard to monitor stocks visually</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold">6.</span>
              <span>(Optional) Deploy to cloud for 24/7 monitoring</span>
            </li>
          </ol>
        </section>
      </div>
    </div>
  )
}
