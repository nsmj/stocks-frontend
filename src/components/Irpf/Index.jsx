import { Component } from "react";
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

class Irpf extends Component {

  state = {};

  loadData = async (year) => {
    const data = await fetch('http://localhost:3000/irpf/' + year);
    return data.json();
  }

  handleKeyDown = async (event) => {
    if (event.key === 'Enter') {
      let data = await this.loadData(event.target.value);
      this.setState(data);
    }
  }

  render() {
    return (
      <div>
        <input type="search" placeholder="Search by Year" onKeyDown={this.handleKeyDown} />

        <p style={{ textAlign: "left" }}>
          Lucro com vendas abaixo de 20 mil reais: {this.state.profit_from_sales_below_20k}
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
            <IrpfMonth month="01" data={this.state} />
            <IrpfMonth month="02" data={this.state} />
            <IrpfMonth month="03" data={this.state} />
            <IrpfMonth month="04" data={this.state} />
            <IrpfMonth month="05" data={this.state} />
            <IrpfMonth month="06" data={this.state} />
            <IrpfMonth month="07" data={this.state} />
            <IrpfMonth month="08" data={this.state} />
            <IrpfMonth month="09" data={this.state} />
            <IrpfMonth month="10" data={this.state} />
            <IrpfMonth month="11" data={this.state} />
            <IrpfMonth month="12" data={this.state} />
          </tbody>
        </table>
      </div >
    )
  }
}

function IrpfMonth({ month, data }) {

  return (
    <tr>
      <th>
        {months[month]}
      </th>
      <td>{data.swing_trade?.find(i => i.month === month)?.value}</td>
      <td></td>
      <td>{data.irrf?.find(i => i.month === month && i.trade_type === "Swing Trade")?.value}</td>
      <td>{data.day_trade?.find(i => i.month === month)?.value}</td>
      <td></td>
      <td></td>
      <td>{data.fiis?.find(i => i.month === month)?.value}</td>
      <td></td>
      <td>{data.irrf?.find(i => i.month === month && i.trade_type === "FII")?.value}</td>
    </tr>
  );

}


export default Irpf;