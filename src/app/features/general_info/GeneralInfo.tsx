// React-icons:
import { LuClipboardList } from 'react-icons/lu';
import { BsBoxSeamFill } from 'react-icons/bs';
import { FaTruck } from 'react-icons/fa';
import { AiOutlineFileDone } from 'react-icons/ai';

// Ui:
import CustomSection from '../../../shared/ui/CustomSection';
import GeneralInfoCard from './GeneralInfoCard';

const GeneralInfo = () => {
  return (
    <CustomSection className="bg-section_primary xs:mx-4 lg:col-span-2">
      <h2 className="font-semibold lg:text-lg">Общие данные</h2>

      <ul className="py-4 flex justify-between gap-4 text-sm overflow-x-auto md:gap-8 lg:text-base">
        <GeneralInfoCard
          card_title="Новые заказы"
          value="5"
          icon={
            <LuClipboardList className="text-3xl text-amber-500/70 flex-shrink-0 md:text-4xl" />
          }
        />

        <GeneralInfoCard
          card_title="Готовы к отгрузке"
          value="2"
          icon={
            <BsBoxSeamFill className="text-3xl text-red-900/70 flex-shrink-0 md:text-4xl" />
          }
        />

        <GeneralInfoCard
          card_title="В пути"
          value="8"
          icon={
            <FaTruck className="text-3xl text-blue-400/70 flex-shrink-0 md:text-4xl" />
          }
        />

        <GeneralInfoCard
          card_title="Доставлены"
          value="12"
          icon={
            <AiOutlineFileDone className="text-3xl text-green-600/70 flex-shrink-0 md:text-4xl" />
          }
        />
      </ul>
    </CustomSection>
  );
};

export default GeneralInfo;
