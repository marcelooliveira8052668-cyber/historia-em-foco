import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards, Navigation } from 'swiper/modules';
import { topics } from './data';

import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/navigation';
import './App.css';

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [selectedImg, setSelectedImg] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Estados para as sugestões da comunidade
  const [suggestionInput, setSuggestionInput] = useState('');
  const [suggestions, setSuggestions] = useState([
    { id: 1, text: 'Fale mais sobre a Revolução Francesa!' }
  ]);

  // Função para enviar nova sugestão
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

  // Filtra os cards pelo que você digita na busca
  const filteredTopics = topics.filter((t) => 
    t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={darkMode ? 'app-container dark' : 'app-container light'}>
      <header className="app-header">
        <h1>Portal de História</h1>
        <button className="mode-btn" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? '☀️ Modo Dia' : '🌙 Modo Noite'}
        </button>
      </header>

      <main className="app-main">
        {/* Barra de Pesquisa */}
        <div className="search-container">
          <input 
            type="text" 
            placeholder="Pesquisar tópico..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        {filteredTopics.length > 0 ? (
          <Swiper
            effect={'cards'}
            grabCursor={true}
            modules={[EffectCards, Navigation]}
            navigation={true}
            className="mySwiper"
          >
            {filteredTopics.map((t) => (
              <SwiperSlide key={t.id}>
                <div className="card">
                  <img 
                    src={t.image} 
                    alt={t.title} 
                    onClick={() => setSelectedImg(t.image)} 
                  />
                  <span className="category">{t.category}</span>
                  <h3>{t.title}</h3>
                  <p>{t.excerpt}</p>
                  <a 
                    href={t.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Acessar Material
                  </a>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p className="no-results">Nenhum tópico encontrado.</p>
        )}

        {/* Caixa de Sugestões e Comentários */}
        <section className="suggestion-section">
          <h3>Deixe sua sugestão de tema</h3>
          
          <form onSubmit={handleSuggestionSubmit} className="suggestion-form">
            <input 
              type="text" 
              placeholder= ""
              value={suggestionInput}
              onChange={(e) => setSuggestionInput(e.target.value)}
              className="suggestion-input"
            />
            <button type="submit" className="suggestion-btn">Enviar</button>
          </form>

          <div className="suggestions-list">
            <h4>Temas sugeridos pela comunidade:</h4>
            <ul>
              {suggestions.map((item) => (
                <li key={item.id}>{item.text}</li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      {selectedImg && (
        <div className="modal" onClick={() => setSelectedImg(null)}>
          <img src={selectedImg} alt="Zoom" />
        </div>
      )}

      <footer>
        <p>© 2026 Professor Marcelo Oliveira. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}