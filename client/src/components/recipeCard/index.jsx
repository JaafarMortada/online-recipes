import { useState, useCallback } from "react";
import "./styles.css"
import RecipeModal from "../modal";
import { AiFillHeart } from 'react-icons/ai';
import { BiSolidCommentMinus } from 'react-icons/bi';
import { IoMdShareAlt } from 'react-icons/io';
import { sendRequest } from "../../config/request";
const RecipeCard = ( { data } ) => {

    const [likesCount, setLikesCount] = useState(data.likes_count)
    const [like, setLike] = useState(data.is_liked);
    const likeHandler = async () => {
        if (!like){
            setLikesCount(likesCount + 1)
        }
        setLike(true)
        try {
            const response = await sendRequest({
                method: "POST",
                route: "/api/like",
                body: {recipe_id: data.id},
            });
            if(response.message === "success"){
                
                
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
                        <button className={`add-to-list-btn transition ${data.in_list ? 'in-list' : ''}`} disabled={data.in_list}>{data.in_list? "In your List" :'Add To List'}</button>
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
                        <span>{likesCount}</span> <AiFillHeart id={`$like-btn-${data.id}`} className={`card-svg  ${data.is_liked? 'red-like' : '' } ${like ? 'red-like' : ''}`} onClick={likeHandler}/>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default RecipeCard;