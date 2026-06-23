package com.umamusume.calculator.service;

import com.umamusume.calculator.dto.CalculationRequest;
import com.umamusume.calculator.dto.CalculationResult;
import com.umamusume.calculator.model.Banner;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

@Service
public class CalculatorService {

    private final List<Banner> globalTimeline = new ArrayList<>();

    public CalculatorService() {
        // Khoởi tạo dữ liệu cố định từ lộ trình file Timeline Global tương lai
        globalTimeline
                .add(new Banner("b1", "Support: Throne Group Card (Ngọc Tọa)", "Support", LocalDate.of(2026, 7, 15)));
        globalTimeline.add(new Banner("b2", "Uma: Kitasan Black (Anime Alt Ver)", "Uma", LocalDate.of(2026, 8, 24)));
        globalTimeline.add(new Banner("b3", "Support: Super Creek (Alt Ver)", "Support", LocalDate.of(2026, 10, 10)));
        globalTimeline.add(new Banner("b4", "Uma: Neo Universe (2nd Anniversary)", "Uma", LocalDate.of(2026, 12, 25)));
    }

    public List<Banner> getTimeline() {
        return globalTimeline;
    }

    public CalculationResult calculate(CalculationRequest request) {
        Banner target = globalTimeline.stream()
                .filter(b -> b.getId().equals(request.getTargetBannerId()))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Banner khong hop le"));

        LocalDate start = request.getStartDate();
        LocalDate end = target.getGlobalReleaseDate();

        if (start.isAfter(end)) {
            return new CalculationResult(0, 0, request.getCurrentCarats(), 0);
        }

        long days = ChronoUnit.DAYS.between(start, end);
        int weeks = (int) (days / 7);
        int months = (int) (days / 30);

        // Henry tables (hardcoded)
        java.util.Map<String, Integer> teamTrialsWeekly = new java.util.HashMap<>();
        teamTrialsWeekly.put("Class 6", 375);
        teamTrialsWeekly.put("Class 5.5", 262);
        teamTrialsWeekly.put("Class 5", 225);
        teamTrialsWeekly.put("Class 4", 150);
        teamTrialsWeekly.put("Class 3", 75);
        teamTrialsWeekly.put("Class 2", 35);
        teamTrialsWeekly.put("Class 1", 0);

        java.util.Map<String, Integer> clubMonthly = new java.util.HashMap<>();
        clubMonthly.put("SS", 4500);
        clubMonthly.put("S+", 3600);
        clubMonthly.put("S", 3150);
        clubMonthly.put("A+", 2700);
        clubMonthly.put("A", 2250);
        clubMonthly.put("B+", 1800);
        clubMonthly.put("B", 1350);
        clubMonthly.put("C+", 900);
        clubMonthly.put("C", 450);
        clubMonthly.put("D+", 225);

        java.util.Map<String, int[]> champion = new java.util.HashMap<>();
        champion.put("Champion", new int[]{3300, 5});
        champion.put("Second", new int[]{2400, 4});
        champion.put("Third", new int[]{1700, 3});
        champion.put("Group B 1st", new int[]{1600, 3});
        champion.put("Group B 2nd", new int[]{1250, 2});
        champion.put("Open League", new int[]{1100, 1});

        java.util.Map<String, int[]> loh = new java.util.HashMap<>();
        loh.put("Platinum 4", new int[]{3290, 2});
        loh.put("Platinum 3", new int[]{2790, 2});
        loh.put("Platinum 2", new int[]{2290, 2});
        loh.put("Platinum 1", new int[]{1790, 2});
        loh.put("Gold 4", new int[]{1290, 2});
        loh.put("Gold 3", new int[]{990, 1});
        loh.put("Gold 2", new int[]{690, 1});
        loh.put("Gold 1", new int[]{540, 0});
        loh.put("Silver 4", new int[]{390, 0});
        loh.put("Silver 3", new int[]{290, 0});
        loh.put("Silver 2", new int[]{190, 0});
        loh.put("Silver 1", new int[]{140, 0});
        loh.put("Bronze 4", new int[]{90, 0});
        loh.put("Bronze 3", new int[]{60, 0});
        loh.put("Bronze 2", new int[]{30, 0});

        // Daily / base incomes - keep a small baseline similar to previous implementation
        int dailyMissionIncome = 50; // fallback daily

        int earnedDaily = (int) (days * dailyMissionIncome);

        // team trials weekly income based on selected class
        int teamWeekly = teamTrialsWeekly.getOrDefault(request.getTeamTrialsClass(), 0);
        int earnedTrials = weeks * teamWeekly;

        // club monthly
        int clubMonthlyIncome = clubMonthly.getOrDefault(request.getClubRank() == null ? "D+" : request.getClubRank(), 0);
        int earnedClub = months * clubMonthlyIncome;

        // champion events and loh events (user provides counts)
        int[] cmVals = champion.getOrDefault(request.getCmRank() == null ? "Champion" : request.getCmRank(), new int[]{0,0});
        int cmCaratPerEvent = cmVals[0];
        int cmTicketsPerEvent = cmVals[1];
        int cmEvents = request.getChampionEventsCount();
        int earnedCm = cmEvents * cmCaratPerEvent;
        int cmTickets = cmEvents * cmTicketsPerEvent;

        int[] lohVals = loh.getOrDefault(request.getLohRank() == null ? "Silver 4" : request.getLohRank(), new int[]{0,0});
        int lohCaratPerEvent = lohVals[0];
        int lohTicketsPerEvent = lohVals[1];
        int lohEvents = request.getLohEventsCount();
        int earnedLoh = lohEvents * lohCaratPerEvent;
        int lohTickets = lohEvents * lohTicketsPerEvent;

        // daily pack
        int dailyPackBonus = request.isDailyPackActive() ? 1000 : 0;
        int earnedPacks = months * dailyPackBonus;

        int totalEarned = earnedDaily + earnedTrials + earnedClub + earnedCm + earnedLoh + earnedPacks + /*baseline monthly events*/ 0;

        int finalTotal = request.getCurrentCarats() + totalEarned;

        // Pull cost assumption: 300 carats per pull
        int PULL_COST = 300;
        int totalPulls = finalTotal / PULL_COST;

        int totalUmaTickets = request.getUmaTicketsOwned() + cmTickets + lohTickets;
        int totalSupportTickets = request.getSupportTicketsOwned();

        return new CalculationResult(days, totalEarned, finalTotal, totalPulls, earnedTrials, earnedClub, earnedCm, earnedLoh, totalUmaTickets, totalSupportTickets);
    }
}