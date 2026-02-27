package com.vishal.projectAssignment.project_assignment.service;

import com.vishal.projectAssignment.project_assignment.dto.TaskRequestDto;
import com.vishal.projectAssignment.project_assignment.dto.TaskResponseDto;
import com.vishal.projectAssignment.project_assignment.entity.Task;
import com.vishal.projectAssignment.project_assignment.entity.User;
import com.vishal.projectAssignment.project_assignment.entity.enums.Role;
import com.vishal.projectAssignment.project_assignment.entity.enums.TaskStatus;
import com.vishal.projectAssignment.project_assignment.exception.BadRequestException;
import com.vishal.projectAssignment.project_assignment.exception.ResourceNotFoundException;
import com.vishal.projectAssignment.project_assignment.exception.UnauthorizedException;
import com.vishal.projectAssignment.project_assignment.repository.TaskRepository;
import com.vishal.projectAssignment.project_assignment.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    private User getCurrentUser(){
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email).orElseThrow(() -> new BadRequestException("User not found"));
    }

    public TaskResponseDto createTask(TaskRequestDto request) {

        User user = getCurrentUser();

        Task task = Task.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .status(TaskStatus.PENDING)
                .createdAt(LocalDateTime.now())
                .user(user)
                .build();

        taskRepository.save(task);

        return modelMapper.map(task, TaskResponseDto.class);
    }

    public List<TaskResponseDto> getTasks() {

        User user = getCurrentUser();

        List<Task> tasks;

        if (user.getRole() == Role.ADMIN) {
            tasks = taskRepository.findAll();
        } else {
            tasks = taskRepository.findByUser(user);
        }

        return tasks.stream()
                .map(task -> modelMapper.map(task, TaskResponseDto.class))
                .toList();
    }

    public TaskResponseDto updateTask(Long id, TaskRequestDto request) {

        User user = getCurrentUser();

        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found"));

        if (user.getRole() != Role.ADMIN && !task.getUser().getId().equals(user.getId())) {
            throw new UnauthorizedException("Access denied");
        }

        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());

        taskRepository.save(task);

        return modelMapper.map(task, TaskResponseDto.class);
    }

    public void deleteTask(Long id) {

        User user = getCurrentUser();

        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        if (user.getRole() != Role.ADMIN && !task.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Access denied");
        }

        taskRepository.delete(task);
    }

}
