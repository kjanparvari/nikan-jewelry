import React, {useRef} from 'react';
import {BsFillLockFill} from "react-icons/bs";
import {ControlLabel, FormControl, FormGroup, Form} from "rsuite";

function LockPanel(props: any) {
    const passwordRef = useRef(null);
    const login = () => {
        // @ts-ignore
        console.log("attempting to login" + passwordRef.current.value);
        const pss = localStorage.getItem("pss");
        // @ts-ignore
        if (passwordRef.current.value === pss) {
            localStorage.setItem("islocked", "false");
            window.location.reload(false);
        }
    };
    return (
        <div style={{padding: "auto"}}>
            <br/>
            <br/>
            <br/>
            <br/>
            <BsFillLockFill style={{fontSize: 100}}/>
            <br/>
            <br/>
            <Form>
                <FormGroup>
                    <ControlLabel className="font-bn" style={{fontSize: 20}}>رمز عبور را وارد کنید</ControlLabel>
                    <input className="form-control-lg form-control w-25" ref={passwordRef} name="password"
                           type="password" onChange={login} style={{marginLeft: "auto", marginRight: "auto"}}/>
                </FormGroup>
            </Form>
            {/*<input type="password" className="form-control-lg form" style={{color: "black"}}/>*/}
        </div>

    );
}

export default LockPanel;