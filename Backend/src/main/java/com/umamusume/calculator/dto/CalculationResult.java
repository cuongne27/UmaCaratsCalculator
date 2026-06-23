package com.umamusume.calculator.dto;

public class CalculationResult {
    private long totalDays;
    private int earnedCarats;
    private int finalTotalCarats;
    private int totalPulls;

    // breakdown
    private int teamCarats;
    private int clubCarats;
    private int championCarats;
    private int lohCarats;
    private int totalUmaTickets;
    private int totalSupportTickets;

    public CalculationResult(long totalDays, int earnedCarats, int finalTotalCarats, int totalPulls, int teamCarats,
                             int clubCarats, int championCarats, int lohCarats, int totalUmaTickets, int totalSupportTickets) {
        this.totalDays = totalDays;
        this.earnedCarats = earnedCarats;
        this.finalTotalCarats = finalTotalCarats;
        this.totalPulls = totalPulls;
        this.teamCarats = teamCarats;
        this.clubCarats = clubCarats;
        this.championCarats = championCarats;
        this.lohCarats = lohCarats;
        this.totalUmaTickets = totalUmaTickets;
        this.totalSupportTickets = totalSupportTickets;
    }

    // Getters
    public long getTotalDays() { return totalDays; }
    public int getEarnedCarats() { return earnedCarats; }
    public int getFinalTotalCarats() { return finalTotalCarats; }
    public int getTotalPulls() { return totalPulls; }
    public int getTeamCarats() { return teamCarats; }
    public int getClubCarats() { return clubCarats; }
    public int getChampionCarats() { return championCarats; }
    public int getLohCarats() { return lohCarats; }
    public int getTotalUmaTickets() { return totalUmaTickets; }
    public int getTotalSupportTickets() { return totalSupportTickets; }
}