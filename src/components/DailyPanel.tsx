import React, {useState} from 'react';
import SideBar from "./SideBar";
import DailyContentPanel from "./DailyContentPanel";
// @ts-ignore
import Tilt from 'react-tilt/dist/tilt.js';

function DailyPanel(props: any) {
    const [chosenPerson, setChosenPerson] = useState(null);
    return (
        <div className="">
            <SideBar choosePerson={(person: any) => {
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