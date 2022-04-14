package br.edu.utfpr.pb.pw26s.server.repository;

import br.edu.utfpr.pb.pw26s.server.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    //Select * from user where username = ''
    // @Query(value = "Select u From User as u where u.username=:username")
    Usuario findByNome(String nome);

    //Select * from user where displayname LIKE '%Silva'
    //List<User> findByDisplayNameEndingWith(String displayName);
}
