package pl.mateo.portfolio.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.mateo.portfolio.models.Project;
import pl.mateo.portfolio.repositories.ProjectRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProjectService {
    private final ProjectRepository projectRepository;

    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

}
