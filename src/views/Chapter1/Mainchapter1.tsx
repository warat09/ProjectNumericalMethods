import React, {ChangeEvent,useState,useEffect,useRef  }from "react";
import functionPlot from "function-plot";
import { addStyles, EditableMathField,StaticMathField} from "react-mathquill"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from "axios";
import { parse,serialize,LatexSyntax,ComputeEngine  } from '@cortex-js/compute-engine';
import {MathfieldElement} from "mathlive";
import { MathfieldComponent } from "react-mathlive";
import * as mathjs from "mathjs";
import { parseTex, evaluateTex } from 'tex-math-parser' // ES6 module
import CalProblem from "./CalProblem";





var Latex = require('react-latex');


addStyles()

  interface setgraph{
    name:number
    Xm:number
  }
  interface test{
      name:string
  }

const Mainchapter1:React.FC<test> =(props)=>{
    const [q,setq] = useState('')
    const [test,settest] = useState({left: '',right: '',begin:''})
    const [res,setres] = useState(' ')
    const [latex, setLatex] = useState(q)
    const [cars, setCars] = useState<setgraph[]>([])
    const datas :setgraph[]= []
    const [vars, setVars] = useState<{ name: string; value: number }[]>([]);
    const [atex, setatex] = React.useState("f(x)=\\log _10 x");


    // const expr = parse('\\frac{\\sqrt{5}}{3}')
    // const atex = serialize(expr);
    // console.log(atex)
    // console.log(evaluate(atex))
    // console.log(serialize(1/3, {
    //     precision: 3,
    //     decimalMarker: ","
    // }));
//     const latexSyntax = new LatexSyntax();
// const expr = latexSyntax.parse('\\frac{\\pi}{2}');
// console.log(expr);
// const atex = latexSyntax.serialize(expr);
// console.log(atex);


const ce = new ComputeEngine();
// console.log("latex is",latex)
// let c:string = "8";
// let d:any = parseFloat(c)
// let e:string = '2^{\\frac{1}{2}}'
// console.log(d);
// let b :string = e.replace(/(\d+)(x)/g, '$1*x').replace(/(\d+)(e)/g, '$1*e').replace(/x/g,d)
// console.log("latex convert is",b)
// console.log("cal is",ce.N(parse(b)))





// const texStr = String.raw`2^{\frac{x}{4}}`;
// const answer = evaluateTex(texStr, {x: 2, y: 1});
// console.log(answer.evaluated); // 1



    
    const problem = (left:string,right:string,begin:string,eq:string) =>{
        const fx = (x:number) =>{
            let X:number = parseFloat(x.toFixed(9))
            console.log('X',X)
            let pow:string = eq.replace(/([-+]?[0-9]*\.?[0-9]+)(x)/g, '$1*x').replace(/([-+]?[0-9]*\.?[0-9]+)(e)/g, '$1*e').replace(/x/g,X.toString()).replace(/\\frac{([-+]?[0-9]*\.?[0-9]+)}{([-+]?[0-9]*\.?[0-9]+)}/,'$1/$2').replace(/\\sqrt{([-+]?[0-9]*\.?[0-9]+)}/,'sqrt($1)').replace(/{/g,'(').replace(/}/g,')')
            console.log("samagan ku is ",pow)
            // console.log('pow is',pow)
            // let a :any = ce.N(parse(pow.replace(/x/g,X.toString())))
            // console.log('ans is',a)
            let eee : any = mathjs.parse(pow)
            let a : any = eee.evaluate()
            return a
        }
        const Bisection = () => {
            let Xl : number =  parseFloat(left)
            let Xr : number = parseFloat(right)
            console.log(Xl+Xr)
            let x_old : number = 0
            let Xm : number = (Xl+Xr)/2
            console.log("ssss="+Xl+Xr)
            let error : number = Math.abs((Xm-x_old)/Xm)

            while (error > 0.000001 && error != Infinity){
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
                console.log("Xm = "+Xm)
                error = Math.abs((Xm-x_old)/Xm)
                

                const newCar = {
                  name: datas.length,
                  Xm: Xm
                }
                
                datas.push(newCar)

            }
            console.log(datas)
            setCars(datas)
            return Xm
        }
        
        const FalsePosition = () => {
            let Xl:number = parseFloat(left),Xr:number = parseFloat(right),Fxl:number = fx(Xl),Fxr:number = fx(Xr)
            let X1:number = ((Xl * Fxr) - (Xr * Fxl))/(Fxr-Fxl)
            let x_old:number = 0;
            while (Math.abs((X1-x_old)/X1) > 0.000001){
                console.log("fxr",Fxr);
                if(fx(X1)*fx(Xr) > 0){
                    x_old = Xr
                    Xr = X1
                    console.log("xoldright",x_old)
                    console.log("Xr",Xr)
                }
                else{
                    x_old = Xl
                    Xl = X1
                    console.log("xoldleft",x_old)
                    console.log("Xl",Xl)
                }
                X1 = ((Xl * fx(Xr)) - (Xr * fx(Xl)))/(fx(Xr)-fx(Xl))
                const newCar = {
                    name: datas.length,
                    Xm: X1
                  }
                  datas.push(newCar)
            }
            setCars(datas)
            return X1
        }
        const Onepoint = () => {
            console.log("begin one point")
            let x_old:number = parseFloat(begin)
            let X2:number = fx(x_old)
            let x_old_old:number  = 0
            let error:number = Math.abs((X2-x_old)/X2)
            while (error > 0.000001 && error != Infinity){
                x_old_old = x_old
                X2 = fx(x_old)
                error = Math.abs((X2-x_old)/X2)
                x_old = X2
                console.log('error is',error)
                const newCar = {
                    name: datas.length,
                    Xm: X2
                  }
                  
                  datas.push(newCar)
            }
            setCars(datas)
            return X2
        }
        const fxnewton = (x:number) => {
            let div:number = mathjs.derivative(eq.replace(/([-+]?[0-9]*\.?[0-9]+)(x)/g, '$1*x').replace(/([-+]?[0-9]*\.?[0-9]+)(e)/g, '$1*e').replace(/\\frac{(.+)}{(.+)}/,'$1/$2').replace(/\\sqrt{([-+]?[0-9]*\.?[0-9]+)}/,'sqrt($1)').replace(/{/g,'(').replace(/}/g,')'),'x').evaluate({x:x})
            let eqnewton:number = -fx(x)/div
            return eqnewton
        }
        const NewtonRaphson = () =>{
            let xold = parseFloat(begin)
            let eqnewton = fxnewton(xold)
            let xnew = xold + eqnewton
            let error = Math.abs((xnew-xold)/xnew)
            console.log(xnew)
            while (error > 0.000001 && error !== Infinity){
                xold = xnew
                xnew = xold + fxnewton(xold)
                error = Math.abs(xnew-xold)/xnew
                const newCar = {
                    name: datas.length,
                    Xm: xnew
                  }
                  datas.push(newCar)
            }
            setCars(datas)
            return xnew
        }

        switch(props.name){
            case "Bisection":
                setres(Bisection().toString())
                break
            case "FalsePosition":
                setres(FalsePosition().toString())
                break
            case "OnePointInteration":
                setres(Onepoint().toString())
                break
            case "NewtonRaphson":
                setres(NewtonRaphson().toString())
                break
        }

    }
    const handleSubmit = async (e:any)=> {
        alert('ขอบเขตซ้าย: '+test.left+' '+'ขอบเขตขวา: '+test.right);
        console.log("handleeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
        // let a = derivative('x^2+2x', 'x').toString()
        console.log("latex submit",latex)
        problem(test.left,test.right,test.begin,latex)

        e.preventDefault();
    }

    const inputsHandler = (e:any) => {
        settest({ ...test, [e.target.name]: e.target.value });
    };
    useEffect(()=>{
        axios.get("http://localhost:6060/posts")
        .then(response => {
            
            switch(props.name){
                case "Bisection":
                 setLatex(response.data.keepquestion.Bisection[0].eq)
                 settest({left:response.data.keepquestion.Bisection[0].left,right:response.data.keepquestion.Bisection[0].right,begin:'0'})
                 problem(response.data.keepquestion.Bisection[0].left,response.data.keepquestion.Bisection[0].right,'0',response.data.keepquestion.Bisection[0].eq)
                 break
                 case "FalsePosition":
                 setLatex(response.data.keepquestion.FalsePosition[0].eq)
                 settest({left:response.data.keepquestion.FalsePosition[0].left,right:response.data.keepquestion.FalsePosition[0].right,begin:'0'})
                 problem(response.data.keepquestion.FalsePosition[0].left,response.data.keepquestion.FalsePosition[0].right,'0',response.data.keepquestion.FalsePosition[0].eq)
                 break
                 case "OnePointInteration":
                 setLatex(response.data.keepquestion.OnePointInteration[0].eq)
                 settest({left:'0',right:'0',begin:response.data.keepquestion.OnePointInteration[0].xbegin})
                 problem('0','0',response.data.keepquestion.OnePointInteration[0].xbegin,response.data.keepquestion.OnePointInteration[0].eq)
                 break
                 case "NewtonRaphson":
                 setLatex(response.data.keepquestion.NewtonRaphson[0].eq)
                 settest({left:'0',right:'0',begin:response.data.keepquestion.NewtonRaphson[0].xbegin})
                 problem('0','0',response.data.keepquestion.NewtonRaphson[0].xbegin,response.data.keepquestion.NewtonRaphson[0].eq)
                 break
            }
            // do something about response
        })
        
        .catch(err => {
            console.error(err)
        })
    },[])
    

    return(
        <div>
            <h1>{props.name}</h1>
            <form onSubmit={handleSubmit}>
                <label>ใส่สมการ</label>
                <EditableMathField
                    style={{ display: "flex", color: "red", flexDirection: "column",width: "100px"}}
                    latex={latex}
                    onChange={(mathField) => {
                        setLatex(mathField.latex())
                    }}
                />
                 {
                    props.name === "Bisection" &&  
                    <div>
                        <input value={test.left}  onChange={inputsHandler} name="left" placeholder={"ขอบเขตซ้าย"}/>
                         <input value={test.right} onChange={inputsHandler} name="right" placeholder={"ขอบเขตขวา"}/>
                    </div>
                }
                {
                    props.name === "FalsePosition" &&  
                    <div>
                        <input value={test.left}  onChange={inputsHandler} name="left" placeholder={"ขอบเขตซ้าย"}/>
                         <input value={test.right} onChange={inputsHandler} name="right" placeholder={"ขอบเขตขวา"}/>
                    </div>
                }
                {
                    props.name === "OnePointInteration" &&
                    <div>
                        <input value={test.begin}  onChange={inputsHandler} name="begin" placeholder={"ค่าเริ่มต้น"}/>
                    </div>
                }
                {
                    props.name === "NewtonRaphson" &&
                    <div>
                        <input value={test.begin}  onChange={inputsHandler} name="begin" placeholder={"ค่าเริ่มต้น"}/>
                    </div>
                }
                <input type="submit" name="submit"/>
                <p>{latex.replace(/([-+]?[0-9]*\.?[0-9]+)(x)/g, '$1*x').replace(/([-+]?[0-9]*\.?[0-9]+)(e)/g, '$1*e').replace(/\\frac{(.+)}{(.+)}/,'$1/$2').replace(/\\sqrt{([-+]?[0-9]*\.?[0-9]+)}/,'sqrt($1)').replace(/{/g,'(').replace(/}/g,')')}</p>
                {/* .replace(/([-+]?[0-9]*\.?[0-9]+)(x)/g, '$1*x').replace(/([-+]?[0-9]*\.?[0-9]+)(e)/g, '$1*e').replace(/{\\frac{([-+]?[0-9]*\.?[0-9]+)}{([-+]?[0-9]*\.?[0-9]+)}}/,'($1/$2)') */}
                <h2>{res}</h2>
                <div id="test"></div>
                <LineChart
      width={1000}
      height={600}
      data={cars}
      margin={{
        top: 100,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="Xm"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
      {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
    </LineChart>
    {/* <div>* static mathquill</div>
      <div>
        <StaticMathField>{latex}</StaticMathField>
      </div> */}
            {/* <h3>Result</h3>
      <h2>{fn}</h2> */}
            </form>
        </div>
    );
}
export default Mainchapter1