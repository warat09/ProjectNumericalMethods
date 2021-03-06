import React, { useEffect, useState } from "react";
import * as math from 'mathjs'

import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import axios from "axios";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from "@mui/material/InputLabel";
import { Box, FormControl } from "@mui/material";




const Home:React.FC =()=>{
    const [selectMethod,setselectMethod] = useState("Cramer's_Rule")

    const [matrixSize, setMatrixSize] = useState({
        rows: 0,
        columns: 0,
      })
      const[resultmatrix,setresult] = useState([0]);
  
    const [matrixA, setmatrixA] = useState([0]);
    const [matrixB, setmatrixB] = useState([0]);
    const [showmatrixA, setshowmatrixA] = useState([0]);
    const [showmatrixB, setshowmatrixB] = useState([0]);
    const [matrixBegin, setmatrixBegin] = useState([0]);
    var [token,settoken] = useState(' ')


    const [dataTable, setdataTable] = useState([{id: 1}]);
    const [coloumnTable, setcoloumnTable] = React.useState<GridColDef[]>([])

    const [selectobg,setselectobg] = useState([])
    const [selecteq,setselecteq] = useState(`{"MatrixA":"[[5,2,0,0],[2,5,2,0],[0,2,5,2],[0,0,2,5]]","MatrixB":"[12,17,14,7]","MatrixBegin":"[0,0,0,0]"}`)
    
      console.log(matrixSize)
      let tokenStr = 'tle1234';
      const columns: GridColDef[] = [
        { field: 'id', headerName: 'Iteration', width: 100 },
      ];
      let rows:Array<any>= []
      let test:Array<any>= []

      const obj = {field: 'Tom'};

            test.push(obj)
            console.log(test)
            // rows.push(JSON.parse(JSON.stringify(obj)));
      // console.log(columns)
      const keepvariable =(obg:any)=>{
        rows.push(obg)
      }
  
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
  const inputMatrixBegin = () => {
  
    var matrixBoxBegin = [];

    for (let row = 0; row < matrixSize.rows; row++) {
        matrixBoxBegin.push(<input id={row.toString()} type="text" onChange={handleMatrixBeginInput} />)
        matrixBoxBegin.push(<br />)
    }

    return matrixBoxBegin
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
    temp_matrix[rowsid] = parseInt(e.target.value)
    setmatrixB(temp_matrix)
      e.preventDefault();
  }

  const handleMatrixBeginInput = async (e:any)=> {
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
   temp_matrix[rowsid] = parseInt(e.target.value)
   setmatrixBegin(temp_matrix)
     e.preventDefault();
 }

    const problem =(mA:Array<number>,mB:Array<number>,Begin:Array<number>,method:string)=>{
        console.log(mA)
        console.log(mB)
        console.log(selectMethod)
            const Cramer = ()=>{
              console.log("function Cramer")
              let A:Array<Array<number>> = JSON.parse(JSON.stringify(mA))
              let B:Array<number> = JSON.parse(JSON.stringify(mB))
              console.log(typeof(mA))
              console.log(B)
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
            const Gauss_Elimination=()=>{
              let A:Array<Array<number>> = JSON.parse(JSON.stringify(mA))
              let B:Array<number> = JSON.parse(JSON.stringify(mB))
              let sizematrixB:number = B.length
              let rows:any = [];
              let X:Array<number> = [];for(let i:number = 0;i<A.length;i++) X.push(0);
              let n = 1
              for(let i:number=0;i<A.length;i++)
              {
                  for(let j:number=0;j<i;j++)
                  {
                      let dummy:number = A[i][j]
                      for(let k:number=0;k<A.length;k++)
                      {
                          if( (dummy*math.abs(A[j][j])>0 && A[j][j]*math.abs(dummy)>0) || (dummy*math.abs(A[j][j])<0&&A[j][j]*math.abs(dummy)<0) )
                          {
                              A[i][k] = (A[i][k]*math.abs(A[j][j]))-(A[j][k]*math.abs(dummy))
                              if(k===A[i].length-1)
                              {
                                  B[i] = B[i]*math.abs(A[j][j])-(B[j]*math.abs(dummy))
                              }
                          }
                          else
                          {
                              A[i][k] = (A[i][k]*math.abs(A[j][j]))+(A[j][k]*math.abs(dummy))
                              if(k===A[i].length-1)
                              {
                                  B[i] = B[i]*math.abs(A[j][j])+(B[j]*math.abs(dummy))
                              }
                          }
                      }
                  }
              }
              for(let i:number = A.length-1;i>=0;i--)
              {
                  let temp:number = 0;
                  for(let j:number=0;j<A[i].length;j++)
                  {
                      if(j!==i)
                      {
                          temp+=A[i][j]*B[j]
                      }
                  }
                  if(temp>0)
                  {
                      B[i] = (B[i]-math.abs(temp))/A[i][i]
                  }
                  else{
                      B[i] = (B[i]+math.abs(temp))/A[i][i]
                  }
                  let obg:any = {
                    id: n
                  }
                  for(let i =0;i < sizematrixB;i++){
                    obg = Object.assign(obg, { ["X" + (i + 1)]: B[i]})
                  }
                  rows.push(obg)
                  n++

              }
              for(let i = 1;i < sizematrixB+1;i++){
                columns.push({ field: 'X'+i, headerName: 'X'+i, width: 250 })
              }
              setcoloumnTable(columns)
              setdataTable(rows)
              return B
            }
           const Gauss_Jordan=()=>{
            let A:Array<Array<number>> = JSON.parse(JSON.stringify(mA))
            let B:Array<number> = JSON.parse(JSON.stringify(mB))
            let X:Array<number> = [];for(let i:number = 0;i<A.length;i++) X.push(0);
            let row:Array<number> = []
            let n:number = 1;
            for(let i:number=0;i<A.length;i++)
            {
                for(let j:number=0;j<i;j++)
                {
                    let dummy:number = A[i][j]
                    for(let k:number=0;k<A.length;k++)
                    {
                        if( (dummy*math.abs(A[j][j])>0 && A[j][j]*math.abs(dummy)>0) || (dummy*math.abs(A[j][j])<0&&A[j][j]*math.abs(dummy)<0) )
                        {
                            A[i][k] = (A[i][k]*math.abs(A[j][j]))-(A[j][k]*math.abs(dummy))
                            if(k===A[i].length-1)
                            {
                                B[i] = B[i]*math.abs(A[j][j])-(B[j]*math.abs(dummy))
                            }
                        }
                        else
                        {
                            A[i][k] = (A[i][k]*math.abs(A[j][j]))+(A[j][k]*math.abs(dummy))
                            if(k===A[i].length-1)
                            {
                                B[i] = B[i]*math.abs(A[j][j])+(B[j]*math.abs(dummy))
                            }
                        }
                    }
                }
            }
            for(let i:number=A.length-1;i>=0;i--)
            {
                for(let j:number=A.length-1;j>i;j--)
                {
                    let dummy:number = A[i][j]
                    for(let k:number=0;k<A[i].length;k++)
                    {
                        if( (dummy*math.abs(A[j][j])>0 && A[j][j]*math.abs(dummy)>0) || (dummy*math.abs(A[j][j])<0&&A[j][j]*math.abs(dummy)<0) )
                        {
                            A[i][k] = (A[i][k]*math.abs(A[j][j]))-(A[j][k]*math.abs(dummy))
                            if(k===A[i].length-1)
                            {
                                B[i] = B[i]*math.abs(A[j][j])-(B[j]*math.abs(dummy))
                            }
                        }
                        else
                        {
                            A[i][k] = (A[i][k]*math.abs(A[j][j]))+(A[j][k]*math.abs(dummy))
                            if(k===A[i].length-1)
                            {
                               B[i] = B[i]*math.abs(A[j][j])+(B[j]*math.abs(dummy))
                            }
                        }
                    }
                }
            }
            for(let i:number = A.length-1;i>=0;i--)
            {
                let temp:number = 0;
                for(let j:number=0;j<A[i].length;j++)
                {
                    if(j!==i)
                    {
                        temp+=A[i][j]*B[j]
                    }
                }
                if(temp>0)
                {
                    B[i] = (B[i]-math.abs(temp))/A[i][i]
                }
                else{
                    B[i] = (B[i]+math.abs(temp))/A[i][i]
                }
                let obg:any = {
                  id: n
                }
                for(let i =0;i < B.length;i++){
                  obg = Object.assign(obg, { ["X" + (i + 1)]: B[i]})
                }
                rows.push(obg)
                n++
            }
            for(let i = 1;i < B.length+1;i++){
              columns.push({ field: 'X'+i, headerName: 'X'+i, width: 250 })
            }
            setcoloumnTable(columns)
            setdataTable(rows)
            return B

           }
            const LU = () =>{
              let a:Array<Array<number>> = JSON.parse(JSON.stringify(mA))
              let b:Array<number> = JSON.parse(JSON.stringify(mB))
              let Result:Array<number> = [];
              let Loop_Result:Array<number> = [];
              let Loop_Error:Array<number> = [];
              let Lower:Array<Array<number>> = Array(a.length).fill(0).map(x=>Array(a.length).fill(0));
              let Upper:Array<Array<number>> = Array(a.length).fill(0).map(x=>Array(a.length).fill(0));
              let Y:Array<number> = Array(a.length).fill(0);
              let X:Array<number> = Array(a.length).fill(0);
              let row:Array<number> = [];
              let n:number = 1;
              for(let A:number = 0;A<a.length;A++)
              {
                  for(let B:number = A;B<a.length;B++)
                  {
                      let sum:number = 0;
                      for(let C:number=0;C<A;C++)
                      {
                          sum+= (Lower[A][C]*Upper[C][B]);
                      }
                      Upper[A][B] = a[A][B] - sum;
                  }
                  for(let B:number = A;B<a[0].length;B++)
                  {
                      if(A===B)
                      {
                          Lower[A][A] = 1;
                      }
                      else
                      {
                          let sum:number = 0;
                          for(let C:number=0;C<A;C++)
                          {
                              sum+= (Lower[B][C]*Upper[C][A]);
                          }
                          Lower[B][A] = (a[B][A] - sum )/Upper[A][A];
                      }
                  }
              }
              for(let i =0;i<a.length;i++)
              {
                  let sum =0;
                  for(let j= 0;j<a.length;j++)
                  {
                      if(j!==i)
                      {
                          sum+=Lower[i][j]*Y[j];
                      }
                  }
                  Y[i]=(b[i]-sum)/Lower[i][i];
              }
              for(let i =a.length-1;i>=0;i--)
              {
                  let sum =0;
                  for(let j= 0;j<a[0].length;j++)
                  {
                      if(j!==i)
                      {
                          sum+=Upper[i][j]*X[j];
                      }
                  }
                  X[i]=parseFloat(((Y[i]-sum)/Upper[i][i]).toPrecision(15));

                  let obg:any = {
                    id: n
                  }
                  for(let i =0;i < b.length;i++){
                    obg = Object.assign(obg, { ["X" + (i + 1)]: X[i]})
                  }
                  rows.push(obg)
                  n++
              }
              for(let i = 1;i < b.length+1;i++){
                columns.push({ field: 'X'+i, headerName: 'X'+i, width: 250 })
              }
              setcoloumnTable(columns)
              setdataTable(rows)
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
              let x_old = JSON.parse(JSON.stringify(Begin))
              let x_new = []
              let xsome:any = []
              let n = 1
              let error = [1,1,1,1]
              let rows:any = [];
              console.log(x_old)

              
        
              const checkerror =(checkerror:any)=>{
                    for(let i = 0;i < checkerror.length;i++){
                        if(checkerror[i] > 0.000001){
                            return true
                        }
                    }
                    return false
                }
                while(checkerror(error) && n <= 1000){
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
              let obg:any = {
                id: n
              }
              for(let i =0;i < b.length;i++){
                obg = Object.assign(obg, { ["X" + (i + 1)]: x_old[i],["E"+(i+1)]:error[i]})
              }
              // console.log(typeof(obg))
              // keepvariable(obg,rows)
              rows.push(obg)
              // console.log("error is "+error)
              // console.log("round "+n)
              // console.log(rows)
              n++
              }
              for(let i = 1;i < b.length+1;i++){
                columns.push({ field: 'X'+i, headerName: 'X'+i, width: 200 })
              }
              for(let i = 1;i < b.length+1;i++){
                columns.push({ field: 'E'+i, headerName: 'error'+i, width: 200 })
              }
              setcoloumnTable(columns)
              setdataTable(rows)
              return x_old
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
              let x_old = JSON.parse(JSON.stringify(Begin))
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
        
            while(checkerror(error) && n <=1000){
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
          let obg:any = {
            id: n
          }
          for(let i =0;i < b.length;i++){
            obg = Object.assign(obg, { ["X" + (i + 1)]: x_old[i],["E"+(i+1)]:error[i]})
          }
          rows.push(obg)
        
          console.log("error is "+error)
          console.log("round "+n)
          n++
          }
          for(let i = 1;i < b.length+1;i++){
            columns.push({ field: 'X'+i, headerName: 'X'+i, width: 200 })
          }
          for(let i = 1;i < b.length+1;i++){
            columns.push({ field: 'E'+i, headerName: 'error'+i, width: 200 })
          }
          setcoloumnTable(columns)
           setdataTable(rows)
           return x_old
            }
            const conjugate = () => {
              let A:Array<Array<number>> = JSON.parse(JSON.stringify(mA))
      
        
              // const b = [12,17,14,7]
              let B:Array<number> = JSON.parse(JSON.stringify(mB))
            
              // let A:Array<Array<number>> = [[5,2,0,0],
              //                                                 [2,5,2,0],
              //                                                 [0,2,5,2],
              //                                                 [0,0,2,5]]
              let X:Array<number> = JSON.parse(JSON.stringify(Begin))
              // let B:Array<number> = [12,17,14,7]
        
              let R:any = math.subtract(math.multiply(A,X),B) ;
              let D:any = math.multiply(R,-1);
              let n = 1
              let CheckError:number = 1
        
        
        
                while (CheckError > 0.000001){
                  let lamda = math.divide((math.multiply(math.multiply(math.transpose(D), -1),R)),math.multiply(math.transpose(D), math.multiply(A,D)));
                
              
                  let X1 = math.add(X,math.multiply(D,lamda))
                  let R1:any = math.subtract(math.multiply(A,X1),B)
                  let Error = math.sqrt(math.multiply(math.transpose(R1),R1))
                  let alpha = math.divide(math.multiply( math.transpose(R1) , math.multiply(A,D) ),math.multiply( math.transpose(D) , math.multiply(A,D) ))
                  let D1:any = math.add( math.multiply(R1,-1) , math.multiply(D,alpha) );
                
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
              let obg:any = {
                id: n
              }
              for(let i =0;i < B.length;i++){
                obg = Object.assign(obg, { ["X" + (i + 1)]: X[i],["R"+(i+1)]:R[i],["D"+(i+1)]:D[i],["D1_"+(i+1)]:D1[i],["error"]:Error,["lamda"]:lamda,["alpha"]:alpha})
              }
              rows.push(obg)
                  X = JSON.parse(JSON.stringify(X1))
                  R = R1 
                  D = D1 
                  CheckError = Error
                  n++
                }
                for(let i = 1;i < B.length+1;i++){
                  columns.push({ field: 'X'+i, headerName: 'X'+i, width: 200 })
                }
                for(let i = 1;i < B.length+1;i++){
                  columns.push({ field: 'R'+i, headerName: 'R'+i, width: 200 })
                }
                for(let i = 1;i < B.length+1;i++){
                  columns.push({ field: 'D'+i, headerName: 'D'+i, width: 200 })
                }
                for(let i = 1;i < B.length+1;i++){
                  columns.push({ field: 'D1_'+i, headerName: 'D1_'+i, width: 200 })
                }
                columns.push({ field: 'error', headerName: 'Error', width: 200 })
                columns.push({ field: 'lamda', headerName: 'Lamda', width: 200 })
                columns.push({ field: 'alpha', headerName: 'Alpha', width: 200 })
    
    
                setcoloumnTable(columns)
                setdataTable(rows)
              }

            
            switch(method){
                case "Cramer's_Rule":
                    setresult(Cramer())
                    console.log(Cramer())
                    break;
                case "Gauss_Elimination":
                    setresult(Gauss_Elimination())
                    break;
                break
                case "Gauss_Jordan":
                  setresult(Gauss_Jordan())
                  break;
                case "LU_Decomposition":
                  setresult(LU())
                  break;
                case "Jacobi_Iteration":
                  setresult(Jacobi())
                    break
                case "Gauss_Seidal":
                  setresult(Gaiss_seidel())
                    break
                case "Conjugate":
                  conjugate()
                  break     
            }
          }

    const handleSubmit = async (e:any)=> {
      problem(matrixA,matrixB,matrixBegin,selectMethod)
        // console.log("matrixA is "+matrixA)
        // console.log("matrixB is "+matrixB)
        e.preventDefault();
      }
      const listItems = resultmatrix.map((number,index) =>
            <p className="flex-1 text-center text-xl py-2">X{index+1} : {number}</p>
      );
      useEffect(()=>{
        // console.log('123123123')
        // let tokenStr = 'tle1234';
        axios.post('https://jsonservernumerical.herokuapp.com/login', {
          "email":"y-title@hotmail.com",
          "password":"Numer2022"
        }).then(response =>{
          settoken(response.data.accessToken)
          axios.get("https://jsonservernumerical.herokuapp.com/LinearAlgebra",{ headers: {
            "Authorization": `Bearer ${response.data.accessToken}` 
          } })
          .then(response => {
            setselectobg(response.data.Cramer_Rule)
            // '{"MatrixA":'+`"${MatrixA}"`+','+'"MatrixB":'+`"${MatrixB}"`+'}'
            let A = JSON.parse(response.data.Cramer_Rule[0].MatrixA)
            let B = JSON.parse(response.data.Cramer_Rule[0].MatrixB)
            let Begin = JSON.parse(response.data.Cramer_Rule[0].begin)
            setshowmatrixA(A)
            setshowmatrixB(B)

            console.log(A)
            console.log(B)
            problem(A,B,Begin,"Cramer's_Rule")
              // do something about response
          })
        })
        

      },[])
      console.log(selectobg);
      const showMatrix = (matrix:any) => {
        console.log(matrix)
        try {
            return (
                <MathJax dynamic inline>
                    {"\\(" +
                        math.parse(matrix.toString().replace(/\*/g, "")).toTex({
                            parenthesis: "keep",
                            implicit: "show",
                        }) +
                        "\\)"}
                </MathJax>
            );
        } catch (e:any) {
            return <MathJax dynamic>{e.toString()}</MathJax>;
        }
    };
      console.log(dataTable)
      console.log(columns)

    return( 
        <div>
           <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold text-gray-900">Chapter2:Linear Algebra_{selectMethod}</h1>
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
            onChange={(e)=>{
                setselectMethod(e.target.value)
                setcoloumnTable([])
                setresult([0])

                let tokenStr = 'tle1234';
                axios.get("https://jsonservernumerical.herokuapp.com/LinearAlgebra",{ headers: {
                "Authorization": `Bearer ${token}` 
                } })
                .then(response => {                    
                    let A,B,Begin
                    switch(e.target.value){
                        case "Cramer's_Rule":
                          setselecteq(`{"MatrixA":"[[5,2,0,0],[2,5,2,0],[0,2,5,2],[0,0,2,5]]","MatrixB":"[12,17,14,7]","MatrixBegin":"[0,0,0,0]"}`)
                          setselectobg(response.data.Cramer_Rule)
                          A = JSON.parse(response.data.Cramer_Rule[0].MatrixA)
                          B = JSON.parse(response.data.Cramer_Rule[0].MatrixB)
                          Begin = JSON.parse(response.data.Cramer_Rule[0].begin)
                          problem(A,B,Begin,e.target.value)
                         break

                         case "Gauss_Elimination": 
                         setselecteq(`{"MatrixA":"[[5,2,0,0],[2,5,2,0],[0,2,5,2],[0,0,2,5]]","MatrixB":"[12,17,14,7]","MatrixBegin":"[0,0,0,0]"}`)
                         setselectobg(response.data.Gauss_Elimination)
                         A = JSON.parse(response.data.Gauss_Elimination[0].MatrixA)
                         B = JSON.parse(response.data.Gauss_Elimination[0].MatrixB)
                         problem(A,B,[0],e.target.value)
                         console.log(e.target.value)
                         break

                         case "Gauss_Jordan":
                          setselecteq(`{"MatrixA":"[[5,2,0,0],[2,5,2,0],[0,2,5,2],[0,0,2,5]]","MatrixB":"[12,17,14,7]","MatrixBegin":"[0,0,0,0]"}`)
                          setselectobg(response.data.Gauss_Jordan) 
                          A = JSON.parse(response.data.Gauss_Jordan[0].MatrixA)
                          B = JSON.parse(response.data.Gauss_Jordan[0].MatrixB)
                          problem(A,B,[0],e.target.value)

                         console.log(e.target.value)
                         break

                         case "LU_Decomposition":
                          setselecteq(`{"MatrixA":"[[5,2,0,0],[2,5,2,0],[0,2,5,2],[0,0,2,5]]","MatrixB":"[12,17,14,7]","MatrixBegin":"[0,0,0,0]"}`)
                          setselectobg(response.data.LU_Decomposition)
                          A = JSON.parse(response.data.LU_Decomposition[0].MatrixA)
                          B = JSON.parse(response.data.LU_Decomposition[0].MatrixB)
                          problem(A,B,[0],e.target.value)  
                         console.log(e.target.value)
                         break

                         case "Jacobi_Iteration": 
                         setselecteq(`{"MatrixA":"[[5,2,0,0],[2,5,2,0],[0,2,5,2],[0,0,2,5]]","MatrixB":"[12,17,14,7]","MatrixBegin":"[0,0,0,0]"}`)
                         setselectobg(response.data.Jacobi_Iteration)
                         A = JSON.parse(response.data.Jacobi_Iteration[0].MatrixA)
                         B = JSON.parse(response.data.Jacobi_Iteration[0].MatrixB)
                         Begin = JSON.parse(response.data.Jacobi_Iteration[0].begin)
                         problem(A,B,Begin,e.target.value)
  
                         console.log(Begin)
                         break

                         case "Gauss_Seidal":
                          setselecteq(`{"MatrixA":"[[5,2,0,0],[2,5,2,0],[0,2,5,2],[0,0,2,5]]","MatrixB":"[12,17,14,7]","MatrixBegin":"[0,0,0,0]"}`)
                          setselectobg(response.data.Gauss_Seidal)
                          A = JSON.parse(response.data.Gauss_Seidal[0].MatrixA)
                          B = JSON.parse(response.data.Gauss_Seidal[0].MatrixB)
                          Begin = JSON.parse(response.data.Gauss_Seidal[0].begin)
                          problem(A,B,Begin,e.target.value)
  
                          console.log(e.target.value)  
                          break

                         case "Conjugate":
                          setselecteq(`{"MatrixA":"[[5,2,0,0],[2,5,2,0],[0,2,5,2],[0,0,2,5]]","MatrixB":"[12,17,14,7]","MatrixBegin":"[0,0,0,0]"}`)
                          setselectobg(response.data.Conjugate)
                          A = JSON.parse(response.data.Conjugate[0].MatrixA)
                          B = JSON.parse(response.data.Conjugate[0].MatrixB)
                          Begin = JSON.parse(response.data.Conjugate[0].begin)
                          problem(A,B,Begin,e.target.value)  
                           console.log(e.target.value)
                           break

                         default:
                             console.log("ddddd")
                             break
                    }
                    // do something about response
                })
                
                .catch(err => {
                    console.error(err)
                })
            }} className="border-b-2 m-0 border-zinc-300">
                <MenuItem value="Cramer's_Rule">Cramer's_Rule</MenuItem>
                <MenuItem value="Gauss_Elimination">Gauss_Elimination</MenuItem>
                <MenuItem value="Gauss_Jordan">Gauss_Jordan</MenuItem>
                <MenuItem value="LU_Decomposition">LU Decomposition</MenuItem>
                <MenuItem value="Jacobi_Iteration">Jacobi_Iteration</MenuItem>
                <MenuItem value="Gauss_Seidal">Gauss_Seidal</MenuItem>
                <MenuItem value="Conjugate">Conjugate</MenuItem>
            </Select>
              </FormControl>
              </Box>

            <Box sx={{ m: 1, minWidth: 500 }}>
            <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">problem</InputLabel>
            <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"           
            label="problem"
            value={selecteq}

            onChange={(e)=>{
                   setselecteq(e.target.value)
                   console.log(e.target.value)
                   let B = JSON.parse(e.target.value)
                   console.log(B)

                   let MatrixA = JSON.parse(B.MatrixA)
                   let MatrixB = JSON.parse(B.MatrixB)
                   let MatrixBegin = JSON.parse(B.MatrixBegin)
                   setshowmatrixA(MatrixA)
                   setshowmatrixB(MatrixB)

                   problem(MatrixA,MatrixB,MatrixBegin,selectMethod)

                   console.log(e.target.value)
                  //  console.log(MatrixB)

               }} className="border-b-2 m-0 border-zinc-300">
                  {
                  selectobg.map(({ MatrixA,MatrixB,begin}) => (
                    <MenuItem  value={'{"MatrixA":'+`"${MatrixA}"`+','+'"MatrixB":'+`"${MatrixB}"`+','+'"MatrixBegin":'+`"${begin}"`+'}'}>
                      MatrixA : {MatrixA} MatrixB : {MatrixB}
                      </MenuItem>
                    ))
                    }
               </Select>
              </FormControl>
              </Box>


            <form onSubmit={handleSubmit}>
              <input
              type="number"
              className="border-b-2 m-0 border-zinc-700	"
              placeholder="row"
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
              className="border-b-2 m-0 border-zinc-700	"
              placeholder="column"
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
              {/* <MathJaxContext>
                  <MathJax dynamic>
                      MatrixA : {showMatrix(JSON.stringify(showmatrixA))}
                      MatrixB : {showMatrix(JSON.stringify(showmatrixB))}
                    </MathJax>
              </MathJaxContext> */}
              <div>
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
                {
                  selectMethod == "Jacobi_Iteration" &&
                  <div className="column_matrixB">
                  <label>MatrixBegin</label>
                      <div>
                      {inputMatrixBegin()}
                      </div>
                  </div>
                }
                {
                  selectMethod == "Gauss_Seidal" &&
                  <div className="column_matrixB">
                  <label>MatrixBegin</label>
                      <div>
                      {inputMatrixBegin()}
                      </div>
                  </div>
                }

              </div>
              <br/>
              <input type="submit" name="submit"/>
                  {                                    
                  listItems.length > 1 &&
                  <div className="py-3">
                    <div className="rounded-t-lg shadow-xl hover:drop-shadow-xl">
                      <h1 className="text-center text-2xl">Answer is ....</h1>
                      {
                        listItems
                      }
                    </div>
                  </div>
                }
                {coloumnTable.length > 0 &&
                      <div style={{ height: 650, width: '100%' }}>

                        <DataGrid
                        rows={dataTable}
                        columns={coloumnTable}
                        pageSize={10}
                        rowsPerPageOptions={[5]}
                        disableSelectionOnClick
                      />
                      </div>
                    }                                
                </div>
              </form>
          </div>
          {/* <!-- /End replace --> */}
        </div>
      </main>
        </div>

    )
}
export default Home