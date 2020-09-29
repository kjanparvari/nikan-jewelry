import React, {useContext, useEffect, useMemo, useState} from 'react';
import {themeContext} from '../App';
import logo from '../img/nikan-logo-dark2-sm-cr.png';
// @ts-ignore
import Tilt from 'react-tilt/dist/tilt.js';
import '../styles/themes.css'
import {BsFillLockFill, BsFillUnlockFill} from "react-icons/bs";


function Navbar(props: any) {
    const theme = useContext(themeContext);
    const [locked, setLocked] = useState((localStorage.getItem("islocked") === "true"));
    const lock = () => {
        if (!locked && localStorage.getItem("pss") !== "") {
            localStorage.setItem("islocked", "true");
            window.location.reload(false);
        }
    };
    let lockColor: string = "white";
    if (theme === "dark")
        lockColor = "white";
    else
        lockColor = "black";

    const navButtonHandler = (id: string) => {
        props.clickHandler((prevState: any) => {
            return id;
        });
    };
    return (
        <React.Fragment>
            <nav className={`navbar navbar-expand-lg navbar-${theme} text-white theme-${theme}`}
                 style={{boxShadow: "none"}}>
                <Tilt className="Tilt" options={{max: 10, scale: 1.05}} style={{height: 80, width: 70}}>
                    {/*<img className="navbar-brand Tilt-inner mt-3 ml-4" src={logo} style={{width: 80, height: 70}}/>*/}
                    <div
                        className="p-3 Tilt-inner mt-4 ml-5 badge badge-warning    text-black-50  "
                        style={{fontSize: 15, paddingTop: 50, paddingBottom: 50}}>NIKAN
                    </div>
                </Tilt>
                <a className="float-left" style={{marginLeft: 60}} onClick={lock}>
                    {locked ? <BsFillLockFill style={{fontSize: 30, color: lockColor}}/> :
                        <BsFillUnlockFill style={{fontSize: 30, color: lockColor}}/>}
                </a>


                <div className="collapse navbar-collapse justify-content-center mt-4" id="navbarNavAltMarkup">
                    <div className="navbar-nav ">
                        <Tilt className="Tilt mr-3" options={{max: 10, scale: 1.2}} style={{height: 60, width: 90}}>
                            <a className={`nav-link nav-buttons-fa theme-${theme}`}
                               onClick={() => navButtonHandler("setting")}>تنظیمات</a>
                        </Tilt>
                        <Tilt className="Tilt" options={{max: 10, scale: 1.2}}
                              style={{marginLeft: 50, height: 40, width: 100}}>
                            <a className={`nav-link nav-buttons-fa theme-${theme}`}
                               onClick={() => navButtonHandler("owing")}>امانی بازار</a>
                        </Tilt>
                        <Tilt className="Tilt" options={{max: 10, scale: 1.2}}
                              style={{marginLeft: 50, height: 40, width: 70}}>
                            <a className={`nav-link nav-buttons-fa theme-${theme}`}
                               onClick={() => navButtonHandler("melt")}>آبشده</a>
                        </Tilt>
                        <Tilt className="Tilt" options={{max: 10, scale: 1.2}}
                              style={{marginLeft: 50, height: 40, width: 150}}>
                            <a className={`nav-link nav-buttons-fa pr-0 pl-0" aria-disabled="true" theme-${theme}`}
                               onClick={() => navButtonHandler("daily")}>خرید و
                                فروش
                                روزانه
                            </a>
                        </Tilt>
                        <Tilt className="Tilt" options={{max: 10, scale: 1.2}}
                              style={{marginLeft: 50, height: 40, width: 150}}>
                            <a className={`nav-link active nav-buttons-fa Tilt-inner theme-${theme}`}
                               onClick={() => navButtonHandler("home")}>صفحه
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