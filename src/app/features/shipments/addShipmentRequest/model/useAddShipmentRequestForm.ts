import { useDispatch, useSelector } from 'react-redux';
import { useForm, SubmitHandler } from 'react-hook-form';

// Types:
import { AppDispatch } from '../../../../redux/store';
import { ShipmentRequestFormFileds } from '../../../../../types/shipments.interface';

// State:
import { toggleAddShipmentModal } from '../../../../redux/slices/shipmentModalsSlice';
import {
  selectDailyShipmentsCreated,
  incrementShipmentsCreated,
} from '../../../../redux/slices/dailyPlanSlice';

// Services:
import addShipmentRequest from '../../../../services/shipments/addShipmentRequest';

// Api:
import { SHIPMENTS_URL } from '../../../../../shared/api/logistics_appApi';

// Constants:
import { DAILY_PLAN_LIMITS } from '../../../../../shared/constants/logisticAppContants';

// Регулярные выражения для проверки полей формы:
// ------------------------------------------------------------
export const shipmentAdressPattern: RegExp = /^[А-Яа-яЁё]+([\- ][А-Яа-яЁё]+)*$/;

const useAddShipmentRequestForm = () => {
  const dispatch: AppDispatch = useDispatch();

  const shipmentsCreated = useSelector(selectDailyShipmentsCreated);

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
