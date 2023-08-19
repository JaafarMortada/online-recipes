const ModalImage = ({src}) => {
    return ( 
        <div className='modal-image-container transition'>
            <img className='modal-image' src={src}/>
        </div> 
    );
}

export default ModalImage;