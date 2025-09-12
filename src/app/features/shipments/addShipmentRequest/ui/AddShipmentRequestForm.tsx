import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

// React-icons:
import { FaTruck, FaChevronDown } from 'react-icons/fa';

// Ui:
import CustomButton from 'shared/ui/CustomButton';
import CustomSection from 'shared/ui/CustomSection';
import CloseAddShipmentModalBtn from '../../toggleAddShipmentModal/ui/CloseAddShipmentModalBtn';

// Model:
import useAddShipmentRequestForm from '../model/useAddShipmentRequestForm';

// Patterns:
import { shipmentAdressPattern } from '../model/useAddShipmentRequestForm';

const AddShipmentRequestForm = () => {
  const location = useLocation();

  const {
    register,
    handleSubmit,
    onSubmit,
    clearErrors,
    errors,
    isSubmitting,
  } = useAddShipmentRequestForm();

  useEffect(() => {
    clearErrors();
  }, [location.pathname]);

  return (
    <CustomSection className="min-w-70 bg-section_primary xs:mx-4 md:min-w-85">
      <form
        className="h-full flex flex-col gap-2 text-sm xs:gap-4 xl:text-base"
        action="#"
        method="post"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <FaTruck className="text-3xl text-secondary/70" />
            <h3 className="font-semibold text-[#7B57DF] title-shadow">
              Заявка на отгрузку
            </h3>

            <CloseAddShipmentModalBtn />
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
              {...register('from_city', {
                required: 'Укажите город отправки',
                pattern: {
                  message: 'Принимаются только буквенные значения',
                  value: shipmentAdressPattern,
                },
              })}
            />
            {errors.from_city && (
              <span className="text-amber-500 text-sm leading-4">
                {errors.from_city.message}
              </span>
            )}
          </div>

          <div className="w-full flex flex-col gap-1">
            <label htmlFor="name" className="text-secondary">
              Адрес получения
            </label>
            <input
              id="to_adress"
              className="p-2 bg-element_primary rounded-sm outline-none"
              type="text"
              placeholder="Название города"
              maxLength={20}
              {...register('to_city', {
                required: 'Укажите город доставки',
                pattern: {
                  message: 'Принимаются только буквенные значения',
                  value: shipmentAdressPattern,
                },
              })}
            />
            {errors.to_city && (
              <span className="text-amber-500 text-sm leading-4">
                {errors.to_city.message}
              </span>
            )}
          </div>

          <div className="w-full flex flex-col gap-1">
            <label id="shipment_transport_descrip" className="text-secondary">
              Транспорт
            </label>
            <div className="group relative flex gap-2 bg-gray-200 rounded-sm">
              <select
                className="w-full p-2 appearance-none outline-none rounded-sm transition delay-100 ease-in cursor-pointer group-hover:text-[#7B57DF]"
                {...register('transport_info', {
                  required: 'Выберите транспорт',
                })}
              >
                <option className="bg-white text-black"></option>
                <option
                  className="bg-white text-black"
                  value='{"transport":"ГАЗель A21R22 (до 100 кг)","max_load_value":"100"}'
                >
                  ГАЗель A21R22 (до 100 кг)
                </option>
                <option
                  className="bg-white text-black"
                  value='{"transport":"ГАЗель 3302 (до 160 кг)","max_load_value":"160"}'
                >
                  ГАЗель 3302 (до 160 кг)
                </option>
                <option
                  className="bg-white text-black"
                  value='{"transport":"ГАЗель A21R32 (до 200 кг)","max_load_value":"200"}'
                >
                  ГАЗель A21R32 (до 200 кг)
                </option>
              </select>
              <FaChevronDown className="absolute right-2.5 top-3.5 text-sm text-secondary transition delay-100 ease-in group-hover:text-[#7B57DF]" />
            </div>
            {errors.transport_info && (
              <span className="text-amber-500 text-sm leading-4">
                {errors.transport_info.message}
              </span>
            )}
          </div>
        </div>

        <CustomButton
          className={`min-w-41 m-auto py-2 px-4 bg-[#7B57DF] text-[whitesmoke] ${
            isSubmitting && 'bg-gray-300'
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Создание заявки' : 'Создать заявку'}
        </CustomButton>

        {errors.root && (
          <div className="text-center text-amber-500 text-sm leading-4">
            {errors.root.message}
          </div>
        )}
      </form>
    </CustomSection>
  );
};

export default AddShipmentRequestForm;
