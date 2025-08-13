// React-icons:
import { BsBoxSeamFill } from 'react-icons/bs';

// Ui:
import CustomSection from '../../../../shared/ui/CustomSection';

const AddParcelTip = () => {
  return (
    <CustomSection className="hidden w-full h-full items-center gap-4 bg-section_primary sm:flex lg:basis-3/5">
      <div className="h-full flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <BsBoxSeamFill className="text-4xl text-secondary/70" />
          <h2 className="font-semibold text-[#7B57DF] title-shadow">
            Сборка посылки
          </h2>
        </div>

        <ul className="w-full h-full flex flex-col gap-2 text-sm lg:text-base lg:gap-4">
          <li className="p-2 flex items-center flex-1 bg-gradient-to-r bg-element_primary to-gray-300 rounded-sm lg:p-4">
            - Обязательно необходимо указать вес (от 20 до 100 кг);
          </li>
          <li className="p-2 flex items-center flex-1 bg-gradient-to-r bg-element_primary to-gray-300 rounded-sm lg:p-4">
            - В выпадающем меню выбрать статус посылки;
          </li>
          <li className="p-2 flex items-center flex-1 bg-gradient-to-r bg-element_primary to-gray-300 rounded-sm lg:p-4">
            - После сборки посылка будет доступна в списке справа;
          </li>
          <li className="p-2 flex items-center flex-1 bg-gradient-to-r bg-element_primary to-gray-300 rounded-sm lg:p-4">
            - Все собранные посылки можно загружать в транспорт, предварительно
            создав заявку на отгрузку.
          </li>
        </ul>
      </div>
    </CustomSection>
  );
};

export default AddParcelTip;
