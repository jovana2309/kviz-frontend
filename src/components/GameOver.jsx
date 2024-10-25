import TitleWithBackButton from "../components/TitleWithBackButton";
import { Link } from "react-router-dom";
import "../pages/Play-again-link.css";

function GameOver( {score}) {

    return (
    <>
            <TitleWithBackButton title = "Game" />
            <div style={{padding: "200px"}} className = " flex-column align-center justify-center gap-50" > 
            {score > 14 ? (
                <h1>CONGRATULATIONS!</h1>
            ) : (
                <h1>GAME OVER</h1>
            )
        }
        <p> Your score: {score} </p>

        <Link className = "Play-again-link" reloadDocument to = "/play">
        Play Again
        </Link>
     </div>
    </>
    );
}

export default GameOver;