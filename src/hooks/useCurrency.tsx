import { useContext } from "react";

// Context
import { DataContext } from "../context/AppContext";

// Utils
import { getData } from "../utils/services/DolarToday";

const useCurrency = () => {
  const { usdValue, setUsdValue } = useContext(DataContext);

  const hanldeGetUSD = async () => {
    await getData()
      .then(({ promedio }: any) => {
        setUsdValue(promedio);
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  return {
    usdValue,
    hanldeGetUSD,
  };
};

export default useCurrency;
