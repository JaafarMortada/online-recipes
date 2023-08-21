import Lottie from "lottie-react";
import clickHereAnimation from "./animation_lll70u6t.json"

const ClickHere = ( {onClick} ) => <Lottie onClick={onClick} animationData={clickHereAnimation} loop={true} style={{height:"120px"}}/>;

export default ClickHere;