import React from 'react';
import {
  render,
  fireEvent,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { LoginPage } from './LoginPage';

describe('LoginPage', () => {
  describe('Layout', () => {
    it('has header of Login', () => {
      const { container } = render(<LoginPage />);
      const header = container.querySelector('h1');
      expect(header).toHaveTextContent('Login');
    });

    it('has input for email', () => {
      const { queryByPlaceholderText } = render(<LoginPage />);
      const emailInput = queryByPlaceholderText('Your email');
      expect(emailInput).toBeInTheDocument();
    });

    it('has input for senha', () => {
      const { queryByPlaceholderText } = render(<LoginPage />);
      const senhaInput = queryByPlaceholderText('Your senha');
      expect(senhaInput).toBeInTheDocument();
    });

    it('has password type for password input', () => {
      const { queryByPlaceholderText } = render(<LoginPage />);
      const senhaInput = queryByPlaceholderText('Your senha');
      expect(senhaInput.type).toBe('password');
    });
    it('has login button', () => {
      const { container } = render(<LoginPage />);
      const button = container.querySelector('button');
      expect(button).toBeInTheDocument();
    });
  });
  describe('Interactions', () => {
    const changeEvent = (content) => {
      return {
        target: {
          value: content,
        },
      };
    };
    const mockAsyncDelayed = () => {
      return jest.fn().mockImplementation(() => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve({});
          }, 300);
        });
      });
    };
    let emailInput, senhaInput, button;

    const setupForSubmit = (props) => {
      const rendered = render(<LoginPage {...props} />);
      const { container, queryByPlaceholderText } = rendered;

      emailInput = queryByPlaceholderText('Your email');
      fireEvent.change(emailInput, changeEvent('my-user-name'));
      senhaInput = queryByPlaceholderText('Your senha');
      fireEvent.change(senhaInput, changeEvent('Teste@123'));
      button = container.querySelector('button');
      return rendered;
    };

    it('sets the email value into state', () => {
      const { queryByPlaceholderText } = render(<LoginPage />);
      const emailInput = queryByPlaceholderText('Your email');
      fireEvent.change(emailInput, changeEvent('my-user-name'));
      expect(emailInput).toHaveValue('my-user-name');
    });
    it('sets the senha value into state', () => {
      const { queryByPlaceholderText } = render(<LoginPage />);
      const senhaInput = queryByPlaceholderText('Your senha');
      fireEvent.change(senhaInput, changeEvent('Teste@123'));
      expect(senhaInput).toHaveValue('Teste@123');
    });
    it('calls postLogin when the actions are provided in props and input fields have value', () => {
      const actions = {
        postLogin: jest.fn().mockResolvedValue({}),
      };
      setupForSubmit({ actions });
      fireEvent.click(button);
      expect(actions.postLogin).toHaveBeenCalledTimes(1);
    });
    it('does not throw exception when clicking the button when actions not provided in props', () => {
      setupForSubmit();
      expect(() => fireEvent.click(button)).not.toThrow();
    });

    it('calls postLogin with credentials in body', () => {
      const actions = {
        postLogin: jest.fn().mockResolvedValue({}),
      };
      setupForSubmit({ actions });
      fireEvent.click(button);

      const expectedUserObject = {
        email: 'my-user-name',
        senha: 'Teste@123',
      };

      expect(actions.postLogin).toHaveBeenCalledWith(expectedUserObject);
    });

    it('enables the button when email and senha is not empty', () => {
      setupForSubmit();
      expect(button).not.toBeDisabled();
    });
    it('disables the button when email is empty', () => {
      setupForSubmit();
      fireEvent.change(emailInput, changeEvent(''));
      expect(button).toBeDisabled();
    });
    it('disables the button when senha is empty', () => {
      setupForSubmit();
      fireEvent.change(senhaInput, changeEvent(''));
      expect(button).toBeDisabled();
    });
    it('displays alert when login fails', async () => {
      const actions = {
        postLogin: jest.fn().mockRejectedValue({
          response: {
            data: {
              message: 'Login failed',
            },
          },
        }),
      };
      const { findByText } = setupForSubmit({ actions });
      fireEvent.click(button);

      const alert = await findByText('Login failed');
      expect(alert).toBeInTheDocument();
    });
    it('clears alert when user changes email', async () => {
      const actions = {
        postLogin: jest.fn().mockRejectedValue({
          response: {
            data: {
              message: 'Login failed',
            },
          },
        }),
      };
      const { findByText } = setupForSubmit({ actions });
      fireEvent.click(button);

      const alert = await findByText('Login failed');
      fireEvent.change(emailInput, changeEvent('updated-email'));

      expect(alert).not.toBeInTheDocument();
    });
    it('clears alert when user changes senha', async () => {
      const actions = {
        postLogin: jest.fn().mockRejectedValue({
          response: {
            data: {
              message: 'Login failed',
            },
          },
        }),
      };
      const { findByText } = setupForSubmit({ actions });
      fireEvent.click(button);
      const alert = await findByText('Login failed');
      fireEvent.change(senhaInput, changeEvent('updated-Teste@123'));
      expect(alert).not.toBeInTheDocument();
    });

    it('does not allow user to click the Login button when there is an ongoing api call', () => {
      const actions = {
        postLogin: mockAsyncDelayed(),
      };
      setupForSubmit({ actions });
      fireEvent.click(button);

      fireEvent.click(button);
      expect(actions.postLogin).toHaveBeenCalledTimes(1);
    });

    it('displays spinner when there is an ongoing api call', () => {
      const actions = {
        postLogin: mockAsyncDelayed(),
      };
      const { queryByText } = setupForSubmit({ actions });
      fireEvent.click(button);

      const spinner = queryByText('Aguarde...');
      expect(spinner).toBeInTheDocument();
    });

    it('hides spinner after api call finishes successfully', async () => {
      const actions = {
        postLogin: mockAsyncDelayed(),
      };
      const { queryByText } = setupForSubmit({ actions });
      fireEvent.click(button);

      const spinner = queryByText('Aguarde...');
      await waitForElementToBeRemoved(spinner);
      expect(spinner).not.toBeInTheDocument();
    });
    it('hides spinner after api call finishes with error', async () => {
      const actions = {
        postLogin: jest.fn().mockImplementation(() => {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              reject({
                response: { data: {} },
              });
            }, 300);
          });
        }),
      };
      const { queryByText } = setupForSubmit({ actions });
      fireEvent.click(button);

      const spinner = queryByText('Aguarde...');
      await waitForElementToBeRemoved(spinner);
      expect(spinner).not.toBeInTheDocument();
    });    
  });
});

console.error = () => {};
