package br.edu.utfpr.pb.pw26s.server.audit;

import br.edu.utfpr.pb.pw26s.server.model.User;
import br.edu.utfpr.pb.pw26s.server.service.UserService;
import org.springframework.data.domain.AuditorAware;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class AuditorAwareImpl implements AuditorAware<User> {

    private final UserService userService;

    public AuditorAwareImpl(UserService userService) {
        this.userService = userService;
    }

    @Override
    public Optional<User> getCurrentAuditor() {
        return Optional.ofNullable(userService.getUserLogged());
    }
}
