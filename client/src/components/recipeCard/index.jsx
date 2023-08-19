import { useState, useCallback } from "react";
import "./styles.css"
import RecipeModal from "../modal";
import { AiFillHeart } from 'react-icons/ai';
import { BiSolidCommentMinus } from 'react-icons/bi';
import { IoMdShareAlt } from 'react-icons/io';

const RecipeCard = () => {

    const [isModalOpen, setIsModalOpen] = useState(false)

    const toggleModal = useCallback(() => {
        setIsModalOpen(prevValue => !prevValue);
    }, []);

    return ( 
        <>
        <RecipeModal isOpen={isModalOpen} toggleModal={toggleModal}/>
        <div className="recipe-card transition" onClick={() => setIsModalOpen(true)}>
            <div className="recipe-image">
                <img src="https://cdn.pixabay.com/photo/2016/12/26/17/28/spaghetti-1932466_1280.jpg"></img>
            </div>
            <div className="recipe-name-container">
                <span className="recipe-title">Recipe Name</span>
            </div>
            <div className="recipe-card-bottom-section">
                <div className="ingredients">
                    <p>
                        - ingredient 1 300g<br/>
                        - ingredient 2 250g<br/>
                        - ingredient 3 175g<br/>
                    </p>
                <div className="recipe-button-container">
                    <button className="add-to-list-btn transition">Add To List</button>
                </div>
                </div>
                <div className="recipe-card-buttons">
                    <div className="svg-with-count">
                        <IoMdShareAlt className="card-svg" style={{marginLeft:"18px"}}/>
                    </div>
                    <div className="svg-with-count">
                        <span>60</span><BiSolidCommentMinus className="card-svg"/>
                    </div>
                    <div className="svg-with-count">
                        <span>55</span> <AiFillHeart className="card-svg"/>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default RecipeCard;