import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

// Types:
import { AppDispatch } from 'app/redux/store';
import { ClientFormFields } from 'types/clients.interface';

// Services:
import addNewClient from 'app/services/clients/addNewClient';

// Api:
import { CLIENTS_URL } from 'shared/api/logistics_appApi';

// Регулярные выражения для проверки полей формы:
// ------------------------------------------------------------
export const companyTitlePattern: RegExp = /[а-яА-Яa-zA-Z]/;
export const userNameAndSernPattern: RegExp = /^[a-zA-Zа-яА-ЯёЁ]+$/;
export const userPhoneNumberPattern: RegExp =
  /^\+7\s?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/;
export const userEmailPattern: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Использование формы:
// --------------------------
const useAddNewClientForm = () => {
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
      setError('root', { message: 'Что-то пошло не так...' });
    }
  };

  return {
    register: register,
    handleSubmit: handleSubmit,
    onSubmit: onSubmit,
    errors: errors,
    isSubmitting: isSubmitting,
  };

  // return {register, handleSubmit, onSubmit, errors, isSubmitting}
};

export default useAddNewClientForm;
