import ReactModal from 'react-modal';
import "./styles.css"
import TextInput from '../textInput/Index';
import MyButton from '../button';
import { AiOutlineSend } from 'react-icons/ai';
import CommentBubble from '../comment';
import ModalImage from './modalImage';

const RecipeModal = ({toggleModal, isOpen}) => {
    return ( 
        <ReactModal
                isOpen={isOpen}
                onRequestClose={toggleModal}
                style={{
                    overlay: {
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.75)',
                        zIndex:'998'
                    },
                    content: {
                        position: 'absolute',
                        top: '40px',
                        left: '275px',
                        right: '275px',
                        bottom: '40px',
                        border: '1px solid rgb(247, 129, 91)',
                        background: '#F3F3F3',
                        overflow: 'auto',
                        WebkitOverflowScrolling: 'touch',
                        borderRadius: '4px',
                        outline: 'none',
                        padding: '20px',
                        zIndex:'999',
                        minWidth: '600px'
                    }
                }}
                
            >
                <div className='recipe-modal-content'>
                    <div className='recipe-modal-content-left'>
                    <h1 className='showcase-header'>Recipe Showcase</h1>
                        <ModalImage src={"https://cdn.pixabay.com/photo/2016/12/26/17/28/spaghetti-1932466_1280.jpg"}/>
                    </div>
                    <div className='recipe-modal-content-right'>
                        <div className='send-comment'>
                            <TextInput placeholder={'write a comment!'}/>
                            <MyButton label={< AiOutlineSend /> } styles={{marginTop:"10px", width:"40px"}}/>
                        </div>
                        <div className='comments-container'>
                            <CommentBubble/>
                        </div>
                        <h1 className='comments-header'>Comments</h1>
                    </div>
                </div>
            </ReactModal>
    );
}

export default RecipeModal;