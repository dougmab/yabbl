import ProfileDisplay from "@/components/ProfileDisplay.tsx";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog.tsx";
import {Bell, EllipsisVertical, Pen, Send} from "lucide-react";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import MessageFeed from "@/components/MessageFeed.tsx";

const ChatRoom = () => {
  return (
    <main className="w-full h-full flex flex-col">
      <header className="flex justify-between items-center p-3 border-b border-border">
        <div className="flex gap-3 items-center">
          <ProfileDisplay color="#ff1616" content="S2A" size={40}/>
          <h2>The Fellasss</h2>
        </div>
        <Dialog>
          <DialogTrigger><EllipsisVertical/></DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>The Fellasss - Settings</DialogTitle>
              <DialogDescription>Settings for the chat group</DialogDescription>
            </DialogHeader>
            <div className="space-y-2">
              <div className="border-t border-input py-2 space-y-2">
                <div className="bar-button">
                  <Pen size={20}/>
                  <h3>Change group name</h3>
                </div>
                <div className="bar-button">
                  <Bell size={20}/>
                  <h3>Notifications</h3>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </header>

      <section className=" flex flex-col px-2 relative overflow-auto flex-grow">
        <MessageFeed/>
        <div className="relative p-2 my-2 bg-transparent">
          <form action="">
            <Input className="rounded-2xl" type="text" placeholder="Message"/>
            <Button className="absolute right-2 top-1/2 -translate-y-1/2 rounded-2xl ">
              <Send size={20}/>
            </Button>
          </form>
        </div>
      </section>
    </main>
  )
}
export default ChatRoom;