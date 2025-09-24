'use client';

interface AuthSwitchProps {
  type: 'login' | 'register';
  onSwitch: () => void;
}

export function AuthSwitch({ type, onSwitch }: AuthSwitchProps) {
  return (
    <p className='text-sm text-muted-foreground text-center'>
      {type !== 'login' ? (
        <>
          Уже есть аккаунт?{' '}
          <button
            type='button'
            onClick={onSwitch}
            className='text-primary hover:underline font-medium cursor-pointer'
          >
            Войти
          </button>
        </>
      ) : (
        <>
          Нет аккаунта?{' '}
          <button
            type='button'
            onClick={onSwitch}
            className='text-primary hover:underline font-medium cursor-pointer'
          >
            Регистрация
          </button>
        </>
      )}
    </p>
  );
}
