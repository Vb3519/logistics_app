import { useDispatch, useSelector } from 'react-redux';
import { useForm, SubmitHandler } from 'react-hook-form';

// Types:
import { AppDispatch } from 'app/redux/store';
import { ShipmentRequestFormFileds } from 'types/shipments.interface';

// State:
import { toggleAddShipmentModal } from 'app/redux/slices/shipmentModalsSlice';

import {
  selectDailyShipmentsCreated,
  incrementShipmentsCreated,
} from 'app/redux/slices/dailyPlanSlice';

import { selectShipmentRequests } from 'app/redux/slices/shipmentsSlice';

// Services:
import addShipmentRequest from 'app/services/shipments/addShipmentRequest';

// Api:
import { SHIPMENTS_URL } from 'shared/api/logistics_appApi';

// Constants:
import { DAILY_PLAN_LIMITS } from 'shared/constants/logisticAppContants';

// Регулярные выражения для проверки полей формы:
// ------------------------------------------------------------
export const shipmentAdressPattern: RegExp = /^[А-Яа-яЁё]+([\- ][А-Яа-яЁё]+)*$/;

const useAddShipmentRequestForm = () => {
  const dispatch: AppDispatch = useDispatch();

  const shipmentsCreated = useSelector(selectDailyShipmentsCreated);
  const activeShipmentRequests = useSelector(selectShipmentRequests);

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ShipmentRequestFormFileds>();

  const onSubmit: SubmitHandler<ShipmentRequestFormFileds> = async (
    formData
  ) => {
    try {
      if (activeShipmentRequests.length >= 6) {
        alert('Вы достигли лимита по непроведенным заявкам на отгрузку!');
        return;
      }

      await dispatch(
        addShipmentRequest({
          url: SHIPMENTS_URL,
          shipmentRequestFormData: formData,
        })
      ).unwrap();

      dispatch(toggleAddShipmentModal());

      if (shipmentsCreated < DAILY_PLAN_LIMITS.shipmentsCreatedLimit) {
        dispatch(incrementShipmentsCreated());
      }

      reset();
    } catch (error: unknown) {
      setError('root', { message: 'Что-то пошло не так...' });
    }
  };

  // return { register, handleSubmit, onSubmit, clearErrors, errors, isSubmitting }

  return {
    register: register,
    handleSubmit: handleSubmit,
    onSubmit: onSubmit,
    clearErrors: clearErrors,
    errors: errors,
    isSubmitting: isSubmitting,
  };
};

export default useAddShipmentRequestForm;
