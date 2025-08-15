import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Ui:
import CustomSection from '../../../../shared/ui/CustomSection';
import CustomButton from '../../../../shared/ui/CustomButton';

// State:

import {
  selectShipmentRequests,
  addParcelsToShipment,
} from '../../../redux/slices/shipmentsSlice';

import {
  selectParcelsToUpload,
  selectParcelsToUploadErrorMsg,
  setParcelsToUploadErrorMsg,
  resetParcelsToUpload,
} from '../../../redux/slices/parcelsToUploadSlice';

import {
  attachParcelToShipmentRequest,
  selectisAttachingParcel,
} from '../../../redux/slices/parcelsSlice';

// Types:
import { AppDispatch } from '../../../redux/store';
import { Parcel } from '../../../redux/slices/parcelsSlice';
import { ShipmentRequest } from '../../../../types/shipments.interface';

// Api:
import { PARCELS_URL } from '../../../../shared/api/logistics_appApi';

const ParcelsToUpload = () => {
  const dispatch: AppDispatch = useDispatch();
  const { id } = useParams();

  const parcelsToUploadErrorMsg: string = useSelector(
    selectParcelsToUploadErrorMsg
  );
  const isAttachingParcel: boolean = useSelector(selectisAttachingParcel);

  // Текущие не проведенные заявки на отгрузку:
  // ---------------------------------------------
  const shipmentRequests = useSelector(selectShipmentRequests);
  const currentShipmentRequest: ShipmentRequest | undefined =
    shipmentRequests.find((shipmentRequest) => shipmentRequest.id === id);

  // Выбранные на отгрузку посылки:
  // ---------------------------------------------
  const parcelsToUpload = useSelector(selectParcelsToUpload);
  const parcelsTotalWeight = parcelsToUpload.reduce(
    (totalWeight, parcel) => (totalWeight += Number(parcel.parcel_weight)),
    0
  );

  // "Привязать" выбранные посылки к непроведенной заявке на отгрузку:
  // -----------------------------------------------------------------------
  const handleAddParcelsToShipment = async () => {
    if (currentShipmentRequest) {
      // Расчет суммарного веса посылок:
      const totalMaxLoadVal: number = currentShipmentRequest.max_load_value;

      const remainingLoadVal: number =
        currentShipmentRequest.max_load_value -
        currentShipmentRequest.current_load_value;

      const isWeightOverload: boolean =
        totalMaxLoadVal < parcelsTotalWeight ||
        remainingLoadVal < parcelsTotalWeight;

      // Логика обработки веса выбранных посылок по сравнению с грузоподъемностью машины:
      if (isWeightOverload) {
        if (parcelsToUploadErrorMsg === '') {
          dispatch(setParcelsToUploadErrorMsg('Уменьшите вес посылок'));
        }
      } else {
        // Сервер: обход всех посылок и замена у нужных поля isUploaded на true
        const attachAllParcels = parcelsToUpload.map((parcelInfo) => {
          const parcelToAttach = {
            url: PARCELS_URL,
            parcelId: parcelInfo.id,
          };

          return dispatch(attachParcelToShipmentRequest(parcelToAttach));
        });

        await Promise.all(attachAllParcels);

        // Клиент: Добавление всех выбранных посылок в массив посылок активной заявки на отгрузку:
        const parcelsAndShipmentData = {
          currentShipmentId: currentShipmentRequest.id,
          parcelsToUpload: parcelsToUpload,
          parcelsTotalWeight: parcelsTotalWeight,
        };

        dispatch(addParcelsToShipment(parcelsAndShipmentData));

        // Клиент: ресет выбранных посылок в компоненте расчета их общего веса:
        dispatch(resetParcelsToUpload());

        // Done: очистка массива parcelsToUpload
        // Done: отправка на сервер POST запроса по выбранным посылкам, что они загружены в машину (рендер их стейта в таблице)
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
          disabled={
            parcelsToUpload.length === 0 ||
            parcelsToUploadErrorMsg !== '' ||
            isAttachingParcel
          }
          className={`p-2 mx-auto w-1/2 min-w-45 max-w-60 text-[whitesmoke] ${
            parcelsToUpload.length === 0 ||
            parcelsToUploadErrorMsg !== '' ||
            isAttachingParcel
              ? 'bg-gray-300'
              : 'bg-[#7B57DF]'
          }`}
          onClick={() => {
            handleAddParcelsToShipment();
          }}
        >
          {isAttachingParcel ? 'Погрузка посылок' : 'Загрузить в машину'}
        </CustomButton>
        <span className="text-amber-500 text-sm text-center leading-4">
          {parcelsToUploadErrorMsg !== '' && parcelsToUploadErrorMsg}
        </span>
      </div>
    </CustomSection>
  );
};

export default ParcelsToUpload;
