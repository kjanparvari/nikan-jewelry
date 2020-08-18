import React, {useState} from 'react';
import 'semantic-ui-css/semantic.min.css'
import '../styles/search.css'
import {MDBCol, MDBInput} from "mdbreact";
import 'mdbreact/dist/css/mdb.css'
import '../styles/themes.css'
import Member from "./MemberTile";


function SideBar(props: any) {

    return (
        <div className="container float-right justify-content-center bg-light sidenavigation"
             style={{width: "20%", height: "75vh", marginRight: "4%", borderRadius: 20, minHeight: "400px"}}>
            <MDBCol md="12" className=" p-0">
                <MDBInput hint="Search" type="text" containerClass="mt-0"
                          className="text-center d-flex justify-content-center"/>
            </MDBCol>
            <div className="mb-0 justify-content-center text-center" style={{flex: 1, overflowY: "scroll", height: "80%", overflowX: "hidden"}}>
                <div className="mt-1"/>
                <Member person={{name: "علی", id: "1"}} className="Tilt-inner"/>
                <Member person={{name: "محمد", id: "2"}}/>
                <Member person={{name: "حسن", id: "3"}}/>
                <Member person={{name: "حسین", id: "4"}}/>
                <Member person={{name: "کامیار جان پروری", id: "5"}}/>
                <Member person={{name: "سجاد حسنی", id: "6"}}/>
                <Member person={{name: "یبتنیباتیسابنیتبکشسیتبنسیتابتنسیابنیستبستبنیباتیابتیابیستبنتیسنبتی", id: "7"}}/>
                <Member person={{name: "پوریا", id: "8"}}/>
                <Member person={{name: "جواد", id: "9"}}/>
                <Member person={{name: "حسین بادامی", id: "10"}}/>
            </div>
        </div>
    );
}

export default SideBar;
