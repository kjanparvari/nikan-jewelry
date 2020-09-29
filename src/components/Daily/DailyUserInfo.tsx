import React, {useContext, useRef, useState} from 'react';
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
import {serialize} from "v8";
import {themeContext} from "../../App";
import {offsetContext} from "../../App";

const getName = (id: number) => {
    const m = localStorage.getItem("daily-members");
    let mems: [] = [];
    let name: string = "";
    if (m !== null)
        mems = JSON.parse(m).list;
    mems.forEach((p, i) => {
        // @ts-ignore
        if (p.id === id) {
            // @ts-ignore
            name = p.name;
        }
    });
    return name;
};

const getPhone = (id: number) => {
    const m = localStorage.getItem("daily-members");
    let mems: [] = [];
    let phone: string = "";
    if (m !== null)
        mems = JSON.parse(m).list;
    mems.forEach((p, i) => {
        // @ts-ignore
        if (p.id === id) {
            // @ts-ignore
            phone = p.phone;
        }
    });
    return phone;
};


const changeView = (view: string, setView: any) => {
    console.log(view);
    if (view === "card")
        setView(() => "table");
    else if (view === "table")
        setView(() => "card");
};

function DailyUserInfo(props: any) {
    const theme = useContext(themeContext);
    const offset = useContext(offsetContext);
    const deleteMemberHandler = (id: string) => {
        const {maxId, list} = JSON.parse(localStorage.getItem("daily-members") as string);
        const newMembers = list.filter((member: any) => {
            return member.id !== id;
        });
        localStorage.setItem("daily-members", JSON.stringify({maxId: maxId, list: newMembers}));
        localStorage.removeItem("D:" + id);
        localStorage.setItem("last", "daily");
        window.location.reload(false);
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
    const updateComplexLabel = () => {
        let result: number = 0;
        // @ts-ignore
        let ojrat: number = parseFloat(ojratRef.current.value);
        // @ts-ignore
        let fi: number = parseFloat(fiRef.current.value);
        // @ts-ignore
        let profit: number = 1.0 + parseFloat(profitRef.current.value) / 100;

        if (isNaN(ojrat) || isNaN(fi) || isNaN(profit))
            result = 0;
        else
            result = (ojrat + fi) * profit;
        // @ts-ignore
        complexRef.current.value = result;
    };
    const addDeal = () => {
        // @ts-ignore
        const pageNumber = parseInt(pageRef.current.value);
        // @ts-ignore
        const moneyIn = parseInt(moneyInRef.current.value);
        // @ts-ignore
        const moneyOut = parseInt(moneyOutRef.current.value);
        // @ts-ignore
        const goldIn = parseInt(goldInRef.current.value);
        // @ts-ignore
        const goldOut = parseInt(goldOutRef.current.value);
        // @ts-ignore
        const ojrat = parseInt(ojratRef.current.value);
        // @ts-ignore
        const fi = parseInt(fiRef.current.value);
        // @ts-ignore
        const profit = parseInt(profitRef.current.value);
        const key = "D:" + props.person.id;
        if (selectedDay === null || pageNumber === null || moneyIn === null || moneyOut === null || goldIn === null || goldOut === null || ojrat === null || fi === null || profit === null) {
            return;
        } else {
            let p: any = localStorage.getItem(key);
            if (p === null || p === "" || p === undefined) {
                p = {
                    maxId: 0,
                    list: []
                }
            } else {
                console.log("here");
                p = JSON.parse(p);
            }
            const maxId = (parseInt(p.maxId) + 1).toString();
            const val = {
                id: maxId,
                date: selectedDay,
                pageNumber: pageNumber,
                moneyIn: moneyIn,
                moneyOut: moneyOut,
                goldIn: goldIn,
                goldOut: goldOut,
                complex: {
                    ojrat: ojrat,
                    fi: fi,
                    profit: profit
                }
            };
            p.maxId = maxId;
            p.list.push(val);
            p = JSON.stringify(p);
            console.log(p);
            localStorage.setItem(key, p);
            offset.changeGold(goldIn - goldOut);
            offset.changeMoney(moneyIn - moneyOut);
            closeModal();
            window.location.reload(false);
            // console.log(JSON.stringify(val));
            // localStorage.setItem(key, JSON.stringify(val));
        }
    };
    const closeModal = () => setOpen(false);
    const openModal = () => setOpen(true);

    const [openEdit, setOpenEdit] = useState(false);
    const closeEditModal = () => setOpenEdit(false);
    const openEditModal = () => setOpenEdit(true);
    const nameRef = useRef(null);
    const phoneRef = useRef(null);

    const editSubmitHandler = (id: number) => {
        let m: any = localStorage.getItem("daily-members");
        if (m !== null) {
            m = JSON.parse(m);
            for (let i in m.list) {
                if (m.list[i].id === id) {
                    // @ts-ignore
                    m.list[i].name = nameRef.current.value;
                    // @ts-ignore
                    m.list[i].phone = phoneRef.current.value;
                    localStorage.setItem("daily-members", JSON.stringify(m));
                    closeModal();
                    window.location.reload(false);
                    break;
                }
            }
        }


    };

    const {id, name, phone, oGold, oMoney} = props.person;
    // @ts-ignore
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
                                <button className="btn btn-primary btn-sm w-100" onClick={openEditModal}
                                        style={{fontSize: 12}}>ویرایش عضو
                                </button>
                                <button className="btn btn-danger btn-sm w-100" style={{fontSize: 12}}
                                        onClick={() => deleteMemberHandler(id)}>حذف عضو
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
                   style={{borderRadius: 7, fontSize: 20, marginTop: "30px"}}
                   onClick={() => changeView(props.view, props.setView)}><HiViewGrid
                    style={{margin: "auto"}}/></a>
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
                            <input type="number" min={0} className="ml-3 mr-3 text-center" style={{width: "40%"}}
                                   placeholder="ورود" ref={moneyInRef}/>
                            <input type="number" min={0} className=" text-center" style={{width: "40%"}}
                                   placeholder='خروج' ref={moneyOutRef}/>
                        </Form.Group>
                        <Form.Group>
                            <label className="float-left  text-left">قیمت هر گرم :</label>
                            <input type="number" min={0} className="ml-3 mr-1 text-center" style={{width: "18%"}}
                                   placeholder="اجرت" onChange={updateComplexLabel} ref={ojratRef}/><GrAdd
                            style={{marginTop: 10}}/>
                            <input type="number" min={0} className="ml-1 mr-1 text-center" style={{width: "18%"}}
                                   placeholder='فی تابلو' onChange={updateComplexLabel} ref={fiRef}/><GrAdd
                            style={{marginTop: 10}}/>
                            <input type="number" max={100} min={0} className="ml-1 mr-1 text-center"
                                   style={{width: "15%"}} onChange={updateComplexLabel} placeholder='درصد سود'
                                   ref={profitRef}/><FaEquals
                            style={{marginTop: 10}}/>
                            <input className="ml-1 mr-1 text-center" style={{width: "17%"}} value={0}
                                   readOnly={true}
                                   ref={complexRef}/>
                        </Form.Group>
                        <Button type='submit'
                            // onClick={() => console.log(localStorage.getItem("D:" + props.person.id))}>Submit</Button>
                                onClick={addDeal}>Submit</Button>
                    </Form>
                </div>
            </Popup>
            <Popup
                open={openEdit}
                // closeOnDocumentClick={false}
                onClose={closeEditModal}
                className=""
            >
                <div className="container">
                    <a className="float-right"><GrClose onClick={closeEditModal}/></a>
                    <br/>
                    <br/>
                    <Form>
                        <Form.Field>
                            <label className="float-left">نام مشتری :</label>
                            <input placeholder='First Name' ref={nameRef} defaultValue={getName(id)}/>
                        </Form.Field>
                        <Form.Field>
                            <label className="float-left">شماره تلفن :</label>
                            <input placeholder='Phone Number' ref={phoneRef} defaultValue={getPhone(id)}/>
                        </Form.Field>
                        <Button type='submit' onClick={() => editSubmitHandler(id)}>Submit</Button>
                    </Form>
                </div>
            </Popup>
        </React.Fragment>
    );
}

export default DailyUserInfo;