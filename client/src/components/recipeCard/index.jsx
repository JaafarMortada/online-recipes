import { useState, useCallback } from "react";
import "./styles.css"
import RecipeModal from "../modal";
import { AiFillHeart } from 'react-icons/ai';
import { BiSolidCommentMinus } from 'react-icons/bi';
import { sendRequest } from "../../config/request";
import RecipeCardCarousel from "./carousel";
import ClickHere from "../../assets/animated/clickHere";


const RecipeCard = ({ data, addToListCallback }) => {

    const [likesCount, setLikesCount] = useState(data.likes_count)
    const [commentsCount, setCommentsCount] = useState(data.comments_count)
    const [like, setLike] = useState(data.is_liked);
    const [inList, setInList] = useState(data.in_list);
    const likeRequest = async () => {
        try {
            await sendRequest({
                method: "POST",
                route: !like ? "/api/like" : "/api/unlike",
                body: { recipe_id: data.id },
            });
        } catch (error) {
            console.log(error)
        }
    }

    const likeHandler = () => {
        likeRequest()
        setLike(like ? false : true)
        setLikesCount(!like? likesCount+1 : likesCount-1)
        }

    const addToListHandler = async () => {
        setInList(true)
        try {
            const response = await sendRequest({
                method: "POST",
                route: "/api/add_to_list",
                body: { recipe_id: data.id },
            })
            if(response.message === "item added successfully"){
                addToListCallback(data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const [isModalOpen, setIsModalOpen] = useState(false)

    const toggleModal = useCallback(() => {
        setIsModalOpen(prevValue => !prevValue);
    }, []);

    const incrementCommentsCount = useCallback(() => {
        setCommentsCount(commentsCount + 1);
    }, []);

    return (
        <>
            <RecipeModal isOpen={isModalOpen} toggleModal={toggleModal} data={data} from={"card"} commentsCallback={incrementCommentsCount}/>
            <div className="recipe-card transition" onClick={() => setIsModalOpen(true)}>
                <div className="recipe-image">
                    <RecipeCardCarousel images={data.images} showIndicators={false} showArrows={false} showStatus={false} />
                </div>
                <div className="recipe-name-container" >
                    <span className="recipe-title">{data.name}</span>
                </div>
                <div className="recipe-card-bottom-section">
                    <div className="card-bottom-left-text">
                        <div className="card-cuisine-div">
                            <span className="cuisine-indicator">Cuisine: </span><span className="card-cuisine transition">{data.cuisine.name}</span>
                        </div>
                        <div className="recipe-button-container">
                            <button
                                className={`add-to-list-btn transition ${inList ? 'in-list' : ''}`}
                                disabled={inList}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    addToListHandler()
                                }}
                            >{inList ? "In your List" : 'Add To List'}</button>
                        </div>
                    </div>
                    <div className="recipe-card-buttons">
                        <div className="svg-with-count">
                            <span>{commentsCount}</span>
                            <BiSolidCommentMinus 
                                className="card-svg transition" 
                                onClick={() => setIsModalOpen(true)}
                            />
                        </div>
                        <div className="svg-with-count">
                            <span>{likesCount}</span> 
                            <AiFillHeart 
                                id={`$like-btn-${data.id}`} 
                                className={`card-svg transition ${like ? 'red-like' : ''}`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    likeHandler()
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className="click-here-div">
                    <ClickHere onClick={() => setIsModalOpen(true)}/>
                </div>
            </div>
        </>
    );
}

export default RecipeCard;