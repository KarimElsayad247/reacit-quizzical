import React, { useState } from "react";
import { nanoid } from "nanoid";
import data from "../data";
import Question from "./Question";

// From
// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
// Return a copy of the input array with all elements shuffled.
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


/**
 * Create an array of questions where each question object contains a tiltle,
 * and an array of choices.
 * 
 * @return array of {
 *    question: "what is bla bla",
 *    choices: [{
*       text: choice,
        isChosen: false,
        isCorrect: choice === correct_answer,
        isWrong: choice !== correct_answer
 *   }, and three others like that]
 * }
 */
function createQuestions(dataArray) {

    const questions = dataArray.map(item => {
        const correctAnswer = item.correct_answer;
        
        // An array containing all the choices, 3 incorrect and one correct
        const choices = [...item.incorrect_answers, item.correct_answer];

        // If I don't shuffle the choices, they will be in the same order everytime,
        // with the correct answer being the 4th choice.
        const choicesShuffled = shuffle(choices);

        // Create an object for each choice. Objects button state default to empty strings,
        // they should take on values like "wrong" or "chosen" or "correct"
        // and coloring will happen in css.
        const choicesObjects = choicesShuffled.map(choice => ({
            text: choice,
            isChosen: false,
            isCorrect: choice === correctAnswer,
            isWrong: choice !== correctAnswer
        }));

        return {
            question: item.question,
            choices: choicesObjects
        }
    });
    return questions;
}

export default function GameScreen() {

    const [checked, setChecked] = useState(false);

    // Contains the objects for each question. 
    const [questions, setQuestions] = useState(createQuestions(data.results));
    
    // An array the contains whethe a paricular answer is correctly chosen.
    // At start, no answer is chosen, so it's all false.
    const [correctlyChosen, setCorrectlyChosen] = useState(Array(5).fill(false));

    const questionElements = questions.map((q, i) => (
            <Question  
                key={nanoid()}
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
        }
        else { // restart game
            setChecked(false);
            // fetch("https://opentdb.com/api.php?amount=5&category=22&difficulty=easy&type=multiple")
            // .then(res => res.json())
            // .then(data => setQuestions(data["results"]))
            // .then(setCorrectlyChosen(Array(5).fill(false)));
        }
    }

    // Question components 
    function toggleCorrectChoice(id, newValue) {
        setCorrectlyChosen(prevChosen => prevChosen.map((choice, i) => i == id ? newValue : choice))
    }

    function numCorrect() {
        return correctlyChosen.filter(isChosen => isChosen === true).length
    }

    return (
        <main className="game-screen">
            <div className="questions-container">{questionElements}</div>
            <div className="bottom">
                {checked && <p>You scored {numCorrect()}/5 correct answers</p>}
                <button onClick={check} className="check-button">
                    {checked ? "Play again" : "Check answers"}
                </button>
            </div>
        </main>
    );
}