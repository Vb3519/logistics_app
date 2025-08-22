// Ui:
import ParcelsToUpload from '../containers/ParcelsToUpload';
import ShipmentParcelsTable from '../containers/ShipmentParcelsTable';

const ParcelsToUploadSection = () => {
  return (
    <div className="w-full flex flex-col gap-4 lg:basis-3/5">
      {/* Данные о количестве и весе выбранных посылок для добавления их в непроведенную заявку на отгрузку: */}
      <ParcelsToUpload />

      {/* Таблица с общими данными о всех посылках: */}
      <ShipmentParcelsTable />
    </div>
  );
};

export default ParcelsToUploadSection;
