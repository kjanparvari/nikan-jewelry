import React, {useContext, useEffect, useRef, useState} from 'react';
import {FaUser} from "react-icons/fa";
// @ts-ignore
import Tilt from "react-tilt/dist/tilt";
import {CgMoreVerticalAlt} from 'react-icons/cg';
import {GrAdd, GrClose} from 'react-icons/gr';
import {BsArrowsExpand} from 'react-icons/bs';
import {HiViewGrid} from 'react-icons/hi';
import {FaEquals} from 'react-icons/fa';
import {AiFillPrinter} from 'react-icons/ai';
import Popup from 'reactjs-popup';
import {Button, Form} from "semantic-ui-react";
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import DatePicker, {DayValue} from 'react-modern-calendar-datepicker';
import {themeContext} from "../../App";
import {offsetContext} from "../../App";
import ReactToPrint from 'react-to-print';
import NumberFormat from "react-number-format";
import {DECIMAL_SEPARATOR, THOUSAND_SEPARATOR} from "../../App";

const getName = (id: number) => {
    const m = localStorage.getItem("inplace-members");
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
    const m = localStorage.getItem("inplace-members");
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

const computeOMoney = (): number => {
    return 0;
};

function InplaceUserInfo(props: any) {
    const {theme} = useContext(themeContext);
    const offset = useContext(offsetContext);
    const deleteMemberHandler = (id: string) => {
        props.deleteMember(id);
    };
    const [pageInput, setPageInput] = useState<number>(-1);
    const [moneyInInput, setMoneyInInput] = useState<number>(-1);
    const [moneyOutInput, setMoneyOutInput] = useState<number>(-1);
    const [goldInInput, setGoldInInput] = useState<number>(-1);
    const [goldOutInput, setGoldOutInput] = useState<number>(-1);

    const initInputs = () => {
        setPageInput(-1);
        setMoneyInInput(-1);
        setMoneyOutInput(-1);
        setGoldInInput(-1);
        setGoldOutInput(-1);
        setSelectedDay(null);
        setError("");
    };
    const [error, setError] = useState<string>("");

    const [open, setOpen] = useState(false);
    const [selectedDay, setSelectedDay] = useState<DayValue>(null);
    const addDeal = () => {
        const pageNumber = pageInput;
        const moneyIn = moneyInInput;
        const moneyOut = moneyOutInput;
        const goldIn = goldInInput;
        const goldOut = goldOutInput;
        const key = "I:" + props.person.id;
        if (selectedDay === null) {
            setError("روز انتخاب نشده است");
            return;
        } else if (pageNumber === -1) {
            setError("شماره صفحه وارد نشده است");
            return;
        } else if (goldIn === -1) {
            setError("ورود طلا وارد نشده است");
            return;
        } else if (goldOut === -1) {
            setError("خروج طلا وارد نشده است");
            return;
        } else if (moneyIn === -1) {
            setError("ورود پول وارد نشده است");
            return;
        } else if (moneyOut === -1) {
            setError("خروج پول وارد نشده است");
            return;
        }  else {
            let p: any = localStorage.getItem(key);
            if (p === null || p === "" || p === undefined) {
                p = {
                    maxId: 0,
                    list: []
                }
            } else {
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
                goldOut: goldOut
            };
            p.maxId = maxId;
            p.list.push(val);
            props.setDeals(() => p.list);
            p = JSON.stringify(p);
            console.log(p);
            localStorage.setItem(key, p);
            offset.changeGold(goldIn - goldOut);
            offset.changeMoney(moneyIn - moneyOut);
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
        props.editMember(id, nameRef.current.value, phoneRef.current.value);
        closeEditModal();

    };

    const {id, name, phone} = props.person;

    return (
        <React.Fragment>
            <Tilt className="Tilt container Tilt-inner bg-success rounded-pill float-right mr-3 pt-1 pb-2"
                  options={{max: 2, scale: 1.02}}
                  style={{
                      // height: "15vh",
                      width: "90%",
                      borderRadius: 25,
                      marginTop: "auto",
                      marginBottom: "auto",
                      minHeight: "100px",
                      maxHeight: "125px"
                  }}>
                <div className="bg-danger" style={{marginTop: "0%"}}>
                    <div className="float-right ">
                        <FaUser className="float-right"
                                style={{fontSize: 60, marginTop: "4%"}}/>
                        <div className="float-right mr-3">
                            <div style={{fontSize: 25, marginTop: "auto", marginBottom: "auto"}}>
                                {name}
                            </div>
                            <div className="float-right text-dark">
                                #{id}
                            </div>
                        </div>
                        <div className="float-right" style={{marginTop: "auto", marginBottom: "auto", marginRight: 50}}>

                            <br/>
                            <div>
                                <div className="float-right">:شماره تماس</div>
                                <div className="float-right mr-2">{phone}</div>
                            </div>
                            <br/>

                        </div>
                    </div>
                    <div style={{marginTop: "", marginBottom: ""}}>

                        <Popup
                            trigger={<a className="float-left ml-2"><CgMoreVerticalAlt
                                style={{fontSize: 40, marginTop: "70%"}}/></a>}
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
                        <div className="ml-3 float-left" style={{
                            // width: "95%",
                            // margin: "auto",
                        }}>
                        </div>
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
                    {/*<a className="float-right" onClick={closeModal} style={{width: "10%"}}>*/}
                    {/*    X*/}
                    {/*</a>*/}
                    <a className="float-right"><GrClose onClick={closeModal}/></a>
                    <br/>
                    <br/>
                    <Form>
                        <Form.Group>
                            {error !== "" ?
                                <div className="w-100 badge-danger pb-2 pt-2" style={{borderRadius: 10}}>
                                    <div>{error}</div>
                                </div>
                                : <div/>
                            }
                        </Form.Group>

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
                            <NumberFormat min={0} className=" text-center ml-3" style={{width: "150px"}}
                                          placeholder="شماره صفحه" decimalSeparator={DECIMAL_SEPARATOR}
                                          thousandSeparator={THOUSAND_SEPARATOR}
                                          value={pageInput === -1 ? "" : pageInput}
                                          onValueChange={({floatValue, formattedValue, value}) => {
                                              setPageInput(() => floatValue === undefined ? 0 : floatValue);
                                          }}
                            />
                        </Form.Group>
                        <Form.Group>
                            <label className="float-left  text-left">طلا :</label>
                            <NumberFormat min={0} className="ml-3 mr-3 text-center" style={{width: "40%"}}
                                          placeholder="ورود" step="0.001" decimalSeparator={DECIMAL_SEPARATOR}
                                          thousandSeparator={THOUSAND_SEPARATOR}
                                          value={goldInInput === -1 ? "" : goldInInput}
                                          onValueChange={({floatValue, formattedValue, value}) => {
                                              setGoldInInput(() => floatValue === undefined ? 0 : floatValue);
                                          }}
                            />
                            <NumberFormat min={0} className=" text-center" style={{width: "40%"}}
                                          placeholder='خروج' step="0.001" decimalSeparator={DECIMAL_SEPARATOR}
                                          thousandSeparator={THOUSAND_SEPARATOR}
                                          value={goldOutInput === -1 ? "" : goldOutInput}
                                          onValueChange={({floatValue, formattedValue, value}) => {
                                              setGoldOutInput(() => floatValue === undefined ? 0 : floatValue);
                                          }}
                            />
                        </Form.Group>
                        <Form.Group>
                            <label className="float-left  text-left">پول :</label>
                            <NumberFormat min={0} className="ml-3 mr-3 text-center" style={{width: "40%"}}
                                          placeholder="ورود" decimalSeparator={DECIMAL_SEPARATOR}
                                          thousandSeparator={THOUSAND_SEPARATOR}
                                          value={moneyInInput === -1 ? "" : moneyInInput}
                                          onValueChange={({floatValue, formattedValue, value}) => {
                                              setMoneyInInput(() => floatValue === undefined ? 0 : floatValue);
                                          }}/>
                            <NumberFormat min={0} className=" text-center" style={{width: "40%"}}
                                          placeholder='خروج' decimalSeparator={DECIMAL_SEPARATOR}
                                          thousandSeparator={THOUSAND_SEPARATOR}
                                          value={moneyOutInput === -1 ? "" : moneyOutInput}
                                          onValueChange={({floatValue, formattedValue, value}) => {
                                              setMoneyOutInput(() => floatValue === undefined ? 0 : floatValue);
                                          }}/>
                        </Form.Group>
                        <Button type='submit'
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

export default InplaceUserInfo;