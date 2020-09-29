import React, {useContext, useEffect, useRef, useState} from 'react';
import {themeContext} from "../App";
import {Toggle} from "rsuite";
import "rsuite/dist/styles/rsuite-default.css";
import {GrClose} from "react-icons/gr";
import {Button, Form} from "semantic-ui-react";
import Popup from "reactjs-popup";


function SettingPanel(props: any) {
    localStorage.setItem("last", "setting");
    const theme = useContext(themeContext);
    let savedTheme = localStorage.getItem("theme");
    if (savedTheme === null || savedTheme === "" || savedTheme === undefined) {
        savedTheme = "dark";
        localStorage.setItem("theme", savedTheme);
    }
    const [msg, setMsg]: any = useState("");
    const changePasswordHandler = () => {
        const pss = localStorage.getItem("pss");
        if (pss === "") {
            // @ts-ignore
            localStorage.setItem("pss", newPassRef.current.value);
            setMsg("");
            closeModal();
        } else {
            // @ts-ignore
            if (oldPassRef.current.value === pss) {
                // @ts-ignore
                localStorage.setItem("pss", newPassRef.current.value);
                setMsg("");
                closeModal();
            } else {
                setMsg(() => {
                    return "رمز عبور اشتباه است"
                });
            }
        }

    };
    const [open, setOpen] = useState(false);
    const closeModal = () => {
        setMsg("");
        setOpen(false);
    };
    const openModal = () => {
        setMsg("");
        setOpen(true)
    };
    const oldPassRef = useRef(null);
    const newPassRef = useRef(null);
    const themeHandler = (checked: boolean) => {
        if (checked) savedTheme = "dark";
        else savedTheme = "light";
        localStorage.setItem("theme", savedTheme);
        window.location.reload(false);
    };
    return (
        <div className="w-50" style={{marginRight: "auto", marginLeft: "auto"}}>
            <div className="w-75 bg-light justify-content-center" style={{borderRadius: 15, paddingLeft: "20%"}}>
                <div className="float-left font-bn" style={{fontSize: 25}}>تم تاریک</div>
                <div className="float-right"><Toggle size="md" onChange={themeHandler}
                                                     defaultChecked={savedTheme === "dark"}/></div>
            </div>
            <br/>
            <br/>
            <br/>
            <div className="w-75 bg-light justify-content-center" style={{borderRadius: 15, paddingLeft: "20%"}}>
                <div className="float-left font-bn" style={{fontSize: 25}}>رمز عبور</div>
                <div className="float-right">
                    <button className="btn btn-danger" onClick={openModal}>تغییر رمز عبور</button>
                </div>
            </div>
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
                            <div className="text-danger">
                                {msg}
                            </div>

                        </Form.Field>
                        {
                            localStorage.getItem("pss") !== "" ?
                                <Form.Field>
                                    <label className="float-left">رمز عبور سابق :</label>
                                    <input type="password" ref={oldPassRef}/>
                                </Form.Field>
                                :
                                <div/>
                        }

                        <Form.Field>
                            <label className="float-left">رمز عبور جدید :</label>
                            <input type="password" ref={newPassRef}/>
                        </Form.Field>
                        <Button type='submit' onClick={changePasswordHandler}>Submit</Button>
                    </Form>
                </div>
            </Popup>
        </div>
    );
}

export default SettingPanel;