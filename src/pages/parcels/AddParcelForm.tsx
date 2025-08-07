import { useDispatch } from 'react-redux';
import { useForm, SubmitHandler } from 'react-hook-form';

// Ui:
import CustomSection from '../../shared/ui/CustomSection';
import CustomButton from '../../shared/ui/CustomButton';

// State:
import { addNewParcel } from '../../app/redux/slices/parcelsSlice';

// Types:
import { AppDispatch } from '../../app/redux/store';
export interface ParcelFormFields {
  parcel_weight: string;
  parcel_status:
    | 'Изменен адрес отправки'
    | 'Проблема с упаковкой'
    | 'Вышел из строя транспорт';
}

// Api:
import { PARCELS_URL } from '../../shared/api/logistics_appApi';

const AddParcelForm = () => {
  const dispatch: AppDispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ParcelFormFields>();

  const onSubmit: SubmitHandler<ParcelFormFields> = async (formData) => {
    if (
      Number(formData.parcel_weight) % 20 !== 0 ||
      Number(formData.parcel_weight) > 100
    ) {
      setError('parcel_weight', {
        type: 'pattern',
        message: 'Укажите число кратное 20. В диапазоне от 20 до 100.',
      });

      return;
    }

    try {
      await dispatch(
        addNewParcel({ url: PARCELS_URL, parcelFormData: formData })
      ).unwrap();

      reset();
    } catch (error: unknown) {
      setError('root', { message: 'Что-то пошло не так...' });
    }
  };

  // Регулярные выражения для проверки полей формы:
  // ------------------------------------------------------------
  const parcelWeightPattern: RegExp = /^(?:[1-9]\d*)$/;

  return (
    <CustomSection className="w-full p-2 bg-section_primary container-shadow xs:rounded-md xs:gap-4 lg:min-h-0 lg:h-full">
      <form
        className="h-full flex flex-col gap-3"
        onSubmit={handleSubmit(onSubmit)}
        action="#"
        method="post"
      >
        <div className="pb-4 flex flex-col gap-2 border-b-2 border-gray-200 text-sm lg:text-base">
          <h3 className="font-semibold text-[#7B57DF] title-shadow">
            Данные о посылке:
          </h3>

          <div className="flex flex-col gap-4">
            <div className="w-full flex flex-col gap-1">
              <label htmlFor="parcel_weight" className="text-secondary">
                Вес, кг
              </label>
              <input
                {...register('parcel_weight', {
                  required: 'Укажите вес посылки',
                  pattern: {
                    value: parcelWeightPattern,
                    message:
                      'Принимаются только числовые значения. Укажите число кратное 20. В диапазоне от 20 до 100.',
                  },
                })}
                id="parcel_weight"
                className="p-2 bg-element_primary rounded-sm outline-none"
                type="text"
                placeholder="20"
                maxLength={3}
              />
              {errors.parcel_weight && (
                <span className="text-amber-500 text-sm leading-4">
                  {errors.parcel_weight.message}
                </span>
              )}
            </div>

            <div className="w-full flex flex-col gap-1">
              <span className="text-secondary">Статус посылки</span>

              <fieldset className="p-2 w-full flex flex-col gap-1 bg-element_primary rounded-sm">
                <div className="flex items-center gap-2">
                  <input
                    id="adress_err"
                    type="radio"
                    value="Изменен адрес отправки"
                    {...register('parcel_status', {
                      required: 'Укажите статус посылки',
                    })}
                  ></input>
                  <label htmlFor="adress_err" className="cursor-pointer">
                    Изменен адрес отправки
                  </label>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    id="packaging_err"
                    type="radio"
                    value="Проблема с упаковкой"
                    {...register('parcel_status', {
                      required: 'Укажите статус посылки',
                    })}
                  ></input>
                  <label htmlFor="packaging_err" className="cursor-pointer">
                    Проблема с упаковкой
                  </label>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    id="transport_err"
                    type="radio"
                    value="Вышел из строя транспорт"
                    {...register('parcel_status', {
                      required: 'Укажите статус посылки',
                    })}
                  ></input>
                  <label htmlFor="transport_err" className="cursor-pointer">
                    Вышел из строя транспорт
                  </label>
                </div>
              </fieldset>

              {errors.parcel_status && (
                <span className="text-amber-500 text-sm leading-4">
                  {errors.parcel_status.message}
                </span>
              )}
            </div>
          </div>
        </div>

        <CustomButton
          className={`m-auto py-2 px-4 text-white bg-[#7B57DF] ${
            isSubmitting && 'bg-gray-300'
          } text-sm lg:text-base`}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Сборка посылки' : 'Собрать посылку'}
        </CustomButton>

        {/* ------------------------------ */}
        {/* Общая ошибка для всей таблицы: */}
        {/* ------------------------------ */}
        {errors.root && (
          <div className="text-center text-amber-500 text-sm leading-4">
            {errors.root.message}
          </div>
        )}
      </form>
    </CustomSection>
  );
};

export default AddParcelForm;
