import {Route, Routes} from "react-router-dom";
import Login from "@/page/Login.tsx";
import Chat from "@/page/Chat.tsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Chat/>}/>
      <Route path="login" element={<Login/>}/>
    </Routes>
  )
}

export default App
