import React, {useEffect, useRef, useState} from 'react';
// @ts-ignore
import Tilt from "react-tilt/dist/tilt";
import {CgMoreVerticalAlt} from "react-icons/cg";
import Popup from "reactjs-popup";
import {Button, ControlLabel} from 'rsuite';

// import 'rsuite/dist/styles/rsuite-default.css'

function HomePanel(props: any) {
    localStorage.setItem("last", "home");
    const [homeValues, setHomeValues] = useState({money: {base: 0, offset: 0}, gold: {base: 0, offset: 0}});
    let p: any;
    useEffect(() => {
            p = localStorage.getItem("home");
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
            setHomeValues(() => p)
        }
        , []
    );


    const moneyBaseRef = useRef(null);
    const goldBaseRef = useRef(null);
    const submitBase = (type: string) => {
        if (type === "money") {

            setHomeValues(() => {
                // @ts-ignore
                homeValues.money.base = parseFloat(moneyBaseRef.current.value);
                return {...homeValues}
            });

            localStorage.setItem("home", JSON.stringify(homeValues));
        } else if (type === "gold") {
            setHomeValues(() => {
                // @ts-ignore
                homeValues.gold.base = parseFloat(goldBaseRef.current.value);
                return {...homeValues};
            });
            localStorage.setItem("home", JSON.stringify(homeValues));
        }
        // window.location.reload(false);
    };
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
                             style={{
                                 marginLeft: "auto",
                                 marginRight: "auto",
                                 fontSize: 35
                             }}>{(homeValues.gold.base + homeValues.gold.offset).toFixed(3)}</div>
                        <Popup
                            trigger={<a className="float-left mt-3 ml-2"><CgMoreVerticalAlt
                                style={{fontSize: 35}}/></a>}
                            position="right top"
                            on="hover"
                            closeOnDocumentClick={true}
                            mouseLeaveDelay={200}
                            mouseEnterDelay={0}
                            contentStyle={{
                                padding: "2px",
                                paddingRight: "4px",
                                border: "none",
                                borderRadius: 10,
                                // backgroundColor: "#fff",
                                backgroundColor: "#343a40",
                                width: 310
                            }}
                            arrow={false}
                        >
                            <div className="mr-3" style={{
                                margin: "auto",
                                padding: 5,
                                paddingBottom: 10
                            }}>

                                <ControlLabel className="text-white float-left "
                                              style={{width: "20%"}}>مبنا</ControlLabel>
                                <input type="number" ref={goldBaseRef} className="float-right form-control"
                                       style={{width: "70%"}} defaultValue={homeValues.gold.base}/>
                                <br/>
                                <br/>
                                <Button className="btn-success" style={{paddingRight: "20px", paddingLeft: "20px"}}
                                        onClick={() => submitBase("gold")}>ثبت</Button>
                            </div>
                        </Popup>
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
                             style={{
                                 marginLeft: "auto",
                                 marginRight: "auto",
                                 fontSize: 35
                             }}>{homeValues.money.base + homeValues.money.offset}</div>
                        <Popup
                            trigger={<a className="float-left mt-3 ml-2"><CgMoreVerticalAlt
                                style={{fontSize: 35}}/></a>}
                            position="right top"
                            on="hover"
                            closeOnDocumentClick={true}
                            mouseLeaveDelay={200}
                            mouseEnterDelay={0}
                            contentStyle={{
                                padding: "2px",
                                paddingRight: "4px",
                                border: "none",
                                borderRadius: 10,
                                // backgroundColor: "#fff",
                                backgroundColor: "#343a40",
                                width: 310
                            }}
                            arrow={false}
                        >
                            <div className="mr-3" style={{
                                margin: "auto",
                                padding: 5,
                                paddingBottom: 10
                            }}>

                                <ControlLabel className="text-white float-left "
                                              style={{width: "20%"}}>مبنا</ControlLabel>
                                <input type="number" ref={moneyBaseRef} className="float-right form-control"
                                       style={{width: "70%"}} defaultValue={homeValues.money.base}/>
                                <br/>
                                <br/>
                                <Button className="btn-success" style={{paddingRight: "20px", paddingLeft: "20px"}}
                                        onClick={() => submitBase("money")}>ثبت</Button>
                            </div>
                        </Popup>
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