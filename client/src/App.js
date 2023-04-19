import './App.css';
import { useReducer } from 'react';
import { createContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { initialState, reducer } from './reducer/useReducer';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Home from './pages/Home';
import Logout from './pages/Logout';
import AllTickets from './pages/AllTickets';
import Ticket from './pages/Ticket';
import NewTicket from './pages/NewTicket';
import About from './pages/About';
import Contact from './pages/Contact';

export const userContext = createContext();

const Routing = () => {
  return (
    <Routes>
      <Route exact path='/' element={<Login />}></Route>
      <Route path='/signup' element={<Registration />}></Route>
      <Route path='/account' element={<Home />}></Route>
      <Route path='/tickets' element={<AllTickets />}></Route>
      <Route path='/tickets/:id' element={<Ticket />}></Route>
      <Route path='/new-ticket' element={<NewTicket />}></Route>
      <Route path='/about' element={<About />}></Route>
      <Route path='/contact' element={<Contact />}></Route>
      <Route path='/logout' element={<Logout />}></Route>
    </Routes>
  );
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div className='app'>
      <BrowserRouter>
        <userContext.Provider value={{ state, dispatch }}>
          <main>
            <Routing />
          </main>
        </userContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
