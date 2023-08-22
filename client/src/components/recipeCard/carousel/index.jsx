import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const RecipeCardCarousel = ({ images, showIndicators, showArrows, showStatus }) => {
    return (
        <Carousel 
            dynamicHeight={false} 
            className={"carousal"} 
            showThumbs={false} 
            autoPlay={true} 
            showStatus={showStatus} 
            infiniteLoop={true} 
            showArrows={showArrows} 
            showIndicators={showIndicators}
        >
            {
                images?.map(image_data => (
                    <img key={image_data.id} src={`http://localhost:8000/storage/${image_data.image_url}`} ></img>
                ))
            }
        </Carousel>
    );
}

export default RecipeCardCarousel;