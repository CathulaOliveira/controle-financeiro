package br.edu.utfpr.pb.pw26s.server.service.impl;

import br.edu.utfpr.pb.pw26s.server.enums.TypeTransaction;
import br.edu.utfpr.pb.pw26s.server.model.Transaction;
import br.edu.utfpr.pb.pw26s.server.repository.TransactionRepository;
import br.edu.utfpr.pb.pw26s.server.service.TransactionService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class TransactionServiceImpl
        extends CrudServiceImpl<Transaction, Long>
        implements TransactionService {

    private TransactionRepository transactionRepository;

    public TransactionServiceImpl(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    @Override
    protected JpaRepository<Transaction, Long> getRepository() {
        return this.transactionRepository;
    }

    public List<Transaction> transactionsByMonthAndYear(int month, int year) {
        LocalDate dateStart = LocalDate.of(year, month, 1);
        LocalDate dateFinish = LocalDate.of(year, month, 1);
        List<Transaction> listTransactions = transactionRepository.findByDateBetween(
                dateStart,
                dateFinish
        );
        return listTransactions;
    }

    public List<Transaction> transactionsByMonthAndYearAndType(int month, int year, TypeTransaction type) {
        LocalDate dateStart = LocalDate.of(year, month, 1);
        LocalDate dateFinish = LocalDate.of(year, month, 1);
        List<Transaction> listTransactions = transactionRepository.findByDateBetweenAndType(
                dateStart,
                dateFinish,
                type
        );
        return listTransactions;
    }

    public Double calculaTotalPorMesEAno(int month, int year, TypeTransaction type) {
        List<Transaction> listTransactions = transactionsByMonthAndYearAndType(
                month,
                year,
                type
        );
        return listTransactions.stream().mapToDouble(Transaction::getPrice).sum();
    }

}
