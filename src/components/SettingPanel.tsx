import React, {useContext} from 'react';
import {themeContext} from "../App";
import {Toggle} from "rsuite";
import "rsuite/dist/styles/rsuite-default.css";

function SettingPanel(props: any) {
    localStorage.setItem("last", "setting");
    const theme = useContext(themeContext);
    let savedTheme = localStorage.getItem("theme");
    if (savedTheme === null || savedTheme === "" || savedTheme === undefined) {
        savedTheme = "dark";
        localStorage.setItem("theme", savedTheme);
    }
    const themeHandler = (checked: boolean) => {
        if(checked) savedTheme = "dark";
        else savedTheme = "light";
        localStorage.setItem("theme", savedTheme);
        window.location.reload(false);
    };
    return (
        <div className="w-50" style={{marginRight: "auto", marginLeft: "auto"}}>
            <div className="w-75 bg-light justify-content-center" style={{borderRadius: 15, paddingLeft: "20%"}}>
                <div className="float-left font-bn" style={{fontSize: 25}}>تم تاریک</div>
                <div className="float-right"><Toggle size="md" onChange={themeHandler} defaultChecked={savedTheme === "dark"}/></div>
            </div>
            <br/>
            <br/>
            <br/>
            <div className="w-75 bg-light justify-content-center" style={{borderRadius: 15, paddingLeft: "20%"}}>
                <div className="float-left font-bn" style={{fontSize: 25}}>رمز عبور</div>
                <div className="float-right"><button className="btn btn-danger">تغییر رمز عبور</button></div>
            </div>
        </div>
    );
}

export default SettingPanel;