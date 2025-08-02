// React-icons:
import { MdOutlinePersonOutline } from 'react-icons/md';

// Ui:
import CustomSection from '../../shared/ui/CustomSection';

const AddClientTip = () => {
  return (
    <CustomSection className="hidden h-full flex-col gap-4 md:flex">
      <div className="pb-2 flex items-center gap-2 border-b-2 border-gray-200 text-sm lg:text-base">
        <MdOutlinePersonOutline className="text-4xl text-gray-400" />
        <h2 className="font-semibold text-[#7B57DF]">
          Добавление контрагента:
        </h2>
      </div>

      <ul className="w-full flex flex-col gap-2 text-sm lg:text-base lg:gap-4">
        <li className="p-2 bg-gray-200 rounded-sm lg:p-4">
          - Укажите название компании, например ООО "Компания";
        </li>
        <li className="p-2 bg-gray-200 rounded-sm lg:p-4">
          - Фамилию и имя сотрудника компании;
        </li>
        <li className="p-2 bg-gray-200 rounded-sm lg:p-4">
          - Мобильный или городской номер телефона;
        </li>
        <li className="p-2 bg-gray-200 rounded-sm lg:p-4">
          - Электронную почту, например example@mail.ru.
        </li>
      </ul>
    </CustomSection>
  );
};

export default AddClientTip;
