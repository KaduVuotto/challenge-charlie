export const weatherDescriptions = (description: string) => {
    switch (description) {
        case "clear sky":
            return "Céu limpo";
        case "few clouds":
            return "Poucas nuvens";
        case "scattered clouds":
            return "Nuvens dispersas";
        case "broken clouds":
            return "Nuvens quebradas";
        case "shower rain":
            return "Chuva de ducha";
        case "rain":
            return "Chuva";
        case "thunderstorm":
            return "Trovoada";
        case "snow":
            return "Neve";
        case "mist":
            return "Névoa";
        case "light rain":
            return "Chuva leve";
        default:
            return description;
    }
};
