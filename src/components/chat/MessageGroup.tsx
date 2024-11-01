import AvatarDisplay from '@/components/AvatarDisplay.tsx';
import {useUserCache} from '@/context/user-cache-provider.tsx';
import {useAuth, User} from '@/context/auth-provider.tsx';
import {useEffect, useState} from 'react';

const MessageBubble = ({
                         sender, content, currentUser
                       }: {
  sender?: string,
  content: string,
  currentUser?: boolean,
}) => {
  return <div className={`rounded-xl p-2 w-fit ${currentUser ? 'items-start bg-sent-message' : 'bg-received-message'}`}>
    {sender && <strong className="text-sm">{sender}</strong>}
    <p className="max-w-sm lg:max-w-xl">{content}</p>
  </div>;
};

const MessageGroup = ({
                        sender, messages, currentChannelId
                      }: {
                        sender: string,
                        messages: string[],
                        currentChannelId: string
                      }
) => {
  const [userData, setUserData] = useState<User | null>(null);

  const [isLoading, setLoading] = useState(true);
  //
  // let userData: User = {
  //   nickname: sender,
  //   handle: sender,
  //   avatar: {
  //     ascii: '',
  //     backgroundHexColor: 'FFFFFF',
  //     foregroundHexColor: '000000'
  //   },
  //   roles: [
  //     {
  //       id: 2,
  //       name: 'USER'
  //     }
  //   ]
  // };

  console.log('DEU RERENDER', sender, messages);

  const {getUser} = useUserCache();
  const {user: currentUser} = useAuth();


  const isCurrentUser = sender === currentUser?.handle;

  const fetchUserAndSet = () => getUser(sender).then((data) => {
    setUserData(data);
  });

  useEffect(() => {
    console.log(sender);
    setLoading(true);
    void fetchUserAndSet().then(() => setLoading(false));
  }, [currentChannelId]);

  // const userData = getUser(sender);


  if (isLoading) return null;

  if (userData)
    return (
      <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} gap-2 mb-4`}>
        <div className="flex gap-2">

          {!isCurrentUser && <AvatarDisplay {...userData.avatar} size={40}/>}

          <div className={`flex flex-col gap-2 ${isCurrentUser ? 'items-end' : 'items-start'}`}>

            {messages.map((message, i) => {
              if (isCurrentUser) {
                return (
                  <MessageBubble
                    key={i}
                    content={message}
                    currentUser
                  />
                );
              }

              if (i === 0)
                return (
                  <MessageBubble
                    key={i}
                    sender={userData.nickname}
                    content={message}
                  />
                );

              return (
                <MessageBubble
                  key={i}
                  content={message}
                />
              );
            })}

          </div>
        </div>
      </div>
    )
      ;
};
export default MessageGroup;
