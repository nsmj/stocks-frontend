import { useContext, useState, createContext } from "react";


import './styles.css';

var months = {
  '01': 'Janeiro',
  '02': 'Fevereiro',
  '03': 'Março',
  '04': 'Abril',
  '05': 'Maio',
  '06': 'Junho',
  '07': 'Julho',
  '08': 'Agosto',
  '09': 'Setembro',
  '10': 'Outubro',
  '11': 'Novembro',
  '12': 'Dezembro'
}

const IrpfContext = createContext();

export const Irpf = () => {

  const [state, setState] = useState({});

  return (
    <>
      <IrpfContext.Provider value={{ state, setState }}>

        <Search />

        <p style={{ textAlign: "left" }}>

        </p>

        <table>
          <thead>
            <tr>
              <th></th>
              <th colSpan="3">Operações Comuns</th>
              <th colSpan="3">Day Trade</th>
              <th colSpan="3">FIIs</th>
            </tr>
            <tr>
              <th></th>
              <th>Total</th>
              <th>Imposto Pago</th>
              <th>IRRF</th>
              <th>Total</th>
              <th>Imposto Pago</th>
              <th>IRRF</th>
              <th>Total</th>
              <th>Imposto Pago</th>
              <th>IRRF</th>
            </tr>
          </thead>
          <tbody>
            <IrpfMonth month="01" />
            <IrpfMonth month="02" />
            <IrpfMonth month="03" />
            <IrpfMonth month="04" />
            <IrpfMonth month="05" />
            <IrpfMonth month="06" />
            <IrpfMonth month="07" />
            <IrpfMonth month="08" />
            <IrpfMonth month="09" />
            <IrpfMonth month="10" />
            <IrpfMonth month="11" />
            <IrpfMonth month="12" />
          </tbody>
        </table>
      </IrpfContext.Provider>
    </>
  );
}

function Search() {

  const { state, setState } = useContext(IrpfContext);

  const loadData = (year) => {
    return fetch('http://localhost:3000/irpf/' + year)
      .then(data => data.json());
  };

  const handleKeyDown = async (event) => {

    if (event.key === 'Enter') {
      let data = await loadData(event.target.value);
      setState(data);
    }
  };

  return <input type="search" placeholder="Search by Year" onKeyDown={handleKeyDown} />
}

function IrpfMonth({ month }) {
  const { state, setState } = useContext(IrpfContext);

  return (
    <tr>
      <th>
        {months[month]}
      </th>
      <td>{state.swing_trade?.find(i => i.month === month)?.value}</td>
      <td></td>
      <td>{state.irrf?.find(i => i.month === month && i.trade_type === "Swing Trade")?.value}</td>
      <td>{state.day_trade?.find(i => i.month === month)?.value}</td>
      <td></td>
      <td></td>
      <td>{state.fiis?.find(i => i.month === month)?.value}</td>
      <td></td>
      <td>{state.irrf?.find(i => i.month === month && i.trade_type === "FII")?.value}</td>
    </tr>
  );

}

export default Irpf;