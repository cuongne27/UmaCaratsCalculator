"use client"
import { useState, useEffect, type ChangeEvent } from 'react'
import Dropdown from './Dropdown'
import RankSelect from './RankSelect'

const TEAM_OPTIONS = ['Class 6','Class 5.5','Class 5','Class 4','Class 3','Class 2','Class 1']
const CLUB_OPTIONS = ['SS','S+','S','A+','A','B+','B','C+','C','D+']
const CM_OPTIONS = ['Champion','Second','Third','Group B 1st','Group B 2nd','Open League']
const LOH_OPTIONS = ['Platinum 4','Platinum 3','Platinum 2','Platinum 1','Gold 4','Gold 3','Gold 2','Gold 1','Silver 4','Silver 3','Silver 2','Silver 1','Bronze 4','Bronze 3','Bronze 2']
const TRAINING_PASS_OPTIONS = ['Free', 'Bronze', 'Silver', 'Gold']

type Banner = { id: string; title: string; globalReleaseDate: string }

export default function CalculatorForm({ apiBase = 'http://localhost:8080' }: { apiBase?: string }) {
  const [banners, setBanners] = useState<Banner[]>([])
  const [selectedBannerId, setSelectedBannerId] = useState<string | null>(null)
  const [releaseDate, setReleaseDate] = useState('')
  const [currentCarats, setCurrentCarats] = useState('0')

  const [teamTrialsClass, setTeamTrialsClass] = useState('Class 6')
  const [clubRank, setClubRank] = useState('A')
  const [cmRank, setCmRank] = useState('Champion')
  const [lohRank, setLohRank] = useState('Silver 4')

  const [umaTicketsOwned, setUmaTicketsOwned] = useState('0')
  const [supportTicketsOwned, setSupportTicketsOwned] = useState('0')
  const [championEventsCount, setChampionEventsCount] = useState('0')
  const [lohEventsCount, setLohEventsCount] = useState('0')
  const [dailyPackActive, setDailyPackActive] = useState(false)
  const [trainingPass, setTrainingPass] = useState('Free')

  const [result, setResult] = useState<any | null>(null)

  // Fetch banners from backend timeline
  useEffect(() => {
    fetch(`${apiBase}/api/timeline`)
      .then((r) => r.json())
      .then((data: Banner[]) => {
        setBanners(data)
        if (data.length > 0) {
          setSelectedBannerId(data[0].id)
          setReleaseDate(data[0].globalReleaseDate)
        }
      })
      .catch((e) => console.error('Failed to fetch timeline:', e))
  }, [apiBase])

  // Auto-set release date when banner is selected
  const handleBannerChange = (bannerId: string) => {
    const selected = banners.find((b) => b.id === bannerId)
    if (selected) {
      setSelectedBannerId(bannerId)
      setReleaseDate(selected.globalReleaseDate)
    }
  }

  async function callBackendCalculate() {
    if (!releaseDate || !selectedBannerId) {
      alert('Please select a banner')
      return
    }
    const body = {
      startDate: new Date().toISOString().split('T')[0],
      targetBannerId: selectedBannerId,
      currentCarats: Number(currentCarats) || 0,
      teamTrialsClass: teamTrialsClass,
      clubRank: clubRank,
      cmRank: cmRank,
      lohRank: lohRank,
      umaTicketsOwned: Number(umaTicketsOwned) || 0,
      supportTicketsOwned: Number(supportTicketsOwned) || 0,
      championEventsCount: Number(championEventsCount) || 0,
      lohEventsCount: Number(lohEventsCount) || 0,
      dailyPackActive: Boolean(dailyPackActive),
      trainingPass: trainingPass,
    }

    try {
      const res = await fetch(`${apiBase}/api/calculate`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body)
      })
      const data = await res.json()
      setResult(data)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <section className="card">
      <div className="grid">
        <div className="field">
          <label htmlFor="banner">Chọn banner</label>
          <select id="banner" value={selectedBannerId ?? ''} onChange={(e: ChangeEvent<HTMLSelectElement>) => handleBannerChange(e.target.value)}>
            {banners.length === 0 ? <option value="">(loading banners...)</option> : null}
            {banners.map((b) => (
              <option key={b.id} value={b.id}>{b.title}</option>
            ))}
          </select>
        </div>

        <div className="field">
          <label htmlFor="releaseDate">Ngày ra mắt (tự động)</label>
          <input id="releaseDate" type="date" value={releaseDate} disabled />
        </div>

        <div className="field">
          <label htmlFor="currentCarats">Carat hiện có</label>
          <input id="currentCarats" type="number" min="0" value={currentCarats} onChange={(e: ChangeEvent<HTMLInputElement>) => setCurrentCarats(e.target.value)} />
        </div>

        <RankSelect id="teamTrials" value={teamTrialsClass} onChange={setTeamTrialsClass} options={TEAM_OPTIONS} label="Team Trials" />
        <RankSelect id="clubRank" value={clubRank} onChange={setClubRank} options={CLUB_OPTIONS} label="Club Rank" />
        <RankSelect id="cmRank" value={cmRank} onChange={setCmRank} options={CM_OPTIONS} label="Champion's Meeting" />
        <RankSelect id="lohRank" value={lohRank} onChange={setLohRank} options={LOH_OPTIONS} label="League of Heroes" />

        <div className="field">
          <label htmlFor="dailyPackActive">Daily Carat Pack</label>
          <select id="dailyPackActive" value={dailyPackActive ? 'Yes' : 'No'} onChange={(e)=>setDailyPackActive(e.target.value === 'Yes')}>
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>

        <div className="field">
          <label htmlFor="trainingPass">Training Pass</label>
          <select id="trainingPass" value={trainingPass} onChange={(e)=>setTrainingPass(e.target.value)}>
            {TRAINING_PASS_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>

        <div className="field">
          <label htmlFor="championEventsCount">Champion Events Count</label>
          <input id="championEventsCount" type="number" min="0" value={championEventsCount} onChange={(e)=>setChampionEventsCount(e.target.value)} />
        </div>

        <div className="field">
          <label htmlFor="lohEventsCount">LoH Events Count</label>
          <input id="lohEventsCount" type="number" min="0" value={lohEventsCount} onChange={(e)=>setLohEventsCount(e.target.value)} />
        </div>

        <div className="field">
          <label htmlFor="umaTicketsOwned">Uma Tickets Owned</label>
          <input id="umaTicketsOwned" type="number" min="0" value={umaTicketsOwned} onChange={(e)=>setUmaTicketsOwned(e.target.value)} />
        </div>

        <div className="field">
          <label htmlFor="supportTicketsOwned">Support Tickets Owned</label>
          <input id="supportTicketsOwned" type="number" min="0" value={supportTicketsOwned} onChange={(e)=>setSupportTicketsOwned(e.target.value)} />
        </div>
      </div>

      <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
        <button onClick={callBackendCalculate}>Tính (Server)</button>
      </div>

      <div className="result">
        {result ? (
          <>
            <p><strong>Kết quả tính toán:</strong></p>
            <p>Tổng ngày: <strong>{result.totalDays}</strong></p>
            <p>Carats:</p>
            <ul>
              <li>Daily: <strong>{result.earnedCarats - result.teamCarats - result.clubCarats - result.championCarats - result.lohCarats}</strong></li>
              <li>Team Trials: <strong>{result.teamCarats}</strong></li>
              <li>Club: <strong>{result.clubCarats}</strong></li>
              <li>Champion: <strong>{result.championCarats}</strong></li>
              <li>LoH: <strong>{result.lohCarats}</strong></li>
            </ul>
            <p>Tổng Carat: <strong>{result.finalTotalCarats}</strong></p>
            <p>Tổng Pull (300 carats/pull): <strong>{result.totalPulls}</strong></p>
            <p>Uma Tickets: <strong>{result.totalUmaTickets}</strong></p>
            <p>Support Tickets: <strong>{result.totalSupportTickets}</strong></p>
          </>
        ) : (
          <p>Nhấn "Tính (Server)" để xem kết quả.</p>
        )}
      </div>
    </section>
  )
}
