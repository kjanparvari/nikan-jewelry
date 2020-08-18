import React, {useContext} from 'react';
import {themeContext} from '../App';
import logo from '../img/nikan-logo-dark2-sm-cr.png';
// @ts-ignore
import Tilt from 'react-tilt/dist/tilt.js';
import '../styles/themes.css'

function Navbar(props: any) {
    const theme = useContext(themeContext);
    const navButtonHandler = () => {

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
                        <Tilt className="Tilt mr-3" options={{max: 30}} style={{height: 40, width: 90}}>
                            <a className="nav-link nav-buttons-fa text-white theme-dark">تنظیمات</a>
                        </Tilt>
                        <Tilt className="Tilt ml-4" options={{max: 30}} style={{height: 40, width: 100}}>
                            <a className="nav-link nav-buttons-fa text-white theme-dark">امانی بازار</a>
                        </Tilt>
                        <Tilt className="Tilt ml-4" options={{max: 30}} style={{height: 40, width: 70}}>
                            <a className="nav-link nav-buttons-fa text-white theme-dark">آبشده</a>
                        </Tilt>
                        <Tilt className="Tilt ml-4" options={{max: 30}} style={{height: 40, width: 150}}>
                            <a className="nav-link nav-buttons-fa text-white theme-dark" aria-disabled="true">خرید و
                                فروش
                                روزانه
                            </a>
                        </Tilt>
                        <Tilt className="Tilt" options={{max: 30}} style={{height: 40, width: 150}}>
                            <a className="nav-link active nav-buttons-fa text-white Tilt-inner ml-4 theme-dark">صفحه
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