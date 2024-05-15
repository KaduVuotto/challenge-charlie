import { useEffect, useState } from "react";
import { HomeViewProps, WeatherData } from "./interface";
import { openCage, openCageKey } from "../../libs/axios/openCage";
import {
    weatherForecast,
    weatherForecastId,
} from "../../libs/axios/weatherForecast";
import { kelvinToCelsius } from "../../functions/kelvinToCelsius";
import { mphToKmh } from "../../functions/mphToKmh";
import { weatherDescriptions } from "../../functions/weatherDescriptions";
import { weatherIcons } from "../../functions/weatherIcons";

export const useHomeViewModel = (): HomeViewProps => {
    const [weatherData, setWeatherData] = useState<WeatherData>({
        afterTomorrow: "",
        city: "",
        humidity: "",
        icon: "",
        pressure: "",
        temperature: "",
        tomorrow: "",
        weather: "",
        wind: "",
    });
    const [error, setError] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>("");

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleKeyDown = async (
        event: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (event.key === "Enter") {
            getInformationFromLocationInput(inputValue);
        }
    };

    const getInformationFromLocationInput = async (locationName: string) => {
        try {
            if (locationName) {
                const response = await weatherForecast.get(
                    `weather?q=${locationName}&APPID=${weatherForecastId}`
                );
                console.log("response", response);
                const { coord } = response.data;
                await getLocationName(coord.lat, coord.lon);
            }
        } catch (error) {
            console.log(`Erro ao obter previsão do tempo: ${error}`);
            setError(true);
        }
    };

    const getLocation = () => {
        setError(false);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    await getLocationName(latitude, longitude);
                },
                (error) => {
                    console.log(`Erro ao obter a localização: ${error}`);
                    setError(true);
                }
            );
        } else {
            console.log("Geolocalização não suportada neste navegador.");
            setError(true);
        }
    };

    const getLocationName = async (latitude: number, longitude: number) => {
        try {
            const response = await openCage.get(
                `json?key=${openCageKey}&q=${latitude}%2C${longitude}&pretty=1&no_annotations=1`
            );
            const { state, city } = response.data.results[0].components;
            setWeatherData((prevData) => ({
                ...prevData,
                state,
                city: city,
            }));
            setInputValue(`${state}, ${city}`);
            await getWeather(state);
        } catch (error) {
            console.log(`Erro ao obter o nome da localização: ${error}`);
            setError(true);
        }
    };

    const getTomorrowAndAfterWeather = async (locationName: string) => {
        try {
            if (locationName) {
                const response = await weatherForecast.get(
                    `forecast?q=${locationName}&appid=${weatherForecastId}`
                );
                console.log("response", response);
                const { list } = response.data;
                setWeatherData((prevData) => ({
                    ...prevData,
                    tomorrow: kelvinToCelsius(Number(list[3].main.temp)),
                    afterTomorrow: kelvinToCelsius(Number(list[11].main.temp)),
                }));
            }
        } catch (error) {
            console.log(`Erro ao obter previsão do tempo: ${error}`);
            setError(true);
        }
    };

    const getWeather = async (locationName: string) => {
        try {
            if (locationName) {
                const response = await weatherForecast.get(
                    `weather?q=${locationName}&APPID=${weatherForecastId}`
                );
                const { main, weather, wind } = response.data;
                setWeatherData((prevData) => ({
                    ...prevData,
                    humidity: `${main.humidity}%`,
                    pressure: `${main.pressure}hPA`,
                    temperature: kelvinToCelsius(Number(main.temp)),
                    weather: weatherDescriptions(weather[0].description),
                    icon: weatherIcons(weather[0].description),
                    wind: mphToKmh(Number(wind.speed)),
                    loadingWeather: false,
                }));
                await getTomorrowAndAfterWeather(locationName);
            }
        } catch (error) {
            console.log(`Erro ao obter previsão do tempo: ${error}`);
            setError(true);
        }
    };

    useEffect(() => {
        getLocation();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        ...weatherData,
        error,
        inputValue,
        handleInputChange,
        handleKeyDown,
        loading:
            !weatherData.city ||
            !weatherData.temperature ||
            !weatherData.weather,
    };
};
