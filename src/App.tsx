import {Route, Routes} from "react-router-dom";
import Login from "@/page/Login.tsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<App/>}/>
      <Route path="login" element={<Login/>}/>
    </Routes>
  )
}

export default App
