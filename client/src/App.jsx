import './App.css';
import {Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import StockPrice from './pages/StockPrice';
import StockPriceSymbol from './pages/StockPriceSymbol';
import axios from 'axios';
import {Toaster} from 'react-hot-toast';
import {UserContextProvider} from '../context/userContext';

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;

function App() {

  return (
    <UserContextProvider>
      <div style={{minHeight: '100%', display: 'grid', gridTemplateColumns: '1fr', gridTemplateRows: '1fr 2fr'}}>
        <div style={{gridColumn: 1/3, gridRow: 1}}>
          <Navbar />
        </div>
        <div style={{gridColumnStart: 1, gridColumnEnd: 4, gridRow: 2}}>
          <Toaster position='top-center' reverseOrder={false} toastOptions={{duration: 3000}}/>
          <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/register' element={<Register />} />
              <Route path='/login' element={<Login />} />
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/stockPrice' element={<StockPrice />} />
              <Route path='/stockPrice/:symbol' element={<StockPriceSymbol />} />
          </Routes>
        </div>
      </div>
    </UserContextProvider>
  )
}

export default App
