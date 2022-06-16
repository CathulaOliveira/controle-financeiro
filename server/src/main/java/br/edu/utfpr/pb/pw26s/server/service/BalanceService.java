package br.edu.utfpr.pb.pw26s.server.service;

import br.edu.utfpr.pb.pw26s.server.model.Account;
import br.edu.utfpr.pb.pw26s.server.model.Transaction;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class BalanceService {

    private final AccountService accountService;

    public void atualizarSaldoContaEmInclusaoDeTranferencia(Transaction transaction) {
        if (transaction.getAccountOrigin() != null && transaction.getType() != null) {
            Account accountOrigin = accountService.findOne(transaction.getAccountOrigin().getId());
            Account accountDestination = accountService.findOne(transaction.getAccountDestination().getId());
            switch (transaction.getType()) {
                case ENTRADA:
                    somaSaldoConta(transaction, accountOrigin);
                case SAIDA:
                    subtraiSaldoConta(transaction, accountOrigin);
                case TRANSFERENCIA:
                    subtraiSaldoConta(transaction, accountOrigin);
                    somaSaldoConta(transaction, accountDestination);
                    accountService.save(accountDestination);
            }
            accountService.save(accountOrigin);
        } else {
            System.out.println("NÃO FO POSSIVEL ATUALIZAR O SALDO DA CONTA");
        }
    }

    public void atualizarSaldoContaEmExclusaoDeTranferencia(Transaction transaction) {
        if (transaction.getAccountOrigin() != null && transaction.getType() != null) {
            Account accountOrigin = accountService.findOne(transaction.getAccountOrigin().getId());
            Account accountDestination = accountService.findOne(transaction.getAccountDestination().getId());
            switch (transaction.getType()) {
                case ENTRADA:
                    subtraiSaldoConta(transaction, accountOrigin);
                case SAIDA:
                    somaSaldoConta(transaction, accountOrigin);
                case TRANSFERENCIA:
                    somaSaldoConta(transaction, accountOrigin);
                    subtraiSaldoConta(transaction, accountDestination);
                    accountService.save(accountDestination);
            }
            accountService.save(accountOrigin);
        } else {
            System.out.println("NÃO FO POSSIVEL ATUALIZAR O SALDO DA CONTA");
        }
    }

    private void somaSaldoConta(Transaction transaction, Account account) {
        account.setBalance(account.getBalance() + transaction.getPrice());
    }

    private void subtraiSaldoConta(Transaction transaction, Account account) {
        account.setBalance(account.getBalance() - transaction.getPrice());
    }
}
