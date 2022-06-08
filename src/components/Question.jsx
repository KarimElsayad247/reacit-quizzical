import React, { useState } from "react";

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
            array[randomIndex], array[currentIndex]
        ];
    }

    return array;
}

export default function Question(props) {

    const [checked, setChecked] = useState(false)

    // An array containing all the choices, 3 incorrect and one correct
    const choices = [...props.incorrect_answers, props.correct_answer];
    
    // Shuffle the choices, producing another array of strings
    const choicesShuffled = shuffle(choices);
    
    console.log(choicesShuffled);

    // Create an object for each choice. Objects button state default to empty strings,
    // they should take on values like "wrong" or "chosen" or "correct"
    // and coloring will happen in css.
    const [choicesState, setChoicesState] = useState(choicesShuffled.map(choice => ({
        text: choice,
        isChosen: false
    })));

    console.log(choicesState);
    
    
    const choiceButtons = choicesState.map((choice, i) => {
        const classNames = {
            chosen: choice.isChosen ? "chosen" : "", 
        }
        return (<button 
                    key={i}
                    onClick={() => toggle(i)} 
                    className={`choice-button ${classNames.chosen}`}
                >
                    {choice.text}
                </button>)
    });

    console.log(choiceButtons)

    function toggle(id) {
        // Toggle the clicked button, and clear all other buttons, so it's only
        // one button that has state of "chosen"
        if (!checked) {
            setChoicesState(prevChoices => prevChoices.map((prevChoiceState, i) => ({
                ...prevChoiceState,
                isChosen: i == id ? !prevChoiceState.isChosen : ""
            })));
        }
        console.log(choicesState[id])
    }

    return (
        <section className="question">
            <h2 className="question-text">{props.question}</h2>
            <div className="button-group">{choiceButtons}</div>
        </section>
    );
}