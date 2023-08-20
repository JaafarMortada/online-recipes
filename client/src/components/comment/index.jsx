import './styles.css'

const CommentBubble = ({ data }) => {
    return ( 
        <div className='comment-bubble'>
            <span className='comment-commenter'>{data.commenter}</span>
            <span className='comment-content'>{data.comment}</span>
        </div>
    );
}

export default CommentBubble;