import React, {useContext, useEffect, useMemo, useState} from 'react';
import {themeContext} from '../App';
import logo from '../img/nikan-logo-dark2-sm-cr.png';
// @ts-ignore
import Tilt from 'react-tilt/dist/tilt.js';
import '../styles/themes.css'
import {BsFillLockFill, BsFillUnlockFill} from "react-icons/bs";
import {BiExit} from "react-icons/all";
import {IoMdRefreshCircle} from "react-icons/io"

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
    tempLink.click();
};
const handleExit = () => {
    if (localStorage.getItem("pss") !== "")
        localStorage.setItem("islocked", "true");
    window.close();
};

function Navbar(props: any) {
    const {theme} = useContext(themeContext);
    const {locked, lockHandler} = props;
    const {panel, setPanel} = props;
    const lock = () => {
        if (!locked && localStorage.getItem("pss") !== "") {
            // @ts-ignore
            localStorage.setItem("tmp", localStorage.getItem("last"));
            localStorage.setItem("islocked", "true");
            lockHandler();
        }
    };
    let lockColor: string = "white";
    if (theme === "dark")
        lockColor = "white";
    else
        lockColor = "black";

    const oTheme = theme === "dark" ? "light" : theme === "dark" ? "light" : "dark";
    return (
        <React.Fragment>
            <Tilt className="Tilt float-right bg-danger ml-3 mr-3 mt-3 p-2 pt-0" options={{max: 10, scale: 1.1}}
                  style={{borderRadius: 10, fontSize: 25}}>
                <a className="Tilt-inner"><BiExit style={{fontSize: 25}} onClick={handleExit}/></a>
            </Tilt>

            <nav className={`navbar navbar-expand-lg navbar-${theme} text-white theme-${theme}`}
                 style={{boxShadow: "none"}}>
                <Tilt className="Tilt" options={{max: 10, scale: 1.05}} style={{height: 80, width: 70}}>
                    {/*<img className="navbar-brand Tilt-inner mt-3 ml-4" src={logo} style={{width: 80, height: 70}}/>*/}
                    <div
                        className="p-3 Tilt-inner mt-4 ml-5 badge badge-warning text-black-50  "
                        style={{fontSize: 15, paddingTop: 50, paddingBottom: 50}}>NIKAN
                    </div>
                </Tilt>
                <Tilt className="Tilt" options={{max: 10, scale: 1.1}}>
                    <a className="float-left" style={{marginLeft: 60}} onClick={lock}>
                        {locked ? <BsFillLockFill style={{fontSize: 30, color: lockColor}}/> :
                            <BsFillUnlockFill style={{fontSize: 30, color: lockColor}}/>}
                    </a>
                </Tilt>
                <Tilt className="Tilt" options={{max: 10, scale: 1.1}}>
                    <a className="float-left" style={{marginLeft: 10, marginTop: 10}} onClick={()=>{window.location.reload(false)}}>
                        {<IoMdRefreshCircle style={{fontSize: 35, color: lockColor}}/>}
                    </a>
                </Tilt>


                <div className="collapse navbar-collapse justify-content-center mt-4" id="navbarNavAltMarkup">
                    <div className="navbar-nav ">
                        <Tilt className="Tilt mr-3" options={{max: 10, scale: 1.2}} style={{height: 60, width: 90}}>
                            <a className={`p-1 nav-link nav-buttons-fa  ${panel === "setting" ? `bg-${oTheme} text-${theme}` : `text-${oTheme}`}`}
                               style={{borderRadius: 10}} onClick={() => setPanel("setting")}>تنظیمات</a>
                        </Tilt>
                        <Tilt className="Tilt" options={{max: 10, scale: 1.2}}
                              style={{marginLeft: 50, height: 40, width: 100}}>
                            <a className={`p-1 nav-link nav-buttons-fa  ${panel === "borrowed" ? `bg-${oTheme} text-${theme}` : `text-${oTheme}`}`}
                               style={{borderRadius: 10}} onClick={() => setPanel("borrowed")}>امانی بازار</a>
                        </Tilt>
                        <Tilt className="Tilt" options={{max: 10, scale: 1.2}}
                              style={{marginLeft: 50, height: 40, width: 70}}>
                            <a className={`p-1 nav-link nav-buttons-fa ${panel === "melt" ? `bg-${oTheme} text-${theme}`: `text-${oTheme} `}`}
                               style={{borderRadius: 10}} onClick={() => setPanel("melt")}>آبشده</a>
                        </Tilt>
                        <Tilt className="Tilt" options={{max: 10, scale: 1.2}}
                              style={{marginLeft: 50, height: 40, width: 70}}>
                            <a className={`p-1 pl-3 pr-3 nav-link nav-buttons-fa  ${panel === "inplace" ? `bg-${oTheme} text-${theme}` : `text-${oTheme}`}`}
                               style={{borderRadius: 10}} onClick={() => setPanel("inplace")}> روزانه   </a>
                        </Tilt>
                        <Tilt className="Tilt" options={{max: 10, scale: 1.2}}
                              style={{marginLeft: 35, height: 40, width: 150}}>
                            <a className={`p-1 nav-link nav-buttons-fa  ${panel === "daily" ? `bg-${oTheme} text-${theme}` : `text-${oTheme}`}`}
                               style={{borderRadius: 10}} onClick={() => setPanel("daily")}>قسطی
                            </a>
                        </Tilt>
                        <Tilt className="Tilt" options={{max: 10, scale: 1.2}}
                              style={{marginLeft: 40, height: 40, width: 150}}>
                            <a className={`p-1 nav-link active nav-buttons-fa Tilt-inner ${panel === "home" ? `bg-${oTheme} text-${theme}` : `text-${oTheme}`}`}
                               style={{borderRadius: 10}} onClick={() => setPanel("home")}>صفحه
                                اصلی <span
                                    className="sr-only">(current)</span></a>
                        </Tilt>
                    </div>
                </div>

            </nav>
        </React.Fragment>
    );
}

export default Navbar;