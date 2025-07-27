// React-icons:
import { LuClipboardList } from 'react-icons/lu';
import { BsBoxSeamFill } from 'react-icons/bs';
import { FaTruck } from 'react-icons/fa';
import { AiOutlineFileDone } from 'react-icons/ai';

const GeneralInfo = () => {
  return (
    <section className="p-2 bg-white container-shadow xs:p-4 xs:mx-4 xs:rounded-md lg:col-span-2 lg:m-0">
      <h1 className="font-semibold lg:text-lg">Общие данные</h1>

      <ul className="py-4 flex gap-4 text-sm overflow-x-auto lg:text-base">
        <li className="min-w-40 p-4 flex gap-2 items-center justify-between bg-gray-200 rounded-md">
          <div className="flex flex-col gap-2">
            <p className="text-gray-500">Новые заказы</p>
            <p className="text-xl font-semibold">5</p>
          </div>
          <LuClipboardList className="text-3xl text-amber-500/70 flex-shrink-0" />
        </li>

        <li className="min-w-40 p-4 flex gap-2 items-center justify-between bg-gray-200 rounded-md">
          <div className="flex flex-col gap-2">
            <p className="text-gray-500">Готовы к отгрузке</p>
            <p className="text-xl font-semibold">2</p>
          </div>
          <BsBoxSeamFill className="text-3xl text-red-900/70 flex-shrink-0" />
        </li>

        <li className="min-w-40 p-4 flex gap-2 items-center justify-between bg-gray-200 rounded-md">
          <div className="flex flex-col gap-2">
            <p className="text-gray-500">В пути</p>
            <p className="text-xl font-semibold">8</p>
          </div>
          <FaTruck className="text-3xl text-blue-400/70 flex-shrink-0" />
        </li>

        <li className="min-w-40 p-4 flex gap-2 items-center justify-between bg-gray-200 rounded-md">
          <div className="flex flex-col gap-2">
            <p className="text-gray-500">Доставлены</p>
            <p className="text-xl font-semibold">12</p>
          </div>
          <AiOutlineFileDone className="text-3xl text-green-600/70 flex-shrink-0" />
        </li>
      </ul>
    </section>
  );
};

export default GeneralInfo;
