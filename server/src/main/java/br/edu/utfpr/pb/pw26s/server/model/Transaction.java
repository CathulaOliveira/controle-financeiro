package br.edu.utfpr.pb.pw26s.server.model;

import br.edu.utfpr.pb.pw26s.server.enums.TypeTransaction;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDate;

@Entity
@Data
public class Transaction {

    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    @JoinColumn(name = "account_origin_id", referencedColumnName = "id")
    private Account accountOrigin;

    @ManyToOne
    @JoinColumn(name = "account_destination_id", referencedColumnName = "id")
    private Account accountDestination;

    @ManyToOne
    @JoinColumn(name = "category_id", referencedColumnName = "id")
    private Category category;

    @Column(nullable = false)
    private Double price;

    @Size(max = 250)
    private String description;

    private LocalDate date;

    @NotNull
    @Enumerated(EnumType.STRING)
    private TypeTransaction type;

}
