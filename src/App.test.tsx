import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from './App';
import Project from './views/Dashboard/Project';
import Chapter1 from './views/Chapter1';
import userEvent from '@testing-library/user-event'
afterEach(cleanup);



test('renders learn react link', () => {
  render(<App />);
});
test('screen project',()=>{
  render(<Project/>)
  expect(screen.getByText("Project")).toBeInTheDocument()
})

it('select chapter1',async ()=>{
  await render(<Chapter1 />)

  await waitFor(()=>{
     expect(screen.getByTestId("testgg").textContent).toEqual("Result: 1.8988289833068848")
  })


  await waitFor(()=>{
    fireEvent.change(screen.getByTestId("select-problem") as HTMLInputElement,{
      target:{value:`{"eq":"2x^3-2x-5","left":2,"right":4}`}
    })
 })
 await waitFor(()=>{
   expect((screen.getByTestId("select-problem") as HTMLInputElement).value).toEqual(`{"eq":"2x^3-2x-5","left":2,"right":4}`)
 })
 await waitFor(()=>{
   expect(screen.queryByText("Result: 1.8988289833068848")).not.toBeInTheDocument()
 })
 await expect(screen.getByTestId("testgg").textContent).toEqual("Result: 2.000000476837158")


   await waitFor(()=>{
      fireEvent.change(screen.getByTestId("select-option") as HTMLInputElement,{
        target:{value:"FalsePosition"}
      })
   })
   await waitFor(()=>{
     expect((screen.getByTestId("select-option") as HTMLInputElement).value).toEqual("FalsePosition")
   })
   await waitFor(()=>{
     expect(screen.queryByText("Result: 2.000000476837158")).not.toBeInTheDocument()
   })
   await expect(screen.getByTestId("testgg").textContent).toEqual("Result: 0.023255813953488372")


   await waitFor(()=>{
    fireEvent.change(screen.getByTestId("select-option") as HTMLInputElement,{
      target:{value:"NewtonRaphson"}
    })
 })
 await waitFor(()=>{
   expect((screen.getByTestId("select-option") as HTMLInputElement).value).toEqual("NewtonRaphson")
 })
 await waitFor(()=>{
   expect(screen.queryByText("Result: 0.023255813953488372")).not.toBeInTheDocument()
 })
 await expect(screen.getByTestId("testgg").textContent).toEqual("Result: 2.6457513110646933")

})
