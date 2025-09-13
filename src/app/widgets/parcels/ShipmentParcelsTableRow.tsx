import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

// React-icons:
import { BsBoxSeamFill } from 'react-icons/bs';

// MUI:
import { TableRowProps } from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';

// Types:
import { Parcel } from 'types/parcels.interface';

// State:
import { selectIsUploadingParcel } from 'app/redux/slices/parcelsSlice';

import {
  selectParcelsWeightOverloadError,
  setParcelsWeightOverloadError,
  removeParcelFromUpload,
  addParcelToUpload,
} from 'app/redux/slices/parcelsToUploadSlice';

// Utils:
import { addShipmentDataToParcel } from 'shared/utils/addShipmentDataToParcel';

// Ряд таблицы посылок:
// ----------------------------------------------------------------------------
export interface ShipmentParcelsTableRow_Props extends TableRowProps {
  parcelData: Parcel;
  isParcelSelectedToUpload: boolean;
}

const ShipmentParcelsTableRow: React.FC<ShipmentParcelsTableRow_Props> = memo(
  ({ parcelData, isParcelSelectedToUpload, ...props }) => {
    // const { parcelData, isParcelSelectedToUpload } = props;

    const dispatch = useDispatch();

    const { id } = useParams();

    const isUploadingParcel: boolean = useSelector(selectIsUploadingParcel);
    const parcelsWeightOverloadError: string = useSelector(
      selectParcelsWeightOverloadError
    );

    // Добавление и удаление посылки из транспорта и проверка перевеса:
    const toggleUploadParcelToTransport = (
      parcelData: Parcel,
      shipmentId: string | undefined,
      isSelected: boolean
    ) => {
      const { isUploaded, id } = parcelData;

      if (isUploadingParcel || isUploaded || !shipmentId) return;

      if (parcelsWeightOverloadError !== '') {
        dispatch(setParcelsWeightOverloadError(''));
      }

      if (isSelected) {
        dispatch(removeParcelFromUpload(id));
      } else {
        const parcelWithShipmentId = addShipmentDataToParcel(
          parcelData,
          shipmentId
        );

        dispatch(addParcelToUpload(parcelWithShipmentId));
      }
    };

    return (
      <TableRow
        {...props}
        sx={{ cursor: 'pointer' }}
        onClick={() => {
          toggleUploadParcelToTransport(
            parcelData,
            id,
            isParcelSelectedToUpload
          );
        }}
      >
        <TableCell sx={{ textAlign: 'center' }}>
          {parcelData.isUploaded ? (
            <BsBoxSeamFill className="h-10.5 m-auto text-xl text-secondary" />
          ) : (
            <Checkbox
              checked={isParcelSelectedToUpload || parcelData.isUploaded}
            ></Checkbox>
          )}
        </TableCell>

        <TableCell
          sx={{
            textAlign: 'center',
            fontFamily: 'inter',
            color: `${
              isParcelSelectedToUpload
                ? '#7B57DF'
                : parcelData.isUploaded && '#99a1af'
            }`,
            fontSize: {
              xs: '14px',
              '@media (min-width:1280px)': {
                fontSize: '16px',
              },
            },
          }}
        >
          {parcelData.parcel_number}
        </TableCell>

        <TableCell
          sx={{
            textAlign: 'center',
            fontFamily: 'inter',
            color: `${
              isParcelSelectedToUpload
                ? '#7B57DF'
                : parcelData.isUploaded && '#99a1af'
            }`,
            fontSize: {
              xs: '14px',
              '@media (min-width:1280px)': {
                fontSize: '16px',
              },
            },
          }}
        >
          {parcelData.parcel_weight}
        </TableCell>
      </TableRow>
    );
  }
);

export default ShipmentParcelsTableRow;
