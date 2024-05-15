import React from "react";
import "./styles.css";
import compass from "../../assets/meteocons-icons/44.svg";
import errorImage from "../../assets/meteocons-icons/16.svg";

import { HomeViewProps } from "./interface";

export const HomeView = ({
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
}: HomeViewProps) => {
    if (loading) {
        return (
            <div className="Home">
                <div className="Body">
                    <h1>Carregando...</h1>
                </div>
            </div>
        );
    }

    return (
        <div className="Home">
            <header className="Header">
                <div className="Header-Container">
                    <img src={compass} className="Compass" alt="compass" />
                    <input
                        className="Input"
                        type="text"
                        value={inputValue} // Valor do input é controlado pelo estado inputValue
                        onChange={handleInputChange} // Chama handleInputChange quando o input é alterado
                        onKeyDown={handleKeyDown} // Chama handleInputChange quando o input é alterado
                        placeholder="Digite aqui sua cidade!"
                    />
                </div>
            </header>
            {error ? (
                <div className="Body">
                    <div>
                        <img
                            src={errorImage}
                            className="Error-Icon"
                            alt="error-icon"
                        />
                        <h1>O tempo fechou!</h1>
                        <h1>
                            Algo deu errado ao pegar dados da localização ou
                            temperatura!
                        </h1>
                    </div>
                </div>
            ) : (
                <div className="Body">
                    {icon && (
                        <img
                            src={require(`../../assets/meteocons-icons/${icon}.svg`)}
                            className="Compass"
                            alt="compass"
                        />
                    )}

                    <div>
                        <p>HOJE</p>
                        <p>{temperature ? temperature : "N/A"}</p>
                        <p>{weather ? weather : "N/A"}</p>
                        <p>Vento: {wind ? wind : "N/A"}</p>
                        <p>Humidade: {humidity ? humidity : "N/A"}</p>
                        <p>Pressão: {pressure ? pressure : "N/A"}</p>
                    </div>
                </div>
            )}
            {error ? null : (
                <footer>
                    <div className="Footer-Tomorrow">
                        <div>
                            <p>AMANHÃ</p>
                            <p>{tomorrow ? tomorrow : "N/A"}</p>
                        </div>
                    </div>
                    <div className="Footer-After-Tomorrow">
                        <div>
                            <p>DEPOIS DE AMANHÃ</p>
                            <p>{afterTomorrow ? afterTomorrow : "N/A"}</p>
                        </div>
                    </div>
                </footer>
            )}
        </div>
    );
};
