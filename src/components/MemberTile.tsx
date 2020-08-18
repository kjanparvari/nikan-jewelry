import React from 'react';
// @ts-ignore
import Tilt from "react-tilt/dist/tilt";

function MemberTile(props: any) {
    return (
        <div className=" justify-content-center" style={{margin: "auto"}}>
            <Tilt className="Tilt ml-3" options={{max: 15}} style={{height: "8vh", width: "90%"}}>
                <a className="float-right bg-dark text-white p-1 pl-2 pr-3 w-100 mb-2 Tilt-inner" style={{width: "100%", borderRadius: 10}}>
                    <div className="text-right member-name">
                        {props.person.name}
                    </div>
                    <div className="text-left member-id rounded">
                        #{props.person.id}
                    </div>
                </a>
            </Tilt>
        </div>
    );
}

export default MemberTile;