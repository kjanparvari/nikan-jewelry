import React from 'react';
// @ts-ignore
import {Carousel} from '3d-react-carousal';
import img1 from "../img/tmp/1.jpg";
import img2 from "../img/tmp/2.jpg";
import img3 from "../img/tmp/3.jpg";
import img4 from "../img/tmp/4.jpg";
import img5 from "../img/tmp/5.jpg";
import img6 from "../img/tmp/6.jpg";
import img7 from "../img/tmp/7.jpg";
import {brotliCompress} from "zlib";
import "../styles/themes.css"
// @ts-ignore
import Tilt from "react-tilt/dist/tilt";
import {FaUser} from "react-icons/fa";  // Font Awesome
import DailyDealCard from "./DailyDealCard";
import UserInfo from "./UserInfo";

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

function ContentPanel(props: any) {
    let slides: any = [
        <img src={img1} alt="1"/>,
        <img src={img2} alt="2"/>,
        <img src={img3} alt="3"/>,
        <img src={img4} alt="4"/>,
        <img src={img5} alt="5"/>,
        <img src={img6} alt="6"/>,
        <img src={img7} alt="7"/>
    ];
    const {id, phone, name, oMoney, oGold} = props.chosenPerson;
    return (
        <div className="float-right mr-1" style={{width: "75%"}}>
            <UserInfo id={id} phone={phone} name={name} oMoney={oMoney} oGold={oGold}/>
            <div className="container theme-dark float-right rounded" style={{width: "100%"}}>
                <br/>
                <br/>
                <br/>
                <DailyDealCard deal={sampleDeal}/>
                {/*<Carousel slides={slides} autoplay={false} interval={1000}/>*/}
            </div>
        </div>
    );
}

export default ContentPanel;