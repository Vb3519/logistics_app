import { useState, useEffect, memo, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

// React-icons:
import { BsBoxSeamFill, BsClockHistory } from 'react-icons/bs';

// MUI:
import { TableRowProps } from '@mui/material/TableRow';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';

// Ui:
import CustomSection from '../../../../../shared/ui/CustomSection';

// Data:
import { parcelsData } from '../../../../../shared/data/parcelsData';

// State:
import {
  selectParcelsData,
  selectIsParcelsDataLoading,
  selectIsUploadingParcel,
} from '../../../../redux/slices/parcelsSlice';

// Services:
import loadParcelsData from '../../services/loadParcelsData';

import {
  selectParcelsToUploadData,
  selectParcelsWeightOverloadError,
  addParcelToUpload,
  removeParcelFromUpload,
  setParcelsWeightOverloadError,
} from '../../../../redux/slices/parcelsToUploadSlice';

// Types:
import { AppDispatch } from '../../../../redux/store';
import {
  Parcel,
  ParcelAndShipmentInfo,
} from '../../../../../types/parcels.interface';

// Api:
import { PARCELS_URL } from '../../../../../shared/api/logistics_appApi';

const ShipmentParcelsTable = () => {
  const dispatch: AppDispatch = useDispatch();
  const headerTitles: string[] = ['Выбор', 'Номер посылки', 'Вес, кг'];

  const { id } = useParams();

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

  const parcelsWeightOverloadError: string = useSelector(
    selectParcelsWeightOverloadError
  );

  const isUploadingParcel: boolean = useSelector(selectIsUploadingParcel);

  // Добавление и удаление посылок в непроведенную заявку на отгрузку:
  // -----------------------------------
  const handleAddParcelToUpload = (
    parcelAndShipmentData: ParcelAndShipmentInfo
  ) => {
    dispatch(addParcelToUpload(parcelAndShipmentData));

    if (parcelsWeightOverloadError !== '') {
      dispatch(setParcelsWeightOverloadError(''));
    }
  };

  const handleRemoveParcelFromUpload = (parcelId: string) => {
    dispatch(removeParcelFromUpload(parcelId));

    if (parcelsWeightOverloadError !== '') {
      dispatch(setParcelsWeightOverloadError(''));
    }
  };

  useEffect(() => {
    if (parcelsData.length === 0 && !isParcelsDataLoading) {
      dispatch(loadParcelsData(PARCELS_URL));
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
                    onClick={() => {
                      if (parcelInfo.isUploaded || isUploadingParcel) {
                        return;
                      }

                      if (isParcelSelectedToUpload) {
                        handleRemoveParcelFromUpload(parcelInfo.id);
                      } else if (id) {
                        handleAddParcelToUpload({
                          parcelData: parcelInfo,
                          shipmentId: id,
                        });
                      }
                    }}
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
// Ряд таблицы посылок:
// ----------------------------------------------------------------------------
export interface ShipmentParcelsTableRow_Props extends TableRowProps {
  parcelData: Parcel;
  isParcelSelectedToUpload: boolean;
}

const ShipmentParcelsTableRow: React.FC<ShipmentParcelsTableRow_Props> = memo(
  ({ parcelData, isParcelSelectedToUpload, ...props }) => {
    // const { parcelData, isParcelSelectedToUpload } = props;

    return (
      <TableRow {...props} sx={{ cursor: 'pointer' }}>
        <TableCell sx={{ textAlign: 'center' }}>
          {parcelData.isUploaded ? (
            <BsBoxSeamFill className="h-10.5 m-auto text-xl text-secondary" />
          ) : (
            <Checkbox
              checked={isParcelSelectedToUpload || parcelData.isUploaded}
            ></Checkbox>
          )}
        </TableCell>

        <TableCell
          sx={{
            textAlign: 'center',
            fontFamily: 'inter',
            color: `${
              isParcelSelectedToUpload
                ? '#7B57DF'
                : parcelData.isUploaded && '#99a1af'
            }`,
            fontSize: {
              xs: '14px',
              '@media (min-width:1280px)': {
                fontSize: '16px',
              },
            },
          }}
        >
          {parcelData.parcel_number}
        </TableCell>

        <TableCell
          sx={{
            textAlign: 'center',
            fontFamily: 'inter',
            color: `${
              isParcelSelectedToUpload
                ? '#7B57DF'
                : parcelData.isUploaded && '#99a1af'
            }`,
            fontSize: {
              xs: '14px',
              '@media (min-width:1280px)': {
                fontSize: '16px',
              },
            },
          }}
        >
          {parcelData.parcel_weight}
        </TableCell>
      </TableRow>
    );
  }
);

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
