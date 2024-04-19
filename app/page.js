import Hero from "@/components/hero";
import Main from "@/components/main";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  return (

    <>
    <ToastContainer />
      <Hero/>
      <Main/>
    </>
  );
}
