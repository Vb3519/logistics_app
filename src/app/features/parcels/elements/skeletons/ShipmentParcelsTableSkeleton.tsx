// Types:
import { ShipmentParcelsTableSkeleton_Props } from '../../../../../types/parcels.interface';

// React-icons:
import { BsClockHistory } from 'react-icons/bs';

// MUI:
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

const ShipmentParcelsTableSkeleton: React.FC<
  ShipmentParcelsTableSkeleton_Props
> = ({ isParcelsDataLoading }) => {
  return (
    <TableRow className={`${isParcelsDataLoading ? 'animate-pulse' : null}`}>
      <TableCell
        sx={{
          textAlign: 'center',
          fontSize: {
            xs: '14px',
            '@media (min-width:1280px)': {
              fontSize: '16px',
            },
          },
        }}
      >
        <BsClockHistory className="h-10.5 m-auto text-xl text-secondary" />
      </TableCell>
      <TableCell
        sx={{
          textAlign: 'center',
          fontSize: {
            xs: '14px',
            '@media (min-width:1280px)': {
              fontSize: '16px',
            },
          },
          color: '#99a1af',
          fontWeight: 'bold',
        }}
      >
        -
      </TableCell>
      <TableCell
        sx={{
          textAlign: 'center',
          fontSize: {
            xs: '14px',
            '@media (min-width:1280px)': {
              fontSize: '16px',
            },
          },
          color: '#99a1af',
          fontWeight: 'bold',
        }}
      >
        -
      </TableCell>
    </TableRow>
  );
};

export default ShipmentParcelsTableSkeleton;
