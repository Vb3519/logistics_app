import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Types:
import { Parcel } from '../../../types/parcels.interface';
import { ShipmentStatus } from '../../../types/shipments.interface';

// Utils:
import serverResponseImitation from '../../../shared/utils/serverResponseImitation';

// State:
import { addShipmentToLog } from '../../redux/slices/shipmentsLogSlice';

const approveShipmentRequest = createAsyncThunk(
  'shipments/approveShipmentRequest',
  async (
    payload: {
      id: string;
      url: string;
      shipment_parcels: Parcel[];
      current_load_value: number;
      shipment_status: ShipmentStatus;
      is_shipment_status_set: boolean;
    },
    thunkApi
  ) => {
    try {
      await serverResponseImitation(2000);

      const {
        id,
        url,
        shipment_parcels,
        current_load_value,
        shipment_status,
        is_shipment_status_set,
      } = payload;

      const approveShipmentRequestResponse: Response = await fetch(
        `${url}/${id}`,
        {
          method: 'PATCH',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify({
            shipment_parcels: shipment_parcels,
            current_load_value: current_load_value,
            shipment_status: shipment_status,
            is_shipment_status_set: is_shipment_status_set,
          }),
        }
      );

      if (approveShipmentRequestResponse.ok) {
        const approvedShipmentRequest =
          await approveShipmentRequestResponse.json();
        console.log(
          'Подвержденная заявка на отгрузку:',
          approvedShipmentRequest
        );

        thunkApi.dispatch(addShipmentToLog(approvedShipmentRequest));

        return approvedShipmentRequest;
      } else {
        const errorMsg: string = `HTTP Error: ${approveShipmentRequestResponse.status} ${approveShipmentRequestResponse.statusText}`;
        console.log(errorMsg);

        return thunkApi.rejectWithValue(errorMsg);
      }
    } catch (error: unknown) {
      const errorMsg: string = `Error: ${(error as Error).message}`;
      console.log(errorMsg);

      return thunkApi.rejectWithValue(errorMsg);
    }
  }
);

export default approveShipmentRequest;
