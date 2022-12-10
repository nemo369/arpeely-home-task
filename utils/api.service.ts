import { getStorage, setStorage } from "./chrome";
import { DomainInfo } from "./types";

export const ApiService = {
     getDomainInfo: async (domain:string) => {
        const cached = await getStorage(domain);
        if(cached[domain] && Date.now() - cached[domain].fetchDate < 1000 * 60 * 60 * 24){
            return cached[domain];
        }
        return fetch(`https://hw.arpeely.ai/domain/info?domain=${domain}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Best-Pokemon':'charizard'  //favorite Pokémon's name
            },
        })
            .then(response => response.json())
            .then(data => {
                const res=  {...data, domain, fetchDate:Date.now()} as DomainInfo
                setStorage(domain, res);
                return res;
            });
    }
}