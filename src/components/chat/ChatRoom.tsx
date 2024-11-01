import AvatarDisplay from '@/components/AvatarDisplay.tsx';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog.tsx';
import {ArrowLeft, Bell, EllipsisVertical, Pen} from 'lucide-react';
import MessageFeed from '@/components/chat/MessageFeed.tsx';
import MessageInput from '@/components/chat/MessageInput.tsx';
import {Channel, ChatContext} from '@/page/Chat.tsx';

const ChatRoom = ({
                    view,
                    chat
                  }: {
  view: {
    changeToMenu: () => void
    isMobile: boolean
  }
  chat: ChatContext
}) => {
  const {channels, currentChannelId} = chat;

  if (!currentChannelId) {
    return <main className="w-full h-full flex flex-col justify-center items-center text-border text-2xl gap-3">
      <h2>Join a Room</h2>
      <span>ᕕ( ᐛ )ᕗ</span>
    </main>;
  }

  const activeChannel = channels.get(currentChannelId) as Channel;

  return (
    <main className="fixed sm:relative w-full h-full flex flex-col">
      <header className="flex justify-between items-center p-3 border-b border-border">
        <div className="flex gap-3 items-center">
          {view.isMobile && <ArrowLeft size={22} onClick={view.changeToMenu} className="cursor-pointer"/>}
          <AvatarDisplay {...activeChannel.avatar} size={40}/>
          <h2>{activeChannel.name}</h2>
        </div>
        <Dialog>
          <DialogTrigger><EllipsisVertical/></DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{activeChannel.name} - Settings</DialogTitle>
              <DialogDescription>{activeChannel.description}</DialogDescription>
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

      <section className="flex flex-1 flex-col px-2 relative overflow-auto flex-grow">
        <MessageFeed chat={chat}/>
        <div className="relative min-w-[52ppx] bg-transparent">
          <MessageInput channel={activeChannel} chat={chat}/>
        </div>
      </section>
    </main>
  );
};
export default ChatRoom;
