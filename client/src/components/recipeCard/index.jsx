import { useState, useCallback } from "react";
import "./styles.css"
import RecipeModal from "../modal";
import { AiFillHeart } from 'react-icons/ai';
import { BiSolidCommentMinus } from 'react-icons/bi';
import { IoMdShareAlt } from 'react-icons/io';
import { sendRequest } from "../../config/request";
const RecipeCard = ( { data } ) => {

    const [likesCount, setLikesCount] = useState(data.likes_count)

    const likeHandler = async () => {
        try {
            const response = await sendRequest({
                method: "POST",
                route: "/api/like",
                body: {recipe_id: data.id},
            });
            if(response.message === "success"){
                setLikesCount(likesCount + 1)
            } else {
                //
            }
        } catch (error) {
            console.log(error)
        }}

    const [isModalOpen, setIsModalOpen] = useState(false)

    const toggleModal = useCallback(() => {
        setIsModalOpen(prevValue => !prevValue);
    }, []);

    return ( 
        <>
        <RecipeModal isOpen={isModalOpen} toggleModal={toggleModal} data={ data } from={"card"}/>
        <div className="recipe-card transition" >
            <div className="recipe-image" onClick={() => setIsModalOpen(true)}>
                <img src={`http://localhost:8000/storage/${data.images[0].image_url? data.images[0].image_url : ''}`}></img>
                <span className="recipe-cuisine transition">{data.cuisine.name}</span>
            </div>
            <div className="recipe-name-container">
                <span className="recipe-title">{data.name}</span>
            </div>
            <div className="recipe-card-bottom-section">
                <div className="ingredients">
                    <div className="card-ingredient-info transition">
                        {
                            data.ingredients.map(ingredient => (
                                <span className="card-ingredient-text" key={`${ingredient.name}-${ingredient.id}`}>- {ingredient.name} {ingredient.pivot.amount}<br/></span>
                            ))
                        }
                    </div>
                    <div className="recipe-button-container">
                        <button className="add-to-list-btn transition">Add To List</button>
                    </div>
                </div>
                <div className="recipe-card-buttons">
                    <div className="svg-with-count">
                        <IoMdShareAlt className="card-svg" style={{marginLeft:"18px"}}/>
                    </div>
                    <div className="svg-with-count">
                        <span>{data.comments_count}</span><BiSolidCommentMinus className="card-svg"/>
                    </div>
                    <div className="svg-with-count">
                        <span>{likesCount}</span> <AiFillHeart className="card-svg" onClick={likeHandler}/>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default RecipeCard;