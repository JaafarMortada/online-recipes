import "./styles.css";
import RecipeModal from "../modal";
import { useState, useCallback } from "react";
const ShoppingListCard = ({ data }) => {

    const [isModalOpen, setIsModalOpen] = useState(false)

    const toggleModal = useCallback(() => {
        setIsModalOpen(prevValue => !prevValue);
    }, []);

    return (
        <>
        <RecipeModal isOpen={isModalOpen} toggleModal={toggleModal} data={ data } from={"card"}/>
        <div className="shopping-list-card-container transition">
            <div className="shopping-list-image">
                <img
                    src={`http://localhost:8000/storage/${data.images[0].image_url ? data.images[0].image_url : ""}`}
                    onClick={() => setIsModalOpen(true)}
                ></img>
            </div>
            <div className="list-cousine-div">
                <span className="shopping-list-title">{data.name}</span>
                <span className="shopping-list-cuisine-title">Cousine:</span>
                <span className="shopping-list-cuisine">
                    {data.cuisine.name}
                </span>
            </div>
            
            <div className="card-ingredient-info shopping-list-ingredients transition">
                Ingredients:
                <div>
                    {data.ingredients.map((ingredient) => (
                    <span
                        className="card-ingredient-text"
                        key={`${ingredient.name}-${ingredient.id}`}
                    >
                        - {ingredient.name} {ingredient.pivot.amount}
                        <br />
                    </span>
                ))}
                </div>
                
            </div>
        </div>
        </>
    );
};

export default ShoppingListCard;
