import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ConcertList from './ConcertList';
import TicketForm from './ticketForm';
import './App.css';

function App() {
  return (
    <Router>
      <Header />
      <div className="App">
        <h1>🎟️ Welcome to TicketHub</h1>
        <Routes>
          <Route path="/" element={<ConcertList />} />
          <Route path="/concert/:id" element={<TicketForm />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
