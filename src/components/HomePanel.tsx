import React, {useEffect, useRef, useState} from 'react';
// @ts-ignore
import Tilt from "react-tilt/dist/tilt";
import {CgMoreVerticalAlt} from "react-icons/cg";
import Popup from "reactjs-popup";
import {Button, ControlLabel} from 'rsuite';
import NumberFormat from "react-number-format";
import {DECIMAL_SEPARATOR, THOUSAND_SEPARATOR} from "../App";

// import 'rsuite/dist/styles/rsuite-default.css'

function HomePanel(props: any) {
    localStorage.setItem("last", "home");
    const [homeValues, setHomeValues] = useState(JSON.parse(localStorage.getItem("home") as string));
    const [moneyBaseInput, setMoneyBaseInput] = useState<number>(homeValues.money.base);
    const [goldBaseInput, setGoldBaseInput] = useState<number>(homeValues.gold.base);
    useEffect(() => {
        setHomeValues(() => {
            homeValues.money.base = moneyBaseInput;
            return {...homeValues}
        });
    }, [moneyBaseInput]);

    useEffect(() => {
        setHomeValues(() => {
            homeValues.gold.base = goldBaseInput;
            return {...homeValues};
        });
    }, [goldBaseInput]);

    useEffect(() => {
        localStorage.setItem("home", JSON.stringify(homeValues));
    }, [homeValues]);

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
                        <NumberFormat className="mt-3 bold w-100"
                                      style={{
                                          marginLeft: "auto",
                                          marginRight: "auto",
                                          fontSize: 35
                                      }}
                                      value={(homeValues.gold.base + homeValues.gold.offset).toFixed(3)}
                                      displayType={"text"}
                                      decimalSeparator={DECIMAL_SEPARATOR}
                                      thousandSeparator={THOUSAND_SEPARATOR}
                        />
                        <br/>
                        <br/>
                        <Popup
                            trigger={<a className="float-left mt-3 ml-2"><CgMoreVerticalAlt
                                style={{fontSize: 35}}/></a>}
                            position="right top"
                            on="hover"
                            closeOnDocumentClick={true}
                            mouseLeaveDelay={2000}
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
                            <div className="mr-3 mt-2" style={{
                                margin: "auto",
                                padding: 5,
                                paddingBottom: 10
                            }}>

                                <ControlLabel className="text-white float-left "
                                              style={{width: "20%"}}>مبنا</ControlLabel>
                                <NumberFormat value={goldBaseInput}
                                              className="float-right form-control"
                                              decimalSeparator={DECIMAL_SEPARATOR}
                                              thousandSeparator={THOUSAND_SEPARATOR}
                                              onValueChange={({floatValue, formattedValue, value}) => {
                                                  setGoldBaseInput(() => floatValue === undefined ? 0 : floatValue);
                                              }}
                                              style={{width: "70%"}}/>
                                <br/>
                                <br/>
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
                        <NumberFormat className="mt-3 bold w-100"
                                      style={{
                                          marginLeft: "auto",
                                          marginRight: "auto",
                                          fontSize: 35
                                      }}
                                      value={(homeValues.money.base + homeValues.money.offset).toFixed(0)}
                                      displayType={"text"}
                                      decimalSeparator={DECIMAL_SEPARATOR}
                                      thousandSeparator={THOUSAND_SEPARATOR}
                        />
                        <br/>
                        <br/>
                        <Popup
                            trigger={<a className="float-left mt-3 ml-2"><CgMoreVerticalAlt
                                style={{fontSize: 35}}/></a>}
                            position="right top"
                            on="hover"
                            closeOnDocumentClick={true}
                            mouseLeaveDelay={2000}
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
                            <div className="mr-3 mt-2" style={{
                                margin: "auto",
                                padding: 5,
                                paddingBottom: 10
                            }}>

                                <ControlLabel className="text-white float-left "
                                              style={{width: "20%"}}>مبنا</ControlLabel>
                                <NumberFormat value={moneyBaseInput}
                                              decimalSeparator={DECIMAL_SEPARATOR}
                                              thousandSeparator={THOUSAND_SEPARATOR}
                                              onValueChange={({floatValue, formattedValue, value}) => {
                                                  setMoneyBaseInput(() => floatValue === undefined ? 0 : floatValue);
                                              }}
                                              className="float-right form-control"
                                              style={{width: "70%"}}/>
                                <br/>
                                <br/>
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