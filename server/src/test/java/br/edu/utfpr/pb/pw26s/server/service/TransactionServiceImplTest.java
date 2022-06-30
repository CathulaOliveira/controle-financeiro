package br.edu.utfpr.pb.pw26s.server.service;

import br.edu.utfpr.pb.pw26s.server.model.Transaction;
import br.edu.utfpr.pb.pw26s.server.repository.TransactionRepository;
import br.edu.utfpr.pb.pw26s.server.service.impl.TransactionServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.ActiveProfiles;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@ExtendWith(MockitoExtension.class)
@DataJpaTest
@ActiveProfiles("test")
public class TransactionServiceImplTest {

    @Autowired
    TestEntityManager testEntityManager;
    private TransactionServiceImpl underTest;
    @Mock
    private TransactionRepository transactionRepository;
    @Mock
    private UserService userService;

    @BeforeEach
    void setUp() {
        underTest = new TransactionServiceImpl(transactionRepository, userService);
    }

    @Test
    void saveTransaction() {
        Transaction transaction =
                Transaction.builder()
                        .description("Coca")
                        .price(50.0)
                        .build();
        testEntityManager.persist(transaction);
        Transaction transaction1 = underTest.findOne(1L);
        assertThat(transaction1).isEqualTo(transaction);

    }
}
