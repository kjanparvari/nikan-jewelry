import React, {useEffect, useState} from 'react';
import DatePicker, {Calendar} from 'react-modern-calendar-datepicker';
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import Popup from "reactjs-popup";
import '../../styles/calendar.css';

function DailyDealsCalender({deals}: any) {
    const preselectedDays = [
        {
            year: 1399,
            month: 6,
            day: 2
        },
        {
            year: 1399,
            month: 6,
            day: 15
        },
        {
            year: 1399,
            month: 6,
            day: 30
        },
    ];
    const styledPresets = preselectedDays.map((day: any) => {
        return {...day, className: 'navyBlueDay'};
    });

    const checkDay = (day: any) => {
        // alert(JSON.stringify(day));
        if (preselectedDays.includes(day)) {
            // alert(JSON.stringify(day));
            // openModal();
        }
    };
    const [selectedDay, setSelectedDay] = useState(null);
    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);
    const openModal = () => setOpen(true);
    return (
        <div className="w-100 ">
            <div className=" w-50 pl-5" style={{margin: "auto"}}>
                <Calendar
                    value={selectedDay}
                    onChange={(day: any) => {
                        setSelectedDay(day);
                        checkDay(day);
                    }}
                    locale="fa"
                    shouldHighlightWeekends
                    customDaysClassName={styledPresets}
                />
            </div>
            <Popup
                open={open}
                // closeOnDocumentClick={false}
                onClose={closeModal}
                className=""
            >
                <div className="container">
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                </div>
            </Popup>
        </div>
    );
}

export default DailyDealsCalender;