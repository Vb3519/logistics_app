import CustomSection from '../shared/ui/CustomSection';
// Корректно: h-full w-full p-2 bg-white container-shadow xs:rounded-md
const ShipmentsPage = () => {
  return (
    <main className="h-full flex flex-col items-center gap-4 xs:mx-4 lg:mx-0 lg:px-4">
      <div className="p-2 mr-auto flex items-center gap-2 flex-wrap text-sm">
        <h1 className="font-semibold text-base lg:text-lg">Отгрузки</h1>
        <ul className="flex items-center gap-2 flex-wrap leading-4">
          <li className="p-2 rounded-sm bg-[#7B57DF] text-white">
            Завершены <span>(10)</span>
          </li>
          <li className="p-2 rounded-sm bg-[#7B57DF] text-white">
            Доступно <span>(3)</span>
          </li>
        </ul>
      </div>

      <CustomSection className="h-full w-full p-2 bg-white container-shadow xs:rounded-md">
        <table className="h-full min-h-screen w-full text-sm text-center leading-4 lg:min-h-0 lg:text-base">
          <thead className="bg-gray-200 text-gray-500">
            <tr>
              <th className="px-1 py-2 rounded-l-sm sm:p-3">Адрес доставки</th>
              <th className="px-1 py-2 sm:p-3">Номер заказа</th>
              <th className="px-1 py-2 rounded-r-sm xs:rounded-r-none sm:p-3">
                Автомобиль
              </th>
              <th className="hidden px-1 py-2 xs:table-cell sm:p-3">
                Общий вес, кг
              </th>
              <th className="hidden px-1 py-2 rounded-r-sm xs:table-cell sm:p-3">
                Статус
              </th>
            </tr>
          </thead>
          <tbody>
            <ShipmentsTableElem
              destination="Санкт-Петербург - Москва"
              shipment_number="В435324"
              truck_number="Iveco 80E12"
              total_weight="400"
              status="В пути"
            />

            <ShipmentsTableElem
              destination="Санкт-Петербург - Москва"
              shipment_number="В435324"
              truck_number="Iveco 80E12"
              total_weight="400"
              status="В пути"
            />

            <ShipmentsTableElem
              destination="Санкт-Петербург - Москва"
              shipment_number="В435324"
              truck_number="Iveco 80E12"
              total_weight="400"
              status="В пути"
            />

            <ShipmentsTableElem
              destination="Санкт-Петербург - Москва"
              shipment_number="В435324"
              truck_number="Iveco 80E12"
              total_weight="400"
              status="В пути"
            />

            <ShipmentsTableElem
              destination="Санкт-Петербург - Москва"
              shipment_number="В435324"
              truck_number="Iveco 80E12"
              total_weight="400"
              status="В пути"
            />

            <ShipmentsTableElem
              destination="Санкт-Петербург - Москва"
              shipment_number="В435324"
              truck_number="Iveco 80E12"
              total_weight="400"
              status="В пути"
            />

            <ShipmentsTableElem
              destination="Санкт-Петербург - Москва"
              shipment_number="В435324"
              truck_number="Iveco 80E12"
              total_weight="400"
              status="В пути"
            />

            <ShipmentsTableElem
              destination="Санкт-Петербург - Москва"
              shipment_number="В435324"
              truck_number="Iveco 80E12"
              total_weight="400"
              status="В пути"
            />

            <ShipmentsTableElem
              destination="Санкт-Петербург - Москва"
              shipment_number="В435324"
              truck_number="Iveco 80E12"
              total_weight="400"
              status="В пути"
            />

            <ShipmentsTableElem
              destination="Санкт-Петербург - Москва"
              shipment_number="В435324"
              truck_number="Iveco 80E12"
              total_weight="400"
              status="В пути"
            />

            <ShipmentsTableElem
              destination="Санкт-Петербург - Москва"
              shipment_number="В435324"
              truck_number="Iveco 80E12"
              total_weight="400"
              status="В пути"
            />

            <ShipmentsTableElem
              destination="Санкт-Петербург - Москва"
              shipment_number="В435324"
              truck_number="Iveco 80E12"
              total_weight="400"
              status="В пути"
            />
          </tbody>
        </table>
      </CustomSection>
    </main>
  );
};

export default ShipmentsPage;

interface ShipmentsTableElem_Props
  extends React.HTMLAttributes<HTMLTableRowElement> {
  destination: string;
  shipment_number: string;
  truck_number: string;
  total_weight: string;
  status: 'В пути' | 'Завершен' | 'Опаздывает';
}

const ShipmentsTableElem: React.FC<ShipmentsTableElem_Props> = ({
  destination,
  shipment_number,
  truck_number,
  total_weight,
  status,
  ...props
}) => {
  return (
    <tr {...props} className="border-b-2 border-b-gray-300">
      <td className="px-1 py-2">{destination}</td>
      <td className="px-1 py-2">{shipment_number}</td>
      <td className="px-1 py-2">{truck_number}</td>
      <td className="hidden px-1 py-2 xs:table-cell">{total_weight}</td>
      <td className="hidden px-1 py-2 xs:table-cell">{status}</td>
    </tr>
  );
};
