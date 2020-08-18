import React, {useState} from 'react';
import './App.css';
import Navbar from "./components/Navbar";
import DailyPanel from "./components/DailyPanel";

export const themeContext = React.createContext('dark');

function App() {
    const [theme, setTheme] = useState('dark');
    return (
        <div className={`App theme-${theme}`}>
            <themeContext.Provider value={theme}>
                <Navbar/>
                <br/>
                <br/>
                <DailyPanel/>
            </themeContext.Provider>
        </div>
    );
}

export default App;
