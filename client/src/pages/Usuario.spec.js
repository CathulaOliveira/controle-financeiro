import { fireEvent, render, waitForElementToBeRemoved } from "@testing-library/react";
import Usuario from "./Usuario";

describe('Usuario', () => {

    describe('Layout', () => {
        it('título igual a Usuário', () => {
            const { container } = render(<Usuario />);
            const header = container.querySelector('h1');
            expect(header).toHaveTextContent('Usuário');
        });

        it('input para informar o nome', () => {
            const { queryByPlaceholderText } = render(<Usuario />);
            const nomeInput = queryByPlaceholderText('Informe o seu nome');
            expect(nomeInput).toBeInTheDocument();
        });
        it('input para informar o email', () => {
            const { queryByPlaceholderText } = render(<Usuario />);
            const emailInput = queryByPlaceholderText('Informe o email');
            expect(emailInput).toBeInTheDocument();
        });
        it('input para informar a senha', () => {
            const { queryByPlaceholderText } = render(<Usuario />);
            const senhaInput = queryByPlaceholderText('Informe a sua senha');
            expect(senhaInput).toBeInTheDocument();
        });
        it('type do input senha igual a password', () => {
            const { queryByPlaceholderText } = render(<Usuario />);
            const senhaInput = queryByPlaceholderText('Informe a sua senha');
            expect(senhaInput.type).toBe('password');
        });

        it('input para informar a confirmação de senha', () => {
            const { queryByPlaceholderText } = render(<Usuario />);
            const confirmarSenhaInput = queryByPlaceholderText('Confirme sua senha');
            expect(confirmarSenhaInput).toBeInTheDocument();
        });
        it('type do input confirmar senha igual a password', () => {
            const { queryByPlaceholderText } = render(<Usuario />);
            const confirmarSenhaInput = queryByPlaceholderText('Confirme sua senha');
            expect(confirmarSenhaInput.type).toBe('password');
        });

        it('botão submit', () => {
            const { container } = render(<Usuario />);
            const header = container.querySelector('button');
            expect(header).toBeInTheDocument();
        });
    });
    describe('Interactions', () => {
        const changeEvent = (content) => {
            return {
                target: {
                    value: content,
                },
            }
        };
        const mockAsyncDelayed = () => {
            return jest.fn().mockImplementation(() => {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve({});
                    }, 500);
                });
            });
        }

        const mockAsyncDelayedRejected = () => {
            return jest.fn().mockImplementation(() => {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        reject({
                            response: { data: {} }
                        });
                    }, 500);
                });
            });
        }

        let nomeInput, emailInput, senhaInput, repeatPasswordInput, button;
        const setupForSubmit = (props) => {
            const rendered = render(<Usuario {...props} />)

            const { container, queryByPlaceholderText } = rendered;

            nomeInput = queryByPlaceholderText('Informe o seu nome');
            emailInput = queryByPlaceholderText('Informe o email');
            senhaInput = queryByPlaceholderText('Informe a sua senha');
            repeatPasswordInput = queryByPlaceholderText('Confirme sua senha');

            fireEvent.change(nomeInput, changeEvent('teste'));
            fireEvent.change(emailInput, changeEvent('teste@teste.com'));
            fireEvent.change(senhaInput, changeEvent('Teste@123'));
            fireEvent.change(repeatPasswordInput, changeEvent('Teste@123'));

            button = container.querySelector('button');

            return rendered;
        }

        it('sets the nome value into state', () => {
            const { queryByPlaceholderText } = render(<Usuario />);
            const nomeInput = queryByPlaceholderText('Informe o seu nome');
            fireEvent.change(nomeInput, changeEvent('teste'));
            expect(nomeInput).toHaveValue('teste');
        });

        it('sets the email value into state', () => {
            const { queryByPlaceholderText } = render(<Usuario />);
            const emailInput = queryByPlaceholderText('Informe o email');
            fireEvent.change(emailInput, changeEvent('teste@teste.com'));
            expect(emailInput).toHaveValue('teste@teste.com');
        });

        it('sets the senha value into state', () => {
            const { queryByPlaceholderText } = render(<Usuario />);
            const senhaInput = queryByPlaceholderText('Informe a sua senha');
            fireEvent.change(senhaInput, changeEvent('Teste@123'));
            expect(senhaInput).toHaveValue('Teste@123');
        });
        it('sets the senha repeat value into state', () => {
            const { queryByPlaceholderText } = render(<Usuario />);
            const confirmarSenhaInput = queryByPlaceholderText('Confirme sua senha');
            fireEvent.change(confirmarSenhaInput, changeEvent('Teste@123'));
            expect(confirmarSenhaInput).toHaveValue('Teste@123');
        });

        it('chama postUsuario quando os campos são válidos', () => {
            const actions = {
                postUsuario: jest.fn().mockResolvedValueOnce({}),
            }
            setupForSubmit({ actions });
            fireEvent.click(button);
            expect(actions.postUsuario).toHaveBeenCalledTimes(1);
        });

        it('does not throw exception when clicking the button and actions are not provided in props', () => {
            setupForSubmit();
            expect(() => fireEvent.click(button)).not.toThrow();
        });

        it('calls post with user body when the fields are valid', () => {
            const actions = {
                postUsuario: jest.fn().mockResolvedValueOnce({}),
            }
            setupForSubmit({ actions });
            fireEvent.click(button);

            const expectedUserObject = {
                nome: 'teste',
                email: 'teste@teste.com',
                senha: 'Teste@123',
            }
            expect(actions.postUsuario).toHaveBeenCalledWith(expectedUserObject);
        });

        it('does not allow user to click the Signup button when there is an outgoing api call', () => {
            const actions = {
                postUsuario: mockAsyncDelayed(),
            }
            setupForSubmit({ actions });
            fireEvent.click(button);
            fireEvent.click(button);
            expect(actions.postUsuario).toHaveBeenCalledTimes(1);
        });

        it('exibe o spinner quando há uma chamada de API em andamento', () => {
            const actions = {
                postUsuario: mockAsyncDelayed(),
            }
            const { queryByText } = setupForSubmit({ actions });
            fireEvent.click(button);

            const spinner = queryByText('Aguarde...');
            expect(spinner).toBeInTheDocument();
        });

        it('oculta o spinner após a conclusão da chamada da API', async () => {
            const actions = {
                postUsuario: mockAsyncDelayed(),
            }
            const { queryByText } = setupForSubmit({ actions });
            fireEvent.click(button);

            const spinner = queryByText('Aguarde...');
            await waitForElementToBeRemoved(spinner);

            expect(spinner).not.toBeInTheDocument();
        });

        it('oculta o spinner após a chamada da API terminar com erro', async () => {
            const actions = {
                postUsuario: mockAsyncDelayedRejected(),
            }
            const { queryByText } = setupForSubmit({ actions });
            fireEvent.click(button);

            const spinner = queryByText('Aguarde...');
            await waitForElementToBeRemoved(spinner);

            expect(spinner).not.toBeInTheDocument();
        });

        it('exibe erro de validação para nome', async () => {
            const actions = {
                postUsuario: jest.fn().mockRejectedValue({
                    response : {
                        data: {
                            validationErrors: {
                                nome: "Cannot be null"
                            },
                        },
                    },
                }),
            };
            const { findByText } = setupForSubmit({ actions });
            fireEvent.click(button);

            const errorMessage = await findByText('Cannot be null');
            
            expect(errorMessage).toBeInTheDocument();
        });


    });
});
console.error = () => { };