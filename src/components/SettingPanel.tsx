import React, {useContext, useEffect, useRef, useState} from 'react';
import {themeContext} from "../App";
import {Toggle} from "rsuite";
// @ts-ignore
import {FilePicker} from 'react-file-picker'
import "rsuite/dist/styles/rsuite-default.css";
import {GrClose} from "react-icons/gr";
import {Button, Form} from "semantic-ui-react";
import Popup from "reactjs-popup";
import {saveAs} from '@progress/kendo-file-saver';

const allStorage = () => {
    let archive: any = {}; // Notice change here
    let keys = Object.keys(localStorage);
    let i = keys.length;

    while (i--) {
        archive[keys[i]] = localStorage.getItem(keys[i]);
    }

    console.log(JSON.parse(JSON.stringify(archive)));
    return archive;
};

const getFilename = () => {
    let dateTime = new Date();
    return dateTime.toLocaleString("fa-IR").replace("/", "-").replace("/", "-")
        .replace("،", "@").replace(":", "-").replace(":", "-");
};

const getObjectURL = () => {
    let data = new Blob([JSON.stringify(allStorage())], {type: 'text/json'});
    let objURL = window.URL.createObjectURL(data);
    return objURL;
};

const getBackup = () => {
    let tempLink = document.createElement('a');
    tempLink.href = getObjectURL();
    tempLink.download = `${getFilename()}.json`;
    document.body.append(tempLink);
    tempLink.click();
    // saveAs(JSON.stringify(allStorage()), `${getFilename()}.json`);

};


function SettingPanel(props: any) {
    localStorage.setItem("last", "setting");
    const {theme, setTheme} = useContext(themeContext);
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
    const [openReset, setOpenReset] = useState(false);
    const closeResetModal = () => {
        setMsg("");
        setOpenReset(false);
    };
    const openResetModal = () => {
        setMsg("");
        setOpenReset(true)
    };
    const oldPassRef = useRef(null);
    const newPassRef = useRef(null);
    const themeHandler = (checked: boolean) => {
        if (checked) savedTheme = "dark";
        else savedTheme = "light";
        localStorage.setItem("theme", savedTheme);
        setTheme(() => savedTheme);
    };
    let fileReader: any;

    const handleFileRead = (e: any) => {
        const content = JSON.parse(fileReader.result);
        console.log(content);
        localStorage.clear();
        for (let p in content) {
            localStorage.setItem(p.toString(), content[p]);
        }
        // … do something with the 'content' …
    };

    const handleFileChosen = (event: any) => {
        const file = event.target.files[0];
        fileReader = new FileReader();
        fileReader.onloadend = handleFileRead;
        fileReader.readAsText(file);
    };
    return (
        <div className="w-50" style={{marginRight: "auto", marginLeft: "auto"}}>
            <div className="w-100 bg-light justify-content-center" style={{borderRadius: 15, paddingLeft: "20%"}}>
                <div className="float-left font-bn" style={{fontSize: 25}}>تم تاریک</div>
                <div className="float-right"><Toggle size="md" onChange={themeHandler}
                                                     defaultChecked={savedTheme === "dark"}/></div>
            </div>
            <br/>
            <br/>
            <br/>
            <div className="w-100 bg-light justify-content-center" style={{borderRadius: 15, paddingLeft: "20%"}}>
                <div className="float-left font-bn" style={{fontSize: 25}}>رمز عبور</div>
                <div className="float-right">
                    <button className="btn btn-danger" onClick={openModal}>تغییر رمز عبور</button>
                </div>
            </div>
            <br/>
            <br/>
            <br/>
            <div className="w-100 justify-content-center" style={{borderRadius: 15, paddingLeft: "20%"}}>
                <div className="float-left font-bn" style={{fontSize: 25}}>فایل پشتیبان</div>
                <button className="btn btn-success float-right pr-4 pl-4" onClick={getBackup}>ذخیره</button>
                <input type="file" id="file" className="btn btn-warning" accept=".json"
                       onChange={event => handleFileChosen(event)}/>
            </div>
            <div className="w-100 justify-content-center mt-3" style={{borderRadius: 15, paddingLeft: "20%"}}>
                <div className="float-left font-bn" style={{fontSize: 25}}>بازگشت به تنظیمات اولیه</div>
                <button className="btn btn-secondary float-right pr-4 pl-4" onClick={() => setOpenReset(true)}>Reset
                </button>
            </div>
            <div className="fixed-bottom mb-5">
                Developed by KJSoft®. All Rights Reserved!
            </div>
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
            <Popup
                open={openReset}
                // closeOnDocumentClick={false}
                onClose={closeResetModal}
                contentStyle={{borderRadius: 15}}
                className=""
            >
                <div className="container">
                    <a className="float-right" onClick={() => closeResetModal()}><GrClose/></a>
                    <br/>
                    <br/>
                    <Form>
                        <Form.Group className="justify-content-center">
                            <div style={{color: "black"}}> آیا مطمئن هستید؟</div>
                        </Form.Group>
                        <Form.Group className="justify-content-center mt-3">
                            <button className="btn btn-danger" onClick={() => {
                                closeResetModal()
                            }}>
                                انصراف
                            </button>

                            <button className="btn btn-success pr-4 pl-4" onClick={() => {
                                localStorage.setItem("init", "false");
                                window.location.reload(false);
                            }}>
                                تایید
                            </button>

                        </Form.Group>
                    </Form>
                </div>
            </Popup>
        </div>
    );
}

export default SettingPanel;