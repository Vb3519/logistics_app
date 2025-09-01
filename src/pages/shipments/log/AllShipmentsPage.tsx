import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

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

// State:
import {
  selectShipmentsLogData,
  selectIsShipmentsLogDataLoading,
} from '../../../app/redux/slices/shipmentsLogSlice';

// Services:
import loadShipmentsLogData from '../../../app/services/shipments/loadShipmentsLogData';

// Data:
import {
  tableHeaderCols,
  // shipmentsData,
} from '../../../shared/data/shipmentsData';

// Types:
import { ShipmentsTableElem_Props } from '../../../types/shipments.interface';
import { AppDispatch } from '../../../app/redux/store';

// Api:
import { SHIPMENTS_URL } from '../../../shared/api/logistics_appApi';

// Constants:
import { MIN_SHIPMENTS_LOG_ELEMS_TO_RENDER } from '../../../constants/logisticAppContants';

const AllShipmentsPage = () => {
  const dispatch: AppDispatch = useDispatch();

  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(15);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const isShipmentsLogDataLoading: boolean = useSelector(
    selectIsShipmentsLogDataLoading
  );
  const shipmentsLogData = useSelector(selectShipmentsLogData);

  const tablePlaceholdersConter: number =
    MIN_SHIPMENTS_LOG_ELEMS_TO_RENDER - shipmentsLogData.length;

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
        currentPath="/shipments/all"
        currentPageTitle="Все отгрузки"
      />

      <CustomSection className="min-h-screen w-full p-2 flex flex-col justify-between bg-section_primary container-shadow xs:rounded-md lg:min-h-0 lg:h-full">
        <TableContainer sx={{ maxHeight: '100vh' }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {tableHeaderCols.map((colTitle, index) => {
                  return (
                    <TableCell
                      key={index}
                      sx={{
                        textAlign: 'center',
                        fontWeight: 'bold',
                        color: '#6B7280',
                        fontFamily: 'inter',
                      }}
                    >
                      {colTitle}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>

            <TableBody>
              {shipmentsLogData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((shipmentLogElem, index) => {
                  return (
                    <TableRow
                      key={index}
                      sx={{ cursor: 'pointer' }}
                      className="transition delay-50 ease-in hover:bg-gray-200"
                    >
                      <TableCell
                        sx={{ textAlign: 'center', fontFamily: 'inter' }}
                      >
                        <span>{shipmentLogElem.from_city}</span> -{' '}
                        <span>{shipmentLogElem.to_city}</span>
                      </TableCell>
                      <TableCell
                        sx={{ textAlign: 'center', fontFamily: 'inter' }}
                      >
                        {shipmentLogElem.shipment_number}
                      </TableCell>
                      <TableCell
                        sx={{ textAlign: 'center', fontFamily: 'inter' }}
                      >
                        {shipmentLogElem.transport}
                      </TableCell>
                      <TableCell
                        sx={{ textAlign: 'center', fontFamily: 'inter' }}
                      >
                        {shipmentLogElem.current_load_value}
                      </TableCell>
                      <TableCell
                        sx={{ textAlign: 'center', fontFamily: 'inter' }}
                      >
                        {shipmentLogElem.shipment_status}
                      </TableCell>
                    </TableRow>
                  );
                })}

              {Array.from({ length: tablePlaceholdersConter }).map(
                (_, index) => {
                  return (
                    <AllShipmentsTableSkeleton
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
          count={shipmentsLogData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        ></TablePagination>
      </CustomSection>
    </main>
  );
};

export default AllShipmentsPage;

// Скелетон:
// --------------------------------------
interface AllShipmentsTableSkeleton_Props {
  isDataLoading: boolean;
}

const AllShipmentsTableSkeleton: React.FC<AllShipmentsTableSkeleton_Props> = ({
  isDataLoading,
}) => {
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

// Самостоятельная верстка таблицы:
// --------------------------------------
const ShipmentsTableElem: React.FC<ShipmentsTableElem_Props> = ({
  destination,
  shipment_number,
  truck_number,
  total_weight,
  status,
  ...props
}) => {
  return (
    <tr {...props} className="border-b-2 border-b-gray-300">
      <td className="px-1 py-2">{destination}</td>
      <td className="px-1 py-2">{shipment_number}</td>
      <td className="px-1 py-2">{truck_number}</td>
      <td className="hidden px-1 py-2 xs:table-cell">{total_weight}</td>
      <td className="hidden px-1 py-2 xs:table-cell">{status}</td>
    </tr>
  );
};

const ShipmentsTable = () => {
  return (
    <CustomSection className="min-h-screen w-full p-2 bg-white container-shadow xs:rounded-md lg:min-h-0 lg:h-full">
      <table className="w-full text-sm text-center leading-4 lg:text-base">
        <thead className="bg-gray-200 text-gray-500">
          <tr>
            <th className="px-1 py-2 rounded-l-sm sm:p-3">Адрес доставки</th>
            <th className="px-1 py-2 sm:p-3">Номер заказа</th>
            <th className="px-1 py-2 rounded-r-sm xs:rounded-r-none sm:p-3">
              Автомобиль
            </th>
            <th className="hidden px-1 py-2 xs:table-cell sm:p-3">
              Общий вес, кг
            </th>
            <th className="hidden px-1 py-2 rounded-r-sm xs:table-cell sm:p-3">
              Статус
            </th>
          </tr>
        </thead>
        <tbody>
          <ShipmentsTableElem
            destination="Санкт-Петербург - Москва"
            shipment_number="В435324"
            truck_number="Iveco 80E12"
            total_weight="400"
            status="В пути"
          />
        </tbody>
      </table>
    </CustomSection>
  );
};
