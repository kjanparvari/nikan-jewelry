import React from 'react';

function DailyDealCard(props: any) {
    const {year, month, day} = props.deal.date;
    const {goldIn, goldOut, moneyIn, moneyOut, pageNumber, complex} = props.deal;
    return (
        <div className="bg-light mt-0 justify-content-center"
             style={{borderRadius: 15, width: 300, height: 350, marginLeft: "auto", marginRight: "auto"}}>
            <div className="mt-2 badge-danger" style={{
                marginRight: "auto",
                marginLeft: "auto",
                borderTopLeftRadius: 15,
                borderTopRightRadius: 15
            }}>{year}/{month}/{day}</div>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
        </div>
    );
}

export default DailyDealCard;