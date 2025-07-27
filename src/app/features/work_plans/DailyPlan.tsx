// React-icons:
import { BsThreeDots } from 'react-icons/bs';

// Ui:
import CustomButton from '../../../shared/ui/CustomButton';

const DailyPlan = () => {
  return (
    <section className="p-2 flex flex-col gap-4 bg-white container-shadow xs:p-4 xs:mx-4 xs:rounded-md lg:m-0">
      <div className="text-sm flex justify-between gap-2">
        <h2 className="font-semibold lg:text-lg">Дневной план</h2>

        <CustomButton className="flex items-center text-[#7B57DF]">
          <BsThreeDots />
        </CustomButton>
      </div>

      <div className="flex gap-2 text-sm lg:text-base">
        <ul className="flex flex-col gap-2">
          <li className="flex flex-col gap-1">
            <p>Собрано посылок</p>
            <p>
              2 / <span>10</span>
            </p>
          </li>
          <li className="flex flex-col gap-1">
            <p>Создано заявок</p>
            <p>
              3 / <span>5</span>
            </p>
          </li>
        </ul>

        <div className="w-full flex items-center justify-center bg-gray-200 rounded-md">
          Диаграмма статистики
        </div>
      </div>
    </section>
  );
};

export default DailyPlan;
