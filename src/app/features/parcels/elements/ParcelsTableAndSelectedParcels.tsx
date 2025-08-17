// Ui:
import ParcelsToUpload from '../containers/ParcelsToUpload';
import ParcelsTable from '../containers/ParcelsTable';

const ParcelsTableAndSelectedParcels = () => {
  return (
    <div className="w-full flex flex-col gap-4 lg:basis-3/5">
      {/* Данные о количестве и весе выбранных посылок для добавления их в непроведенную заявку на отгрузку: */}
      <ParcelsToUpload />

      {/* Таблица с общими данными о всех посылках: */}
      <ParcelsTable isCheckBoxNeeded={true} />
    </div>
  );
};

export default ParcelsTableAndSelectedParcels;
