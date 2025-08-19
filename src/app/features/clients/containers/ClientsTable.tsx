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
import CustomSection from '../../../../shared/ui/CustomSection';
import ClientsTableRow from '../elements/ClientsTableRow';
import ClientsTableRowSkeleton from '../elements/skeletons/ClientsTableRowSkeleton';

// Data:
import {
  clientsData,
  clientsTableHeaderTitles,
} from '../../../../shared/data/clientsData';

// State:
import {
  selectClientsData,
  selectIsClientsDataLoading,
} from '../../../redux/slices/clientsSlice';

// Services:
import loadClientsData from '../services/loadClientsData';

// Api:
import { CLIENTS_URL } from '../../../../shared/api/logistics_appApi';

// Types:
import { AppDispatch } from '../../../redux/store';

const ClientsTable = () => {
  const dispatch: AppDispatch = useDispatch();

  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(15);

  const companyClientsData = useSelector(selectClientsData);
  const isClientsDataLoading: boolean = useSelector(selectIsClientsDataLoading);

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
    if (companyClientsData.length === 0 && !isClientsDataLoading) {
      handleLoadClientsData(CLIENTS_URL);
    }
  }, []);

  return (
    <CustomSection className="w-full min-h-[30vh] flex flex-col gap-2 justify-between overflow-x-auto bg-section_primary">
      <TableContainer
        sx={{
          maxHeight: '50vh',
          '@media (min-width:768px)': { maxHeight: '80vh' },
          '@media (min-width:1028px)': { maxHeight: '40vh' },
          '@media (min-width:1280px)': { maxHeight: '90vh' },
        }}
      >
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
            {companyClientsData
              .slice(rowsPerPage * page, rowsPerPage * page + rowsPerPage)
              .map((clientInfo) => {
                return (
                  <ClientsTableRow
                    key={clientInfo.id}
                    companyClientData={clientInfo}
                  />
                );
              })}

            {/* ПЛЕЙСХОЛДЕРЫ ДЛЯ ТАБЛИЦЫ С КЛИЕНТАМИ: */}
            {Array.from({
              length:
                rowsPerPage -
                companyClientsData.slice(
                  rowsPerPage * page,
                  rowsPerPage * page + rowsPerPage
                ).length,
            }).map((_, index) => {
              return (
                <ClientsTableRowSkeleton
                  key={index}
                  isClientsDataLoading={isClientsDataLoading}
                />
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[15, 30, 45]}
        component="div"
        count={companyClientsData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      ></TablePagination>
    </CustomSection>
  );
};

export default ClientsTable;
