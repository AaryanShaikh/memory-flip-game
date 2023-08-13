import React from 'react'
import styles from '../styles/Settings.module.css'

const Settings = ({ setpageSelected, setdifficulty }) => {
    return (
        <div className={styles.settings}>
            <div className={styles.title}>
                <h1>Change Difficulty</h1>
                <button onClick={() => { setpageSelected("home") }}>X</button>
            </div>
            <div className={styles.options}>
                <button onClick={() => { setdifficulty("Easy"); setpageSelected("home") }}>Easy</button>
                <button onClick={() => { setdifficulty("Medium"); setpageSelected("home") }}>Medium</button>
                <button onClick={() => { setdifficulty("Hard"); setpageSelected("home") }}>Hard</button>
            </div>
        </div>
    )
}

export default Settings