/* eslint-disable react/prop-types */
import React from "react";
import { nanoid } from "nanoid";

export default function Question(props) {

    // Colorization will happen in css depending on the class of the button
    // and the state of the game (check button pressed or not)
    const choiceButtons = props.choices.map((choice, i) => {
        const classNames = {
            chosen: choice.isChosen ? "chosen" : "", 
            correct: choice.isCorrect && props.checked ? "correct" : "",
            wrong: choice.isWrong && props.checked ? "wrong" : "",
            faint: props.checked ? "faint" : ""
        }
        return (<button 
                    key={nanoid()}
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

    /**
     * Toggle the clicked button. It it's not the selected button,
     * make it the only selected button.
     * 
     * @param id index of the clicked button 
     */
    function toggle(id) {
        // Toggle the clicked button, and clear all other buttons, so it's only
        // one button that has state of "chosen"
        if (!props.checked) {
            props.toggleChoice(props.id, id);
            // const isCorrectlyChosen = props.choices.some(choice => choice.isChosen && choice.isCorrect);
            // props.toggleCorrectChoice(props.id, isCorrectlyChosen);
        }
    }

    return (
        <section className="question">
            <h2 className="question-text">{props.question}</h2>
            <div className="button-group">{choiceButtons}</div>
        </section>
    );
}