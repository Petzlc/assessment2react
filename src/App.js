import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ItemDetail from './ItemDetail';
import SearchView from './SearchView'; // Import the new component

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Hauptseite mit der Suche */}
        <Route path="/" element={<SearchView />} />
        {/* Detailansicht für Items */}
        <Route path="/tools-services/:id" element={<ItemDetail />} />
      </Routes>
    </Router>
  );
}
