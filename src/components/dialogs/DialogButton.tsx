import {Dialog, DialogTrigger} from '@/components/ui/dialog.tsx';
import React, {useState} from 'react';

export type Closeable = {
  close: () => void
}

export type Sizeable = {
  size: number
}

const DialogButton = <ExtraProps extends {}>({isMinimized, title, icon, DisplayDialog, dialogProps}:
                        {
                          isMinimized: boolean;
                          title: string;
                          icon: React.ReactNode;
                          DisplayDialog: React.ComponentType<Closeable & ExtraProps>;
                          dialogProps: ExtraProps;
                        }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <div className={`bar-button ${isMinimized && 'justify-center'}`} title={title}>
          {icon}
          {!isMinimized && title}
        </div>
      </DialogTrigger>
      <DisplayDialog {...dialogProps} close={() => setIsOpen(false)}/>
    </Dialog>
  );
};
export default DialogButton;
