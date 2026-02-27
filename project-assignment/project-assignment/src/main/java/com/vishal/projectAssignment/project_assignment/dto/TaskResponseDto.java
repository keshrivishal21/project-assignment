package com.vishal.projectAssignment.project_assignment.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class TaskResponseDto {
    private Long id;
    private String title;
    private String description;
    private String status;
    private LocalDateTime createdAt;
}
