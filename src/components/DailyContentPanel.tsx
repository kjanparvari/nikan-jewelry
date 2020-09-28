import React, {useContext, useEffect, useReducer, useState} from 'react';
// @ts-ignore
import {Carousel} from '3d-react-carousal';
import {brotliCompress} from "zlib";
import "../styles/themes.css"
// @ts-ignore
import Tilt from "react-tilt/dist/tilt";
import {FaUser} from "react-icons/fa";  // Font Awesome
import DailyDealCard from "./DailyDealCard";
import DailyUserInfo from "./DailyUserInfo";
import DailyCarousel from "./DailyCarousel";
import DailyDealsCalender from "./DailyDealsCalender";
import DailyDealsTable from "./DailyDealsTable";
import {themeContext} from "../App";

const changeOMoney = (amount: number, id: number) => {
    const m = localStorage.getItem("daily-members");
    let mems: [];
    if (m !== null){
        mems = JSON.parse(m).list;
        for (let i in mems) {
            //@ts-ignore
            if (parseInt(mems[i].id) === id){
                //@ts-ignore
                mems[i].oMoney += amount;
            }
        }
    }
};

const changeOGold = (amount: number, id: number) => {
    const m = localStorage.getItem("daily-members");
    let mems: [];
    if (m !== null){
        mems = JSON.parse(m).list;
        for (let i in mems) {
            //@ts-ignore
            if (parseInt(mems[i].id) === id){
                //@ts-ignore
                mems[i].oGold += amount;
            }
        }
    }
};
const sampleDeal = {
    date: {
        year: 1397,
        month: 5,
        day: 23
    },
    goldIn: 25,
    goldOut: 14,
    moneyIn: 2300980,
    moneyOut: 1240900,
    complex: 1000200,
    pageNumber: 45
};
const getSlides = (deals: any[]) => {
    console.log("deals:");
    console.log(deals);
    const newSlides: any[] = [];
    deals.forEach((deal: any) => {
        const slide = <DailyDealCard key={deal.id} deal={deal}/>;
        newSlides.push(slide);
    });
    return newSlides;
};

function DailyContentPanel(props: any) {
    const theme = useContext(themeContext);
    const sampleCard = <DailyDealCard deal={sampleDeal}/>;
    const [deals, setDeals] = useState([]);
    const [view, setView] = useState("table");
    useEffect(() => {
        const key = "D:" + props.chosenPerson.id;
        localStorage.setItem("last", key);
        if (key === undefined || key === null || key === "D:") return;
        const p = localStorage.getItem(key);
        console.log("p:");
        console.log(p);
        if (p === "" || p === null || p === undefined)
            setDeals(() => []);
        else
            setDeals(() => JSON.parse(p).list);
    }, [props.chosenPerson.id]);
    let result: any;
    switch (view) {
        case "card":
            result = <DailyCarousel slides={getSlides(deals)}/>;
            break;
        case "calender":
            result = <DailyDealsCalender/>;
            break;
        case "table":
            result = <DailyDealsTable deals={deals}/>;
            break;
    }
    return (
        <div className="float-right mr-1" style={{width: "75%"}}>
            <DailyUserInfo view={view} setView={setView} person={props.chosenPerson}/>
            <div className={`container theme-${theme} float-right rounded mr-3`} style={{width: "80%"}}>
                <br/>
                {/*<DailyDealCard deal={sampleDeal}/>*/}
                {/*<Carousel slides={getSlides(deals)} auxtoplay={false} interval={2000}/>*/}
                {deals && deals.length === 0 ? <div/> : result}
            </div>
        </div>
    );
}

//@ts-ignore
export default DailyContentPanel;