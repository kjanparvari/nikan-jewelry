import React from 'react';

function DailyDealCard(props: any) {
    const {year, month, day} = props.deal.date;
    const {goldIn, goldOut, moneyIn, moneyOut, pageNumber, complex} = props.deal;
    return (
        <div className="bg-light mt-0 justify-content-center"
             style={{borderRadius: 15, width: 300, height: 350, marginLeft: "auto", marginRight: "auto"}}>
                <div className="badge-danger pt-1 pb-1" style={{
                    marginRight: "auto",
                    marginLeft: "auto",
                    borderTopLeftRadius: 15,
                    borderTopRightRadius: 15
                }}>{year}/{month}/{day}</div>
            <div className="">
                <div className="badge-info float-left" style={{height: "5vh"}}>پول</div>
                <div>
                    <div className="float-left bg-dark text-white w-50" style={{}}>ورود</div>
                    <div className="float-left bg-dark text-white w-50" style={{}}>خروج</div>
                </div>
            </div>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
        </div>
    );
}

export default DailyDealCard;