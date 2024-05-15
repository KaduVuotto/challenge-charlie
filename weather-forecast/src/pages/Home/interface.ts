export interface HomeViewProps {
    afterTomorrow: string;
    city: string;
    error: boolean;
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    humidity: string;
    icon: string;
    inputValue: string;
    loading: boolean;
    pressure: string;
    temperature: string;
    tomorrow: string;
    weather: string;
    wind: string;
}

export interface WeatherData {
    afterTomorrow: string;
    city: string;
    humidity: string;
    icon: string;
    pressure: string;
    temperature: string;
    tomorrow: string;
    weather: string;
    wind: string;
}

export type Location = {
    latitude: number | null;
    longitude: number | null;
};
