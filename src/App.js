import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./routes/Home";
import Put from "./routes/Put";
import Write from "./routes/Write";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/write" element={<Write></Write>}></Route>
          <Route path="/put/:id" element={<Put></Put>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
