import React, {useRef, useState} from 'react';
import {BsFillInfoCircleFill} from "react-icons/bs";
import Popup from "reactjs-popup";
import {GrAdd, GrClose} from "react-icons/gr";
import {Button, Form} from "semantic-ui-react";
import DatePicker, {DayValue} from "react-modern-calendar-datepicker";
import {FaEquals} from "react-icons/fa";

const deleteDealHandler = (memberId: number, dealId: number) => {
    const key: string = "D:" + memberId.toString();
    const {maxId, list} = JSON.parse(localStorage.getItem(key) as string);
    const newDeals = list.filter((deal: any) => {
        return deal.id !== dealId;
    });
    localStorage.setItem(key, JSON.stringify({maxId: maxId, list: newDeals}));
    window.location.reload(false);
};

function DailyDealCard({deal, personId}: any) {
    const {year, month, day} = deal.date;
    const {id, goldIn, goldOut, moneyIn, moneyOut, pageNumber, complex} = deal;
    const pageRef = useRef(null);
    const moneyInRef = useRef(null);
    const moneyOutRef = useRef(null);
    const goldInRef = useRef(null);
    const goldOutRef = useRef(null);
    const ojratRef = useRef(null);
    const fiRef = useRef(null);
    const profitRef = useRef(null);
    const complexRef = useRef(null);
    const [selectedDay, setSelectedDay] = useState<DayValue>(deal.date);
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
    const editDeal = () => {
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
        const key = "D:" + personId;
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
            // const maxId = (parseInt(p.maxId) + 1).toString();
            // const val = {
            //     id: maxId,
            //     date: selectedDay,
            //     pageNumber: pageNumber,
            //     moneyIn: moneyIn,
            //     moneyOut: moneyOut,
            //     goldIn: goldIn,
            //     goldOut: goldOut,
            //     complex: {
            //         ojrat: ojrat,
            //         fi: fi,
            //         profit: profit
            //     }
            // };
            // p.maxId = maxId;
            // p.list.push(val);
            for (let i in p.list) {
                if (p.list[i].id === id) {
                    p.list[i].pageNumber = pageNumber;
                    p.list[i].date = selectedDay;
                    p.list[i].moneyIn = moneyIn;
                    p.list[i].moneyOut = moneyOut;
                    p.list[i].goldIn = goldIn;
                    p.list[i].goldOut = goldOut;
                    p.list[i].complex = {
                        ojrat: ojrat,
                        fi: fi,
                        profit: profit
                    };
                    break;
                }
            }
            p = JSON.stringify(p);
            console.log(p);
            localStorage.setItem(key, p);
            // offset.changeGold(goldIn - goldOut);
            // offset.changeMoney(moneyIn - moneyOut);
            closeModal();
            window.location.reload(false);
            // console.log(JSON.stringify(val));
            // localStorage.setItem(key, JSON.stringify(val));
        }
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
                    <div className="float-right text-right  w-50 " style={{}}>:ورود پول</div>
                    <div className="float-left w-50">{moneyIn}</div>
                </div>
                <div className="w-100 p-3 pb-4">
                    <div className="float-right text-right w-50">:خروج پول</div>
                    <div className="float-left w-50">{moneyOut}</div>
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
                    <div
                        className="float-right w-50">{((complex.ojrat + complex.fi) * (1.0 + (complex.profit) / 100)).toFixed(3)}</div>
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
                                   placeholder="شماره صفحه" ref={pageRef} defaultValue={pageNumber}/>
                        </Form.Group>
                        <Form.Group>
                            <label className="float-left  text-left">طلا :</label>
                            <input type="number" min={0} className="ml-3 mr-3 text-center" style={{width: "40%"}}
                                   placeholder="ورود" ref={goldInRef} defaultValue={goldIn}/>
                            <input type="number" min={0} className=" text-center" style={{width: "40%"}}
                                   placeholder='خروج' ref={goldOutRef} defaultValue={goldOut}/>
                        </Form.Group>
                        <Form.Group>
                            <label className="float-left  text-left">پول :</label>
                            <input type="number" min={0} className="ml-3 mr-3 text-center" style={{width: "40%"}}
                                   placeholder="ورود" ref={moneyInRef} defaultValue={moneyIn}/>
                            <input type="number" min={0} className=" text-center" style={{width: "40%"}}
                                   placeholder='خروج' ref={moneyOutRef} defaultValue={moneyOut}/>
                        </Form.Group>
                        <Form.Group>
                            <label className="float-left  text-left">قیمت هر گرم :</label>
                            <input type="number" min={0} className="ml-3 mr-1 text-center" style={{width: "18%"}}
                                   placeholder="اجرت" onChange={updateComplexLabel} ref={ojratRef}
                                   defaultValue={complex.ojrat}/><GrAdd
                            style={{marginTop: 10}}/>
                            <input type="number" min={0} className="ml-1 mr-1 text-center" style={{width: "18%"}}
                                   placeholder='فی تابلو' onChange={updateComplexLabel} ref={fiRef}
                                   defaultValue={complex.fi}/><GrAdd
                            style={{marginTop: 10}}/>
                            <input type="number" max={100} min={0} className="ml-1 mr-1 text-center"
                                   style={{width: "15%"}} onChange={updateComplexLabel} placeholder='درصد سود'
                                   ref={profitRef} defaultValue={complex.profit}/><FaEquals
                            style={{marginTop: 10}}/>
                            <input className="ml-1 mr-1 text-center" style={{width: "17%"}}
                                   readOnly={true}
                                   ref={complexRef}
                                   defaultValue={(complex.ojrat + complex.fi) * (1.0 + complex.profit / 100)}/>
                        </Form.Group>
                        <Button type='submit'
                            // onClick={() => console.log(localStorage.getItem("D:" + props.person.id))}>Submit</Button>
                                onClick={editDeal}>Submit</Button>
                    </Form>
                </div>
            </Popup>
        </div>
    );
}

export default DailyDealCard;