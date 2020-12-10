import React, {useContext, useEffect, useReducer, useRef, useState} from 'react';
// @ts-ignore
import {Carousel} from '3d-react-carousal';
import {brotliCompress} from "zlib";
import "../../styles/themes.css"
// @ts-ignore
import Tilt from "react-tilt/dist/tilt";
import {FaUser} from "react-icons/fa";  // Font Awesome
import {themeContext} from "../../App";
import ReactToPrint, {useReactToPrint} from 'react-to-print';
import InplaceUserInfo from "./InplaceUserInfo";
import InplaceCarousel from "./InplaceCarousel";
import InplaceDealsTable from "./InplaceDealsTable";
import InplaceDealCard from "./InplaceDealCard";


function InplaceContentPanel(props: any) {
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
            if (handlePrint) {
                handlePrint();
            }
    }, [autoHeight]);
    useEffect(() => {
        const key = "I:" + props.chosenPerson.id;
        localStorage.setItem("last", key);
        if (key === undefined || key === null || key === "I:") return;
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
            const slide = <InplaceDealCard key={deal.id} deal={deal} personId={personId}
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
            result = <InplaceCarousel slides={getSlides(deals, props.chosenPerson.id)}/>;
            break;
        case "table":
            result = <InplaceDealsTable deals={deals} personId={props.chosenPerson.id}
                                      setDeals={setDeals} printContentRef={printContentRef}
                                      autoHeight={autoHeight}/>;
            break;
    }
    return (
        <div className="float-right mr-1" style={{width: "75%"}}>
            <InplaceUserInfo view={view} setView={setView} person={props.chosenPerson} deleteMember={props.deleteMember}
                           editMember={props.editMember}  setDeals={setDeals}
                           setAutoHeight={setAutoHeight}/>
            <div className={`container theme-${theme} float-right rounded mr-3`} style={{width: "90%"}}>
                <br/>
                {deals && deals.length === 0 ? <div/> : result}
            </div>
        </div>
    );
}

//@ts-ignore
export default InplaceContentPanel;