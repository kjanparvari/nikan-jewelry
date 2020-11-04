import React, {useContext, useState} from 'react';
import BorrowedSideBar from "./BorrowedSideBar";
import BorrowedContentPanel from "./BorrowedContentPanel";
import {themeContext} from "../../App";
// @ts-ignore
import Tilt from 'react-tilt/dist/tilt.js';

function BorrowedPanel({defaultPerson}: any) {
    localStorage.setItem("last", "borrowed");
    const [chosenPerson, setChosenPerson] = useState(defaultPerson);
    const {theme} = useContext(themeContext);
    return (
        <div className="theme-light">
            <BorrowedSideBar choosePerson={(person: any) => {
                setChosenPerson(() => person)
            }}/>
            {/*<div className="text-white" style={{fontSize: 25}}>{updateVal}</div>*/}
            {chosenPerson !== null ? <BorrowedContentPanel
                    chosenPerson={chosenPerson}/>
                : <div/>}
        </div>
    );
}

export default BorrowedPanel;