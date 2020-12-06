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

const DECIMAL_SEPARATOR = ".";
const THOUSAND_SEPARATOR = " ";

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

const computeOMoney = (): number => {
    return 0;
};

function DailyUserInfo(props: any) {
    const {theme} = useContext(themeContext);
    const offset = useContext(offsetContext);
    const updateOwings = (id: number) => {
        let og = 0;
        const d = localStorage.getItem("D:" + id.toString());
        if (d === null || d === undefined || d === "")
            return;
        const deals: any[] = JSON.parse(d).list;
        for (let i in deals) {
            og += deals[i].leftGold;
        }
        const m = localStorage.getItem("daily-members");
        if (m !== null && m !== undefined && m !== "") {
            let mems = JSON.parse(m);
            for (let j in mems.list) {
                if (mems.list[j].id === id) {
                    mems.list[j].oGold = og;
                    break;
                }
            }
            localStorage.setItem("daily-members", JSON.stringify(mems));
            props.editOwings(og);
        }
    };
    const deleteMemberHandler = (id: string) => {
        props.deleteMember(id);
        updateOwings(parseInt(id));
    };
    const [pageInput, setPageInput] = useState<number>(-1);
    const [moneyInInput, setMoneyInInput] = useState<number>(-1);
    const [moneyOutInput, setMoneyOutInput] = useState<number>(-1);
    const [goldInInput, setGoldInInput] = useState<number>(-1);
    const [goldOutInput, setGoldOutInput] = useState<number>(-1);
    const [ojratInput, setOjratInput] = useState<number>(-1);
    const [fiInput, setFiInput] = useState<number>(-1);
    const [profitInput, setProfitInput] = useState<number>(-1);
    const [complexInput, setComplexInput] = useState<number>(-1);
    const [currentComplexInput, setCurrentComplexInput] = useState<number>(-1);
    const [currentOjratInput, setCurrentOjratInput] = useState<number>(0);
    const [currentFiInput, setCurrentFiInput] = useState<number>(0);
    const [currentProfitInput, setCurrentProfitInput] = useState<number>(0);

    const [open, setOpen] = useState(false);
    const [selectedDay, setSelectedDay] = useState<DayValue>(null);
    const addDeal = () => {
        const pageNumber = pageInput;
        const moneyIn = moneyInInput;
        const moneyOut = moneyOutInput;
        const goldIn = goldInInput;
        const goldOut = goldOutInput;
        const ojrat = ojratInput;
        const fi = fiInput;
        const profit = profitInput;
        const key = "D:" + props.person.id;
        if (selectedDay === null || isNaN(pageNumber) || isNaN(moneyIn) || isNaN(moneyOut) || isNaN(goldIn) || isNaN(goldOut) || isNaN(ojrat) || isNaN(fi) || isNaN(profit)) {
            // alert("همه ی بخش ها پر نشده اند !");
            return;
        } else {
            let p: any = localStorage.getItem(key);
            if (p === null || p === "" || p === undefined) {
                p = {
                    maxId: 0,
                    list: []
                }
            } else {
                p = JSON.parse(p);
            }
            const _m = localStorage.getItem("daily-members");
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
            const _leftGold = (goldOut - goldIn) - (moneyIn - moneyOut) / ((ojrat + fi) * (1.0 + profit / 100));
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
                },
                leftGold: _leftGold,
                curOGold: _ogold + _leftGold
            };
            p.maxId = maxId;
            p.list.push(val);
            props.setDeals(() => p.list);
            p = JSON.stringify(p);
            console.log(p);
            localStorage.setItem(key, p);
            offset.changeGold(goldIn - goldOut);
            offset.changeMoney(moneyIn - moneyOut);
            updateOwings(id);
            closeModal();
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
        // @ts-ignore
        props.editMember(id, nameRef.current.value, phoneRef.current.value);
        closeEditModal();
        updateOwings(id);

    };
    const [currentComplex, setCurrentComplex]: any[] = useState({ojrat: -1, fi: -1, profit: -1});
    const getSavedCurrentComplex = () => {
        const _c: any = localStorage.getItem("daily-complex");
        let _complex: { ojrat: number, fi: number, profit: number };
        if (_c === null || _c === undefined || _c === "") {
            _complex = {
                ojrat: 0,
                fi: 0,
                profit: 0
            };
            localStorage.setItem("daily-complex", JSON.stringify(_complex));
        } else {
            _complex = JSON.parse(_c);
        }
        console.log(_complex);
        setCurrentProfitInput(_complex.profit);
        setCurrentFiInput(_complex.fi);
        setCurrentOjratInput(_complex.ojrat);
        setCurrentComplex(() => {
            return _complex;
        });
    };

    useEffect(() => {
        const _complex: { ojrat: number, fi: number, profit: number } = {ojrat: 0, fi: 0, profit: 0};
        _complex.ojrat = currentOjratInput;
        _complex.fi = currentFiInput;
        _complex.profit = currentProfitInput;
        localStorage.setItem("daily-complex", JSON.stringify(_complex));
        setCurrentComplex(() => {
            return _complex
        });
    }, [currentProfitInput, currentFiInput, currentOjratInput]);
    useEffect(() => {
        let result: number = 0;
        let ojrat: number = ojratInput;
        let fi: number = fiInput;
        let profit: number = 1.0 + profitInput / 100;

        if (isNaN(ojrat) || isNaN(fi) || isNaN(profit))
            result = 0;
        else
            result = (ojrat + fi) * profit;
        setComplexInput(result);

    }, [fiInput, profitInput, ojratInput]);
    if (currentComplex.ojrat === -1)
        getSavedCurrentComplex();
    const {id, name, phone, oGold} = props.person;

    return (
        <React.Fragment>
            <Tilt className="Tilt container Tilt-inner bg-warning rounded-pill float-right mr-3 pt-2 pb-2"
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
                <div className="bg-danger" style={{marginTop: "0.5%"}}>
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
                            <div>
                                <div className="float-right">: قیمت مرکب فعلی</div>
                                <div
                                    className="float-right mr-2">{((currentComplex.ojrat + currentComplex.fi) * (1.0 + currentComplex.profit / 100.0)).toFixed(0)}</div>
                            </div>
                            <br/>

                            <div>
                                <div className="float-right">:بستانکار طلایی</div>
                                <div className="float-right mr-2">{oGold.toFixed(3)}</div>
                            </div>
                            <br/>
                            <div>
                                <div className="float-right">:بدهکار پولی</div>
                                <div
                                    className="float-right mr-2">{parseInt((oGold * (currentComplex.ojrat + currentComplex.fi) * (1.0 + currentComplex.profit / 100.0)).toString())}</div>
                            </div>
                            <br/>
                            <div>
                                <div className="float-right">:شماره تماس</div>
                                <div className="float-right mr-2">{phone}</div>
                            </div>
                            <br/>

                        </div>
                    </div>
                    <div style={{marginTop: "-1", marginBottom: "auto"}}>
                        {/*<button className="btn btn-danger btn-sm float-left mt-4 ml-4" style={{fontSize: 13}}>حذف عضو*/}
                        {/*</button>*/}

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
                            <div className="mt-1">
                                <label className="float-left text-dark" style={{width: "50px"}}>اجرت :</label>
                                <NumberFormat className="float-right form-control form-control-sm"
                                              onValueChange={({floatValue, formattedValue, value}) => {
                                                  setCurrentOjratInput(() => floatValue === undefined ? 0 : floatValue);
                                              }}
                                              decimalSeparator={DECIMAL_SEPARATOR}
                                              thousandSeparator={THOUSAND_SEPARATOR}
                                              value={currentOjratInput === 0 ? "" : currentOjratInput}
                                              min={0}
                                              style={{width: "150px"}}/>
                            </div>
                            <br/>
                            <div className="mt-3">
                                <label className="float-left text-dark" style={{width: "50px"}}>فی :</label>
                                <NumberFormat className="float-right form-control form-control-sm"
                                              onValueChange={({floatValue, formattedValue, value}) => {
                                                  setCurrentFiInput(() => floatValue === undefined ? 0 : floatValue);
                                              }}
                                              decimalSeparator={DECIMAL_SEPARATOR}
                                              thousandSeparator={THOUSAND_SEPARATOR}
                                              value={currentFiInput === 0 ? "" : currentFiInput}
                                              min={0}
                                              style={{width: "150px"}}/>
                            </div>
                            <br/>
                            <div className="mt-3">
                                <label className="float-left text-dark" style={{width: "50px"}}>سود :</label>
                                <NumberFormat className="float-right small form-control form-control-sm"
                                              onValueChange={({floatValue, formattedValue, value}) => {
                                                  setCurrentProfitInput(() => floatValue === undefined ? 0 : floatValue);

                                              }}
                                              decimalSeparator={DECIMAL_SEPARATOR}
                                              thousandSeparator={THOUSAND_SEPARATOR}
                                              value={currentProfitInput === 0 ? "" : currentProfitInput}
                                              min={0}
                                              style={{width: "150px"}}/>
                            </div>
                            <br/>
                            <br/>


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
                        <Form.Group>
                            <label className="float-left  text-left">قیمت هر گرم :</label>
                            <NumberFormat min={0} className="ml-3 mr-1 text-center" style={{width: "18%"}}
                                          placeholder="اجرت"
                                          decimalSeparator={DECIMAL_SEPARATOR}
                                          thousandSeparator={THOUSAND_SEPARATOR}
                                          value={ojratInput === -1 ? "" : ojratInput}
                                          onValueChange={({floatValue, formattedValue, value}) => {
                                              setOjratInput(() => floatValue === undefined ? 0 : floatValue);
                                          }}/><GrAdd
                            style={{marginTop: 10}}/>
                            <NumberFormat min={0} className="ml-1 mr-1 text-center" style={{width: "18%"}}
                                          placeholder='فی تابلو'
                                          decimalSeparator={DECIMAL_SEPARATOR}
                                          thousandSeparator={THOUSAND_SEPARATOR}
                                          value={fiInput === -1 ? "" : fiInput}
                                          onValueChange={({floatValue, formattedValue, value}) => {
                                              setFiInput(() => floatValue === undefined ? 0 : floatValue);
                                          }}/><GrAdd
                            style={{marginTop: 10}}/>
                            <NumberFormat max={100} min={0} step="0.01" className="ml-1 mr-1 text-center"
                                          style={{width: "15%"}} placeholder='درصد سود'
                                          decimalSeparator={DECIMAL_SEPARATOR}
                                          thousandSeparator={THOUSAND_SEPARATOR}
                                          value={profitInput === -1 ? "" : profitInput}
                                          onValueChange={({floatValue, formattedValue, value}) => {
                                              setProfitInput(() => floatValue === undefined ? 0 : floatValue);
                                          }}/><FaEquals
                            style={{marginTop: 10}}/>
                            <NumberFormat className="ml-1 mr-1 text-center" style={{width: "17%"}}
                                          readOnly={true}
                                          value={(fiInput < 0 || profitInput < 0 || ojratInput < 0) ? "" : complexInput}/>
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

export default DailyUserInfo;