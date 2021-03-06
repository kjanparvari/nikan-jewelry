import React, {useContext, useEffect, useReducer, useRef, useState} from 'react';
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
import {useReactToPrint} from "react-to-print";
import DailyDealsTable from "../Daily/DailyDealsTable";
import DailyUserInfo from "../Daily/DailyUserInfo";


function MeltContentPanel(props: any) {
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
        if (autoHeight)
            if (handlePrint)
                handlePrint()
    }, [autoHeight]);
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
    }, [props.chosenPerson]);

    const getSlides = (deals: any[], personId: number) => {
        console.log("deals:");
        console.log(deals);
        const newSlides: any[] = [];
        deals.forEach((deal: any) => {
            const slide = <MeltDealCard key={deal.id} deal={deal} personId={personId} editOwings={props.editOwings}
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
            result = <MeltCarousel slides={getSlides(deals, props.chosenPerson.id)}/>;
            break;
        case "table":
            result = <MeltDealsTable deals={deals} personId={props.chosenPerson.id} setDeals={setDeals}
                                     editOwings={props.editOwings} printContentRef={printContentRef}
                                     autoHeight={autoHeight}/>;
            break;
    }
    return (
        <div className="float-right mr-1" style={{width: "75%"}}>
            <MeltUserInfo view={view} setView={setView} person={props.chosenPerson} deleteMember={props.deleteMember}
                          editMember={props.editMember} setDeals={setDeals} editOwings={props.editOwings}
                          setAutoHeight={setAutoHeight}/>
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