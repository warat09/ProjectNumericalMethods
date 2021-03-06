import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from './App';
import Project from './views/Dashboard/Project';
import Chapter1 from './views/Chapter1';
afterEach(cleanup);



test('renders learn react link', () => {
  render(<App />);
});
test('screen project',()=>{
  render(<Project/>)
  expect(screen.getByText("Project")).toBeInTheDocument()
})

test('select chapter1',async ()=>{
  await waitFor(()=>{
    render(<Chapter1 />)
  },{timeout:5000})

  await waitFor(()=>{
    expect(screen.queryByText("Result: 0")).not.toBeInTheDocument()
  },{timeout:5000})
  await waitFor(()=>{
     expect(screen.getByTestId("testgg").textContent).toEqual("Result: 1.8988289833068848")
  },{timeout:5000})

  await waitFor(()=>{
    fireEvent.change(screen.getByTestId("select-problem") as HTMLInputElement,{
      target:{value:`{"eq":"2x^3-2x-5","left":2,"right":4,"xbegin":0}`}
    })
 },{timeout:5000})
 await waitFor(()=>{
   expect((screen.getByTestId("select-problem") as HTMLInputElement).value).toEqual(`{"eq":"2x^3-2x-5","left":2,"right":4,"xbegin":0}`)
 },{timeout:5000})
 await waitFor(()=>{
   expect(screen.queryByText("Result: 1.8988289833068848")).not.toBeInTheDocument()
 },{timeout:5000})
 await expect(screen.getByTestId("testgg").textContent).toEqual("Result: 2.000000476837158")


   await waitFor(()=>{
      fireEvent.change(screen.getByTestId("select-option") as HTMLInputElement,{
        target:{value:"FalsePosition"}
      })
   },{timeout:5000})
   await waitFor(()=>{
     expect((screen.getByTestId("select-option") as HTMLInputElement).value).toEqual("FalsePosition")
   },{timeout:5000})
   await waitFor(()=>{
     expect(screen.queryByText("Result: 2.000000476837158")).not.toBeInTheDocument()
   },{timeout:5000})
   await expect(screen.getByTestId("testgg").textContent).toEqual("Result: 0.023255813953488372")


   await waitFor(()=>{
    fireEvent.change(screen.getByTestId("select-option") as HTMLInputElement,{
      target:{value:"NewtonRaphson"}
    })
 },{timeout:5000})
 await waitFor(()=>{
   expect((screen.getByTestId("select-option") as HTMLInputElement).value).toEqual("NewtonRaphson")
 },{timeout:5000})
 await waitFor(()=>{
   expect(screen.queryByText("Result: 0.023255813953488372")).not.toBeInTheDocument()
 },{timeout:5000})
 await expect(screen.getByTestId("testgg").textContent).toEqual("Result: 2.6457513110646933")

},60000)
