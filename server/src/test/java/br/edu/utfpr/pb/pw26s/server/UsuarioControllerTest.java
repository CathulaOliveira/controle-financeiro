package br.edu.utfpr.pb.pw26s.server;

import br.edu.utfpr.pb.pw26s.server.error.ApiError;
import br.edu.utfpr.pb.pw26s.server.model.Usuario;
import br.edu.utfpr.pb.pw26s.server.repository.UsuarioRepository;
import br.edu.utfpr.pb.pw26s.server.shared.GenericResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class UsuarioControllerTest {

    public static final String URL_USERS = "/usuario";
    @Autowired
    TestRestTemplate testRestTemplate;
    @Autowired
    UsuarioRepository usuarioRepository;

    @BeforeEach
    public void cleanup() {
        usuarioRepository.deleteAll();
        testRestTemplate.getRestTemplate().getInterceptors().clear();
    }

    @Test
    public void postUser_whenUserIsValid_receiveOk() {
        Usuario usuario = criarUsuarioValido();
        ResponseEntity<Object> response = postSignup(usuario, Object.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
    }

    @Test
    public void postUser_whenUserIsValid_usuarioSavedToDatabase() {
        Usuario usuario = criarUsuarioValido();
        postSignup(usuario, Object.class);
        assertThat(usuarioRepository.count()).isEqualTo(1);
    }


    @Test
    public void postUser_whenUserIsValid_receiveSuccessMessage() {
        Usuario usuario = criarUsuarioValido();
        ResponseEntity<GenericResponse> response = postSignup(usuario, GenericResponse.class);
        assertThat(response.getBody().getMessage()).isNotNull();
    }


    @Test
    public void postUser_whenUserIsValid_passwordIsHashedInDatabase() {
        Usuario usuario = criarUsuarioValido();
        postSignup(usuario, Object.class);

        List<Usuario> usuarios = usuarioRepository.findAll();
        Usuario usuarioDB = usuarios.get(0);

        assertThat(usuarioDB.getSenha()).isNotEqualTo(usuario.getSenha());
    }

    @Test
    public void postUser_whenUserHasNullName_receiveBadRequest() {
        Usuario usuario = criarUsuarioValido();
        usuario.setNome(null);
        ResponseEntity<Object> response = postSignup(usuario, Object.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }

    @Test
    public void postUser_whenUserHasNullEmail_receiveBadRequest() {
        Usuario usuario = criarUsuarioValido();
        usuario.setEmail(null);
        ResponseEntity<Object> response = postSignup(usuario, Object.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }

    @Test
    public void postUser_whenUserHasNullPassword_receiveBadRequest() {
        Usuario usuario = criarUsuarioValido();
        usuario.setSenha(null);
        ResponseEntity<Object> response = postSignup(usuario, Object.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }

    @Test
    public void postUser_whenUserHasNameWithLessThenRequired_receiveBadRequest() {
        Usuario usuario = criarUsuarioValido();
        usuario.setNome("123");
        ResponseEntity<Object> response = postSignup(usuario, Object.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }

    @Test
    public void postUser_whenUserHasEmailWithLessThenRequired_receiveBadRequest() {
        Usuario usuario = criarUsuarioValido();
        usuario.setEmail("123");
        ResponseEntity<Object> response = postSignup(usuario, Object.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }

    @Test
    public void postUser_whenUserHasPasswordWithLessThenRequired_receiveBadRequest() {
        Usuario usuario = criarUsuarioValido();
        usuario.setSenha("12345");
        ResponseEntity<Object> response = postSignup(usuario, Object.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }

    @Test
    public void postUser_whenUserHasNameExceedsTheLengthLimit_receiveBadRequest() {
        Usuario usuario = criarUsuarioValido();
        String string256Chars = IntStream.rangeClosed(1, 256).mapToObj(x -> "a")
                .collect(Collectors.joining());
        usuario.setNome(string256Chars);
        ResponseEntity<Object> response = postSignup(usuario, Object.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }

    @Test
    public void postUser_whenUserHasPasswordAllLowecase_receiveBadRequest() {
        Usuario usuario = criarUsuarioValido();
        usuario.setSenha("abcdef");
        ResponseEntity<Object> response = postSignup(usuario, Object.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }

    @Test
    public void postUser_whenUserHasPasswordAllUpercase_receiveBadRequest() {
        Usuario usuario = criarUsuarioValido();
        usuario.setSenha("ABCDEF");
        ResponseEntity<Object> response = postSignup(usuario, Object.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }

    @Test
    public void postUser_whenUserHasPasswordAllNumber_receiveBadRequest() {
        Usuario usuario = criarUsuarioValido();
        usuario.setSenha("123456");
        ResponseEntity<Object> response = postSignup(usuario, Object.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }

    @Test
    public void postUser_whenUserIsInvalid_receiveApiError() {
        ResponseEntity<ApiError> response = postSignup(new Usuario(), ApiError.class);
        assertThat(response.getBody().getUrl()).isEqualTo(URL_USERS);
    }

    @Test
    public void postUser_whenUserIsInvalid_receiveApiErrorWithValidationErrors() {
        ResponseEntity<ApiError> response = postSignup(new Usuario(), ApiError.class);
        assertThat(response.getBody().getValidationErrors().size()).isEqualTo(3);
    }

    public <T> ResponseEntity<T> postSignup(Object request, Class<T> responseType) {
        return testRestTemplate.postForEntity(URL_USERS, request, responseType);
    }

    private Usuario criarUsuarioValido() {
        Usuario usuario = new Usuario();
        usuario.setNome("test-usuario");
        usuario.setEmail("test-email");
        usuario.setSenha("P4ssword");
        return usuario;
    }
}
