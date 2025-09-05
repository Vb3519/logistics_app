const prepareParcelToUnload = (url: string, parcelId: string) => {
  const parcelToUnloadData = {
    url: url,
    parcelId: parcelId,
  };

  return parcelToUnloadData;
};

export default prepareParcelToUnload;
