import './App.css';

import Calendar from './pages/calendar_page';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import MyReservations from './pages/my_reservations';
import UserMyReservations from './pages/my_reservations/userindex';


function App() {
  return (
    <div className="App" >
      <Calendar />
        
      
    </div>
  );
}

export default App;
