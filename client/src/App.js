import './App.css';
import RecipeCard from './components/recipeCard';
import MySideBar from './components/sidebar';

function App() {
  return (
    <>
    <div className="App">
      <MySideBar/>
      <div className='cards-container'>
        <RecipeCard/>
      </div>
    </div>
    </>
  );
}

export default App;
