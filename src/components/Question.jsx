import React, { useState, useEffect } from "react";

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

    // An array containing all the choices, 3 incorrect and one correct
    const choices = [...props.incorrect_answers, props.correct_answer];
    
    // Shuffle the choices, producing another array of strings
    const choicesShuffled = shuffle(choices);

    // Create an object for each choice. Objects button state default to empty strings,
    // they should take on values like "wrong" or "chosen" or "correct"
    // and coloring will happen in css.
    const [choicesState, setChoicesState] = useState(choicesShuffled.map(choice => ({
        text: choice,
        isChosen: false,
        isCorrect: choice === props.correct_answer,
        isWrong: choice !== props.correct_answer
    })));

    const choiceButtons = choicesState.map((choice, i) => {
        const classNames = {
            chosen: choice.isChosen ? "chosen" : "", 
            correct: choice.isCorrect && props.checked ? "correct" : "",
            wrong: choice.isWrong && props.checked ? "wrong" : "",
            faint: props.checked ? "faint" : ""
        }
        return (<button 
                    key={i}
                    onClick={() => toggle(i)} 
                    className={`choice-button 
                                ${classNames.chosen} 
                                ${classNames.correct} 
                                ${classNames.wrong}
                                ${classNames.faint}`}
                >
                    {choice.text}
                </button>)
    });

    // if (props.checked) {
    //     if (choicesState.some(choice => choice.isChosen && choice.isCorrect)) {
    //         props.incrementCorrectAnswers();
    //     }
    // }

    function toggle(id) {
        // Toggle the clicked button, and clear all other buttons, so it's only
        // one button that has state of "chosen"
        if (!props.checked) {
            setChoicesState(prevChoices => prevChoices.map((prevChoiceState, i) => ({
                ...prevChoiceState,
                isChosen: i == id ? !prevChoiceState.isChosen : ""
            })));
        }
    }

    useEffect(() => {
        const isCorrectlyChosen = choicesState.some(choice => choice.isChosen && choice.isCorrect);
        props.toggleCorrectChoice(props.id, isCorrectlyChosen);
    }, [choicesState]);

    return (
        <section className="question">
            <h2 className="question-text">{props.question}</h2>
            <div className="button-group">{choiceButtons}</div>
        </section>
    );
}