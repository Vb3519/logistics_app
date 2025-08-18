// MUI:
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

// Types:
import { ClientsTableRowSkeleton_Props } from '../../../../../types/clients.interface';

const ClientsTableRowSkeleton: React.FC<ClientsTableRowSkeleton_Props> = ({
  isClientsDataLoading,
}) => {
  return (
    <TableRow className={`${isClientsDataLoading ? 'animate-pulse' : null}`}>
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

export default ClientsTableRowSkeleton;
