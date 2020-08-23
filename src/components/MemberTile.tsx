import React from 'react';
// @ts-ignore
import Tilt from "react-tilt/dist/tilt";

function MemberTile(props: any) {
    const {id, name} = props.person;
    return (
        <div className="pb-0"
             style={{marginLeft: "auto", marginRight: "auto", height: "50px", marginTop: "3%", marginBottom: "1%"}}>
            <Tilt className="Tilt ml-3" options={{max: 5, scale: 1.06}} style={{width: "90%"}}>
                <a className="float-right bg-dark text-white p-1 pl-2 pr-3 w-100 Tilt-inner"
                   style={{width: "100%", borderRadius: 10}} onClick={() => props.clickHandler(props.person)}>
                    <div className="text-right member-name">
                        {name}
                    </div>
                    <div className="text-left member-id rounded">
                        #{id}
                    </div>
                </a>
            </Tilt>
        </div>
    );
}

export default MemberTile;