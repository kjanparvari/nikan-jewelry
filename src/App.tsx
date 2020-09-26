import React, {useState} from 'react';
import './App.css';
import Navbar from "./components/Navbar";
import DailyPanel from "./components/DailyPanel";
import HomePanel from "./components/HomePanel";
import SettingPanel from "./components/SettingPanel";
import MeltPanel from "./components/MeltPanel";

export const themeContext = React.createContext('dark');

function App() {
    let initialTheme = localStorage.getItem('theme');
    if (initialTheme === null || initialTheme === undefined || initialTheme === "") {
        initialTheme = "dark";
        localStorage.setItem("theme", "dark");
    }
    // initialTheme = "light";
    const [theme, setTheme] = useState(initialTheme);
    document.body.className = "theme-" + theme;
    const [chosenPanel, setChosenPanel] = useState('daily');
    let panel: any;
    if (chosenPanel === 'daily')
        panel = <DailyPanel />;
    else if (chosenPanel === 'home')
        panel = <HomePanel/>;
    else if (chosenPanel === 'melt')
        panel = <MeltPanel/>;
    else if (chosenPanel === "setting")
        panel = <SettingPanel/>;
    else{
        panel = <div/>
    }
    return (
        <div className={`App theme-${theme}`} style={{width: "100%"}}>
            <themeContext.Provider value={theme}>
                <Navbar clickHandler={setChosenPanel}/>
                <br/>
                <br/>
                {panel}
            </themeContext.Provider>
        </div>
    );
}

export default App;
