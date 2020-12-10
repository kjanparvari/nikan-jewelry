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

function InplaceDealCard({deal, personId, setDeals, handler}: any) {
    const {year, month, day} = deal.date;
    const {id, goldIn, goldOut, moneyIn, moneyOut, pageNumber} = deal;
    const [pageInput, setPageInput] = useState<number>(pageNumber);
    const [moneyInInput, setMoneyInInput] = useState<number>(moneyIn);
    const [moneyOutInput, setMoneyOutInput] = useState<number>(moneyOut);
    const [goldInInput, setGoldInInput] = useState<number>(goldIn);
    const [goldOutInput, setGoldOutInput] = useState<number>(goldOut);
    const [selectedDay, setSelectedDay] = useState<DayValue>(deal.date);

    const offset = useContext(offsetContext);
    const editDeal = () => {
        offset.changeGold(goldOut - goldIn);
        offset.changeMoney(moneyOut - moneyIn);
        const _pageNumber = pageInput;
        const _moneyIn = moneyInInput;
        const _moneyOut = moneyOutInput;
        const _goldIn = goldInInput;
        const _goldOut = goldOutInput;
        const key = "I:" + personId;
        if (selectedDay === null || isNaN(_pageNumber) || isNaN(_moneyIn) || isNaN(_moneyOut) || isNaN(_goldIn) || isNaN(_goldOut) ) {
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
            for (let i in p.list) {
                if (p.list[i].id === id) {
                    p.list[i].pageNumber = _pageNumber;
                    p.list[i].date = selectedDay;
                    p.list[i].moneyIn = _moneyIn;
                    p.list[i].moneyOut = _moneyOut;
                    p.list[i].goldIn = _goldIn;
                    p.list[i].goldOut = _goldOut;
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
            handler();
        }
    };
    const deleteDealHandler = (memberId: number, dealId: number) => {
        const key: string = "I:" + memberId.toString();
        const {maxId, list} = JSON.parse(localStorage.getItem(key) as string);
        const newDeals = list.filter((deal: any) => {
            return deal.id !== dealId;
        });
        setDeals(newDeals);
        localStorage.setItem(key, JSON.stringify({maxId: maxId, list: newDeals}));
        offset.changeGold(goldOut - goldIn);
        offset.changeMoney(moneyOut - moneyIn);

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
                        <Button type='submit'
                                onClick={editDeal}>Submit</Button>
                    </Form>
                </div>
            </Popup>
        </div>
    );
}

export default InplaceDealCard;