import Head from 'next/head';
import P5Sketch from '../components/P5Sketch';

const HomePage = () => {
  return (
    <div>
      <Head>
        <title>My p5.js Next.js App</title>
        <meta name='description' content='p5.js Next.js application' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <h1>Welcome to my p5.js Next.js App</h1>
        <P5Sketch />
      </main>

      <footer>
        <p>Created with love by Your Name</p>
      </footer>
    </div>
  );
};

export default HomePage;
