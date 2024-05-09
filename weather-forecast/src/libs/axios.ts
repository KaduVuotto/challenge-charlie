import axios from "axios";

export const backgroundImage = axios.create({
    baseURL:
        "https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=pt-BR",
});

export const weatherForecast = axios.create({
    baseURL: "http://api.openweathermap.org/data/2.5/",
});

export const weatherForecastId = "772920597e4ec8f00de8d376dfb3f094";

export const openCage = axios.create({
    baseURL: "https://api.opencagedata.com/geocode/v1/",
});

export const openCageKey = "c63386b4f77e46de817bdf94f552cddf";
