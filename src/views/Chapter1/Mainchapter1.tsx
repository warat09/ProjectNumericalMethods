import React, {ChangeEvent,useState,useEffect,useRef  }from "react";

import functionPlot from "function-plot";
import { addStyles, EditableMathField,StaticMathField} from "react-mathquill"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,AreaChart,Area, Brush,ReferenceLine } from 'recharts';
import axios from "axios";
import { parse,serialize,LatexSyntax,ComputeEngine  } from '@cortex-js/compute-engine';
import {MathfieldElement} from "mathlive";
import { MathfieldComponent } from "react-mathlive";
import * as mathjs from "mathjs";
import { parseTex, evaluateTex } from 'tex-math-parser' // ES6 module
import { string } from "mathjs";
import { NavLink } from "react-router-dom";
const Desmos = require("desmos");
var Latex = require('react-latex');



addStyles()

  interface setgraph{
    name:number
    Xm:number
  }
  interface seterror{
      name:number
      Error:number
  }
  interface setplotgraph{
    name:String
    X:number
    Y:number
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
    const [error, setError] = useState<seterror[]>([])
    const [plotgraph, setplotgraph] = useState<setplotgraph[]>([])


    const datas :setgraph[]= []
    const dataserror :seterror[]= []
    const datasetplotgraph :setplotgraph[]= []

    const [vars, setVars] = useState<{ name: string; value: number }[]>([]);
    const [atex, setatex] = React.useState("f(x)=\\log _10 x");

    const problem = (left:string,right:string,begin:string,eq:string) =>{
        const fx = (x:number) =>{
            let X:number = x
            // console.log('X',X)
            let pow:string = eq.replace(/x/g,X.toString()).replace(/\\frac{([-+]?[0-9]*\.?[0-9]+)}{([-+]?[0-9]*\.?[0-9]+)}/,'$1/$2').replace(/\\sqrt{([-+]?[0-9]*\.?[0-9]+)}/,'sqrt($1)').replace(/\\sin/,'sin').replace(/\\cos/,'cos').replace(/\\tan/,'tan').replace(/{/g,'(').replace(/}/g,')').replace(/\\left\(/g,'(').replace(/\\right\)/g,')')

            // let pow:string = eq.replace(/([-+]?[0-9]*\.?[0-9]+)(x)/g, '$1*$2').replace(/([-+]?[0-9]*\.?[0-9]+)(e)/g, '$1*$2').replace(/x/g,X.toString()).replace(/(e)([-+]?[0-9]*\.?[0-9]+)/g, '$1*$2').replace(/([-][0-9]*\.?[0-9]+)\^([-+]?[0-9]*\.?[0-9]+)/,'($1)^$2').replace(/\\frac{([-+]?[0-9]*\.?[0-9]+)}{([-+]?[0-9]*\.?[0-9]+)}/,'$1/$2').replace(/\\sqrt{([-+]?[0-9]*\.?[0-9]+)}/,'sqrt($1)').replace(/\\sin/,'sin').replace(/\\cos/,'cos').replace(/\\tan/,'tan').replace(/{/g,'(').replace(/}/g,')').replace(/\\left\(/g,'(').replace(/\\right\)/g,')')
            // console.log("samagan ku is ",pow)
            console.log('pow is',pow)
            // let a :any = ce.N(parse(pow.replace(/x/g,X.toString())))
            // console.log('ans is',a)
            let eee : any = mathjs.parse(pow)
            let a : any = eee.evaluate()
            // mathjs.evaluate(eq,{x: X})
            return mathjs.evaluate(eq,{x: X})
        }
        const setgraph =() =>{
          console.log("fx11"+fx(-11))
          for(let i = -500;i < 500;i++){
            const newgraph = {
              name:"ploat",
              X:i,
              Y:fx(i)
            }
            datasetplotgraph.push(newgraph)
          }
          setplotgraph(datasetplotgraph)
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
                    // console.log(Xr)
                }
                else{
                    x_old = Xl
                    Xl= Xm
                    // console.log(Xl)
                }
                Xm = (Xl+Xr)/2
                // console.log("Xm = "+Xm)
                error = Math.abs((Xm-x_old)/Xm)
                

                const newCar = {
                  name: datas.length,
                  Xm: Xm
                }

                const newerror = {
                    name: dataserror.length,
                    Error: error
                  }
                
                  
                
                datas.push(newCar)
                dataserror.push(newerror)

            }
            // console.log(datas)
            setCars(datas)
            setError(dataserror)
            return Xm
        }
        
        const FalsePosition = () => {
            let Xl:number = parseFloat(left),Xr:number = parseFloat(right),Fxl:number = fx(Xl),Fxr:number = fx(Xr)
            let X1:number = ((Xl * Fxr) - (Xr * Fxl))/(Fxr-Fxl)
            let x_old:number = 0;
            let error:number = Math.abs((X1-x_old)/X1)
            while (error > 0.000001 && error != Infinity){
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
                error = Math.abs((X1-x_old)/X1)

                const newCar = {
                    name: datas.length,
                    Xm: X1
                  }
                  const newerror = {
                    name: dataserror.length,
                    Error: error
                  }

                  datas.push(newCar)
                  dataserror.push(newerror)

            }
            setCars(datas)
            setError(dataserror)
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
                  const newerror = {
                    name: dataserror.length,
                    Error: error
                  }

                  dataserror.push(newerror)
                  datas.push(newCar)
            }
            setCars(datas)
            setError(dataserror)

            return X2
        }
        const fxnewton = (x:number) => {
            let div:number = mathjs.derivative(eq.replace(/([-+]?[0-9]*\.?[0-9]+)(x)/g, '$1*$2').replace(/([-+]?[0-9]*\.?[0-9]+)(e)/g, '$1*$2').replace(/(e)([-+]?[0-9]*\.?[0-9]+)/g, '$1*$2').replace(/([-][0-9]*\.?[0-9]+)\^([-+]?[0-9]*\.?[0-9]+)/,'($1)^$2').replace(/\\frac{([-+]?[0-9]*\.?[0-9]+)}{([-+]?[0-9]*\.?[0-9]+)}/,'$1/$2').replace(/\\sqrt{([-+]?[0-9]*\.?[0-9]+)}/,'sqrt($1)').replace(/\\sin/,'sin').replace(/\\cos/,'cos').replace(/\\tan/,'tan').replace(/{/g,'(').replace(/}/g,')').replace(/\\left\(/g,'(').replace(/\\right\)/g,')'),'x').evaluate({x:x})
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
                  const newerror = {
                    name: dataserror.length,
                    Error: error
                  }
                  datas.push(newCar)
                  dataserror.push(newerror)
            }
            setCars(datas)
            setError(dataserror)
            return xnew
        }
        

        switch(props.name){
            case "Bisection":
                setres(Bisection().toString())
                setgraph()
                break
            case "FalsePosition":
                setres(FalsePosition().toString())
                setgraph()
                break
            case "OnePointInteration":
                setres(Onepoint().toString())
                setgraph()
                break
            case "NewtonRaphson":
                setres(NewtonRaphson().toString())
                setgraph()
                break
        }

    }
    const handleSubmit = async (e:any)=> {
        alert('ขอบเขตซ้าย: '+test.left+' '+'ขอบเขตขวา: '+test.right);
        // let a = derivative('x^2+2x', 'x').toString()
        console.log("latex submit",latex)
        problem(test.left,test.right,test.begin,latex)

        e.preventDefault();
    }

    const inputsHandler = (e:any) => {
        settest({ ...test, [e.target.name]: e.target.value });
    };
    useEffect(()=>{
      let tokenStr = 'tle1234';


        axios.get("http://localhost:6060/Rootofeqution",{ headers: {
          "access-token": `${tokenStr}` 
        } })
        .then(response => {
            var elt = document.getElementById('calculator');
            var calculator = Desmos.GraphingCalculator(elt);

            
            switch(props.name){
                case "Bisection":
                 setLatex(response.data.keepquestion.Bisection[0].eq)
                 settest({left:response.data.keepquestion.Bisection[0].left,right:response.data.keepquestion.Bisection[0].right,begin:'0'})
                 problem(response.data.keepquestion.Bisection[0].left,response.data.keepquestion.Bisection[0].right,'0',response.data.keepquestion.Bisection[0].eq)
                 const desmoslatex:string = "y="+response.data.keepquestion.Bisection[0].eq;
                 calculator.setExpression({ id: 'graph1', latex: desmoslatex });
                 break
                 case "FalsePosition":
                 setLatex(response.data.keepquestion.FalsePosition[0].eq)
                 settest({left:response.data.keepquestion.FalsePosition[0].left,right:response.data.keepquestion.FalsePosition[0].right,begin:'0'})
                 problem(response.data.keepquestion.FalsePosition[0].left,response.data.keepquestion.FalsePosition[0].right,'0',response.data.keepquestion.FalsePosition[0].eq)
                 const desmoslatexFalse:string = "y="+response.data.keepquestion.FalsePosition[0].eq;
                 calculator.setExpression({ id: 'graph1', latex: desmoslatexFalse });
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
      
    const gradientOffset = () => {
        const dataMax = Math.max(...cars.map((i) => i.Xm));
        const dataMin = Math.min(...cars.map((i) => i.Xm));
      
        if (dataMax <= 0) {
          return 0;
        }
        if (dataMin >= 0) {
          return 1;
        }
      
        return dataMax / (dataMax - dataMin);
      };
    
    const off = gradientOffset();




    return(
        <div>
                      <nav>
                <ul>
                    <li>
                        <NavLink to="BisectionMethod">BisectionMethod</NavLink>{" "}
                        <NavLink to="FalsePosition">FalsePosition</NavLink>{" "}
                        <NavLink to="OnePointInteration">OnePointInteration</NavLink>{" "}
                        <NavLink to="NewtonRaphson">NewtonRaphson</NavLink>{" "}
                    </li>
                </ul>
            </nav>   
          <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold text-gray-900">{props.name}</h1>
            </div>
          </header>
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
                <p>{latex}</p>
                {/* <p>{latex.replace(/([-+]?[0-9]*\.?[0-9]+)(x)/g, '$1*$2').replace(/([-+]?[0-9]*\.?[0-9]+)(e)/g, '$1*$2').replace(/x/g,'-10').replace(/(e)([-+]?[0-9]*\.?[0-9]+)/g, '$1*$2').replace(/([-][0-9]*\.?[0-9]+)\^([-+]?[0-9]*\.?[0-9]+)/,'($1)^$2').replace(/\\frac{(.+)}{(.+)}/,'$1/$2').replace(/\\frac{([-+]?[0-9]*\.?[0-9]+)}{([-+]?[0-9]*\.?[0-9]+)}/,'$1/$2').replace(/\\sqrt{([-+]?[0-9]*\.?[0-9]+)}/,'sqrt($1)').replace(/\\sin/,'sin').replace(/\\cos/,'cos').replace(/\\tan/,'tan')}</p> */}
                {/* .replace(/([-+]?[0-9]*\.?[0-9]+)(x)/g, '$1*x').replace(/([-+]?[0-9]*\.?[0-9]+)(e)/g, '$1*e').replace(/{\\frac{([-+]?[0-9]*\.?[0-9]+)}{([-+]?[0-9]*\.?[0-9]+)}}/,'($1/$2)') */}
                {/* <p>{latex.replace(/x/g,'-3').replace(/\\sqrt{([-+]?[0-9]*\.?[0-9]+)}/,'sqrt($1)').replace(/\\sin/,'sin').replace(/\\cos/,'cos').replace(/\\tan/,'tan').replace(/\\frac{(.+)}{(.+)}/,'$1/$2').replace(/\\frac3)(2)/).replace(/{/g,'(').replace(/}/g,')').replace(/\\left\(/g,'(').replace(/\\right\)/g,')')}</p> */}
                <p>{latex.replace(/[^\\]*\\frac{(.+)}{(.+)}$/g,'$1/$2')}</p>

                <h2>{res}</h2>
                <h2 style={{marginLeft: "450px"}}>กราฟจากสมการ</h2>

                <LineChart width={1000} height={600} data={plotgraph} 
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <XAxis dataKey="X" />
                <YAxis />
                <Tooltip />
                <Legend />
                <ReferenceLine x={0} stroke="red" />
                <ReferenceLine y={0} stroke="red" />

                <Line type="monotone" dataKey="Y" stroke="#000" dot={false}/>
                <Brush/>
              </LineChart>
                
                <h2 style={{marginLeft: "450px"}}>ค่าXm</h2>
                <AreaChart
                width={1000}
                height={600}
                data={cars}
                margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0
                }}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <defs>
                    <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset={off} stopColor="green" stopOpacity={1} />
                    <stop offset={off} stopColor="red" stopOpacity={1} />
                    </linearGradient>
                </defs>
                <Area
                    type="monotone"
                    dataKey="Xm"
                    stroke="#000"
                    fill="url(#splitColor)"
                    
                />
                <Brush/>
                </AreaChart>

                <h2 style={{marginLeft: "450px"}}>ค่าError</h2>

                <AreaChart
          width={1000}
          height={600}
          data={error}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="Error" stroke="#000" fill="#FF2400" />
          <Brush/>
        </AreaChart>

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