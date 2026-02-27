package com.vishal.projectAssignment.project_assignment.repository;

import com.vishal.projectAssignment.project_assignment.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}
