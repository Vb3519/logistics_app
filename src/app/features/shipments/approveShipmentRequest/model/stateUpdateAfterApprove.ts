// Types:
import { AppDispatch } from 'app/redux/store';

// State:
import { updateShipmentRequestsByStatus } from 'app/redux/slices/shipmentsSlice';
import { updateParcelsByIsAttached } from 'app/redux/slices/parcelsSlice';
import { setShipmentStatus } from 'app/redux/slices/shipmentStatusSlice';

const stateUpdateAfterApprove = (dispatch: AppDispatch) => {
  dispatch(updateShipmentRequestsByStatus(''));
  dispatch(updateParcelsByIsAttached(false));
  dispatch(setShipmentStatus(''));
};

export default stateUpdateAfterApprove;
