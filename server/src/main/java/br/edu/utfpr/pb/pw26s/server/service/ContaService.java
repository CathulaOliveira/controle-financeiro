package br.edu.utfpr.pb.pw26s.server.service;

import br.edu.utfpr.pb.pw26s.server.model.Conta;
import br.edu.utfpr.pb.pw26s.server.repository.ContaRepository;
import org.springframework.stereotype.Service;

@Service
public class ContaService {

    ContaRepository contaRepository;

    public ContaService(ContaRepository contaRepository) {
        this.contaRepository = contaRepository;
    }

    public Conta save(Conta conta) {
        return contaRepository.save(conta);
    }
}
