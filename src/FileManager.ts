import {throws} from "assert";
import ErrnoException = NodeJS.ErrnoException;

const fs = require('fs');
const AES = require('crypto-js/aes');

class FileManager {
    private readonly DIR: string;
    private readonly ENCODE: string;
    private readonly KEY: string;
    private dailyFile: any;
    private meltFile: any;
    private borrowedFile: any;

    constructor() {
        this.DIR = "C:\\Users\\kjanp\\NJS\\";
        this.ENCODE = "utf-8";
        this.KEY = "h2M3%v$";
    };

    public readFile = (name: string) => {
        const _fileDir = this.DIR + this.encrypt(name) + ".NJS";
        if (this.fileExists(_fileDir)) {
            fs.readFile(_fileDir, this.ENCODE, (err: ErrnoException | null, data: string) => {
                if (err) {
                    throw err;
                } else {
                    const content = JSON.parse(this.encrypt(data.toString()));
                    console.log("data is read:");
                    console.log(content);
                    return content;
                }
            });
        } else {
            throws(() => {
            }, "[Error]: File Does Not Exist!");
        }
    };
    public saveToFile = (name: string, content: any) => {
        const _fileDir = this.DIR + this.encrypt(name) + ".NJS";
        fs.writeFile(_fileDir, content, (err: ErrnoException | null) => {
            if(err){
                throw err;
            }else{
                console.log("Data Is Written in File");
            }
        });

    };
    private fileExists = (fileDir: string) => {
        return true;
    };
    private encrypt = (str: string) => {
        // return AES.encrypt(null,this.KEY, str).toString();
        return str;
    };
    private decrypt = (str: string) => {
        return str;
    };
    public tmp = () => {
        console.log("Hello There...");
    };
}

export default FileManager;