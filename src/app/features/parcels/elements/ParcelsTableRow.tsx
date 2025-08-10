import { memo } from 'react';

// MUI:
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';

// Types:
interface ParcelsTableRow_Props {
  isCheckBoxNeeded: boolean;
  parcelData: {
    id: string;
    parcel_number: string;
    parcel_weight: string;
    parcel_status:
      | 'Изменен адрес отправки'
      | 'Проблема с упаковкой'
      | 'Вышел из строя транспорт';
    isSelected?: boolean;
  };
}

const ParcelsTableRow: React.FC<ParcelsTableRow_Props> = memo((props) => {
  const { isCheckBoxNeeded, parcelData } = props;

  console.log('ParcelsTableRow rendered');

  return (
    <TableRow>
      {isCheckBoxNeeded ? (
        <TableCell sx={{ textAlign: 'center' }}>
          <Checkbox></Checkbox>
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
});

export default ParcelsTableRow;
