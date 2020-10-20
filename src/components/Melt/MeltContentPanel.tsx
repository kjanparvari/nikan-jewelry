import React, {useContext, useEffect, useReducer, useState} from 'react';
// @ts-ignore
import {Carousel} from '3d-react-carousal';
import {brotliCompress} from "zlib";
import "../../styles/themes.css"
// @ts-ignore
import Tilt from "react-tilt/dist/tilt";
import {FaUser} from "react-icons/fa";  // Font Awesome
import {themeContext} from "../../App";
import MeltDealCard from "./MeltDealCard";
import MeltUserInfo from "./MeltUserInfo";
import MeltCarousel from "./MeltCarousel";
import MeltDealsTable from "./MeltDealsTable";

// const changeOMoney = (amount: number, id: number) => {
//     const m = localStorage.getItem("melt-members");
//     let mems: [];
//     if (m !== null){
//         mems = JSON.parse(m).list;
//         for (let i in mems) {
//             //@ts-ignore
//             if (parseInt(mems[i].id) === id){
//                 //@ts-ignore
//                 mems[i].oMoney += amount;
//             }
//         }
//     }
// };
//
// const changeOGold = (amount: number, id: number) => {
//     const m = localStorage.getItem("melt-members");
//     let mems: [];
//     if (m !== null){
//         mems = JSON.parse(m).list;
//         for (let i in mems) {
//             //@ts-ignore
//             if (parseInt(mems[i].id) === id){
//                 //@ts-ignore
//                 mems[i].oGold += amount;
//             }
//         }
//     }
// };

const getSlides = (deals: any[], personId: number) => {
    console.log("deals:");
    console.log(deals);
    const newSlides: any[] = [];
    deals.forEach((deal: any) => {
        const slide = <MeltDealCard key={deal.id} deal={deal} personId={personId}/>;
        newSlides.push(slide);
    });
    return newSlides;
};

function MeltContentPanel(props: any) {
    const theme = useContext(themeContext);
    const [deals, setDeals] = useState([]);
    const [view, setView] = useState("table");
    useEffect(() => {
        const key = "M:" + props.chosenPerson.id;
        localStorage.setItem("last", key);
        if (key === undefined || key === null || key === "M:") return;
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
            result = <MeltCarousel slides={getSlides(deals,props.chosenPerson.id)}/>;
            break;
        case "table":
            result = <MeltDealsTable deals={deals} personId={props.chosenPerson.id}/>;
            break;
    }
    return (
        <div className="float-right mr-1" style={{width: "75%"}}>
            <MeltUserInfo view={view} setView={setView} person={props.chosenPerson}/>
            <div className={`container theme-${theme} float-right rounded mr-3`} style={{width: "100%"}}>
                <br/>
                {/*<DailyDealCard deal={sampleDeal}/>*/}
                {/*<Carousel slides={getSlides(deals)} auxtoplay={false} interval={2000}/>*/}
                {deals && deals.length === 0 ? <div/> : result}
            </div>
        </div>
    );
}

//@ts-ignore
export default MeltContentPanel;