package com.umamusume.calculator.dto;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDate;

public class CalculationRequest {
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate startDate;
    private String targetBannerId;
    private int currentCarats;
    // use string keys so backend maps to Henry tables
    private String teamTrialsClass;
    private String clubRank;
    private String cmRank;
    private String lohRank;
    private boolean dailyPackActive;

    // additional inputs
    private int umaTicketsOwned;
    private int supportTicketsOwned;
    private int championEventsCount;
    private int lohEventsCount;

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

    public String getTeamTrialsClass() {
        return teamTrialsClass;
    }

    public void setTeamTrialsClass(String teamTrialsClass) {
        this.teamTrialsClass = teamTrialsClass;
    }

    public String getClubRank() {
        return clubRank;
    }

    public void setClubRank(String clubRank) {
        this.clubRank = clubRank;
    }

    public String getCmRank() {
        return cmRank;
    }

    public void setCmRank(String cmRank) {
        this.cmRank = cmRank;
    }

    public String getLohRank() {
        return lohRank;
    }

    public void setLohRank(String lohRank) {
        this.lohRank = lohRank;
    }

    public int getUmaTicketsOwned() {
        return umaTicketsOwned;
    }

    public void setUmaTicketsOwned(int umaTicketsOwned) {
        this.umaTicketsOwned = umaTicketsOwned;
    }

    public int getSupportTicketsOwned() {
        return supportTicketsOwned;
    }

    public void setSupportTicketsOwned(int supportTicketsOwned) {
        this.supportTicketsOwned = supportTicketsOwned;
    }

    public int getChampionEventsCount() {
        return championEventsCount;
    }

    public void setChampionEventsCount(int championEventsCount) {
        this.championEventsCount = championEventsCount;
    }

    public int getLohEventsCount() {
        return lohEventsCount;
    }

    public void setLohEventsCount(int lohEventsCount) {
        this.lohEventsCount = lohEventsCount;
    }

    public boolean isDailyPackActive() {
        return dailyPackActive;
    }

    public void setDailyPackActive(boolean dailyPackActive) {
        this.dailyPackActive = dailyPackActive;
    }
}
