<script setup>
    function progressStyle() {
        const progressValue = 51231; // Example progress value, change as needed
        const totalValue = 100000; // Total value
        const progressPercentage = (progressValue / totalValue) * 100;
        return `width: ${progressPercentage}%;`;
    }
    function indicatorStyle() {
        const progressValue = 51231; // Example progress value, change as needed
        const totalValue = 100000; // Total value
        const progressPercentage = (progressValue / totalValue) * 100;
        return `left: calc(${progressPercentage}% - 5px);`;
    }
    let bnbAmount = ref(0);
    let comAmount = ref(0);
    let limitError = ref(false);

    function bnbSubmitHandler() {
        limitError.value = false;
        if( bnbAmount.value < 0.2 || bnbAmount.value > 2){
            limitError.value = true;
            bnbAmount.value = 0;
            return
        } else {
            comAmount.value = bnbAmount.value / 0.0016;
        }
    }

    function typing () {
        limitError.value = false
    }
    function comSubmitHandler() {
        limitError.value = false;
       bnbAmount.value = comAmount.value * 0.0016;
       if( bnbAmount.value < 0.2 || bnbAmount.value > 2){
            limitError.value = true;
            bnbAmount.value = 0;
            return
        } else {
            comAmount.value = bnbAmount.value / 0.0016;
        }
    }
</script>
<template>
    <section class="bg py-[4rem] text-white  px-[0.8rem] xs:px-[1rem] sm:px-[2rem] xl:px-[0]">
        <div class="max-w-6xl mx-auto">
            <h1 class="text-2xl sm:text-3xl lg:text-5xl capitalize font-semibold">Buy <span class="text-[#FFA500]">$COM</span> presale token</h1>
            <div class="glass relative w-full h-fit py-[2rem]  flex flex-col lg:flex-row mt-[3rem]">
                <div class="w-[100%] lg:w-[50%] px-[1rem] md:px-[2rem]">
                    <div class="grid grid-cols-2">
                        <h1 class=" text-lg">Token name:</h1>
                        <h1 class=" text-lg font-semibold ml-[10%] text-[rgba(255,255,255,0.8)] text-end">Compad</h1>
                        <h1 class="mt-[2rem] text-lg">Ticker symbol:</h1>
                        <h1 class="mt-[2rem] text-lg ml-[10%] font-semibold text-[rgba(255,255,255,0.8)] text-end">$COM</h1>
                        <h1 class="mt-[2rem] text-lg">Private Sale Price:</h1>
                        <h1 class="mt-[2rem] text-lg ml-[10%] font-semibold text-[rgba(255,255,255,0.8)] text-end">0.0016</h1>
                        <h1 class="mt-[2rem] text-lg">Total supply:</h1>
                        <h1 class="mt-[2rem] text-lg ml-[10%] font-semibold text-[rgba(255,255,255,0.8)] text-end">30 million COM (3%)</h1>
                        <h1 class="mt-[2rem] text-lg">Private Presale Goal:</h1>
                        <h1 class="mt-[2rem] text-lg ml-[10%] font-semibold text-[rgba(255,255,255,0.8)] text-end">$100,000</h1>
                        <h1 class="mt-[2rem] text-lg">Minimum Buy:</h1>
                        <h1 class="mt-[2rem] text-lg ml-[10%] font-semibold text-[rgba(255,255,255,0.8)] text-end">0.2BNB</h1>
                        <h1 class="mt-[2rem] text-lg">Maxinum Buy:</h1>
                        <h1 class="mt-[2rem] text-lg ml-[10%] font-semibold text-[rgba(255,255,255,0.8)] text-end">2BNB</h1>
                    </div>
                    <div class="grid grid-cols-3">
                        <h1 class="mt-[2rem] text-lg">Vesting Schedule:</h1>
                        <h1 class="mt-[2rem] text-lg ml-[10%] text-[rgba(255,255,255,0.8)] ">50% TGE</h1>
                        <h1 class="mt-[2rem] text-lg ml-[10%] text-[rgba(255,255,255,0.8)] text-end">10% every 30days</h1>
                    </div>
                    <h1 class="mt-[2rem] text-lg text-center text-[rgba(255,255,255,0.8)] ">Private Sale Ends Once The Cap Is Filled</h1>
                </div>
                <div class="lg:border-l-[0.5px] border-b-[0.5px]  lg:border-b-0 center w-[85%] lg:w-0 lg:h-[85%] border-b-[rgba(255,255,255,0.466)] lg:border-l-[rgba(255,255,255,0.466)]"></div>
                <div class="w-[100%] lg:w-[50%] px-[1rem] md:px-[2rem]">
                    <article class="flex justify-between">
                        <h1 class="[@media_(min-width:400px)]:text-lg sm:text-xl font-semibold pt-1 sm:pt-2">Private Presale</h1>
                        <h1 class="text-[rgba(255,255,255,0.68)]">Raised: <span class="text-[#D03FEA] text-xl [@media_(min-width:400px)]:text-2xl sm:text-3xl font-bold">$51,231</span></h1>
                    </article>
                    <div class="progress-bar mt-[2rem]">
                        <div :style="progressStyle()" class="progress"></div>
                        <div :style="indicatorStyle()" class="indicator"></div>
                    </div>
                    <article>
                        <h1 class="text-[rgba(255,255,255,0.68)] font-semibold text-end mt-[1rem]">TARGET: $100,000</h1>
                    </article>
                    <article class="w-fit mx-auto mt-[1rem]">
                        <div class="flex gap-[0.5rem] sm:gap-[1.5rem]">
                            <h1 class="sm:text-lg font-semibold pt-1">USDT Raised:</h1>
                            <h1 class="text-lg [@media_(min-width:400px)]:text-xl sm:text-2xl font-semibold">$51,231</h1>
                            <h1 class="text-lg [@media_(min-width:400px)]:text-xl sm:text-2xl font-semibold text-[rgba(255,255,255,0.68)]">/$100,000</h1>
                        </div>
                        <div class="flex gap-[0.5rem] sm:gap-[1.5rem]">
                            <h1 class="sm:text-lg font-semibold pt-1">Tokens Sold:</h1>
                            <h1 class="text-lg [@media_(min-width:400px)]:text-xl sm:text-2xl font-semibold">10,561,231</h1>
                            <h1 class="text-lg [@media_(min-width:400px)]:text-xl sm:text-2xl font-semibold text-[rgba(255,255,255,0.68)]">/30,000,000</h1>
                        </div>
                    </article>
                    <article class="w-fit mx-auto mt-[1rem]">
                        <h1 class="text-xl text-center font-semibold">1 <span class="text-[#FFA500]">$COM</span></h1>
                        <h1 class="text-center text-2xl font-semibold rotate-90">=</h1>
                        <h1 class="text-3xl sm:text-4xl text-center font-bold">$0.0016</h1>
                    </article>
                    <section class="flex flex-col sm:flex-row gap-[2rem] mt-[1rem]">
                        <div class="w-full sm:w-[50%]">
                            <div class="flex justify-between font-light">
                                <h1>BNB you pay</h1>
                                <button class="font-semibold">Max</button>
                            </div>
                            <div class="flex border mt-[0.5rem] gap-[0.5rem] rounded-md px-[1rem] py-[1rem] text-lg">
                                <input type="number" @input="typing" step="0.01" @change="bnbSubmitHandler" min="0.2" max="2" v-model="bnbAmount" class="w-[90%] no-spinner bg-transparent focus:outline-none whitespace-nowrap overflow-x-auto fixed-width"/>
                                <p class="text-[#e8b431] text-3xl ml-auto"><IconsBnb/></p>
                            </div>
                            <h1 v-if="limitError" class="text-[red] text-sm mt-[0.3rem]">Bnb must be > 0.2BNB or < 2BNB</h1>
                        </div>
                        <div class="w-full sm:w-[50%]">
                            <div class="flex justify-between font-light">
                                <h1><span class="text-[#ffa500] font-semibold">$COM</span> you receive</h1>
                            </div>
                            <div class="flex relative border mt-[0.5rem] gap-[0.5rem] rounded-md px-[1rem] py-[1rem] text-lg">
                                <input type="number" @input="typing" step="0.01" @change="comSubmitHandler" min="0.2" max="2" v-model="comAmount" class="w-[90%] no-spinner bg-transparent focus:outline-none whitespace-nowrap overflow-x-auto fixed-width"/>
                                <p class="text-[#e8b431] absolute top-0 right-0 ml-auto"><img src="/public/images/logo.png" class="object-contain w-[5rem]" alt="Compad logo"></p>
                            </div>
                        </div>
                    </section>
                    <button class="bg-[linear-gradient(to_right,_#8e49e9,_#FA5441)] w-full py-[0.5rem] mt-[2rem] rounded-lg text-center font-bold text-lg">Connect wallet</button>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
    .bg{
        background-image: url('/public/images/bg.jpg');
        background-repeat: no-repeat;
        background-size: cover;
    }
    .glass{
        /* From https://css.glass */
        background: rgba(255, 255, 255, 0.13);
        border-radius: 16px;
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(5.8px);
        -webkit-backdrop-filter: blur(5.8px);
        border: 1px solid rgba(255, 255, 255, 0.466);
    }
    .center{
        margin: 0;
        position: absolute;
        top: 50%;
        left: 50%;
        -ms-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
    }
    .progress-bar {
  position: relative;
  width: 100%;
  height: 8px;
  background-color: #f2f2f2;
  border-radius: 10px;
  overflow: hidden;
}

.progress {
  height: 100%;
  background-image: linear-gradient(to right, #8e49e9, #FA5441);
  width: 0%;
  border-radius: 10px;
  transition: width 0.3s ease;
}

.indicator {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 10px;
  height: 10px;
  background-color: #FA5441;
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(179, 72, 10, 0.801);
}
.fixed-width::-webkit-scrollbar {
  width: 12px; /* Width of the scrollbar */
  height: 5px;
  border-radius: 6px;
}

.fixed-width::-webkit-scrollbar-track {
  background: #f1f1f1; /* Color of the track */
  border-radius: 6px;
}

.fixed-width::-webkit-scrollbar-thumb {
  background: #888; /* Color of the scrollbar */
  border-radius: 6px; /* Rounded corners */
}

.fixed-width::-webkit-scrollbar-thumb:hover {
  background: #555; /* Color of the scrollbar on hover */
}

.no-spinner {
  -webkit-appearance: none;
  -moz-appearance: textfield; /* For Firefox */
  appearance: none;
}

/* Additional styles to ensure consistent appearance */
.no-spinner::-webkit-inner-spin-button,
.no-spinner::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.no-spinner::-webkit-outer-spin-button,
.no-spinner::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

.no-spinner::-moz-number-spinbox {
  -moz-appearance: textfield;
}
@media only screen and (max-width:1024px) {
    .center{
        position: relative;
        top: 0%;
        left: 0%;
        margin: 2rem auto 2rem auto;
        -ms-transform: translate(0%, 0%);
        transform: translate(0%, 0%);
    }
}
</style>