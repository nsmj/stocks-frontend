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

        <p style={{ textAlign: "left" }}>
          <Search />
        </p>

        {state.hasOwnProperty('profit_from_sales_below_20k') ?
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th></th>
                  <th className="text-start" scope="col" colSpan="3">Operações Comuns</th>
                  <th className="text-start" scope="col" colSpan="3">Day Trade</th>
                  <th className="text-start" scope="col" colSpan="3">FIIs</th>
                </tr>
                <tr>
                  <th></th>
                  <th className="text-end" scope="col">Total</th>
                  <th className="text-end" scope="col">Imposto Pago</th>
                  <th className="text-end" scope="col">IRRF</th>
                  <th className="text-end" scope="col">Total</th>
                  <th className="text-end" scope="col">Imposto Pago</th>
                  <th className="text-end" scope="col">IRRF</th>
                  <th className="text-end" scope="col">Total</th>
                  <th className="text-end" scope="col">Imposto Pago</th>
                  <th className="text-end" scope="col">IRRF</th>
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
            <EndYearPositions />
          </div>
          : <p>Sem registros a exibir</p>
        }
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

  return <input type="search" className="form-control" placeholder="Search by Year" onKeyDown={handleKeyDown} />
}

function IrpfMonth({ month }) {
  const { state, setState } = useContext(IrpfContext);

  return (
    <tr>
      <th scope="row">
        {months[month]}
      </th>
      <td className="text-end">{state.swing_trade?.find(i => i.month === month)?.value}</td>
      <td></td>
      <td className="text-end">{state.irrf?.find(i => i.month === month && i.trade_type === "Swing Trade")?.value}</td>
      <td className="text-end">{state.day_trade?.find(i => i.month === month)?.value}</td>
      <td></td>
      <td></td>
      <td className="text-end">{state.fiis?.find(i => i.month === month)?.value}</td>
      <td></td>
      <td className="text-end">{state.irrf?.find(i => i.month === month && i.trade_type === "FII")?.value}</td>
    </tr>
  );

}

const EndYearPositions = () => {
  const { state, setState } = useContext(IrpfContext);

  const handleClick = (texto) => {
    navigator.clipboard.writeText(texto);
  }

  return (
    <table className="table">
      <thead>
        <tr>
          <th colSpan={3}>Posições Ano Anterior</th>
        </tr>
        <tr>
          <th scope="col">Código</th>
          <th scope="col">Texto</th>
          <th scope="col">Ação</th>
        </tr>
      </thead>
      <tbody>
        {state.end_year_positions.map((eep, index) => (
          <tr key={index}>
            <td>{eep.code}</td>
            <td className="text-start">{eep.text}</td>
            <td onClick={() => handleClick(eep.text)}>Copiar</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Irpf;