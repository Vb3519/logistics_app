import { memo } from 'react';

// React-icons:
import { BsBoxSeamFill } from 'react-icons/bs';

// MUI:
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';

// Types:
import {
  Parcel,
  ShipmentParcelsTableRow_Props,
} from '../../../../types/parcels.interface';

const ShipmentParcelsTableRow: React.FC<ShipmentParcelsTableRow_Props> = memo(
  ({ parcelData, isParcelSelectedToUpload, ...props }) => {
    // const { parcelData, isParcelSelectedToUpload } = props;

    return (
      <TableRow {...props} sx={{ cursor: 'pointer' }}>
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
