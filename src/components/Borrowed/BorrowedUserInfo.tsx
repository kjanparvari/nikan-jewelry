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
    const m = localStorage.getItem("borrowed-members");
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

const changeView = (view: string, setView: any) => {
    console.log(view);
    if (view === "card")
        setView(() => "table");
    else if (view === "table")
        setView(() => "card");
};
const updateOwings = (id: number) => {
    let og = 0;
    const d = localStorage.getItem("B:" + id.toString());
    if (d === null || d === undefined || d === "")
        return;
    const deals: any[] = JSON.parse(d).list;
    for (let i in deals) {
        og += deals[i].leftGold;
    }
    const m = localStorage.getItem("borrowed-members");
    if (m !== null && m !== undefined && m !== "") {
        let mems = JSON.parse(m);
        for (let j in mems.list) {
            if (mems.list[j].id === id) {
                mems.list[j].oGold = og;
                break;
            }
        }
        localStorage.setItem("borrowed-members", JSON.stringify(mems));
    }
};

function BorrowedUserInfo(props: any) {
    const theme = useContext(themeContext);
    const offset = useContext(offsetContext);
    const deleteMemberHandler = (id: string) => {
        const {maxId, list} = JSON.parse(localStorage.getItem("borrowed-members") as string);
        const newMembers = list.filter((member: any) => {
            return member.id !== id;
        });
        localStorage.setItem("borrowed-members", JSON.stringify({maxId: maxId, list: newMembers}));
        localStorage.removeItem("B:" + id);
        localStorage.setItem("last", "borrowed");
        updateOwings(parseInt(id));
        window.location.reload(false);
    };
    const pageRef = useRef(null);
    const goldInRef = useRef(null);
    const goldOutRef = useRef(null);
    const ojratRef = useRef(null);
    const buyerNameRef = useRef(null);
    const [selectedDay, setSelectedDay] = useState<DayValue>(null);
    const [soldDay, setSoldDay] = useState<DayValue>(null);

    const [open, setOpen] = useState(false);
    const addDeal = () => {
        // @ts-ignore
        const pageNumber = parseInt(pageRef.current.value);
        // @ts-ignore
        const goldIn = parseFloat(goldInRef.current.value);
        // @ts-ignore
        const goldOut = parseFloat(goldOutRef.current.value);
        // @ts-ignore
        const ojrat = parseFloat(ojratRef.current.value);
        // @ts-ignore
        const buyerName = buyerNameRef.current.value;
        const _s: any = soldDay === null ? {year: 0, month: 0, day: 0} : soldDay;
        const key = "B:" + props.person.id;
        if (selectedDay === null || soldDay === null || isNaN(pageNumber) || isNaN(goldIn) || isNaN(goldOut)|| isNaN(ojrat) || buyerName === "") {
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

            const _m = localStorage.getItem("borrowed-members");
            let _ogold;
            if (_m !== null && _m !== undefined && _m !== "") {
                let _mems = JSON.parse(_m);
                for (let j in _mems.list) {
                    if (_mems.list[j].id === id) {
                        _ogold = _mems.list[j].oGold;
                        break;
                    }
                }
            }
            const maxId = (parseInt(p.maxId) + 1).toString();
            const val = {
                id: maxId,
                date: selectedDay,
                soldDate: _s,
                pageNumber: pageNumber,
                goldIn: goldIn,
                goldOut: goldOut,
                ojrat: ojrat,
                buyerName: buyerName,
                leftGold: (goldIn - goldOut),
                curOGold: _ogold + goldIn - goldOut
            };
            p.maxId = maxId;
            p.list.push(val);
            p = JSON.stringify(p);
            console.log(p);
            localStorage.setItem(key, p);
            offset.changeGold(goldIn - goldOut);
            offset.changeMoney(-1 * ojrat);
            updateOwings(id);
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
        let m: any = localStorage.getItem("borrowed-members");
        if (m !== null) {
            m = JSON.parse(m);
            for (let i in m.list) {
                if (m.list[i].id === id) {
                    // @ts-ignore
                    m.list[i].name = nameRef.current.value;
                    localStorage.setItem("borrowed-members", JSON.stringify(m));
                    closeModal();
                    updateOwings(id);
                    window.location.reload(false);
                    break;
                }
            }
        }


    };

    const {id, name, oMoney, oGold} = props.person;
    console.log("im here");
    return (
        <React.Fragment>
            <Tilt className="Tilt container Tilt-inner bg-info rounded-pill float-right mr-3 pt-2 pb-2"
                  options={{max: 2, scale: 1.02}}
                  style={{
                      height: "12vh",
                      width: "90%",
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
                            {/*<div>*/}
                            {/*    <div className="float-right">:بدهکار پولی</div>*/}
                            {/*    <div className="float-right mr-2">{oMoney}</div>*/}
                            {/*</div>*/}
                            <div>
                                <div className="float-right">:بستانکار طلایی</div>
                                <div className="float-right mr-2">{oGold.toFixed(3)}</div>
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
                contentStyle={{borderRadius: 15}}
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
                            <label className="float-left  text-left">فروخته شده به :</label>
                            <input type="text" min={0} className="ml-3 mr-3 text-center" style={{width: "40%"}}
                                   placeholder="فروخته شده به" ref={buyerNameRef}/>
                            <DatePicker
                                value={soldDay}
                                onChange={setSoldDay}
                                inputPlaceholder="در تاریخ"
                                shouldHighlightWeekends
                                locale={"fa"}
                            />
                        </Form.Group>
                        <Form.Group className="m-auto">
                            <label className="float-left text-left">اجرت :</label>
                            <input type="number" min={0} className="ml-3 mr-3 text-center" style={{width: "40%"}}
                                   placeholder="اجرت" ref={ojratRef}/>
                        </Form.Group>
                        <br/>
                        {/*<Form.Group>*/}
                        {/*    <label className="float-left  text-left">پول :</label>*/}
                        {/*    <input type="number" min={0} className="ml-3 mr-3 text-center" style={{width: "40%"}}*/}
                        {/*           placeholder="ورود" ref={moneyInRef}/>*/}
                        {/*    <input type="number" min={0} className=" text-center" style={{width: "40%"}}*/}
                        {/*           placeholder='خروج' ref={moneyOutRef}/>*/}
                        {/*</Form.Group>*/}
                        {/*<Form.Group>*/}
                        {/*    <label className="float-left  text-left">قیمت هر گرم :</label>*/}
                        {/*    <input type="number" min={0} className="ml-3 mr-1 text-center" style={{width: "18%"}}*/}
                        {/*           placeholder="اجرت" onChange={updateComplexLabel} ref={ojratRef}/><GrAdd*/}
                        {/*    style={{marginTop: 10}}/>*/}
                        {/*    <input type="number" min={0} className="ml-1 mr-1 text-center" style={{width: "18%"}}*/}
                        {/*           placeholder='فی تابلو' onChange={updateComplexLabel} ref={fiRef}/><GrAdd*/}
                        {/*    style={{marginTop: 10}}/>*/}
                        {/*    <input type="number" max={100} min={0} className="ml-1 mr-1 text-center"*/}
                        {/*           style={{width: "15%"}} onChange={updateComplexLabel} placeholder='درصد سود'*/}
                        {/*           ref={profitRef}/><FaEquals*/}
                        {/*    style={{marginTop: 10}}/>*/}
                        {/*    <input className="ml-1 mr-1 text-center" style={{width: "17%"}} value={0}*/}
                        {/*           readOnly={true}*/}
                        {/*           ref={complexRef}/>*/}
                        {/*</Form.Group>*/}
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
                contentStyle={{borderRadius: 15}}
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
                        <Button type='submit' onClick={() => editSubmitHandler(id)}>Submit</Button>
                    </Form>
                </div>
            </Popup>
        </React.Fragment>
    );
}

export default BorrowedUserInfo;