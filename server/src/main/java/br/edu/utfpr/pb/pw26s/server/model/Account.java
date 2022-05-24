package br.edu.utfpr.pb.pw26s.server.model;

import br.edu.utfpr.pb.pw26s.server.enums.TypeAccount;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
@Entity
public class Account {

    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @NotNull
    @Size(min = 2, max = 6)
    private String number;

    @NotNull
    @Size(min = 2, max = 6)
    private String agency;

    @NotNull
    @Size(min = 2, max = 1024)
    private String bank;

    @NotNull
    @Enumerated(EnumType.STRING)
    private TypeAccount type;

    @Column(nullable = false)
    private Double balance;
}
