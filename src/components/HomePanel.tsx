import React, {useEffect} from 'react';
// @ts-ignore
import Tilt from "react-tilt/dist/tilt";
// import { Notification, Button, ButtonToolbar} from 'rsuite';
// import 'rsuite/dist/styles/rsuite-default.css'

function HomePanel(props: any) {
    let p: any = localStorage.getItem("home");
    if (p === null || p === "" || p === undefined) {
        p = {
            money: {
                base: 0,
                offset: 0
            },
            gold: {
                base: 0,
                offset: 0
            }
        };
        localStorage.setItem("home", JSON.stringify(p));
    } else p = JSON.parse(p);
    return (
        <div>
            <div className="w-75" style={{borderRadius: 10, marginRight: "auto", marginLeft: "auto"}}>

                <br/>

                <br/>
            </div>
            <br/>
            <br/>
            <div>
                <Tilt className="Tilt bg-warning float-right" options={{max: 5, scale: 1.04}}
                      style={{width: "35%", borderRadius: 15, marginRight: "12%"}}>
                    <div className="Tilt-inner">
                        <div className="mt-3 bold w-100"
                             style={{marginLeft: "auto", marginRight: "auto", fontSize: 30}}> : ته حساب طلا
                        </div>
                        <br/>
                        <br/>
                        <div className="mt-3 bold w-100"
                             style={{marginLeft: "auto", marginRight: "auto", fontSize: 35}}>{p.gold.base + p.gold.offset}</div>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                    </div>
                </Tilt>
                <Tilt className="Tilt bg-primary float-left " options={{max: 5, scale: 1.04}}
                      style={{width: "35%", borderRadius: 15, marginLeft: "12%"}}>
                    <div className="Tilt-inner">
                        <div className="mt-3 bold w-100"
                             style={{marginLeft: "auto", marginRight: "auto", fontSize: 30}}> : ته حساب پول
                        </div>
                        <br/>
                        <br/>
                        <div className="mt-3 bold w-100"
                             style={{marginLeft: "auto", marginRight: "auto", fontSize: 35}}>{p.money.base + p.money.offset}</div>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                    </div>
                </Tilt>
            </div>
        </div>
    );
}

export default HomePanel;