import React, {useContext, useEffect, useRef, useState} from 'react';
import {BsFillInfoCircleFill} from "react-icons/bs";
import Popup from "reactjs-popup";
import {GrAdd, GrClose} from "react-icons/gr";
import {Button, Form} from "semantic-ui-react";
import DatePicker, {DayValue} from "react-modern-calendar-datepicker";
import {FaEquals} from "react-icons/fa";
import {offsetContext} from "../../App";
import NumberFormat from "react-number-format";
import {DECIMAL_SEPARATOR, THOUSAND_SEPARATOR} from "../../App";

function DailyDealCard({deal, personId, setDeals, handler, editOwings}: any) {
    const {year, month, day} = deal.date;
    const {id, goldIn, goldOut, moneyIn, moneyOut, pageNumber, complex, leftGold, curOGold} = deal;
    const [pageInput, setPageInput] = useState<number>(pageNumber);
    const [moneyInInput, setMoneyInInput] = useState<number>(moneyIn);
    const [moneyOutInput, setMoneyOutInput] = useState<number>(moneyOut);
    const [goldInInput, setGoldInInput] = useState<number>(goldIn);
    const [goldOutInput, setGoldOutInput] = useState<number>(goldOut);
    const [ojratInput, setOjratInput] = useState<number>(complex.ojrat);
    const [fiInput, setFiInput] = useState<number>(complex.fi);
    const [profitInput, setProfitInput] = useState<number>(complex.profit);
    const [complexInput, setComplexInput] = useState<number>();
    const [selectedDay, setSelectedDay] = useState<DayValue>(deal.date);

    const offset = useContext(offsetContext);
    const updateOwings = (id: number) => {
        let og = 0;
        const d = localStorage.getItem("D:" + id.toString());
        if (d === null || d === undefined || d === "")
            return;
        const deals: any[] = JSON.parse(d).list;
        for (let i in deals) {
            // om += deals[i].leftMoney;
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
            editOwings(og);
        }
    };
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
        }, [ojratInput, fiInput, profitInput]
    );
    const editDeal = () => {
        offset.changeGold(goldOut - goldIn);
        offset.changeMoney(moneyOut - moneyIn);
        const _pageNumber = pageInput;
        const _moneyIn = moneyInInput;
        const _moneyOut = moneyOutInput;
        const _goldIn = goldInInput;
        const _goldOut = goldOutInput;
        const _ojrat = ojratInput;
        const _fi = fiInput;
        const _profit = profitInput;
        const key = "D:" + personId;
        if (selectedDay === null || isNaN(_pageNumber) || isNaN(_moneyIn) || isNaN(_moneyOut) || isNaN(_goldIn) || isNaN(_goldOut) || isNaN(_ojrat) || isNaN(_fi) || isNaN(_profit)) {
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
                    if (_mems.list[j].id === personId) {
                        _ogold = _mems.list[j].oGold;
                        break;
                    }
                }
            }

            const _leftGold = (_goldOut - _goldIn) - (_moneyIn - _moneyOut) / ((_ojrat + _fi) * (1.0 + _profit / 100));
            for (let i in p.list) {
                if (p.list[i].id === id) {
                    p.list[i].pageNumber = _pageNumber;
                    p.list[i].date = selectedDay;
                    p.list[i].moneyIn = _moneyIn;
                    p.list[i].moneyOut = _moneyOut;
                    p.list[i].goldIn = _goldIn;
                    p.list[i].goldOut = _goldOut;
                    p.list[i].complex = {
                        ojrat: _ojrat,
                        fi: _fi,
                        profit: _profit
                    };
                    p.list[i].leftGold = _leftGold;
                    p.list[i].curOGold = _ogold - leftGold + _leftGold;
                    break;
                }
            }

            offset.changeGold(_goldIn - _goldOut);
            offset.changeMoney(_moneyIn - _moneyOut);
            setDeals(p.list);
            p = JSON.stringify(p);
            console.log(p);
            localStorage.setItem(key, p);
            closeModal();
            updateOwings(personId);
            handler();
        }
    };
    const deleteDealHandler = (memberId: number, dealId: number) => {
        const key: string = "D:" + memberId.toString();
        const {maxId, list} = JSON.parse(localStorage.getItem(key) as string);
        const newDeals = list.filter((deal: any) => {
            return deal.id !== dealId;
        });
        setDeals(newDeals);
        localStorage.setItem(key, JSON.stringify({maxId: maxId, list: newDeals}));
        offset.changeGold(goldOut - goldIn);
        offset.changeMoney(moneyOut - moneyIn);
        updateOwings(personId);

        handler();
    };
    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);
    const openModal = () => setOpen(true);
    return (
        <div className="bg-light mt-0 justify-content-center"
             style={{borderRadius: 15, width: 300, height: 380, marginLeft: "auto", marginRight: "auto"}}>
            <div className="badge-danger pt-1 pb-1" style={{
                marginRight: "auto",
                marginLeft: "auto",
                borderTopLeftRadius: 15,
                borderTopRightRadius: 15
            }}>{year}/{month}/{day}</div>
            <div className="mt-3" style={{color: "black"}}>
                شماره صفحه :
                <NumberFormat value={pageNumber} decimalSeparator={DECIMAL_SEPARATOR}
                              thousandSeparator={THOUSAND_SEPARATOR} displayType="text"/>
            </div>
            <div className=" m-4 badge-light" style={{height: 220, borderRadius: 10}}>
                <div className="w-100 p-3 pb-4">
                    <div className="float-right text-right  w-50 " style={{}}>:ورود پول</div>
                    <div className="float-left w-50"><NumberFormat value={moneyIn} decimalSeparator={DECIMAL_SEPARATOR}
                                                                   thousandSeparator={THOUSAND_SEPARATOR}
                                                                   displayType="text"/></div>
                </div>
                <div className="w-100 p-3 pb-4">
                    <div className="float-right text-right w-50">:خروج پول</div>
                    <div className="float-left w-50"><NumberFormat value={moneyOut} decimalSeparator={DECIMAL_SEPARATOR}
                                                                   thousandSeparator={THOUSAND_SEPARATOR}
                                                                   displayType="text"/></div>
                </div>
                <div className="w-100 p-3 pb-4">
                    <div className="float-right text-right w-50">:ورود طلا</div>
                    <div className="float-left w-50"><NumberFormat value={goldIn} decimalSeparator={DECIMAL_SEPARATOR}
                                                                   thousandSeparator={THOUSAND_SEPARATOR}
                                                                   displayType="text"/></div>
                </div>
                <div className="w-100 p-3 pb-4">
                    <div className="float-right text-right w-50">:خروج طلا</div>
                    <div className="float-left w-50"><NumberFormat value={goldOut} decimalSeparator={DECIMAL_SEPARATOR}
                                                                   thousandSeparator={THOUSAND_SEPARATOR}
                                                                   displayType="text"/></div>
                </div>
                <div className="w-100 p-3 pb-4">
                    {/*<div className="float-right text-right" style={{width: "50%"}}>:قیمت مرکب طلا</div>*/}
                    {/*<div className="float-right"*/}
                    {/*     style={{width: "40%"}}>{((complex.ojrat + complex.fi) * (1.0 + (complex.profit) / 100)).toFixed(3)}</div>*/}
                    <Popup
                        // trigger={<a className="float-left"><BsFillInfoCircleFill style={{fontSize: 20}}/></a>}
                        trigger={<div className="float-right text-right w-50">:قیمت مرکب طلا</div>}
                        position="right top"
                        on="hover"
                        closeOnDocumentClick={true}
                        mouseLeaveDelay={100}
                        mouseEnterDelay={0}
                        contentStyle={{
                            padding: "4px",
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
                            <label className="text-white" htmlFor="">اجرت: {complex.ojrat}</label>
                            <label className="text-white" htmlFor="">فی: {complex.fi}</label>
                            <label className="text-white" htmlFor="">درصد سود: %{complex.profit}</label>
                        </div>
                    </Popup>
                    <NumberFormat className="float-right w-50"
                                  value={((complex.ojrat + complex.fi) * (1.0 + (complex.profit) / 100)).toFixed(0)}
                                  decimalSeparator={DECIMAL_SEPARATOR}
                                  thousandSeparator={THOUSAND_SEPARATOR} displayType="text"/>
                </div>

            </div>
            <div className="mt-0">
                <button className="btn btn-danger" onClick={() => deleteDealHandler(personId, id)}>حذف معامله</button>
                <button className="btn btn-primary" onClick={openModal}>ویرایش معامله
                </button>
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
                            <label className="float-left text-left" style={{marginLeft: 100, color: "black"}}>شماره صفحه
                                :</label>
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
                            <label className="float-left text-left" style={{color: "black"}}>طلا :</label>
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
                            <label className="float-left  text-left" style={{color: "black"}}>پول :</label>
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
                            <label className="float-left  text-left" style={{color: "black"}}>قیمت هر گرم :</label>
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
                                onClick={editDeal}>Submit</Button>
                    </Form>
                </div>
            </Popup>
        </div>
    );
}

export default DailyDealCard;