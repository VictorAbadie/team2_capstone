import { useState } from 'react';
import NavBar from './components/NavBar';
import Login from './components/Login';

function App() {
  const [token, setToken] = useState(null);
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/wines" element={<Wines />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile token={token}/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
