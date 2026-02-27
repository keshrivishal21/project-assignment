package com.vishal.projectAssignment.project_assignment.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class TaskRequestDto {
    @NotBlank(message = "Title is required")
    private String title;

    private String description;
}
