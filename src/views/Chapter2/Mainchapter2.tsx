import React, { useState,useEffect } from "react";
import {Paper,Table,TableBody,TableCell,TableContainer,TableHead,TablePagination,TableRow} from '@mui/material';
import * as math from 'mathjs'
import axios from "axios";
import { display, margin } from "@mui/system";
import { typeOf } from "mathjs";

interface body{
    name:string
}
const Mainchapter2:React.FC<body>=(props)=>{
    const [matrixSize, setMatrixSize] = useState({
      rows: 0,
      columns: 0,
    })
    const[resultmatrix,setresult] = useState([0]);

  const [matrixA, setmatrixA] = useState([0]);
  const [matrixB, setmatrixB] = useState([0]);


    console.log(matrixSize)
    let tokenStr = 'tle1234';



    const inputMatrixA = () => {

      var matrixBoxA = [];

      for (let row = 0; row < matrixSize.rows; row++) {
          for (let column = 0; column < matrixSize.columns; column++) {
              matrixBoxA.push(<input id={row + "," + column} type="text" onChange={handleMatrixAInput}/>)
          }
          matrixBoxA.push(<br />)
      }

      return matrixBoxA
  }
  const inputMatrixB = () => {

    var matrixBoxB = [];

    for (let row = 0; row < matrixSize.rows; row++) {
        matrixBoxB.push(<input id={row.toString()} type="text" onChange={handleMatrixBInput} />)
        matrixBoxB.push(<br />)
    }

    return matrixBoxB
}
  const handleMatrixAInput = async (e:any)=> {
      let matrix = Array(matrixSize.rows)

      for (let i = 0; i < matrixSize.rows; i++) {
        matrix[i] = new Array(matrixSize.columns).fill(0)
      }
      let temp_matrix:any  = JSON.stringify(matrixA)

      if (typeof (matrixA) === 'string') {
        temp_matrix = JSON.parse(matrixA)
    }
    else {
      temp_matrix = JSON.parse(JSON.stringify(matrixA))
    }
    if (temp_matrix.length < 2) {
      temp_matrix = []
      for (let rows = 0; rows < matrixSize.rows; rows++) {
        temp_matrix.push(new Array(matrixSize.columns).fill(0))
      }
  }
      console.log("tempmatrix "+temp_matrix)
      let rows = e.target.id.split(",")[0];
      let colunms = e.target.id.split(",")[1]
      console.log(e.target.value)
      console.log(temp_matrix)

      temp_matrix[rows][colunms] = parseInt(e.target.value)
      setmatrixA(temp_matrix)
    console.log("matrix "+temp_matrix)

      e.preventDefault();
  }
  const handleMatrixBInput = async (e:any)=> {
   console.log("Input index B "+e.target.id)
   console.log("Input value B "+e.target.value)
   let rowsid = parseInt(e.target.id);
   console.log("row "+rowsid)

   let temp_matrix:any  = JSON.stringify(matrixB)
   if (typeof (matrixB) === 'string') {
    temp_matrix = JSON.parse(matrixB)
  }
  if(temp_matrix.length < 2){
    temp_matrix = []
    console.log("length is "+temp_matrix.length)
    temp_matrix = new Array(matrixSize.rows).fill(0)

  }
  else {
    temp_matrix = JSON.parse(JSON.stringify(matrixB))
  }

  //  matrix.push(parseInt(e.target.value))
  //  console.log(matrix)
  //  for(let i = 0;i < matrixSize.rows;i++){
  //   matrix[i] = parseInt(e.target.value)
  //  }

  temp_matrix[rowsid] = parseInt(e.target.value)
  setmatrixB(temp_matrix)

  // console.log(temp_matrix)


  // try{
  // }
  // catch(e){
  //   console.log(e)
  // }
  


    e.preventDefault();
}

const problem =(mA:Array<number>,mB:Array<number>)=>{
  console.log("type ma is "+mA)
      const Cramer = ()=>{
        let A:Array<Array<number>> = JSON.parse(JSON.stringify(mA))
        let B:Array<number> = JSON.parse(JSON.stringify(mB))
        let temp_A:Array<Array<number>> = []
        
        let X:Array<number> = []
            console.log(A.length)
        for(let i = 0; i < A.length;i++){
            temp_A = JSON.parse(JSON.stringify(A));
          for(let j = 0;j < A[i].length;j++){
            temp_A[j][i] = B[j]
          }
  
          console.log(temp_A)
          console.log("det is "+math.det(temp_A))
          let X_x = math.det(temp_A)/math.det(A)
          X.push(X_x)
  
        }
        return X
      }
      const Jacobi = () =>{
        // const a = [[5,2,0,0],
        //                 [2,5,2,0],
        //                 [0,2,5,2],
        //                 [0,0,2,5]]
        let a:Array<Array<number>> = JSON.parse(JSON.stringify(mA))

  
        // const b = [12,17,14,7]
        let b:Array<number> = JSON.parse(JSON.stringify(mB))

        let A = []
        let x_old = [0,0,0,0]
        let x_new = []
        let xsome:any = []
        let n = 1
        let error = [1,1,1,1]
  
        const checkerror =(checkerror:any)=>{
              for(let i = 0;i < checkerror.length;i++){
                  if(checkerror[i] > 0.000001){
                      return true
                  }
              }
              return false
          }
          while(checkerror(error)){
            for(let i = 0;i < a.length;i++){
            A[i] = b[i]
            for(let j = 0;j < a[i].length;j++){
                if(i == j){
                    xsome = a[i][j]
                }
                if(i != j){
                    let c = a[i][j]*x_old[j]
                    A[i] = A[i]-c
                }
            }
            x_new[i] = A[i]/xsome
  
        }
        console.log("xnew2 is "+x_new)
        for(let i = 0;i < a.length;i++){
            error[i] = Math.abs((x_new[i]-x_old[i])/x_new[i])
        }
  
  
        x_old = JSON.parse(JSON.stringify(x_new))
        console.log(x_old)
  
        console.log("error is "+error)
        console.log("round "+n)
        n++
        }
      }
      const Gaiss_seidel = () => {
        // const a = [[5,2,0,0],
        //                 [2,5,2,0],
        //                 [0,2,5,2],
        //                 [0,0,2,5]]
  
        // const b = [12,17,14,7]

        let a:Array<Array<number>> = JSON.parse(JSON.stringify(mA))

  
        // const b = [12,17,14,7]
        let b:Array<number> = JSON.parse(JSON.stringify(mB))
        let A = []
        let x_old = [0,0,0,0]
        let x_new = [0,0,0,0]
        let xsome:any = []
        let n = 1
        let error = [1,1,1,1]
  
        const checkerror =(checkerror:any)=>{
          for(let i = 0;i < checkerror.length;i++){
              if(checkerror[i] > 0.000001){
                  return true
              }
          }
          return false
      }
  
      while(checkerror(error)){
        for(let i = 0;i < a.length;i++){
        A[i] = b[i]
        for(let j = 0;j < a[i].length;j++){
            if(i == j){
                xsome = a[i][j]
            }
            if(i != j){
                let c = a[i][j]*x_new[j]
                A[i] = A[i]-c
            }
        }
        x_new[i] = A[i]/xsome
        
    }
    console.log("temp is "+x_new)
    for(let i = 0;i < a.length;i++){
        error[i] = Math.abs((x_new[i]-x_old[i])/x_new[i])
    }
  
  
    x_old = JSON.parse(JSON.stringify(x_new))
    console.log(x_old)
  
    console.log("error is "+error)
    console.log("round "+n)
    n++
    }
  
      }
      const conjugate = () => {
        let A:Array<Array<number>> = JSON.parse(JSON.stringify(mA))

  
        // const b = [12,17,14,7]
        let B:Array<number> = JSON.parse(JSON.stringify(mB))
      
        // let A:Array<Array<number>> = [[5,2,0,0],
        //                                                 [2,5,2,0],
        //                                                 [0,2,5,2],
        //                                                 [0,0,2,5]]
        let X:Array<number> = [0,0,0,0]
        // let B:Array<number> = [12,17,14,7]
  
        let R:any = math.subtract(math.multiply(A,X),B) ;
        let D:any = math.multiply(R,-1);
        let CheckError:number = 1
  
  
  
          while (CheckError > 0.000001){
            let lamda = math.divide((math.multiply(math.multiply(math.transpose(D), -1),R)),math.multiply(math.transpose(D), math.multiply(A,D)));
          
        
            let X1 = math.add(X,math.multiply(D,lamda))
            let R1:any = math.subtract(math.multiply(A,X1),B)
            let Error = math.sqrt(math.multiply(math.transpose(R1),R1))
            let alpha = math.divide(math.multiply( math.transpose(R1) , math.multiply(A,D) ),math.multiply( math.transpose(D) , math.multiply(A,D) ))
            let D1 = math.add( math.multiply(R1,-1) , math.multiply(D,alpha) );
          
          console.log(
            " X = [ "+X.valueOf().toString() + " ]\n"+
            "R = [ "+R.valueOf().toString() + " ]\n" +
            "D = [ "+D.valueOf().toString() + " ]\n"+
            "lamda = "+lamda.valueOf().toString() + "\n" +
            "Xloop = "+X1.valueOf().toString() + "\n" +
            "alpha = "+alpha.valueOf().toString() + "\n" +
            "D1 = "+D1.valueOf().toString() + "\n" +
            "Error = "+Error.valueOf().toString() + "\n"
        );
            X = JSON.parse(JSON.stringify(X1))
            R = R1 
            D = D1 
            CheckError = Error
          }
        }
      
      switch(props.name){
          case "Cramer's_Rule":
              setresult(Cramer())
              break;
          case "Jacobi_Iteration":
              Jacobi()
              break
          case "Gauss_Seidal":
              Gaiss_seidel()
              break
          case "Conjugate":
            conjugate()
            break     
      }
    }
    const handleSubmit = async (e:any)=> {
      problem(matrixA,matrixB)
      console.log("matrixA is "+matrixA)
      console.log("matrixB is "+matrixB)
      e.preventDefault();
    }


    


    return(
        <div>
            <h1>Chapter 2:{props.name}</h1>
            <form onSubmit={handleSubmit}>
              <input
              type="number"
              onChange={e => {
                const rows = parseInt(e.target.value)
                // if we only want matrix of size between 2 and 8
                if (2 <= rows && rows <= 8) {
                  setMatrixSize(prevSize => ({
                    ...prevSize,
                    rows: rows,
                  }))
                }
              }}
              />
              <input
              type="number"
              onChange={e => {
                const columns = parseInt(e.target.value)
                // if we only want matrix of size between 2 and 8
                if (2 <= columns && columns <= 8) {
                  setMatrixSize(prevSize => ({
                    ...prevSize,
                    columns: columns,
                  }))
                }
              }}
              />
              <h1>row: {matrixSize.rows}</h1>
              <h1>columns: {matrixSize.columns}</h1>
              <div className="input_matrix">
                <div className="column_matrixA">
                <label>MatrixA</label>
                    <div>
                    {inputMatrixA()}
                    </div>
                </div>

                <div className="column_matrixB">
                <label>MatrixB</label>
                    <div>
                    {inputMatrixB()}
                    </div>
                </div>

              </div>
              <br/>
              <input type="submit" name="submit"/>
              {
                props.name === "Cramer's_Rule" &&
                <div>{resultmatrix}</div>
              }
              </form>
        </div>
    );

}

export default Mainchapter2