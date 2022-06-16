package br.edu.utfpr.pb.pw26s.server.service.impl;

import br.edu.utfpr.pb.pw26s.server.model.Account;
import br.edu.utfpr.pb.pw26s.server.model.Transaction;
import br.edu.utfpr.pb.pw26s.server.model.User;
import br.edu.utfpr.pb.pw26s.server.repository.AccountRepository;
import br.edu.utfpr.pb.pw26s.server.service.AccountService;
import br.edu.utfpr.pb.pw26s.server.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AccountServiceImpl
        extends CrudServiceImpl<Account, Long>
        implements AccountService {

    private final AccountRepository accountRepository;
    private final UserService userService;

    @Override
    protected JpaRepository<Account, Long> getRepository() {
        return this.accountRepository;
    }

    public List<Account> findByUserId(long userId) {
        return accountRepository.findByUserId(userId);
    }

    public List<Account> findByUserLogged() {
        User user = userService.getUserLogged();
        return findByUserId(user.getId());
    }

}
