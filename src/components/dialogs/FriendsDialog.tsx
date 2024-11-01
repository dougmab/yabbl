import {DialogContent, DialogDescription, DialogHeader, DialogTitle} from '@/components/ui/dialog.tsx';
import {Input} from '@/components/ui/input.tsx';
import {FormEvent, useRef, useState} from 'react';
import {useAuth, User} from '@/context/auth-provider.tsx';
import {isAxiosError} from 'axios';
import {toast} from '@/hooks/use-toast.ts';
import api from '@/lib/api.ts';
import {ScrollArea} from '@/components/ui/scroll-area.tsx';
import AvatarDisplay from '@/components/AvatarDisplay.tsx';
import {ChatContext} from '@/page/Chat.tsx';

const FriendsDialog = ({close, chat}: { close: () => void, chat: ChatContext }) => {
  const {user: currentUser} = useAuth()

    const handleInputRef = useRef<HTMLInputElement>(null);
    const [users, setUsers] = useState([] as User[]);

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const input = handleInputRef.current;

      if (input && input.value.trim()) {
        try {
          const {data} = await api.get(`/api/user?filterByHandle=${input.value}`);

          const responseUsers = data.result.content.filter((user: User) => currentUser?.handle !== user.handle);
          setUsers(responseUsers);
        } catch (e) {
          if (isAxiosError(e)) {
            toast({
              variant: 'destructive',
              title: 'Error',
              description: e.response?.data.message,
            });
          }
        }
      }
    };

    const chatUser = (user: User) => {
      chat.addNewChannel({
        id: user.handle,
        name: user.nickname,
        avatar: user.avatar,
        type: 'PRIVATE'
      });
      close();
    }

    return (
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Friends
          </DialogTitle>
        </DialogHeader>
        <DialogDescription>Add and talk to friends</DialogDescription>
        <div className="space-y-4">
          <form action="" onSubmit={onSubmit}>
            <div className="flex items-center rounded-md border border-input bg-accent">
          <span className="px-2 text-opacity-5">
                  @
                </span>
              <Input className="border-none rounded-l-none bg-background" placeholder="user_handle" ref={handleInputRef}/>
            </div>
          </form>
          <div>
            <ScrollArea>
              <div className="space-y-1">
                {users.map((user) => (
                  <div key={user.handle} className="flex items-center justify-between p-2 rounded-lg hover:bg-border cursor-pointer" onClick={() => chatUser(user)}>
                    <div className="flex gap-2 items-center">
                      <AvatarDisplay {...user.avatar}/>
                      <strong>{user.nickname}</strong>
                      <span className="text-sm opacity-70">@{user.handle}</span>
                    </div>

                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    );
  }
;
export default FriendsDialog;
