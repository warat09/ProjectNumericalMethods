import React, {ChangeEvent,useState,useEffect }from "react";
import functionPlot from "function-plot";
import { addStyles, EditableMathField } from "react-mathquill"
import {
    atan2, chain, derivative, e, evaluate, log, pi, pow, round, sqrt
} from 'mathjs'
var Latex = require('react-latex');
addStyles()


const Bisection_method:React.FC =()=>{
    const [test,settest] = useState({left: 0,right: 0})
    const [latex, setLatex] = useState(' ')

    const handleSubmit =(e:any)=> {
        alert('ขอบเขตซ้าย: '+test.left+' '+'ขอบเขตขวา: '+test.right);
        e.preventDefault();
    }

    const inputsHandler = (e:any) => {
        settest({ ...test, [e.target.name]: e.target.value });
    };
    const submitButton = () =>{
        functionPlot({
            title: latex,
            target: '#test',
            width: 580,
            height: 400,
            data: [{
                fn: latex,
            }],
            annotations: [{
                x: test.left,
                text: 'x = '+test.left.toString()
            }, {
                x: test.right,
                text: 'x = '+test.right.toString()
            }]
        })

    }

    const fx = (Xm:number) =>{
            let a : number = Math.pow(Xm,4)-13
            return a
    }
    const Bisection = () => {
        let Xl : number = 1.5
        let Xr : number = 2.0
        let x_old : number = 0
        let Xm : number = (Xl+Xr)/2
        console.log(Xm)

        while (Math.abs(Xm-x_old)/Xm > 0.0000001){
            if(fx(Xm)*fx(Xr)>0){
                x_old = Xr
                Xr = Xm
                console.log(Xr)
            }
            else{
                x_old = Xl
                Xl= Xm
                console.log(Xl)
            }
            Xm = (Xl+Xr)/2
        }
        return Xm
    }
    Bisection()
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <label>ใส่สมการ</label>
                <EditableMathField
                    style={{ display: "flex", color: "red", flexDirection: "column",width: "100px"}}
                    latex={latex}
                    onChange={(mathField) => {
                        setLatex(mathField.latex())
                    }}
                />
                <input onChange={inputsHandler} name="left" placeholder={"ขอบเขตซ้าย"}/>
                <input onChange={inputsHandler} name="right" placeholder={"ขอบเขตขวา"}/>
                <button onClick={submitButton}>ตกลง</button>
                <h1>{Bisection()}</h1>
                <p>{latex}</p>
                <div id="test"></div>
            </form>
        </div>
    );
}
export default Bisection_method