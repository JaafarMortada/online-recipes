import './App.css';
import RecipeCard from './components/recipeCard';
import MySideBar from './components/sidebar';
import { BrowserRouter, Route, Routes, createBrowserRouter } from 'react-router-dom';
import LoginPage from './pages/login';



function App() {
  return (
    <>
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage/>} />
        {/* <Route path='/home' element={<Home/>} /> */}
      </Routes>
    </BrowserRouter>
    </div>
    </>
  );
}

export default App;
