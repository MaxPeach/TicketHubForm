import { Link } from 'react-router-dom';
import './App.css';

const concerts = [
  { id: 1, name: 'Kiss', image: 'src/assets/kiss.jpg' },
  { id: 2, name: 'System Of A Down', image: 'src/assets/soad.jpg' },
  { id: 3, name: 'Slayer', image: 'src/assets/slayer.jpg' }
];

function ConcertList() {
  return (
    <div className="concert-container">
      {concerts.map(concert => (
        <div key={concert.id} className="concert-card">
          <img src={concert.image} alt={concert.name} />
          <div className="concert-info">
            <h3>{concert.name}</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <Link to={`/concert/${concert.id}`} className="btn">
              Get Tickets
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ConcertList;
