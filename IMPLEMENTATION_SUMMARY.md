# Calculator Refactor Complete - Summary

## Changes Made

### Backend
1. **New Service: BannerService** (`Backend/src/main/java/com/umamusume/calculator/service/BannerService.java`)
   - Provides complete banner timeline from Henry's spreadsheet
   - ~50 banners with Global Server release dates (June 2025 - March 2026)
   - Auto-loaded on application startup

2. **Updated CalculatorService**
   - Injected BannerService (dependency injection)
   - Removed hardcoded 4-banner timeline
   - Updated daily mission income: 50 → 75 carats/day (Henry's formula)
   - Added Training Pass bonus calculation:
     - Free: 0 carats/month
     - Bronze: 200 carats/month
     - Silver: 400 carats/month
     - Gold: 600 carats/month
   - Updated Daily Carat Pack: now 1000 carats/month (multiplied by months)
   - All Henry tables remain (Team Trials, Club, Champion, LoH)

3. **Updated CalculationRequest DTO**
   - Added field: `String trainingPass` ("Free", "Bronze", "Silver", "Gold")
   - All other fields already present (team/club/cm/loh ranks, event counts, tickets, daily pack)

4. **Controller (No changes needed)**
   - `/api/timeline` now returns all banners from BannerService
   - `/api/calculate` uses updated CalculatorService

### Frontend
1. **Updated CalculatorForm Component**
   - Fetches banners from `/api/timeline` on mount
   - Banner dropdown selector (auto-populated)
   - Auto-sets release date when banner is selected (disabled input)
   - Removed manual datetime-local input
   - Removed "daily carats" input (fixed at 75/day on backend)
   - Added Training Pass dropdown (Free, Bronze, Silver, Gold)
   - Added Daily Carat Pack dropdown (No/Yes)
   - Changed defaults: Class 6, A rank, Champion, Silver 4
   - Updated calculation request to send `trainingPass` field
   - Improved result display with breakdown of carat sources

2. **Component Structure (Already Done)**
   - Header.tsx
   - Footer.tsx
   - Dropdown.tsx (generic dropdown)
   - RankSelect.tsx (for rank/placement selects)
   - CalculatorForm.tsx (main form - updated)

## Files Modified
- Backend/src/main/java/com/umamusume/calculator/service/BannerService.java (NEW)
- Backend/src/main/java/com/umamusume/calculator/service/CalculatorService.java (UPDATED)
- Backend/src/main/java/com/umamusume/calculator/dto/CalculationRequest.java (UPDATED)
- Frontend/src/components/CalculatorForm.tsx (UPDATED)

## Input Validation
Current screenshot shows expected inputs:
- Team Trials: Class 6 ✓
- Club Rank: A ✓
- Champion's Meeting: Champion ✓
- League of Heroes: Silver 4 ✓
- Daily Carat Pack: No ✓
- Training Pass: Free ✓
- Current Carats: 10000 (example)
- Uma Tickets: 7 (example input or output from events)
- Support Tickets: 36 (example)

## Known Clarifications Needed
1. **Training Pass values**: Are Bronze/Silver/Gold bonuses (200/400/600 carats/month) correct?
2. **Daily Carat Pack behavior**: Confirmed 1000 carats/month when active?
3. **Pull Cost**: Hardcoded at 300 carats/pull - should this be user-configurable?

## Testing Instructions
1. Build Backend: `mvn clean package` or `docker compose build backend`
2. Build Frontend: `npm run build` (if needed)
3. Run: `docker compose up` or individual services
4. Test calculator with the inputs from the screenshot
5. Verify results match expected output

## Next Steps (Optional)
- Add unit tests for CalculatorService with Henry formula
- Add validation for invalid date ranges
- Add export/share functionality
- Add more detailed breakdown (weeks, months, events, etc.)
