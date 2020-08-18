import React from 'react';
import {FaUser} from "react-icons/fa";
// @ts-ignore
import Tilt from "react-tilt/dist/tilt";

function UserInfo(props: any) {
    return (
        <React.Fragment>
            <Tilt className="Tilt container Tilt-inner bg-warning float-right rounded-pill mr-5 pt-2 pb-2"
                  options={{max: 5}}
                  style={{height: "12vh", width: "85%"}}>
                <div className="bg-danger">
                    <div className="float-right">
                        <FaUser className="float-right" style={{fontSize: 50, marginTop: "3%"}}/>
                        <div className="float-right mr-2">
                            <div style={{marginTop: "10%", fontSize: 25}}>
                                {props.name}
                            </div>
                            <div className="float-right text-dark">
                                #{props.id}
                            </div>
                        </div>
                        <div className="float-right mr-lg-4" style={{marginTop: "2%"}}>
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
                    <button className="btn btn-danger btn-sm float-left mt-4 ml-4" style={{fontSize: 13}}>حذف عضو
                    </button>
                    <button className="btn btn-primary btn-sm float-left mt-4" style={{fontSize: 13}}>افزودن معامله
                    </button>
                </div>
            </Tilt>
        </React.Fragment>
    );
}

export default UserInfo;