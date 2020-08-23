import React, {useRef, useState} from 'react';
import {FaUser} from "react-icons/fa";
// @ts-ignore
import Tilt from "react-tilt/dist/tilt";
import {CgMoreVerticalAlt} from 'react-icons/cg';
import {GrAdd, GrClose} from 'react-icons/gr';
import {HiViewGrid} from 'react-icons/hi';
import {FaEquals} from 'react-icons/fa';
import Popup from 'reactjs-popup';
import {Button, Form} from "semantic-ui-react";
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import DatePicker, {DayValue} from 'react-modern-calendar-datepicker';

function UserInfo(props: any) {
    const deleteHandler = (id: string) => {
        const {maxId, list} = JSON.parse(localStorage.getItem("members") as string);
        const newMembers = list.filter((member: any) => {
            return member.id !== id;
        });
        localStorage.setItem("members", JSON.stringify({maxId: maxId, list: newMembers}));
        window.location.reload();
    };
    const pageRef = useRef(null);
    const moneyInRef = useRef(null);
    const moneyOutRef = useRef(null);
    const goldInRef = useRef(null);
    const goldOutRef = useRef(null);
    const ojratRef = useRef(null);
    const fiRef = useRef(null);
    const profitRef = useRef(null);
    const complexRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [selectedDay, setSelectedDay] = useState<DayValue>(null);
    const closeModal = () => setOpen(false);
    const openModal = () => setOpen(true);
    const {id, name, phone, oGold, oMoney} = props.person;
    return (
        <React.Fragment>
            <Tilt className="Tilt container Tilt-inner bg-warning rounded-pill float-right mr-3 pt-2 pb-2"
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
                <a className="btn-light rounded-circle p-1 pr-2 pl-2 pb-2" onClick={openModal}
                   style={{borderRadius: 7, fontSize: 20}}><GrAdd/></a>
                <br/>
                <br/>
                <a className="btn-light rounded-circle p-1 pr-2 pl-2 pb-2 "
                   style={{borderRadius: 7, fontSize: 20, marginTop: "30px"}}><HiViewGrid style={{margin: "auto"}}/></a>
            </div>
            <Popup
                open={open}
                // closeOnDocumentClick={false}
                onClose={closeModal}
                className=""
            >
                <div className="container">
                    {/*<a className="float-right" onClick={closeModal} style={{width: "10%"}}>*/}
                    {/*    X*/}
                    {/*</a>*/}
                    <a className="float-right"><GrClose onClick={closeModal}/></a>
                    <br/>
                    <br/>
                    <Form>
                        <Form.Group>
                            <label className="float-left text-center" style={{width: "10%"}}>تاریخ :</label>
                            {/*<input className="float-left ml-3 mr-3 text-center" style={{width: "12%"}} placeholder="سال"/>*/}
                            {/*<input className=" mr-3 text-center" style={{width: "12%"}} placeholder='ماه'/>*/}
                            {/*<input type="date" className=" text-center" style={{width: "35%"}} placeholder='روز'/>*/}
                            <DatePicker
                                value={selectedDay}
                                onChange={setSelectedDay}
                                inputPlaceholder="Select a day"
                                shouldHighlightWeekends
                                locale={"fa"}

                            />
                            <label className="float-left text-left" style={{marginLeft: 100}}>شماره صفحه :</label>
                            <input type="number" min={0} className=" text-center ml-3" style={{width: "150px"}}
                                   placeholder="شماره صفحه" ref={pageRef}/>
                        </Form.Group>
                        <Form.Group>
                            <label className="float-left  text-left">طلا :</label>
                            <input type="number" min={0} className="ml-3 mr-3 text-center" style={{width: "40%"}}
                                   placeholder="ورود" ref={goldInRef}/>
                            <input type="number" min={0} className=" text-center" style={{width: "40%"}}
                                   placeholder='خروج' ref={goldOutRef}/>
                        </Form.Group>
                        <Form.Group>
                            <label className="float-left  text-left">پول :</label>
                            <input type="text" min={0} className="ml-3 mr-3 text-center" style={{width: "40%"}}
                                   placeholder="ورود" ref={moneyInRef}/>
                            <input type="number" min={0} className=" text-center" style={{width: "40%"}}
                                   placeholder='خروج' ref={moneyOutRef}/>
                        </Form.Group>
                        <Form.Group>
                            <label className="float-left  text-left">قیمت هر گرم :</label>
                            <input type="number" min={0} className="ml-3 mr-1 text-center" style={{width: "15%"}}
                                   placeholder="اجرت" ref={ojratRef}/><GrAdd style={{marginTop: 10}}/>
                            <input type="number" min={0} className="ml-1 mr-1 text-center" style={{width: "15%"}}
                                   placeholder='فی تابلو' ref={fiRef}/><GrAdd style={{marginTop: 10}}/>
                            <input type="number" max={100} min={0} className="ml-1 mr-1 text-center"
                                   style={{width: "11%"}} placeholder='درصد سود' ref={profitRef}/><FaEquals
                            style={{marginTop: 10}}/>
                            <input className="ml-1 mr-1 text-center" style={{width: "15%"}} value={0} readOnly={true}
                                   ref={complexRef}/>
                        </Form.Group>
                        <Button type='submit'>Submit</Button>
                    </Form>
                </div>
            </Popup>
        </React.Fragment>
    );
}

export default UserInfo;