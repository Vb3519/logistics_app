import { useDispatch, useSelector } from 'react-redux';
import { useForm, SubmitHandler } from 'react-hook-form';

// Types:
import { AppDispatch } from '../../../../redux/store';
import { ParcelFormFields } from '../../../../../types/parcels.interface';

// Services:
import addNewParcel from '../../../../services/parcels/addNewParcel';

// Api:
import { PARCELS_URL } from '../../../../../shared/api/logistics_appApi';

// Constants:
import { DAILY_PLAN_LIMITS } from '../../../../../shared/constants/logisticAppContants';

// State:
import {
  incrementParcelsCollected,
  selectDailyParcelsCollected,
} from '../../../../redux/slices/dailyPlanSlice';

// Регулярные выражения для проверки полей формы:
// ------------------------------------------------------------
export const parcelWeightPattern: RegExp = /^(?:[1-9]\d*)$/;

// Использование формы:
// --------------------------
const useAddNewParcelForm = () => {
  const dispatch: AppDispatch = useDispatch();

  const parcelsCollected = useSelector(selectDailyParcelsCollected);

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

      if (parcelsCollected < DAILY_PLAN_LIMITS.parcelsLimit) {
        dispatch(incrementParcelsCollected());
      }

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

  // return { register, handleSubmit, onSubmit, errors, isSubmitting };
};

export default useAddNewParcelForm;
