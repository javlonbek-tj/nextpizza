'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { verifyCodeAction, resendCodeAction } from '@/app/actions';

export default function VerifyPage() {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get('userId');

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // start timer function
  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);

    setTimeLeft(60);
    setCanResend(false);

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          if (timerRef.current) clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    if (!userId) {
      router.push('/auth/register');
      return;
    }

    startTimer();

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [userId, router]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length !== 6) {
      toast.error('Введите 6-значный код');
      return;
    }

    setIsLoading(true);
    const result = await verifyCodeAction(userId!, code);

    if (result.success) {
      toast.success('Регистрация успешно завершена!');
      router.push('/auth/login?verified=true');
    } else if (result.error) {
      toast.error(result.error);
    }

    setIsLoading(false);
  };

  const handleResend = async () => {
    if (!canResend || isResending || !userId) return;

    setIsResending(true);
    const result = await resendCodeAction(userId);

    if (result.success) {
      toast.success('Новый код отправлен!');
      setCode('');
      startTimer(); // restart countdown
    } else if (result.error) {
      toast.error(result.error);
    }

    setIsResending(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex justify-center items-center bg-gray-50 px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
      <div className="space-y-8 w-full max-w-md">
        <div>
          <h2 className="mt-6 font-extrabold text-gray-900 text-3xl text-center">
            Подтвердите вашу почту
          </h2>
          <p className="mt-2 text-gray-600 text-sm text-center">
            Мы отправили 6-значный код подтверждения на вашу почту
          </p>
        </div>

        <form className="space-y-6 mt-8" onSubmit={handleVerify}>
          <div>
            <label htmlFor="code" className="sr-only">
              Код подтверждения
            </label>
            <input
              id="code"
              name="code"
              type="text"
              maxLength={6}
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
              className="block focus:z-10 relative px-3 py-4 border border-gray-300 focus:border-indigo-500 rounded-lg focus:outline-none focus:ring-indigo-500 w-full font-mono text-gray-900 text-2xl text-center tracking-widest appearance-none placeholder-gray-500"
              placeholder="000000"
              autoComplete="off"
            />
          </div>

          <div className="text-center">
            {!canResend ? (
              <p className="text-gray-600 text-sm">
                Код истекает через:{' '}
                <span className="font-mono font-bold text-red-600">
                  {formatTime(timeLeft)}
                </span>
              </p>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                disabled={isResending}
                className="disabled:opacity-50 font-medium text-indigo-600 hover:text-indigo-500 text-sm"
              >
                {isResending ? 'Отправка...' : 'Отправить код повторно'}
              </button>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading || code.length !== 6}
              className="group relative flex justify-center bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 px-4 py-3 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 w-full font-medium text-white text-sm disabled:cursor-not-allowed"
            >
              {isLoading ? 'Проверка...' : 'Подтвердить'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
