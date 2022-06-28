package br.edu.utfpr.pb.pw26s.server.aspect;

import br.edu.utfpr.pb.pw26s.server.model.Transaction;
import br.edu.utfpr.pb.pw26s.server.service.BalanceService;
import br.edu.utfpr.pb.pw26s.server.service.TransactionService;
import lombok.RequiredArgsConstructor;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;

@Aspect
@Component
@RequiredArgsConstructor
public class TransactionAspectService {

    private final BalanceService balanceService;
    private final TransactionService transactionService;

    @After(value = "execution(* br.edu.utfpr.pb.pw26s.server.service.impl.TransactionServiceImpl.save(..)) && args(transaction)")
    public void afterTransactionSave(JoinPoint joinPoint, Transaction transaction) {
        balanceService.atualizarSaldoContaEmInclusaoDeTranferencia(transaction);
    }

    @Before(value = "execution(* br.edu.utfpr.pb.pw26s.server.service.impl.TransactionServiceImpl.delete(..)) && args(id)")
    public void beforeTransactionDelete(JoinPoint joinPoint, Long id) {
        Transaction transaction = transactionService.findOne(id);
        balanceService.atualizarSaldoContaEmExclusaoDeTranferencia(transaction);
    }
}
