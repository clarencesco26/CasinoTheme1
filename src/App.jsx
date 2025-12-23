import { useState } from 'react'
import './App.css'

function App() {
  const [balance, setBalance] = useState(1000.00)
  const [activeNav, setActiveNav] = useState('casino')

  const games = [
    { icon: '🎰', name: 'Slots', category: 'Slot Games' },
    { icon: '🃏', name: 'Blackjack', category: 'Card Games' },
    { icon: '🎲', name: 'Dice', category: 'Dice Games' },
    { icon: '🎯', name: 'Roulette', category: 'Table Games' },
    { icon: '♠️', name: 'Poker', category: 'Card Games' },
    { icon: '🎪', name: 'Baccarat', category: 'Table Games' },
    { icon: '🎡', name: 'Fortune', category: 'Wheel Games' },
    { icon: '💎', name: 'Gems', category: 'Slot Games' },
  ]

  const handleGameClick = (game) => {
    alert(`Opening ${game.name}... 🎰`)
  }

  return (
    <div className="app">
      <header className="header">
        <h1>🎰 Mobile Casino 🎰</h1>
      </header>

      <div className="balance">
        <div>
          <div className="balance-label">Your Balance</div>
          <div className="balance-amount">${balance.toFixed(2)}</div>
        </div>
        <button onClick={() => setBalance(balance + 100)}>
          💰 Add Chips
        </button>
      </div>

      <main className="main-content">
        <h2 className="section-title">🔥 Popular Games</h2>
        <div className="games-grid">
          {games.map((game, index) => (
            <div
              key={index}
              className="game-card"
              onClick={() => handleGameClick(game)}
            >
              <span className="game-icon">{game.icon}</span>
              <div className="game-name">{game.name}</div>
              <div className="game-category">{game.category}</div>
            </div>
          ))}
        </div>

        <h2 className="section-title">🎁 Daily Bonus</h2>
        <div className="game-card" style={{ maxWidth: '300px', margin: '0 auto' }}>
          <span className="game-icon">🎁</span>
          <div className="game-name">Claim Your Bonus</div>
          <div className="game-category">Available Now</div>
        </div>
      </main>

      <nav className="bottom-nav">
        <button
          className={`nav-item ${activeNav === 'casino' ? 'active' : ''}`}
          onClick={() => setActiveNav('casino')}
        >
          <span className="nav-icon">🎰</span>
          Casino
        </button>
        <button
          className={`nav-item ${activeNav === 'live' ? 'active' : ''}`}
          onClick={() => setActiveNav('live')}
        >
          <span className="nav-icon">📺</span>
          Live
        </button>
        <button
          className={`nav-item ${activeNav === 'promotions' ? 'active' : ''}`}
          onClick={() => setActiveNav('promotions')}
        >
          <span className="nav-icon">🎁</span>
          Promos
        </button>
        <button
          className={`nav-item ${activeNav === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveNav('profile')}
        >
          <span className="nav-icon">👤</span>
          Profile
        </button>
      </nav>
    </div>
  )
}

export default App
