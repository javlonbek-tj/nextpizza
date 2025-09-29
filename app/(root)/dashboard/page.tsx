// app/dashboard/page.tsx
import { auth } from '@/auth/auth';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const session = await auth();

  // Add server-side auth check as fallback
  if (!session?.user) {
    redirect('/auth/login');
  }

  return (
    <div className='p-6'>
      <h1 className='text-xl font-bold'>Dashboard</h1>
      <p>Welcome, {session.user.email}</p>
      <div className='mt-4 p-4 bg-gray-100 rounded'>
        <h2 className='font-semibold'>Session Info:</h2>
        <pre className='text-sm mt-2'>{JSON.stringify(session, null, 2)}</pre>
      </div>
    </div>
  );
}
