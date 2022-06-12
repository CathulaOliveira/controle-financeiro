package br.edu.utfpr.pb.pw26s.server.controller;

import br.edu.utfpr.pb.pw26s.server.model.Transaction;
import br.edu.utfpr.pb.pw26s.server.service.CrudService;
import br.edu.utfpr.pb.pw26s.server.service.TransactionService;
import br.edu.utfpr.pb.pw26s.server.service.impl.TransactionServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("transactions")
public class TransactionController extends CrudController<Transaction, Long> {

    @Autowired
    private TransactionServiceImpl transactionService;

    @Override
    protected CrudService<Transaction, Long> getService() {
        return this.transactionService;
    }

    @GetMapping("calcularTotal/{mes}/{ano}/{tipo}")
    public Double calcularTotal(@PathVariable String mes,
                                           @PathVariable String ano,
                                           @PathVariable String tipo) {
        return this.transactionService.calculaTotalPorMesEAnoETipo(mes, ano, tipo);
    }
}
