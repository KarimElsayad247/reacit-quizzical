import React, { useState } from "react";
import data from "../data";
import Question from "./Question";

export default function GameScreen() {

    const [checked, setChecked] = useState(false);
    const [questions, setQuestions] = useState(data["results"]);
    const [correctlyChosen, setCorrectlyChosen] = useState(Array(5).fill(false));
    const [numCorrectAnswers, setNumCorrectAnswers] = useState(0);

    const questionElements = questions.map((q, i) => (
            <Question  
                {...q} 
                checked={checked} 
                id={i}
                toggleCorrectChoice={toggleCorrectChoice}
            />
        )
    ); 

    function check() {
        if (!checked) {
            setChecked(true);
            setNumCorrectAnswers(correctlyChosen.filter(isChosen => isChosen === true).length)
        }
        else { // restart game
            setChecked(false);
            setQuestions(data["results"]);
            setNumCorrectAnswers(0);
        }
    }

    // Question components 
    function toggleCorrectChoice(id, newValue) {
        setCorrectlyChosen(prevChosen => prevChosen.map((choice, i) => i == id ? newValue : choice))
    }

    console.log(correctlyChosen);

    return (
        <main className="game-screen">
            <div className="questions-container">{questionElements}</div>
            <div className="footer">
                {checked && <p>You scored {numCorrectAnswers}/5 correct answers</p>}
                <button onClick={check} className="check-button">Check answers</button>
            </div>
        </main>
    );
}