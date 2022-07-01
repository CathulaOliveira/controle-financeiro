package br.edu.utfpr.pb.pw26s.server.controller;

import br.edu.utfpr.pb.pw26s.server.filter.FilterBalance;
import br.edu.utfpr.pb.pw26s.server.model.Transaction;
import br.edu.utfpr.pb.pw26s.server.service.CrudService;
import br.edu.utfpr.pb.pw26s.server.service.impl.TransactionServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("transactions")
@RequiredArgsConstructor
public class TransactionController extends CrudController<Transaction, Long> {

    private final TransactionServiceImpl transactionService;

    @Override
    protected CrudService<Transaction, Long> getService() {
        return this.transactionService;
    }

    @PostMapping("calcular-total-entradas")
    public Double calcularTotalEntradas(@RequestBody FilterBalance filter) {
        return this.transactionService.calculateEntryByFilterBalance(filter);
    }

    @PostMapping("calcular-total-saidas")
    public Double calcularTotalSaidas(@RequestBody FilterBalance filter) {
        return this.transactionService.calculateOutputByFilterBalance(filter);
    }

    @PostMapping("find-by-account")
    public List<Transaction> findByAccount(@RequestBody FilterBalance filter) {
        return this.transactionService.listTransactionsByFilterBalance(filter);
    }

    @GetMapping("find-by-user-logged")
    public List<Transaction> findByUserLogged() {
        return this.transactionService.findByUserLogged();
    }
}
