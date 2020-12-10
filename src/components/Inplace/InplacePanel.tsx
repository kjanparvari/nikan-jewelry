import React, {useContext, useState} from 'react';
import InplaceSideBar from "./InplaceSideBar";
import InplaceContentPanel from "./InplaceContentPanel";
import {themeContext} from "../../App";
// @ts-ignore
import Tilt from 'react-tilt/dist/tilt.js';

const retrieveMembers = () => {
    const mems = localStorage.getItem("inplace-members");
    if (mems === null) {
        localStorage.setItem("inplace-members", JSON.stringify({maxId: "0", list: []}));
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


function InplacePanel({defaultPerson}: any) {
    localStorage.setItem("last", "inplace");
    const [chosenPerson, setChosenPerson] = useState(defaultPerson);
    const [members, setMembers] = useState(retrieveMembers());
    const {theme} = useContext(themeContext);

    const deleteMember = (id: string) => {
        const {maxId, list} = JSON.parse(localStorage.getItem("inplace-members") as string);
        const newMembers = list.filter((member: any) => {
            return member.id !== id;
        });
        localStorage.setItem("inplace-members", JSON.stringify({maxId: maxId, list: newMembers}));
        localStorage.removeItem("I:" + id);
        localStorage.setItem("last", "inplace");
        setChosenPerson(null);
        setMembers({maxId: maxId, list: newMembers});
    };

    const editMember = (id: number, name: string, phone: string) => {
        let m: any = localStorage.getItem("inplace-members");
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
                    localStorage.setItem("inplace-members", JSON.stringify(m));
                    break;
                }
            }
        }
    };

    return (
        <div className="theme-light">
            <InplaceSideBar choosePerson={(person: any) => {
                setChosenPerson(() => person)
            }} members={members} setMembers={setMembers}/>
            {/*<div className="text-white" style={{fontSize: 25}}>{updateVal}</div>*/}
            {chosenPerson !== null ? <InplaceContentPanel
                    chosenPerson={chosenPerson}
                    deleteMember={(id: string) => deleteMember(id)}
                    editMember={(id: number, name: string, phone: string) => editMember(id, name, phone)}
                />
                : <div/>}
        </div>
    );
}

export default InplacePanel;