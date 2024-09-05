import { MdArrowOutward } from 'react-icons/md';

const ConnectButtons = ({ Icon, title, description, href }) => {
  return (
    <div className='border-slate-200 border hover:shadow-lg hover:shadow-purple-300 w-[390px] py-2 px-4 rounded-xl flex justify-between shadow-sm'>
      <div className='flex items-center'>
        <Icon size={45} />
      </div>
      <div className='flex flex-col gap-1'>
        <h1 className='font-semibold text-xl text-black'>{title}</h1>
        <p className='text-xs text-gray-800 font-normal '>{description}</p>
      </div>
      <a href={href} className='flex text-purple-500 gap-1'>
        <p className='font-medium text-sm'>connect</p>
        <MdArrowOutward />
      </a>
    </div>
  );
};

export default ConnectButtons;
