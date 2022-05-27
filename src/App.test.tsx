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

test('select chapter1',async ()=>{
  await render(<Chapter1 />)

  await waitFor(()=>{
    expect(screen.queryByText("Result: 0")).not.toBeInTheDocument()
  },{timeout:2000})
  await waitFor(()=>{
     expect(screen.getByTestId("testgg").textContent).toEqual("Result: 1.8988289833068848")
  },{timeout:2000})
},60000)
