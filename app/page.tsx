"use client";

import dynamic from 'next/dynamic';
import { navItems } from '@/data';

const Approach = dynamic(() => import('@/components/Approach'), { ssr: false });
const Experience = dynamic(() => import('@/components/Experience'), { ssr: false });
const Footer = dynamic(() => import('@/components/Footer'), { ssr: false });
const Grid = dynamic(() => import('@/components/Grid'), { ssr: false });
const Hero = dynamic(() => import('@/components/Hero'), { ssr: false });
const Projects = dynamic(() => import('@/components/Projects'), { ssr: false });
const FloatingNav = dynamic(() => import('@/components/ui/FloatingNav'), { ssr: false });

export default function Home() {
  return (
    <main className="relative bg-black flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <div className="max-w-7xl w-full">
        <FloatingNav navItems={navItems} />
        <Hero />
        <Grid />
        <Projects />
        <Experience />
        <Approach />
        <Footer />
      </div>
    </main>
  );
}