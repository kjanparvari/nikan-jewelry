import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from "./components/Navbar";

export const themeContext = React.createContext('dark');

function App() {
    const [theme, setTheme] = useState('dark');
    return (
        <div className={`App theme-${theme}`}>
            <themeContext.Provider value={theme}>
                <Navbar/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>

            </themeContext.Provider>
        </div>
    );
}

export default App;
