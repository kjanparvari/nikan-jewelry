import React, {useContext, useEffect, useReducer, useRef, useState} from 'react';
import 'semantic-ui-css/semantic.min.css'
import '../../styles/search.css'
// @ts-ignore
import {MDBCol, MDBInput} from "mdbreact";
import 'mdbreact/dist/css/mdb.css'
import '../../styles/themes.css'
import MemberTile from "../MemberTile";
import Popup from 'reactjs-popup';
import {Form, Button} from 'semantic-ui-react';
import {GrClose} from 'react-icons/gr';
import {themeContext} from "../../App";

function DailySideBar({choosePerson, members, setMembers}: any) {
    const {theme} = useContext(themeContext);
    let oTheme;
    if (theme === "light") oTheme = "dark";
    else oTheme = "light";
    let searchFont;
    if (theme === "light") searchFont = "text-white"; else searchFont = "";
    const addMemberHandler = () => {
        let {maxId, list} = members;
        // @ts-ignore
        const name = nameRef.current.value;
        // @ts-ignore
        const phone = phoneRef.current.value;
        if (name === null || name === "")
            return;
        maxId = (parseInt(maxId) + 1).toString();
        const newMember = {
            id: maxId,
            name: name,
            phone: phone,
            oGold: 0
        };
        const newMembers: any[] = [];
        newMembers.push(...list, newMember);
        localStorage.setItem("D:" + maxId, JSON.stringify({maxId: 0, list: []}));
        localStorage.setItem("daily-members", JSON.stringify({maxId: maxId, list: newMembers}));
        setMembers(() => {
            return {maxId: maxId, list: newMembers}
        });
        // @ts-ignore
        closeModal();
    };
    const searchHandler = (event: any) => {
        const oldMembers: [] = members.list;
        const regex: string = event.target.value;
        if (regex === "") {
            setShownMembers(() => oldMembers);
        } else {
            setShownMembers(() => {
                return oldMembers.filter((member: any) => {
                    const name: string = member.name;
                    const id: string = member.id;
                    return name.includes(regex) || id.includes(regex);
                });
            });
        }
    };
    useEffect(()=>{
        setShownMembers(members.list);
    }, [members]);
    const [shownMembers, setShownMembers] = useState(members.list);
    const nameRef = useRef(null);
    const phoneRef = useRef(null);
    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);
    const openModal = () => setOpen(true);
    const membersTiles = shownMembers.map((member: any) => {
        return <MemberTile key={member.id} person={member} clickHandler={choosePerson}/>
    });
    console.log(localStorage.getItem("daily-members"));
    return (
        <div className={`container float-right justify-content-center theme-${oTheme} sidenavigation`}
             style={{width: "18%", height: "75vh", marginRight: "4%", borderRadius: 20, minHeight: "400px"}}>
            <MDBCol md="12" className=" p-0">
                <MDBInput hint="Search" type="text" containerClass="mt-0"
                          className={`text-center d-flex justify-content-center ${searchFont}`} onChange={searchHandler}/>
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
                contentStyle={{borderRadius: 15}}
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
