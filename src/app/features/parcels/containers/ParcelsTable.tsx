import { useState, useEffect, memo, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

// MUI:
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';

// Ui:
import CustomButton from '../../../../shared/ui/CustomButton';
import CustomSection from '../../../../shared/ui/CustomSection';
import ParcelsTableRow from '../elements/ParcelsTableRow';
import ParcelsToUpload from './ParcelsToUpload';

// Data:
import { parcelsData } from '../../../../shared/data/parcelsData';

// State:
import {
  loadParcelsData,
  selectParcels,
  selectIsParcelsDataLoading,
} from '../../../redux/slices/parcelsSlice';

import {
  selectParcelsToUpload,
  addParcelToUpload,
  removeParcelFromUpload,
} from '../../../redux/slices/parcelsToUploadSlice';

// Types:
import { AppDispatch } from '../../../redux/store';
import { Parcel } from '../../../redux/slices/parcelsSlice';

// Api:
import { PARCELS_URL } from '../../../../shared/api/logistics_appApi';

interface ParcelsTable_Props {
  isCheckBoxNeeded: boolean;
}

const ParcelsTable: React.FC<ParcelsTable_Props> = ({ isCheckBoxNeeded }) => {
  const dispatch: AppDispatch = useDispatch();
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

  // Загрузка данных по посылкам:
  // -----------------------------------
  const currentParcelsData: Parcel[] = useSelector(selectParcels);
  const isParcelsDataLoading: boolean = useSelector(selectIsParcelsDataLoading);

  const uploadedParcels: Parcel[] = useSelector(selectParcelsToUpload);

  // Добавление и удаление посылок в непроведенную заявку на отгрузку:
  // ----------------------------------- parcelData: Parcel
  interface ParcelAndShipmentInfo {
    parcelData: Parcel;
    shipmentId: string;
  }
  const handleAddParcelToUpload = (
    parcelAndShipmentData: ParcelAndShipmentInfo
  ) => {
    dispatch(addParcelToUpload(parcelAndShipmentData));
  };

  const handleRemoveParcelFromUpload = (parcelId: string) => {
    dispatch(removeParcelFromUpload(parcelId));
  };

  useEffect(() => {
    if (currentParcelsData.length === 0 && !isParcelsDataLoading) {
      dispatch(loadParcelsData(PARCELS_URL));
    }
  }, []);

  return (
    <div className="w-full flex flex-col gap-4">
      <ParcelsToUpload />

      <CustomSection className="w-full min-h-[80vh] flex flex-col justify-between bg-section_primary xs:rounded-md lg:basis-3/5">
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
                {isCheckBoxNeeded ? (
                  <TableCell
                    sx={{
                      textAlign: 'center',
                      fontWeight: 'bold',
                      color: '#6B7280',
                      fontFamily: 'inter',
                      padding: '14px',
                      backgroundColor: '#e5e7eb',
                    }}
                  >
                    Выбор
                  </TableCell>
                ) : null}

                <TableCell
                  sx={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    color: '#6B7280',
                    fontFamily: 'inter',
                    padding: '14px',
                    backgroundColor: '#e5e7eb',
                  }}
                >
                  Номер посылки
                </TableCell>
                <TableCell
                  sx={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    color: '#6B7280',
                    fontFamily: 'inter',
                    padding: '14px',
                    backgroundColor: '#e5e7eb',
                  }}
                >
                  Вес, кг
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {currentParcelsData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((parcelInfo) => {
                  const isAlrdyUploaded: boolean = uploadedParcels.some(
                    (parcel) => parcel.id === parcelInfo.id
                  );

                  return (
                    <ParcelsTableRow
                      key={parcelInfo.id}
                      isCheckBoxNeeded={isCheckBoxNeeded}
                      parcelData={parcelInfo}
                      isAlrdyUploaded={isAlrdyUploaded}
                      onClick={() => {
                        if (isAlrdyUploaded) {
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
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[10, 20, 40]}
          component="div"
          count={currentParcelsData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        ></TablePagination>
      </CustomSection>
    </div>
  );
};

export default ParcelsTable;
