const prepareParcelToUpload = (url: string, parcelId: string) => {
  const parcelToUpload = {
    url: url,
    parcelId: parcelId,
  };

  return parcelToUpload;
};
export default prepareParcelToUpload;
