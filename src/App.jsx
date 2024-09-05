import { useState } from 'react';
import logo from './assets/logo.png';
import bg from './assets/bg.png'; // Import background image
import { FaYoutube, FaTiktok, FaTelegram } from 'react-icons/fa';
import { IoMdArrowBack } from 'react-icons/io';
import ConnectButtons from './components/ConnectButtons';
import ProgressIndicator from './components/ProgressIndicator';

function App() {
  const steps = [
    {
      id: 1,
      title: 'Your Detail',
      description: 'Fill in your personal detail',
    },
    {
      id: 2,
      title: 'Connect your Platform',
      description: 'Connect your Platforms',
    },
    { id: 3, title: 'Preview', description: 'Review your details' },
  ];

  const [currentStep, setCurrentStep] = useState(1);

  const handleContinue = () => {
    setCurrentStep((prevStep) => Math.min(prevStep + 1, steps.length));
  };

  const handleBack = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  return (
    <div className='flex items-center flex-col h-screen'>
      <div
        className='pt-10 md:w-[500px] w-[350px] bg-cover bg-center flex flex-col items-center gap-5'
        style={{ backgroundImage: `url(${bg})` }}
      >
        <img src={logo} alt='aiqem logo' className='w-32 h-auto' />
        <h1 className='text-3xl font-medium'>Connect your Platform</h1>
      </div>
      <div className='w-fit flex flex-col items-center md:items-start gap-8'>
        <div className='flex md:flex-row flex-col items-center md:justify-around h-fit w-fit gap-8 mt-10'>
          <ConnectButtons
            Icon={FaYoutube}
            title='YouTube'
            description='Connect Your YouTube Channel'
            href='https://youtube.com'
          />
          <ConnectButtons
            Icon={FaTiktok}
            title='TikTok'
            description='Connect Your TikTok Personal Account'
            href='https://tiktok.com'
          />
        </div>
        <ConnectButtons
          Icon={FaTelegram}
          title='Telegram'
          description='Connect Your Telegram Account'
          href='https://telegram.com'
        />
      </div>
      <div className='flex flex-col gap-4 items-center justify-center mt-10'>
        <button
          onClick={handleContinue}
          className='px-24 py-2 rounded-md bg-[#7f56d9] text-white text-xs font-medium hover:bg-[#7f56d9]/80'
        >
          Continue
        </button>
        <a
          href='#'
          onClick={(e) => {
            e.preventDefault(); // Prevent default anchor behavior
            handleBack();
          }}
          className='flex gap-1 items-center justify-center text-gray-700'
        >
          <IoMdArrowBack /> <p className='text-xs font-medium'>Back</p>
        </a>
      </div>
      <div className='flex justify-center items-center mt-10'>
        <ProgressIndicator currentStep={currentStep} steps={steps} />
      </div>
    </div>
  );
}

export default App;
