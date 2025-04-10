import React, { useState } from 'react';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    setError('');
    setUserData(null);

    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (!response.ok) {
        throw new Error('Nenhum perfíl foi encontrado com esse nome de usuário. \nTente novamente');
      }
      const data = await response.json();
      setUserData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="Logo-Titulo">
        <img src="/image/Logo-Github.png" alt='Logo do GitHub'/>
        <h1 className="title">Perfil <span class="github">GitHub</span></h1>
      </div>

    
      <div className="search-box">
        <input
          type="text"
          placeholder="Digite o usuário do GitHub"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <button onClick={handleSearch}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="32"
            fill="white"
            viewBox="0 0 24 24"
          >
            <path d="M10 2a8 8 0 015.29 13.71l4 4a1 1 0 01-1.42 1.42l-4-4A8 8 0 1110 2zm0 2a6 6 0 100 12A6 6 0 0010 4z" />
          </svg>
        </button>
        
      </div>

      {loading && <p className="loading">🔄 Buscando...</p>}
      {/*Aqui estrutura para a caixa do erro */}
      {error && (
        <div className="error-box">
          <p className="error">{error}</p>
        </div>
      )}

      {userData && (
        <div className="profile-card">
          <img src={userData.avatar_url} alt="Avatar" className="avatar" />
          <div className='perfil'>
            <h2 className='name'>{userData.name || 'Sem nome'}</h2>
            <p className="bio">{userData.bio || 'Sem bio disponível'}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
