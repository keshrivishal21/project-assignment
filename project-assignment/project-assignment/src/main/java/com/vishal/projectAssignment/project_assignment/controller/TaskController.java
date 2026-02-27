package com.vishal.projectAssignment.project_assignment.controller;

import com.vishal.projectAssignment.project_assignment.dto.TaskRequestDto;
import com.vishal.projectAssignment.project_assignment.dto.TaskResponseDto;
import com.vishal.projectAssignment.project_assignment.service.TaskService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/tasks")
public class TaskController {

    private final TaskService taskService;

    @Operation(summary = "Create a new task")
    @PostMapping
    public ResponseEntity<TaskResponseDto> createTask(
            @Valid @RequestBody TaskRequestDto request
    ) {
        return ResponseEntity.ok(taskService.createTask(request));
    }

    @Operation(summary = "Get all tasks for the current user (or all tasks if admin)")
    @GetMapping
    public ResponseEntity<List<TaskResponseDto>> getTasks() {
        return ResponseEntity.ok(taskService.getTasks());
    }

    @Operation(summary = "Update an existing task by ID")
    @PutMapping("/{id}")
    public ResponseEntity<TaskResponseDto> updateTask(
            @PathVariable Long id,
            @Valid @RequestBody TaskRequestDto request
    ) {
        return ResponseEntity.ok(taskService.updateTask(id, request));
    }

    @Operation(summary = "Delete a task by ID")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
        return ResponseEntity.ok("Task deleted successfully");
    }
}
