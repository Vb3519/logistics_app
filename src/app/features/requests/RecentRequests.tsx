// React-icons:
import { BsBoxSeamFill } from 'react-icons/bs';
import { FaAngleRight } from 'react-icons/fa';

// Ui:
import CustomButton from '../../../shared/ui/CustomButton';
import CustomSection from '../../../shared/ui/CustomSection';

const RecentRequests = () => {
  return (
    <CustomSection className="flex flex-col gap-4 xs:mx-4">
      <div className="text-sm flex justify-between gap-2 lg:text-base">
        <h2 className="font-semibold lg:text-lg">Недавние запросы</h2>

        <CustomButton className="flex items-center text-[#7B57DF]">
          Весь список
          <FaAngleRight />
        </CustomButton>
      </div>

      <ul className="text-sm flex flex-col gap-2 lg:text-base">
        <li className="pb-4 flex items-center gap-2 border-b-2 border-b-gray-200">
          <BsBoxSeamFill className="text-3xl text-red-900/70 flex-shrink-0" />
          <div>
            <h3 className="font-semibold">Перенаправление заказа</h3>
            <p className="text-gray-500">
              Адрес{' '}
              <span className="font-semibold">Санкт-Петербург - Москва</span>
            </p>
          </div>
          <p className="ml-auto">7 мин назад</p>
        </li>
        <li className="pb-4 flex items-center gap-2 border-b-2 border-b-gray-200">
          <BsBoxSeamFill className="text-3xl text-red-900/70 flex-shrink-0" />
          <div>
            <h3 className="font-semibold">Перенаправление заказа</h3>
            <p className="text-gray-500">
              Адрес{' '}
              <span className="font-semibold">Санкт-Петербург - Москва</span>
            </p>
          </div>
          <p className="ml-auto">7 мин назад</p>
        </li>
        <li className="pb-4 flex items-center gap-2 border-b-2 border-b-gray-200">
          <BsBoxSeamFill className="text-3xl text-red-900/70 flex-shrink-0" />
          <div>
            <h3 className="font-semibold">Перенаправление заказа</h3>
            <p className="text-gray-500">
              Адрес{' '}
              <span className="font-semibold">Санкт-Петербург - Москва</span>
            </p>
          </div>
          <p className="ml-auto">7 мин назад</p>
        </li>
      </ul>
    </CustomSection>
  );
};

export default RecentRequests;
