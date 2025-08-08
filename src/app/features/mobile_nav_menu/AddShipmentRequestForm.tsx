// React-icons:
import { FaTruck, FaChevronDown } from 'react-icons/fa';

// Ui:
import CustomSection from '../../../shared/ui/CustomSection';
import CustomButton from '../../../shared/ui/CustomButton';

const AddShipmentRequestForm = () => {
  return (
    <CustomSection className="bg-section_primary xs:mx-4 sm:mx-0 sm:w-full">
      <form className="flex flex-col gap-2 xs:gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <FaTruck className="text-3xl text-secondary/70" />
            <h3 className="font-semibold text-[#7B57DF] title-shadow">
              Заявка на отгрузку:
            </h3>
          </div>

          <div className="w-full flex flex-col gap-1">
            <label htmlFor="name" className="text-secondary">
              Адрес отправки
            </label>
            <input
              id="from_adress"
              className="p-2 bg-element_primary rounded-sm outline-none"
              type="text"
              placeholder="Название города"
              maxLength={20}
            />
          </div>

          <div className="w-full flex flex-col gap-1">
            <label htmlFor="name" className="text-secondary">
              Адрес получения
            </label>
            <input
              id="from_adress"
              className="p-2 bg-element_primary rounded-sm outline-none"
              type="text"
              placeholder="Название города"
              maxLength={20}
            />
          </div>

          <div className="w-full flex flex-col gap-1">
            <label id="shipment_transport_descrip" className="text-secondary">
              Транспорт
            </label>
            <div className="group relative flex gap-2 bg-gray-200 rounded-sm">
              <select className="w-full p-2 appearance-none outline-none rounded-sm transition delay-100 ease-in cursor-pointer group-hover:text-[#7B57DF]">
                <option className="bg-white text-black">
                  Iveco 80E12 (до 100 кг)
                </option>
                <option className="bg-white text-black">
                  Iveco 80E14 (до 160 кг)
                </option>
                <option className="bg-white text-black">
                  Iveco 80E16 (до 200 кг)
                </option>
              </select>
              <FaChevronDown className="absolute right-2.5 top-3.5 text-sm text-secondary transition delay-100 ease-in group-hover:text-[#7B57DF]" />
            </div>
          </div>
        </div>

        <CustomButton className="w-1/2 min-w-41 mx-auto py-2 px-4 bg-[#7B57DF] text-[whitesmoke] text-sm">
          Провести заявку
        </CustomButton>
      </form>
    </CustomSection>
  );
};

export default AddShipmentRequestForm;
