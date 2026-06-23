package com.umamusume.calculator.controller;

import com.umamusume.calculator.dto.CalculationRequest;
import com.umamusume.calculator.dto.CalculationResult;
import com.umamusume.calculator.model.Banner;
import com.umamusume.calculator.service.CalculatorService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api")
public class CaratController {

    private final CalculatorService calculatorService;

    public CaratController(CalculatorService calculatorService) {
        this.calculatorService = calculatorService;
    }

    @GetMapping("/timeline")
    public ResponseEntity<List<Banner>> getTimeline() {
        return ResponseEntity.ok(calculatorService.getTimeline());
    }

    @PostMapping("/calculate")
    public ResponseEntity<CalculationResult> calculate(@RequestBody CalculationRequest request) {
        CalculationResult result = calculatorService.calculate(request);
        return ResponseEntity.ok(result);
    }
}
