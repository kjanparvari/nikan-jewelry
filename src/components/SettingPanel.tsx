import React, {useContext} from 'react';
import {themeContext} from "../App";
import {Toggle} from "rsuite";
import "rsuite/dist/styles/rsuite-default.css";

function SettingPanel(props: any) {
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
            <div className="w-100 bg-light" style={{borderRadius: 15}}>
                <div className="float-left">dark theme</div>
                <div className="float-right"><Toggle size="md" onChange={themeHandler} defaultChecked={savedTheme === "dark"}/></div>
            </div>
            <br/>
            <br/>
            <br/>
        </div>
    );
}

export default SettingPanel;