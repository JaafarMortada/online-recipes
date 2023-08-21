import './App.css';
import RecipeCard from './components/recipeCard';
import MySideBar from './components/sidebar';
import { BrowserRouter, Route, Routes, createBrowserRouter } from 'react-router-dom';
import LoginPage from './pages/login';
import MealPlanner from './components/calender';
import HomePage from './pages/home';
import { SearchProvider } from './global/context';
import { ShoppingListStateProvider } from './global/browseOrList';
const ShowSideBarIn = () => {
  return (
    <>
    <SearchProvider>
      <ShoppingListStateProvider>
        <MySideBar />
          <Routes>
            <Route path="/home" element={<HomePage/>} />
            <Route path="/calender" element={<MealPlanner />} />
          </Routes>
      </ShoppingListStateProvider>
    </SearchProvider>
    </>
  );
}

function App() {
  return (
    <>
    <div className="App">
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/*" element={<ShowSideBarIn />} />
        </Routes>
      </BrowserRouter>
    </div>
    </>
  );
}

export default App;
