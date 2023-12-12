import {Link} from 'react-router-dom';

const linkStyle = {
  padding: '3px'
}

export default function Navbar() {
  return (
    <nav style={{position: 'fixed', top:'10px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gridTemplateRows: 'auto', gap: '10px'}}>
      <Link to='/' style={linkStyle}>Home</Link>
      <Link to='/stockPrice' style={linkStyle}>Live Stock</Link>
      <Link to='/login' style={linkStyle}>Login</Link>
      <Link to='/register' style={linkStyle}>Register</Link>
    </nav>
  )
}
