import { Component } from "react";
import './styles.css';

class Irpf extends Component {

  state = {};

  loadData = async (year) => {
    const data = await fetch('http://localhost:3000/irpf/' + year);
    return data.json();
  }

  handleKeyDown = async (event) => {
    if (event.key === 'Enter') {
      this.setState(await this.loadData(event.target.value));
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
            <tr>
              <th>
                Janeiro
              </th>
              <td>{this.state.swing_trade?.find(i => i.month === "01")?.value}</td>
              <td></td>
              <td></td>
              <td>{this.state.day_trade?.find(i => i.month === "01")?.value}</td>
              <td></td>
              <td></td>
              <td>{this.state.fiis?.find(i => i.month === "01")?.value}</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <th>
                Fevereiro
              </th>
              <td>{this.state.swing_trade?.find(i => i.month === "02")?.value}</td>
              <td></td>
              <td></td>
              <td>{this.state.day_trade?.find(i => i.month === "02")?.value}</td>
              <td></td>
              <td></td>
              <td>{this.state.fiis?.find(i => i.month === "02")?.value}</td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div >
    )
  }
};

export default Irpf;