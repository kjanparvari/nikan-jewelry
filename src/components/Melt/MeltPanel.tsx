import React, {useContext, useState} from 'react';
import {themeContext} from "../../App";
import DailySideBar from "../Daily/DailySideBar";
import DailyContentPanel from "../Daily/DailyContentPanel";
import MeltSideBar from "./MeltSideBar";
import MeltContentPanel from "./MeltContentPanel";

const retrieveMembers = () => {
    const mems = localStorage.getItem("melt-members");
    if (mems === null || mems === undefined || mems === null) {
        localStorage.setItem("melt-members", JSON.stringify({maxId: "0", list: []}));
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

function MeltPanel({defaultPerson}: any) {
    localStorage.setItem("last", "melt");
    const [chosenPerson, setChosenPerson] = useState(defaultPerson);
    const [members, setMembers] = useState(retrieveMembers());
    const {theme} = useContext(themeContext);
    const deleteMember = (id: string) => {
        const {maxId, list} = JSON.parse(localStorage.getItem("melt-members") as string);
        const newMembers = list.filter((member: any) => {
            return member.id !== id;
        });
        localStorage.setItem("melt-members", JSON.stringify({maxId: maxId, list: newMembers}));
        localStorage.removeItem("M:" + id);
        localStorage.setItem("last", "melt");
        setMembers({maxId: maxId, list: newMembers});
        setChosenPerson(null);
    };
    const editMember = (id: number, name: string) => {
        let m: any = localStorage.getItem("melt-members");
        if (m !== null) {
            m = JSON.parse(m);
            for (let i in m.list) {
                if (m.list[i].id === id) {
                    // @ts-ignore
                    m.list[i].name = name;
                    setMembers({...m});
                    setChosenPerson({...m.list[i]});
                    localStorage.setItem("melt-members", JSON.stringify(m));
                    break;
                }
            }
        }
    };

    const editOwings = (ogold: number, omoney: number) => {
        setChosenPerson((prevState: any) => {
            prevState.oGold = ogold;
            prevState.oMoney = omoney;
            return prevState
        });
    };

    return (
        <div className="theme-light">
            <MeltSideBar choosePerson={(person: any) => {
                setChosenPerson(() => person)
            }} members={members} setMembers={setMembers}/>
            {/*<div className="text-white" style={{fontSize: 25}}>{updateVal}</div>*/}
            {chosenPerson !== null ? <MeltContentPanel
                    editOwings={editOwings}
                    chosenPerson={chosenPerson}
                    deleteMember={(id: string) => deleteMember(id)}
                    editMember={(id: number, name: string) => editMember(id, name)}/>
                : <div/>}
        </div>
    );
}

export default MeltPanel;