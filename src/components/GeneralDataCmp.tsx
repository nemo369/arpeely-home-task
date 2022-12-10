import React, { useEffect, useState } from 'react'
import { loadGeneralData } from '../../utils/chrome'
import { GeneralData } from '../../utils/types'

function GeneralDataCmp() {
    const [data, setData] = useState<GeneralData>({
        uniqueDomains: [],
        uniqueUrls: [],
    })
    const getInfo = async () => {
        const generalData = await loadGeneralData();
        setData(generalData);
    }
    useEffect(() => {
        getInfo()
    }, [])

    return (
        <section className='flex items-center justify-center mx-auto'>
            <div className='flex items-center gap-x-2 rounded px-2 bg-slate-400  text-yellow-800 dark:bg-slate-800 dark:text-yellow-200'>
                <h2 className='text-ellipsis whitespace-nowrap'>Unique URLs:</h2>
                <div className='text-lg text-black dark:text-white font-mono'> {data.uniqueUrls.length}</div>
            </div>
            <hr className='bg-stone-800 dark:bg-stone-100 w-px h-[20px] mx-4'/>
            <div className='flex items-center gap-x-2 bg-slate-400 rounded px-2 text-blue-800  dark:bg-slate-800 dark:text-blue-200'>
                <h2 className='text-ellipsis whitespace-nowrap'>Unique Domains:</h2>
                <div className='text-lg text-black dark:text-white font-mono'> {data.uniqueDomains.length}</div>
            </div>
        </section>
    )
}

export default GeneralDataCmp