import { useEffect, useState } from 'react';

export function useCountryFlags() {
  const [isLoading, setIsLoading] = useState(true);
  const [countryFlags, setCountryFlags] = useState([]);

  useEffect(() => {
    const fetchCountryFlags = async () => {
      try {
        const res = await fetch('https://flagcdn.com/en/codes.json');
        const data = await res.json();
        const dataObj = Object.entries(data).map(([code, name]) => ({
          code,
          flagUrl: `https://flagcdn.com/${code}.svg`,
          name,
        }));
        setCountryFlags(dataObj);
      } catch (error) {
        console.error(error);
        throw new Error('There was an error while fetching country flags');
      } finally {
        setIsLoading(false);
      }
    };
    fetchCountryFlags();
  }, []);

  return { isLoading, countryFlags };
}
