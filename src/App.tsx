import React, {createContext, useEffect, useState} from 'react';
import './App.css';
import Navbar from "./components/Navbar";
import DailyPanel from "./components/Daily/DailyPanel";
import HomePanel from "./components/HomePanel";
import SettingPanel from "./components/SettingPanel";
import MeltPanel from "./components/Melt/MeltPanel";
import LockPanel from "./components/LockPanel";
import BorrowedPanel from "./components/Borrowed/BorrowedPanel";
import InplacePanel from "./components/Inplace/InplacePanel";

export const themeContext: any = React.createContext({
    theme: 'dark', setTheme: () => {
    }
});

export const THOUSAND_SEPARATOR = " ";
export const DECIMAL_SEPARATOR = ".";

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
        console.log(home);
        home.money.offset += amount;
        console.log(home);
        localStorage.setItem("home", JSON.stringify(home));
    }
};
const offset = {
    changeMoney: changeMoneyOffset,
    changeGold: changeGoldOffset
};

export const offsetContext = createContext(offset);

const getPanel = (chosenPanel: string) => {
    if (chosenPanel === "home")
        return <HomePanel/>;
    else if (chosenPanel === "setting")
        return <SettingPanel/>;
    else if (chosenPanel === "daily")
        return <DailyPanel defaultPerson={null}/>;
    else if (chosenPanel === "inplace")
        return <InplacePanel defaultPerson={null}/>;
    else if (chosenPanel === "melt")
        return <MeltPanel defaultPerson={null}/>;
    else if (chosenPanel === "borrowed")
        return <BorrowedPanel defaultPerson={null}/>;
    else {
        // @ts-ignore
        const c = chosenPanel.charAt(0);
        let id: any;
        let mems: [];
        let person;
        if (c === "D") {
            // @ts-ignore
            id = parseInt(chosenPanel.split(":")[1]);
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
            // @ts-ignore
            id = parseInt(chosenPanel.split(":")[1]);
            const m = localStorage.getItem("melt-members");
            if (m !== null) {
                mems = JSON.parse(m).list;
                mems.forEach((p, i) => {
                    // @ts-ignore
                    if (parseInt(p.id) === id)
                        person = p;

                });
                return <MeltPanel defaultPerson={person}/>
            }

        } else if (c === "I") {
            // @ts-ignore
            id = parseInt(chosenPanel.split(":")[1]);
            const m = localStorage.getItem("inplace-members");
            if (m !== null) {
                mems = JSON.parse(m).list;
                mems.forEach((p, i) => {
                    // @ts-ignore
                    if (parseInt(p.id) === id)
                        person = p;

                });
                return <MeltPanel defaultPerson={person}/>
            }

        } else if (c === "B") {
            // @ts-ignore
            id = parseInt(chosenPanel.split(":")[1]);
            const m = localStorage.getItem("borrowed-members");
            if (m !== null) {
                mems = JSON.parse(m).list;
                mems.forEach((p, i) => {
                    // @ts-ignore
                    if (parseInt(p.id) === id)
                        person = p;

                });
                console.log(JSON.stringify(person));
                return <BorrowedPanel defaultPerson={person}/>
            }
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
    localStorage.setItem("inplace-members", JSON.stringify({maxId: "0", list: []}));
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
    const [isLocked, setLock] = useState(localStorage.getItem("islocked"));
    document.body.className = "theme-" + theme;
    const [chosenPanel, setChosenPanel]: any = useState(null);
    const [panel, setPanel]: any = useState(<div/>);
    useEffect(() => {
            if (isLocked === "true")
                setPanel(() => <LockPanel unlock={() => {
                    setLock("false");
                    setChosenPanel(localStorage.getItem("tmp"));
                }}/>);
            else if (chosenPanel === null) {
                setChosenPanel(localStorage.getItem("last"));
            } else {
                setPanel(() => setPanel(() => getPanel(chosenPanel)));
            }
        }
        , [chosenPanel, isLocked]
    );

    return (
        <div className={`App theme-${theme}`} style={{width: "100%"}}>
            <themeContext.Provider value={{theme: theme, setTheme: setTheme}}>
                <offsetContext.Provider value={offset}>
                    <Navbar panel={chosenPanel} setPanel={setChosenPanel} locked={isLocked === "true"}
                            lockHandler={() => setLock("true")}/>
                    <br/>
                    <br/>
                    {panel}
                </offsetContext.Provider>
            </themeContext.Provider>
        </div>
    );
}

export default App;
