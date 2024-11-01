import Sidebar from '@/components/Sidebar.tsx';
import ChatRoom from '@/components/chat/ChatRoom.tsx';
import UserCacheProvider from '@/context/user-cache-provider.tsx';
import {useCallback, useEffect, useState} from 'react';
import {CompatClient, IFrame, IMessage, Stomp, StompSubscription} from '@stomp/stompjs';
import SockJs from 'sockjs-client';
import Cookies from 'js-cookie';
import {useAuth} from '@/context/auth-provider.tsx';
import api from '@/lib/api.ts';
import {toast} from '@/hooks/use-toast.ts';

export type Channel = {
  id: string,
  name: string,
  description?: string,
  avatar: Avatar,
  subscription?: StompSubscription,
  type: 'GROUP' | 'PRIVATE'
}

export type Message = {
  sender: string,
  receiver: string,
  content: string,
  date: string,
  status: 'JOIN' | 'LEAVE' | 'CHAT'
}

export type Avatar = {
  ascii: string,
  backgroundHexColor: string
  foregroundHexColor: string,
}

export type MessageMetadata = {
  destination: string,
  content: string
  scope: 'PRIVATE' | 'GROUP'
}

export type ChatContext = {
  channels: Map<string, Channel>,
  activeMessages: Message[],
  changeChannel: (roomId: string) => void,
  subscribeToChannel: (channelId: string) => void,
  addNewChannel: (channel: Channel) => void,
  sendMessage: (message: MessageMetadata) => void,
  messageFeeds: Map<string, Message[]>,
  currentChannelId: string
}

let stompClient: CompatClient | null = null;
const Chat = () => {
    const [isMobile, setMobile] = useState(false);
    const [isViewingChat, setViewingChat] = useState(false);
    const [channels, setChannels] = useState(new Map<string, Channel>());
    const [messageFeeds, setMessageFeeds] = useState(new Map<string, Message[]>());
    const [activeMessageFeed, setActiveMessageFeed] = useState<Message[]>([]);
    const [currentChannelId, setCurrentChannelId] = useState('');
    const {user, isAuthenticated} = useAuth();
    // const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
      window.addEventListener('resize', () => {
        // setWindowWidth(window.innerWidth);
        setMobile(window.innerWidth < 768);
      });
    }, []);

    const changeToMenu = () => {
      setViewingChat(false);
    };

    const openChat = () => {
      setViewingChat(true);
    };

    useEffect(() => {
      const socket = new SockJs(`${import.meta.env.VITE_API_URL}/ws`);
      stompClient = Stomp.over(() => socket);

      if (!stompClient.connected) {
        stompClient.connect({
          'Authorization': `Bearer ${Cookies.get('yabbl.token')}`
        }, async () => {
          void fetchRooms();
          stompClient?.subscribe(`/user/queue/messages`, handlePrivateMessages);
        }, (error: IFrame) => {
          toast({
            variant: 'destructive',
            title: 'Error',
            description: 'Could not connect to the chat server',
          });
          console.log(error);
        });
      }

      return () => {
        if (stompClient && stompClient.connected) {
          stompClient.disconnect();
        }
      };
    }, [isAuthenticated]);

    const updateChannels = (channelId: string, newChannel: Channel) => {
      setChannels((prevChannels) => {
        const newMap = new Map(prevChannels);
        newMap.set(channelId, newChannel);
        return newMap;
      });
    }

    const handlePrivateMessages = async (message: IMessage) => {
      const parsedMessage = JSON.parse(message.body);

      let userChannelId = parsedMessage.sender;

      if (parsedMessage.sender === user?.handle) {
        userChannelId = parsedMessage.receiver;
      }

      if (!channels.has(userChannelId)) {
        const {data} = await api.get(`/api/user/${userChannelId}`);
        const newChannel: Channel = {
          id: userChannelId,
          name: data.result.nickname,
          avatar: data.result.avatar,
          type: 'PRIVATE'
        };
        updateChannels(userChannelId, newChannel);
      }

      console.log('Handling private messages: ', parsedMessage);

      setMessageFeeds((prevMessagesMap) => {
        return handleMessages(userChannelId, parsedMessage, prevMessagesMap);
      });
    };

    const handleMessages = (id: string, newMessage: Message, prevMessagesMap: Map<string, Message[]>) => {
      console.log('Handling messages: ', newMessage);
      const updatedMessagesMap = new Map(prevMessagesMap);
      const messages = updatedMessagesMap.get(id) || [];
      const newMessagesArr = [...messages, newMessage];
      updatedMessagesMap.set(id, newMessagesArr);
      if (currentChannelId === id) {
        setActiveMessageFeed(newMessagesArr);
      }
      return updatedMessagesMap;
    };

    const subscribeToChannel = (channelId: string) => {
      if (stompClient && stompClient.connected) {
        let channel = channels.get(channelId);
        console.log('Subscribing to chat ', channelId);

        if (!(channel && channel.subscription)) {
          const subscription = stompClient.subscribe(`/topic/chat/${channelId}`, (message: IMessage) => {
            const parsedMessage = JSON.parse(message.body);

            setMessageFeeds((prevMessagesMap) => {
              return handleMessages(channelId, parsedMessage, prevMessagesMap);
            });

            let channel = channels.get(channelId) as Channel;
            channel.subscription = subscription;
            updateChannels(channelId, channel);
          });
        }
      }
    };

    const changeChannel = (channelId: string) => {
      setActiveMessageFeed(messageFeeds.get(channelId) || []);
      setCurrentChannelId(channelId);
    };

    const addNewChannel = (channel: Channel) => {
      setChannels(new Map(channels.set(channel.id, channel)));
      setCurrentChannelId(channel.id)
    }

    const fetchRooms = useCallback(async () => {
      try {
        const {data} = await api.get('/api/user/me/room');
        setChannels(new Map(data.result.map((room: Channel) => {
            return [room.id, {...room, type: 'GROUP'}];
          }
        )));
      } catch (e) {
        console.error(e);
      }
    }, []);

    const sendMessage = async (message: MessageMetadata) => {
      if (!(stompClient && stompClient.connected)) {
        return;
      }

      if (message.scope === 'PRIVATE') {
        stompClient.send('/app/chat/sendPrivateMessage', {}, JSON.stringify({
          receiver: message.destination,
          content: message.content,
        }));
      } else {
        stompClient.send('/app/chat/sendMessage', {}, JSON.stringify({
          channelId: message.destination,
          content: message.content,
          type: 'CHAT'
        }));
      }
    }

    const chatContext: ChatContext = {
      channels,
      activeMessages: activeMessageFeed,
      changeChannel,
      subscribeToChannel,
      addNewChannel,
      sendMessage,
      messageFeeds,
      currentChannelId
    };

    return (
      <div className="flex h-screen max-h-screen">
        <UserCacheProvider>
          <Sidebar
            view={{
              isVisible: (!isViewingChat || !isMobile),
              isMobile,
              openChat
            }}
            chat={chatContext}
          /> {/*renders if user is not on chat view or is not on mobile */}
          {(isViewingChat || !isMobile) &&
            <ChatRoom view={{changeToMenu, isMobile}}
                      chat={chatContext}/>
          } {/*renders if user is on chat view or if he is on desktop*/}
        </UserCacheProvider>
      </div>
    );
  }
;
export default Chat;
