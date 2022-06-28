package br.edu.utfpr.pb.pw26s.server.controller;

import br.edu.utfpr.pb.pw26s.server.model.Category;
import br.edu.utfpr.pb.pw26s.server.service.CategoryService;
import br.edu.utfpr.pb.pw26s.server.service.CrudService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("categories")
@RequiredArgsConstructor
public class CategoryController
        extends CrudController<Category, Long> {

    private final CategoryService categoryService;

    @Override
    protected CrudService<Category, Long> getService() {
        return this.categoryService;
    }

}
