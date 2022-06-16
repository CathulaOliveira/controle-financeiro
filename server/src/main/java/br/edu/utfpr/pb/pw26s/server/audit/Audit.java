package br.edu.utfpr.pb.pw26s.server.audit;

import br.edu.utfpr.pb.pw26s.server.model.User;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;

@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public abstract class Audit<T> {

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    @CreatedBy
    protected T user;
}
