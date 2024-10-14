import React, { useState } from 'react';

export default function App() {
  // set state for the input in the searchbar
  const [searchQuery, setSearchQuery] = useState('');

  // implement search function later
  const handelSearch = () => {
    console.log('Suche nach:', searchQuery);
  };

  return (
    <div>
      <h1>Social Sciences & Humanities Open Marketplace</h1>

      {/* Suchfeld */}
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

      {/* Ergebnisliste */}
      <div>
        <h2>Ergebnisse</h2>
        <ul>
          <li>Ergebnis 1</li>
          <li>Ergebnis 2</li>
          <li>Ergebnis 3</li>
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
