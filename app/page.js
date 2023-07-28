import Head from 'next/head';
import dynamic from 'next/dynamic';

const DynamicMazeGenerator = dynamic(
  () => import('../components/MazeGenerator'),
  { ssr: false }
);

const HomePage = () => {
  return (
    <div>
      <Head>
        <title>Maze Generator</title>
      </Head>
      <main className='flex flex-col min-h-screen items-center justify-center'>
        <h1 className='my-3 text-2xl font-medium text-emerald-500'>
          Maze Generator
        </h1>
        <DynamicMazeGenerator />
      </main>
    </div>
  );
};

export default HomePage;
