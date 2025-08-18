// MUI:
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

// Types:
import { ParcelsPageTableSkeleton_Props } from '../../../../../types/parcels.interface';

const ParcelsPageTableSkeleton: React.FC<ParcelsPageTableSkeleton_Props> = ({
  isParcelsDataLoading,
}) => {
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

export default ParcelsPageTableSkeleton;
