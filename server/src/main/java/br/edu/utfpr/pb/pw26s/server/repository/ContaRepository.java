package br.edu.utfpr.pb.pw26s.server.repository;

import br.edu.utfpr.pb.pw26s.server.model.Conta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ContaRepository extends JpaRepository<Conta, Long> {

    //Select * from conta where usuarioid = ?
    @Query(value = "Select c From Conta as c where c.usuario.id=:usuarioId")
    Conta findByIdUsuario(long usuarioId);

}
