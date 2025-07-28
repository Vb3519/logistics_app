// React-icons:
import { FaAngleRight } from 'react-icons/fa';

// Ui:
import CustomButton from '../../../shared/ui/CustomButton';
import CustomSection from '../../../shared/ui/CustomSection';

const FreeTranport = () => {
  return (
    <CustomSection className="flex flex-col gap-4">
      <div className="text-sm flex justify-between gap-2 lg:text-base">
        <h2 className="font-semibold lg:text-lg">Свободный транспорт</h2>

        <CustomButton className="flex items-center text-[#7B57DF]">
          Весь список
          <FaAngleRight />
        </CustomButton>
      </div>

      <ul className="flex flex-col gap-2 text-sm lg:text-base">
        <li className="pb-4 flex gap-2 border-b-2 border-b-gray-200">
          <div className="w-full flex flex-col gap-1">
            <p className="font-semibold">v435322</p>
            <p>Санкт-Петербург - Москва</p>
          </div>
          <div className="w-full flex flex-col justify-end">
            <p className="text-right">
              <span className="text-amber-300">90</span> / 100%
            </p>
            <div className="h-1 bg-amber-200"></div>
          </div>
        </li>

        <li className="pb-4 flex gap-2 border-b-2 border-b-gray-200">
          <div className="w-full flex flex-col gap-1">
            <p className="font-semibold">v435322</p>
            <p>Санкт-Петербург - Москва</p>
          </div>
          <div className="w-full flex flex-col justify-end">
            <p className="text-right">
              <span className="text-amber-300">90</span> / 100%
            </p>
            <div className="h-1 bg-amber-200"></div>
          </div>
        </li>

        <li className="pb-4 flex gap-2 border-b-2 border-b-gray-200">
          <div className="w-full flex flex-col gap-1">
            <p className="font-semibold">v435322</p>
            <p>Санкт-Петербург - Москва</p>
          </div>
          <div className="w-full flex flex-col justify-end">
            <p className="text-right">
              <span className="text-amber-300">90</span> / 100%
            </p>
            <div className="h-1 bg-amber-200"></div>
          </div>
        </li>
      </ul>
    </CustomSection>
  );
};

export default FreeTranport;
