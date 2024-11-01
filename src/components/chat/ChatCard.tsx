import AvatarDisplay from '@/components/AvatarDisplay.tsx';
import {Channel, ChatContext} from '@/page/Chat.tsx';
import {useEffect, useState} from 'react';
import {useAuth} from '@/context/auth-provider.tsx';
import {useUserCache} from '@/context/user-cache-provider.tsx';

const ChatCard = ({
                    channelId,
                    openChat,
                    isMinimized,
                    chat: {
                      channels,
                      messageFeeds,
                      currentChannelId,
                      changeChannel,
                      subscribeToChannel
                    }
                  }: {
  channelId: string
  openChat: () => void
  isMinimized: boolean
  chat: ChatContext
}) => {
  const {user} = useAuth();
  const {getUser} = useUserCache();
  const {name, avatar, subscription}: Channel = channels.get(channelId) as Channel;
  const messages = messageFeeds.get(channelId) || [];
  const lastMessage = messages[messages.length - 1];
  const [lastMessageNickname, setLastMessageNickname] = useState('');
  const [notification, setNotification] = useState(false);

  useEffect(() => {
    if (currentChannelId !== channelId && lastMessage && lastMessage.sender !== user?.handle) {
      setNotification(true);
    }
  }, [messages]);

  useEffect(() => {
    if (channels.get(channelId)?.type !== 'PRIVATE')
      subscribeToChannel(channelId);
    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const LastMessage = () => {

    if (lastMessage)
      getUser(lastMessage.sender).then((user) => {
        setLastMessageNickname(user.nickname);
      });

    return (
      <div>
        <h3 className="mb-2">{name}</h3>
        {(lastMessage) ?
          <p className="w-48 lg:w-64 truncate ..."><strong>{lastMessageNickname || lastMessage.sender}</strong>: {lastMessage.content}</p> :
          <p></p>}
      </div>
    );
  };

  return (
    <div className={`bar-button relative ${currentChannelId === channelId ? 'bg-secondary' : ''}`}
         onClick={() => {
           // if (currentChannelId === channelId) return;
           changeChannel(channelId);
           openChat();
           if (notification) setNotification(false);
         }
         }>
      <AvatarDisplay {...avatar}/>

      {!isMinimized && <LastMessage/>}

      {notification &&
        <div className="h-[15px] w-[15px] bg-red-500 rounded-full absolute top-0 right-0 text-center"></div>}

    </div>
  );
};
export default ChatCard;
