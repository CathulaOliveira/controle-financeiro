package br.edu.utfpr.pb.pw26s.server.service;

import br.edu.utfpr.pb.pw26s.server.enums.TypeAccount;
import br.edu.utfpr.pb.pw26s.server.enums.TypeTransaction;
import br.edu.utfpr.pb.pw26s.server.model.Account;
import br.edu.utfpr.pb.pw26s.server.model.Category;
import br.edu.utfpr.pb.pw26s.server.model.Transaction;
import br.edu.utfpr.pb.pw26s.server.model.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.authentication.TestingAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.test.context.TestSecurityContextHolder;
import org.springframework.test.context.ActiveProfiles;

import java.time.LocalDate;
import java.util.ArrayList;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class BalanceServiceTest {

    @Autowired
    TransactionService transactionService;
    @Autowired
    AccountService accountService;
    @Autowired
    UserService userService;
    @Autowired
    CategoryService categoryService;

    @BeforeEach
    public void cleanup() {
        transactionService.deleteAll();
        accountService.deleteAll();
        userService.deleteAll();
        categoryService.deleteAll();
    }

    @Test
    void updateBalanceAferEntry() {
        authenticate();
        Category category = createCategoryValid();
        Account accountOrigin = createAccountValid();
        Transaction transactionEntry =
                Transaction.builder()
                        .description("Teste")
                        .accountOrigin(accountOrigin)
                        .category(category)
                        .price(100.0)
                        .date(LocalDate.now())
                        .type(TypeTransaction.ENTRADA)
                        .build();
        transactionService.save(transactionEntry);

        Account accountUpdated  = accountService.findOne(accountOrigin.getId());
        assertThat(accountUpdated.getBalance()).isEqualTo(100.0);
    }

    @Test
    void updateBalanceAferEntryAndOutput() {
        authenticate();
        Category category = createCategoryValid();

        Account account = createAccountValid();
        Transaction transactionEntry =
                Transaction.builder()
                        .description("Teste")
                        .accountOrigin(account)
                        .category(category)
                        .price(100.0)
                        .date(LocalDate.now())
                        .type(TypeTransaction.ENTRADA)
                        .build();
        transactionService.save(transactionEntry);

        Transaction transactionOutput =
                Transaction.builder()
                        .description("Teste")
                        .accountOrigin(account)
                        .category(category)
                        .price(30.0)
                        .date(LocalDate.now())
                        .type(TypeTransaction.SAIDA)
                        .build();
        transactionService.save(transactionOutput);

        Account accountUpdated  = accountService.findOne(account.getId());
        assertThat(accountUpdated.getBalance()).isEqualTo(70.0);
    }

    @Test
    void transactionsByAccount() {
        authenticate();
        Category category = createCategoryValid();
        Account accountOrigin = createAccountValid();
        Account accountDestination = createAccountValid();

        Transaction transactionEntry =
                Transaction.builder()
                        .description("Teste")
                        .accountOrigin(accountOrigin)
                        .category(category)
                        .price(700.0)
                        .date(LocalDate.now())
                        .type(TypeTransaction.ENTRADA)
                        .build();
        transactionService.save(transactionEntry);

        Transaction transactionTransfer =
                Transaction.builder()
                        .description("Teste")
                        .accountOrigin(accountOrigin)
                        .category(category)
                        .price(200.0)
                        .date(LocalDate.now())
                        .type(TypeTransaction.TRANSFERENCIA)
                        .accountDestination(accountDestination)
                        .build();
        transactionService.save(transactionTransfer);

        Account accountOriginUpdated  = accountService.findOne(accountOrigin.getId());
        Account accountDestinationUpdated  = accountService.findOne(accountDestination.getId());
        assertThat(accountOriginUpdated.getBalance()).isEqualTo(500.0);
        assertThat(accountDestinationUpdated.getBalance()).isEqualTo(200.0);
    }

    private Category createCategoryValid() {
        Category category =
                Category.builder()
                        .name("Teste")
                        .build();
        return categoryService.save(category);
    }

    private Account createAccountValid() {
        Account account =
                Account.builder()
                        .number("123")
                        .agency("12")
                        .bank("Teste")
                        .type(TypeAccount.CONTA_CORRENTE)
                        .build();
        return accountService.save(account);
    }

    private void authenticate() {
        User user = userService.save(getValidLoginUser());
        TestSecurityContextHolder
                .getContext()
                .setAuthentication(new TestingAuthenticationToken(user.getUsername(), new ArrayList<GrantedAuthority>()));

    }

    private User getValidLoginUser() {
        User user = new User();
        user.setUsername("test-user");
        user.setPassword("P4ssword");
        return user;
    }


}
