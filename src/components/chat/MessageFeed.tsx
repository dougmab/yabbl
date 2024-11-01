import {ScrollArea} from '@/components/ui/scroll-area.tsx';
import MessageGroup from '@/components/chat/MessageGroup.tsx';
import {useRef} from 'react';
import {ChatContext} from '@/page/Chat.tsx';

const MessageFeed = (
  {chat}: { chat: ChatContext }
) => {
  const {messageFeeds, currentChannelId} = chat;

  const scrollArea = useRef<HTMLDivElement>(null);

  const messages = messageFeeds.get(currentChannelId) || [];

  let currentSender = '';

  // useEffect(() => {
  //   }
  // }, [messages]);

  if (scrollArea.current)
    scrollArea.current.scrollIntoView({block: 'end'});


  const groupedMessages = [] as {
    sender: string,
    messages: string[]
  }[];

  messages.forEach((message) => {
    if (!groupedMessages || message.sender !== currentSender) {
      groupedMessages.push({
        sender: message.sender,
        messages: [message.content]
      });
      currentSender = message.sender;
    } else {
      groupedMessages[groupedMessages.length - 1].messages.push(message.content);
    }
  });
  console.log(groupedMessages);

  return (
    <ScrollArea className="flex-1">
      <div className="flex flex-col h-full p-3 pb-16 md:pb-2 space-y-2" ref={scrollArea}>
        {groupedMessages.map((group, i) => (
            <MessageGroup
              key={i}
              sender={group.sender}
              messages={group.messages}
              currentChannelId={currentChannelId}
            />
          )
        )}
      </div>
    </ScrollArea>
  );
};

export default MessageFeed;
