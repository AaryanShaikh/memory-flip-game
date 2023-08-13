import React, { useEffect, useState } from 'react'
import styles from '../styles/Game.module.css'
import emojis from '../data/cards.json'
import { message } from 'antd';

const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
};

const Game = ({ difficulty }) => {
    const [mockData, setmockData] = useState([])
    const [isSel, setisSel] = useState({ first: null, second: null })
    const [isClickON, setisClickON] = useState(true)
    const [pairComplete, setpairComplete] = useState(difficulty == "Easy" ? 8 : 18)

    useEffect(() => {
        let temp = []
        let len = difficulty == "Easy" ? 8 : 18
        for (let index = 0; index < len; index++) {
            temp.push({ ...emojis[index], "isActive": false })
            temp.push({ ...emojis[index], "isActive": false })
        }
        const shuffledData = shuffleArray(temp);
        setmockData(shuffledData)
    }, [])

    useEffect(() => {
        if (pairComplete == 0) {
            message.success("You Win!!! New Game will begin in 5s")
            setTimeout(() => {
                let temp = []
                let len = difficulty == "Easy" ? 8 : 18
                for (let index = 0; index < len; index++) {
                    temp.push({ ...emojis[index], "isActive": false })
                    temp.push({ ...emojis[index], "isActive": false })
                }
                const shuffledData = shuffleArray(temp);
                setmockData(shuffledData)
                setisSel({ first: null, second: null })
                setpairComplete(difficulty == "Easy" ? 8 : 18) 
            }, 5000)
        }
    }, [pairComplete])

    const onCardClicked = (val, key) => {
        if (isSel.first == null) {
            const tempData = [...mockData];
            tempData[key].isActive = true;
            setmockData(tempData)
            setisSel({ ...isSel, "first": { "val": val, "key": key } })
        } else if (isSel.second == null) {
            if (key != isSel.first.key) {
                const tempData = [...mockData];
                tempData[key].isActive = true;
                setmockData(tempData)
                setisClickON(false)
                setTimeout(() => {
                    if (val != isSel.first.val) {
                        const tempData = [...mockData];
                        tempData[key].isActive = false;
                        tempData[isSel.first.key].isActive = false;
                        setmockData(tempData)
                        setisSel({ first: null, second: null })
                    } else {
                        setisSel({ first: null, second: null })
                        setpairComplete(prev => prev - 1)
                        if (difficulty == "Hard") {
                            const shuffledData = shuffleArray(mockData);
                            setmockData(shuffledData)
                        }
                    }
                    setisClickON(true)
                }, 500)
            }
        }
    }

    return (
        <div className={`${styles.main} ${difficulty != "Easy" ? styles.hard : ""}`}>
            <div className={styles.match}>matches left : {pairComplete}</div>
            {
                mockData.map((ele, ind) => {
                    return <div onClick={() => { isClickON && !ele.isActive ? onCardClicked(ele.value, ind) : "" }} key={ind} className={`${styles.card} ${ele.isActive ? styles.active : ""}`}>
                        <img src={ele.emogy} />
                    </div>
                })
            }
        </div>
    )
}

export default Game