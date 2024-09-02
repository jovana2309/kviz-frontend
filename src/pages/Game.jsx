import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../services/axios";
import TitleWithBackButton from "../components/TitleWithBackButton";
import "./Game.css";


function Game () {

    const [question,setQuestion] = useState(null);
    const [error, setError] = useState(null);
    const isRequesting =useRef(false);


    useEffect(() => { 
        const fetchData = async() => {
        try {
            if (isRequesting.current) return;
            isRequesting.current = true;


          const response = await axiosInstance.get("/play");
         setQuestion(response.data);
        } catch (err) {
            setError(err);
        } finally {
            isRequesting.current = false;
        }
        };

        fetchData();
    },
    []); 


    const submitAnswer = async (e) => {
       try {
        setQuestion(null);
        const response = await axiosInstance.post("/play/submitAnswer", {
            answer:e.target.value,
        });
        setQuestion(response.data);
       }
       catch (err) {
        setError(err);
       }
    };

    if (error) 
        return (
     <>
     <TitleWithBackButton title = "Main Menu" />
     <div>Error: {error.message}</div>
     </>
        );


        if(!question) 
            return (
        <>
        <TitleWithBackButton title = "Main Menu" />
        <div>Loading...</div>
        </>
        );


        if (question.gameOver) {
            return <GameOver score = {question.currentScore} />;
        }






    return ( 
        <>
        <TitleWithBackButton title="Main Menu" />
<div className = "cont">
<div className="quiz-container flex justify-center align-center">
    <div className="header">
        <div className="question">
            <p>{question.question}</p>
        </div>
        <div id="score">Score: 0</div>
    </div>
    <div className="answers">
        <div className="answer-group">
            <button className="answer-btn" onClick="selectAnswer('A')">A. Berlin</button>
            <button className="answer-btn" onClick="selectAnswer('B')">B. Madrid</button>
        </div>
        <div className="answer-group">
            <button className="answer-btn" onClick="selectAnswer('C')">C. Paris</button>
            <button className="answer-btn" onClick="selectAnswer('D')">D. Rome</button>
        </div>
    </div>

</div>
</div>
</>
 )
}

export default Game;