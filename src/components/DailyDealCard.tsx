import React from 'react';

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
                شماره صفحه : {32}
            </div>
            <div className=" m-4 badge-light" style={{height: 220, borderRadius: 10}}>
                {/*<div className=" float-right  text-center mr-2" style={{height: 40, width: "10%", marginTop: "3%"}}>پول</div>*/}
                {/*<div className=" float-right mr-3" style={{height: 50}}>*/}
                {/*    <div className=" text-white mt-0" style={{height: 20, width: "20%"}}> :ورود</div>*/}
                {/*    <div className=" text-white " style={{height: 20, width: "20%", marginTop: "20%"}}> :خروج</div>*/}
                {/*</div>*/}
                <div className="text-right pr-3 w-100 pt-3" style={{}}>:ورود پول</div>
                <div className="text-right pr-3 mt-4 w-100">:خروج پول</div>
                <div className="text-right pr-3 mt-4 w-100">:ورود طلا</div>
                <div className="text-right pr-3 mt-4 w-100">:خروج طلا</div>
                <div className="text-right pr-3 mt-4 w-100">:قیمت مرکب طلا</div>
            </div>
            <div className="mt-0">
                <button className="btn btn-danger">حذف معامله</button>
                <button className="btn btn-primary">ویرایش معامله</button>
            </div>
        </div>
    );
}

export default DailyDealCard;