import React, {ChangeEvent,useState,useEffect }from "react";
import functionPlot from "function-plot";
import { addStyles, EditableMathField } from "react-mathquill"
import {
    atan2, chain, derivative, e, evaluate, log, pi, pow, round, sqrt
} from 'mathjs'
import axios from "axios";
var Latex = require('react-latex');
addStyles()


const FalsePosition:React.FC =()=>{
    const [test,settest] = useState({left: 0,right: 0})
    const [res,setres] = useState(' ')
    const [latex, setLatex] = useState(' ')

    const handleSubmit = async (e:any)=> {
        alert('ขอบเขตซ้าย: '+test.left+' '+'ขอบเขตขวา: '+test.right);
        let pow:string = latex.replace(/\^/g, '**')
        let t: string = pow.replace(/(\d+)(x)/g, '$1*x')
        axios.get("http://localhost:6060/test",
            {params:
                    {
                        eq:t,
                        valleft:test.left,
                        valright:test.right,
                        method:"falseposition"
                    }
            }
        )
            .then(response => {
                setres(response.data)
                // do something about response
            })
            .catch(err => {
                console.error(err)
            })

        functionPlot({
            target: '#test',
            width: 580,
            height: 400,
            data: [{
                fn: latex,
            }],
            annotations: [{
                x: test.left,
                text: 'x = '+test.left as string
            }, {
                x: test.right,
                text: 'x = '+test.right.toString()
            }]
        })
        e.preventDefault();
    }

    const inputsHandler = (e:any) => {
        settest({ ...test, [e.target.name]: e.target.value });
    };

    return(
        <div>
            <h1>False Position</h1>
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
                <div id="test"></div>
            </form>
        </div>
    );
}
export default FalsePosition