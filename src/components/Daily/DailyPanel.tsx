import React, {useContext, useState} from 'react';
import DailySideBar from "./DailySideBar";
import DailyContentPanel from "./DailyContentPanel";
import {themeContext} from "../../App";
// @ts-ignore
import Tilt from 'react-tilt/dist/tilt.js';

const retrieveMembers = () => {
    const mems = localStorage.getItem("daily-members");
    if (mems === null) {
        localStorage.setItem("daily-members", JSON.stringify({maxId: "0", list: []}));
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


function DailyPanel({defaultPerson}: any) {
    localStorage.setItem("last", "daily");
    const [chosenPerson, setChosenPerson] = useState(defaultPerson);
    const [members, setMembers] = useState(retrieveMembers());
    const {theme} = useContext(themeContext);

    const deleteMember = (id: string) => {
        const {maxId, list} = JSON.parse(localStorage.getItem("daily-members") as string);
        const newMembers = list.filter((member: any) => {
            return member.id !== id;
        });
        localStorage.setItem("daily-members", JSON.stringify({maxId: maxId, list: newMembers}));
        localStorage.removeItem("D:" + id);
        localStorage.setItem("last", "daily");
        setChosenPerson(null);
        setMembers({maxId: maxId, list: newMembers});
    };

    const editMember = (id: number , name: string, phone: string) => {
        let m: any = localStorage.getItem("daily-members");
        if (m !== null) {
            m = JSON.parse(m);
            for (let i in m.list) {
                if (m.list[i].id === id) {
                    // @ts-ignore
                    m.list[i].name = name;
                    // @ts-ignore
                    m.list[i].phone = phone;
                    setChosenPerson({...m.list[i]});
                    setMembers({...m});
                    localStorage.setItem("daily-members", JSON.stringify(m));
                    break;
                }
            }
        }

    };

    return (
        <div className="theme-light">
            <DailySideBar choosePerson={(person: any) => {
                setChosenPerson(() => person)
            }} members={members} setMembers={setMembers}/>
            {/*<div className="text-white" style={{fontSize: 25}}>{updateVal}</div>*/}
            {chosenPerson !== null ? <DailyContentPanel
                    chosenPerson={chosenPerson}
                    deleteMember={(id: string) => deleteMember(id)}
                    editMember={(id: number, name: string, phone: string) => editMember(id, name, phone)}
                />
                : <div/>}
        </div>
    );
}

export default DailyPanel;