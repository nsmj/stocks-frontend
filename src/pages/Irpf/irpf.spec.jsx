import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Irpf, IrpfMonth } from './Index';
import irpfMock from './mock'

describe('<Irpf />', () => {

  let filter = null;

  beforeEach(() => {
    const { debug } = render(<Irpf />);
    filter = screen.getByPlaceholderText('Search by Year');
  });

  it('should render year filter', () => {

    const filter = screen.getByPlaceholderText('Search by Year');

    expect(filter).toBeInTheDocument();

  });

  it('should show 12 IrpfMonth components', () => {

    screen.getByText('Janeiro');
    screen.getByText('Fevereiro');
    screen.getByText('Março');
    screen.getByText('Abril');
    screen.getByText('Maio');
    screen.getByText('Junho');
    screen.getByText('Julho');
    screen.getByText('Agosto');
    screen.getByText('Setembro');
    screen.getByText('Outubro');
    screen.getByText('Novembro');
    screen.getByText('Dezembro');
  });

  describe('when user filter by year 2021', () => {

    beforeEach(() => {
      userEvent.type(filter, '2021');
      userEvent.keyboard('{Enter}');
    });

    it('should show correctly data fetched from backed', () => {

    });

  });

});