import React, { useState, useEffect } from 'react';
import './style.css';

function App() {
  const gamesData = [
    ["Minecraft", "Gra survivalowa w otwartym świecie", "Sandbox", 5, 2011],
    ["Cyberpunk 2077", "RPG akcji w klimacie sci-fi", "RPG", 4, 2020],
    ["The Witcher 3", "Epicka gra RPG fantasy", "RPG", 5, 2015],
    ["Valorant", "Taktyczny strzelec FPS", "FPS", 4, 2020],
    ["League of Legends", "Popularna gra MOBA", "MOBA", 4, 2009],
    ["Counter-Strike 2", "Klasyczny strzelec taktyczny", "FPS", 5, 2023],
    ["Elden Ring", "RPG z otwartym światem", "RPG", 5, 2022],
    ["Fortnite", "Battle royale z budowaniem", "Battle Royale", 4, 2017],
    ["World of Warcraft", "Klasyczne MMORPG", "MMORPG", 4, 2004],
    ["Grand Theft Auto V", "Gra akcji z otwartym światem", "Akcja", 5, 2013]
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [userName, setUserName] = useState('');
  const [randomFact, setRandomFact] = useState('');
  const [headerColor, setHeaderColor] = useState('#4a6fa5');

  const facts = [
    "Creeper w Minecraft powstał przez przypadek!",
    "Najlepszy build zależy tylko od Ciebie.",
    "Gry to świetny sposób na rozwój kreatywności.",
    "Pierwsza gra komputerowa powstała w 1958 roku.",
    "Esport to oficjalna dyscyplina sportowa.",
    "Minecraft to najlepiej sprzedająca się gra w historii."
  ];

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * facts.length);
    setRandomFact(facts[randomIndex]);

    const savedName = localStorage.getItem('portalUserName');
    if (savedName) {
      setUserName(savedName);
    }

    const colors = ['#4a6fa5', '#6a5acd', '#20b2aa', '#ff6b6b', '#ffa500'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setHeaderColor(randomColor);
  }, []);

  const filteredGames = gamesData.filter(game => 
    game[0].toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLogin = () => {
    const name = prompt('Wpisz swoje imię:');
    if (name && name.trim() !== '') {
      setUserName(name.trim());
      localStorage.setItem('portalUserName', name.trim());
    }
  };

  const handleLogout = () => {
    setUserName('');
    localStorage.removeItem('portalUserName');
  };

  const getNewFact = () => {
    const randomIndex = Math.floor(Math.random() * facts.length);
    setRandomFact(facts[randomIndex]);
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} style={{ color: i < rating ? '#ffd700' : '#ccc' }}>
          ★
        </span>
      );
    }
    return stars;
  };

  const changeHeaderColor = () => {
    const colors = ['#4a6fa5', '#6a5acd', '#20b2aa', '#ff6b6b', '#ffa500', '#9b59b6', '#2ecc71', '#e74c3c'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setHeaderColor(randomColor);
  };

  return (
    <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
      <header 
        className="header" 
        style={{ backgroundColor: headerColor }}
      >
        <div className="header-content">
          <h1>Portal o Gracach Komputerowych</h1>
          <p>Twoje źródło informacji o grach</p>
        </div>
        
        <div className="header-controls">
          <button 
            className="btn color-btn"
            onClick={changeHeaderColor}
          >
            🎨 Zmień kolor nagłówka
          </button>
          
          <button 
            className="btn mode-btn"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? '☀️ Tryb jasny' : '🌙 Tryb ciemny'}
          </button>
        </div>
      </header>

      <div className="container">
        <div className="main-content">
          <div className="user-card card">
            {userName ? (
              <div className="user-greeting">
                <h3>👋 Witaj ponownie, {userName}!</h3>
                <p>Miło Cię widzieć na naszym portalu!</p>
                <button className="btn logout-btn" onClick={handleLogout}>
                  Wyloguj się
                </button>
              </div>
            ) : (
              <div className="user-login">
                <h3>Przedstaw się</h3>
                <button className="btn login-btn" onClick={handleLogin}>
                  🎮 Przedstaw się
                </button>
                <small>Twoje imię zostanie zapamiętane</small>
              </div>
            )}
          </div>

          <div className="fact-card card">
            <div className="fact-header">
              <h3>💡 Ciekawostka dnia</h3>
              <button className="btn fact-btn" onClick={getNewFact}>
                Losuj nową
              </button>
            </div>
            <p className="fact-text">{randomFact}</p>
          </div>

          <div className="search-section">
            <h2>Kolekcja Gier</h2>
            <div className="search-box">
              <input
                type="text"
                placeholder="Wyszukaj grę po nazwie..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <span className="search-icon">🔍</span>
              {searchTerm && (
                <button 
                  className="clear-btn"
                  onClick={() => setSearchTerm('')}
                  title="Wyczyść wyszukiwanie"
                >
                  ×
                </button>
              )}
            </div>
            <p className="results-count">
              Znaleziono gier: <strong>{filteredGames.length}</strong>
            </p>
          </div>

          <div className="games-grid">
            {filteredGames.length > 0 ? (
              filteredGames.map((game, index) => (
                <div key={index} className="game-card">
                  <div className="game-header">
                    <h4>{game[0]}</h4>
                    <span className="game-year">{game[4]}</span>
                  </div>
                  <div className="game-genre">{game[2]}</div>
                  <p className="game-desc">{game[1]}</p>
                  <div className="game-rating">
                    <div className="stars">{renderStars(game[3])}</div>
                    <span>({game[3]}/5)</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-games">
                <p>Nie znaleziono gier spełniających kryteria</p>
                <button 
                  className="btn"
                  onClick={() => setSearchTerm('')}
                >
                  Wyczyść wyszukiwanie i pokaż wszystkie
                </button>
              </div>
            )}
          </div>
        </div>

        <aside className="sidebar">
          <div className="stats-card card">
            <h4>📊 Statystyki portalu</h4>
            <ul className="stats-list">
              <li>Wszystkich gier: <strong>{gamesData.length}</strong></li>
              <li>Gier 5⭐: <strong>{gamesData.filter(g => g[3] === 5).length}</strong></li>
              <li>Najnowsza gra: <strong>2023</strong></li>
              <li>Najstarsza gra: <strong>2004</strong></li>
            </ul>
          </div>

          <div className="info-card card">
            <h4>ℹ️ O portalu</h4>
            <p>Portal stworzony dla miłośników gier komputerowych.</p>
            <p>Zbieramy informacje o najlepszych grach na PC.</p>
            <div className="portal-tags">
              <span>🎮 Gry</span>
              <span>📚 Poradniki</span>
              <span>🏆 Rankingi</span>
            </div>
          </div>
        </aside>
      </div>

      <footer className="footer">
        <div className="footer-content">
          <p>© {new Date().getFullYear()} Portal o Gracach Komputerowych</p>
          <p>Projekt React | Autor: [Twoje Imię i Nazwisko]</p>
        </div>
      </footer>
    </div>
  );
}

export default App;