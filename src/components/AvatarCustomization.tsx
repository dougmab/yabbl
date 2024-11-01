import {ChangeEvent, useEffect, useState} from 'react';
import AvatarDisplay from '@/components/AvatarDisplay.tsx';
import {Input} from '@/components/ui/input.tsx';
import {Avatar} from '@/page/Chat.tsx';

const AvatarCustomization = ({updateSettings, avatar} : { updateSettings: (avatar: Avatar) => void, avatar?: Avatar}) => {
  const [backgroundHexColor, setBackgroundHexColor] = useState(avatar?.backgroundHexColor || '#C4C4C4');
  const [foregroundHexColor, setForegroundHexColor] = useState(avatar?.foregroundHexColor || '#000000');
  const [ascii, setAscii] = useState(avatar?.ascii || '-o-');

  useEffect(() => {
    updateSettings({backgroundHexColor, foregroundHexColor, ascii});
  }, [backgroundHexColor, foregroundHexColor, ascii]);

  return (
    <div className="flex gap-4 items-center">
      <AvatarDisplay backgroundHexColor={backgroundHexColor} foregroundHexColor={foregroundHexColor} ascii={ascii}
                     size={100}/>
      <div className="space-y-2">
        <div className="flex gap-2">
          <Input type="color" placeholder="Background Color" value={backgroundHexColor}
                 onChange={(e: ChangeEvent<HTMLInputElement>) => setBackgroundHexColor(e.target.value)}
                 title="Set Background"/>
          <Input type="color" placeholder="Foreground Color" value={foregroundHexColor}
                 onChange={(e: ChangeEvent<HTMLInputElement>) => setForegroundHexColor(e.target.value)}
                 title="Set Foreground"/>
        </div>

        <Input type="text" placeholder="-o-" value={ascii}
               onChange={(e: ChangeEvent<HTMLInputElement>) => setAscii(e.target.value)}/>
      </div>
    </div>
  );
};
export default AvatarCustomization;
