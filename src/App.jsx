import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards, Navigation } from 'swiper/modules';
import { topics } from './data'; // Importa seus dados

import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/navigation';
import './App.css';

export default function App() {
  const [darkMode, setDarkMode] = useState(false); // Começa no Modo Dia (claro)
  const [selectedImg, setSelectedImg] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [suggestionInput, setSuggestionInput] = useState('');
  const [suggestions, setSuggestions] = useState([
    { id: 1, text: 'Fale mais sobre a Revolução Francesa!' }
  ]);

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

  const filteredTopics = topics.filter((t) => 
    t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    // A classe muda dependendo do estado do modo
    <div className={darkMode ? 'app-container dark-mode' : 'app-container light-mode'}>
      <header className="app-header">
        <h1>Portal de História</h1>
        <button className="mode-btn" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? '☀️ Modo Dia' : '🌙 Modo Noite'}
        </button>
      </header>

      <main className="app-main">
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
          <div className="swiper-wrapper-container">
            <Swiper
              effect={'cards'}
              grabCursor={true}
              modules={[EffectCards, Navigation]}
              navigation={true}
              className="mySwiper"
              cardsEffect={{
                slideShadows: false,
                perSlideRotate: 2,
                perSlideOffset: 8,
              }}
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
                    
                    {/* Link com target="_blank" para abrir em nova aba */}
                    <a 
                      href={t.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="access-btn"
                    >
                      📄 Acessar Material
                    </a>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ) : (
          <p className="no-results">Nenhum tópico encontrado.</p>
        )}

        <section className="suggestion-section">
          <h3>Deixe sua sugestão de tema</h3>
          
          <form onSubmit={handleSuggestionSubmit} className="suggestion-form">
            <input 
              type="text" 
              placeholder="Digite sua sugestão..."
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