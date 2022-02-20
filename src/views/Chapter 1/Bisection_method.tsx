import React, {ChangeEvent,useState,useEffect }from "react";
import functionPlot from "function-plot";
import { addStyles, EditableMathField } from "react-mathquill"
import {
    atan2, chain, derivative, e, evaluate, log, pi, pow, round, sqrt
} from 'mathjs'
import axios from "axios";
var Latex = require('react-latex');
addStyles()

interface setwq{
    eq : string
}


const Bisection_method:React.FC<setwq> =({eq})=>{
    eq = "asdasd";
    const [test,settest] = useState({left: '',right: ''})
    const [res,setres] = useState(' ')
    const [latex, setLatex] = useState(' ')

    const handleSubmit = async (e:any)=> {
        alert('ขอบเขตซ้าย: '+test.left+' '+'ขอบเขตขวา: '+test.right);
        let pow:string = latex.replace(/\^/g, '**').replace(/(\d+)(x)/g, '$1*x')
        const fx = (x:number) =>{
            let a : number = eval(pow)
            return a
        }
        const Bisection = () => {
            let Xl : number =  parseFloat(test.left)
            let Xr : number = parseFloat(test.right)
            console.log(Xl+Xr)
            let x_old : number = 0
            let Xm : number = (Xl+Xr)/2
            console.log("ssss="+Xl+Xr)

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
        setres(Bisection().toString())

        functionPlot({
            target: '#test',
            width: 580,
            height: 400,
            data: [{
                fn: latex,
            }],
            annotations: [{
                x: parseFloat(test.left),
                text: 'x = '+test.left
            }, {
                x: parseFloat(test.right),
                text: 'x = '+test.right
            }]
        })
        e.preventDefault();
    }

    const inputsHandler = (e:any) => {
        settest({ ...test, [e.target.name]: e.target.value });
    };

    return(
        <div>
            <h1>Bisection</h1>
            <form onSubmit={handleSubmit}>
                <label>ใส่สมการ</label>
                <EditableMathField
                    style={{ display: "flex", color: "red", flexDirection: "column",width: "100px"}}
                    latex={latex}
                    onChange={(mathField) => {
                        setLatex(mathField.latex())
                    }}
                />
                <input  onChange={inputsHandler} name="left" placeholder={"ขอบเขตซ้าย"}/>
                <input onChange={inputsHandler} name="right" placeholder={"ขอบเขตขวา"}/>
                <input type="submit" name="submit"/>
                <p>{latex}</p>
                <h2>{res}</h2>
                <h3>{eq}</h3>
                <div id="test"></div>
            </form>
        </div>
    );
}
export default Bisection_method