package pl.mateo.portfolio.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.mateo.portfolio.models.Project;

public interface ProjectRepository extends JpaRepository<Project, Long> {
}
