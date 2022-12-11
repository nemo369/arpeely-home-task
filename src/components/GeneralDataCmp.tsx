import React, { useEffect, useState } from 'react'
import { loadGeneralData, resetGeneralData } from '../../utils/chrome'
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
            <div className='flex items-center gap-x-2 rounded px-2 bg-purple-100  text-yellow-800 dark:bg-slate-700 dark:text-yellow-200'>
                <h2 className='text-ellipsis whitespace-nowrap'>Unique URLs:</h2>
                <div className='text-lg text-black dark:text-white font-mono'> {data.uniqueUrls.length}</div>
            </div>
            <hr className='bg-stone-800 dark:bg-stone-100 w-px h-[20px] mx-4' />
            <div className='flex items-center gap-x-2 bg-purple-100 rounded px-2 text-blue-800  dark:bg-slate-700 dark:text-blue-200'>
                <h2 className='text-ellipsis whitespace-nowrap'>Unique Domains:</h2>
                <div className='text-lg text-black dark:text-white font-mono'> {data.uniqueDomains.length}</div>
            </div>
            <button
            onClick={() => {
                resetGeneralData();
                setData({
                    uniqueDomains: [],
                    uniqueUrls: [],
                })
            }}
            className='ml-1 rounded-full border grid place-content-center h-6 w-6'>
                <span className='sr-only'>reset data</span>
                <svg className="h-4 w-4 text-red-500 dark:text-red-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                </svg>

            </button>
        </section>
    )
}

export default GeneralDataCmp