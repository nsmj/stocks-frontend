import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Irpf, IrpfMonth } from './Index';
import irpfMock from './mock'

const handlers = [
  rest.get('http://localhost:3000/irpf/:year', async (req, res, ctx) => {
    return res(ctx.json(irpfMock))
  })
];

const server = setupServer(...handlers);

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

  describe('when user filter by year 2021', () => {

    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    beforeEach(async () => {
      const msg = screen.getByText('Sem registros a exibir');

      userEvent.type(filter, '2021');
      userEvent.keyboard('{Enter}');

      await waitForElementToBeRemoved(msg);
    });

    it('should show correctly data fetched from backed', async () => {

      screen.debug();
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

  });

});