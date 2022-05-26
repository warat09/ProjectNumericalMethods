import React, { useEffect, useState } from "react";
import {Link, Route, Routes,Router} from "react-router-dom";

import { addStyles, EditableMathField,StaticMathField} from "react-mathquill"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,AreaChart,Area, Brush,ReferenceLine } from 'recharts';
import axios from "axios";
import * as mathjs from "mathjs";
import { index } from "mathjs";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';


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
const Home:React.FC =()=>{
    const [selectMethod,setselect] = useState("Bisection");
    const [q,setq] = useState('')
    const [test,settest] = useState({left: '',right: '',begin:''})
    const [res,setres] = useState('0')
    const [latex, setLatex] = useState(q)
    const [cars, setCars] = useState<setgraph[]>([])
    const [error, setError] = useState<seterror[]>([])
    const [plotgraph, setplotgraph] = useState<setplotgraph[]>([])

    const [dataTable, setdataTable] = useState([{id: 1}]);
    const [coloumnTable, setcoloumnTable] = React.useState<GridColDef[]>([])


    const datas :setgraph[]= []
    const dataserror :seterror[]= []
    const datasetplotgraph :setplotgraph[]= []

    const [selectobg,setselectobg] = useState([])
    const [selecteq,setselecteq] = useState("")

    const columns: GridColDef[] = [
      { field: 'id', headerName: 'Iteration', width: 100 },
    ];

    const problem = (left:string,right:string,begin:string,eq:string,method:string) =>{
        const fx = (x:number) =>{
            let X:number = x
            let pow:string = eq.replace(/([-+]?[0-9]*\.?[0-9]+)(x)/g, '$1*x').replace(/([-+]?[0-9]*\.?[0-9]+)(e)/g, '$1*e').replace(/x/g,X.toString()).replace(/\\frac{([-+]?[0-9]*\.?[0-9]+)}{([-+]?[0-9]*\.?[0-9]+)}/,'$1/$2').replace(/\\sqrt{([-+]?[0-9]*\.?[0-9]+)}/,'sqrt($1)').replace(/{/g,'(').replace(/}/g,')')

            let eee : any = mathjs.parse(pow)
            let a : any = eee.evaluate()
            // mathjs.evaluate(eq,{x: X})
            return mathjs.evaluate(eq,{x: X})
        }
        const setgraph =() =>{
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
            let x_old : number = 0
            let Xm : number = (Xl+Xr)/2
            let error : number = Math.abs((Xm-x_old)/Xm)
            let n = 1
            let rows:any = [];


            while (error > 0.000001 && error != Infinity){
                if(fx(Xm)*fx(Xr)>0){
                    x_old = Xr
                    Xr = Xm

                }
                else{
                    x_old = Xl
                    Xl= Xm
                }
                Xm = (Xl+Xr)/2
                error = Math.abs((Xm-x_old)/Xm)
                

                const newCar = {
                  name: n,
                  Xm: Xm
                }

                const newerror = {
                    name: n,
                    Error: error
                  }



                  let obg:any = {
                    id: n
                  }
                    obg = Object.assign(obg, { ["Xl"]: Xl,["Xr"]:Xr,["Xm"]:Xm,["Error"]:error})
                    rows.push(obg)


                  
                  
                datas.push(newCar)
                dataserror.push(newerror)
                n++
            }
            columns.push({ field: 'Xl', headerName: 'Xl', width: 200 },
            { field: 'Xr', headerName: 'Xr', width: 200 },
            { field: 'Xm', headerName: 'Xm', width: 200 },
            { field: 'Error', headerName: 'Error', width: 200 })
            setCars(datas)
            setError(dataserror)

            setcoloumnTable(columns)
            setdataTable(rows)

            return Xm
        }
        
        const FalsePosition = () => {
            let Xl:number = parseFloat(left),Xr:number = parseFloat(right),Fxl:number = fx(Xl),Fxr:number = fx(Xr)
            let X1:number = ((Xl * Fxr) - (Xr * Fxl))/(Fxr-Fxl)
            let x_old:number = 0;
            let error:number = Math.abs((X1-x_old)/X1)

            let n = 1
            let rows:any = [];

            while (error > 0.000001 && error != Infinity){
                if(fx(X1)*fx(Xr) > 0){
                    x_old = Xr
                    Xr = X1

                }
                else{
                    x_old = Xl
                    Xl = X1

                }
                X1 = ((Xl * fx(Xr)) - (Xr * fx(Xl)))/(fx(Xr)-fx(Xl))
                error = Math.abs((X1-x_old)/X1)

                const newCar = {
                    name: n,
                    Xm: X1
                  }
                  const newerror = {
                    name: n,
                    Error: error
                  }

                  let obg:any = {
                    id: n
                  }
                    obg = Object.assign(obg, { ["Xl"]: Xl,["Xr"]:Xr,["Xm"]:X1,["Error"]:error})
                    rows.push(obg)

                  datas.push(newCar)
                  dataserror.push(newerror)
                  n++

            }
            setCars(datas)
            setError(dataserror)

            columns.push({ field: 'Xl', headerName: 'Xl', width: 200 },
            { field: 'Xr', headerName: 'Xr', width: 200 },
            { field: 'Xm', headerName: 'Xm', width: 200 },
            { field: 'Error', headerName: 'Error', width: 200 })

            setcoloumnTable(columns)
            setdataTable(rows)
            return X1
        }
        const Onepoint = () => {
            let x_old:number = parseFloat(begin)
            let X2:number = fx(x_old)
            let x_old_old:number  = 0
            let error:number = Math.abs((X2-x_old)/X2)

            while (error > 0.000001 && error != Infinity){
                x_old_old = x_old
                X2 = fx(x_old)
                error = Math.abs((X2-x_old)/X2)
                x_old = X2
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
            let n = 1
            let rows:any = [];

            while (error > 0.000001 && error !== Infinity){
                xold = xnew
                xnew = xold + fxnewton(xold)
                error = Math.abs(xnew-xold)/xnew
                const newCar = {
                    name: n,
                    Xm: xnew
                  }
                  const newerror = {
                    name: n,
                    Error: error
                  }
                  let obg:any = {
                    id: n
                  }
                    obg = Object.assign(obg, { ["Xbegin"]: xold,["Xnew"]:xnew,["Error"]:error})
                    rows.push(obg)

                  datas.push(newCar)
                  dataserror.push(newerror)
                  n++
            }
            setCars(datas)
            setError(dataserror)

            columns.push({ field: 'Xbegin', headerName: 'Xbegin', width: 200 },
            { field: 'Xnew', headerName: 'Xnew', width: 200 },
            { field: 'Error', headerName: 'Error', width: 200 })

            setcoloumnTable(columns)
            setdataTable(rows)
            return xnew
        }
        

        switch(method){
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
        // let a = derivative('x^2+2x', 'x').toString()
        problem(test.left,test.right,test.begin,latex,selectMethod)


        e.preventDefault();
    }
    const inputsHandler = (e:any) => {
        settest({ ...test, [e.target.name]: e.target.value });
    };

    useEffect(()=>{
        let tokenStr = 'tle1234';
        
        axios.get("http://mistersigz.thddns.net:7570/Rootofeqution",{ headers: {
            "access-token": `${tokenStr}` 
          } })
          .then(response => {
            setselectobg(response.data.keepquestion.Bisection)
            setLatex(response.data.keepquestion.Bisection[0].eq)
            settest({left:response.data.keepquestion.Bisection[0].left,right:response.data.keepquestion.Bisection[0].right,begin:'0'})
            problem(response.data.keepquestion.Bisection[0].left,response.data.keepquestion.Bisection[0].right,'0',response.data.keepquestion.Bisection[0].eq,"Bisection")
              // do something about response
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

          <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold text-gray-900">Chapter1:Root of eqution_{selectMethod}</h1>
            </div>
          </header>
          <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* <!-- Replace with your content --> */}
          <div className="px-4 py-6 sm:px-0">
          <select data-testid="select-option" onChange={(e)=>{
                   const sel = e.target.value;
                   setcoloumnTable([])
                   setselect(sel)
                           let tokenStr = 'tle1234';


                   axios.get("http://mistersigz.thddns.net:7570/Rootofeqution",{ headers: {
                    "access-token": `${tokenStr}` 
                  } })
                  .then(response => {
        
          
                      
                      switch(e.target.value){
                          case "Bisection":
                            setselecteq(response.data.keepquestion.Bisection[0].eq)
                            setselectobg(response.data.keepquestion.Bisection)
                           setLatex(response.data.keepquestion.Bisection[0].eq)
                           settest({left:response.data.keepquestion.Bisection[0].left,right:response.data.keepquestion.Bisection[0].right,begin:'0'})
                           problem(response.data.keepquestion.Bisection[0].left,response.data.keepquestion.Bisection[0].right,'0',response.data.keepquestion.Bisection[0].eq,e.target.value)
                        //    const desmoslatex:string = "y="+response.data.keepquestion.Bisection[0].eq;
                        //    calculator.setExpression({ id: 'graph1', latex: desmoslatex });
                           break
                           case "FalsePosition":
                            setselecteq(response.data.keepquestion.FalsePosition[0].eq)
                            setselectobg(response.data.keepquestion.FalsePosition)
                            setLatex(response.data.keepquestion.FalsePosition[0].eq)
                            settest({left:response.data.keepquestion.FalsePosition[0].left,right:response.data.keepquestion.FalsePosition[0].right,begin:'0'})
                            problem(response.data.keepquestion.FalsePosition[0].left,response.data.keepquestion.FalsePosition[0].right,'0',response.data.keepquestion.FalsePosition[0].eq,e.target.value)

                           break
                           case "OnePointInteration":
                            setselecteq(response.data.keepquestion.OnePointInteration[0].eq)
                           setLatex(response.data.keepquestion.OnePointInteration[0].eq)
                           settest({left:'0',right:'0',begin:response.data.keepquestion.OnePointInteration[0].xbegin})
                           problem('0','0',response.data.keepquestion.OnePointInteration[0].xbegin,response.data.keepquestion.OnePointInteration[0].eq,e.target.value)
                            break
                           case "NewtonRaphson":
                            setselecteq(response.data.keepquestion.NewtonRaphson[0].eq)
                            setselectobg(response.data.keepquestion.NewtonRaphson)
                            setLatex(response.data.keepquestion.NewtonRaphson[0].eq)
                            settest({left:'0',right:'0',begin:response.data.keepquestion.NewtonRaphson[0].xbegin})
                            problem('0','0',response.data.keepquestion.NewtonRaphson[0].xbegin,response.data.keepquestion.NewtonRaphson[0].eq,e.target.value)
                           break
                           default:
                               break
                      }
                      // do something about response
                  })
                  
                  .catch(err => {
                      console.error(err)
                  })
                   
               }} className="border-b-2 m-0 border-zinc-700	">
                   <option value="Bisection" >BisectionMethod</option>
                   <option value="FalsePosition">FalsePositionMethod</option>
                   <option value="OnePointInteration" >OnePointInteration</option>
                   <option value="NewtonRaphson" >NewtonRaphson</option>
               </select>

               <select onChange={(e)=>{
                   setselecteq(e.target.value)
                   let B = JSON.parse(e.target.value)
                   problem(B.left,B.right,'0',B.eq,selectMethod)
                   setLatex(B.eq)
                    settest({left:B.left,right:B.right,begin:'0'})

               }} data-testid="select-problem" value={selecteq}>
                  {
                  selectobg.map(({ eq, left,right }) => (
            <option value={'{"eq":'+`"${eq}"`+','+'"left":'+left+','+'"right":'+right+'}'}>{eq}</option>
                    ))
                    }
               </select>

               <form onSubmit={handleSubmit}>
                <label>ใส่สมการ</label>
                <EditableMathField
                    style={{ display: "flex", color: "red", flexDirection: "column",width: "100px"}}
                    latex={latex}
                    data-testid="eq"
                    onChange={(mathField) => {
                        setLatex(mathField.latex())
                    }}
                />
                 {
                    selectMethod === "Bisection" &&  
                    <div>
                        <input value={test.left}  onChange={inputsHandler} name="left" placeholder={"ขอบเขตซ้าย"} data-testid="bileft"/>
                         <input value={test.right} onChange={inputsHandler} name="right" placeholder={"ขอบเขตขวา"} data-testid="biright"/>
                    </div>
                }
                {
                    selectMethod === "FalsePosition" &&  
                    <div>
                        <input value={test.left}  onChange={inputsHandler} name="left" placeholder={"ขอบเขตซ้าย"} data-testid="faileft"/>
                         <input value={test.right} onChange={inputsHandler} name="right" placeholder={"ขอบเขตขวา"} data-testid="failright"/>
                    </div>
                }
                {
                    selectMethod === "OnePointInteration" &&
                    <div>
                        <input value={test.begin}  onChange={inputsHandler} name="begin" placeholder={"ค่าเริ่มต้น"}/>
                    </div>
                }
                {
                    selectMethod === "NewtonRaphson" &&
                    <div>
                        <input value={test.begin}  onChange={inputsHandler} name="begin" placeholder={"ค่าเริ่มต้น"}/>
                    </div>
                }
                <button type="submit">submit</button>
                {/* <p>{latex.replace(/([-+]?[0-9]*\.?[0-9]+)(x)/g, '$1*$2').replace(/([-+]?[0-9]*\.?[0-9]+)(e)/g, '$1*$2').replace(/x/g,'-10').replace(/(e)([-+]?[0-9]*\.?[0-9]+)/g, '$1*$2').replace(/([-][0-9]*\.?[0-9]+)\^([-+]?[0-9]*\.?[0-9]+)/,'($1)^$2').replace(/\\frac{(.+)}{(.+)}/,'$1/$2').replace(/\\frac{([-+]?[0-9]*\.?[0-9]+)}{([-+]?[0-9]*\.?[0-9]+)}/,'$1/$2').replace(/\\sqrt{([-+]?[0-9]*\.?[0-9]+)}/,'sqrt($1)').replace(/\\sin/,'sin').replace(/\\cos/,'cos').replace(/\\tan/,'tan')}</p> */}
                {/* .replace(/([-+]?[0-9]*\.?[0-9]+)(x)/g, '$1*x').replace(/([-+]?[0-9]*\.?[0-9]+)(e)/g, '$1*e').replace(/{\\frac{([-+]?[0-9]*\.?[0-9]+)}{([-+]?[0-9]*\.?[0-9]+)}}/,'($1/$2)') */}
                {/* <p>{latex.replace(/x/g,'-3').replace(/\\sqrt{([-+]?[0-9]*\.?[0-9]+)}/,'sqrt($1)').replace(/\\sin/,'sin').replace(/\\cos/,'cos').replace(/\\tan/,'tan').replace(/\\frac{(.+)}{(.+)}/,'$1/$2').replace(/\\frac3)(2)/).replace(/{/g,'(').replace(/}/g,')').replace(/\\left\(/g,'(').replace(/\\right\)/g,')')}</p> */}
                <p>{latex.replace(/[^\\]*\\frac{(.+)}{(.+)}$/g,'$1/$2')}</p>

                <h2 data-testid="testgg">Result: {res}</h2>
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

        <div style={{ height: 650, width: 1000 }}>
                          <DataGrid
                          rows={dataTable}
                          columns={coloumnTable}
                          pageSize={10}
                          rowsPerPageOptions={[5]}
                          disableSelectionOnClick
                          />
                          </div>

    {/* <div>* static mathquill</div>
      <div>
        <StaticMathField>{latex}</StaticMathField>
      </div> */}
            {/* <h3>Result</h3>
      <h2>{fn}</h2> */}
            </form>
               
          </div>
          {/* <!-- /End replace --> */}
        </div>
      </main>


            {/* <nav>
                <ul>
                    <li>
                        <Link to="BisectionMethod">BisectionMethod</Link>{" "}
                        <Link to="FalsePosition">FalsePosition</Link>{" "}
                        <Link to="OnePointInteration">OnePointInteration</Link>{" "}
                        <Link to="NewtonRaphson">NewtonRaphson</Link>{" "}
                    </li>
                </ul>
            </nav>    */}
        </div>


    )
}
export default Home