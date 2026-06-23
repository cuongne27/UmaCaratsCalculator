package com.umamusume.calculator.dto;

public class CalculationResult {
    private long totalDays;
    private int earnedCarats;
    private int finalTotalCarats;
    private int totalPulls;

    public CalculationResult(long totalDays, int earnedCarats, int finalTotalCarats, int totalPulls) {
        this.totalDays = totalDays;
        this.earnedCarats = earnedCarats;
        this.finalTotalCarats = finalTotalCarats;
        this.totalPulls = totalPulls;
    }

    // Getters
    public long getTotalDays() {
        return totalDays;
    }

    public int getEarnedCarats() {
        return earnedCarats;
    }

    public int getFinalTotalCarats() {
        return finalTotalCarats;
    }

    public int getTotalPulls() {
        return totalPulls;
    }
}