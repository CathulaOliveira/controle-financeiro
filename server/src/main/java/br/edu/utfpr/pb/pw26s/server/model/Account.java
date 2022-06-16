package br.edu.utfpr.pb.pw26s.server.model;

import br.edu.utfpr.pb.pw26s.server.enums.TypeAccount;
import br.edu.utfpr.pb.pw26s.server.audit.Audit;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
@Entity
public class Account extends Audit<User> {

    @Id
    @GeneratedValue
    private Long id;

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
    @Column(nullable = false)
    private TypeAccount type;

    @JsonIgnore
    private Double balance = Double.valueOf(0);
}
