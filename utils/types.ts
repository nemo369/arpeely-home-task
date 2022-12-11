export interface DomainInfo {
    rank: number;
    ip: string | null;
    location: string | null;
    country_code: string | null;
    organization: string | null;
    domain: string;
    fetchDate: number;
}

export interface GeneralData{
    uniqueUrls: string[];
    uniqueDomains: string[];
}

export enum SystemMode{
    DARK = 'dark',
    LIGHT = 'light',
} 