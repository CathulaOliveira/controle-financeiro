import axios from 'axios';
import * as apiCalls from './apiCalls';

describe('apiCalls', () => {
    describe('usuario', () => {
        it('calls/usuario', () => {
            const mockSignup = jest.fn();
            axios.post = mockSignup;

            apiCalls.postUsuario();

            const path = mockSignup.mock.calls[0][0];
            expect(path).toBe('/usuario');
        });        
    });
});