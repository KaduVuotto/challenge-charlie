import React from "react";
import { HomeView } from "./HomeView";
import { useHomeViewModel } from "./useHomeViewModel";

export const Home = () => {
    const {
        afterTomorrow,
        city,
        error,
        handleInputChange,
        handleKeyDown,
        humidity,
        icon,
        inputValue,
        loading,
        pressure,
        temperature,
        tomorrow,
        weather,
        wind,
    } = useHomeViewModel();
    return (
        <HomeView
            afterTomorrow={afterTomorrow}
            city={city}
            error={error}
            handleInputChange={handleInputChange}
            handleKeyDown={handleKeyDown}
            humidity={humidity}
            inputValue={inputValue}
            icon={icon}
            loading={loading}
            pressure={pressure}
            temperature={temperature}
            tomorrow={tomorrow}
            weather={weather}
            wind={wind}
        />
    );
};
