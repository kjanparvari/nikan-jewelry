import React from 'react';
import {FaUser} from "react-icons/fa";
// @ts-ignore
import Tilt from "react-tilt/dist/tilt";

function UserInfo(props: any) {
    return (
        <React.Fragment>
            <Tilt className="Tilt container Tilt-inner bg-warning float-right mr-3 rounded-pill pt-2 pb-2"
                  options={{max: 2, scale: 1.02}}
                  style={{height: "12vh", width: "85%", borderRadius: 25, marginTop: "auto", marginBottom: "auto", minHeight: "100px"}}>
                <div className="bg-danger" style={{marginTop: "1.5%", marginBottom: "auto"}}>
                    <div className="float-right">
                        <FaUser className="float-right"
                                style={{fontSize: 50, marginTop: "auto", marginBottom: "auto"}}/>
                        <div className="float-right mr-2">
                            <div style={{fontSize: 25, marginTop: "auto", marginBottom: "auto"}}>
                                {props.name}
                            </div>
                            <div className="float-right text-dark">
                                #{props.id}
                            </div>
                        </div>
                        <div className="float-right mr-lg-4" style={{marginTop: "auto", marginBottom: "auto"}}>
                            <div>
                                <div className="float-right">:شماره تماس</div>
                                <div className="float-right mr-2">{props.phone}</div>
                            </div>
                            <div>
                                <div className="float-right">:بدهکار پولی</div>
                                <div className="float-right mr-2">{props.oMoney}</div>
                            </div>
                            <div>
                                <div className="float-right">:بدهکار طلایی</div>
                                <div className="float-right mr-2">{props.oGold}</div>
                            </div>
                        </div>
                    </div>
                    <div style={{marginTop: "-1", marginBottom: "auto"}}>
                        <button className="btn btn-danger btn-sm float-left mt-4 ml-4" style={{fontSize: 13}}>حذف عضو
                        </button>
                        <button className="btn btn-primary btn-sm float-left mt-4" style={{fontSize: 13}}>افزودن معامله
                        </button>
                    </div>
                </div>
            </Tilt>
        </React.Fragment>
    );
}

export default UserInfo;