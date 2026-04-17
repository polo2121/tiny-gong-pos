export const dummyLog = {
  show: (message: string, data: any, type: string = "back") => {
    if (type === "back") {
      console.log("==================================");
      console.log("                                  ");
      console.error(message);
      console.error("---------------------------------");
      console.error("Data:", data);
      console.log("                                  ");
      console.log("==================================");
    } else {
      console.log("                                               ");
      console.log("-",message, "             ");
      console.log("-",data, "                ");
      console.log("                                               ");
    }
  },
};
