import { useEffect, useState } from 'react'
import { ApiService } from '../utils/api.service'
import { DomainInfo } from '../utils/types'
import CurrentActiveTab from './components/CurrentActiveTab'
import { getCurrentTab, getStorage } from '../utils/chrome'
import GeneralDataCmp from './components/GeneralDataCmp'
function App() {

  const [mode, setMode] = useState<'dark' | 'light'>('light');
  const [domainInfos, setDomainInfo] = useState<DomainInfo[]>([])
  const fetchCurrentTab = async (tab: string) => {
    if (!tab) return;
    const domainInfo = await ApiService.getDomainInfo(tab);
    setDomainInfo([...domainInfos, domainInfo]);
  }
  const getCacheData = async () => {
    const cachedDomainInfos = await getStorage('')
    if (cachedDomainInfos) {
      setDomainInfo(Object.values(cachedDomainInfos))
    }
  }
  useEffect(() => {
    getCacheData();
    getCurrentTab().then((tab) => {
      if (tab) {
        fetchCurrentTab(tab)
      }
    });
  }, [])

  return (
    <div data-mode={mode}>
      <button className='rounded-full absolute top-1.5 left-2 text-white dark:text-black  bg-slate-800 dark:bg-slate-100 p-1' onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}>
        {mode === 'dark' ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
        </svg>
          : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
          </svg>
        }
      </button>
      <div className="App dark:text-slate-50 dark:bg-slate-800">
        <h1 className='text-sm text-center px-6 py-2 border-b '> Arpeely Extension data</h1>
        <main className='px-6 py-2'>
          {!!domainInfos.length && <CurrentActiveTab domainInfo={domainInfos[domainInfos.length - 1]} />}
          <GeneralDataCmp />
        </main>
      </div>
    </div >
  )
}

export default App
