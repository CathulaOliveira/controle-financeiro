package br.edu.utfpr.pb.pw26s.server.service.impl;

import br.edu.utfpr.pb.pw26s.server.enums.TypeTransaction;
import br.edu.utfpr.pb.pw26s.server.model.Account;
import br.edu.utfpr.pb.pw26s.server.model.Transaction;
import br.edu.utfpr.pb.pw26s.server.repository.AccountRepository;
import br.edu.utfpr.pb.pw26s.server.service.AccountService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public class AccountServiceImpl
        extends CrudServiceImpl<Account, Long>
        implements AccountService {

    private AccountRepository accountRepository;

    public AccountServiceImpl(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    @Override
    protected JpaRepository<Account, Long> getRepository() {
        return this.accountRepository;
    }

    public void atualizarSaldoContaEmInclusaoDeTranferencia(Transaction transaction) {
        if (transaction.getAccount() != null && transaction.getType() != null) {
            Account account = findOne(transaction.getAccount().getId());
            //todo conta destino
            Account account2 = findOne(transaction.getAccount().getId());
            switch (transaction.getType()) {
                case ENTRADA:
                    somaSaldoConta(transaction, account);
                case SAIDA:
                    subtraiSaldoConta(transaction, account);
                case TRANSFERENCIA:
                    subtraiSaldoConta(transaction, account);
                    somaSaldoConta(transaction, account2);
            }
            save(account);
        } else {
            System.out.println("NÃO FO POSSIVEL ATUALIZAR O SALDO DA CONTA");
        }
    }

    public void atualizarSaldoContaEmExclusaoDeTranferencia(Transaction transaction) {
        if (transaction.getAccount() != null && transaction.getType() != null) {
            Account account = findOne(transaction.getAccount().getId());
            //todo conta destino
            Account account2 = findOne(transaction.getAccount().getId());
            switch (transaction.getType()) {
                case ENTRADA:
                    subtraiSaldoConta(transaction, account);
                case SAIDA:
                    somaSaldoConta(transaction, account);
                case TRANSFERENCIA:
                    somaSaldoConta(transaction, account);
                    subtraiSaldoConta(transaction, account2);
            }
            save(account);
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
