import RecipeCard from "../../components/recipeCard";
import { useState, useEffect } from "react";
import { sendRequest } from "../../config/request";
import Pagination from "../pagination";
import "./styles.css";
import LoadingAnimation from "../../assets/animated/loadingRecipes";

const HomePage = () => {

    const [recipes, setRecipes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [cardsPerPage, setCardsPerPage] = useState(9);
    const lastCardIndex = currentPage * cardsPerPage;
    const firstCardIndex = lastCardIndex - cardsPerPage;
    const currentCards = recipes.slice(firstCardIndex, lastCardIndex);

    useEffect(() => {
        const getRecipesHandler = async () => {
            try {
                const response = await sendRequest({
                    method: "GET",
                    route: "/api/recipes",
                });
                setRecipes(response.recipes);
            } catch (error) {
                console.log(error);
            }
        };
        getRecipesHandler();
    }, []);

    return (
        <>
            <div className={"home-container"}>
                {recipes?.length > 0 ? (
                    <>
                        <h1
                            className="add-recipe-header showcase-header home-header"
                            style={{ width: "900px" }}
                        >
                            Browse Recipes
                        </h1>
                        <div className="cards-container">
                            {currentCards.map((recipe) => (
                                <RecipeCard key={recipe.id} data={recipe} />
                            ))}
                        </div>
                    </>
                ) : (
                    <>
                        <h1
                            className="add-recipe-header showcase-header home-header"
                            style={{ width: "900px" }}
                        >
                            Please wait while we get the recipes
                        </h1>
                        <LoadingAnimation />
                    </>
                )}
                <Pagination
                    totalCards={recipes.length}
                    cardsPerPage={cardsPerPage}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                />
            </div>
        </>
    );
};

export default HomePage;