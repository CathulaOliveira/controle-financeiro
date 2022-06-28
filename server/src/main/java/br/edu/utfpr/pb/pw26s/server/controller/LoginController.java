package br.edu.utfpr.pb.pw26s.server.controller;

import br.edu.utfpr.pb.pw26s.server.model.User;
import br.edu.utfpr.pb.pw26s.server.security.AuthUserService;
import br.edu.utfpr.pb.pw26s.server.security.UserDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("login")
@RequiredArgsConstructor
public class LoginController {

    private final AuthUserService authUserService;

    @GetMapping("user-info")
    public UserDTO getUserInfo(Principal principal) {
        return new UserDTO( (User)
                authUserService.loadUserByUsername(principal.getName()));
    }
}
