import React from 'react';
import SideBar from "./SideBar";
import ContentPanel from "./ContentPanel";
// @ts-ignore
import Tilt from 'react-tilt/dist/tilt.js';

function DailyPanel(props: any) {
    return (
        <div className="">
            <SideBar/>
            <ContentPanel chosenPerson={{name:"کامیار جان پروری", id: "9484868", phone: "09387172482", oMoney: 248, oGold: 548}}/>
        </div>
    );
}

export default DailyPanel;