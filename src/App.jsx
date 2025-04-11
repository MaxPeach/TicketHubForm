import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ConcertList from './ConcertList'
import TicketForm from './TicketForm'
import './App.css'

function App() {
  return (
    <Router>
      <div className="App">
        <h1>🎟️ Welcome to TicketHub</h1>
        <Routes>
          <Route path="/" element={<ConcertList />} />
          <Route path="/concert/:id" element={<TicketForm />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
