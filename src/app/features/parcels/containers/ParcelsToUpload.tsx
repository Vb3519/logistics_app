import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Ui:
import CustomSection from '../../../../shared/ui/CustomSection';
import CustomButton from '../../../../shared/ui/CustomButton';

// State:

import {
  selectCurrentShipmentRequests,
  addParcelsToShipment,
} from '../../../redux/slices/shipmentsSlice';

import { selectParcelsToUpload } from '../../../redux/slices/parcelsToUploadSlice';

// Types:
import { Parcel } from '../../../redux/slices/parcelsSlice';
import { ShipmentRequest } from '../../../../types/shipments.interface';

const ParcelsToUpload = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  // Текущие не проведенные заявки на отгрузку:
  // ---------------------------------------------
  const currentShipmentRequests = useSelector(selectCurrentShipmentRequests);
  const activeShipmentRequest: ShipmentRequest | undefined =
    currentShipmentRequests.find(
      (shipmentRequest) => shipmentRequest.id === id
    );

  // Выбранные на отгрузку посылки:
  // ---------------------------------------------
  const parcelsToUpload = useSelector(selectParcelsToUpload);
  const parcelsTotalWeight = parcelsToUpload.reduce(
    (totalWeight, parcel) => (totalWeight += Number(parcel.parcel_weight)),
    0
  );

  // "Привязать" выбранные посылки к непроведенной заявке на отгрузку:
  // -----------------------------------------------------------------------
  const handleAddParcelsToShipment = () => {
    if (activeShipmentRequest) {
      const totalMaxLoadVal: number = activeShipmentRequest.max_load_value;

      const remainingLoadVal: number =
        activeShipmentRequest.max_load_value -
        activeShipmentRequest.current_load_value;

      const isWeightOverload: boolean =
        totalMaxLoadVal < parcelsTotalWeight ||
        remainingLoadVal < parcelsTotalWeight;

      const parcelsAndShipmentData = {
        activeShipmentId: activeShipmentRequest.id,
        parcelsToUpload: parcelsToUpload,
        parcelsTotalWeight: parcelsTotalWeight,
      };

      if (isWeightOverload) {
        alert('Уменьшите вес посылок');
      } else {
        dispatch(addParcelsToShipment(parcelsAndShipmentData));

        // очистка массива parcelsToUpload
        // отправка на сервер POST запроса по выбранным посылкам, что они загружены в машину (рендер их стейта в таблице)
        // рендер данных о посылках в карточке отгрузки
      }
    }
  };

  return (
    <CustomSection className="w-full p-2 flex flex-col gap-4 bg-section_primary container-shadow text-sm xs:rounded-md lg:text-base">
      <div className="flex flex-col gap-2">
        <h2 className="font-semibold text-[#7B57DF] title-shadow text-base">
          Доступные посылки
        </h2>
        <div className="p-2 flex flex-col gap-1 bg-element_primary border-b-2 border-b-[#cbcbcb] rounded-md xs:p-4 xs:flex-row xs:gap-6">
          <div>
            <span className="text-primary">Выбрано, шт: </span>
            <span>{parcelsToUpload.length}</span>
          </div>
          <div>
            <span className="text-primary">Вес, кг: </span>
            <span>{parcelsTotalWeight}</span>
          </div>
        </div>
        <CustomButton
          disabled={parcelsToUpload.length === 0}
          className={`p-2 mx-auto w-1/2 min-w-45 max-w-60 text-[whitesmoke] ${
            parcelsToUpload.length === 0 ? 'bg-gray-300' : 'bg-[#7B57DF]'
          }`}
          onClick={() => {
            handleAddParcelsToShipment();
          }}
        >
          Загрузить в машину
        </CustomButton>
        <span>123</span>
      </div>
    </CustomSection>
  );
};

export default ParcelsToUpload;
