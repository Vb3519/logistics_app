import { AiOutlineCodepenCircle } from 'react-icons/ai';

const Footer = () => {
  return (
    <footer className="p-2 mt-4 flex gap-2 justify-between items-center bg-gray-300 text-gray-400 col-span-2 xl:px-10 2xl:px-16">
      <div className="flex items-center gap-2">
        <AiOutlineCodepenCircle className="text-4xl" />
        <p className="font-semibold">Logistics App</p>
      </div>
      <div className="text-sm font-semibold text-gray-400 text-right">
        2025 by Viktor Bordyugov
      </div>
    </footer>
  );
};

export default Footer;
