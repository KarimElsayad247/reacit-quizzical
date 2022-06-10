/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
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

    // if (props.checked) {
    //     if (choicesState.some(choice => choice.isChosen && choice.isCorrect)) {
    //         props.incrementCorrectAnswers();
    //     }
    // }

    /**
     * Toggle the clicked button. It it's not the selected button,
     * make it the only selected button.
     * 
     * @param id index of the clicked button 
     */
    function toggle(id) {
        // Toggle the clicked button, and clear all other buttons, so it's only
        // one button that has state of "chosen"
        // if (!props.checked) {
        //     setChoicesState(prevChoices => prevChoices.map((prevChoiceState, i) => ({
        //         ...prevChoiceState,
        //         isChosen: i == id ? !prevChoiceState.isChosen : ""
        //     })));
        // }
    }

    // useEffect(() => {
    //     const isCorrectlyChosen = choicesState.some(choice => choice.isChosen && choice.isCorrect);
    //     props.toggleCorrectChoice(props.id, isCorrectlyChosen);
    // }, [choicesState]);

    return (
        <section className="question">
            <h2 className="question-text">{props.question}</h2>
            <div className="button-group">{choiceButtons}</div>
        </section>
    );
}