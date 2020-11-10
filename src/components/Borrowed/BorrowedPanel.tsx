import React, {useContext, useState} from 'react';
import BorrowedSideBar from "./BorrowedSideBar";
import BorrowedContentPanel from "./BorrowedContentPanel";
import {themeContext} from "../../App";
// @ts-ignore
import Tilt from 'react-tilt/dist/tilt.js';
import DailySideBar from "../Daily/DailySideBar";
import MeltContentPanel from "../Melt/MeltContentPanel";

const retrieveMembers = () => {
    const mems = localStorage.getItem("borrowed-members");
    if (mems === null) {
        localStorage.setItem("borrowed-members", JSON.stringify({maxId: "0", list: []}));
        return {maxId: "0", list: []};
    } else {
        if (JSON.stringify(JSON.parse(mems).list) === "[]") {
            const maxId = JSON.parse(mems).maxId;
            console.log("here");
            return {maxId: maxId, list: []};
        }
        return JSON.parse(mems);
    }
};

function BorrowedPanel({defaultPerson}: any) {
    localStorage.setItem("last", "borrowed");
    const [chosenPerson, setChosenPerson] = useState(defaultPerson);
    const [members, setMembers] = useState(retrieveMembers());
    const {theme} = useContext(themeContext);

    const deleteMember = (id: string) => {
        const {maxId, list} = JSON.parse(localStorage.getItem("borrowed-members") as string);
        const newMembers = list.filter((member: any) => {
            return member.id !== id;
        });
        localStorage.setItem("borrowed-members", JSON.stringify({maxId: maxId, list: newMembers}));
        localStorage.removeItem("B:" + id);
        localStorage.setItem("last", "borrowed");
        setChosenPerson(null);
        setMembers({maxId: maxId, list: newMembers});
    };

    const editMember = (id: number, name: string) => {
        let m: any = localStorage.getItem("borrowed-members");
        if (m !== null) {
            m = JSON.parse(m);
            for (let i in m.list) {
                if (m.list[i].id === id) {
                    // @ts-ignore
                    m.list[i].name = name;
                    setMembers({...m});
                    setChosenPerson({...m.list[i]});
                    localStorage.setItem("borrowed-members", JSON.stringify(m));
                    break;
                }
            }
        }

    };
    const editOwings = (ogold: number) => {
        setChosenPerson((prevState: any) => {
            prevState.oGold = ogold;
            return prevState
        });
    };

    return (
        <div className="theme-light">
            <BorrowedSideBar choosePerson={(person: any) => {
                setChosenPerson(() => person)
            }} members={members} setMembers={setMembers}/>
            {/*<div className="text-white" style={{fontSize: 25}}>{updateVal}</div>*/}
            {chosenPerson !== null ? <BorrowedContentPanel
                    chosenPerson={chosenPerson}
                    editOwings={editOwings}
                    deleteMember={(id: string) => deleteMember(id)}
                    editMember={(id: number, name: string) => editMember(id, name)}/>
                : <div/>}
        </div>
    );
}

export default BorrowedPanel;