import React, {useContext, useMemo} from 'react';
import {themeContext} from '../App';
import logo from '../img/nikan-logo-dark2-sm-cr.png';
// @ts-ignore
import Tilt from 'react-tilt/dist/tilt.js';
import '../styles/themes.css'

function Navbar(props: any) {
    const theme = useContext(themeContext);
    const navButtonHandler = (id: string) => {
        props.clickHandler((prevState: any) => {
            return id;
        });
    };
    return (
        <React.Fragment>
            <nav className={`navbar navbar-expand-lg navbar-${theme} text-white theme-${theme}`}
                 style={{boxShadow: "none"}}>
                <Tilt className="Tilt" options={{max: 30}} style={{height: 80, width: 70}}>
                    <img className="navbar-brand Tilt-inner mt-3 ml-4" src={logo} style={{width: 80, height: 70}}/>
                </Tilt>

                <div className="collapse navbar-collapse justify-content-center mt-4" id="navbarNavAltMarkup">
                    <div className="navbar-nav ">
                        <Tilt className="Tilt mr-3" options={{max: 30}} style={{height: 60, width: 90}}>
                            <a className="nav-link nav-buttons-fa text-white theme-dark"
                               onClick={() => navButtonHandler("setting")}>تنظیمات</a>
                        </Tilt>
                        <Tilt className="Tilt" options={{max: 30}} style={{marginLeft: 50,height: 40, width: 100}}>
                            <a className="nav-link nav-buttons-fa text-white theme-dark"
                               onClick={() => navButtonHandler("owing")}>امانی بازار</a>
                        </Tilt>
                        <Tilt className="Tilt" options={{max: 30}} style={{marginLeft: 50,height: 40, width: 70}}>
                            <a className="nav-link nav-buttons-fa text-white theme-dark"
                               onClick={() => navButtonHandler("melt")}>آبشده</a>
                        </Tilt>
                        <Tilt className="Tilt" options={{max: 30}} style={{marginLeft: 50,height: 40, width: 150}}>
                            <a className="nav-link nav-buttons-fa text-white theme-dark pr-0 pl-0" aria-disabled="true"
                               onClick={() => navButtonHandler("daily")}>خرید و
                                فروش
                                روزانه
                            </a>
                        </Tilt>
                        <Tilt className="Tilt" options={{max: 30}} style={{marginLeft: 50,height: 40, width: 150}}>
                            <a className="nav-link active nav-buttons-fa text-white Tilt-inner theme-dark"
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