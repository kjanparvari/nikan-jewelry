import React, {useEffect, useState} from 'react';
// @ts-ignore
import {Carousel} from '3d-react-carousal';
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
    const [deals, setDeals] = useState([]);
    useEffect(() => {
        const list = localStorage.getItem("D:" + props.chosenPerson.id);
        if (list === "" || list === null) {
            setDeals(() => {
                return [];
            });
        } else {
            setDeals(() => {
                return JSON.parse(list);
            });
        }
    }, [props.chosenPerson.id]);
    const slides = deals.map((deal: any) => {
        return <DailyDealCard deal={deal}/>
    });
    return (
        <div className="float-right mr-1" style={{width: "75%"}}>
            <UserInfo person={props.chosenPerson}/>
            <div className="container theme-dark float-right rounded" style={{width: "100%"}}>
                <br/>
                <br/>
                <br/>
                {/*<DailyDealCard deal={sampleDeal}/>*/}
                <Carousel slides={slides} auxtoplay={true} interval={2000} />
            </div>
        </div>
    );
}

export default ContentPanel;