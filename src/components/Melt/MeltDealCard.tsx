import React, {useContext, useEffect, useRef, useState} from 'react';
import {BsFillInfoCircleFill} from "react-icons/bs";
import Popup from "reactjs-popup";
import {GrAdd, GrClose} from "react-icons/gr";
import {Button, Form} from "semantic-ui-react";
import DatePicker, {DayValue} from "react-modern-calendar-datepicker";
import {FaEquals} from "react-icons/fa";
import {offsetContext} from "../../App";
import {Toggle} from "rsuite";
import NumberFormat from "react-number-format";
import {DECIMAL_SEPARATOR, THOUSAND_SEPARATOR} from "../../App";

let
    persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g],
    arabicNumbers = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g],
    fixNumbers = function (str: string) {
        for (let i = 0; i < 10; i++) {
            str = str.replace(persianNumbers[i], i.toString()).replace(arabicNumbers[i], i.toString());
        }
        return str;
    };

function BorrowedDealCard({deal, personId, setDeals, handler, editOwings}: any) {
    const offset = useContext(offsetContext);
    const {year, month, day} = deal.date;
    const {year: syear, month: smonth, day: sday} = deal.soldDate;
    const {id, goldIn, goldOut, moneyIn, moneyOut, complex, pageNumber, buyerName, leftGold, leftMoney, curOGold, curOMoney} = deal;
    const [pageInput, setPageInput] = useState<number>(pageNumber);
    const [moneyInInput, setMoneyInInput] = useState<number>(moneyIn);
    const [moneyOutInput, setMoneyOutInput] = useState<number>(moneyOut);
    const [goldInInput, setGoldInInput] = useState<number>(goldIn);
    const [goldOutInput, setGoldOutInput] = useState<number>(goldOut);
    const [complexInput, setComplexInput] = useState<number>(complex);
    const buyerNameRef = useRef(null);
    const [selectedDay, setSelectedDay] = useState<DayValue>(deal.date);
    const [soldDay, setSoldDay] = useState<DayValue>(deal.soldDate);
    const [toggle, setToggle] = useState(deal.toggle);
    const updateOwings = (id: number) => {
        let om = 0, og = 0;
        const d = localStorage.getItem("M:" + id.toString());
        if (d === null || d === undefined || d === "")
            return;
        const deals: any[] = JSON.parse(d).list;
        for (let i in deals) {
            om += deals[i].leftMoney;
            og += deals[i].leftGold;
        }
        console.log("og");
        console.log(og);
        const m = localStorage.getItem("melt-members");
        if (m !== null && m !== undefined && m !== "") {
            let mems = JSON.parse(m);
            for (let j in mems.list) {
                if (mems.list[j].id === id) {
                    mems.list[j].oGold = og;
                    mems.list[j].oMoney = om;
                    break;
                }
            }
            localStorage.setItem("melt-members", JSON.stringify(mems));
            editOwings(og, om);
        }
    };
    const editDeal = () => {
        offset.changeGold(goldOut - goldIn);
        offset.changeMoney(moneyOut - moneyIn);
        const _pageNumber = pageInput;
        const _goldIn = goldInInput;
        const _goldOut = goldOutInput;
        const _moneyIn = moneyInInput;
        const _moneyOut = moneyOutInput;
        const _complex = complexInput;
        // @ts-ignore
        const _buyerName = buyerNameRef.current.value;
        const _s: any = soldDay === null ? {year: 0, month: 0, day: 0} : soldDay;
        const key = "M:" + personId;
        if (selectedDay === null || soldDay === null || isNaN(pageNumber) || isNaN(moneyOut) || isNaN(moneyIn) || isNaN(goldIn) || isNaN(goldOut) || isNaN(complex) || buyerName === "") {
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
            const _m = localStorage.getItem("melt-members");
            let _ogold, _omoney;
            if (_m !== null && _m !== undefined && _m !== "") {
                let _mems = JSON.parse(_m);
                for (let j in _mems.list) {
                    if (_mems.list[j].id === personId) {
                        _ogold = _mems.list[j].oGold;
                        _omoney = _mems.list[j].oMoney;
                        break;
                    }
                }
            }
            const _leftMoney = toggle ? (_moneyOut) - ((_goldIn - _goldOut) * _complex) : (_moneyOut) - ((_goldIn) * _complex);
            const _leftGold = toggle ? (_moneyOut) / (_complex) - (_goldIn - _goldOut) : (_moneyOut) / (_complex) - (_goldIn);
            for (let i in p.list) {
                if (p.list[i].id === id) {
                    p.list[i].pageNumber = _pageNumber;
                    p.list[i].date = selectedDay;
                    p.list[i].soldDate = _s;
                    p.list[i].moneyIn = _moneyIn;
                    p.list[i].moneyOut = _moneyOut;
                    p.list[i].buyerName = _buyerName;
                    p.list[i].toggle = toggle;
                    p.list[i].goldIn = _goldIn;
                    p.list[i].goldOut = _goldOut;
                    p.list[i].complex = _complex;
                    p.list[i].leftGold = _leftGold;
                    p.list[i].leftMoney = _leftMoney;
                    p.list[i].curOGold = curOGold - leftGold + _leftGold;
                    p.list[i].curOMoney = curOGold - leftMoney + _leftMoney;
                    break;
                }
            }
            setDeals(p.list);
            p = JSON.stringify(p);
            console.log(p);
            localStorage.setItem(key, p);
            closeModal();
            offset.changeGold(_goldIn - _goldOut);
            offset.changeMoney(_moneyIn - _moneyOut);
            updateOwings(personId);
            handler();
        }
    };
    const deleteDealHandler = (memberId: number, dealId: number) => {
        const key: string = "M:" + memberId.toString();
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
    useEffect(() => {
        if (toggle) {
            const today = new Date().toLocaleDateString("fa");
            const _a = today.split("/");
            setSoldDay({
                year: parseInt(fixNumbers(_a[0])),
                month: parseInt(fixNumbers(_a[1])),
                day: parseInt(fixNumbers(_a[2]))
            });
        } else {
            setSoldDay(prevState => prevState);
        }
    }, [toggle]);
    return (
        <div className="bg-light mt-0 justify-content-center"
             style={{borderRadius: 15, width: 300, height: 400, marginLeft: "auto", marginRight: "auto"}}>
            <div className="badge-danger pt-1 pb-1" style={{
                marginRight: "auto",
                marginLeft: "auto",
                borderTopLeftRadius: 15,
                borderTopRightRadius: 15
            }}>{year}/{month}/{day}</div>
            <div className="mt-3" style={{color: "black"}}>
                شماره صفحه : {<NumberFormat value={pageNumber} thousandSeparator={THOUSAND_SEPARATOR}
                                            decimalSeparator={DECIMAL_SEPARATOR} displayType="text"/>}
            </div>
            <div className=" m-4 badge-light" style={{height: 255, borderRadius: 10}}>
                <div className="w-100 p-3 pb-4">
                    <div className="float-right text-right  w-50 " style={{}}>:فروخته شده به</div>
                    <div className="float-left w-50">{buyerName}</div>
                </div>
                <div className="w-100 p-3 pb-4">
                    <div className="float-right text-right w-50">: در تاریخ</div>
                    <div className="float-left w-50">{syear}/{smonth}/{sday}</div>
                </div>
                <div className="w-100 p-3 pb-4">
                    <div className="float-right text-right w-50">:ورود طلا</div>
                    <div className="float-left w-50">{<NumberFormat value={goldIn}
                                                                    thousandSeparator={THOUSAND_SEPARATOR}
                                                                    decimalSeparator={DECIMAL_SEPARATOR}
                                                                    displayType="text"/>}</div>
                </div>
                <div className="w-100 p-3 pb-4">
                    <div className="float-right text-right w-50">:خروج طلا</div>
                    <div className="float-left w-50">{<NumberFormat value={goldOut}
                                                                    thousandSeparator={THOUSAND_SEPARATOR}
                                                                    decimalSeparator={DECIMAL_SEPARATOR}
                                                                    displayType="text"/>}</div>
                </div>
                <div className="w-100 p-3 pb-4">
                    <div className="float-right text-right w-50">:ورود پول</div>
                    <div className="float-left w-50">{<NumberFormat value={moneyIn}
                                                                    thousandSeparator={THOUSAND_SEPARATOR}
                                                                    decimalSeparator={DECIMAL_SEPARATOR}
                                                                    displayType="text"/>}</div>
                </div>
                <div className="w-100 p-3 pb-4">
                    <div className="float-right text-right w-50">:خروج پول</div>
                    <div className="float-left w-50">{<NumberFormat value={moneyOut}
                                                                    thousandSeparator={THOUSAND_SEPARATOR}
                                                                    decimalSeparator={DECIMAL_SEPARATOR}
                                                                    displayType="text"/>}</div>
                </div>
                <div className="w-100 p-3 pb-4">
                    <div className="float-right text-right w-50">:قیمت هر گرم</div>
                    <div className="float-left w-50">{<NumberFormat value={complex}
                                                                    thousandSeparator={THOUSAND_SEPARATOR}
                                                                    decimalSeparator={DECIMAL_SEPARATOR}
                                                                    displayType="text"/>}</div>
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
                            <label className="float-left text-center" style={{width: "10%", color: "black"}}>تاریخ
                                :</label>
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
                                          }}/>
                        </Form.Group>
                        <Form.Group>
                            <label className="float-left  text-left" style={{color: "black"}}>طلا :</label>
                            <NumberFormat min={0} className="ml-3 mr-3 text-center" style={{width: "40%"}}
                                          placeholder="ورود" step="0.001" decimalSeparator={DECIMAL_SEPARATOR}
                                          thousandSeparator={THOUSAND_SEPARATOR}
                                          value={goldInInput === -1 ? "" : goldInInput}
                                          onValueChange={({floatValue, formattedValue, value}) => {
                                              setGoldInInput(() => floatValue === undefined ? 0 : floatValue);
                                          }}/>
                            <NumberFormat min={0} className=" text-center" style={{width: "40%"}}
                                          placeholder='خروج' step="0.001" decimalSeparator={DECIMAL_SEPARATOR}
                                          thousandSeparator={THOUSAND_SEPARATOR}
                                          value={goldOutInput === -1 ? "" : goldOutInput}
                                          onValueChange={({floatValue, formattedValue, value}) => {
                                              setGoldOutInput(() => floatValue === undefined ? 0 : floatValue);
                                          }}/>
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
                            <NumberFormat min={0} className="ml-3 mr-3 text-center" style={{width: "40%"}}
                                          placeholder="قیمت هرگرم" decimalSeparator={DECIMAL_SEPARATOR}
                                          thousandSeparator={THOUSAND_SEPARATOR}
                                          value={complexInput === -1 ? "" : complexInput}
                                          onValueChange={({floatValue, formattedValue, value}) => {
                                              setComplexInput(() => floatValue === undefined ? 0 : floatValue);
                                          }}/>
                            <label className="float-left  text-left" style={{color: "black"}}>خروج طلا مرجوع به همکار
                                :</label>
                            <div className="float-right ml-4"><Toggle size="md"
                                                                      onChange={() => setToggle(() => !toggle)}
                                                                      defaultChecked={toggle}/></div>
                        </Form.Group>
                        <Form.Group>
                            <label className="float-left  text-left" style={{color: "black"}}>فروخته شده به :</label>
                            <input type="text" min={0} className="ml-3 mr-3 text-center" style={{width: "40%"}}
                                   placeholder="فروخته شده به" ref={buyerNameRef} disabled={toggle}
                                   defaultValue={buyerName}/>
                            <DatePicker
                                value={soldDay}
                                onChange={setSoldDay}
                                inputPlaceholder="در تاریخ"
                                shouldHighlightWeekends
                                locale={"fa"}
                            />
                        </Form.Group>
                        <br/>
                        <Button type='submit'
                            // onClick={() => console.log(localStorage.getItem("D:" + props.person.id))}>Submit</Button>
                                onClick={editDeal}>Submit</Button>
                    </Form>
                </div>
            </Popup>
        </div>
    );
}

export default BorrowedDealCard;