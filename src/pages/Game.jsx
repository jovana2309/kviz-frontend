import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../services/axios";
import TitleWithBackButton from "../components/TitleWithBackButton";
import "./Game.css";
import GameOver from "../components/GameOver.jsx";


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

    
    const submitAnswer = async (id) => {
       try {
        console.log(id)
        setQuestion(null);
        const response = await axiosInstance.post("/play/submitAnswer", {
            answer:id,
        });
        setQuestion(response.data);
       }
       catch (err) {
        setError(err);
       }
    };

    const fiftyFifty = async () => {
        try {
            const response = await axiosInstance.post("/play/fifty-fifty", {
                question,
            } );
            console.log(response.data)
            if (response.data.question) {
                setQuestion(response.data);
            }
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


        const emptyButton = <button className="answer-btn"></button>

    return ( 
        <>
        <TitleWithBackButton title="Main Menu" />
<div className = "cont">
<div className="quiz-container flex justify-center align-center">
    <div className="header gap-20">
        <div className="question">
            <p>{question.question}</p>
        </div>
        
        {question.lifeline && <button style = {{ 
            flex:"1",
            height: "fit-content",
            border: "2px solid",
            padding: "10px",
            backgroundColor: "purple",
            borderRadius: "10px",
            cursor: "pointer"
        }} onClick={fiftyFifty}>
            50:50
        </button> }
        <div id="score">Score: {question.currentScore}</div>
    </div>
    <div className="answers">
        <div className="answer-group">
            {question.answers[0].text ? 
                <button className="answer-btn" onClick = {()=>submitAnswer(question.answers[0].id)}>A. {question.answers[0].text}</button>
            :
                emptyButton
            }
            {question.answers[1].text ? 
            <button className="answer-btn" onClick = {()=>submitAnswer(question.answers[1].id)}>C. {question.answers[1].text}</button>
            :
                emptyButton
            }
        </div>
        <div className="answer-group">
        {question.answers[2].text ?
            <button className="answer-btn" onClick = {()=>submitAnswer(question.answers[2].id)}>B. {question.answers[2].text}</button>
        :
            emptyButton
        }
        {question.answers[3].text ?
            <button className="answer-btn" onClick= {()=>submitAnswer(question.answers[3].id)}>D. {question.answers[3].text}</button>
        :
            emptyButton
        }
        </div>
    </div>

</div>
</div>
</>
 )
}

export default Game;