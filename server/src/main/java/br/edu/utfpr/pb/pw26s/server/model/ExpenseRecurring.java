package br.edu.utfpr.pb.pw26s.server.model;


import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.time.LocalDate;

@Data
@Entity
public class ExpenseRecurring {

    @Id
    @GeneratedValue
    private Long id;

    @Size(max = 250)
    private String name;

    private LocalDate dateDue;

    private boolean debitAutomatic;

    @ManyToOne
    @JoinColumn(name = "account_id", referencedColumnName = "id")
    private Account account;
}
