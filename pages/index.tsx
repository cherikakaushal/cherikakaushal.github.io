import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Nav from '../components/Nav';
import Hero from '../components/Hero';
import Research from '../components/Research';
import Work from '../components/Work';
import { About, Footer } from '../components/AboutFooter';

export type Theme = 'dark' | 'light';

const ThreeBackground = dynamic(() => import('../components/ThreeBackground'), {
  ssr: false,
});

export default function Home() {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    const saved = (localStorage.getItem('ck-theme') as Theme | null) || 'dark';
    setTheme(saved);
    document.documentElement.setAttribute('data-theme', saved);
  }, []);

  const toggleTheme = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('ck-theme', next);
  };

  return (
    <>
      <Head>
        <title>Cherika Kaushal — Research &amp; Software Systems</title>
        <meta name="description" content="Cherika Kaushal builds research software and studies how intelligent systems behave beyond ideal conditions." />
        <link rel="canonical" href="https://cherikakaushal.github.io/" />
      </Head>
      <ThreeBackground theme={theme} />
      <Nav theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero />
        <Research />
        <Work />
        <About />
      </main>
      <Footer />
    </>
  );
}
