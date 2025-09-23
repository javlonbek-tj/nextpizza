'use client';

import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { signIn } from 'next-auth/react';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { LoginForm } from './forms/login-form';
import { SignUpForm } from './forms/signup-form';
import { Button } from '@/components/ui/button';

interface Props {
  open: boolean;
  onClose: () => void;
}

export function AuthModal({ open, onClose }: Props) {
  const [type, setType] = useState<'login' | 'signup'>('login');

  const onSwitchType = () => {
    setType(type === 'login' ? 'signup' : 'login');
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className='w-[450px] bg-white p-10'>
        {type === 'login' ? <LoginForm /> : <SignUpForm />}
        <hr />

        <div className='flex gap-2'>
          <Button
            variant='secondary'
            onClick={() =>
              signIn('github', {
                callbackUrl: '/',
                redirect: true,
              })
            }
            type='button'
            className='gap-2 h-12 p-2 flex-1'
          >
            <FaGithub className='w-6 h-6' />
            GitHub
          </Button>

          <Button
            variant='secondary'
            onClick={() =>
              signIn('google', {
                callbackUrl: '/',
                redirect: true,
              })
            }
            type='button'
            className='gap-2 h-12 p-2 flex-1'
          >
            <FcGoogle className='w-6 h-6' />
            Google
          </Button>
        </div>

        <Button
          variant='outline'
          onClick={onSwitchType}
          type='button'
          className='h-12'
        >
          {type !== 'login' ? 'Войти' : 'Регистрация'}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
