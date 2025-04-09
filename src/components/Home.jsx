import React, { useState, useEffect } from 'react';

const Home = () => {
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchTerm.trim()) return;

    setIsLoading(true);
    setError(null);
    setPokemon(null);

    const apiUrl = `https://localhost:7064/api/Pokemon/name/${searchTerm.trim().toLowerCase()}`;

    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setPokemon(data);
    } catch (err) {
      setError(`${err.message} - This may be a CORS issue or the API is not running.`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>🔍 Pokémon Search</h1>

      <form onSubmit={handleSearch} style={styles.form}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="e.g. Pikachu, Charmander"
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Search</button>
      </form>

      {isLoading && <p style={styles.loading}>Loading...</p>}

      {error && (
        <div style={styles.errorBox}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {pokemon && (
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>{pokemon.name}</h2>
          <p><strong>ID:</strong> {pokemon.id}</p>
          <p><strong>Type:</strong> {pokemon.type}{pokemon.secondaryType ? ` / ${pokemon.secondaryType}` : ''}</p>
          <p><strong>Generation:</strong> {pokemon.generation}</p>
        </div>
      )}

      {!pokemon && !isLoading && !error && searchTerm && (
        <p style={{ color: '#777' }}>No Pokémon found for "{searchTerm}"</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '50px auto',
    padding: '30px',
    backgroundColor: '#fdfdfd',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    borderRadius: '12px',
    fontFamily: 'Segoe UI, sans-serif'
  },
  heading: {
    textAlign: 'center',
    marginBottom: '30px',
    color: '#333'
  },
  form: {
    display: 'flex',
    gap: '12px',
    marginBottom: '20px',
    justifyContent: 'center'
  },
  input: {
    padding: '10px 14px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    width: '60%',
    fontSize: '16px'
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#1976d2',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background 0.3s'
  },
  loading: {
    textAlign: 'center',
    color: '#666'
  },
  errorBox: {
    padding: '15px',
    backgroundColor: '#ffebee',
    borderLeft: '5px solid #d32f2f',
    borderRadius: '6px',
    color: '#c62828',
    marginBottom: '20px'
  },
  card: {
    padding: '20px',
    backgroundColor: '#e3f2fd',
    borderRadius: '10px',
    border: '1px solid #90caf9',
    color: '#0d47a1',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
  },
  cardTitle: {
    marginTop: 0,
    textTransform: 'capitalize'
  }
};

export default Home;
