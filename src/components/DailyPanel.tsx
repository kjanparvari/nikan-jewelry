import React, {useContext, useState} from 'react';
import DailySideBar from "./DailySideBar";
import DailyContentPanel from "./DailyContentPanel";
import {themeContext} from "../App";
// @ts-ignore
import Tilt from 'react-tilt/dist/tilt.js';

function DailyPanel({defaultPerson}: any) {
    localStorage.setItem("last", "daily");
    const [chosenPerson, setChosenPerson] = useState(defaultPerson);
    const theme = useContext(themeContext);
    return (
        <div className="theme-light">
            <DailySideBar choosePerson={(person: any) => {
                setChosenPerson(() => person)
            }}/>
            {/*<div className="text-white" style={{fontSize: 25}}>{updateVal}</div>*/}
            {chosenPerson !== null ? <DailyContentPanel
                    chosenPerson={chosenPerson}/>
                : <div/>}
        </div>
    );
}

export default DailyPanel;