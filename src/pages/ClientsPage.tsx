// Не указывай у main высоту min-h-screen, делай ее у контента
const ClientsPage = () => {
  return (
    <main className="h-full min-h-screen flex flex-col items-center justify-center gap-4 lg:min-h-0 lg:grid lg:grid-cols-2 lg:px-4">
      <h1 className="col-span-2 text-center">Страница Клиентов компании</h1>
    </main>
  );
};

export default ClientsPage;
