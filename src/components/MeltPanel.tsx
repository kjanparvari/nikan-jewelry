import React, {useContext, useState} from 'react';
import {themeContext} from "../App";
import DailySideBar from "./DailySideBar";
import DailyContentPanel from "./DailyContentPanel";
import MeltSideBar from "./MeltSideBar";
import MeltContentPanel from "./MeltContentPanel";

function MeltPanel(props: any) {
    const [chosenPerson, setChosenPerson] = useState(null);
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