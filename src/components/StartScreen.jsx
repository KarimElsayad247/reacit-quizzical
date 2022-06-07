import React from "react";

export default function StartScreen(props) {
    return (
        <main className="start-screen">
            <h1>Quizzical</h1>
            <h2>A Quiz game made with react!</h2>
            <button onClick={props.startGame} >Start Quiz</button>
        </main>
    );
}