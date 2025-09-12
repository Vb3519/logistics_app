// Ui:
import CustomButton from 'shared/ui/CustomButton';
import CustomSection from 'shared/ui/CustomSection';

// Model:
import useAddNewParcelForm from '../model/useAddNewParcelForm';

// Patterns:
import { parcelWeightPattern } from '../model/useAddNewParcelForm';

const AddParcelForm = () => {
  const { register, handleSubmit, onSubmit, errors, isSubmitting } =
    useAddNewParcelForm();

  return (
    <CustomSection className="w-full p-2 bg-section_primary container-shadow xs:rounded-md xs:gap-4 lg:h-full lg:basis-2/5">
      <form
        className="h-full flex flex-col gap-3"
        onSubmit={handleSubmit(onSubmit)}
        action="#"
        method="post"
      >
        <div className="pb-4 flex flex-col gap-2 border-b-2 border-gray-200 text-sm xl:text-base">
          <h3 className="font-semibold text-[#7B57DF] title-shadow">
            Данные о посылке
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
          } text-sm xl:text-base`}
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
