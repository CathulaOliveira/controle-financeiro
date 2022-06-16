package br.edu.utfpr.pb.pw26s.server.aspect;

import br.edu.utfpr.pb.pw26s.server.model.Transaction;
import br.edu.utfpr.pb.pw26s.server.service.BalanceService;
import br.edu.utfpr.pb.pw26s.server.service.impl.AccountServiceImpl;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

@Aspect
@Component
@RequiredArgsConstructor
public class TransactionAspectService {

    private final BalanceService balanceService;

    @After(value = "execution(* br.edu.utfpr.pb.pw26s.server.service.impl.TransactionServiceImpl.save(..)) && args(transaction)")
    public void beforeTransactionSave(JoinPoint joinPoint, Transaction transaction) {
        balanceService.atualizarSaldoContaEmInclusaoDeTranferencia(transaction);
    }

    @After(value = "execution(* br.edu.utfpr.pb.pw26s.server.service.impl.TransactionServiceImpl.delete(..)) && args(transaction)")
    public void afterTransactionDelete(JoinPoint joinPoint, Transaction transaction) {
        balanceService.atualizarSaldoContaEmExclusaoDeTranferencia(transaction);
    }
}
