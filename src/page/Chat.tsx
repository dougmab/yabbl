import Sidebar from "@/components/Sidebar.tsx";
import ChatRoom from "@/components/ChatRoom.tsx";

const Chat = () => {
  return (
    <div className="flex h-screen max-h-screen">
      <Sidebar/>
      <ChatRoom/>
    </div>
  )
}
export default Chat
