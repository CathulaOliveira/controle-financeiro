package br.edu.utfpr.pb.pw26s.server.service;

import br.edu.utfpr.pb.pw26s.server.enums.TypeAccount;
import br.edu.utfpr.pb.pw26s.server.model.Account;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;

import java.util.List;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@DataJpaTest
@ActiveProfiles("test")
public class AccountServiceImplTest {

    @Autowired
    AccountService accountService;

//    @Test
    void saveAccount() {
        Account account =
                Account.builder()
                        .number("123")
                        .agency("12")
                        .bank("Teste")
                        .type(TypeAccount.CONTA_CORRENTE)
                        .build();
        accountService.save(account);
        List<Account> account1 = accountService.findAll();
        assertThat(account1).isNotNull();
    }
}
