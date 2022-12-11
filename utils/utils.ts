export const getDomainWithoutSubdomain = (url:URL) => {
    const urlParts = url.hostname.split('.')
  
    return urlParts
      .slice(0)
      .slice(-(urlParts.length === 4 ? 3 : 2))
      .join('.')
  }

  export function uniqueArray<T>(arr: T[]) : T[]{
    return Array.from(new Set(arr));
  }