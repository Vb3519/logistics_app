// Ui:
import CustomSection from '../../shared/ui/CustomSection';
import CustomButton from '../../shared/ui/CustomButton';

const AddClientForm = () => {
  return (
    <CustomSection className="h-full bg-section_primary">
      <form className="flex flex-col gap-3">
        <div className="pb-4 w-full flex flex-col gap-2 border-b-2 border-gray-200 text-sm lg:text-base">
          <label
            htmlFor="company_name"
            className="font-semibold text-[#7B57DF]"
          >
            Название компании:
          </label>
          <input
            id="company_name"
            className="p-2 bg-element_primary rounded-sm outline-none"
            type="text"
            placeholder={`ООО "Пример Названия"`}
          />
        </div>

        <div className="pb-4 flex flex-col gap-2 border-b-2 border-gray-200 text-sm lg:text-base">
          <h3 className="font-semibold text-[#7B57DF]">
            Данные сотрудника компании:
          </h3>
          <div className="w-full flex flex-col gap-1">
            <label htmlFor="surname" className="text-secondary">
              Фамилия
            </label>
            <input
              id="surname"
              className="p-2 bg-element_primary rounded-sm outline-none"
              type="text"
              placeholder="Петров"
            />
          </div>

          <div className="w-full flex flex-col gap-1">
            <label htmlFor="name" className="text-secondary">
              Имя
            </label>
            <input
              id="name"
              className="p-2 bg-element_primary rounded-sm outline-none"
              type="text"
              placeholder="Петр"
            />
          </div>

          <div className="w-full flex flex-col gap-1">
            <label htmlFor="phone" className="text-secondary">
              Телефон
            </label>
            <input
              id="phone"
              className="p-2 bg-element_primary rounded-sm outline-none"
              type="text"
              placeholder="+7 (___) ___-__-__"
            />
          </div>

          <div className="w-full flex flex-col gap-1">
            <label htmlFor="email" className="text-secondary">
              Эл. почта
            </label>
            <input
              id="email"
              className="p-2 bg-element_primary rounded-sm outline-none"
              type="text"
              placeholder="example@mail.ru"
            />
          </div>
        </div>

        <CustomButton className="m-auto py-2 px-4 text-white bg-[#7B57DF] text-sm lg:text-base">
          Добавить контрагента
        </CustomButton>
      </form>
    </CustomSection>
  );
};

export default AddClientForm;
