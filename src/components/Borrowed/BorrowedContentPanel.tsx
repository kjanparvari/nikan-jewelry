import React, {useContext, useEffect, useReducer, useState} from 'react';
// @ts-ignore
import {Carousel} from '3d-react-carousal';
import {brotliCompress} from "zlib";
import "../../styles/themes.css"
// @ts-ignore
import Tilt from "react-tilt/dist/tilt";
import {FaUser} from "react-icons/fa";  // Font Awesome
// import DailyDealCard from "./DailyDealCard";
// import DailyUserInfo from "./DailyUserInfo";
// import DailyCarousel from "./DailyCarousel";
// import DailyDealsCalender from "./DailyDealsCalender";
// import DailyDealsTable from "./DailyDealsTable";
import {themeContext} from "../../App";



function BorrowedContentPanel(props: any) {
    const theme = useContext(themeContext);
    const [deals, setDeals] = useState([]);
    const [view, setView] = useState("table");
    useEffect(() => {
        const key = "B:" + props.chosenPerson.id;
        localStorage.setItem("last", key);
        if (key === undefined || key === null || key === "B:") return;
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
            // result = <DailyCarousel slides={getSlides(deals,props.chosenPerson.id)}/>;
            break;
        case "calender":
            // result = <DailyDealsCalender/>;
            break;
        case "table":
            // result = <DailyDealsTable deals={deals} personId={props.chosenPerson.id}/>;
            break;
    }
    return (
        <div className="float-right mr-1" style={{width: "75%"}}>
            {/*<DailyUserInfo view={view} setView={setView} person={props.chosenPerson}/>*/}
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
export default BorrowedContentPanel;