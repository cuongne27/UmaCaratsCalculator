package com.umamusume.calculator.service;

import com.umamusume.calculator.model.Banner;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class BannerService {
    private final List<Banner> banners;

    public BannerService() {
        this.banners = initializeBanners();
    }

    public List<Banner> getAllBanners() {
        return new ArrayList<>(banners);
    }

    public Banner getBannerById(String id) {
        return banners.stream()
                .filter(b -> b.getId().equals(id))
                .findFirst()
                .orElse(null);
    }

    private List<Banner> initializeBanners() {
        List<Banner> list = new ArrayList<>();
        // Data from Henry's spreadsheet (Global Server Release Date)
        list.add(new Banner("launch", "Launch Banner", "Uma", LocalDate.of(2025, 6, 25)));
        list.add(new Banner("oguri_power", "Oguri Cap (Power)", "Supporter", LocalDate.of(2025, 6, 25)));
        list.add(new Banner("bourbon", "Mihono Bourbon (Original)", "Uma", LocalDate.of(2025, 7, 2)));
        list.add(new Banner("turbo", "Twin Turbo (Speed)", "Supporter", LocalDate.of(2025, 7, 2)));
        list.add(new Banner("teio", "Tokai Teio & Mejiro McQueen (Anime Collab)", "Uma", LocalDate.of(2025, 7, 16)));
        list.add(new Banner("kitasan", "Kitasan Black (Speed) & Satono Diamond (Stamina)", "Supporter", LocalDate.of(2025, 7, 16)));
        list.add(new Banner("curren", "Curren Chan (Original)", "Uma", LocalDate.of(2025, 7, 27)));
        list.add(new Banner("yaeno", "Yaeno Muteki (Power)", "Supporter", LocalDate.of(2025, 7, 27)));
        list.add(new Banner("taishin", "Narita Taishin (Original)", "Uma", LocalDate.of(2025, 8, 3)));
        list.add(new Banner("creek", "[Rerun] Super Creek (Stamina) & Tazuna (Friend)", "Supporter", LocalDate.of(2025, 8, 3)));
        list.add(new Banner("smart_falcon", "Smart Falcon (Original)", "Uma", LocalDate.of(2025, 8, 11)));
        list.add(new Banner("muteki", "[Rerun] Super Creek (Stamina) & Tazuna (Friend)", "Supporter", LocalDate.of(2025, 8, 11)));
        list.add(new Banner("topgun_air", "Mayano Top Gun & Air Groove (Wedding)", "Uma", LocalDate.of(2025, 8, 28)));
        list.add(new Banner("kawakami", "Kawakami Princess (Speed) & Hishi Akebono (Guts)", "Supporter", LocalDate.of(2025, 8, 28)));
        list.add(new Banner("seiun", "Seiun Sky (Original)", "Uma", LocalDate.of(2025, 9, 7)));
        list.add(new Banner("silence_tamamo", "[Rerun] Silence Suzuka (Speed) & Tamamo Cross (Stamina)", "Supporter", LocalDate.of(2025, 9, 7)));
        list.add(new Banner("amazon", "Hishi Amazon (Original)", "Uma", LocalDate.of(2025, 9, 17)));
        list.add(new Banner("bamboo", "Bamboo Memory (Power)", "Supporter", LocalDate.of(2025, 9, 17)));
        list.add(new Banner("condor_grass", "El Condor Pasa & Grass Wonder (Fantasy)", "Uma", LocalDate.of(2025, 9, 21)));
        list.add(new Banner("seiun_king", "Seiun Sky (Wit) & King Halo (Power)", "Supporter", LocalDate.of(2025, 9, 21)));
        list.add(new Banner("fuji_kiseki", "Fuji Kiseki (Original)", "Uma", LocalDate.of(2025, 10, 2)));
        list.add(new Banner("mejiro_ryan", "Mejiro Ryan (Guts)", "Supporter", LocalDate.of(2025, 10, 2)));
        list.add(new Banner("gold_city", "Gold City (Original)", "Uma", LocalDate.of(2025, 10, 7)));
        list.add(new Banner("vodka_nishino", "[Rerun] Vodka (Power) & Nishino Flower (Speed)", "Supporter", LocalDate.of(2025, 10, 7)));
        list.add(new Banner("week_maruzens", "Special Week & Maruzensky (Summer)", "Uma", LocalDate.of(2025, 10, 14)));
        list.add(new Banner("winning_sweep", "Winning Ticket (Stamina) & Sweep Tosho (Speed)", "Supporter", LocalDate.of(2025, 10, 14)));
        list.add(new Banner("meisho_doto", "Meisho Doto (Original)", "Uma", LocalDate.of(2025, 10, 21)));
        list.add(new Banner("week_teio", "[Rerun] Special Week (Guts) & Tokai Teio (Speed)", "Supporter", LocalDate.of(2025, 10, 21)));
        list.add(new Banner("eishin_flash", "Eishin Flash (Original)", "Uma", LocalDate.of(2025, 10, 30)));
        list.add(new Banner("nice_nature", "Nice Nature (Wit)", "Supporter", LocalDate.of(2025, 10, 30)));
        list.add(new Banner("matikan", "Matikanefukukitaru (Full Armor)", "Uma", LocalDate.of(2025, 11, 6)));
        list.add(new Banner("rice_riko", "Rice Shower (Power) & Riko Kashimoto (Friend)", "Supporter", LocalDate.of(2025, 11, 6)));
        list.add(new Banner("hishi_akebono", "Hishi Akebono (Original)", "Uma", LocalDate.of(2025, 11, 11)));
        list.add(new Banner("sakura_biko", "[Rerun] Sakura Bakushin O (Speed) & Biko Pegasus (Speed)", "Supporter", LocalDate.of(2025, 11, 11)));
        list.add(new Banner("agnes_digital", "Agnes Digital (Original)", "Uma", LocalDate.of(2025, 11, 19)));
        list.add(new Banner("ikuno_dictus", "Ikuno Dictus (Guts)", "Supporter", LocalDate.of(2025, 11, 19)));
        list.add(new Banner("rice_halloween", "Rice Shower & Super Creek (Halloween)", "Uma", LocalDate.of(2025, 11, 24)));
        list.add(new Banner("tamamo_zenno", "Tamamo Cross (Power) & Zenno Rob Roy (Speed)", "Supporter", LocalDate.of(2025, 11, 24)));
        list.add(new Banner("kawakami_orig", "Kawakami Princess (Original)", "Uma", LocalDate.of(2025, 12, 1)));
        list.add(new Banner("seiun_yaeno", "[Rerun] Seiun Sky (Stamina) & Yaeno Muteki (Power)", "Supporter", LocalDate.of(2025, 12, 1)));
        list.add(new Banner("manhattan_cafe", "Manhattan Cafe (Original)", "Uma", LocalDate.of(2025, 12, 8)));
        list.add(new Banner("nakayama_festa", "Nakayama Festa (Stamina)", "Supporter", LocalDate.of(2025, 12, 8)));
        list.add(new Banner("symboli_gold", "Symboli Rudolf & Gold City (Festival)", "Uma", LocalDate.of(2025, 12, 14)));
        list.add(new Banner("curren_narita", "Curren Chan (Wit) & Narita Brian (Stamina)", "Supporter", LocalDate.of(2025, 12, 14)));
        list.add(new Banner("tosen_jordan", "Tosen Jordan (Original)", "Uma", LocalDate.of(2025, 12, 18)));
        list.add(new Banner("kitasan_condor", "[Re-run] Kitasan Black (Speed) & El Condor Pasa (Power)", "Supporter", LocalDate.of(2025, 12, 18)));
        list.add(new Banner("mejiro_dober", "Mejiro Dober (Original)", "Uma", LocalDate.of(2025, 12, 28)));
        list.add(new Banner("daitaku_helios", "Daitaku Helios (Power)", "Supporter", LocalDate.of(2025, 12, 28)));
        list.add(new Banner("oguri_biwa_xmas", "Oguri Cap & Biwa Hayahide (Christmas)", "Uma", LocalDate.of(2026, 1, 5)));
        list.add(new Banner("mayano_narita", "Mayano Top Gun (Speed) & Narita Taishin (Wit)", "Supporter", LocalDate.of(2026, 1, 5)));
        list.add(new Banner("fine_motion", "Fine Motion (Original)", "Uma", LocalDate.of(2026, 1, 15)));
        list.add(new Banner("manhattan_xmas", "Manhattan Cafe (Stamina)", "Supporter", LocalDate.of(2026, 1, 15)));
        list.add(new Banner("tamamo_nice", "Tamamo Cross (Original)", "Uma", LocalDate.of(2026, 1, 22)));
        list.add(new Banner("nice_oguri", "[Rerun] Nice Nature (Wit) & Oguri Cap (Power)", "Supporter", LocalDate.of(2026, 1, 22)));
        list.add(new Banner("haru_tm", "Haru Urara & TM Opera O (New Years)", "Uma", LocalDate.of(2026, 1, 29)));
        list.add(new Banner("matikan_admire", "Matikanefukukitaru (Speed) & Admire Vega (Power)", "Supporter", LocalDate.of(2026, 1, 29)));
        list.add(new Banner("sakura_chiyono", "Sakura Chiyono O (Original)", "Uma", LocalDate.of(2026, 2, 11)));
        list.add(new Banner("riko_tazuna", "[Rerun] Riko Kashimoto (Friend) & Tazuna (Friend)", "Supporter", LocalDate.of(2026, 2, 11)));
        list.add(new Banner("mihono_eishin_val", "Mihono Bourbon & Eishin Flash (Valentine)", "Uma", LocalDate.of(2026, 2, 18)));
        list.add(new Banner("nishino_sakura_val", "Nishino Flower (Wit) & Sakura Bakushin O (Guts)", "Supporter", LocalDate.of(2026, 2, 18)));
        list.add(new Banner("mejiro_ardan", "Mejiro Ardan (Original)", "Uma", LocalDate.of(2026, 2, 25)));
        list.add(new Banner("agnes_digital_sup", "Agnes Digital (Power)", "Supporter", LocalDate.of(2026, 2, 25)));
        list.add(new Banner("admire_vega", "Admire Vega (Original)", "Uma", LocalDate.of(2026, 3, 5)));
        list.add(new Banner("fine_kawakami_sup", "[Rerun] Fine Motion (Wit) & Kawakami Princess (Speed)", "Supporter", LocalDate.of(2026, 3, 5)));
        list.add(new Banner("matikan_kitasan", "Matikanetannhauser & Kitasan Black (Original)", "Uma", LocalDate.of(2026, 3, 12)));
        list.add(new Banner("narita_top_road", "Narita Top Road (Speed)", "Supporter", LocalDate.of(2026, 3, 12)));
        return list;
    }
}
