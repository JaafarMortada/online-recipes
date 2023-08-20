import { AiOutlineSend } from 'react-icons/ai';
import MyButton from '../../button';
import CommentBubble from '../../comment';
import TextInput from '../../textInput/Index';
import ModalImage from '../modalImage';
import { sendRequest } from '../../../config/request';
import { useEffect, useState } from 'react';
import EmptyComments from '../../../assets/animated/emptyComments';
const RecipeInfoModalContent = ({ data }) => {

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
            <div className='recipe-modal-content-left'>
                <h1 className='showcase-header'>{data.name}</h1>
                {
                    data.images?.map(image_data => (
                        <ModalImage key={image_data.id} src={`http://localhost:8000/storage/${image_data.image_url}`} />
                    ))
                }
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
                                <br/> Be the first to comment
                            </span>
                        </>

                    }
                </div>
                <h1 className='comments-header showcase-header'>Comments</h1>
            </div>
        </div>
    );
}

export default RecipeInfoModalContent;