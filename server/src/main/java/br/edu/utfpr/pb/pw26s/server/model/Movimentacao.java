package br.edu.utfpr.pb.pw26s.server.model;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDate;

@Data
@Entity
public class Movimentacao {

    @Id
    @GeneratedValue
    private long id;

    @NotNull
    @ManyToOne
    private Conta conta;

    @NotNull
    private Double valor;

    @NotNull
    private Double valorPago;

    @NotNull
    private LocalDate dataVencimento;

    @NotNull
    private LocalDate dataPagamento;

    @NotNull
    @Size(min = 4, max = 255)
    private String categoria;

    @NotNull
    @Size(min = 4, max = 255)
    private String descricao;

    @NotNull
    @Size(min = 4, max = 255)
    private TipoMovimentacao tipo;
}
