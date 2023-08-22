import { AiOutlineSend } from 'react-icons/ai';
import MyButton from '../../button';
import CommentBubble from '../../comment';
import TextInput from '../../textInput/Index';
import ModalImage from '../modalImage';
import { sendRequest } from '../../../config/request';
import { useEffect, useState } from 'react';
import EmptyComments from '../../../assets/animated/emptyComments';
import ShareButtons from '../share';
import RecipeCardCarousel from '../../recipeCard/carousel';

const RecipeInfoModalContent = ({ data, commentsCallback }) => {

    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState({
        comment: "",
        recipe_id: data.id
    })

    const handleDataChange = (e) => {
        setNewComment({ ...newComment, [e.target.name]: e.target.value })
    }

    const commentingHandler = async () => {
        try {
            const response = await sendRequest({
                method: "POST",
                route: "/api/post_comment",
                body: newComment,
            });
            if (response.status === "success") {
                setComments([...comments, newComment.comment])
                setNewComment({
                    comment: "",
                    recipe_id: data.id
                })
                commentsCallback()
            } else {
                console.log('failed')
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const getCommentsHandler = async () => {
            try {
                const response = await sendRequest({
                    method: "GET",
                    route: `/api/comments/${data.id}`,
                });
                setComments(response.comments)
            } catch (error) {
                console.log(error);
            }
        };
        getCommentsHandler()
    }, [comments])

    return (
        <div className='recipe-modal-content'>
            <div className="share-buttons-container">
                <ShareButtons data = { data }/>
            </div>
            <div className='recipe-modal-content-left'>
                <div className='modal-header-div'>
                    <h1 className='modal-header'>
                        <span>{data.name}</span><br/>
                    </h1>
                </div>
                
                <span className='modal-subheader'>Ingredients:</span>
                <div className='ingredients-container-modal'>
                    {
                        data.ingredients?.map(ingredient => (
                            <div key={`div-${ingredient.id}`} className='modal-ingredient-info'>
                                <span key={`ingredient-name-${ingredient.id}`} className='modal-ingredient-name'> &#x2022; {ingredient.name}</span>
                                <div className='separator'></div>
                                <span key={`ingredient-amount-${ingredient.id}`} className='modal-ingredient-amount'> {ingredient.pivot.amount}</span>
                            </div>
                        ))
                    }
                </div>
                <div className='modal-carousel'>
                    <RecipeCardCarousel images={data.images} showIndicators={true} showArrows={true} showStatus={true} />
                </div>
            </div>
            <div className='recipe-modal-content-right'>
                <div className='send-comment'>
                    <TextInput
                        name={"comment"}
                        value={newComment.comment}
                        placeholder={'write a comment!'}
                        onChange={handleDataChange}
                    />
                    <MyButton
                        label={< AiOutlineSend />}
                        styles={{
                            marginTop: "10px",
                            width: "40px",
                            height: "40px",
                            padding: "10px",
                            borderRadius: "50%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                        onClick={commentingHandler}
                    />
                </div>
                <div className='comments-container'>
                    {comments.length > 0 ?
                        comments?.map((comment, index) => (
                            <CommentBubble key={`${index}-${comment.commenter}`} data={comment} />
                        )) :
                        <>
                            <EmptyComments />
                            <span className='empty-comment-section'>
                                It is so quiet here...
                                <br /> Be the first to comment
                            </span>
                        </>

                    }
                </div>
                <h1 className='comments-header'>Comments</h1>
            </div>
        </div>
    );
}

export default RecipeInfoModalContent;