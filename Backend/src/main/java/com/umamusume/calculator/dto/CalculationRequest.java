package com.umamusume.calculator.dto;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDate;

public class CalculationRequest {
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate startDate;
    private String targetBannerId;
    private int currentCarats;
    private int teamTrialsClass;
    private int clubRankReward;
    private int cmRankReward;
    private int lohRankReward;
    private boolean dailyPackActive;

    public CalculationRequest() {
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public String getTargetBannerId() {
        return targetBannerId;
    }

    public void setTargetBannerId(String targetBannerId) {
        this.targetBannerId = targetBannerId;
    }

    public int getCurrentCarats() {
        return currentCarats;
    }

    public void setCurrentCarats(int currentCarats) {
        this.currentCarats = currentCarats;
    }

    public int getTeamTrialsClass() {
        return teamTrialsClass;
    }

    public void setTeamTrialsClass(int teamTrialsClass) {
        this.teamTrialsClass = teamTrialsClass;
    }

    public int getClubRankReward() {
        return clubRankReward;
    }

    public void setClubRankReward(int clubRankReward) {
        this.clubRankReward = clubRankReward;
    }

    public int getCmRankReward() {
        return cmRankReward;
    }

    public void setCmRankReward(int cmRankReward) {
        this.cmRankReward = cmRankReward;
    }

    public int getLohRankReward() {
        return lohRankReward;
    }

    public void setLohRankReward(int lohRankReward) {
        this.lohRankReward = lohRankReward;
    }

    public boolean isDailyPackActive() {
        return dailyPackActive;
    }

    public void setDailyPackActive(boolean dailyPackActive) {
        this.dailyPackActive = dailyPackActive;
    }
}
