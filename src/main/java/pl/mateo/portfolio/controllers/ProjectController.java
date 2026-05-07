package pl.mateo.portfolio.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.mateo.portfolio.models.Project;
import pl.mateo.portfolio.services.ProjectService;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class ProjectController {
    private final ProjectService projectService;

    @GetMapping("/api/projects")
    public List<Project> getAllProjects() {
        return projectService.getAllProjects();
    }
}
