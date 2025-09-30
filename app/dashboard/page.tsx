export default async function DashboardPage() {
  return (
    <div className='p-6'>
      <h1 className='text-xl font-bold'>Dashboard</h1>
      <p>Welcome, </p>
      <div className='mt-4 p-4 bg-gray-100 rounded'>
        <h2 className='font-semibold'>How are you:</h2>
        <pre className='text-sm mt-2'>Hello</pre>
      </div>
    </div>
  );
}
