'use client'
import React, { useState, useEffect } from "react";
import Image from "next/image";
import mainImage from "./images/logo.png"
import './main.css';
// import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useReadContract, useWriteContract, useBalance } from "wagmi";
import abi from "../contracts/contract-abi.json";
import Web3 from "web3";
import { useWeb3Modal } from '@web3modal/wagmi/react'
// import BNB from '@/components/Icons/bnb'
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const Main = () => {
  const [limitError, setLimitError] = useState(false);
  const [bnbAmount, setBnbAmount] = useState('');
  const [comAmount, setComAmount] = useState('');
  const [comMade, setComMade] = useState(0);
  const [comSold, setComSold] = useState(0);
  const [usdtMade, setUsdtMade] = useState(0);
  const [usdtSold, setUsdtSold] = useState(0);
  // const [usdtMade, setUsdtMade] = useState(0);
  const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545');
  const [mounted, setMounted] = useState(false);
  // const [etherPriceUSD, setEtherPriceUSD] = useState(null);
  const { address } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const { open } = useWeb3Modal()

  const notify = (message) => toast.error(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    // transition: Bounce,
    });


    const success = (message) => toast.success(message, {
      position: "top-right",      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      });

  const { data } = useReadContract({
    abi: abi,
    address: "0xe4a75304eeDD68d3eFA1Fc4a05b2DD1472067a83",
    functionName: "saleEnded",
    args: [],
  })

  const {data : tokensSold} = useReadContract({
    abi: abi,
    address: "0xe4a75304eeDD68d3eFA1Fc4a05b2DD1472067a83",
    functionName: "tokensSold",
    args: [],
  });
  const {data : totalTokensToSell} = useReadContract({
    abi: abi,
    address: "0xe4a75304eeDD68d3eFA1Fc4a05b2DD1472067a83",
    functionName: "totalTokensToSell",
    args: [],
  });
  const { data: tokenPrice} = useReadContract({
    abi: abi,
    address: "0xe4a75304eeDD68d3eFA1Fc4a05b2DD1472067a83",
    functionName: "tokenPrice",
    args: [],
  });

  const balance = useBalance({
    address: address,
  })
  // async function getters (){
    console.log([data, tokenPrice, totalTokensToSell, tokensSold])
  
  // }
  // getters();
  useEffect(() => {

    setMounted(true)
    // fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd')
    // .then((response) => response.json())
    // .then((data) => {
    //   const currentEtherPrice = data.ethereum.usd;
    //   setEtherPriceUSD(currentEtherPrice);
    // })
    // .catch((error) => {
    //   console.error('Error fetching Ether price:', error);
    // });
    function convert (token){
      return Web3.utils.fromWei(token == undefined ? 0 : token, "ether");
    }
    const tPrice = convert(tokenPrice);
    const cMade = convert(totalTokensToSell);
    const cSold = convert(tokensSold);
//      async function convertEtherToUSDT(etherAmount) {
//       try {
//          const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
//          const data = await response.json();
//          const rate = data.ethereum.usd;
//         console.log(data.ethereum);
//          const usdtAmount = etherAmount * rate;
     
//          return usdtAmount;
//       } catch (error) {
//          console.error('Error fetching exchange rate:', error);
//          return null;
//       }
//      }
// convertEtherToUSDT(8).then(usdtAmount => {
  //   // console.log(`${tPrice} Ether is equivalent to ${usdtAmount} USDT.`);
  //  });          
  
  setComMade(parseFloat(cMade).toLocaleString(undefined, {
    maximumFractionDigits: 6,
  }));
  setUsdtMade(parseFloat(cMade * 0.0016).toLocaleString(undefined, {
    maximumFractionDigits: 6,
  }));
  setComSold(parseFloat(cSold).toLocaleString(undefined, {
    maximumFractionDigits: 6,
  }));
  setUsdtSold(parseFloat(cSold * 0.0016).toLocaleString(undefined, {
    maximumFractionDigits: 6,
  }));
  console.log(comMade, comSold, usdtMade, usdtSold);
  // const tokenPriceUSD = etherPriceUSD ? (tPrice ) * etherPriceUSD : null;
  // console.log(tokenPriceUSD != undefined ? tokenPriceUSD.toFixed(4) : null);
  
 
  }, [tokenPrice, totalTokensToSell, tokensSold, comMade, comSold, usdtMade, usdtSold]);



  async function contribute(){
    if(address){
      if (data === false){
       if(bnbAmount < 0.2 || bnbAmount > 2){
        notify('Your BNB amount must be between 0.2 and 2');
      } else {
        try {
          const tx = writeContractAsync({
            abi: abi,
            address: "0xe4a75304eeDD68d3eFA1Fc4a05b2DD1472067a83",
            functionName: "contribute",
            value: Web3.utils.toBigInt(Web3.utils.toWei(bnbAmount, "ether"))
          })
          .then(txHash => {
            success('Transaction successful');
            // try {
            //   const receipt = await web3.eth.getTransactionReceipt(txHash);
          
            //   if (receipt && (receipt.status === true || receipt.status === 1n)) {
            //     // Transaction was successful
            //     console.log('Transaction successful:', receipt);
            //     alert('Transaction successful');
            //   } else {
            //     // Transaction failed
            //     console.log('Transaction failed:', receipt);
            //     alert('Transaction failed');
            //   }
            // } catch (error) {
            //   console.error('Error fetching transaction receipt:', error);
            //   alert('Error fetching transaction receipt');
            // }
          })
          .catch(error => {
            if (error.message.includes('insufficient funds')) {
              console.log(balance);
              notify(`Insufficient balance: You only have ${balance.data.formatted} ${balance.data.symbol}`);
            } else {
              notify('An error occurred while processing your transaction');
            }
          });
        } catch (error) {
          console.error(error);
        }
        
       }
      } else {
        try {
          const tx = writeContractAsync({
            abi: abi,
            address: "0xe4a75304eeDD68d3eFA1Fc4a05b2DD1472067a83",
            functionName: "claim",
          })
        } catch (error) {
          notify('An error occurred while processing your transaction');
          console.error(error)
        }
      }
    } 
    else{
      open();
    }
    // switchToBSC();
  }
// alert(address)
  function removeCommasAndConvertToNumber(formattedNumber) {
    // Remove commas from the formatted number
    if (typeof formattedNumber !== 'string') {
      return null; // Or handle the error as appropriate
    }
    const numberWithNoCommas = formattedNumber.replace(/,/g, '');
  
    // Convert the string to a number
    const number = parseFloat(numberWithNoCommas);
  
    return number;
  }

  const progressStyle = () => {
    const progressValue = removeCommasAndConvertToNumber(usdtSold);
    const totalValue = removeCommasAndConvertToNumber(usdtMade);
    const progressPercentage = (progressValue / totalValue) * 100;
    return { width: `${progressPercentage}%` };
  };

  const indicatorStyle = () => {
    const progressValue = removeCommasAndConvertToNumber(usdtSold);
    const totalValue = removeCommasAndConvertToNumber(usdtMade);
    const progressPercentage = (progressValue / totalValue) * 100;
    return { left: `calc(${progressPercentage}% - 5px)` };
  };

  const bnbSubmitHandler = (e) => {
    setLimitError(false);
    if (e < 0.2 || e > 2) {
      setLimitError(true);
      setBnbAmount(0);
      return;
    }
    setComAmount(e / 0.0016);
  };

  const typing = () => {
    setLimitError(false);
  };

  const maxHandler = () => {
    setBnbAmount(2);
    setComAmount(2 / 0.0016);
  }

  const comSubmitHandler = (e) => {
    setLimitError(false);
    // console.log("Com Amount:", e); // Log the value of the input field
    let result = e * 0.0016;
    console.log("Result:", result); // Log the calculated result
  
    
    if (result < 0.2 || result > 2) {
        setLimitError(true);
        setBnbAmount(0);
        setTimeout(() => {
            // setComAmount(0);
            setLimitError(false);
        }, 3000);
        return;
    }
    setBnbAmount(result);
  
    // setComAmount(bnbAmount / 0.0016);
  };
  
  
  useEffect(() => {
    console.log("Updated bnbAmount:", bnbAmount);
  }, [bnbAmount]);
  
  return (
    <>
      <section className="bg py-[4rem] text-white px-[0.8rem] xs:px-[1rem] sm:px-[2rem] xl:px-[0]">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl sm:text-3xl lg:text-5xl capitalize font-semibold">
            Buy <span className="text-[#FFA500]">$COM</span> presale token
          </h1>
          <div className="glass relative w-full h-fit py-[2rem] flex flex-col lg:flex-row mt-[3rem]">
            <div className="w-[100%] lg:w-[50%] px-[1rem] md:px-[2rem]">
              <div className="grid grid-cols-2">
                <h1 className="text-lg">Token name:</h1>
                <h1 className="text-lg font-semibold ml-[10%] text-[rgba(255,255,255,0.8)] text-end">Compad</h1>
                <h1 className="mt-[2rem] text-lg">Ticker symbol:</h1>
                <h1 className="mt-[2rem] text-lg ml-[10%] font-semibold text-[rgba(255,255,255,0.8)] text-end">$COM</h1>
                <h1 className="mt-[2rem] text-lg">Private Sale Price:</h1>
                <h1 className="mt-[2rem] text-lg ml-[10%] font-semibold text-[rgba(255,255,255,0.8)] text-end">0.0016</h1>
                <h1 className="mt-[2rem] text-lg">Total supply:</h1>
                <h1 className="mt-[2rem] text-lg ml-[10%] font-semibold text-[rgba(255,255,255,0.8)] text-end">30 million COM (3%)</h1>
                <h1 className="mt-[2rem] text-lg">Private Presale Goal:</h1>
                <h1 className="mt-[2rem] text-lg ml-[10%] font-semibold text-[rgba(255,255,255,0.8)] text-end">$100,000</h1>
                <h1 className="mt-[2rem] text-lg">Minimum Buy:</h1>
                <h1 className="mt-[2rem] text-lg ml-[10%] font-semibold text-[rgba(255,255,255,0.8)] text-end">0.2BNB</h1>
                <h1 className="mt-[2rem] text-lg">Maximum Buy:</h1>
                <h1 className="mt-[2rem] text-lg ml-[10%] font-semibold text-[rgba(255,255,255,0.8)] text-end">2BNB</h1>
              </div>
              <div className="grid grid-cols-3">
                <h1 className="mt-[2rem] text-lg">Vesting Schedule:</h1>
                <h1 className="mt-[2rem] text-lg ml-[10%] text-[rgba(255,255,255,0.8)]">50% TGE</h1>
                <h1 className="mt-[2rem] text-lg ml-[10%] text-[rgba(255,255,255,0.8)] text-end">10% every 30 days</h1>
              </div>
              <h1 className="mt-[2rem] text-lg text-center text-[rgba(255,255,255,0.8)]">Private Sale Ends Once The Cap Is Filled</h1>
            </div>
            <div className="lg:border-l-[0.5px] border-b-[0.5px] lg:border-b-0 center w-[85%] lg:w-0 lg:h-[85%] border-b-[rgba(255,255,255,0.466)] lg:border-l-[rgba(255,255,255,0.466)]"></div>
            <div className="w-[100%] lg:w-[50%] px-[1rem] md:px-[2rem]">
              <article className="flex justify-between">
                <h1 className="[@media_(min-width:400px)]:text-lg sm:text-xl font-semibold pt-1 sm:pt-2">Private Presale</h1>
                <h1 className="text-[rgba(255,255,255,0.68)]">Raised: <span className="text-[#D03FEA] text-xl [@media_(min-width:400px)]:text-2xl sm:text-3xl font-bold">${usdtSold}</span></h1>
              </article>
              <div className="progress-bar mt-[2rem]">
                <div style={progressStyle()} className="progress"></div>
                <div style={indicatorStyle()} className="indicator"></div>
              </div>
              <article>
                <h1 className="text-[rgba(255,255,255,0.68)] font-semibold text-end mt-[1rem]">TARGET: ${usdtMade}</h1>
              </article>
              <article className="w-fit mx-auto mt-[1rem]">
                <div className="flex gap-[0.5rem] sm:gap-[1.5rem]">
                  <h1 className="sm:text-lg font-semibold pt-1">USDT Raised:</h1>
                  <h1 className="text-lg [@media_(min-width:400px)]:text-xl sm:text-2xl font-semibold">${usdtSold}</h1>
                  <h1 className="text-lg [@media_(min-width:400px)]:text-xl sm:text-2xl font-semibold text-[rgba(255,255,255,0.68)]">/${usdtMade}</h1>
                </div>
                <div className="flex gap-[0.5rem] sm:gap-[1.5rem]">
                  <h1 className="sm:text-lg font-semibold pt-1">Tokens Sold:</h1>
                  <h1 className="text-lg [@media_(min-width:400px)]:text-xl sm:text-2xl font-semibold">{comSold}</h1>
                  <h1 className="text-lg [@media_(min-width:400px)]:text-xl sm:text-2xl font-semibold text-[rgba(255,255,255,0.68)]">/{comMade}</h1>
                </div>
              </article>
              <article className="w-fit mx-auto mt-[1rem]">
                <h1 className="text-xl text-center font-semibold">1 <span className="text-[#FFA500]">$COM</span></h1>
                <h1 className="text-center text-2xl font-semibold rotate-90">=</h1>
                <h1 className="text-3xl sm:text-4xl text-center font-bold">$0.0016</h1>
              </article>
              <section className="flex flex-col sm:flex-row gap-[2rem] mt-[1rem]">
                <div className="w-full sm:w-[50%]">
                  <div className="flex justify-between font-light">
                    <h1>BNB you pay</h1>
                    <button onClick={maxHandler} className="font-semibold">Max</button>
                  </div>
                  <div className="flex border mt-[0.5rem] gap-[0.5rem] rounded-md px-[1rem] py-[1rem] text-lg">
                  <input 
                    type="number" 
                    onInput={typing} 
                    step="0.01" 
                    placeholder="0"
                    onChange={(e) => {
                        setBnbAmount(e.target.value);
                        bnbSubmitHandler(e.target.value);
                    }}
                    min="0.2" 
                    max="2" 
                    value={bnbAmount} 
                    className={`w-[90%] no-spinner bg-transparent focus:outline-none whitespace-nowrap overflow-x-auto fixed-width`}
                    />

                    <p className="text-[#e8b431] text-3xl ml-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M16 32C7.163 32 0 24.837 0 16S7.163 0 16 0s16 7.163 16 16s-7.163 16-16 16m-3.884-17.596L16 10.52l3.886 3.886l2.26-2.26L16 6l-6.144 6.144zM6 16l2.26 2.26L10.52 16l-2.26-2.26zm6.116 1.596l-2.263 2.257l.003.003L16 26l6.146-6.146v-.001l-2.26-2.26L16 21.48zM21.48 16l2.26 2.26L26 16l-2.26-2.26zm-3.188-.002h.001L16 13.706L14.305 15.4l-.195.195l-.401.402l-.004.003l.004.003l2.29 2.291l2.294-2.293l.001-.001l-.002-.001z"/></svg>
                    </p>
                  </div>
                  {limitError && <h1 className="text-[red] text-sm mt-[0.3rem]">BNB must be &gt; 0.2BNB or &lt; 2BNB</h1>}
                </div>
                <div className="w-full sm:w-[50%]">
                  <div className="flex justify-between font-light">
                    <h1><span className="text-[#ffa500] font-semibold">$COM</span> you receive</h1>
                  </div>
                  <div className="flex relative border mt-[0.5rem] gap-[0.5rem] rounded-md px-[1rem] py-[1rem] text-lg">
                    <input type="number"   onInput={typing}  onChange={(e) => {
        setComAmount(e.target.value);
        comSubmitHandler(e.target.value);
    }} value={comAmount} placeholder="0" className="w-[90%] no-spinner bg-transparent focus:outline-none whitespace-nowrap overflow-x-auto fixed-width"/>
                    <p className="text-[#e8b431] absolute top-0 right-0 ml-auto"><Image src={mainImage}
                    className="object-contain w-[5rem]"
                    alt="Compad logo"
                    /></p>
                  </div>
                </div>
              </section>
              <button onClick={contribute} className="bg-[linear-gradient(to_right,_#8e49e9,_#FA5441)] w-full py-[0.5rem] mt-[2rem] rounded-lg text-center font-bold text-lg capitalize">
                {
                  address ? (
                    <>
                    {data ? "claim" : <div>Buy presale <span className="text-[#FFA500] font-bold">$COM</span></div>}
                    </>
                  ) : 'Connect Wallet'
                }
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Main;
