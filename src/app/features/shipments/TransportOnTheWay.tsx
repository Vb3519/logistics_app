// React-icons:
import { FaAngleRight } from 'react-icons/fa';

// Ui:
import CustomButton from '../../../shared/ui/CustomButton';

const TransportOnTheWay = () => {
  return (
    <section className="p-2 flex flex-col gap-4 bg-white container-shadow xs:p-4 xs:mx-4 xs:rounded-md lg:m-0">
      <div className="text-sm flex justify-between gap-2 lg:text-base">
        <h2 className="font-semibold lg:text-lg">Транспорт в пути</h2>

        <CustomButton className="flex items-center text-[#7B57DF]">
          Весь список
          <FaAngleRight />
        </CustomButton>
      </div>

      <div className="w-full overflow-x-auto">
        <table className="w-full text-sm text-center lg:text-base">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 rounded-l-md text-gray-500">Адрес</th>
              <th className="p-2 text-gray-500">Автомобиль</th>
              <th className="p-2 rounded-r-md text-gray-500">Опоздание</th>
            </tr>
          </thead>

          <tbody>
            <tr className="p-2 border-b-2 border-gray-200">
              <td className="p-2">Санкт-Петербург - Москва</td>
              <td className="p-2">Iveco 80E12</td>
              <td className="p-2">Нет</td>
            </tr>

            <tr className="p-2 border-b-2 border-gray-200">
              <td className="p-2">Санкт-Петербург - Москва</td>
              <td className="p-2">Iveco 80E12</td>
              <td className="p-2">Да</td>
            </tr>

            <tr className="p-2 border-b-2 border-gray-200">
              <td className="p-2">Санкт-Петербург - Москва</td>
              <td className="p-2">Iveco 80E12</td>
              <td className="p-2">Нет</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default TransportOnTheWay;
