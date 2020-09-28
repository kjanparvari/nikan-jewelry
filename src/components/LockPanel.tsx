import React from 'react';
import {BsFillLockFill} from "react-icons/bs";
import {ControlLabel, FormControl, FormGroup, Form} from "rsuite";

function LockPanel(props: any) {
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
                    <FormControl pl name="password" type="password"/>
                </FormGroup>
            </Form>
            {/*<input type="password" className="form-control-lg form" style={{color: "black"}}/>*/}
        </div>

    );
}

export default LockPanel;