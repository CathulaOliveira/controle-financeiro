package br.edu.utfpr.pb.pw26s.server.aspect;

import br.edu.utfpr.pb.pw26s.server.model.Account;
import br.edu.utfpr.pb.pw26s.server.service.UserService;
import lombok.RequiredArgsConstructor;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;

@Aspect
@Component
@RequiredArgsConstructor
public class AccountAspectService {

    private final UserService userService;

    @Before(value = "execution(* br.edu.utfpr.pb.pw26s.server.service.impl.AccountServiceImpl.save(..)) && args(account)")
    public void beforeAccountSave(JoinPoint joinPoint, Account account) {
        account.setUser(userService.getUserLogged());
    }

}
