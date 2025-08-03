const serverResponseImitation = async (responseTimer: number, msg?: string) => {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve('');
      msg && console.log(msg);
    }, responseTimer);
  });
};

export default serverResponseImitation;
