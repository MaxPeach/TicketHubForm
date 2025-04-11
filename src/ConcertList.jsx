import { Link } from 'react-router-dom'

const concerts = [
  { id: 1, name: 'Kiss' },
  { id: 2, name: 'System Of A Down' },
  { id: 3, name: 'Slayer' }
  
]

function ConcertList() {
  return (
    <div className="card">
      <h2>Available Concerts</h2>
      <ul>
        {concerts.map((concert) => (
          <li key={concert.id}>
            <Link to={`/concert/${concert.id}`}>{concert.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ConcertList
