import React from 'react';
import {BsFillInfoCircleFill} from "react-icons/bs";
import Popup from "reactjs-popup";

function DailyDealCard(props: any) {
    const {year, month, day} = props.deal.date;
    const {goldIn, goldOut, moneyIn, moneyOut, pageNumber, complex} = props.deal;
    return (
        <div className="bg-light mt-0 justify-content-center"
             style={{borderRadius: 15, width: 300, height: 380, marginLeft: "auto", marginRight: "auto"}}>
            <div className="badge-danger pt-1 pb-1" style={{
                marginRight: "auto",
                marginLeft: "auto",
                borderTopLeftRadius: 15,
                borderTopRightRadius: 15
            }}>{year}/{month}/{day}</div>
            <div className="mt-3">
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
                        trigger={<div className="float-right text-right w-50" >:قیمت مرکب طلا</div>}
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
                    <div className="float-right w-50">{((complex.ojrat + complex.fi) * (1.0 + (complex.profit) / 100)).toFixed(3)}</div>
                </div>

            </div>
            <div className="mt-0">
                <button className="btn btn-danger">حذف معامله</button>
                <button className="btn btn-primary">ویرایش معامله</button>
            </div>
        </div>
    );
}

export default DailyDealCard;