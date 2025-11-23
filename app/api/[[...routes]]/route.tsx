// @ts-nocheck
/* eslint-disable */
/** @jsxImportSource frog/jsx */
import { Button, Frog } from 'frog'
import { handle } from 'frog/next'

const app = new Frog({
  basePath: '/api',
  title: 'RoastMyWallet',
})

const ROAST_DB = {
  broke: [
    "Your wallet has more dust than an abandoned house.",
    "Gas fees cost more than your entire net worth.",
    "McDonald's is hiring. Web3 isn't for you.",
    "You are the reason crypto faucets exist.",
    "Stop refreshing the page, the zero isn't going away."
  ],
  rekt: [
    "Buy High, Sell Low is a joke, not a financial roadmap.",
    "Your portfolio looks like a crime scene. Red everywhere.",
    "Exit liquidity for the whales. Thank you for your service.",
    "Stop checking the price, it's already dead.",
    "You turned a Lambo into a bicycle. Impressive."
  ],
  addict: [
    "Touch grass. Seriously.",
    "Do you sleep, or do you just sign transactions?",
    "Overtrading is a disease. You are patient zero.",
    "You've paid enough gas fees to power a small village."
  ],
  nft: [
    "Nice JPEG collection. Worth approximately $0.00.",
    "Right-click save would have been cheaper.",
    "Your wallet looks like a digital garage sale.",
    "You're not a collector, you're a hoarder."
  ]
};

function analyzeWallet(fid: number) {
  const lastDigit = fid % 4;
  if (lastDigit === 0) return { type: 'broke', label: 'Dust Collector 🌪️' };
  if (lastDigit === 1) return { type: 'rekt', label: 'Professional Loser 📉' };
  if (lastDigit === 2) return { type: 'addict', label: 'Gas Guzzler ⛽' };
  return { type: 'nft', label: 'JPEG Hoarder 🖼️' };
}

function getRoastMessage(type: string) {
  const messages = ROAST_DB[type] || ROAST_DB.broke;
  return messages[Math.floor(Math.random() * messages.length)];
}

app.frame('/', (c) => {
  return c.res({
    image: (
      <div style={{ 
        color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', 
        width: '100%', height: '100%', 
        background: 'linear-gradient(to right, #1a1a1a, #000000)', textAlign: 'center', fontFamily: 'sans-serif'
      }}>
        <div style={{ fontSize: 100, marginBottom: 20 }}>🔥</div>
        <h1 style={{ fontSize: 70, fontWeight: '900', margin: 0, textTransform: 'uppercase', letterSpacing: '-2px' }}>RoastMyWallet</h1>
        <p style={{ fontSize: 32, opacity: 0.7, maxWidth: '80%' }}>
          Connect your wallet. Let AI analyze your bad decisions.
        </p>
      </div>
    ),
    intents: [
      <Button action="/analyze">🔥 ROAST ME 🔥</Button>,
    ],
  })
})

app.frame('/analyze', (c) => {
  const { frameData } = c;
  const fid = frameData?.fid || 123;
  const result = analyzeWallet(fid);
  const roastText = getRoastMessage(result.type);
  const shareText = encodeURIComponent(`I just got roasted by AI! Verdict: ${result.label}\n\n"${roastText}"\n\nTry it:`);
  
  // BURASI ÖNEMLİ: Deploy sonrası buraya kendi Vercel linkini koyacaksın.
  const appUrl = "https://roast-app-v2.vercel.app/api"; 

  return c.res({
    image: (
      <div style={{ 
        color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', 
        width: '100%', height: '100%', 
        background: 'linear-gradient(to bottom, #2b0e0e, #000000)', padding: '50px', textAlign: 'center', fontFamily: 'sans-serif'
      }}>
        <h2 style={{ fontSize: 30, color: '#ff4500', margin: 0, textTransform: 'uppercase' }}>Analysis Complete</h2>
        <h1 style={{ fontSize: 60, margin: '10px 0' }}>{result.label}</h1>
        <p style={{ fontSize: 38, fontStyle: 'italic', marginTop: 20 }}>"{roastText}"</p>
      </div>
    ),
    intents: [
      <Button.Link href={`https://warpcast.com/~/compose?text=${shareText}&embeds[]=${appUrl}`}>Share on Warpcast</Button.Link>,
      <Button.Reset>💀 Try Again</Button.Reset>
    ],
  })
})

export const GET = handle(app)
export const POST = handle(app)
