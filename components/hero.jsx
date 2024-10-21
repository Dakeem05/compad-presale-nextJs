import React from 'react';
import './hero.css';
import Nav from './Nav';
import heroImage from './images/HeroPic.webp'
import Image from 'next/image';


const Hero = () => {
return (
        <section className="bg-[#050126] w-full h-fit pb-[4rem]">
        <Nav />
        <div className="max-w-6xl mx-auto pt-[5rem] lg:mpt-0 flex flex-col lg:flex-row px-[0.8rem] xs:px-[1rem] sm:px-[2rem] xl:px-[0]">
        <article className="mt-[5rem] text-white w-full lg:w-[50%]">
        <h1 className="text text-[2rem] sm:text-[2.5rem] sm:hidden font-bold">Be at the Forefront of Innovation with COMPAD</h1>
        <h1 className="text text-[2rem] hidden sm:block sm:text-[2.5rem] font-bold">Be at the Forefront of </h1>
        <h1 className="text text-[2rem] hidden sm:block sm:text-[2.5rem] -mt-3 font-bold">Innovation with COMPAD</h1>
        <p className="text-lg mt-[1rem]">Invest in the Future with Confidence: COMPAD&apos;s Highly-Vetted Web3 Projects, Supported by Top Creators and Funds.</p>
        <div className="mt-[2rem] flex flex-col [@media_(min-width:400px)]:flex-row gap-[1rem]">
        <a href="https://compad-1.gitbook.io/compad-white-paper" className="box font-semibold text-lg" target="_blank" rel="noopener noreferrer">Whitepaper</a>
        <a href="https://play.google.com/store/apps/details?id=com.compad.app&hl=en&gl=US" className="box font-semibold text-lg" target="_blank" rel="noopener noreferrer">Launchpad</a>
        </div>
        </article>
        <div className="w-full lg:w-[50%]">
        {/* <img src='./images/HeroPic.webp' className="object-contain animated mt-[2rem] pulse infinite" style={{ animationDuration: '3s', width: '200%' }} alt="" /> */}
        <Image
        src={heroImage} alt='illustration' className='animate-pulse'
        />
        </div>
        </div>
        </section>
        )
}

export default Hero;
