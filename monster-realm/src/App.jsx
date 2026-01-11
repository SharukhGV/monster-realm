import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import MonsterRealmDuel from "./MonsterRealmDuel.jsx"
import MonsterRealmDuelLocal from './MonsterRealmDuelLocal.jsx'
import './App2.css'

function App() { 
  const [activeGame, setActiveGame] = useState('home'); // 'home', 'single', 'local'

  const handleNavigation = (game) => {
    setActiveGame(game);
  };

  const renderContent = () => {
    switch(activeGame) {
      case 'single':
        return <MonsterRealmDuel />;
      case 'local':
        return <MonsterRealmDuelLocal />;
      default:
        return (
          <div className="home-container">
            <header className="home-header">
              <h1 className="home-title">MONSTER REALM</h1>
              <p className="home-subtitle">Choose your battle mode</p>
            </header>
            
            <div className="game-mode-grid">
              {/* Single Player Mode */}
              <div 
                className="game-mode-card"
                onClick={() => handleNavigation('single')}
              >
                <div className="game-mode-icon">
                  <span className="symbol">🆚</span>
                </div>
                <h3 className="game-mode-title">Player vs CPU</h3>
                <p className="game-mode-description">
                  Battle against an AI opponent in a strategic monster duel.
                </p>
                <div className="game-mode-features">
                  <div className="feature-item">
                    <span className="symbol">🤖</span>
                    <span>AI Opponent</span>
                  </div>
                  <div className="feature-item">
                    <span className="symbol">🎯</span>
                    <span>Auto Targeting</span>
                  </div>
                  <div className="feature-item">
                    <span className="symbol">💻</span>
                    <span>Solo Play</span>
                  </div>
                </div>
                <button className="game-mode-button">
                  Play Single Player
                </button>
              </div>
              
              {/* Local Multiplayer Mode */}
              <div 
                className="game-mode-card"
                onClick={() => handleNavigation('local')}
              >
                <div className="game-mode-icon">
                  <span className="symbol">👥</span>
                </div>
                <h3 className="game-mode-title">Local 2-Player</h3>
                <p className="game-mode-description">
                  Battle against a friend on the same device. Take turns strategically.
                </p>
                <div className="game-mode-features">
                  <div className="feature-item">
                    <span className="symbol">👤</span>
                    <span>Player 1 vs Player 2</span>
                  </div>
                  <div className="feature-item">
                    <span className="symbol">🎮</span>
                    <span>Hotseat Mode</span>
                  </div>
                  <div className="feature-item">
                    <span className="symbol">🏠</span>
                    <span>Same Device</span>
                  </div>
                </div>
                <button className="game-mode-button multiplayer">
                  Play Local Multiplayer
                </button>
              </div>
            </div>
            
            {/* How to Play Section */}
            <div className="how-to-play">
              <h3 className="how-to-play-title">
                <span className="symbol">📖</span>
                How to Play
              </h3>
              <div className="instructions">
                <div className="instruction-step">
                  <div className="step-number">1</div>
                  <div className="step-content">
                    <h4>Choose Monsters</h4>
                    <p>Select 5 unique monsters from your collection to form your team.</p>
                  </div>
                </div>
                <div className="instruction-step">
                  <div className="step-number">2</div>
                  <div className="step-content">
                    <h4>Understand Abilities</h4>
                    <p>Each monster has 3 abilities with different symbols that determine effects.</p>
                  </div>
                </div>
                <div className="instruction-step">
                  <div className="step-number">3</div>
                  <div className="step-content">
                    <h4>Battle Turns</h4>
                    <p>On turn 1, use 2 monsters. On turns 2 and onwards, use all 5 monsters per turn.</p>
                  </div>
                </div>
                <div className="instruction-step">
                  <div className="step-number">4</div>
                  <div className="step-content">
                    <h4>Win Condition</h4>
                    <p>Defeat all opponent monsters.</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Game Info Footer */}
            <div className="game-info-footer">
              <div className="info-item">
                <span className="symbol">⌛</span>
                <span>Battle Duration: Until Someone Defeats All Monsters</span>
              </div>
              <div className="info-item">
                <span className="symbol">🃏</span>
                <span>18 unique monsters available</span>
              </div>
              <div className="info-item">
                <span className="symbol">🎲</span>
                <span>Turn-based strategy game</span>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="app-container">
      {/* Navigation Bar */}
      <nav className="main-nav">
        <div className="nav-left">
          <div className="nav-logo" onClick={() => handleNavigation('home')}>
            <span className="symbol">🐉</span>
            <span className="nav-title">Monster Realm</span>
          </div>
        </div>
        
        <div className="nav-center">
          <button 
            className={`nav-button ${activeGame === 'home' ? 'active' : ''}`}
            onClick={() => handleNavigation('home')}
          >
            <span className="symbol">🏠</span>
            <span className="nav-button-text">Home</span>
          </button>
          <button 
            className={`nav-button ${activeGame === 'single' ? 'active' : ''}`}
            onClick={() => handleNavigation('single')}
          >
            <span className="symbol">🆚</span>
            <span className="nav-button-text">vs CPU</span>
          </button>
          <button 
            className={`nav-button ${activeGame === 'local' ? 'active' : ''}`}
            onClick={() => handleNavigation('local')}
          >
            <span className="symbol">👥</span>
            <span className="nav-button-text">2 Players</span>
          </button>
        </div>
        
        <div className="nav-right">
          <div className="version-info">
            <span className="symbol">🎮</span>
            <span>v1.0.0</span>
          </div>
        </div>
      </nav>
      
      {/* Main Content */}
      <main className="main-content">
        {renderContent()}
      </main>
      
      {/* Footer */}
      <footer className="app-footer">
        <div className="footer-content">
          <p>Monster Realm Duel © 2024 - A strategic monster battling game</p>
          <div className="footer-links">
            <a href="#" className="footer-link">Game Rules</a>
            <a href="#" className="footer-link">Symbol Guide</a>
            <a href="#" className="footer-link">Monster Database</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App