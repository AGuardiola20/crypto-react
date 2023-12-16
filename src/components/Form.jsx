import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import useSelectCoin from "../hooks/useSelectCoin";
import { coins } from "../data/coins";
import Error from "./Error";

const InputSubmit = styled.input`
  background-color: #9497ff;
  border: none;
  width: 100%;
  padding: 10px;
  color: #fff;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 20px;
  border-radius: 5px;
  transition: background-color 0.3s;
  margin-top: 30px;

  &:hover {
    background-color: #7a7dfe;
    cursor: pointer;
  }
`;

const Form = ({ setMonedas }) => {
  // Validar Form
  const [error, setError] = useState(false);

  // Consulta a API
  const [cryptos, setCrypto] = useState([]);



  useEffect(() => {
    const consultAPI = async () => {
      const url =
        "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";

      const response = await fetch(url);
      const getApi = await response.json();

      const arrayCrypto = getApi.Data.map((crypto) => {
        const cryptoObj = {
          id: crypto.CoinInfo.Name,
          name: crypto.CoinInfo.FullName,
        };
        return cryptoObj;
      });
      setCrypto(arrayCrypto);
    };
    consultAPI();
  }, []);

  // Hook para reutilizar el select
  const [coin, SelectCoins] = useSelectCoin(
    "Elige tu moneda",
    coins,
    "----  Seleccione una moneda  ----"
  );

  const [criptomoneda, SelectCrypto] = useSelectCoin(
    "Elige una criptomoneda",
    cryptos,
    "----  Seleccione una criptomoneda  ----"
  );
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if ([coin, criptomoneda].includes("")) {
      setError(true);
      return;
    }
    setError(false);
    setMonedas({
      coin,
      criptomoneda,
    });
  };

  return (
    <>
      {error && <Error>Todos los campos son obligatorios</Error>}
      <form onSubmit={handleSubmit}>
        <SelectCoins />
        <SelectCrypto />

        <InputSubmit type="submit" value="Cotizar" />
      </form>
    </>
  );
};

export default Form;
