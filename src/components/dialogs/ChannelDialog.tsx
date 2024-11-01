import {DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle} from '@/components/ui/dialog.tsx';
import React, {ChangeEvent, useState} from 'react';
import {Button} from '@/components/ui/button.tsx';
import {Input} from '@/components/ui/input.tsx';
import {Label} from '@/components/ui/label.tsx';
import {Avatar, Channel} from '@/page/Chat.tsx';
import AvatarCustomization from '@/components/AvatarCustomization.tsx';
import {toast} from '@/hooks/use-toast.ts';
import {isAxiosError} from 'axios';
import api from '@/lib/api.ts';

type MultiDialog = {
  title: string,
  description: string,
  content: React.ReactNode
}

type Views = 'JOIN' | 'CREATE'

const CreateChannel = ({
                         changeView,
                         addNewChannel,
                         close
                       }:
                         {
                           changeView: (view: Views) => void;
                           addNewChannel: (channel: Channel) => void;
                           close: () => void;
                         }) => {
  const [avatar, setAvatar] = useState({} as Avatar);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const createRoom = async () => {
    try {
      const {data} = await api.post('/api/room', {name, description, avatar});
      addNewChannel(data.result);
      toast({
        title: 'Room Created',
        description: `The room ${name} was created`,
      });
      alert(JSON.stringify({name, avatar}));

      close();
    } catch (e) {
      if (isAxiosError(e)) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: e.response?.data.message,
        });
      }
    }
  };

  return (
    <>
      <div>
        <div className="flex flex-col items-center gap-4">
          <AvatarCustomization updateSettings={setAvatar}/>
          <div className="w-full">
            <Label htmlFor="name">Room's Name <span className="text-destructive">*</span></Label>
            <Input id="name" type="text" className="mb-2" placeholder="The Cool Room" value={name}
                   onChange={(e) => setName(e.target.value)}/>

            <Label htmlFor="name">Room's Description</Label>
            <Input id="name" type="text" placeholder="A cool room for cool dudes" value={description}
                   onChange={(e) => setDescription(e.target.value)}/>
          </div>
        </div>
      </div>
      <DialogFooter className="sm:justify-between">
        <Button variant="secondary" onClick={() => changeView('JOIN')}>Join an existing room</Button>
        <Button onClick={createRoom}>Create</Button>
      </DialogFooter>
    </>
  );
};

const JoinChannel = ({
                       changeView,
                       addNewChannel,
                       close
                     }:
                       {
                         changeView: (view: Views) => void;
                         addNewChannel: (channel: Channel) => void;
                         close: () => void;
                       }) => {
  const [invite, setInvite] = useState('');


  const joinRoom = async () => {
    try {
      const {data} = await api.get(`/api/invite/${invite}`);
      addNewChannel(data.result);
      toast({
        title: 'Room Joined',
        description: `You joined the room ${data.result.name} successfully`
      });
      close();
      changeView('CREATE');
    } catch (e) {
      if (isAxiosError(e)) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: e.response?.data.message
        });
      }
    }
  };
  return (
    <>
      <div>
        <Label htmlFor="invite">Invite Code <span className="text-destructive">*</span></Label>
        <Input id="invite" type="text" placeholder="7D9A4G1H" value={invite}
               onChange={(e) => setInvite(e.target.value)}/>
      </div>
      <div>
        <h4 className="text-sm font-medium mb-1">It should look like one of those:</h4>
        <ul className="text-sm list-disc pl-4">
          <li>{window.location.origin}/invite/A1B2C3D4</li>
          <li>A1B2C3D4</li>
        </ul>
      </div>
      <DialogFooter className="sm:justify-between">
        <Button variant="link" onClick={() => changeView('CREATE')}>Back</Button>
        <Button onClick={joinRoom}>Join</Button>
      </DialogFooter>
    </>
  );
};

const ChannelDialog = ({addNewChannel, close}: { addNewChannel: (channel: Channel) => void, close: () => void }) => {
  const [view, setView] = useState<Views>('CREATE');

  const dialog: {
    'CREATE': MultiDialog,
    'JOIN': MultiDialog
  } = {
    'CREATE': {
      title: 'Create a new Room',
      description: 'Create and invite your friends to your private room',
      content: <CreateChannel changeView={setView} addNewChannel={addNewChannel} close={close}/>
    },
    'JOIN': {
      title: 'Join a Existing Room',
      description: 'Enter an invite bellow to join an existing room',
      content: <JoinChannel changeView={setView} addNewChannel={addNewChannel} close={close}/>
    }
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{dialog[view].title}</DialogTitle>
        <DialogDescription>{dialog[view].description}</DialogDescription>
      </DialogHeader>
      {dialog[view].content}
    </DialogContent>
  );
};
export default ChannelDialog;