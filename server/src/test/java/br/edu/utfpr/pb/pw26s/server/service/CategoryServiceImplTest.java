package br.edu.utfpr.pb.pw26s.server.service;

import br.edu.utfpr.pb.pw26s.server.model.Category;
import br.edu.utfpr.pb.pw26s.server.service.impl.CategoryServiceImpl;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import java.util.List;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class CategoryServiceImplTest {

    @Autowired
    CategoryServiceImpl underTest;

    @Test
    void saveCategory() {
        Category category =
                Category.builder()
                        .name("Teste")
                        .build();
        underTest.save(category);
        List<Category> categories = underTest.findAll();
        assertThat(categories).isNotNull();
    }
}
