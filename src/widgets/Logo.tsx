// React-icons:
import { AiOutlineCodepenCircle } from 'react-icons/ai';

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <AiOutlineCodepenCircle className="text-4xl text-[#7B57DF]" />
      <div className="flex flex-col gap-1">
        <h2 className="font-semibold text-[#7B57DF]">Logistics App</h2>
        <p className="text-xs text-gray-400">WorkSpace</p>
      </div>
    </div>
  );
};

export default Logo;
