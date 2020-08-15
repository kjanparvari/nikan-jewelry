import React, {useContext} from 'react';
import {themeContext} from '../App';
import logo from '../img/nikan-logo-dark2-sm-cr.png';
// @ts-ignore
import Tilt from 'react-tilt/dist/tilt.js';

function Navbar(props: any) {
    const theme = useContext(themeContext);
    return (
        <nav className={`navbar navbar-expand-lg navbar-${theme} text-white theme-${theme}`}>
            <Tilt className="Tilt" options={{ max : 30 }} style={{ height: 80, width: 70 }} >
                <img className="navbar-brand Tilt-inner" src={logo} style={{width:80  , height:70}}/>
            </Tilt>

            <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                <div className="navbar-nav ">
                    <a className="nav-link nav-buttons-fa" href="#">تنظیمات</a>
                    <a className="nav-link nav-buttons-fa" href="#">امانی بازار</a>
                    <a className="nav-link nav-buttons-fa" href="#">آبشده</a>
                    <a className="nav-link nav-buttons-fa" href="#" aria-disabled="true">خرید و فروش
                        روزانه</a>
                    <a className="nav-link active nav-buttons-fa" href="#">صفحه
                        اصلی <span
                            className="sr-only">(current)</span></a>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;