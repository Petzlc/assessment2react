import axios from 'axios';
import React, { useState } from 'react';

export default function App() {
  // set state for the input in the searchbar
  const [searchQuery, setSearchQuery] = useState('');

  // state for the results
  const [results, setResults] = useState([]);

  // implement search function later
  const handelSearch = async () => {
    // console.log('Suche nach:', searchQuery);
    try {
      const response = await axios.get(
        'https://marketplace.sshopencloud.eu/item-search',
        {
          params: {
            q: searchQuery,
            categories: 'tool-or-service',
          },
        },
      );
      // Put results in State
      setResults(response.data.items);
    } catch (error) {
      console.error('Fehler bei der API-Anfrage:', error);
    }
  };

  return (
    <div>
      <h1>Social Sciences & Humanities Open Marketplace</h1>

      {/* Search field */}
      <div>
        <input
          type="text"
          placeholder="Suchbegriff eingeben..."
          value={searchQuery}
          // Aktualisiert den State bei Eingabe
          onChange={(event) => setSearchQuery(event.target.value)}
        />
        <button onClick={handelSearch}>Suche</button>
      </div>

      {/* Results list */}
      <div>
        <h2>Ergebnisse</h2>
        <ul>
          {results.map((item) => (
            <li key={item.id}>
              <strong>{item.label}</strong>
              <br />
              Accessible at: {item.accessibleAt}
              <br />
              Contributors: {item.contributors.join(', ')}
            </li>
          ))}
        </ul>
      </div>

      {/* Pagination */}
      <div>
        <button>{'<'}</button>
        <span>Seite 1 von 10</span>
        <button>{'>'}</button>
      </div>
    </div>
  );
}
