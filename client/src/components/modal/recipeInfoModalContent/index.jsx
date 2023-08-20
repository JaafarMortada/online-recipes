import { AiOutlineSend } from 'react-icons/ai';
import MyButton from '../../button';
import CommentBubble from '../../comment';
import TextInput from '../../textInput/Index';
import ModalImage from '../modalImage';

const RecipeInfoModalContent = () => {
    return (
        <div className='recipe-modal-content'>
            <div className='recipe-modal-content-left'>
                <h1 className='showcase-header'>Recipe Showcase</h1>
                <ModalImage src={"https://cdn.pixabay.com/photo/2016/12/26/17/28/spaghetti-1932466_1280.jpg"} />
            </div>
            <div className='recipe-modal-content-right'>
                <div className='send-comment'>
                    <TextInput placeholder={'write a comment!'} />
                    <MyButton label={< AiOutlineSend />} styles={{ marginTop: "10px", width: "40px" }} />
                </div>
                <div className='comments-container'>
                    <CommentBubble />
                </div>
                <h1 className='comments-header'>Comments</h1>
            </div>
        </div>
    );
}

export default RecipeInfoModalContent;