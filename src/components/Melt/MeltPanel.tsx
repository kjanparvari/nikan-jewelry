import React, {useContext, useState} from 'react';
import {themeContext} from "../../App";
import DailySideBar from "../Daily/DailySideBar";
import DailyContentPanel from "../Daily/DailyContentPanel";
import MeltSideBar from "./MeltSideBar";
import MeltContentPanel from "./MeltContentPanel";

function MeltPanel({defaultPerson}: any) {
    const [chosenPerson, setChosenPerson] = useState(defaultPerson);
    const theme = useContext(themeContext);
    return (
        <div className="theme-light">
            <MeltSideBar choosePerson={(person: any) => {
                setChosenPerson(() => person)
            }}/>
            {/*<div className="text-white" style={{fontSize: 25}}>{updateVal}</div>*/}
            {chosenPerson !== null ? <MeltContentPanel
                    chosenPerson={chosenPerson}/>
                : <div/>}
        </div>
    );
}

export default MeltPanel;