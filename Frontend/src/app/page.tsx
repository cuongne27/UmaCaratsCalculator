'use client'

import { useEffect, useMemo, useState, type ChangeEvent } from 'react'

function formatNumber(value: number) {
  return value.toLocaleString('vi-VN')
}

function getDayDifference(from: Date, to: Date) {
  const diffMs = to.getTime() - from.getTime()
  return diffMs <= 0 ? 0 : Math.floor(diffMs / (1000 * 60 * 60 * 24))
}

export default function HomePage() {
  const [releaseDate, setReleaseDate] = useState('')
  const [currentCarats, setCurrentCarats] = useState('0')
  const [dailyCarats, setDailyCarats] = useState('5')
  const [bonusCarats, setBonusCarats] = useState('0')

  const [banners, setBanners] = useState<Array<{ id: string; title: string }>>([])
  const [selectedBanner, setSelectedBanner] = useState<string | null>(null)
  const [teamTrialsClass, setTeamTrialsClass] = useState('0')
  const [clubRankReward, setClubRankReward] = useState('0')
  const [cmRankReward, setCmRankReward] = useState('0')
  const [lohRankReward, setLohRankReward] = useState('0')
  const [umaTicketsOwned, setUmaTicketsOwned] = useState('0')
  const [supportTicketsOwned, setSupportTicketsOwned] = useState('0')
  const [championEventsCount, setChampionEventsCount] = useState('0')
  const [lohEventsCount, setLohEventsCount] = useState('0')
  const [dailyPackActive, setDailyPackActive] = useState(false)
  const [backendResult, setBackendResult] = useState<any | null>(null)

  const releaseTime = releaseDate ? new Date(releaseDate) : null
  const now = new Date()

  const daysUntilRelease = useMemo(() => {
    if (!releaseTime) return 0
    return getDayDifference(now, releaseTime)
  }, [releaseTime, now])

  const totalCarats = useMemo(() => {
    const current = Number(currentCarats) || 0
    const daily = Number(dailyCarats) || 0
    const bonus = Number(bonusCarats) || 0
    return current + daysUntilRelease * daily + bonus
  }, [currentCarats, dailyCarats, bonusCarats, daysUntilRelease])

  const isReleaseInPast = releaseTime ? releaseTime.getTime() <= now.getTime() : false

  const apiBase = typeof process !== 'undefined' && process.env && process.env.NEXT_PUBLIC_API_BASE
    ? process.env.NEXT_PUBLIC_API_BASE
    : 'http://localhost:8080'

  // Fetch timeline from backend
  useEffect(() => {
    fetch(`${apiBase}/api/timeline`)
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setBanners(data.map((b: any) => ({ id: b.id, title: b.title })))
          if (data.length > 0) setSelectedBanner(data[0].id)
        }
      })
      .catch(() => {
        // ignore fetch errors for now
      })
  }, [apiBase])

  async function callBackendCalculate() {
    if (!selectedBanner || !releaseDate) return
    const body = {
      startDate: releaseDate.split('T')[0],
      targetBannerId: selectedBanner,
      currentCarats: Number(currentCarats) || 0,
      teamTrialsClass: teamTrialsClass,
      clubRank: clubRankReward,
      cmRank: cmRankReward,
      lohRank: lohRankReward,
      umaTicketsOwned: Number(umaTicketsOwned) || 0,
      supportTicketsOwned: Number(supportTicketsOwned) || 0,
      championEventsCount: Number(championEventsCount) || 0,
      lohEventsCount: Number(lohEventsCount) || 0,
      dailyPackActive: Boolean(dailyPackActive),
    }

    try {
      const res = await fetch(`${apiBase}/api/calculate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      const data = await res.json()
      setBackendResult(data)
    } catch (e) {
      console.error(e)
    }
  }

  // Client-side calculation (based on Henry tables provided by user)
  function clientCalculate() {
    if (!releaseDate) return null
    const days = daysUntilRelease
    const current = Number(currentCarats) || 0
    const daily = Number(dailyCarats) || 0
    const bonus = Number(bonusCarats) || 0

    const teamTrialsTable: Record<string, number> = {
      'Class 6': 375,
      'Class 5.5': 262,
      'Class 5': 225,
      'Class 4': 150,
      'Class 3': 75,
      'Class 2': 35,
      'Class 1': 0,
    }

    const clubRankTable: Record<string, number> = {
      'SS': 4500,
      'S+': 3600,
      'S': 3150,
      'A+': 2700,
      'A': 2250,
      'B+': 1800,
      'B': 1350,
      'C+': 900,
      'C': 450,
      'D+': 225,
    }

    const championTable: Record<string, { carats: number; tickets: number }> = {
      'Champion': { carats: 3300, tickets: 5 },
      'Second': { carats: 2400, tickets: 4 },
      'Third': { carats: 1700, tickets: 3 },
      'Group B 1st': { carats: 1600, tickets: 3 },
      'Group B 2nd': { carats: 1250, tickets: 2 },
      'Open League': { carats: 1100, tickets: 1 },
    }

    const lohTable: Record<string, { carats: number; tickets: number }> = {
      'Platinum 4': { carats: 3290, tickets: 2 },
      'Platinum 3': { carats: 2790, tickets: 2 },
      'Platinum 2': { carats: 2290, tickets: 2 },
      'Platinum 1': { carats: 1790, tickets: 2 },
      'Gold 4': { carats: 1290, tickets: 2 },
      'Gold 3': { carats: 990, tickets: 1 },
      'Gold 2': { carats: 690, tickets: 1 },
      'Gold 1': { carats: 540, tickets: 0 },
      'Silver 4': { carats: 390, tickets: 0 },
      'Silver 3': { carats: 290, tickets: 0 },
      'Silver 2': { carats: 190, tickets: 0 },
      'Silver 1': { carats: 140, tickets: 0 },
      'Bronze 4': { carats: 90, tickets: 0 },
      'Bronze 3': { carats: 60, tickets: 0 },
      'Bronze 2': { carats: 30, tickets: 0 },
    }

    const weeks = Math.floor(days / 7)
    const months = Math.floor(days / 30)

    const teamClass = Object.keys(teamTrialsTable).includes(teamTrialsClass) ? teamTrialsClass : 'Class 1'
    const teamCarats = weeks * (teamTrialsTable[teamClass] || 0)

    const clubRank = Object.keys(clubRankTable).includes(clubRankReward) ? clubRankReward : 'D+'
    const clubCarats = months * (clubRankTable[clubRank] || 0)

    const cm = championTable[cmRankReward] ? championTable[cmRankReward] : { carats: 0, tickets: 0 }
    const loh = lohTable[lohRankReward] ? lohTable[lohRankReward] : { carats: 0, tickets: 0 }

    const championCarats = cm.carats
    const championTickets = cm.tickets

    const lohCarats = loh.carats
    const lohTickets = loh.tickets

    const totalCarats = current + days * daily + bonus + teamCarats + clubCarats + championCarats + lohCarats

    const umaTicketsStart = Number(umaTicketsOwned) || 0
    const supportTicketsStart = Number(supportTicketsOwned) || 0
    const totalUmaTickets = umaTicketsStart + championTickets + lohTickets
    const totalSupportTickets = supportTicketsStart

    return {
      days,
      teamCarats,
      clubCarats,
      championCarats,
      lohCarats,
      totalCarats,
      totalUmaTickets,
      totalSupportTickets,
    }
  }

  return (
    <main>
      <section className="card">
        <h1 className="heading">Calculator Carat Uma Musume</h1>
        <p className="description">
          Nhập ngày banner ra mắt và lượng carat bạn nhận được trung bình mỗi ngày để ước tính tổng carat từ hiện tại đến banner.
        </p>

        <div className="grid">
          <div className="field">
            <label htmlFor="releaseDate">Ngày giờ banner ra mắt</label>
            <input
              id="releaseDate"
              type="datetime-local"
              value={releaseDate}
              onChange={(event: ChangeEvent<HTMLInputElement>) => setReleaseDate(event.target.value)}
            />
          </div>

          <div className="field">
            <label htmlFor="banner">Chọn banner từ timeline</label>
            <select id="banner" value={selectedBanner ?? ''} onChange={(e: ChangeEvent<HTMLSelectElement>) => setSelectedBanner(e.target.value)}>
              {banners.length === 0 ? <option value="">(không có dữ liệu timeline)</option> : null}
              {banners.map((b) => (
                <option key={b.id} value={b.id}>{b.title}</option>
              ))}
            </select>
          </div>

          <div className="field">
            <label htmlFor="currentCarats">Carat hiện có</label>
            <input
              id="currentCarats"
              type="number"
              min="0"
              value={currentCarats}
              onChange={(event: ChangeEvent<HTMLInputElement>) => setCurrentCarats(event.target.value)}
            />
          </div>

          <div className="field">
            <label htmlFor="dailyCarats">Carat trung bình mỗi ngày</label>
            <input
              id="dailyCarats"
              type="number"
              min="0"
              value={dailyCarats}
              onChange={(event: ChangeEvent<HTMLInputElement>) => setDailyCarats(event.target.value)}
            />
          </div>

          <div className="field">
            <label htmlFor="bonusCarats">Carat thưởng dự kiến</label>
            <input
              id="bonusCarats"
              type="number"
              min="0"
              value={bonusCarats}
              onChange={(event: ChangeEvent<HTMLInputElement>) => setBonusCarats(event.target.value)}
            />
          </div>

          <div className="field">
            <label htmlFor="teamTrialsClass">Team trials class</label>
            <select id="teamTrialsClass" value={teamTrialsClass} onChange={(e: ChangeEvent<HTMLSelectElement>) => setTeamTrialsClass(e.target.value)}>
              <option value="Class 6">Class 6</option>
              <option value="Class 5.5">Class 5.5</option>
              <option value="Class 5">Class 5</option>
              <option value="Class 4">Class 4</option>
              <option value="Class 3">Class 3</option>
              <option value="Class 2">Class 2</option>
              <option value="Class 1">Class 1</option>
            </select>
          </div>

          <div className="field">
            <label htmlFor="clubRankReward">Club rank</label>
            <select id="clubRankReward" value={clubRankReward} onChange={(e: ChangeEvent<HTMLSelectElement>) => setClubRankReward(e.target.value)}>
              <option value="SS">SS</option>
              <option value="S+">S+</option>
              <option value="S">S</option>
              <option value="A+">A+</option>
              <option value="A">A</option>
              <option value="B+">B+</option>
              <option value="B">B</option>
              <option value="C+">C+</option>
              <option value="C">C</option>
              <option value="D+">D+</option>
            </select>
          </div>

          <div className="field">
            <label htmlFor="cmRankReward">Champion's Meeting placement</label>
            <select id="cmRankReward" value={cmRankReward} onChange={(e: ChangeEvent<HTMLSelectElement>) => setCmRankReward(e.target.value)}>
              <option value="Champion">Champion</option>
              <option value="Second">Second</option>
              <option value="Third">Third</option>
              <option value="Group B 1st">Group B 1st</option>
              <option value="Group B 2nd">Group B 2nd</option>
              <option value="Open League">Open League</option>
            </select>
          </div>

          <div className="field">
            <label htmlFor="lohRankReward">LoH rank</label>
            <select id="lohRankReward" value={lohRankReward} onChange={(e: ChangeEvent<HTMLSelectElement>) => setLohRankReward(e.target.value)}>
              <option value="Platinum 4">Platinum 4</option>
              <option value="Platinum 3">Platinum 3</option>
              <option value="Platinum 2">Platinum 2</option>
              <option value="Platinum 1">Platinum 1</option>
              <option value="Gold 4">Gold 4</option>
              <option value="Gold 3">Gold 3</option>
              <option value="Gold 2">Gold 2</option>
              <option value="Gold 1">Gold 1</option>
              <option value="Silver 4">Silver 4</option>
              <option value="Silver 3">Silver 3</option>
              <option value="Silver 2">Silver 2</option>
              <option value="Silver 1">Silver 1</option>
              <option value="Bronze 4">Bronze 4</option>
              <option value="Bronze 3">Bronze 3</option>
              <option value="Bronze 2">Bronze 2</option>
            </select>
          </div>

          <div className="field">
            <label>
              <input type="checkbox" checked={dailyPackActive} onChange={(e: ChangeEvent<HTMLInputElement>) => setDailyPackActive(e.target.checked)} />{' '}
              Gói nạp hàng ngày
            </label>
          </div>

          <div className="field">
            <label htmlFor="championEventsCount">Champion events count</label>
            <input id="championEventsCount" type="number" min="0" value={championEventsCount} onChange={(e: ChangeEvent<HTMLInputElement>) => setChampionEventsCount(e.target.value)} />
          </div>

          <div className="field">
            <label htmlFor="lohEventsCount">LoH events count</label>
            <input id="lohEventsCount" type="number" min="0" value={lohEventsCount} onChange={(e: ChangeEvent<HTMLInputElement>) => setLohEventsCount(e.target.value)} />
          </div>

          <div className="field">
            <label htmlFor="umaTicketsOwned">Uma tickets owned</label>
            <input id="umaTicketsOwned" type="number" min="0" value={umaTicketsOwned} onChange={(e: ChangeEvent<HTMLInputElement>) => setUmaTicketsOwned(e.target.value)} />
          </div>

          <div className="field">
            <label htmlFor="supportTicketsOwned">Support tickets owned</label>
            <input id="supportTicketsOwned" type="number" min="0" value={supportTicketsOwned} onChange={(e: ChangeEvent<HTMLInputElement>) => setSupportTicketsOwned(e.target.value)} />
          </div>
        </div>

        <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
          <button onClick={callBackendCalculate}>Tính bằng Backend</button>
          <button onClick={() => setBackendResult(null) || setBackendResult(clientCalculate())}>Tính nhanh (Client)</button>
        </div>

        <div className="result">
          {backendResult ? (
            <>
              <p>Tổng ngày: <strong>{formatNumber(backendResult.totalDays ?? 0)}</strong></p>
              <p>Carat thu được: <strong>{formatNumber(backendResult.earnedCarats ?? 0)}</strong></p>
              <p>Tổng carat sau cộng: <strong>{formatNumber(backendResult.finalTotalCarats ?? 0)}</strong></p>
              <p>Tổng pull ước tính: <strong>{formatNumber(backendResult.totalPulls ?? 0)}</strong></p>
            </>
          ) : (
            releaseDate ? (
              isReleaseInPast ? (
                <p className="notice">Ngày banner đã qua. Vui lòng chọn ngày trong tương lai.</p>
              ) : (
                <>
                  {backendResult === null ? (
                    (() => {
                      const c = clientCalculate()
                      if (!c) return <p>Không có dữ liệu để tính.</p>
                      return (
                        <>
                          <p>Khoảng thời gian: <strong>{formatNumber(c.days)}</strong> ngày từ hiện tại đến banner ra mắt.</p>
                          <p>Tổng carat ước tính: <strong>{formatNumber(c.totalCarats)}</strong> carat</p>
                          <p>Team trials đóng góp: <strong>{formatNumber(c.teamCarats)}</strong> carat</p>
                          <p>Club đóng góp: <strong>{formatNumber(c.clubCarats)}</strong> carat</p>
                          <p>Champion & LoH: <strong>{formatNumber(c.championCarats + c.lohCarats)}</strong> carat</p>
                          <p>Uma tickets (sở hữu + event): <strong>{formatNumber(c.totalUmaTickets)}</strong></p>
                          <p>Support tickets sở hữu: <strong>{formatNumber(c.totalSupportTickets)}</strong></p>
                        </>
                      )
                    })()
                  ) : (
                    <p className="notice">Lưu ý: Giá trị này chỉ là ước tính dựa trên carat hàng ngày và phần thưởng dự kiến.</p>
                  )}
                </>
              )
            ) : (
              <p>Chọn ngày giờ banner để xem ước tính carat.</p>
            )
          )}
        </div>
      </section>
    </main>
  )
}
