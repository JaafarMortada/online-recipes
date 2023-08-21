import {
    FacebookShareButton,
    WhatsappShareButton,
    TwitterShareButton,
    TwitterIcon,
    WhatsappIcon,
    FacebookIcon,
} from 'react-share';

const ShareButtons = ({ data }) => {
    return (
        <>
            <WhatsappShareButton
                url={`www.platepalette.com/${data.name.replace(/\s/g, "_")}\n`}
                title={`Check out this delicious recipe:\nRecipe name: ${data.name}\n`}
                windowHeight={'900'}
                windowWidth={'900'}
            >
                <WhatsappIcon size={40} round={true} bgStyle={{ fill: "rgb(247, 129, 91)" }} iconFillColor='rgb(18, 20, 33)' />
            </WhatsappShareButton>
            <TwitterShareButton
                url={`www.platepalette.com/${data.name.replace(/\s/g, "_")}\n`}
                title={`Check out this delicious recipe:\nRecipe name: ${data.name} \n`}
                hashtags={["PlatePlatte_recipe \n", `${data.name.replace(/\s/g, "_")} \n`]}
                windowHeight={'900'}
                windowWidth={'900'}
            >
                <TwitterIcon size={40} round={true} bgStyle={{ fill: "rgb(247, 129, 91)" }} iconFillColor='rgb(18, 20, 33)' />
            </TwitterShareButton>
            <FacebookShareButton
                url={`www.platepalette.com/${data.name.replace(/\s/g, "_")}`}
                hashtag={`#PlatePlatte_recipe`}
                windowHeight={'900'}
                windowWidth={'900'}
            >
                <FacebookIcon size={40} round={true} bgStyle={{ fill: "rgb(247, 129, 91)" }} iconFillColor='rgb(18, 20, 33)' />
            </FacebookShareButton>
        </>
    );
}

export default ShareButtons;