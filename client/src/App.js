import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Login from './components/Login/login';
import Register from './components/Register/register';
import Home from './components/Pages/home';
import Layout from './components/Layout';
import NotFound from './components/Pages/notFound';
import Profile from './components/Profile/profile';
import Sports from './components/Sports/sports';
import Trainers from './components/Trainers/trainers';
import SportsAndTrainers from './components/Trainers/trainers-sports';
import About from './components/Pages/about';
import Subscription from './components/Subscription/subscription';
import Nutritionist from './components/Nutritionist/nutritionist';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route element={<Layout />}>
        <Route path="/home" element={<Home />}/>
        <Route path="/sports" element={<Sports />}/>
        <Route path="/coaches" element={<Trainers />}/>
        <Route path="/sports/coaches" element={<SportsAndTrainers />}/>
        <Route path="/subscription" element={<Subscription />}/>
        <Route path="/nutritionist" element={<Nutritionist />}/>
        <Route path="/about" element={<About />}/>
        <Route path="/profile" element={<Profile />}/>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
