package br.edu.utfpr.pb.pw26s.server.controller;

import br.edu.utfpr.pb.pw26s.server.model.Movimentacao;
import br.edu.utfpr.pb.pw26s.server.model.Usuario;
import br.edu.utfpr.pb.pw26s.server.service.MovimentacaoService;
import br.edu.utfpr.pb.pw26s.server.service.UsuarioService;
import br.edu.utfpr.pb.pw26s.server.shared.GenericResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("movimentacao")
public class MovimentacaoController {

    @Autowired
    MovimentacaoService movimentacaoService;

    @PostMapping
    GenericResponse createMovimentacao(@Valid @RequestBody Movimentacao movimentacao) {
        movimentacaoService.save(movimentacao);
        return new GenericResponse("Registro salvo.");
    }
}
