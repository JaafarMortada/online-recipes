import RecipeCard from "../../components/recipeCard";
const HomePage = () => {

    return ( 
        <>
            <div className="cards-container">
                <RecipeCard/>
                <RecipeCard/>
                <RecipeCard/>
                <RecipeCard/>
                <RecipeCard/>
            </div>
        </>
        
    );
}

export default HomePage;