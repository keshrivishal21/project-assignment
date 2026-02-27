package com.vishal.projectAssignment.project_assignment.repository;

import com.vishal.projectAssignment.project_assignment.entity.Task;
import com.vishal.projectAssignment.project_assignment.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByUser(User user);
}
