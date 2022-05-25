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
  // await fireEvent.change(screen.getByTestId("bileft"),{
  //   target:{value:"2"}
  // });
  // await fireEvent.change(screen.getByTestId("biright"),{
  //   target:{value:"4"}
  // });

  // await fireEvent.click(screen.getByText(/submit/i))

  // await expect(screen.getAllByTestId("select-option").length).toBe(4)
  await waitFor(()=>{
    expect(screen.queryByText("Result: 0")).not.toBeInTheDocument()
  })
  
  await waitFor(()=>{
     expect(screen.getByTestId("testgg").textContent).toEqual("Result: 1.8988289833068848")
  })
  // await userEvent.selectOptions(
  //   // Find the select element, like a real user would.
  //   await screen.getByRole('combobox'),
  //   // Find and select the Ireland option, like a real user would.
  //   await screen.getByRole('option', {name: 'FalsePositionMethod'}),
  // )
  // await expect((screen.getByRole('option') as HTMLOptionElement).selected).toBe(true)
  // await expect((screen.getByRole('option', {name: 'FalsePositionMethod'})as HTMLOptionElement).selected).toBe(true)
  // await expect((screen.getByRole('option', {name: 'BisectionMethod'})as HTMLOptionElement).selected).toBe(false)
  // await expect((screen.getByRole('option', {name: 'OnepointInteration'})as HTMLOptionElement).selected).toBe(false)
  // await expect((screen.getByRole('option', {name: 'NewtonRaphon'})as HTMLOptionElement).selected).toBe(false)




  // await userEvent.selectOptions(screen.getByTestId('selectmethod'), 'FalsePositionMethod');
  // await expect((screen.getByTestId('selectmethod') as HTMLOptionElement).selected).toBeTruthy();


  // await fireEvent.click(screen.getByTestId("selectmethod"),{
  //   target:{value:"FalsePositionMethod"}
  // })
  // let options:any = screen.getAllByTestId('selectoptionmethod')
  // await expect(options[1].selected).toBeTruthy()




  // await fireEvent.change(screen.getByText("FalsePositionMethod"))
  // await waitFor(()=>{
  //    expect(screen.getByText("FalsePositionMethod")).toBeInTheDocument()
  // })

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





  // await fireEvent.change(screen.getByTestId("faileft"),{
  //   target:{value:"0.02"}
  // });
  // await fireEvent.change(screen.getByTestId("failright"),{
  //   target:{value:"0.03"}
  // });
  // await fireEvent.click(screen.getByText(/submit/i))
})
