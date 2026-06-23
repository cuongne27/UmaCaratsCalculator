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
      teamTrialsClass: Number(teamTrialsClass) || 0,
      clubRankReward: Number(clubRankReward) || 0,
      cmRankReward: Number(cmRankReward) || 0,
      lohRankReward: Number(lohRankReward) || 0,
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
            <label htmlFor="teamTrialsClass">Team trials (avg per week)</label>
            <input id="teamTrialsClass" type="number" min="0" value={teamTrialsClass} onChange={(e: ChangeEvent<HTMLInputElement>) => setTeamTrialsClass(e.target.value)} />
          </div>

          <div className="field">
            <label htmlFor="clubRankReward">Club reward (monthly)</label>
            <input id="clubRankReward" type="number" min="0" value={clubRankReward} onChange={(e: ChangeEvent<HTMLInputElement>) => setClubRankReward(e.target.value)} />
          </div>

          <div className="field">
            <label htmlFor="cmRankReward">CM reward (per event)</label>
            <input id="cmRankReward" type="number" min="0" value={cmRankReward} onChange={(e: ChangeEvent<HTMLInputElement>) => setCmRankReward(e.target.value)} />
          </div>

          <div className="field">
            <label htmlFor="lohRankReward">LoH reward (per event)</label>
            <input id="lohRankReward" type="number" min="0" value={lohRankReward} onChange={(e: ChangeEvent<HTMLInputElement>) => setLohRankReward(e.target.value)} />
          </div>

          <div className="field">
            <label>
              <input type="checkbox" checked={dailyPackActive} onChange={(e: ChangeEvent<HTMLInputElement>) => setDailyPackActive(e.target.checked)} />{' '}
              Gói nạp hàng ngày
            </label>
          </div>
        </div>

        <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
          <button onClick={callBackendCalculate}>Tính bằng Backend</button>
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
                  <p>
                    Khoảng thời gian: <strong>{formatNumber(daysUntilRelease)}</strong> ngày từ hiện tại đến banner ra mắt.
                  </p>
                  <p>
                    Tổng carat ước tính: <strong>{formatNumber(totalCarats)}</strong> carat
                  </p>
                  <p className="notice">
                    Lưu ý: Giá trị này chỉ là ước tính dựa trên carat hàng ngày và phần thưởng dự kiến.
                  </p>
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
