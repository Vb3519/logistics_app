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
  ParcelsTableRow_Props,
} from '../../../../types/parcels.interface';

const ParcelsTableRow: React.FC<ParcelsTableRow_Props> = memo(
  ({ isCheckBoxNeeded, parcelData, isParcelSelectedToUpload, ...props }) => {
    // const { isCheckBoxNeeded, parcelData } = props;

    return (
      <TableRow {...props} sx={{ cursor: 'pointer' }}>
        {isCheckBoxNeeded ? (
          <TableCell sx={{ textAlign: 'center' }}>
            {parcelData.isUploaded ? (
              <BsBoxSeamFill className="h-10.5 m-auto text-xl text-secondary" />
            ) : (
              <Checkbox
                checked={isParcelSelectedToUpload || parcelData.isUploaded}
              ></Checkbox>
            )}
          </TableCell>
        ) : null}

        <TableCell
          sx={{
            textAlign: 'center',
            fontFamily: 'inter',
            color: `${
              isParcelSelectedToUpload
                ? '#7B57DF'
                : parcelData.isUploaded && '#99a1af'
            }`,
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
          }}
        >
          {parcelData.parcel_weight}
        </TableCell>
      </TableRow>
    );
  }
);

export default ParcelsTableRow;
