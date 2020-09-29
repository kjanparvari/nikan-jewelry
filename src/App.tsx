import React, {createContext, useEffect, useState} from 'react';
import './App.css';
import Navbar from "./components/Navbar";
import DailyPanel from "./components/Daily/DailyPanel";
import HomePanel from "./components/HomePanel";
import SettingPanel from "./components/SettingPanel";
import MeltPanel from "./components/Melt/MeltPanel";
import LockPanel from "./components/LockPanel";
import BorrowedPanel from "./components/Borrowed/BorrowedPanel";

export const themeContext = React.createContext('dark');

const changeGoldOffset = (amount: number) => {
    const p = localStorage.getItem("home");
    if (p !== null && p !== undefined && p !== "") {
        const home = JSON.parse(p);
        home.gold.offset += amount;
        localStorage.setItem("home", JSON.stringify(home));
    }
};

const changeMoneyOffset = (amount: number) => {
    const p = localStorage.getItem("home");
    if (p !== null && p !== undefined && p !== "") {
        const home = JSON.parse(p);
        home.money.offset += amount;
        localStorage.setItem("home", JSON.stringify(home));
    }
};
const offset = {
    changeMoney: changeMoneyOffset,
    changeGold: changeGoldOffset
};

export const offsetContext = createContext(offset);

const getLastPanel = () => {
    const last = localStorage.getItem("last");
    if (last === "home")
        return <HomePanel/>;
    else if (last === "setting")
        return <SettingPanel/>;
    else if (last === "daily")
        return <DailyPanel defaultPerson={null}/>;
    else {
        // @ts-ignore
        const c = last.charAt(0);
        let id: any;
        let mems: [];
        let person;
        if (c === "D") {
            // @ts-ignore
            id = parseInt(last.split(":")[1]);
            const m = localStorage.getItem("daily-members");
            if (m !== null) {
                mems = JSON.parse(m).list;
                mems.forEach((p, i) => {
                    // @ts-ignore
                    if (parseInt(p.id) === id)
                        person = p;

                });
                return <DailyPanel defaultPerson={person}/>
            }

        } else if (c === "M") {

        } else if (c === "B") {

        } else {
            return <HomePanel/>;
        }
    }
};

const initialize = () => {
    localStorage.clear();
    const home = {
        gold: {
            base: 0,
            offset: 0
        },
        money: {
            base: 0,
            offset: 0
        }
    };
    localStorage.setItem("home", JSON.stringify(home));
    localStorage.setItem("theme", "dark");
    localStorage.setItem("daily-members", JSON.stringify({maxId: "0", list: []}));
    localStorage.setItem("melt-members", JSON.stringify({maxId: "0", list: []}));
    localStorage.setItem("owing-members", JSON.stringify({maxId: "0", list: []}));
    // localStorage.setItem("registered", "false");
    localStorage.setItem("last", "");
    localStorage.setItem("pss", "");
    localStorage.setItem("islocked", "false");
    localStorage.setItem("registerd", "false");
    localStorage.setItem("init", "true");

};

function App() {
    const init = localStorage.getItem("init");
    if (init === null || init === undefined || init === "" || init === "false") {
        initialize();
    }

    let initialTheme = localStorage.getItem('theme');
    if (initialTheme === null || initialTheme === undefined || initialTheme === "") {
        initialTheme = "dark";
        localStorage.setItem("theme", "dark");
    }
// initialTheme = "light";
    const [theme, setTheme] = useState(initialTheme);
    document.body.className = "theme-" + theme;
    const [chosenPanel, setChosenPanel] = useState(null);
    let panel: any;
    if (chosenPanel === null)
        panel = getLastPanel();
    else if (chosenPanel === 'daily')
        panel = <DailyPanel defaultPerson={null}/>;
    else if (chosenPanel === 'home')
        panel = <HomePanel/>;
    else if (chosenPanel === 'melt')
        panel = <MeltPanel defaultPerson={null}/>;
    else if (chosenPanel === 'borrowed')
        panel = <BorrowedPanel defaultPerson={null}/>;
    else if (chosenPanel === "setting")
        panel = <SettingPanel/>;
    else {
        panel = <div/>
    }
    let l = localStorage.getItem("islocked");
    if (l === "true")
        panel = <LockPanel/>;
    return (
        <div className={`App theme-${theme}`} style={{width: "100%"}}>
            <themeContext.Provider value={theme}>
                <offsetContext.Provider value={offset}>
                    <Navbar clickHandler={setChosenPanel}/>
                    <br/>
                    <br/>
                    {panel}
                </offsetContext.Provider>
            </themeContext.Provider>
        </div>
    );
}

export default App;
