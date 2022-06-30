package br.edu.utfpr.pb.pw26s.server.repository;

import br.edu.utfpr.pb.pw26s.server.model.Category;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.ActiveProfiles;

import java.util.List;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@DataJpaTest
@ActiveProfiles("test")
public class CategoryRepositoryTest {

    @Autowired
    TestEntityManager testEntityManager;
    @Autowired
    CategoryRepository categoryRepository;

    @Test
    void findAllCategory() {
        Category category = Category.builder().name("Teste").build();
        testEntityManager.persist(category);
        List<Category> category1 = categoryRepository.findAll();
        assertThat(category1.size()).isEqualTo(1);
    }
}
