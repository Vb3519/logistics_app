import { useForm, SubmitHandler } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// React-icons:
import { MdEditDocument } from 'react-icons/md';

// Ui:
import CustomSection from '../../../../../shared/ui/CustomSection';
import CustomButton from '../../../../../shared/ui/CustomButton';
import CloseShipmentAdressModalBtn from './CloseShipmentAdressModalBtn';

// State:
import { toggleShipmentAdressModal } from '../../../../redux/slices/shipmentModalsSlice';

// Services:
import editShipmentAdressAxios from '../../../../services/shipments/editShipmentAdress';

// Types:
import { AppDispatch } from '../../../../redux/store';

interface EditShipmentAdressFormFields {
  from_city: string;
  to_city: string;
}

const EditShipmentAdressForm = () => {
  const { id } = useParams();
  const dispatch: AppDispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EditShipmentAdressFormFields>();

  const onSubmit: SubmitHandler<EditShipmentAdressFormFields> = async (
    formData
  ) => {
    try {
      const { from_city, to_city } = formData;

      await dispatch(
        editShipmentAdressAxios({
          from_city: from_city,
          to_city: to_city,
          shipmentId: id,
        })
      ).unwrap();

      dispatch(toggleShipmentAdressModal());

      reset();
    } catch (error) {
      setError('root', { message: 'Что-то пошло не так...' });
    }
  };

  // Регулярные выражения для проверки полей формы:
  // ------------------------------------------------------------
  const shipmentAdressPattern: RegExp = /^[А-Яа-яЁё]+([\- ][А-Яа-яЁё]+)*$/;

  return (
    <CustomSection className="p-4 bg-section_primary rounded-md xs:mx-4 xs:min-w-70 md:min-w-85">
      <form
        className="h-full flex flex-col gap-2 text-sm xs:gap-4 xl:text-base"
        action="#"
        method="post"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <MdEditDocument className="text-2xl text-secondary/70 xl:text-3xl" />
            <h3 className="font-semibold text-[#7B57DF] title-shadow">
              Редактирование адреса
            </h3>

            <CloseShipmentAdressModalBtn />
          </div>

          {/* Отправка: */}
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

          {/* Доставка: */}
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
        </div>

        <CustomButton
          className={`min-w-41 m-auto py-2 px-4 bg-[#7B57DF] text-[whitesmoke] ${
            isSubmitting && 'bg-gray-300'
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Вносим изменения' : 'Изменить адрес'}
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

export default EditShipmentAdressForm;
