import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// MUI:
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

// Ui:
import CustomSection from '../../shared/ui/CustomSection';

// Data:
import {
  clientsData,
  clientsTableHeaderTitles,
} from '../../shared/data/clientsData';

// State:
import {
  selectClients,
  loadClientsData,
} from '../../app/redux/slices/clientsSlice';

// Api:
import { CLIENTS_URL } from '../../shared/api/logistics_appApi';

// Types:
import { AppDispatch } from '../../app/redux/store';

const ClientsTable = () => {
  const dispatch: AppDispatch = useDispatch();

  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  // Пагинация таблицы с клиентами компании:
  // -------------------------------------------
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(Number(event.target.value));
    setPage(0);
  };

  // Загрузка данных по клиентам компании:
  // -------------------------------------------
  const handleLoadClientsData = (url: string) => {
    dispatch(loadClientsData(url));
  };

  useEffect(() => {
    if (currentCompanyClients.length === 0) {
      handleLoadClientsData(CLIENTS_URL);
    }
  }, []);

  const currentCompanyClients = useSelector(selectClients);

  return (
    <CustomSection className="w-full min-h-[30vh] flex flex-col gap-2 justify-between overflow-x-auto bg-section_primary">
      <TableContainer sx={{ maxHeight: '90vh' }}>
        <Table stickyHeader>
          <TableHead className="container-shadow">
            <TableRow
              sx={{
                'th:first-of-type': {
                  borderTopLeftRadius: '4px',
                  borderBottomLeftRadius: '4px',
                },
                'th:last-of-type': {
                  borderTopRightRadius: '4px',
                  borderBottomRightRadius: '4px',
                },
              }}
            >
              {clientsTableHeaderTitles.map((title, index) => {
                return (
                  <TableCell
                    key={index}
                    sx={{
                      textAlign: 'center',
                      fontWeight: 'bold',
                      color: '#6B7280',
                      fontFamily: 'inter',
                      padding: '14px',
                      backgroundColor: '#e5e7eb',
                    }}
                  >
                    {title}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>

          <TableBody>
            {currentCompanyClients
              .slice(rowsPerPage * page, rowsPerPage * page + rowsPerPage)
              .map((clientInfo) => {
                return (
                  <TableRow key={clientInfo.id}>
                    <TableCell
                      sx={{
                        textAlign: 'center',
                        fontFamily: 'inter',
                        padding: '14px',
                      }}
                    >
                      {clientInfo.company_title}
                    </TableCell>
                    <TableCell
                      sx={{
                        textAlign: 'center',
                        fontFamily: 'inter',
                        padding: '14px',
                      }}
                    >
                      {clientInfo.employee_name} {clientInfo.employee_sern}
                    </TableCell>
                    <TableCell
                      sx={{
                        textAlign: 'center',
                        fontFamily: 'inter',
                        padding: '14px',
                      }}
                    >
                      {clientInfo.company_phone}
                    </TableCell>
                    <TableCell
                      sx={{
                        textAlign: 'center',
                        fontFamily: 'inter',
                        padding: '14px',
                      }}
                    >
                      {clientInfo.company_email}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[10, 20, 30]}
        component="div"
        count={currentCompanyClients.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      ></TablePagination>
    </CustomSection>
  );
};

export default ClientsTable;
