'use client'
import React, { useState, useEffect } from "react";
import Image from "next/image";
import mainImage from "./images/logo.png"
import './main.css';
import { useAccount, useReadContract, useWriteContract, useBalance, useTransactionConfirmations } from "wagmi";
import abi from "../contracts/contract-abi.json";
import Web3 from "web3";
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import WalletConnectProvider from '@walletconnect/web3-provider';




const Main = () => {
  const [limitError, setLimitError] = useState(false);
  const [bnbAmount, setBnbAmount] = useState('');
  const [comAmount, setComAmount] = useState('');
  const [comMade, setComMade] = useState(0);
  const [comSold, setComSold] = useState(0);
  const [usdtMade, setUsdtMade] = useState(0);
  const [usdtSold, setUsdtSold] = useState(0);
  const [bnbSold, setBnbSold] = useState(0);
  const [bnbPrice, setBnbPrice] = useState(0);
  const [bnbMade, setBnbMade] = useState(0);
  const [comBought, setComBought] = useState(0);
  const [bnbSent, setBnbSent] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [transactionHash, setTransactionHash] = useState('');
  const [days, setDays] = useState('00');
  const [hours, setHours] = useState('00');
  const [minutes, setMinutes] = useState('00');
  const [seconds, setSeconds] = useState('00');
  const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545');
  // const web3 = new Web3('https://bsc-dataseed.binance.org:8545');
  const [mounted, setMounted] = useState(false);
  const { address } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const { open } = useWeb3Modal()
  // const walletConnectProvider = new WalletConnectProvider({
  //   rpc: {
  //     56: 'https://bsc-dataseed.binance.org/', // Binance Smart Chain Mainnet RPC URL
  //     97: 'https://data-seed-prebsc-1-s1.binance.org:8545/' // Binance Smart Chain Testnet RPC URL
  //   },
  //   chainId: 56, // Binance Smart Chain Mainnet chain ID
  //   network: 'binance', // Optional. Supported networks are 'ethereum', 'binance', 'arbitrum', 'polygon', 'solana', 'xdai', 'fantom', 'avalanche', 'okexchain', 'ronin', 'heco', 'moonriver', 'thundercore', 'smartchain'
  //   bridge: 'https://relay.walletconnect.com' // Optional. Bridge URL for WalletConnect
  // });

  const notify = (message) => toast.error(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });

  const success = (message) => toast.success(message, {
    position: "top-right",      autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });

  const warn = (message) => toast.warn(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });

  const { data : isEnded } = useReadContract({
    abi: abi,
    address: "0xa0584c52752b63a4A77479c384902B05861C07E6",
    functionName: "saleEnded",
    args: [],
  })

  const {data : tokensSold} = useReadContract({
    abi: abi,
    address: "0xa0584c52752b63a4A77479c384902B05861C07E6",
    functionName: "tokensSold",
    args: [],
  });

  const {data : totalTokensToSell} = useReadContract({
    abi: abi,
    address: "0xa0584c52752b63a4A77479c384902B05861C07E6",
    functionName: "totalTokensToSell",
    args: [],
  });

  const { data: tokenPrice} = useReadContract({
    abi: abi,
    address: "0xa0584c52752b63a4A77479c384902B05861C07E6",
    functionName: "tokenPrice",
    args: [],
  });
  const { data: bnbContributed} = useReadContract({
    abi: abi,
    address: "0xa0584c52752b63a4A77479c384902B05861C07E6",
    functionName: "contributions",
    args: [address],
  });
  const { data: tokensBought} = useReadContract({
    abi: abi,
    address: "0xa0584c52752b63a4A77479c384902B05861C07E6",
    functionName: "tokensOwed",
    args: [address],
  });
  
  const { status } = useTransactionConfirmations({
    hash: transactionHash,
  });

  const balance = useBalance({
    address: address,
  })

  useEffect(() => {
    setMounted(true)
    function convert (token){
      return Web3.utils.fromWei(token == undefined ? 0 : token, "ether");
    }
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=binancecoin&vs_currencies=usd')
    .then(response => response.json())
    .then(data => {
      const bnbPriceUSD = data.binancecoin.usd;
      setBnbPrice(bnbPriceUSD);
    })
    .catch(error => {
      console.error('Error fetching Binance Coin price:', error);
    });
    setComBought(parseFloat(convert(tokensBought)).toLocaleString(undefined, {
      maximumFractionDigits: 6,
    }));
    setBnbSent(parseFloat(convert(bnbContributed) / bnbPrice).toLocaleString(undefined, {
      maximumFractionDigits: 6,
    }));
    console.log(bnbContributed);
    setComMade(parseFloat(convert(totalTokensToSell)).toLocaleString(undefined, {
      maximumFractionDigits: 6,
    }));
    setUsdtMade(parseFloat(convert(totalTokensToSell) * 0.015).toLocaleString(undefined, {
      maximumFractionDigits: 6,
    }));
    setComSold(parseFloat(convert(tokensSold)).toLocaleString(undefined, {
      maximumFractionDigits: 6,
    }));
    setUsdtSold(parseFloat(convert(tokensSold) * 0.015).toLocaleString(undefined, {
      maximumFractionDigits: 6,
    }));
    setBnbMade(parseFloat((convert(totalTokensToSell) * 0.015) / bnbPrice).toLocaleString(undefined, {
      maximumFractionDigits: 6,
    }));
    setBnbSold(parseFloat((convert(tokensSold) * 0.015) / bnbPrice).toLocaleString(undefined, {
      maximumFractionDigits: 6,
    }));
    if(transactionHash !== ''){
      console.log(transactionHash);
      setTimeout(() => {
        check(transactionHash);
      }, 3000);
    }

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
    
    const check = async (txHash, retries = 0) => {
      try {
        const receipt = await web3.eth.getTransactionReceipt(txHash);
    
        if (receipt && receipt.status === 1n) {
          console.log('Transaction successful:', receipt);
          success('Transaction successful');
          // Optionally reload the page after successful transaction
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        } else if (retries < 10) { // Limit retries to prevent infinite loop
          console.log('Transaction processing or failed, wait a little.');
          setTimeout(() => {
            check(txHash, retries + 1); // Recursive call
          }, 5000); // Retry after 5 seconds
        } else {
          console.log('Transaction failed after retries:', receipt);
          warn('Transaction failed after retries');
        }
      } catch (error) {
        console.error('Error fetching transaction receipt:', error);
        warn('Transaction processing: your bnb contributed will be updated');
        setTimeout(() => {
            window.location.reload();
          }, 3000);
        // notify('Error fetching transaction receipt');
      }
    }
  }, [tokenPrice, isEnded, bnbContributed, tokensBought,  totalTokensToSell, tokensSold, comMade, comSold, usdtMade, usdtSold, transactionHash, web3.eth]);

  async function contribute(){
    if(address){
      if (isFinished === false){
       if(bnbAmount < 0.2 || bnbAmount > 2){
        notify('Your BNB amount must be between 0.2 and 2');
      } else {
        try {
          const tx = await writeContractAsync({
            abi: abi,
            address: "0xa0584c52752b63a4A77479c384902B05861C07E6",
            functionName: "contribute",
            value: Web3.utils.toBigInt(Web3.utils.toWei(bnbAmount, "ether"))
          })
            setTransactionHash(tx);
            console.log(`Transaction Hash: ${tx}`);
        } catch (error) {
          if (error.message.includes('insufficient funds')) {
            console.log(balance);
            notify(`Insufficient balance: You only have ${balance.data.formatted} ${balance.data.symbol}`);
          } else {
            warn('Transaction processing or failed, wait a little.');
          }
          console.error(error);
        }
        
       }
      } else {
          // Add custom token to the wallet
 

switchToBSC();
        try {
          const tx = await writeContractAsync({
            abi: abi,
            address: "0xa0584c52752b63a4A77479c384902B05861C07E6",
            functionName: "claim",
          })
          setTransactionHash(tx);
            console.log(`Transaction Hash: ${tx}`);
        } catch (error) {
           if (error.message.includes('Sale has not ended')) {
            console.log(balance);
            notify(`Presale has not ended yet`);
          } else if (error.message.includes('No tokens to claim')) {
            notify('Not eligible to claim.');
            console.error(error)
          } else if (error.message.includes(`can't claim yet`)) {

            

            notify('You cannot claim yet, wait till vesting is over');
            console.error(error)
          } else {
            warn('Transaction processing or failed, wait a little.');
            console.error(error)
          }
          // notify('An error occurred while processing your transaction claim');
        }
      }
    } 
    else{
      open();
    }
  }

  function removeCommasAndConvertToNumber(formattedNumber) {
    if (typeof formattedNumber !== 'string') {
      return null;
    }
    const numberWithNoCommas = formattedNumber.replace(/,/g, '');
    const number = parseFloat(numberWithNoCommas);
  
    return number;
  }

  const switchToBSC = async () => {
    try {
      await walletConnectProvider.request({
        method: 'wallet_addEthereumChain',
        params: [{
          chainId: '0x38', // Binance Smart Chain Mainnet chain ID
          chainName: 'Binance Smart Chain Mainnet',
          nativeCurrency: {
            name: 'BNB',
            symbol: 'BNB',
            decimals: 18,
          },
          rpcUrls: ['https://bsc-dataseed1.binance.org/'],
          blockExplorerUrls: ['https://bscscan.com/'],
        }],
      });
      console.log('Switched to Binance Smart Chain');
    } catch (error) {
      console.error('Error switching to Binance Smart Chain:', error);
    }
  };
  
  const addToWallet = async () => {
    const tokenAddress = "0x2Ba9f8C4ea161eAc788570FFd414eCBA4aa38eB1"; // Token contract address on BSC
    const tokenSymbol = "COM"; // Token symbol
    const tokenDecimals = 18; // Token decimals
    const tokenName = 'Compad Coin'; // Token decimals
  
    if (window.ethereum) {
      window.ethereum
        .request({
          method: 'wallet_watchAsset',
          params: {
            type: 'ERC20',
            options: {
              address: tokenAddress,
              name: tokenName,
              symbol: tokenSymbol,
              decimals: tokenDecimals,
              image: 'https://compad-private-presale.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.4084dfe1.png&w=3840&q=75', // Optional
              chainId: 56, // Binance Smart Chain Mainnet chain ID
            },
          },
        })
        .then(passed => {
          if (passed) {
            console.log(`${tokenSymbol} added to wallet`);
            success(`${tokenSymbol} added to wallet`);
          } else {
            console.error(`Failed to add ${tokenSymbol} to wallet`);
            notify(`Failed to add ${tokenSymbol} to wallet`);
          }
        })
        .catch(error => {
          console.error(`Error adding ${tokenSymbol} to wallet:`, error);
          notify(`Error adding ${tokenSymbol} to wallet`);
        });
    } else{
      notify(`Copy the link to your wallet's DApp browser and try again.`)
    }
  };
  
  // Call these functions when needed
  // switchToBSC();
  // addCustomToken();
  

  // const progressStyle = () => {
  //   const progressValue = removeCommasAndConvertToNumber(usdtSold);
  //   const totalValue = removeCommasAndConvertToNumber(usdtMade);
  //   const progressPercentage = (progressValue / totalValue) * 100;
  //   return { width: `${progressPercentage}%` };
  // };

  const bnbSubmitHandler = (e) => {
    setLimitError(false);
    if (e < 0.2 || e > 2) {
      setLimitError(true);
      setBnbAmount('');
      return;
    }
    let rate = 0.015 / bnbPrice;
    setComAmount(e / rate);
  };

  const typing = () => {
    setLimitError(false);
  };

  const maxHandler = () => {
    setBnbAmount(2);
    let rate = 0.015 / bnbPrice;
    setComAmount(e / rate);
  }

  const comSubmitHandler = (e) => {
    setLimitError(false);
    let rate = 0.015 / bnbPrice;
    let result = e * rate;    
    if (result < 0.2 || result > 2) {
        setLimitError(true);
        setBnbAmount('');
        setTimeout(() => {
            setLimitError(false);
        }, 3000);
        return;
    }
    setBnbAmount(result);
  };


  useEffect(() => {
    const endDate = new Date('2024-04-24T20:30:00');
    endDate.setHours(endDate.getHours() + 72);
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
      <section className="bg py-[4rem] text-white px-[0.8rem] xs:px-[1rem] sm:px-[2rem] xl:px-[0]">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl sm:text-3xl lg:text-5xl capitalize font-semibold">
            Buy <span className="text-[#FFA500] font-bold">$COM</span> private sale
          </h1>
          <div className="glass relative w-full h-fit py-[2rem] flex flex-col lg:flex-row mt-[3rem]">
            <div className="w-[100%]  lg:w-[50%] px-[1rem] relative md:px-[2rem]">
              <div className="grid grid-cols-2">
                <h1 className="text-lg">Token name:</h1>
                <h1 className="text-lg font-semibold ml-[10%] text-[rgba(255,255,255,0.8)] text-end">Compad</h1>
                <h1 className="mt-[2rem] text-lg">Ticker symbol:</h1>
                <h1 className="mt-[2rem] text-lg ml-[10%] font-semibold text-[rgba(255,255,255,0.8)] text-end">$COM</h1>
                <h1 className="mt-[2rem] text-lg">Private Sale Price:</h1>
                <h1 className="mt-[2rem] text-lg ml-[10%] font-semibold text-[rgba(255,255,255,0.8)] text-end">0.015</h1>
                <h1 className="mt-[2rem] text-lg">Total supply:</h1>
                <h1 className="mt-[2rem] text-lg ml-[10%] font-semibold text-[rgba(255,255,255,0.8)] text-end">30 million COM (3%)</h1>
                <h1 className="mt-[2rem] text-lg">Private Sale Goal:</h1>
                <h1 className="mt-[2rem] text-lg ml-[10%] font-semibold text-[rgba(255,255,255,0.8)] text-end">{bnbMade}BNB</h1>
                <h1 className="mt-[2rem] text-lg">Minimum Buy:</h1>
                <h1 className="mt-[2rem] text-lg ml-[10%] font-semibold text-[rgba(255,255,255,0.8)] text-end">0.2BNB</h1>
                <h1 className="mt-[2rem] text-lg">Maximum Buy:</h1>
                <h1 className="mt-[2rem] text-lg ml-[10%] font-semibold text-[rgba(255,255,255,0.8)] text-end">2BNB</h1>
              </div>
              <div className="grid mb-[2rem] grid-cols-3">
                <h1 className="mt-[2rem] text-lg">Vesting Schedule:</h1>
                <h1 className="mt-[2rem] text-lg ml-[10%] text-[rgba(255,255,255,0.8)]">50% TGE</h1>
                <h1 className="mt-[2rem] text-lg ml-[10%] text-[rgba(255,255,255,0.8)] text-end">25% every 30 days</h1>
              </div>
              {/* <div className="relative w-full "> */}
              <button onClick={addToWallet} className="bg-[linear-gradient(to_right,_#8e49e9,_#FA5441)] capitalize w-full lg:w-[70%] py-[0.5rem] mt-[2rem] left-0 right-0 mx-auto rounded-lg text-center font-bold lg:absolute bottom-0 text-lg capitalize">Add <span className="text-[#FFA500] font-bold">$COM</span> to wallet</button>
              {/* </div> */}
            </div>
            <div className="lg:border-l-[0.5px] border-b-[0.5px] lg:border-b-0 center w-[85%] lg:w-0 lg:h-[85%] border-b-[rgba(255,255,255,0.466)] lg:border-l-[rgba(255,255,255,0.466)]"></div>
            <div className="w-[100%] lg:w-[50%] px-[1rem] md:px-[2rem]">
              <article className="flex justify-between">
                {
                  isFinished != true ? 
                  <h1 className="[@media_(min-width:400px)]:text-lg sm:text-xl font-semibold pt-1 sm:pt-2">Private sale Ends In</h1> :
                <h1 className="text-lg [@media_(min-width:400px)]:text-xl sm:text-xl font-semibold pt-1 sm:pt-2">Private sale Ended</h1>
                }
                {/* <h1 className="text-[rgba(255,255,255,0.68)]">Raised: <span className="text-[#D03FEA] text-xl [@media_(min-width:400px)]:text-2xl sm:text-3xl font-bold">${usdtSold}</span></h1> */}
              </article>
              {/* <div className="progress-bar mt-[2rem]">
                <div style={progressStyle()} className="progress"></div>
                <div style={indicatorStyle()} className="indicator"></div>
              </div> */}
              {/* <article>
                <h1 className="text-[rgba(255,255,255,0.68)] font-semibold text-end mt-[1rem]">TARGET: ${usdtMade}</h1>
              </article> */}
               <div className="countdown-container bg-[linear-gradient(to_right,_#8e49e9,_#FA5441)]">
                <div className="countdown-box">
                  <span className="countdown-label">Days</span>
                  <span className="countdown-value">{days}</span>
                </div>
                <div className="countdown-box">
                  <span className="countdown-label">Hours</span>
                  <span className="countdown-value">{hours}</span>
                </div>
                <div className="countdown-box">
                  <span className="countdown-label hidden [@media_(min-width:400px)]:block">Minutes</span>
                  <span className="countdown-label [@media_(min-width:400px)]:hidden">Mins</span>
                  <span className="countdown-value">{minutes}</span>
                </div>
                <div className="countdown-box">
                  <span className="countdown-label hidden [@media_(min-width:400px)]:block">Seconds</span>
                  <span className="countdown-label [@media_(min-width:400px)]:hidden">Secs</span>
                  <span className="countdown-value">{seconds}</span>
                </div>
              </div>
              <article className="w-fit mx-auto mt-[1rem]">
                <div className="flex gap-[0.5rem] sm:gap-[1.5rem]">
                  <h1 className="sm:text-lg font-semibold pt-1">BNB Raised:</h1>
                  <h1 className="text-lg [@media_(min-width:400px)]:text-xl sm:text-2xl font-semibold">{bnbSold}</h1>
                  <h1 className="text-lg [@media_(min-width:400px)]:text-xl sm:text-2xl font-semibold text-[rgba(255,255,255,0.68)]">/{bnbMade}</h1>
                </div>
                <div className="flex gap-[0.5rem] sm:gap-[1.5rem]">
                  <h1 className="sm:text-lg font-semibold pt-1">Tokens Sold:</h1>
                  <h1 className="text-lg [@media_(min-width:400px)]:text-xl sm:text-2xl font-semibold">{comSold}</h1>
                  <h1 className="text-lg [@media_(min-width:400px)]:text-xl sm:text-2xl font-semibold text-[rgba(255,255,255,0.68)]">/{comMade}</h1>
                </div>
                <div className="flex gap-[0.5rem] sm:gap-[1.5rem]">
                  <h1 className="sm:text-lg font-semibold pt-1">Your BNB Contributed:</h1>
                  <h1 className="text-lg [@media_(min-width:400px)]:text-xl sm:text-2xl font-semibold">{bnbSent}</h1>
                  {/* <h1 className="text-lg [@media_(min-width:400px)]:text-xl sm:text-2xl font-semibold text-[rgba(255,255,255,0.68)]">/{bnbMade}</h1> */}
                </div>
                <div className="flex gap-[0.5rem] sm:gap-[1.5rem]">
                  <h1 className="sm:text-lg font-semibold pt-1"><span className="text-[#FFA500]">$COM</span> left to claim:</h1>
                  <h1 className="text-lg [@media_(min-width:400px)]:text-xl sm:text-2xl font-semibold">{comBought}</h1>
                  {/* <h1 className="text-lg [@media_(min-width:400px)]:text-xl sm:text-2xl font-semibold text-[rgba(255,255,255,0.68)]">/{comMade}</h1> */}
                </div>
              </article>
              <article className="w-fit mx-auto mt-[1rem]">
                <h1 className="text-xl text-center font-semibold">1 <span className="text-[#FFA500]">$COM</span></h1>
                <h1 className="text-center text-2xl font-semibold rotate-90">=</h1>
                <h1 className="text-3xl sm:text-4xl text-center font-bold">$0.015</h1>
              </article>
              {
                isFinished != true ? <section className="flex flex-col sm:flex-row gap-[2rem] mt-[1rem]">
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
              </section> :<></>
              }
              <button onClick={contribute} className="bg-[linear-gradient(to_right,_#8e49e9,_#FA5441)] capitalize w-full py-[0.5rem] mt-[2rem] rounded-lg text-center font-bold text-lg capitalize">
                {
                  address ? (
                    <>
                    {isFinished == true ? <div>Claim  <span className="text-[#FFA500] font-bold">$COM</span></div> : <div>Buy  <span className="text-[#FFA500] font-bold">$COM</span></div>}
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
