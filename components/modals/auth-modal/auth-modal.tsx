'use client';

import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { signIn } from 'next-auth/react';

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { LoginForm } from './forms/login-form';
import { RegisterForm } from './forms/register-form';
import { Button } from '@/components/ui/button';
import { AuthSwitch } from './auth-switch';
import { DEFAULT_LOGIN_REDIRECT } from '@/auth/routes';

interface Props {
  open: boolean;
  onClose: () => void;
}

export function AuthModal({ open, onClose }: Props) {
  const [type, setType] = useState<'login' | 'register'>('login');

  const onSwitchType = () => {
    setType(type === 'login' ? 'register' : 'login');
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="bg-white p-7 w-[450px]">
        <DialogTitle className="font-semibold text-xl text-center">
          {type === 'login' ? 'Войти' : 'Регистрация'}
        </DialogTitle>

        {type === 'login' ? <LoginForm /> : <RegisterForm />}
        <hr className="my-3" />

        <div className="flex gap-2">
          <Button
            variant="secondary"
            onClick={() =>
              signIn('github', {
                callbackUrl: DEFAULT_LOGIN_REDIRECT,
              })
            }
            type="button"
            className="flex-1 gap-2 p-2 h-10 text-amber-950 cursor-pointer"
          >
            <FaGithub className="w-6 h-6" />
            GitHub
          </Button>

          <Button
            variant="secondary"
            onClick={() =>
              signIn('google', {
                callbackUrl: DEFAULT_LOGIN_REDIRECT,
              })
            }
            type="button"
            className="flex-1 gap-2 p-2 h-10 text-amber-950 cursor-pointer"
          >
            <FcGoogle className="w-6 h-6" />
            Google
          </Button>
        </div>

        <AuthSwitch type={type} onSwitch={onSwitchType} />
      </DialogContent>
    </Dialog>
  );
}
