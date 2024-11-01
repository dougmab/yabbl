import {ChevronLeft, ChevronRight, CirclePlus, Contact, Inbox, Search} from 'lucide-react';
import {Input} from '@/components/ui/input.tsx';
import {ScrollArea} from '@/components/ui/scroll-area.tsx';
import ChatCard from '@/components/chat/ChatCard.tsx';
import AvatarDisplay from '@/components/AvatarDisplay.tsx';
import {useAuth, User} from '@/context/auth-provider.tsx';
import {useState} from 'react';
import {ChatContext} from '@/page/Chat.tsx';
import {Dialog, DialogTrigger} from '@/components/ui/dialog.tsx';
import ChannelDialog from '@/components/dialogs/ChannelDialog.tsx';
import DialogButton from '@/components/dialogs/DialogButton.tsx';
import FriendsDialog from '@/components/dialogs/FriendsDialog.tsx';

const Sidebar = ({view, chat}: {
    view: {
      isVisible: boolean,
      isMobile: boolean,
      openChat: () => void
    },
    chat: ChatContext
  }) => {
    const [isSidebarMinimized, setSidebarMinimized] = useState(false);
    const {user} = useAuth() as {
      user: User
    }; // Little workaround to avoid TS error

    const isMinimized = isSidebarMinimized && !view.isMobile; // renders if sidebar is minimized and not on mobile

  const channelsArr = Array.from(chat.channels.values()).sort((a, b) => {
    const aMessages = chat.messageFeeds.get(a.id);
    const bMessages = chat.messageFeeds.get(b.id);

    const aLastMessage = aMessages ? aMessages[aMessages.length - 1] : {date: '0'};
    const bLastMessage = bMessages ? bMessages[bMessages.length - 1] : {date: '0'};

    return aLastMessage.date > bLastMessage.date ? -1 : aLastMessage.date < bLastMessage.date ? 1 : 0;
  });

    return (
      <aside
        className={`fixed z-50 md:relative flex flex-col h-full border-r border-border px-2 space-y-2 bg-background ${view.isVisible ? '' : 'hidden'} ${isMinimized ? 'w-auto' : 'w-full lg:w-[600px] md:w-[400px]'}`}>
        <header className="">
          <div className={`p-2 flex ${isMinimized ? 'justify-center' : 'justify-end'}`}>
            {
              !view.isMobile && (
                isMinimized ?
                  <ChevronRight size={22} onClick={() => {
                    setSidebarMinimized(false);
                  }} className="cursor-pointer"/>
                  :
                  <ChevronLeft size={22} onClick={() => {
                    setSidebarMinimized(true);
                  }} className="cursor-pointer"/>
              )
            }
          </div>
          <div className="flex flex-col">
            <Dialog>
              <DialogTrigger>
                <div className={`bar-button ${isMinimized && 'justify-center'}`} title="Inbox">
                  <Inbox size={22}/>
                  {!isMinimized && 'Inbox'}
                </div>
              </DialogTrigger>
            </Dialog>
            <DialogButton
              isMinimized={isMinimized}
              title={'Friends'}
              icon={<Contact size={22}/>}
              DisplayDialog={FriendsDialog}
              dialogProps={{chat}}
            />
            <DialogButton
              isMinimized={isMinimized}
              title={'New Room'}
              DisplayDialog={ChannelDialog}
              icon={<CirclePlus size={22}/>}
              dialogProps={{
                addNewChannel: chat.addNewChannel
              }}
            />
          </div>

        </header>

        {!isMinimized ? <div className="relative">
          <Input type="text" placeholder="Search" className="pr-8"/>
          <Search size={18} className="absolute right-0 top-0 -translate-x-1/2 translate-y-1/2"/>
        </div> : <hr/>}

        <section className="space-y-3 overflow-auto flex-grow">
          <ScrollArea className="h-full">
            {channelsArr.map(channel => (
                <ChatCard
                  key={channel.id}
                  channelId={channel.id}
                  openChat={view.openChat}
                  isMinimized={isMinimized}
                  chat={chat}
                />
              )
            )}

          </ScrollArea>
        </section>
        <section className="flex gap-4 items-center p-2 py-4 border-t border-secondary">
          <AvatarDisplay {...user.avatar}/>
          {!isMinimized && <div className="flex flex-col">
            <strong className="block">{user.nickname}</strong>
            <span className="text-xs">@{user.handle}</span>
          </div>}
        </section>
      </aside>
    );
  }
;
export default Sidebar;
