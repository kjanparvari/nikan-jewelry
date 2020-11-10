import React, {useContext, useRef, useState} from 'react';
import {BsFillInfoCircleFill} from "react-icons/bs";
import Popup from "reactjs-popup";
import {GrAdd, GrClose} from "react-icons/gr";
import {Button, Form} from "semantic-ui-react";
import DatePicker, {DayValue} from "react-modern-calendar-datepicker";
import {FaEquals} from "react-icons/fa";
import {offsetContext} from "../../App";

function BorrowedDealCard({deal, personId, setDeals, handler, editOwings}: any) {
    const {year, month, day} = deal.date;
    const {year: syear, month: smonth, day: sday} = deal.soldDate;
    const {id, goldIn, goldOut, pageNumber, buyerName, ojrat, leftGold, curOGold, ojratProfit} = deal;
    const pageRef = useRef(null);
    const goldInRef = useRef(null);
    const goldOutRef = useRef(null);
    const ojratRef = useRef(null);
    const ojratProfitRef = useRef(null);
    const buyerNameRef = useRef(null);
    const [selectedDay, setSelectedDay] = useState<DayValue>(deal.date);
    const [soldDay, setSoldDay] = useState<DayValue>(deal.soldDate);

    const offset = useContext(offsetContext);

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
            editOwings(og);
        }
    };
    const editDeal = () => {
        offset.changeGold(-1 * leftGold);
        offset.changeMoney(ojrat);
        // @ts-ignore
        const _pageNumber = parseInt(pageRef.current.value);
        // @ts-ignore
        const _goldIn = parseFloat(goldInRef.current.value);
        // @ts-ignore
        const _goldOut = parseFloat(goldOutRef.current.value);
        // @ts-ignore
        const _ojrat = parseFloat(ojratRef.current.value);
        // @ts-ignore
        const _ojratProfit = parseFloat(ojratProfitRef.current.value);
        // @ts-ignore
        const _buyerName = buyerNameRef.current.value;
        if (soldDay === null) {
            setSoldDay({year: 0, day: 0, month: 0});
        }
        const key = "B:" + personId;
        if (selectedDay === null || soldDay === null || isNaN(pageNumber) || isNaN(goldIn) || isNaN(goldOut) || isNaN(ojrat) || isNaN(_ojratProfit) || buyerName === "") {
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
                    if (_mems.list[j].id === personId) {
                        _ogold = _mems.list[j].oGold;
                        break;
                    }
                }
            }
            const _left_gold = (_goldIn * (1.0 + _ojratProfit / 100)) - _goldOut;
            for (let i in p.list) {
                if (p.list[i].id === id) {
                    p.list[i].pageNumber = _pageNumber;
                    p.list[i].date = selectedDay;
                    p.list[i].soldDate = soldDay;
                    p.list[i].ojrat = _ojrat;
                    p.list[i].ojratProfit = _ojratProfit;
                    p.list[i].buyerName = _buyerName;
                    p.list[i].goldIn = _goldIn;
                    p.list[i].goldOut = _goldOut;
                    p.list[i].leftGold = _left_gold;
                    p.list[i].curOGold = _ogold - leftGold + _left_gold;
                    break;
                }
            }
            setDeals(p.list);
            p = JSON.stringify(p);
            console.log(p);
            localStorage.setItem(key, p);
            offset.changeGold(_left_gold);
            offset.changeMoney(-1 * _ojrat);
            closeModal();
            updateOwings(personId);
            handler();
        }
    };
    const deleteDealHandler = (memberId: number, dealId: number) => {
        const key: string = "B:" + memberId.toString();
        const {maxId, list} = JSON.parse(localStorage.getItem(key) as string);
        const newDeals = list.filter((deal: any) => {
            return deal.id !== dealId;
        });
        offset.changeGold(-1 * leftGold);
        offset.changeMoney(ojrat);
        setDeals(newDeals);
        localStorage.setItem(key, JSON.stringify({maxId: maxId, list: newDeals}));
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
                شماره صفحه : {pageNumber}
            </div>
            <div className=" m-4 badge-light" style={{height: 220, borderRadius: 10}}>
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
                    <div className="float-left w-50">{goldIn}</div>
                </div>
                <div className="w-100 p-3 pb-4">
                    <div className="float-right text-right w-50">:خروج طلا</div>
                    <div className="float-left w-50">{goldOut}</div>
                </div>
                <div className="w-100 p-3 pb-4">
                    <div className="float-right text-right w-50">: اجرت</div>
                    <div className="float-left w-50">{ojrat}</div>
                </div>
                <div className="w-100 p-3 pb-4">
                    <div className="float-right text-right w-50">: درصد اجرت طلا</div>
                    <div className="float-left w-50">{ojratProfit}</div>
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
                            <input type="number" min={0} className=" text-center ml-3" style={{width: "150px"}}
                                   placeholder="شماره صفحه" ref={pageRef} defaultValue={pageNumber}/>
                        </Form.Group>
                        <Form.Group>
                            <label className="float-left  text-left" style={{color: "black"}}>طلا :</label>
                            <input type="number" min={0} className="ml-3 mr-3 text-center" style={{width: "40%"}}
                                   placeholder="ورود" step="0.001" ref={goldInRef} defaultValue={goldIn}/>
                            <input type="number" min={0} className=" text-center" style={{width: "40%"}}
                                   placeholder='خروج' step="0.001" ref={goldOutRef} defaultValue={goldOut}/>
                        </Form.Group>
                        <Form.Group>
                            <label className="float-left  text-left" style={{color: "black"}}>فروخته شده به :</label>
                            <input type="text" min={0} className="ml-3 mr-3 text-center" style={{width: "40%"}}
                                   placeholder="فروخته شده به" ref={buyerNameRef} defaultValue={buyerName}/>
                            <DatePicker
                                value={soldDay}
                                onChange={setSoldDay}
                                inputPlaceholder="در تاریخ"
                                shouldHighlightWeekends
                                locale={"fa"}
                            />
                        </Form.Group>
                        <Form.Group className="m-auto">
                            <label className="float-left text-left" style={{color: "black"}}>اجرت :</label>
                            <input type="number" min={0} className="ml-3 mr-3 text-center" style={{width: "40%"}}
                                   placeholder="اجرت" ref={ojratRef} defaultValue={ojrat}/>
                            <input type="number" step="0.01" min={0} max={100} className="ml-3 mr-3 text-center"
                                   style={{width: "40%"}}
                                   placeholder="درصد طلا" ref={ojratProfitRef} defaultValue={ojratProfit}/>
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