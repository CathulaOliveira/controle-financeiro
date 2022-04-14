import { fireEvent, render, waitForElementToBeRemoved } from "@testing-library/react";
import UserSignupPage from "./UserSignupPage";

describe('UserSignupPage', () => {

    describe('Layout', () => {
        it('has header of Sign Up', () => {
            const { container } = render(<UserSignupPage />);
            const header = container.querySelector('h1');
            expect(header).toHaveTextContent('Sign Up');
        });

        it('has input for name', () => {
            const { queryByPlaceholderText } = render(<UserSignupPage />);
            const nomeInput = queryByPlaceholderText('Informe o seu nome');
            expect(nomeInput).toBeInTheDocument();
        });
        it('has input for email', () => {
            const { queryByPlaceholderText } = render(<UserSignupPage />);
            const emailInput = queryByPlaceholderText('Informe o seu email');
            expect(emailInput).toBeInTheDocument();
        });
        it('has input for password', () => {
            const { queryByPlaceholderText } = render(<UserSignupPage />);
            const senhaInput = queryByPlaceholderText('Informe a sua senha');
            expect(senhaInput).toBeInTheDocument();
        });
        it('has senha type for password repeat', () => {
            const { queryByPlaceholderText } = render(<UserSignupPage />);
            const senhaInput = queryByPlaceholderText('Informe a sua senha');
            expect(senhaInput.type).toBe('password');
        });

        it('has input for password repeat', () => {
            const { queryByPlaceholderText } = render(<UserSignupPage />);
            const confirmaSenhaInput = queryByPlaceholderText('Confirme sua senha');
            expect(confirmaSenhaInput).toBeInTheDocument();
        });
        it('has senha type for password repeat input', () => {
            const { queryByPlaceholderText } = render(<UserSignupPage />);
            const confirmaSenhaInput = queryByPlaceholderText('Confirme sua senha');
            expect(confirmaSenhaInput.type).toBe('password');
        });

        it('has submit button', () => {
            const { container } = render(<UserSignupPage />);
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

        let nomeInput, emailInput, senhaInput, confirmaSenhaInput, button;
        const setupForSubmit = (props) => {
            const rendered = render(<UserSignupPage {...props} />)

            const { container, queryByPlaceholderText } = rendered;

            nomeInput = queryByPlaceholderText('Informe o seu nome');
            emailInput = queryByPlaceholderText('Informe o seu email');
            senhaInput = queryByPlaceholderText('Informe a sua senha');
            confirmaSenhaInput = queryByPlaceholderText('Confirme sua senha');

            fireEvent.change(nomeInput, changeEvent('nome'));
            fireEvent.change(emailInput, changeEvent('email'));
            fireEvent.change(senhaInput, changeEvent('P4ssword'));
            fireEvent.change(confirmaSenhaInput, changeEvent('P4ssword'));

            button = container.querySelector('button');

            return rendered;
        }

        it('sets the name value into state', () => {
            const { queryByPlaceholderText } = render(<UserSignupPage />);
            const nomeInput = queryByPlaceholderText('Informe o seu nome');
            fireEvent.change(nomeInput, changeEvent('nome'));
            expect(nomeInput).toHaveValue('nome');
        });

        it('sets the email value into state', () => {
            const { queryByPlaceholderText } = render(<UserSignupPage />);
            const emailInput = queryByPlaceholderText('Informe o seu email');
            fireEvent.change(emailInput, changeEvent('email'));
            expect(emailInput).toHaveValue('email');
        });

        it('sets the password value into state', () => {
            const { queryByPlaceholderText } = render(<UserSignupPage />);
            const senhaInput = queryByPlaceholderText('Informe a sua senha');
            fireEvent.change(senhaInput, changeEvent('P4ssword'));
            expect(senhaInput).toHaveValue('P4ssword');
        });
        it('sets the password repeat value into state', () => {
            const { queryByPlaceholderText } = render(<UserSignupPage />);
            const confirmaSenhaInput = queryByPlaceholderText('Confirme sua senha');
            fireEvent.change(confirmaSenhaInput, changeEvent('P4ssword'));
            expect(confirmaSenhaInput).toHaveValue('P4ssword');
        });

        it('calls postSignup when the fields are valid and the actions are provided in props', () => {
            const actions = {
                postSignup: jest.fn().mockResolvedValueOnce({}),
            }
            setupForSubmit({ actions });
            fireEvent.click(button);
            expect(actions.postSignup).toHaveBeenCalledTimes(1);
        });

        it('does not throw exception when clicking the button and actions are not provided in props', () => {
            setupForSubmit();
            expect(() => fireEvent.click(button)).not.toThrow();
        });

        it('calls post with user body when the fields are valid', () => {
            const actions = {
                postSignup: jest.fn().mockResolvedValueOnce({}),
            }
            setupForSubmit({ actions });
            fireEvent.click(button);

            const expectedUserObject = {
                nome: 'nome',
                email: 'email',
                senha: 'P4ssword',
            }
            expect(actions.postSignup).toHaveBeenCalledWith(expectedUserObject);
        });

        it('does not allow user to click the Signup button when there is an outgoing api call', () => {
            const actions = {
                postSignup: mockAsyncDelayed(),
            }
            setupForSubmit({ actions });
            fireEvent.click(button);
            fireEvent.click(button);
            expect(actions.postSignup).toHaveBeenCalledTimes(1);
        });

        it('displays spinner when there is an ongoing api call', () => {
            const actions = {
                postSignup: mockAsyncDelayed(),
            }
            const { queryByText } = setupForSubmit({ actions });
            fireEvent.click(button);

            const spinner = queryByText('Aguarde...');
            expect(spinner).toBeInTheDocument();
        });

        it('hides spinner after api call finishes successfully', async () => {
            const actions = {
                postSignup: mockAsyncDelayed(),
            }
            const { queryByText } = setupForSubmit({ actions });
            fireEvent.click(button);

            const spinner = queryByText('Aguarde...');
            await waitForElementToBeRemoved(spinner);

            expect(spinner).not.toBeInTheDocument();
        });

        it('hides spinner after api call finishes with error', async () => {
            const actions = {
                postSignup: mockAsyncDelayedRejected(),
            }
            const { queryByText } = setupForSubmit({ actions });
            fireEvent.click(button);

            const spinner = queryByText('Aguarde...');
            await waitForElementToBeRemoved(spinner);

            expect(spinner).not.toBeInTheDocument();
        });

        it('displays validation error for nome when error is received for the field', async () => {
            const actions = {
                postSignup: jest.fn().mockRejectedValue({
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