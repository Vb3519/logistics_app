import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

// Ui:
import CustomSection from '../../shared/ui/CustomSection';
import CustomButton from '../../shared/ui/CustomButton';

// State:
import { addNewClient } from '../../app/redux/slices/clientsSlice';

// Types:
import { AppDispatch } from '../../app/redux/store';
export interface ClientFormFields {
  company_title: string;
  employee_name: string;
  employee_sern: string;
  company_phone: string;
  company_email: string;
}

// Api:
import { CLIENTS_URL } from '../../shared/api/logistics_appApi';

const AddClientForm = () => {
  const dispatch: AppDispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ClientFormFields>();

  const onSubmit: SubmitHandler<ClientFormFields> = async (formData) => {
    try {
      await dispatch(
        addNewClient({ clientFormData: formData, url: CLIENTS_URL })
      ).unwrap();

      reset();
    } catch (error: unknown) {
      setError('root', {
        message: 'Что-то пошло не так...',
      });
    }
  };

  // Регулярные выражения для проверки полей формы:
  // ------------------------------------------------------------
  const companyTitlePattern: RegExp = /[а-яА-Яa-zA-Z]/;
  const userNameAndSernPattern: RegExp = /^[a-zA-Zа-яА-ЯёЁ]+$/;
  const userPhoneNumberPattern: RegExp =
    /^\+7\s?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/;
  const userEmailPattern: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return (
    <CustomSection className="h-full w-full bg-section_primary">
      <form
        className="flex flex-col gap-3"
        onSubmit={handleSubmit(onSubmit)}
        action="#"
        method="post"
      >
        {/* ------------------------------ */}
        {/* Название компании: */}
        {/* ------------------------------ */}
        <div className="pb-4 w-full flex flex-col gap-2 border-b-2 border-gray-200 text-sm lg:text-base">
          <label
            htmlFor="company_name"
            className="font-semibold text-[#7B57DF] title-shadow"
          >
            Название компании:
          </label>
          <input
            id="company_name"
            className="p-2 bg-element_primary rounded-sm outline-none"
            type="text"
            placeholder={`ООО "Пример Названия"`}
            maxLength={30}
            {...register('company_title', {
              required: 'Необходимо указать название компании',
              pattern: {
                value: companyTitlePattern,
                message: 'Название компании должно быть вида ООО "Компания"',
              },
            })}
          />
          {errors.company_title && (
            <span className="text-amber-500 text-sm leading-4">
              {errors.company_title.message}
            </span>
          )}
        </div>

        {/* ------------------------------ */}
        {/* Данные сотрудника компании: */}
        {/* ------------------------------ */}
        <div className="pb-4 flex flex-col gap-2 border-b-2 border-gray-200 text-sm lg:text-base">
          <h3 className="font-semibold text-[#7B57DF] title-shadow">
            Данные сотрудника компании:
          </h3>
          <div className="w-full flex flex-col gap-1">
            <label htmlFor="name" className="text-secondary">
              Имя
            </label>
            <input
              id="name"
              className="p-2 bg-element_primary rounded-sm outline-none"
              type="text"
              placeholder="Петр"
              maxLength={15}
              {...register('employee_name', {
                required: 'Укажите имя сотрудника компании',
                pattern: {
                  value: userNameAndSernPattern,
                  message: 'Принимаются только буквенные значения',
                },
              })}
            />
            {errors.employee_name && (
              <span className="text-amber-500 text-sm leading-4">
                {errors.employee_name.message}
              </span>
            )}
          </div>

          <div className="w-full flex flex-col gap-1">
            <label htmlFor="surname" className="text-secondary">
              Фамилия
            </label>
            <input
              id="surname"
              className="p-2 bg-element_primary rounded-sm outline-none"
              type="text"
              placeholder="Петров"
              maxLength={20}
              {...register('employee_sern', {
                required: 'Укажите фамилию сотрудника компании',
                pattern: {
                  value: userNameAndSernPattern,
                  message: 'Принимаются только буквенные значения',
                },
              })}
            />
            {errors.employee_sern && (
              <span className="text-amber-500 text-sm leading-4">
                {errors.employee_sern.message}
              </span>
            )}
          </div>

          <div className="w-full flex flex-col gap-1">
            <label htmlFor="phone" className="text-secondary">
              Телефон
            </label>
            <input
              id="phone"
              className="p-2 bg-element_primary rounded-sm outline-none"
              type="tel"
              placeholder="+7 (___) ___-__-__"
              maxLength={20}
              {...register('company_phone', {
                required: 'Укажите номер телефона сотрудника компании',
                pattern: {
                  value: userPhoneNumberPattern,
                  message:
                    'Номер телефона должен быть вида: +7 981 755 47 56 и содержать 11 цифр',
                },
              })}
            />
            {errors.company_phone && (
              <span className="text-amber-500 text-sm leading-4">
                {errors.company_phone.message}
              </span>
            )}
          </div>

          <div className="w-full flex flex-col gap-1">
            <label htmlFor="email" className="text-secondary">
              Эл. почта
            </label>
            <input
              id="email"
              className="p-2 bg-element_primary rounded-sm outline-none"
              type="email"
              placeholder="example@mail.ru"
              maxLength={20}
              {...register('company_email', {
                required: 'Укажите эл. почту сотрудника компании',
                pattern: {
                  value: userEmailPattern,
                  message: 'Эл. почта должна быть вида vb3519@yandex.ru',
                },
              })}
            />
            {errors.company_email && (
              <span className="text-amber-500 text-sm leading-4">
                {errors.company_email.message}
              </span>
            )}
          </div>
        </div>

        <CustomButton
          className={`m-auto py-2 px-4 text-white bg-[#7B57DF] ${
            isSubmitting && 'bg-gray-300'
          } text-sm lg:text-base`}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Отправка данных' : 'Добавить контрагента'}
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

export default AddClientForm;
