import { DomainInfo, GeneralData } from "./types";
import {getDomainWithoutSubdomain, uniqueArray} from "./utils";

const MAIN_KEY = 'domainInfos/v1'
const GLOBAL_DATA = 'uniqUrlsAndDomains/v'

async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  if (tab && tab.url) {
    const url = new URL(tab.url);
    saveGeneralData(url);
    return url.hostname;
  }
  return null;
}

async function getStorage(key: string): Promise<{ [key: string]: DomainInfo }> {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(MAIN_KEY, (result) => {
      if (result[MAIN_KEY]) {
        if (key) {
          resolve(result[MAIN_KEY][key]);
        } else {
          resolve(result[MAIN_KEY]);
        }
      } else {
        resolve({});
      }
    });
  });
}

async function setStorage(key: string, value: any) {
  const all = await getStorage('');
  if (Object.values(all).length > 10) {
    delete all[Object.keys(all)[10]];
  }
  const newData = { ...all, [key]: value };
  return new Promise((resolve, reject) => {
    chrome.storage.local.set(newData, () => {
      resolve(newData);
    });
  });
}


async function loadGeneralData(): Promise<GeneralData> {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get([GLOBAL_DATA], (result) => {
      if (result && result[GLOBAL_DATA]) {
        resolve(result[GLOBAL_DATA]);
      } else {
        resolve({
          uniqueUrls: [],
          uniqueDomains: [],
        });
      }
    })
  });
}

function resetGeneralData() {
  
  chrome.storage.sync.set(
    {
      [GLOBAL_DATA]: {
        uniqueUrls: [],
        uniqueDomains: [],
      }
    }
  )
}
async function saveGeneralData(url: URL) {
  const data = await loadGeneralData();
  
  const { uniqueUrls, uniqueDomains } = data;
  chrome.storage.sync.set(
    {
      [GLOBAL_DATA]: {
        uniqueUrls: uniqueArray([...uniqueUrls, url.href]),
        uniqueDomains: uniqueArray([...uniqueDomains, getDomainWithoutSubdomain(url)]),
      }
    }
  ).then(() => {
    console.log('saved');
  });
}
export {
  getCurrentTab,
  getStorage,
  setStorage,
  loadGeneralData,
  resetGeneralData,
}