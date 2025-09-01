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
import BreadCrumbs from '../../../shared/ui/BreadCrumbs';
import CustomSection from '../../../shared/ui/CustomSection';

// Data:
import {
  tableHeaderCols,
  shipmentsData,
} from '../../../shared/data/shipmentsData';

// State:
import {
  selectShipmentsLogData,
  selectIsShipmentsLogDataLoading,
} from '../../../app/redux/slices/shipmentsLogSlice';

// Services:
import loadShipmentsLogData from '../../../app/services/shipments/loadShipmentsLogData';

// Api:
import { SHIPMENTS_URL } from '../../../shared/api/logistics_appApi';

// Types:
import { AppDispatch } from '../../../app/redux/store';

// Constants:
import { MIN_SHIPMENTS_LOG_ELEMS_TO_RENDER } from '../../../constants/logisticAppContants';

const CompletedShipmentsPage = () => {
  const dispatch: AppDispatch = useDispatch();

  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(15);

  const shipmentsLogData = useSelector(selectShipmentsLogData);
  const isShipmentsLogDataLoading: boolean = useSelector(
    selectIsShipmentsLogDataLoading
  );

  // Работа с таблицей:
  // ----------------------------------
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(Number(event.target.value));
    setPage(0);
  };

  const completedShipmentsLog = shipmentsLogData.filter(
    (el) => el.shipment_status === 'Завершена'
  );

  const tablePlaceholdersConter: number =
    MIN_SHIPMENTS_LOG_ELEMS_TO_RENDER - completedShipmentsLog.length;

  useEffect(() => {
    if (shipmentsLogData.length === 0 && !isShipmentsLogDataLoading) {
      dispatch(
        loadShipmentsLogData({
          url: SHIPMENTS_URL,
          param: '?is_shipment_status_set=true',
        })
      );
    }
  }, []);

  return (
    <main className="h-full flex flex-col items-center gap-4 xs:mx-4 lg:mx-0 lg:px-4">
      <BreadCrumbs
        backTopath="/shipments"
        backToPageTitle="Текущие отгрузки"
        currentPath="/shipments/completed"
        currentPageTitle="Завершенные"
      />

      <CustomSection className="min-h-screen w-full p-2 flex flex-col justify-between bg-section_primary container-shadow xs:rounded-md lg:min-h-0 lg:h-full">
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {tableHeaderCols.map((el, index) => {
                  return (
                    <TableCell
                      key={index}
                      sx={{
                        textAlign: 'center',
                        fontWeight: 'bold',
                        color: '#6B7280',
                      }}
                    >
                      {el}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>

            <TableBody>
              {completedShipmentsLog
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((completedShipmentEl, index) => {
                  return (
                    <TableRow
                      key={index}
                      sx={{ cursor: 'pointer' }}
                      className="transition delay-50 ease-in hover:bg-gray-200"
                    >
                      <TableCell
                        sx={{ textAlign: 'center', fontFamily: 'inter' }}
                      >
                        <span>{completedShipmentEl.from_city}</span> -{' '}
                        <span>{completedShipmentEl.to_city}</span>
                      </TableCell>
                      <TableCell
                        sx={{ textAlign: 'center', fontFamily: 'inter' }}
                      >
                        {completedShipmentEl.shipment_number}
                      </TableCell>
                      <TableCell
                        sx={{ textAlign: 'center', fontFamily: 'inter' }}
                      >
                        {completedShipmentEl.transport}
                      </TableCell>
                      <TableCell
                        sx={{ textAlign: 'center', fontFamily: 'inter' }}
                      >
                        {completedShipmentEl.current_load_value}
                      </TableCell>
                      <TableCell
                        sx={{ textAlign: 'center', fontFamily: 'inter' }}
                      >
                        {completedShipmentEl.shipment_status}
                      </TableCell>
                    </TableRow>
                  );
                })}

              {Array.from({ length: tablePlaceholdersConter }).map(
                (_, index) => {
                  return (
                    <CompletedShipmentsTableSkeleton
                      key={index}
                      isDataLoading={isShipmentsLogDataLoading}
                    />
                  );
                }
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[15, 30, 45]}
          component="div"
          count={completedShipmentsLog.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        ></TablePagination>
      </CustomSection>
    </main>
  );
};

export default CompletedShipmentsPage;

// Скелетон:
// --------------------------------------
interface CompletedShipmentsTableSkeleton_Props {
  isDataLoading: boolean;
}

const CompletedShipmentsTableSkeleton: React.FC<
  CompletedShipmentsTableSkeleton_Props
> = ({ isDataLoading }) => {
  const emptyTitles: string[] = ['-', '-', '-', '-', '-'];

  return (
    <TableRow className={`${isDataLoading && 'animate-pulse'}`}>
      {emptyTitles.map((emptyEl, index) => {
        return (
          <TableCell
            key={index}
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
            {emptyEl}
          </TableCell>
        );
      })}
    </TableRow>
  );
};
