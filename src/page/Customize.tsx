import {Card, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card.tsx';
import {useState} from 'react';
import {Avatar} from '@/page/Chat.tsx';
import {useAuth} from '@/context/auth-provider.tsx';
import AvatarCustomization from '@/components/AvatarCustomization.tsx';
import {Label} from '@/components/ui/label.tsx';
import {Input} from '@/components/ui/input.tsx';
import {Button} from '@/components/ui/button.tsx';
import {isAxiosError} from 'axios';
import {toast} from '@/hooks/use-toast.ts';
import api from '@/lib/api.ts';
import {useNavigate} from 'react-router-dom';

const Customize = () => {
  const {user, fetchUser} = useAuth();
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState({} as Avatar);
  const [nickname, setNickname] = useState(user?.nickname || '');

  const updateProfile = async () => {
      try {
        if (!avatar || !nickname.trim()) return;
        await api.put('/api/user', {avatar, nickname});
        await fetchUser()

        toast({
          title: 'Profile Updated',
          description: 'Your profile was successfully updated'
        });
        navigate('/');
      } catch (e) {
        if (isAxiosError(e)) {
          toast({
            variant: 'destructive',
            title: 'Error',
            description: e.response?.data.message
          })
        }
      }
  }

  return (
    <div className="min-h-screen flex justify-center items-center">
      <Card className="py-1">
        <CardHeader>
          <CardTitle>Customize Your Profile</CardTitle>
          <CardDescription>Add your own personality by creating an avatar and nickname</CardDescription>
        </CardHeader>
        <div className="flex flex-col gap-2 items-center p-4 mb-2">
          <AvatarCustomization updateSettings={setAvatar} avatar={user?.avatar}/>
          <div className="w-full">
            <Label htmlFor="nickname">Nickname</Label>
            <Input id="nickname" type="text" placeholder="The Cool Guy" value={nickname} onChange={(e) => setNickname(e.target.value)}/>
          </div>
        </div>
        <CardFooter className="flex justify-end">
          <Button onClick={updateProfile}>Save</Button>
        </CardFooter>
      </Card>
    </div>
  );
};
export default Customize;
