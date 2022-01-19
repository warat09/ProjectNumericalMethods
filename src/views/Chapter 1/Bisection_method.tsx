import React, {ChangeEvent,useState,useEffect }from "react";
import functionPlot from "function-plot";
var Latex = require('react-latex');



const Bisection_method:React.FC =()=>{
    const [test,settest] = useState({eqution:' ',left: ' ',right:' '})
    const [someState, setSomeState] = useState(<Latex>What is $x^2+b^3$</Latex>);





    const inputsHandler = (e:any) => {
        settest({ ...test, [e.target.name]: e.target.value });
    };
    const submitButton = () =>{
        const kartex = () => {
            <Latex>What is $x^2+b^3$</Latex>
        }
        functionPlot({
            title: 'x^2',
            target: '#test',
            width: 580,
            height: 400,
            data: [{
                fn: 'x^2',
            }],
            annotations: [{
                x: -1,
                text: 'x = -1'
            }, {
                x: 1,
                text: 'x = 1'
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
            <Latex>What is $x^2+b^3$</Latex>
            <input onChange={inputsHandler} name="eqution" value={test.eqution}/>
            <button onClick={submitButton}>6666</button>
            <h1>{Bisection()}</h1>
            <p>{test.eqution}</p>
            <div id="test"></div>



        </div>
    );
}
export default Bisection_method