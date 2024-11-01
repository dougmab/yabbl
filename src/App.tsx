import {Route, Routes} from "react-router-dom";
import Login from "@/page/Login.tsx";
import Chat from "@/page/Chat.tsx";
import ProtectedRoutes from '@/components/ProtectedRoutes.tsx';
import Customize from '@/page/Customize.tsx';

function App() {
  return (
    <Routes>
      <Route element={<ProtectedRoutes/>}>
        <Route path="/" element={<Chat/>}/>
        <Route path="customize" element={<Customize/>}/>
      </Route>
      <Route path="login" element={<Login/>}/>
    </Routes>
  )
}

export default App
