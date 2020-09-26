import React, {useContext, useEffect, useReducer, useRef, useState} from 'react';
import 'semantic-ui-css/semantic.min.css'
import '../styles/search.css'
// @ts-ignore
import {MDBCol, MDBInput} from "mdbreact";
import 'mdbreact/dist/css/mdb.css'
import '../styles/themes.css'
import MemberTile from "./MemberTile";
import Popup from 'reactjs-popup';
import {Form, Button} from 'semantic-ui-react';
import {GrClose} from 'react-icons/gr';
import {themeContext} from "../App";;

const retrieveMembers = () => {
    const mems = localStorage.getItem("members");
    if (mems === null) {
        localStorage.setItem("members", JSON.stringify({maxId: "0", list: []}));
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

function DailySideBar(props: any) {
    const theme = useContext(themeContext);
    const oTheme = (theme: string) => {
        if (theme === "light") return "dark";
        else return "light";
    };
    const addMemberHandler = () => {
        let {maxId, list} = retrieveMembers();
        // if (oldMembers === undefined) oldMembers = [];
        // @ts-ignore
        const name = nameRef.current.value;
        // @ts-ignore
        const phone = phoneRef.current.value;
        maxId = (parseInt(maxId) + 1).toString();
        const newMember = {
            id: maxId,
            name: name,
            phone: phone,
            oMoney: 0,
            oGold: 0
        };
        const memberDeals: any[] = [];
        const newMembers: any[] = [];
        newMembers.push(...list, newMember);
        localStorage.setItem("D:"+maxId, JSON.stringify(memberDeals));
        localStorage.setItem("members", JSON.stringify({maxId: maxId, list: newMembers}));
        setMembers(() => {
            return newMembers
        });
        // @ts-ignore
        closeModal();
    };
    const searchHandler = (event: any) => {
        const oldMembers: [] = retrieveMembers().list;
        const regex: string = event.target.value;
        if (regex === "") {
            setMembers(() => oldMembers);
        } else {
            setMembers(() => {
                return oldMembers.filter((member: any) => {
                    const name: string = member.name;
                    const id: string = member.id;
                    return name.includes(regex) || id.includes(regex);
                });
            });
        }
    };

    const [members, setMembers] = useState(retrieveMembers().list);
    const nameRef = useRef(null);
    const phoneRef = useRef(null);
    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);
    const openModal = () => setOpen(true);
    const membersTiles = members.map((member: any) => {
        return <MemberTile key={member.id} person={member} clickHandler={props.choosePerson}/>
    });
    console.log(localStorage.getItem("members"));
    return (
        <div className={`container float-right justify-content-center theme-light sidenavigation`}
             style={{width: "20%", height: "75vh", marginRight: "4%", borderRadius: 20, minHeight: "400px"}}>
            <MDBCol md="12" className=" p-0">
                <MDBInput hint="Search" type="text" containerClass="mt-0"
                          className="text-center d-flex justify-content-center" onChange={searchHandler}/>
            </MDBCol>
            <div className="mb-0 justify-content-center text-center"
                 style={{flex: 1, overflowY: "scroll", height: "80%", overflowX: "hidden"}}>
                <div className="mt-1"/>
                {membersTiles}
            </div>
            <button className="btn btn-success" onClick={openModal}
                    style={{borderRadius: 7, paddingLeft: "10%", paddingRight: "10%", marginTop: "5%"}}>افزودن عضو جدید
            </button>
            <Popup
                open={open}
                // closeOnDocumentClick={false}
                onClose={closeModal}
                className=""
            >
                <div className="container">
                    <a className="float-right"><GrClose onClick={closeModal}/></a>
                    <br/>
                    <br/>
                    <Form>
                        <Form.Field>
                            <label className="float-left">نام مشتری :</label>
                            <input placeholder='First Name' ref={nameRef}/>
                        </Form.Field>
                        <Form.Field>
                            <label className="float-left">شماره تلفن :</label>
                            <input placeholder='Phone Number' ref={phoneRef}/>
                        </Form.Field>
                        <Button type='submit' onClick={addMemberHandler}>Submit</Button>
                    </Form>
                </div>
            </Popup>
        </div>
    );
}

export default DailySideBar;
