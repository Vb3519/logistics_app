import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// React-icons:
import { BsClockHistory } from 'react-icons/bs';

// MUI:

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

// Ui:
import CustomSection from '../../../../../shared/ui/CustomSection';
import ShipmentParcelsTableRow from './ShipmentParcelsTableRow';

// Data:
import { parcelsData } from '../../../../../shared/data/parcelsData';

// State:
import {
  selectParcelsData,
  selectIsParcelsDataLoading,
} from '../../../../redux/slices/parcelsSlice';

// Services:
import loadParcelsData from '../../services/loadParcelsData';

import { selectParcelsToUploadData } from '../../../../redux/slices/parcelsToUploadSlice';

// Types:
import { AppDispatch } from '../../../../redux/store';
import { Parcel } from '../../../../../types/parcels.interface';

// Api:
import { PARCELS_URL } from '../../../../../shared/api/logistics_appApi';

const ShipmentParcelsTable = () => {
  const dispatch: AppDispatch = useDispatch();
  const headerTitles: string[] = ['Выбор', 'Номер посылки', 'Вес, кг'];

  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  // Работа с таблицей:
  // ---------------------
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(Number(event.target.value));
    setPage(0);
  };

  // Загрузка данных по посылкам (общие данные и данные посылок на погрузку в транспорт):
  // -----------------------------------
  const parcelsData: Parcel[] = useSelector(selectParcelsData);
  const isParcelsDataLoading: boolean = useSelector(selectIsParcelsDataLoading);

  const parcelsToUploadData: Parcel[] = useSelector(selectParcelsToUploadData);

  useEffect(() => {
    if (parcelsData.length === 0 && !isParcelsDataLoading) {
      dispatch(loadParcelsData({ url: PARCELS_URL, shipmentId: null }));
    }
  }, []);

  const tablePlaceholdersCounter: number =
    rowsPerPage -
    parcelsData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .length;

  return (
    <CustomSection className="w-full min-h-[80vh] flex flex-col justify-between bg-section_primary xs:rounded-md">
      <TableContainer sx={{ maxHeight: '70vh' }}>
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
              {headerTitles.map((headerTitle, index) => {
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
                      fontSize: {
                        xs: '14px',
                        '@media (min-width:1280px)': {
                          fontSize: '16px',
                        },
                      },
                    }}
                  >
                    {headerTitle}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>

          <TableBody>
            {parcelsData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((parcelInfo) => {
                const isParcelSelectedToUpload: boolean =
                  parcelsToUploadData.some(
                    (parcel) => parcel.id === parcelInfo.id
                  );

                return (
                  <ShipmentParcelsTableRow
                    key={parcelInfo.id}
                    parcelData={parcelInfo}
                    isParcelSelectedToUpload={isParcelSelectedToUpload}
                  />
                );
              })}

            {/* ПЛЕЙСХОЛДЕРЫ ДЛЯ ТАБЛИЦЫ С ЧЕКБОКСАМИ: */}
            <TablePlaceholdersContainer
              counter={tablePlaceholdersCounter}
              isParcelsDataLoading={isParcelsDataLoading}
            />
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[10, 20, 40]}
        component="div"
        count={parcelsData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      ></TablePagination>
    </CustomSection>
  );
};

export default ShipmentParcelsTable;

// ----------------------------------------------------------------------------
// Лоадеры:
// ----------------------------------------------------------------------------

// Контейнер для плейсхолдеров:
interface TablePlaceholdersContainer_Props {
  counter: number;
  isParcelsDataLoading: boolean;
}

const TablePlaceholdersContainer: React.FC<
  TablePlaceholdersContainer_Props
> = ({ counter, isParcelsDataLoading }) => {
  return (
    <>
      {Array.from({
        length: counter,
      }).map((_, index) => {
        return (
          <ParcelsTableSkeleton
            key={index}
            isDataLoading={isParcelsDataLoading}
          />
        );
      })}
    </>
  );
};

// Скелетон:
interface ParcelsTableSkeleton_Props {
  isDataLoading: boolean;
}

const ParcelsTableSkeleton: React.FC<ParcelsTableSkeleton_Props> = ({
  isDataLoading,
}) => {
  const emptyTitles: string[] = ['-', '-'];

  return (
    <TableRow className={`${isDataLoading && 'animate-pulse'}`}>
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
