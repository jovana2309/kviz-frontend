import { Link} from "react-router-dom";
import backIcon from "../assets/icons.png";

function TitleWithBackButton ({title, additionalStyles}) {
    return (
        <div style = {{marginTop: "50px", ...additionalStyles}} className = "flex justify-center align-center gap-20">
            <Link to="/">
            <img src = {backIcon} alt = "back-icon" width ={50} height = {50} />
            </Link>
            <h2 className="title"> {title}</h2>
        </div>
    );
}

export default TitleWithBackButton;