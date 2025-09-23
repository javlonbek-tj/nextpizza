import Link from 'next/link';
import { User, CircleUser } from 'lucide-react';
import { Button } from '../ui/button';

interface Props {
  onClickSignIn?: () => void;
}

export function ProfileButton({ onClickSignIn }: Props) {
  const isAuthenticated = false; // TODO Replace with actual authentication logic

  return (
    <>
      {!isAuthenticated ? (
        <Button
          variant='outline'
          className='transition duration-300 cursor-pointer flex items-center gap-2'
          onClick={onClickSignIn}
        >
          <User size={18} />
          <span>Профиль</span>
        </Button>
      ) : (
        <Link href='/profile'>
          <Button variant='secondary' className='flex items-center gap-2'>
            <CircleUser size={18} />
            Профиль
          </Button>
        </Link>
      )}
    </>
  );
}
