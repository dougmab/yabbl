import {Contact, Inbox, Search} from "lucide-react";
import {Input} from "@/components/ui/input.tsx";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import ChatCard from "@/components/ChatCard.tsx";
import ProfileDisplay from "@/components/ProfileDisplay.tsx";

const Sidebar = () => {
  return (
    <aside className="lg:w-[600px] md:w-[400px] flex flex-col h-full border-r border-border px-2 space-y-2">
      <header className="">
        <h1 className="mb-4">LOGO</h1>
        <div className="bar-button">
          <Inbox size={22}/>
          Inbox
        </div>
        <div className="bar-button">
          <Contact size={22}/>
          Friends
        </div>
      </header>

      <div className="relative">
        <Input type="text" placeholder="Search" className="pr-8"/>
        <Search size={18} className="absolute right-0 top-0 -translate-x-1/2 translate-y-1/2"/>
      </div>

      <section className="space-y-3 overflow-auto flex-grow">
        <ScrollArea className="h-full">
          <ChatCard
            title="The Fellasss"
            lastMessage={{
              sender: "Allan Nunes",
              content: "I'm bringing the snacks"
            }}
            profile={{
              color: "#ff1616",
              content: "S2A"
            }}
          />
          <ChatCard
            title="Alexandre"
            lastMessage={{
              sender: "Alexandre",
              content: "Sup, do ya have any notes from last class?"
            }}
            profile={{
              color: "#de36f8",
              content: "'-'"
            }}
          />
        </ScrollArea>
      </section>
      <section className="flex gap-4 items-center p-2 py-4 border-t border-secondary">
        <ProfileDisplay color="#ffec16" content=":v" size={40}/>
        <div className="flex flex-col">
          <strong className="block">Steve</strong>
          <span className="text-xs">Online</span>
        </div>
      </section>
    </aside>
  )
}
export default Sidebar
