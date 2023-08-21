import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const RecipeCardCarousel = ({ images }) => {
    return (
        <Carousel 
            dynamicHeight={false} 
            className={"carousal"} 
            showThumbs={false} 
            autoPlay={true} 
            showStatus={false} 
            infiniteLoop={true} 
            showArrows={false} 
            showIndicators={false}
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