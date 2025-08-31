import { useSelector } from 'react-redux';

// React-icons:
import { LuClipboardList } from 'react-icons/lu';
import { BsBoxSeamFill } from 'react-icons/bs';
import { FaTruck } from 'react-icons/fa';
import { AiOutlineFileDone } from 'react-icons/ai';

// Ui:
import CustomSection from '../../../shared/ui/CustomSection';
import GeneralInfoCard from './GeneralInfoCard';

// State:
import { selectShipmentRequests } from '../../redux/slices/shipmentsSlice';
import { selectParcelsData } from '../../redux/slices/parcelsSlice';
import { selectShipmentsLogData } from '../../redux/slices/shipmentsLogSlice';

const GeneralInfo = () => {
  const shipmentRequestsData = useSelector(selectShipmentRequests);
  const parcelsData = useSelector(selectParcelsData);

  const shipmentsLogData = useSelector(selectShipmentsLogData);
  const shipmentsOnTheWay = shipmentsLogData.filter(
    (shipmentInfo) => shipmentInfo.shipment_status === 'В пути'
  );
  const completedShipments = shipmentsLogData.filter(
    (shipmentInfo) => shipmentInfo.shipment_status === 'Завершена'
  );

  return (
    <CustomSection className="bg-section_primary xs:mx-4 lg:col-span-2">
      <h2 className="font-semibold text-[#7B57DF] title-shadow text-sm xl:text-base">
        Общие данные
      </h2>

      <ul className="py-4 flex justify-between gap-4 text-sm overflow-x-auto md:gap-8 xl:text-base">
        <GeneralInfoCard
          card_title="Текущие заявки"
          value={shipmentRequestsData.length}
          icon={
            <LuClipboardList className="text-3xl text-amber-500/70 flex-shrink-0 md:text-4xl" />
          }
        />

        <GeneralInfoCard
          card_title="Собранные посылки"
          value={parcelsData.length}
          icon={
            <BsBoxSeamFill className="text-3xl text-red-900/70 flex-shrink-0 md:text-4xl" />
          }
        />

        <GeneralInfoCard
          card_title="Транспорт в пути"
          value={shipmentsOnTheWay.length}
          icon={
            <FaTruck className="text-3xl text-blue-400/70 flex-shrink-0 md:text-4xl" />
          }
        />

        <GeneralInfoCard
          card_title="Заказ доставлен"
          value={completedShipments.length}
          icon={
            <AiOutlineFileDone className="text-3xl text-green-600/70 flex-shrink-0 md:text-4xl" />
          }
        />
      </ul>
    </CustomSection>
  );
};

export default GeneralInfo;
