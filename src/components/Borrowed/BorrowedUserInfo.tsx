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
import {DECIMAL_SEPARATOR, themeContext, THOUSAND_SEPARATOR} from "../../App";
import {offsetContext} from "../../App";
import {AiFillPrinter} from "react-icons/ai";
import {BsArrowsExpand} from "react-icons/bs";
import NumberFormat from "react-number-format";

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


function BorrowedUserInfo(props: any) {
    const {theme} = useContext(themeContext);
    const offset = useContext(offsetContext);
    const deleteMemberHandler = (id: string) => {
        props.deleteMember(id);
        updateOwings(parseInt(id));
    };
    const [pageInput, setPageInput] = useState<number>(-1);
    const [goldInInput, setGoldInInput] = useState<number>(-1);
    const [goldOutInput, setGoldOutInput] = useState<number>(-1);
    const [ojratInput, setOjratInput] = useState<number>(-1);
    const [ojratProfitInput, setOjratProfitInput] = useState<number>(-1);
    const initInputs = () => {
        setPageInput(-1);
        setGoldInInput(-1);
        setGoldOutInput(-1);
        setOjratInput(-1);
        setOjratProfitInput(-1);
    };
    const buyerNameRef = useRef(null);
    const [selectedDay, setSelectedDay] = useState<DayValue>(null);
    const [soldDay, setSoldDay] = useState<DayValue>(null);

    const [open, setOpen] = useState(false);
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
            props.editOwings(og);
        }
    };
    const addDeal = () => {
        const pageNumber = pageInput;
        const goldIn = goldInInput;
        const goldOut = goldOutInput;
        const ojrat = ojratInput;
        const ojratProfit = ojratProfitInput;
        // @ts-ignore
        const buyerName = buyerNameRef.current.value;
        const _s: any = soldDay === null ? {year: 0, month: 0, day: 0} : soldDay;
        const key = "B:" + props.person.id;
        if (selectedDay === null || soldDay === null || isNaN(pageNumber) || isNaN(goldIn) || isNaN(goldOut) || isNaN(ojrat) || isNaN(ojratProfit) || buyerName === "") {
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
            const _left_gold = (goldIn * (1.0 + ojratProfit / 100)) - goldOut;
            const val = {
                id: maxId,
                date: selectedDay,
                soldDate: _s,
                pageNumber: pageNumber,
                goldIn: goldIn,
                goldOut: goldOut,
                ojrat: ojrat,
                ojratProfit: ojratProfit,
                buyerName: buyerName,
                leftGold: _left_gold,
                curOGold: _ogold + _left_gold
            };
            p.maxId = maxId;
            p.list.push(val);
            props.setDeals(() => p.list);
            p = JSON.stringify(p);
            console.log(p);
            localStorage.setItem(key, p);
            offset.changeGold(_left_gold);
            offset.changeMoney(-1 * ojrat);
            updateOwings(id);
            closeModal();
        }
    };
    const closeModal = () => {
        initInputs();
        setOpen(false)
    };
    const openModal = () => setOpen(true);

    const [openEdit, setOpenEdit] = useState(false);
    const closeEditModal = () => setOpenEdit(false);
    const openEditModal = () => setOpenEdit(true);
    const nameRef = useRef(null);
    const phoneRef = useRef(null);

    const editSubmitHandler = (id: number) => {
        // @ts-ignore
        props.editMember(id, nameRef.current.value);
        closeEditModal();
        updateOwings(id);
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
                            <div>
                                <div className="float-right">:بستانکار طلایی</div>
                                <div className="float-right mr-2">{<NumberFormat value={oGold.toFixed(3)}
                                                                                 thousandSeparator={THOUSAND_SEPARATOR}
                                                                                 decimalSeparator={DECIMAL_SEPARATOR}
                                                                                 displayType={"text"}/>}</div>
                            </div>
                        </div>
                    </div>
                    <div style={{marginTop: "-1", marginBottom: "auto"}}>

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
                    </div>
                </div>
            </Tilt>
            <div className="float-right mt-3 mr-2">
                <a className="btn-light rounded-circle p-1 pr-2 pl-2 pb-2" onClick={openModal}
                   style={{borderRadius: 7, fontSize: 20}}><GrAdd/></a>
                <br/>
                <br/>
                <a className="btn-light rounded-circle p-1 pr-2 pl-2 pb-2 "
                   style={{borderRadius: 7, fontSize: 20, marginTop: "30px"}}
                   onClick={() => changeView(props.view, props.setView)}><HiViewGrid
                    style={{margin: "auto"}}/></a>
            </div>
            <div className="float-right mt-3 mr-2"
            >
                <a className="btn-light rounded-circle p-1 pr-2 pl-2 pb-2 "
                   style={{borderRadius: 7, fontSize: 20, marginTop: "30px"}}
                   onClick={() => props.setAutoHeight(true)}><AiFillPrinter
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
                    <a className="float-right"><GrClose onClick={closeModal}/></a>
                    <br/>
                    <br/>
                    <Form>
                        <Form.Group>
                            <label className="float-left text-center" style={{width: "10%"}}>تاریخ :</label>
                            <DatePicker
                                value={selectedDay}
                                onChange={setSelectedDay}
                                inputPlaceholder="Select a day"
                                shouldHighlightWeekends
                                locale={"fa"}
                            />
                            <label className="float-left text-left" style={{marginLeft: 100}}>شماره صفحه :</label>
                            <NumberFormat min={0} className=" text-center ml-3" style={{width: "150px"}}
                                          placeholder="شماره صفحه" value={pageInput === -1 ? "" : pageInput}
                                          onValueChange={({floatValue, formattedValue, value}) => {
                                              setPageInput(() => floatValue === undefined ? 0 : floatValue);
                                          }}
                                          thousandSeparator={THOUSAND_SEPARATOR} decimalSeparator={DECIMAL_SEPARATOR}
                            />
                        </Form.Group>
                        <Form.Group>
                            <label className="float-left  text-left">طلا :</label>
                            <NumberFormat min={0} className="ml-3 mr-3 text-center" style={{width: "40%"}}
                                          placeholder="ورود" step="0.001" value={goldInInput === -1 ? "" : goldInInput}
                                          onValueChange={({floatValue, formattedValue, value}) => {
                                              setGoldInInput(() => floatValue === undefined ? 0 : floatValue);
                                          }}
                                          thousandSeparator={THOUSAND_SEPARATOR} decimalSeparator={DECIMAL_SEPARATOR}
                            />
                            <NumberFormat min={0} className=" text-center" style={{width: "40%"}}
                                          placeholder='خروج' step="0.001"
                                          value={goldOutInput === -1 ? "" : goldOutInput}
                                          onValueChange={({floatValue, formattedValue, value}) => {
                                              setGoldOutInput(() => floatValue === undefined ? 0 : floatValue);
                                          }}
                                          thousandSeparator={THOUSAND_SEPARATOR} decimalSeparator={DECIMAL_SEPARATOR}
                            />
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
                            <NumberFormat min={0} className="ml-3 mr-3 text-center" style={{width: "40%"}}
                                          placeholder="پول" value={ojratInput === -1 ? "" : ojratInput}
                                          onValueChange={({floatValue, formattedValue, value}) => {
                                              setOjratInput(() => floatValue === undefined ? 0 : floatValue);
                                          }}
                                          thousandSeparator={THOUSAND_SEPARATOR} decimalSeparator={DECIMAL_SEPARATOR}
                            />
                            <NumberFormat step="0.01" min={0} max={100} className="ml-3 mr-3 text-center"
                                          style={{width: "40%"}}
                                          placeholder="درصد طلا" value={ojratProfitInput === -1 ? "" : ojratProfitInput}
                                          onValueChange={({floatValue, formattedValue, value}) => {
                                              setOjratProfitInput(() => floatValue === undefined ? 0 : floatValue);
                                          }}
                                          thousandSeparator={THOUSAND_SEPARATOR} decimalSeparator={DECIMAL_SEPARATOR}
                            />
                        </Form.Group>
                        <br/>
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