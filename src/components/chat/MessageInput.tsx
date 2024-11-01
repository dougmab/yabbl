import {Input} from '@/components/ui/input.tsx';
import {Button} from '@/components/ui/button.tsx';
import {Send} from 'lucide-react';
import {FormEvent, useEffect, useRef} from 'react';
import {Channel, ChatContext} from '@/page/Chat.tsx';

const MessageInput = ({channel, chat: {sendMessage, currentChannelId}}: { channel: Channel, chat: ChatContext }) => {
  const messageInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messageInput.current?.focus();
  }, [currentChannelId]);

  const handleMessageSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!messageInput.current || !messageInput.current.value.trim()) return;
    sendMessage({
      destination: currentChannelId,
      content: messageInput.current.value,
      scope: channel.type
    });

    messageInput.current.value = '';
    messageInput.current.focus();
  };

  return (
    <form action="" onSubmit={handleMessageSubmit}
          className="fixed bottom-4 w-[calc(100%-50px)] left-1/2 -translate-x-1/2 m-0 sm:relative">
      <Input className="rounded-2xl bg-background" type="text" placeholder="Message" ref={messageInput}/>
      <Button className="absolute right-0 top-1/2 -translate-y-1/2 rounded-2xl ">
        <Send size={20}/>
      </Button>
    </form>
  );
};
export default MessageInput;
