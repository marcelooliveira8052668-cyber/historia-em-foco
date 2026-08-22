import React, { useState } from 'react';
import { topics } from './data';
import './App.css';

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [selectedImg, setSelectedImg] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  
  const [suggestionInput, setSuggestionInput] = useState('');
  const [suggestions, setSuggestions] = useState([
    { id: 1, text: 'A Revolução Francesa e o impacto da Imprensa' },
    { id: 2, text: 'A Era Digital e os novos movimentos sociais' }
  ]);

  const categories = ['Todas', ...new Set(topics.map((t) => t.category))];

  const handleSuggestionSubmit = (e) => {
    e.preventDefault();
    if (!suggestionInput.trim()) return;

    const novaSugestao = {
      id: Date.now(),
      text: suggestionInput
    };

    setSuggestions([novaSugestao, ...suggestions]);
    setSuggestionInput('');
  };

  const filteredTopics = topics.filter((t) => {
    const matchesSearch = 
      t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'Todas' || t.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Função para forçar a abertura em outra aba no PC e Celular (evitando abrir o app nativo do Docs)
  const handleOpenMaterial = (e, url) => {
    e.preventDefault(); // Impede o comportamento padrão de abrir na mesma aba/app nativo
    window.open(url, '_blank', 'noopener,noreferrer'); // Força a abertura limpa em nova aba
  };

  return (
    <div className={darkMode ? 'app-container dark-mode' : 'app-container light-mode'}>
      <div className="cyber-grid-bg"></div>
      <div className="glow-orb orb-1"></div>
      <div className="glow-orb orb-2"></div>

      <header className="app-header">
        <div className="logo-area">
          <span className="logo-icon">⚡</span>
          <h1>Portal de História</h1>
        </div>
        <p className="subtitle">Explorando o passado com lentes do futuro</p>
        
        <button className="mode-btn" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? '☀️ Modo Luz' : '🌌 Modo Cyber'}
        </button>
      </header>

      <main className="app-main">
        <div className="search-filter-wrapper">
          <div className="search-container">
            <span className="search-icon">🔍</span>
            <input 
              type="text" 
              placeholder="Pesquisar por tema, conceito ou palavra-chave..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            {searchTerm && (
              <button className="clear-search" onClick={() => setSearchTerm('')}>×</button>
            )}
          </div>

          <div className="category-chips">
            {categories.map((cat, index) => (
              <button
                key={index}
                className={`chip ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {filteredTopics.length > 0 ? (
          <div className="topics-grid">
            {filteredTopics.map((t) => (
              <article key={t.id} className="card">
                <div className="card-image-container">
                  <img 
                    src={t.image} 
                    alt={t.title} 
                    onClick={() => setSelectedImg(t.image)} 
                    loading="lazy"
                  />
                  <span className="category-badge">{t.category}</span>
                </div>
                
                <div className="card-content">
                  <h3>{t.title}</h3>
                  <p>{t.excerpt}</p>
                  
                  {/* Botão atualizado com interceptação via JavaScript para abrir em nova aba no PC e mobile */}
                  <a 
                    href={t.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={(e) => handleOpenMaterial(e, t.url)}
                    className="access-btn"
                  >
                    <span>Acessar Material Completo</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                  </a>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="no-results">
            <span className="no-results-icon">🔭</span>
            <p>Nenhum registro histórico encontrado para esta busca.</p>
          </div>
        )}

        <section className="suggestion-section">
          <div className="suggestion-header">
            <h3>Contribua com o Portal</h3>
            <p>Tem algum tema histórico que gostaria de ver analisado aqui?</p>
          </div>
          
          <form onSubmit={handleSuggestionSubmit} className="suggestion-form">
            <input 
              type="text" 
              placeholder="Digite sua sugestão de tema..."
              value={suggestionInput}
              onChange={(e) => setSuggestionInput(e.target.value)}
              className="suggestion-input"
            />
            <button type="submit" className="suggestion-btn">Enviar Sugestão</button>
          </form>

          <div className="suggestions-list">
            <h4>💡 Sugestões em Destaque:</h4>
            <ul>
              {suggestions.map((item) => (
                <li key={item.id}>
                  <span className="bullet-glow"></span>
                  {item.text}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      {selectedImg && (
        <div className="modal" onClick={() => setSelectedImg(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setSelectedImg(null)}>×</button>
            <img src={selectedImg} alt="Zoom expandido" />
          </div>
        </div>
      )}

      <footer>
        <p>© 2026 Professor Marcelo Oliveira. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}