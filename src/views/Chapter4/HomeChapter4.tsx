import React, { useState } from "react";
import * as math from 'mathjs'

const Home:React.FC =()=>{
    const [selectMethod,setselect] = useState("Linear_Regression");
    const [matrixSize, setMatrixSize] = useState({columns: 0,})
    const [matrixX, setmatrixX] = useState([0]);
    const [matrixX2, setmatrixX2] = useState([0]);
    const [matrixX3, setmatrixX3] = useState([0]);

    const [matrixY, setmatrixY] = useState([0]);
    const [resultmethod, setresult]:any = useState([]);




    const problem =(X:Array<number>,X2:Array<number>,X3:Array<number>,Y:Array<number>,method:string)=>{
        const Linear_Regression=()=>{
                    let Final_Answer = [];
                    let Prove_Answer = "";
                    // For Replace a with Final_Answer
                    var metX = X;
                    var metY = Y;
                    var n = metX.length;
                    var SumA = math.sum(metX);
                    var SumB = math.sum(metY);
                    var SumAB = math.sum(math.multiply(metX,metY));
                    var SumPowA = math.sum(math.multiply(metX,metX));
                    var metA = [[n, SumA], [SumA, SumPowA]];
                    var metB = [SumB, SumAB];
                    var count = 0;
                    let Xnew = []
                    let TempAnswer = 0
                    while (count < metA.length) {
                        Xnew = [[n, SumA], [SumA, SumPowA]];
                        // console.log(AnsMet)
                        for (let i = 0; i < metA.length; i++) {
                            Xnew[i][count] = metB[i];
                            // console.log(Xnew)
                        }
                        TempAnswer = (math.det(Xnew) / math.det(metA));
                        Final_Answer.push(
                            <p id={count.toString()}>
                                a{count} : {TempAnswer}
                            </p>
                        );
                        // if(count === 0)
                        // {
                        //     Prove_Answer = this.state.equation.replace(/a0/g,TempAnswer);
                        // } 
                        // else Prove_Answer = Prove_Answer.replace(/a1/g,TempAnswer);
                        console.log(`a${count.toString()} = ${TempAnswer}`)
    
                        count++;
                        console.log(TempAnswer);
                        console.log(Prove_Answer);
                    }
                    return Final_Answer

        }
        const Polynomial_Regression=()=>{
          let Final_Answer = [];
          // For Replace a with Final_Answer
          let Prove_Answer = "";
          var metX = X;
          var metY = Y;
          var n = metX.length;
          var SumA = math.sum(metX);
          var SumB = math.sum(metY);
          var SumAB = math.sum(math.multiply(metX,metY));
          var SumPow2A = math.sum(math.multiply(metX,metX));
          var SumPow3A = 0;
          var SumPow4A = 0; 
          var SumPowAB = 0;
          for(let i = 0; i < n; i++)
          {
              SumPow3A+=Math.pow(metX[i],3);
              SumPow4A+=Math.pow(metX[i],4);
              SumPowAB+=Math.pow(metX[i],2)*metY[i];
          }

          var metA = [[n, SumA, SumPow2A], [SumA, SumPow2A, SumPow3A], [SumPow2A, SumPow3A, SumPow4A]];
          var metB = [SumB, SumAB, SumPowAB];

          let count = 0;
          let Xnew = [];
          let TempAnswer = 0

          while (count < metA.length) {
              Xnew = [[n, SumA, SumPow2A], [SumA, SumPow2A, SumPow3A], [SumPow2A, SumPow3A, SumPow4A]];
              for (let i = 0; i < metA.length; i++) {
                  Xnew[i][count] = metB[i];
              }
              TempAnswer = (math.det(Xnew) / math.det(metA));
              Final_Answer.push(
                  <p id={count.toString()}>
                      a{count} : {TempAnswer}
                  </p>
              );
              // if(count === 0) Prove_Answer = this.state.equation.replace(/a0/g,TempAnswer);
              // else if(count === 1) Prove_Answer = Prove_Answer.replace(/a1/g,TempAnswer);
              // else Prove_Answer = Prove_Answer.replace(/a2/g,TempAnswer);

              count++;
        }
        return Final_Answer
      }
        const Multiple_Linear_Regression=()=>{
          let Final_Answer = [];
          // For Replace a with Final_Answer
          let Prove_Answer = "";
          var met1 = X;
          var met2 = X2;
          var met3 = X3;
          var metY = Y;
          var n = met1.length;
          var Sum1 = math.sum(met1);
          var Sum2 = math.sum(met2);
          var Sum3 = math.sum(met3);
          var SumY = math.sum(metY);
          var SumPow2met1 = math.sum(math.multiply(met1,met1));
          var SumPow2met2 = math.sum(math.multiply(met2,met2));
          var SumPow2met3 = math.sum(math.multiply(met3,met3));
          var Mulmet1met2 = math.sum(math.multiply(met1,met2));
          var Mulmet1met3 = math.sum(math.multiply(met1,met3));
          var Mulmet2met3 = math.sum(math.multiply(met2,met3));
          var Summet1metY = math.sum(math.multiply(met1,metY));
          var Summet2metY = math.sum(math.multiply(met2,metY));
          var Summet3metY = math.sum(math.multiply(met3,metY));
       
          var metA = [[n, Sum1, Sum2, Sum3], 
                      [Sum1, SumPow2met1, Mulmet1met2, Mulmet1met3], 
                      [Sum2, Mulmet1met2, SumPow2met2, Mulmet2met3],
                      [Sum3, Mulmet1met3, Mulmet2met3, SumPow2met3]];

          var metB = [SumY, Summet1metY, Summet2metY, Summet3metY];

          let count = 0;
          let Xnew = []
          let TempAnswer = 0
          console.log(met1,metY);
          while (count < metA.length) {
              Xnew = [[n, Sum1, Sum2, Sum3], 
                      [Sum1, SumPow2met1, Mulmet1met2, Mulmet1met3], 
                      [Sum2, Mulmet1met2, SumPow2met2, Mulmet2met3],
                      [Sum3, Mulmet1met3, Mulmet2met3, SumPow2met3]];;
              for (let i = 0; i < metA.length; i++) {
                  Xnew[i][count] = metB[i];
              }
              TempAnswer = (math.det(Xnew) / math.det(metA));
              Final_Answer.push(
                  <p id={count.toString()}>
                      a{count} : {TempAnswer}
                  </p>
              );
              // if(count === 0) 
              // {
              //     Prove_Answer = this.state.equation.replace(/a0/g,TempAnswer);
              // }
              // else if(count === 1) 
              // {
              //     Prove_Answer = Prove_Answer.replace(/a1/g,TempAnswer);
              //     Prove_Answer = Prove_Answer.replace(/x1/g,this.state.X1);
              // }
              // else if(count === 2) 
              // {
              //     Prove_Answer = Prove_Answer.replace(/a2/g,TempAnswer);
              //     Prove_Answer = Prove_Answer.replace(/x2/g,this.state.X2);
              // }
              // else {
              //     Prove_Answer = Prove_Answer.replace(/a3/g,TempAnswer);
              //     Prove_Answer = Prove_Answer.replace(/x3/g,this.state.X3);
              // }
              count++;
          }
          return Final_Answer
            
        }

        switch(method){
            case "Linear_Regression":
              setresult(
                <div>
                  <h4>Equation</h4>
                  {Linear_Regression()}
                </div>
              )
                break
            case "Polynomial_Regression":
              setresult(
                <div>
                  <h4>Equation</h4>
                  {Polynomial_Regression()}
                </div>
              )
                break
            case "Multiple_Linear_Regression":
              setresult(
                <div>
                  <h4>Equation</h4>
                  {Multiple_Linear_Regression()}
                </div>
              )
                break
        }

    }
    const handleSubmit = async (e:any)=> {
        problem(matrixX,matrixX2,matrixX3,matrixY,selectMethod)
          // console.log("matrixA is "+matrixA)
          // console.log("matrixB is "+matrixB)
          e.preventDefault();
        }
    const inputMatrixX = () => {
  
        var matrixBoxX = [];
    
        for (let columns = 0; columns < matrixSize.columns; columns++) {
            matrixBoxX.push(<input id={columns.toString()} type="text" onChange={handleMatrixXInput} />)
            matrixBoxX.push(<br />)
        }
    
        return matrixBoxX
    }
    const inputMatrixX2 = () => {
  
      var matrixBoxX2 = [];
  
      for (let columns = 0; columns < matrixSize.columns; columns++) {
          matrixBoxX2.push(<input id={columns.toString()} type="text" onChange={handleMatrixX2Input} />)
          matrixBoxX2.push(<br />)
      }
  
      return matrixBoxX2
  }
  const inputMatrixX3 = () => {
  
    var matrixBoxX3 = [];

    for (let columns = 0; columns < matrixSize.columns; columns++) {
        matrixBoxX3.push(<input id={columns.toString()} type="text" onChange={handleMatrixX3Input} />)
        matrixBoxX3.push(<br />)
    }

    return matrixBoxX3
}
    const inputMatrixY = () => {
  
        var matrixBoxY = [];
    
        for (let columns = 0; columns < matrixSize.columns; columns++) {
            matrixBoxY.push(<input id={columns.toString()} type="text" onChange={handleMatrixYInput} />)
            matrixBoxY.push(<br />)
        }
    
        return matrixBoxY
    }
    const handleMatrixXInput = async (e:any)=> {
        console.log("Input index B "+e.target.id)
        console.log("Input value B "+e.target.value)
        let rowsid = parseInt(e.target.id);
        console.log("row "+rowsid)
     
        let temp_matrix:any  = JSON.stringify(matrixX)
        if (typeof (matrixX) === 'string') {
         temp_matrix = JSON.parse(matrixX)
       }
       if(temp_matrix.length < 2){
         temp_matrix = []
         console.log("length is "+temp_matrix.length)
         temp_matrix = new Array(matrixSize.columns).fill(0)
     
       }
       else {
         temp_matrix = JSON.parse(JSON.stringify(matrixX))
       }
       temp_matrix[rowsid] = parseInt(e.target.value)
       setmatrixX(temp_matrix)
         e.preventDefault();
     }
     const handleMatrixX2Input = async (e:any)=> {
      console.log("Input index B "+e.target.id)
      console.log("Input value B "+e.target.value)
      let rowsid = parseInt(e.target.id);
      console.log("row "+rowsid)
   
      let temp_matrix:any  = JSON.stringify(matrixX2)
      if (typeof (matrixX2) === 'string') {
       temp_matrix = JSON.parse(matrixX2)
     }
     if(temp_matrix.length < 2){
       temp_matrix = []
       console.log("length is "+temp_matrix.length)
       temp_matrix = new Array(matrixSize.columns).fill(0)
   
     }
     else {
       temp_matrix = JSON.parse(JSON.stringify(matrixX2))
     }
     temp_matrix[rowsid] = parseInt(e.target.value)
     setmatrixX2(temp_matrix)
       e.preventDefault();
   }
   const handleMatrixX3Input = async (e:any)=> {
    console.log("Input index B "+e.target.id)
    console.log("Input value B "+e.target.value)
    let rowsid = parseInt(e.target.id);
    console.log("row "+rowsid)
 
    let temp_matrix:any  = JSON.stringify(matrixX3)
    if (typeof (matrixX3) === 'string') {
     temp_matrix = JSON.parse(matrixX3)
   }
   if(temp_matrix.length < 2){
     temp_matrix = []
     console.log("length is "+temp_matrix.length)
     temp_matrix = new Array(matrixSize.columns).fill(0)
 
   }
   else {
     temp_matrix = JSON.parse(JSON.stringify(matrixX3))
   }
   temp_matrix[rowsid] = parseInt(e.target.value)
   setmatrixX3(temp_matrix)
     e.preventDefault();
 }
     const handleMatrixYInput = async (e:any)=> {
        console.log("Input index B "+e.target.id)
        console.log("Input value B "+e.target.value)
        let rowsid = parseInt(e.target.id);
        console.log("row "+rowsid)
     
        let temp_matrix:any  = JSON.stringify(matrixY)
        if (typeof (matrixY) === 'string') {
         temp_matrix = JSON.parse(matrixY)
       }
       if(temp_matrix.length < 2){
         temp_matrix = []
         console.log("length is "+temp_matrix.length)
         temp_matrix = new Array(matrixSize.columns).fill(0)
     
       }
       else {
         temp_matrix = JSON.parse(JSON.stringify(matrixY))
       }
       temp_matrix[rowsid] = parseInt(e.target.value)
       setmatrixY(temp_matrix)
         e.preventDefault();
     }

    return(
        <div>
            <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Chapter4:{selectMethod}</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* <!-- Replace with your content --> */}
          <div className="px-4 py-6 sm:px-0">
          <select onChange={(e)=>{
                setselect(e.target.value)
                // problem(e.target.value)
            }}>
                <option value="Linear_Regression">Linear_Regression</option>
                <option value="Polynomial_Regression">Polynomial_Regression</option>
                <option value="Multiple_Linear_Regression">Multiple_Linear_Regression</option>
            </select>
            <form onSubmit={handleSubmit}>
            <input
              type="number"
              className="border-b-2 m-0 border-zinc-700	"
              placeholder="column"
              onChange={e => {
                const columns = parseInt(e.target.value)
                // if we only want matrix of size between 2 and 8
                if (2 <= columns && columns <= 9) {
                  setMatrixSize(prevSize => ({
                    ...prevSize,
                    columns: columns,
                  }))
                }
              }}
              />
            <div className="input_matrix">
              {
                selectMethod !== "Multiple_Linear_Regression" &&
                <div className="input_matrix">
                <div className="column_matrixA">
                <label>X</label>
                    <div>
                    {inputMatrixX()}
                    </div>
                </div>

                <div className="column_matrixB">
                <label>Y</label>
                    <div>
                    {inputMatrixY()}
                    </div>
                </div>

                </div>
              }

                {selectMethod === "Multiple_Linear_Regression" &&
                <div className="input_matrix">
                  <div className="column_matrixA">
                  <label>X1</label>
                      <div>
                      {inputMatrixX()}
                      </div>
                  </div>
                  <div className="column_matrixA">
                      <label>X2</label>
                                    <div>
                  {inputMatrixX2()}
                      </div>
                  </div>
                  <div className="column_matrixA">
                      <label>X3</label>
                                    <div>
                  {inputMatrixX3()}
                      </div>
                  </div>
                  <div className="column_matrixB">
                <label>Y</label>
                    <div>
                    {inputMatrixY()}
                    </div>
                </div>
                </div>
                }
            </div>
            <input type="submit" name="submit"/>
            </form>
            {
              selectMethod === "Linear_Regression" &&
              <div>
                {resultmethod}
              </div>
            }
            {
              selectMethod === "Polynomial_Regression" &&
              <div>
                {resultmethod}
              </div>
            }
            {
              selectMethod === "Multiple_Linear_Regression" &&
              <div>
                {resultmethod}
              </div>
            }
          </div>
          {/* <!-- /End replace --> */}
        </div>
      </main>
        </div>
    )
}
export default Home