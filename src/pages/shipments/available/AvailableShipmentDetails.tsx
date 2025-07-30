import { useParams, NavLink } from 'react-router-dom';

// Ui:
import CustomSection from '../../../shared/ui/CustomSection';

const AvailableShipmentDetails = () => {
  const params = useParams();
  const { id } = params;

  return (
    <main className="h-full flex flex-col items-center gap-4 xs:mx-4 lg:mx-0 lg:px-4">
      <CustomSection className="min-h-screen w-full p-2 flex flex-col bg-white container-shadow xs:rounded-md lg:min-h-0 lg:h-full">
        <NavLink to="/shipments/available" className="text-[#7B57DF]">
          Назад
        </NavLink>
        <h1>Детали заявки: {id}</h1>
      </CustomSection>
    </main>
  );
};

export default AvailableShipmentDetails;
