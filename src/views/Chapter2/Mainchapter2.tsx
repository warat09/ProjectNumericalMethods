import React, { useEffect } from "react";
import {Paper,Table,TableBody,TableCell,TableContainer,TableHead,TablePagination,TableRow} from '@mui/material';
import * as math from 'mathjs'
import axios from "axios";


interface body{
    name:string
}
interface Column {
    id: 'name' | 'code' | 'population' | 'size' | 'density';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
  }
  
  const columns: readonly Column[] = [
    { id: 'name', label: 'Iteration', minWidth: 100 },
    { id: 'code', label: 'X1', minWidth: 100 },
    {
      id: 'population',
      label: 'X2',
      minWidth: 100,
      format: (value: number) => value.toLocaleString('en-US'),
    },
    {
      id: 'size',
      label: 'X3',
      minWidth: 100,
      format: (value: number) => value.toLocaleString('en-US'),
    },
    {
      id: 'density',
      label: 'X4',
      minWidth: 100,
      format: (value: number) => value.toFixed(2),
    },
    {
        id: 'density',
        label: 'error1',
        minWidth: 100,
        format: (value: number) => value.toFixed(2),
      },
      {
        id: 'density',
        label: 'error2',
        minWidth: 100,
        format: (value: number) => value.toFixed(2),
      },
      {
        id: 'density',
        label: 'error3',
        minWidth: 100,
        format: (value: number) => value.toFixed(2),
      },
      {
        id: 'density',
        label: 'error4',
        minWidth: 100,
        format: (value: number) => value.toFixed(2),
      },
    
  ];
  
  interface Data {
    name: string;
    code: string;
    population: number;
    size: number;
    density: number;
  }
  function createData(
    name: string,
    code: string,
    population: number,
    size: number,
  ): Data {
    const density = population / size;
    return { name, code, population, size, density };
  }

const Mainchapter2:React.FC<body>=(props)=>{
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    let tokenStr = 'tle1234';
    var rows = [
      createData('China', 'CN', 1403500365, 9596961),
      createData('Italy', 'IT', 60483973, 301340),
      createData('United States', 'US', 327167434, 9833520),
      createData('Canada', 'CA', 37602103, 9984670),
      createData('Australia', 'AU', 25475400, 7692024),
      createData('Germany', 'DE', 83019200, 357578),
      createData('Ireland', 'IE', 4857000, 70273),
      createData('Mexico', 'MX', 126577691, 1972550),
      createData('Japan', 'JP', 126317000, 377973),
      createData('France', 'FR', 67022000, 640679),
      createData('United Kingdom', 'GB', 67545757, 242495),
      createData('Russia', 'RU', 146793744, 17098246),
      createData('Nigeria', 'NG', 200962417, 923768),
      createData('Brazil', 'BR', 210147125, 8515767),
    ];



    const Cramer = ()=>{
      let A:Array<Array<number>> = [[-2,3,1],
                                                      [3,4,-5],
                                                      [1,-2,1],]
      let B:Array<number> = [9,0,-4]
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
      console.log(X)

    }
    const Jacobi = () =>{
      const a = [[5,2,0,0],
                      [2,5,2,0],
                      [0,2,5,2],
                      [0,0,2,5]]

      const b = [12,17,14,7]
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
      const a = [[5,2,0,0],
                      [2,5,2,0],
                      [0,2,5,2],
                      [0,0,2,5]]

      const b = [12,17,14,7]
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
    
      let A:Array<Array<number>> = [[5,2,0,0],
                                                      [2,5,2,0],
                                                      [0,2,5,2],
                                                      [0,0,2,5]]
      let X:Array<number> = [0,0,0,0]
      let B:Array<number> = [12,17,14,7]

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
            Cramer()
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
      
    const handleChangePage = (event: unknown, newPage: number) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    return(
        <div>
            <h1>Chapter 2:{props.name}</h1>
            {
                props.name === "Jacobi_Iteration" &&
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 1000 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>

            }
        </div>
    );

}

export default Mainchapter2