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

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route element={<Layout />}>
        <Route path="/home" element={<Home />}/>
        <Route path="/sports" element={<Home />}/>
        <Route path="/coaches" element={<Home />}/>
        <Route path="/sessions" element={<Home />}/>
        <Route path="/nutritionist" element={<Home />}/>
        <Route path="/about" element={<Home />}/>
        <Route path="/profile" element={<Profile />}/>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
