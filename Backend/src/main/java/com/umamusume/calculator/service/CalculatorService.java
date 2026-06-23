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
        double weeks = days / 7.0;
        double months = days / 30.41;

        // Thu nhập nền cố định từ sự kiện hệ thống (Event/Log-in/Story) ~12000 mỗi
        // tháng
        double baseMonthlyIncome = 12000.0;
        int dailyMissionIncome = 50;

        // Tính toán các nguồn thu nhập biến đổi
        double earnedDaily = days * dailyMissionIncome;
        double earnedEvents = months * baseMonthlyIncome;
        double earnedTrials = weeks * request.getTeamTrialsClass();
        double earnedClub = months * request.getClubRankReward();

        // Giả định PvP định kỳ: Champions Meeting và LoH thay phiên diễn ra hàng tháng
        double earnedCm = (months / 2.0) * request.getCmRankReward();
        double earnedLoh = (months / 2.0) * request.getLohRankReward();

        // Gói nạp hàng ngày nếu có kích hoạt
        int dailyPackBonus = request.isDailyPackActive() ? 1000 : 0;
        double earnedPacks = months * dailyPackBonus;

        // Tổng hợp tài nguyên tích lũy
        // // Bad: ép kiểu không kiểm soát trực tiếp dễ gây sai số lớn
        // // int total = (int) (earnedDaily + earnedEvents);

        // // Good: Làm tròn số học theo tiêu chuẩn toán học trước khi chuyển đổi kiểu
        // dữ liệu
        int totalEarned = (int) Math
                .round(earnedDaily + earnedEvents + earnedTrials + earnedClub + earnedCm + earnedLoh + earnedPacks);
        int finalTotal = request.getCurrentCarats() + totalEarned;
        int totalPulls = finalTotal / 150;

        return new CalculationResult(days, totalEarned, finalTotal, totalPulls);
    }
}