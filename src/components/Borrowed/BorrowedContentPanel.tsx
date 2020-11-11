import React, {useContext, useEffect, useReducer, useRef, useState} from 'react';
// @ts-ignore
import {Carousel} from '3d-react-carousal';
import {brotliCompress} from "zlib";
import "../../styles/themes.css"
// @ts-ignore
import Tilt from "react-tilt/dist/tilt";

import BorrowedDealsTable from "./BorrowedDealsTable";
import {themeContext} from "../../App";
import BorrowedUserInfo from "./BorrowedUserInfo";
import BorrowedCarousel from "./BorrowedCarousel";
import DailyDealCard from "../Daily/DailyDealCard";
import BorrowedDealCard from "./BorrowedDealCard";
import MeltUserInfo from "../Melt/MeltUserInfo";
import {useReactToPrint} from "react-to-print";
import DailyDealsTable from "../Daily/DailyDealsTable";
import DailyUserInfo from "../Daily/DailyUserInfo";


function BorrowedContentPanel(props: any) {
    const {theme} = useContext(themeContext);
    const [deals, setDeals] = useState([]);
    const [view, setView] = useState("table");
    const [autoHeight, setAutoHeight] = useState(false);
    const printContentRef = useRef(null);
    const handlePrint = useReactToPrint({
        content: () => printContentRef.current,
        onAfterPrint: () => setAutoHeight(false)
    });
    useEffect(() => {
        if (autoHeight) {
            if (handlePrint) {
                handlePrint();
            }
        }
    }, [autoHeight]);
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

    const getSlides = (deals: any[], personId: number) => {
        console.log("deals:");
        console.log(deals);
        const newSlides: any[] = [];
        deals.forEach((deal: any) => {
            const slide = <BorrowedDealCard key={deal.id} deal={deal} personId={personId} editOwings={props.editOwings}
                                            setDeals={setDeals}
                                            handler={() => {
                                            }}/>;
            newSlides.push(slide);
        });
        return newSlides;
    };

    let result: any;
    switch (view) {
        case "card":
            result = <BorrowedCarousel slides={getSlides(deals, props.chosenPerson.id)}/>;
            break;
        case "table":
            result = <BorrowedDealsTable deals={deals} personId={props.chosenPerson.id}
                                         editOwings={props.editOwings}
                                         setDeals={setDeals} printContentRef={printContentRef}
                                         autoHeight={autoHeight}/>;
            break;
    }
    return (
        <div className="float-right mr-1" style={{width: "75%"}}>
            <BorrowedUserInfo view={view} setView={setView} person={props.chosenPerson}
                              deleteMember={props.deleteMember} editOwings={props.editOwings}
                              editMember={props.editMember} setDeals={setDeals}
                              setAutoHeight={setAutoHeight}/>
            <div className={`container theme-${theme} float-right rounded mr-3`} style={{width: "90%"}}>
                <br/>
                {deals && deals.length === 0 ? <div/> : result}
            </div>
        </div>
    );
}

//@ts-ignore
export default BorrowedContentPanel;