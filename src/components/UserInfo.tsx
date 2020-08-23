import React from 'react';
import {FaUser} from "react-icons/fa";
// @ts-ignore
import Tilt from "react-tilt/dist/tilt";
import {CgMoreVerticalAlt} from 'react-icons/cg';
import {GrAdd} from 'react-icons/gr';
import {HiViewGrid} from 'react-icons/hi';
import Popup from 'reactjs-popup';

function UserInfo(props: any) {
    const deleteHandler = (id: string) => {
        const {maxId, list} = JSON.parse(localStorage.getItem("members") as string);
        const newMembers = list.filter((member: any) => {
            return member.id !== id;
        });
        localStorage.setItem("members", JSON.stringify({maxId: maxId, list: newMembers}));
        window.location.reload();
    };
    const {id, name, phone, oGold, oMoney} = props.person;
    return (
        <React.Fragment>
            <Tilt className="Tilt container Tilt-inner bg-warning float-right mr-3 pt-2 pb-2"
                  options={{max: 2, scale: 1.02}}
                  style={{
                      height: "12vh",
                      width: "75%",
                      borderRadius: 25,
                      marginTop: "auto",
                      marginBottom: "auto",
                      minHeight: "100px"
                  }}>
                <div className="bg-danger" style={{marginTop: "1.5%", marginBottom: "auto"}}>
                    <div className="float-right">
                        <FaUser className="float-right"
                                style={{fontSize: 50, marginTop: "auto", marginBottom: "auto"}}/>
                        <div className="float-right mr-2">
                            <div style={{fontSize: 25, marginTop: "auto", marginBottom: "auto"}}>
                                {name}
                            </div>
                            <div className="float-right text-dark">
                                #{id}
                            </div>
                        </div>
                        <div className="float-right" style={{marginTop: "auto", marginBottom: "auto", marginRight: 50}}>
                            <div>
                                <div className="float-right">:شماره تماس</div>
                                <div className="float-right mr-2">{phone}</div>
                            </div>
                            <div>
                                <div className="float-right">:بدهکار پولی</div>
                                <div className="float-right mr-2">{oMoney}</div>
                            </div>
                            <div>
                                <div className="float-right">:بدهکار طلایی</div>
                                <div className="float-right mr-2">{oGold}</div>
                            </div>
                        </div>
                    </div>
                    <div style={{marginTop: "-1", marginBottom: "auto"}}>
                        {/*<button className="btn btn-danger btn-sm float-left mt-4 ml-4" style={{fontSize: 13}}>حذف عضو*/}
                        {/*</button>*/}

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
                                width: 150
                            }}
                            arrow={false}
                        >
                            <div className="mr-3" style={{
                                display: "flex",
                                flexDirection: "column",
                                width: "95%",
                                margin: "auto"
                            }}>
                                <button className="btn btn-primary btn-sm w-100" style={{fontSize: 12}}>ویرایش عضو
                                </button>
                                <button className="btn btn-danger btn-sm w-100" style={{fontSize: 12}}
                                        onClick={() => deleteHandler(id)}>حذف عضو
                                </button>
                            </div>
                        </Popup>
                        {/*<button className="btn btn-primary btn-sm float-left mt-4" style={{fontSize: 13}}>افزودن معامله*/}
                        {/*</button>*/}
                    </div>
                </div>
            </Tilt>
            <div className="float-right mt-2"
                 style={{borderRadius: 10, width: 60, height: "12vh", marginRight: "0.3%"}}>
                <a className="btn-light rounded-circle p-1 pr-2 pl-2 pb-2 "
                   style={{borderRadius: 7, fontSize: 20}}><GrAdd/></a>
                <br/>
                <br/>
                <a className="btn-light rounded-circle p-1 pr-2 pl-2 pb-2 "
                   style={{borderRadius: 7, fontSize: 20, marginTop: "30px"}}><HiViewGrid/></a>
            </div>
        </React.Fragment>
    );
}

export default UserInfo;