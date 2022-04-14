package br.edu.utfpr.pb.pw26s.server.controller;

import br.edu.utfpr.pb.pw26s.server.model.Conta;
import br.edu.utfpr.pb.pw26s.server.service.ContaService;
import br.edu.utfpr.pb.pw26s.server.shared.GenericResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("conta")
public class ContaController {

    @Autowired
    ContaService contaService;

    @PostMapping
    GenericResponse createConta(@Valid @RequestBody Conta conta) {
        contaService.save(conta);
        return new GenericResponse("Registro salvo.");
    }
}
