package br.edu.utfpr.pb.pw26s.server.model;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Data
@Entity
public class Usuario {

    @Id
    @GeneratedValue
    private long id;

    @NotNull(message = "{utfpr.user.username.constraints.NotNull.message}")
    @Size(min = 4, max = 255)
    private String nome;

    @NotNull
    @Size(min = 4, max = 255)
    private String email;

    @NotNull
    @Size(min = 6, max = 255)
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*$")
    private String senha;

}
