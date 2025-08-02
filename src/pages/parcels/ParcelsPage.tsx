// React-icons:
import { BsBoxSeamFill } from 'react-icons/bs';

// Ui:
import CustomSection from '../../shared/ui/CustomSection';
import CustomButton from '../../shared/ui/CustomButton';
import BreadCrumbs from '../../shared/ui/BreadCrumbs';
import ParcelsTable from './ParcelsTable';

const ParcelsPage = () => {
  return (
    <main className="h-full flex flex-col items-center gap-4 xs:mx-4 lg:mx-0 lg:px-4">
      <BreadCrumbs
        backTopath="/"
        backToPageTitle="Главная"
        currentPath="/parcels"
        currentPageTitle="Посылки"
      />

      <div className="w-full h-full flex flex-col gap-4 sm:flex-row">
        <div className="w-full flex flex-col gap-4">
          <CustomSection className="hidden w-full h-full items-center gap-4 sm:flex">
            <div className="h-full flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <BsBoxSeamFill className="text-4xl text-red-900/70" />
                <h2 className="font-semibold text-gray-400 lg:text-lg">
                  Сборка посылки:
                </h2>
              </div>

              <ul className="w-full h-full flex flex-col gap-2 text-sm lg:text-base lg:gap-4">
                <li className="p-2 bg-gray-200 rounded-sm lg:p-4">
                  - Обязательно необходимо указать вес (от 20 до 100 кг);
                </li>
                <li className="p-2 bg-gray-200 rounded-sm lg:p-4">
                  - В выпадающем меню выбрать статус посылки;
                </li>
                <li className="p-2 bg-gray-200 rounded-sm lg:p-4">
                  - После сборки посылка будет доступна в списке справа;
                </li>
                <li className="p-2 bg-gray-200 rounded-sm lg:p-4">
                  - Все собранные посылки можно загружать в транспорт,
                  предварительно создав заявку на отгрузку.
                </li>
              </ul>
            </div>
          </CustomSection>

          <CustomSection className="w-full p-2 bg-white container-shadow xs:rounded-md xs:gap-4 lg:min-h-0 lg:h-full">
            <form className="p-2 h-full flex flex-col gap-8">
              <input
                className="p-2 outline-none bg-gray-200 rounded-sm"
                type="text"
                placeholder="Укажите вес посылки, кг"
              />

              <div className="p-4 flex flex-col gap-2 bg-gray-200 rounded-md text-sm lg:text-base">
                <span className="text-gray-400">Статус посылки</span>
                <select className="outline-none cursor-pointer">
                  <option></option>
                  <option>Изменен адрес отправки</option>
                  <option>Проблема с упаковкой</option>
                  <option>Вышел из строя транспорт</option>
                </select>
              </div>

              <CustomButton className="m-auto py-2 px-4 text-white bg-[#7B57DF]">
                Собрать посылку
              </CustomButton>
            </form>
          </CustomSection>
        </div>

        <ParcelsTable isCheckBoxNeeded={false} />
      </div>
    </main>
  );
};

export default ParcelsPage;
