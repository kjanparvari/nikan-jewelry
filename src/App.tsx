import React, {useState} from 'react';
import './App.css';
import Navbar from "./components/Navbar";
import DailyPanel from "./components/DailyPanel";
import HomePanel from "./components/HomePanel";

export const themeContext = React.createContext('dark');

function App() {
    const [theme, setTheme] = useState('dark');
    const [chosenPanel, setChosenPanel] = useState('daily');
    let panel: any;
    if (chosenPanel === 'daily')
        panel = <DailyPanel />;
    else if (chosenPanel === 'home')
        panel = <HomePanel/>;
    else{
        panel = <div/>
    }
    return (
        <div className={`App theme-${theme}`}>
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
