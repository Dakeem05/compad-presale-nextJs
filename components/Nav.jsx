'use client'
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import abi from "../contracts/contract-abi.json";
import logo from './images/logo.png';
// import { ConnectButton } from '@rainbow-me/rainbowkit';
// import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useReadContract} from "wagmi";
import { useWeb3Modal } from '@web3modal/wagmi/react'

const Nav = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isSide, setIsSide] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [scroll, setScroll] = useState(0);
  const [days, setDays] = useState('00');
  const [hours, setHours] = useState('00');
  const [minutes, setMinutes] = useState('00');
  const [seconds, setSeconds] = useState('00');
  const sideRef = useRef(null);
  const { address } = useAccount();
  const ulRef = useRef(null);
  const { open } = useWeb3Modal()
  const connectHandler = () => {
    // Logic for connecting wallet
    setIsConnected(!isConnected);
  };

  const { data : isEnded } = useReadContract({
    abi: abi,
    address: "0xa0584c52752b63a4A77479c384902B05861C07E6",
    functionName: "saleEnded",
    args: [],
  })

  const sideBarOpen = () => {
    setIsSide(true);
    sideRef.current.classList.remove('-translate-x-[105%]');
};

const sideBarClose = () => {
    setIsSide(false);
    sideRef.current.classList.add('-translate-x-[105%]');
  };

  const sectionClasses = ['hidden', 'lg:block'];

  if (scrolled) {
    sectionClasses.push(
        'bg-[rgba(255,_255,_255,_0.44)]',
        'box-shadow:0_4px_30px_rgba(0,_0,_0,_0.1)',
        'backdrop-filter',
        'backdrop-blur-[12.6px]',
        'border-[1px]',
        'border-[solid]',
        'border-[rgba(255,255,255,0.75)]',
        'w-[100%]',
        'top-[0.6rem]',
        'xl:w-[1200px]',
        'px-[2.5rem]',
        'fixed',
        'right-0',
        'left-0',
        'xl:mx-auto',
        'rounded-[4rem]',
        'z-[60]',
        'dark:bg-transparent',
        'pt-[0.2rem]',
        'pb-[0.5rem]',
        'xl:pb-[0.5rem]'
    );
    } else {
        sectionClasses.push(
            'relative',
            'text-white',
            'border-b-[1px]',
            'backdrop-blur-[8.6px]',
            'border-b-[solid]',
            'border-b-[rgba(255,255,255,0.75)]',
            'xl:px-0',
            'sm:px-[3rem]',
            'xs:px-[2rem]',
            'xxs:px-[1rem]',
            'px-[0.8rem]',
            'pb-[0.7rem]',
            'flex'
        )
    }

    const scrollToBottom = () => {
      if (address) {
        setIsSide(false);
        sideRef.current.classList.add('-translate-x-[105%]');
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      } 
      // else {
        open();
      // }
        
    };

  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > 0) {
      setScrolled(true);
    //   alert(scrolled)
    } else {
      setScrolled(false);
    }
  };

  // Attach scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    setIsFinished(isEnded);
    if(isEnded == true){
      // clearInterval(interval);
        setDays('00');
        setHours('00');
        setMinutes('00');
        setSeconds('00');
        console.log('Finished private sale');
        setIsFinished(true);
    }
    
    
    // alert(isEnded)
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isEnded]);

  useEffect(() => {
    const endDate = new Date('2024-04-23T00:00:00');
    endDate.setHours(endDate.getHours() + 48);
    if(isEnded == false){
      const interval = setInterval(() => {
        const now = new Date();
        const timeDifference = endDate - now;
  
        
  
        if (timeDifference <= 0) {
          clearInterval(interval);
          setDays('00');
          setHours('00');
          setMinutes('00');
          setSeconds('00');
          console.log('Finished private sale');
          setIsFinished(true);
        } else {
          const remainingDays = String(Math.floor(timeDifference / (1000 * 60 * 60 * 24))).padStart(2, '0');
          const remainingHours = String(Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
          const remainingMinutes = String(Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
          const remainingSeconds = String(Math.floor((timeDifference % (1000 * 60)) / 1000)).padStart(2, '0');
  
          setDays(remainingDays);
          setHours(remainingHours);
          setMinutes(remainingMinutes);
          setSeconds(remainingSeconds);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
    
   

  }, [isEnded]);

  return (
    <>
      <section
        className={`bg-[rgba(255,255,255,0.14)] shadow-md backdrop-filter backdrop-blur-[12.6px] border-b-[1px] border-b-solid border-b-[rgba(255,255,255,0.75)] lg:hidden pt-[0.7rem] pb-[0.7rem] px-[0.7rem] xs:px-[2rem] sm:px-[3rem] z-[60] fixed top-0 left-0 flex right-0 w-full ${
          scrolled ? '' : ' fixed text-white border-b-[1px] backdrop-blur-[8.6px] border-b-solid border-b-[rgba(255,255,255,0.75)] xl:px-0 sm:px-[3rem] xs:px-[2rem] xxs:px-[1rem] px-[0.8rem] pb-[0.7rem] flex'
        }`}
      >
        <button onClick={scrollToBottom} className="glass text-white capitalize py-3 px-[1rem] font-medium rounded-md">
        {
                  address ? (
                    <>
                    {isFinished == true ? <div>Claim  <span className="text-[#FFA500] font-bold">$COM</span></div> : <div>Buy  <span className="text-[#FFA500] font-bold">$COM</span></div>}
                    </>
                  ) : 'Connect'
                }
        </button>
        <div className="w-fit absolute top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2 mx-auto">
          <a href="/" className="text-2.2rem text-black flex gap-2 font-surfer font-400">
            <div className="flex">
              <figure className="w-[5rem] sm:w-[8rem]"><Image src={logo} className="object-contain" alt="" /></figure>
              <figcaption className="text-[#FFA500] hidden md:block text-3xl font-bold pt-[12%]">Compad</figcaption>
            </div>
          </a>
        </div>
        <p className="text-white absolute right-[0.5rem] text-1rem pr-[1rem] mt-[1rem] ">
          {isSide == false ? 
          <button onClick={sideBarOpen}>
          <svg xmlns="http://www.w3.org/2000/svg" class="w-[1.5rem] h-[1.5rem]" viewBox="0 0 42 29" fill="currentColor">
          <path d="M1.00667 1H41M1 14.3311H40.9833M1.00667 27.6622H40.9833" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button> :
        <button onClick={sideBarClose} className="text-[2rem]">
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em"  viewBox="0 0 24 24"><path fill="currentColor" d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275q-.275-.275-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7q.275-.275.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275q.275.275.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7q-.275.275-.7.275t-.7-.275L12 13.4Z"></path></svg>
        </button>
        }
          
        </p>
        <div></div>
      </section>

      <div
        className={`bg-[rgba(0,0,0,0.849)] lg:hidden fixed w-full text-white -translate-x-[105%] transition-transform duration-500 overflow-y-auto overscroll-y-none h-screen z-[59] top-[3.3rem] pt-[4.5rem] px-[1rem] xs:px-[2rem] sm:px-[3rem]`}
        ref={sideRef}
      >
        <ul ref={ulRef} className={`lg:hidden ht relative flex flex-col gap-[2rem] w-full top-0 font-bold font-madeForDisplayMedium `}>
          <li className="hover:text-[#FFA500]"><a href="https://compad.org/?data=#About" target="_blank" rel="noopener noreferrer">About</a></li>
          <li className="hover:text-[#FFA500]"><a href="https://compad.org/?data=#Roadmap" target="_blank" rel="noopener noreferrer">Roadmap</a></li>
          <li className="hover:text-[#FFA500]"><a href="https://compad-1.gitbook.io/compad-white-paper" target="_blank" rel="noopener noreferrer">Whitepaper</a></li>
          <button onClick={scrollToBottom} className="glass capitalize text-white py-3 px-[2rem] font-medium mt-[1.4rem] rounded-md">
          {
                  address ? (
                    <>
                    {isFinished == true ? <div>Claim  <span className="text-[#FFA500] font-bold">$COM</span></div> : <div>Buy  <span className="text-[#FFA500] font-bold">$COM</span> private sale</div>}
                    </>
                  ) : 'Connect Wallet'
                }
          </button>
        </ul>
      </div>

      <section
        className={sectionClasses.join(' ')}
      >
        <div className="flex text-white max-w-7xl mx-auto h-fit relative w-full justify-between">
          <div className="flex">
            <figure className="w-[8rem]"><Image src={logo} className="object-contain" alt="" /></figure>
            <figcaption className="text-[#FFA500] text-3xl font-bold pt-[12%]">Compad</figcaption>
          </div>
          <div>
            <ul className="flex gap-[2rem] text-xl pt-[12%]">
              <li className="hover:text-[#FFA500]"><a href="https://compad.org/?data=#About" target="_blank" rel="noopener noreferrer">About</a></li>
              <li className="hover:text-[#FFA500]"><a href="https://compad.org/?data=#Roadmap" target="_blank" rel="noopener noreferrer">Roadmap</a></li>
              <li className="hover:text-[#FFA500]"><a href="https://compad-1.gitbook.io/compad-white-paper" target="_blank" rel="noopener noreferrer">Whitepaper</a></li>
            </ul>
          </div>
          <div>
            <button onClick={scrollToBottom} className="glass capitalize py-3 px-[2rem] font-medium mt-[1.4rem] rounded-md">
              
              {
                  address ? (
                    <>
                    {isFinished == true ? <div>Claim  <span className="text-[#FFA500] font-bold">$COM</span></div> : <div>Buy  <span className="text-[#FFA500] font-bold">$COM</span> private sale</div>}
                    </>
                  ) : 'Connect Wallet'
                }
            </button>
          </div>
        </div>
      </section>
    </>)
}

export default Nav;