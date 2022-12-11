import { useEffect, useState } from 'react'
import { ApiService } from '../utils/api.service'
import { DomainInfo, SystemMode } from '../utils/types'
import CurrentActiveTab from './components/CurrentActiveTab'
import { getCurrentTab, getStorage } from '../utils/chrome'
import GeneralDataCmp from './components/GeneralDataCmp'
import SystemModeButton from './components/SystemModeButton'
import { Loader } from './components/Loader'
function App() {

  const [mode, setMode] = useState<SystemMode>(SystemMode.LIGHT);
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
    <div data-mode={mode} className="relative">

      <div className="App dark:text-slate-50 dark:bg-slate-800">
        <div className='grid grid-cols-3 items-center py-2 px-2 border-b'>
          <SystemModeButton mode={mode} setMode={setMode} />
          <h1 className='text-sm   w-max'>Arpeely Extension data</h1>
        </div>
        <main className='px-6 py-2'>
          {!!domainInfos.length ?
           <CurrentActiveTab domainInfo={domainInfos[domainInfos.length - 1]} />:
           <div className='text-center text-sm min-h-[180px] grid place-content-center'>
            <Loader />
            </div>}
          <GeneralDataCmp />
        </main>
      </div>
    </div >
  )
}

export default App
