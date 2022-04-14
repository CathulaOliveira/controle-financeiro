package br.edu.utfpr.pb.pw26s.server.model;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
@Entity
public class Conta {

    @Id
    @GeneratedValue
    private long id;

    @NotNull
    @ManyToOne
    private Usuario usuario;

    @NotNull
    @Size(min = 4, max = 255)
    private String numero;

    @NotNull
    @Size(min = 4, max = 255)
    private String agencia;

    @NotNull
    @Size(min = 4, max = 255)
    private String banco;

    @NotNull
    @Size(min = 4, max = 255)
    private Tipo tipo;
}
