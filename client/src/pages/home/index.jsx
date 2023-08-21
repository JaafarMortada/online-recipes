import RecipeCard from "../../components/recipeCard";
import { useState, useEffect } from "react";
import { sendRequest } from "../../config/request";
import Pagination from "../pagination";
import "./styles.css";
import LoadingAnimation from "../../assets/animated/loadingRecipes";
import { useSearchContext } from "../../global/context";
import { useShoppingListState } from "../../global/browseOrList";
import ShoppingListCard from "../../components/shoppingListCard";
import EmptyComments from "../../assets/animated/emptyComments";
const HomePage = () => {

    const { search } = useSearchContext();
    const { shoppingListIsShown } = useShoppingListState();
    const [recipes, setRecipes] = useState([]);
    const [inShoppingListRecipes, setInShoppingListRecipes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [cardsPerPage, setCardsPerPage] = useState(9);
    const lastCardIndex = currentPage * cardsPerPage;
    const firstCardIndex = lastCardIndex - cardsPerPage;
    const [currentCards, setCurrentCards] = useState([]);

    useEffect(() => {
        const toggleCards = () => {
            if(shoppingListIsShown){
                setCurrentCards(inShoppingListRecipes.slice(firstCardIndex, lastCardIndex))
            } else {
                setCurrentCards(recipes.slice(firstCardIndex, lastCardIndex));
            }
        }
        toggleCards()
    }, [shoppingListIsShown, recipes])

    useEffect(() => {
        const getRecipesHandler = async () => {
            try {
                const response = await sendRequest({
                    method: "GET",
                    route: `/api/recipes/${search}`,
                });
                if (response.recipes) {
                    setRecipes(response.recipes);
                }
            } catch (error) {
                console.log(error);
            }
        };
        getRecipesHandler();
    }, [search]);

    useEffect(() => {
        const getRecipesHandler = async () => {
            try {
                const response = await sendRequest({
                    method: "GET",
                    route: "/api/recipes",
                });
                if(response.recipes){
                    setRecipes(response.recipes);
                    setInShoppingListRecipes(response.recipes.filter(recipe => recipe.in_list))
                }
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
                            {shoppingListIsShown? "My Shopping List" : "Browse Recipes"}
                        </h1>
                        <div className="cards-container">
                            {shoppingListIsShown?
                                (currentCards.length>0 ?
                                currentCards.map((recipe) => (
                                <ShoppingListCard key={recipe.id} data={recipe} />
                            )) : 
                            
                            <div className="empty-shopping-list">
                                <EmptyComments />
                            <span className='empty-comment-section'> 
                                Your shopping list is still empty...
                                <br/> Browse recipes and let the list grow
                            </span>
                            </div>
                            
                        
                            )  : 
                                currentCards.map((recipe) => (
                                    <RecipeCard key={recipe.id} data={recipe} />
                            ))
                            }
                        </div>
                    </>
                ) : (
                    <>
                        <h1
                            className="add-recipe-header showcase-header home-header"
                            style={{ width: "900px" }}
                        >
                            {(search === '' && currentCards.length === 0) ? 'Looking for recipes' : 'No recipes found'}
                        </h1>
                        {search && currentCards.length === 0 ? 
                        <div className="empty-shopping-list">
                        <EmptyComments />
                    <span className='empty-comment-section'> 
                        No such recipe found...
                        <br/> Try something else
                    </span>
                    </div>
                        
                        : <LoadingAnimation />}
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