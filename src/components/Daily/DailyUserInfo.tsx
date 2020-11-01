import React, {useContext, useEffect, useRef, useState} from 'react';
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
    }
};

const computeOMoney = (): number => {
    return 0;
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
        updateOwings(parseInt(id));
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
    const currentComplexRef = useRef(null);
    const currentOjratRef = useRef(null);
    const currentFiRef = useRef(null);
    const currentProfitRef = useRef(null);
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
        const moneyIn = parseFloat(moneyInRef.current.value);
        // @ts-ignore
        const moneyOut = parseFloat(moneyOutRef.current.value);
        // @ts-ignore
        const goldIn = parseFloat(goldInRef.current.value);
        // @ts-ignore
        const goldOut = parseFloat(goldOutRef.current.value);
        // @ts-ignore
        const ojrat = parseFloat(ojratRef.current.value);
        // @ts-ignore
        const fi = parseFloat(fiRef.current.value);
        // @ts-ignore
        const profit = parseFloat(profitRef.current.value);
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
                console.log("here");
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
                // leftMoney: (goldOut - goldIn) * ((ojrat + fi) * (1.0 + profit/100)) - (moneyIn - moneyOut),
                leftGold: _leftGold,
                curOGold: _ogold + _leftGold
            };
            p.maxId = maxId;
            p.list.push(val);
            p = JSON.stringify(p);
            console.log(p);
            localStorage.setItem(key, p);
            offset.changeGold(goldIn - goldOut);
            offset.changeMoney(moneyIn - moneyOut);
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
                    updateOwings(id);
                    window.location.reload(false);
                    break;
                }
            }
        }


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
        setCurrentComplex(() => {
            return _complex;
        });
    };
    const changeCurrentComplex = () => {
        // @ts-ignore
        const _complex: { ojrat: number, fi: number, profit: number } = {ojrat: 0, fi: 0, profit: 0};
        // @ts-ignore
        _complex.ojrat = parseFloat(currentOjratRef.current.value);
        // @ts-ignore
        _complex.fi = parseFloat(currentFiRef.current.value);
        // @ts-ignore
        _complex.profit = parseFloat(currentProfitRef.current.value);
        localStorage.setItem("daily-complex", JSON.stringify(_complex));
        setCurrentComplex(() => {
            return _complex;
        });
    };
    // useEffect(() => {
    //     if (currentComplex.ojrat === -1)
    //         getSavedCurrentComplex();
    // }, []);
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

                            {/*<Popup*/}
                            {/*    trigger={<div>*/}
                            {/*        <div className="float-right">: قیمت مرکب فعلی</div>*/}
                            {/*        <div*/}
                            {/*            className="float-right mr-2">{((currentComplex.ojrat + currentComplex.fi) * (1.0 + currentComplex.profit / 100.0)).toFixed(3)}</div>*/}
                            {/*    </div>}*/}
                            {/*    position="right top"*/}
                            {/*    on="hover"*/}
                            {/*    closeOnDocumentClick={true}*/}
                            {/*    mouseLeaveDelay={200}*/}
                            {/*    mouseEnterDelay={0}*/}
                            {/*    contentStyle={{*/}
                            {/*        padding: "2px",*/}
                            {/*        paddingRight: "4px",*/}
                            {/*        border: "none",*/}
                            {/*        borderRadius: 10,*/}
                            {/*        // backgroundColor: "#fff",*/}
                            {/*        backgroundColor: "#343a40",*/}
                            {/*        width: 220,*/}
                            {/*        zIndex: 999999*/}
                            {/*    }}*/}
                            {/*    arrow={false}*/}
                            {/*>*/}
                            {/*    <div className="mr-3" style={{*/}
                            {/*        width: "95%",*/}
                            {/*        margin: "auto",*/}
                            {/*    }}>*/}
                            {/*        <div className="mt-1">*/}
                            {/*            <label className="float-left text-white" style={{width: "50px"}}>اجرت :</label>*/}
                            {/*            <input type="number" className="float-right form-control form-control-sm"*/}
                            {/*                   ref={currentOjratRef} defaultValue={currentComplex.ojrat} onChange={changeCurrentComplex}*/}
                            {/*                   style={{width: "150px"}}/>*/}
                            {/*        </div>*/}
                            {/*        <br/>*/}
                            {/*        <div className="mt-3">*/}
                            {/*            <label className="float-left text-white" style={{width: "50px"}}>فی :</label>*/}
                            {/*            <input type="number" className="float-right form-control form-control-sm"*/}
                            {/*                   ref={currentFiRef} defaultValue={currentComplex.fi} onChange={changeCurrentComplex}*/}
                            {/*                   style={{width: "150px"}}/>*/}
                            {/*        </div>*/}
                            {/*        <br/>*/}
                            {/*        <div className="mt-3">*/}
                            {/*            <label className="float-left text-white" style={{width: "50px"}}>سود :</label>*/}
                            {/*            <input type="number" className="float-right form-control form-control-sm"*/}
                            {/*                   ref={currentProfitRef} defaultValue={currentComplex.profit} onChange={changeCurrentComplex}*/}
                            {/*                   style={{width: "150px"}}/>*/}
                            {/*        </div>*/}
                            {/*        <br/>*/}
                            {/*        <br/>*/}


                            {/*    </div>*/}
                            {/*</Popup>*/}
                            <div>
                                <div className="float-right">: قیمت مرکب فعلی</div>
                                <div
                                    className="float-right mr-2">{((currentComplex.ojrat + currentComplex.fi) * (1.0 + currentComplex.profit / 100.0))}</div>
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
                                    className="float-right mr-2">{(oGold * (currentComplex.ojrat + currentComplex.fi) * (1.0 + currentComplex.profit / 100.0))}</div>
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
                            trigger={<a className="float-left mt-4 ml-2"><CgMoreVerticalAlt
                                style={{fontSize: 40}}/></a>}
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
                                <input type="number" className="float-right form-control form-control-sm"
                                       ref={currentOjratRef} defaultValue={currentComplex.ojrat}
                                       onChange={changeCurrentComplex} min={0}
                                       style={{width: "150px"}}/>
                            </div>
                            <br/>
                            <div className="mt-3">
                                <label className="float-left text-dark" style={{width: "50px"}}>فی :</label>
                                <input type="number" className="float-right form-control form-control-sm"
                                       ref={currentFiRef} defaultValue={currentComplex.fi}
                                       onChange={changeCurrentComplex}  min={0}
                                       style={{width: "150px"}}/>
                            </div>
                            <br/>
                            <div className="mt-3">
                                <label className="float-left text-dark" style={{width: "50px"}}>سود :</label>
                                <input type="number" className="float-right small form-control form-control-sm"
                                       ref={currentProfitRef} defaultValue={currentComplex.profit}
                                       onChange={changeCurrentComplex} min={0}
                                       style={{width: "150px"}}/>
                            </div>
                            <br/>
                            <br/>


                        </div>
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
                                   placeholder="ورود" step="0.001" ref={goldInRef}/>
                            <input type="number" min={0} className=" text-center" style={{width: "40%"}}
                                   placeholder='خروج' step="0.001" ref={goldOutRef}/>
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