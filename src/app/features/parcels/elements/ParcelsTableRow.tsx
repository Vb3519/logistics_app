import { memo } from 'react';

// MUI:
import TableCell from '@mui/material/TableCell';
import TableRow, { TableRowProps } from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';

// Types:
import { Parcel } from '../../../redux/slices/parcelsSlice';
interface ParcelsTableRow_Props extends TableRowProps {
  isCheckBoxNeeded: boolean;
  parcelData: Parcel;
  isAlrdyUploaded: boolean;
}

const ParcelsTableRow: React.FC<ParcelsTableRow_Props> = memo(
  ({ isCheckBoxNeeded, parcelData, isAlrdyUploaded, ...props }) => {
    // const { isCheckBoxNeeded, parcelData } = props;

    console.log('ParcelsTableRow rendered');

    return (
      <TableRow {...props} sx={{ cursor: 'pointer' }}>
        {isCheckBoxNeeded ? (
          <TableCell sx={{ textAlign: 'center' }}>
            <Checkbox checked={isAlrdyUploaded}></Checkbox>
          </TableCell>
        ) : null}

        <TableCell
          sx={{
            textAlign: 'center',
            fontFamily: 'inter',
          }}
        >
          {parcelData.parcel_number}
        </TableCell>
        <TableCell sx={{ textAlign: 'center', fontFamily: 'inter' }}>
          {parcelData.parcel_weight}
        </TableCell>
      </TableRow>
    );
  }
);

export default ParcelsTableRow;
