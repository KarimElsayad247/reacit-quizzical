import React, { useState } from "react";
import data from "../data";
import Question from "./Question";

export default function GameScreen() {

    const [questions, setQuestion] = useState(data["results"])

    const questionElements = questions.map(q => <Question {...q} />) 

    return (
        <main className="game-screen">
            <div className="questions-container">{questionElements}</div>
            <button className="check-button">Check answers</button>
        </main>
    );
}