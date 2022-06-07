import React from "react";

// From
// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

function Choice(props) {
    return (
        <button className="choice-button">{props.text}</button>
    )
}

export default function Question(props) {

    const choices = [...props.incorrect_answers, props.correct_answer];
    const choiceButtons = choices.map(choice => <Choice text={choice}/>)

    return (
        <section className="question">
            <h2 className="question-text">{props.question}</h2>
            <div className="button-group">{choiceButtons}</div>
        </section>
    );
}