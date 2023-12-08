import './App.css';
import axios from "axios";
import {useState} from "react";
import areaColor from "./helpers/areaColor.js";

// onClick verandert de classname van de button en de info over de landen
// --> button gaat weg en landen worden getoond



function App() {
    const [data, setData] = useState(null)
    const [sortedData, setSortedData] = useState(null)
    const [display, setDisplay] = useState('start')


    function handleColor(region) {
        const color = areaColor(region)
        return color
    }

    async function allCountries() {
        try {
            const result = await axios.get('https://restcountries.com/v3.1/all')
            setData(result.data)
            setSortedData(data.sort((a, b) => {
                return a['population'] - b['population']
            }))
            console.log(result.data)
            setDisplay('dont-display')
        } catch (e) {
            console.error(e)
        }
    }


    return (
        <>
            <body>
                <button
                    className={display}
                    type="button"
                    onClick={allCountries}>
                    show countries
                </button>

                <ul>
                    {
                        sortedData ? sortedData.map((country) => {
                            return (
                                <li className="country-card" key={country['ccn3']}>
                                    <img src={country.flags['png']}/>
                                    <div>
                                        <h3 className={handleColor(country.region)
                                        }>{country.name.common}</h3>
                                        <p>Has a population of {country['population']} people</p>
                                    </div>
                                </li>
                            )
                        }) : ""
                    }
                </ul>





            </body>

        </>
    )
}

export default App
