import React, { useEffect, useState } from "react";
import {Link, Route, Routes,Router} from "react-router-dom";
import { MathJax, MathJaxContext } from "better-react-mathjax";


import { addStyles, EditableMathField,StaticMathField} from "react-mathquill"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,AreaChart,Area, Brush,ReferenceLine } from 'recharts';
import axios from "axios";
import * as mathjs from "mathjs";
import { index } from "mathjs";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from "@mui/material/InputLabel";
import { Box, FormControl } from "@mui/material";


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
    var [token,settoken] = useState(' ')

    const [dataTable, setdataTable] = useState([{id: 1}]);
    const [coloumnTable, setcoloumnTable] = React.useState<GridColDef[]>([])


    const datas :setgraph[]= []
    const dataserror :seterror[]= []
    const datasetplotgraph :setplotgraph[]= []

    const [selectobg,setselectobg] = useState([])
    const [selecteq,setselecteq] = useState(`{"eq":"x^4-13","left":1.5,"right":2,"xbegin":0}`)

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
            let rows:any = []
            let n:number = 1

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
                  let obg:any = {
                    id: n
                  }
                    obg = Object.assign(obg, { ["X2"]: X2,["Error"]:error})
                    rows.push(obg)

                  dataserror.push(newerror)
                  datas.push(newCar)
                  n++
            }
            
            columns.push({ field: 'X2', headerName: 'X2', width: 300 },
            { field: 'Error', headerName: 'Error', width: 300 })
            setCars(datas)
            setError(dataserror)
            setcoloumnTable(columns)
            setdataTable(rows)

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
        let tokenStr = '';
        axios.post('https://jsonservernumerical.herokuapp.com/login', {
          "email":"y-title@hotmail.com",
          "password":"Numer2022"
        })
        .then(function (response) {
          settoken(response.data.accessToken)
          axios.get("https://jsonservernumerical.herokuapp.com/RootofEquation",{ headers: {
            "Authorization": `Bearer ${response.data.accessToken}` 
          } })
          .then(response => {
            console.log(response)
            setselectobg(response.data.Bisection)
            setLatex(response.data.Bisection[0].eq)
            settest({left:response.data.Bisection[0].left,right:response.data.Bisection[0].right,begin:'0'})
            problem(response.data.Bisection[0].left,response.data.Bisection[0].right,response.data.Bisection[0].xbegin,response.data.Bisection[0].eq,"Bisection")
              // do something about response
          })
        })
        .catch(function (error) {
          console.log(error);
        });
        

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
          <Box sx={{ m: 1, minWidth: 500 }}>
            <FormControl fullWidth>
            <InputLabel id="demo-simple-select-method">Method</InputLabel>
            <Select 
              labelId="demo-simple-select-method"
              id="demo-simple-select"           
              label="Method"
              value={selectMethod}
              inputProps={{
                "data-testid":"select-option" 
              }} 
              onChange={(e)=>{
                   const sel = e.target.value;
                   setcoloumnTable([])
                   setselect(sel)
                          //  let tokenStr = 'tle1234';


                   axios.get("https://jsonservernumerical.herokuapp.com/RootofEquation",{ headers: {
                      "Authorization": `Bearer ${token}` 
                    } })
                  .then(response => {              
                      switch(e.target.value){
                          case "Bisection":
                            setselecteq(JSON.stringify(response.data.Bisection[0]))
                            setselectobg(response.data.Bisection)
                           setLatex(response.data.Bisection[0].eq)
                           settest({left:response.data.Bisection[0].left,right:response.data.Bisection[0].right,begin:response.data.Bisection[0].xbegin})
                           problem(response.data.Bisection[0].left,response.data.Bisection[0].right,response.data.Bisection[0].xbegin,response.data.Bisection[0].eq,e.target.value)
                        //    const desmoslatex:string = "y="+response.data.keepquestion.Bisection[0].eq;
                        //    calculator.setExpression({ id: 'graph1', latex: desmoslatex });
                           break
                           case "FalsePosition":
                            setselecteq(JSON.stringify(response.data.FalsePosition[0]))
                            setselectobg(response.data.FalsePosition)
                            setLatex(response.data.FalsePosition[0].eq)
                            settest({left:response.data.FalsePosition[0].left,right:response.data.FalsePosition[0].right,begin:response.data.FalsePosition[0].xbegin})
                            problem(response.data.FalsePosition[0].left,response.data.FalsePosition[0].right,response.data.FalsePosition[0].xbegin,response.data.FalsePosition[0].eq,e.target.value)

                           break
                           case "OnePointInteration":
                            setselecteq(JSON.stringify(response.data.OnePointInteration[0]))
                            console.log(JSON.stringify(response.data.OnePointInteration[0]))
                            setselectobg(response.data.OnePointInteration)
                           setLatex(response.data.OnePointInteration[0].eq)
                           settest({left:response.data.OnePointInteration[0].left,right:response.data.OnePointInteration[0].right,begin:response.data.OnePointInteration[0].xbegin})
                           problem(response.data.OnePointInteration[0].left,response.data.OnePointInteration[0].right,response.data.OnePointInteration[0].xbegin,response.data.OnePointInteration[0].eq,e.target.value)
                            break
                           case "NewtonRaphson":
                            setselecteq(JSON.stringify(response.data.NewtonRaphson[0]))
                            setselectobg(response.data.NewtonRaphson)
                            setLatex(response.data.NewtonRaphson[0].eq)
                            settest({left:response.data.NewtonRaphson[0].left,right:response.data.NewtonRaphson[0].right,begin:response.data.NewtonRaphson[0].xbegin})
                            problem(response.data.NewtonRaphson[0].left,response.data.NewtonRaphson[0].xbeginright,response.data.NewtonRaphson[0].xbegin,response.data.NewtonRaphson[0].eq,e.target.value)
                           break
                           default:
                               break
                      }
                      // do something about response
                  })
                  
                  .catch(err => {
                      console.error(err)
                  })
                   
               }} className="border-b-2 m-0 border-zinc-300">
                   <MenuItem value="Bisection" >BisectionMethod</MenuItem>
                   <MenuItem value="FalsePosition">FalsePositionMethod</MenuItem>
                   <MenuItem value="OnePointInteration" >OnePointInteration</MenuItem>
                   <MenuItem value="NewtonRaphson" >NewtonRaphson</MenuItem>
              </Select>
              </FormControl>
              </Box>
            <Box sx={{ m: 1, minWidth: 500 }}>
            <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Problem</InputLabel>
            <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"           
            label="problem"
            value={selecteq}
            inputProps={{
              "data-testid":"select-problem" 
            }}
            onChange={(e)=>{
                  console.log(e.target.value)
                   setselecteq(e.target.value)
                   let B = JSON.parse(e.target.value)
                   problem(B.left,B.right,B.xbegin,B.eq,selectMethod)
                   setLatex(B.eq)
                    settest({left:B.left,right:B.right,begin:B.xbegin})

               }} className="border-b-2 m-0 border-zinc-300">
                  {
                  selectobg.map(({ eq, left,right,xbegin }) => (
            <MenuItem value={'{"eq":'+`"${eq}"`+','+'"left":'+left+','+'"right":'+right+','+'"xbegin":'+xbegin+'}'}>
                <MathJaxContext>
              <MathJax>{`\\(${eq}\\)`}</MathJax>
            </MathJaxContext>
            </MenuItem>
                    ))
                  }

              </Select>
              </FormControl>
              </Box>

               <form onSubmit={handleSubmit}>

                   <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      ใส่สมการ
                    </label>
                    <EditableMathField
                    style={{ display: "flex", color: "black", flexDirection: "column",width: "270px",height:"50px",border: "1px solid gray",borderRadius:"5px",padding:"6px 0px 0px 15px",fontSize:"20px"}}
                    latex={latex}
                    data-testid="eq"
                    onChange={(mathField) => {
                        setLatex(mathField.latex())
                    }}
                />
                  </div>
                 {
                    selectMethod === "Bisection" &&
                    <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        ขอบเขตซ้าย                        
                        </label>
                        <input value={test.left}  onChange={inputsHandler} className="appearance-none block w-full bg-white-200 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-last-name" name="left" placeholder={"ขอบเขตซ้าย"} data-testid="bileft"/>
                      </div>
                      <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                          ขอบเขตขวา
                        </label>
                        <input value={test.right} className="appearance-none block w-full bg-white-200 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" onChange={inputsHandler} name="right" placeholder={"ขอบเขตขวา"} data-testid="biright"/>
                        <button className="shadow bg-gray-800 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">submit</button>

                      </div>
                      </div>
                    </div>

                }
                {
                    selectMethod === "FalsePosition" &&  
                    <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        ขอบเขตซ้าย                        
                        </label>
                        <input value={test.left}  onChange={inputsHandler} className="appearance-none block w-full bg-white-200 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-last-name" name="left" placeholder={"ขอบเขตซ้าย"} data-testid="failleft"/>
                      </div>
                      <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                          ขอบเขตขวา
                        </label>
                        <input value={test.right} className="appearance-none block w-full bg-white-200 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" onChange={inputsHandler} name="right" placeholder={"ขอบเขตขวา"} data-testid="failright"/>
                        <button className="shadow bg-gray-800 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">submit</button>

                      </div>
                      </div>
                    </div>
                }
                {
                    selectMethod === "OnePointInteration" &&
                    <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        ค่าเริ่มต้น
                        </label>
                        <input value={test.begin} className="appearance-none block w-full bg-white-200 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" onChange={inputsHandler} name="begin" placeholder={"ค่าเริ่มต้น"}/>
                        <button className="shadow bg-gray-800 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">submit</button>

                      </div>
                      </div>
                    </div>
                }
                {
                    selectMethod === "NewtonRaphson" &&
                    <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        ค่าเริ่มต้น
                        </label>
                        <input value={test.begin} className="appearance-none block w-full bg-white-200 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" onChange={inputsHandler} name="begin" placeholder={"ค่าเริ่มต้น"}/>
                        <button className="shadow bg-gray-800 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">submit</button>

                      </div>
                      </div>
                    </div>
                }
                {/* <p>{latex.replace(/([-+]?[0-9]*\.?[0-9]+)(x)/g, '$1*$2').replace(/([-+]?[0-9]*\.?[0-9]+)(e)/g, '$1*$2').replace(/x/g,'-10').replace(/(e)([-+]?[0-9]*\.?[0-9]+)/g, '$1*$2').replace(/([-][0-9]*\.?[0-9]+)\^([-+]?[0-9]*\.?[0-9]+)/,'($1)^$2').replace(/\\frac{(.+)}{(.+)}/,'$1/$2').replace(/\\frac{([-+]?[0-9]*\.?[0-9]+)}{([-+]?[0-9]*\.?[0-9]+)}/,'$1/$2').replace(/\\sqrt{([-+]?[0-9]*\.?[0-9]+)}/,'sqrt($1)').replace(/\\sin/,'sin').replace(/\\cos/,'cos').replace(/\\tan/,'tan')}</p> */}
                {/* .replace(/([-+]?[0-9]*\.?[0-9]+)(x)/g, '$1*x').replace(/([-+]?[0-9]*\.?[0-9]+)(e)/g, '$1*e').replace(/{\\frac{([-+]?[0-9]*\.?[0-9]+)}{([-+]?[0-9]*\.?[0-9]+)}}/,'($1/$2)') */}
                {/* <p>{latex.replace(/x/g,'-3').replace(/\\sqrt{([-+]?[0-9]*\.?[0-9]+)}/,'sqrt($1)').replace(/\\sin/,'sin').replace(/\\cos/,'cos').replace(/\\tan/,'tan').replace(/\\frac{(.+)}{(.+)}/,'$1/$2').replace(/\\frac3)(2)/).replace(/{/g,'(').replace(/}/g,')').replace(/\\left\(/g,'(').replace(/\\right\)/g,')')}</p> */}
                {/* <p>{latex}</p>
                <p>{latex.replace(/([-+]?[0-9]*\.?[0-9]+)(x)/g, '$1*x').replace(/([-+]?[0-9]*\.?[0-9]+)(e)/g, '$1*e').replace(/\\frac{([-+]?[0-9]*\.?[0-9]+)}{([-+]?[0-9]*\.?[0-9]+)}/,'$1/$2').replace(/\\sqrt{([-+]?[0-9]*\.?[0-9]+)}/,'sqrt($1)').replace(/{/g,'(').replace(/}/g,')')}</p> */}

                <div className="py-3">
                    <div className="rounded-t-lg shadow-xl hover:drop-shadow-xl">
                      <h1 className="text-center text-2xl">Answer is ....</h1>
                      <h2 className="flex-1 text-center text-xl py-2" data-testid="testgg">Result: {res}</h2>
                    </div>
                  </div>
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