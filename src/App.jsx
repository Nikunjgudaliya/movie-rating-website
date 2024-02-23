// import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Movies from './pages/Movies';
import Trending from './pages/Trending';
import TopRated from './pages/TopRated';
import Series from './pages/Series';
import SignIn from './pages/Signin';
import SignUp from './pages/Signup';
import ShowMore from './pages/ShowMore';
// import Admin from './pages/Admin';

function App() {
  // const location = useLocation(); // Get the current location using useLocation hook
  // const [showNavbar, setShowNavbar] = useState(true);

  // Hide navbar if the route path is '/admin'
  // if (location.pathname === '/admin') {
  //   setShowNavbar(false);
  // } else {
  //   setShowNavbar(true);
  // }

  return (
    <Router>
      {/* {showNavbar && <Navbar />} */}
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/tv-series" element={<Series />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/top-rated" element={<TopRated />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path="/:mediaType/:id" element={<ShowMore />} />
        {/* <Route path="/admin" element={<Admin/>} /> */}
      </Routes>
    </Router>
  );
}

export default App;
