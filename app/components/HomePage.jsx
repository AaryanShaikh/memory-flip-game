"use client"
import React, { useState } from 'react'
import styles from '../styles/HomePage.module.css'
import Settings from './Settings'
import Game from './Game'

const HomePage = () => {
    const [pageSelected, setpageSelected] = useState("home")
    const [difficulty, setdifficulty] = useState("Easy")

    const handleCloseClick = () => {
        window.close();
    };

    return (
        <div className={styles.main}>
            {
                pageSelected == "home" ? <>
                    <div className={styles.title}>
                        <h1>Memory Flip Game</h1>
                        <h4>Difficulty selected : <span className={difficulty == "Easy" ? styles.easy : difficulty == "Medium" ? styles.medium : styles.hard}>{difficulty}</span></h4>
                    </div>
                    <div className={styles.options}>
                        <button onClick={() => { setpageSelected("game") }}>Start Game</button>
                        <button onClick={() => { setpageSelected("settings") }}>Settings</button>
                        <button onClick={handleCloseClick}>Quit</button>
                    </div>
                </> : pageSelected == "settings" ?
                    <Settings setpageSelected={setpageSelected} setdifficulty={setdifficulty} />
                    : pageSelected == "game" ?
                        <Game difficulty={difficulty} /> : ""
            }
        </div>
    )
}

export default HomePage