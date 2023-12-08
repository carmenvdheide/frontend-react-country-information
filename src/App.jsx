import './App.css';
import axios from "axios";
import {useState} from "react";
import areaColor from "./helpers/areaColor.js";

// onClick verandert de classname van de button en de info over de landen
// --> button gaat weg en landen worden getoond



function App() {

    const [countries, setCountries] = useState('')
    const [populationNumber, setPopulationNumber] = useState(0)
    const [region, setRegion] = useState('')
    const [regionColor, setRegionColor] = useState('')
    const [flag, setFlag] = useState('')


    function handleColor(region) {

        const color = areaColor(region)
        setRegionColor(color)
    }

    async function allCountries() {
        try {

            const result = await axios.get('https://restcountries.com/v3.1/all')



            const dataMapped = result.data.map((info) => {
                setCountries(info.name.common)
                setPopulationNumber(info['population'])
                setFlag(info.flags.svg)
                setRegion(info['region'])
                {handleColor(info['region'])}


                return (
                        <li className="country-card">
                            <img src={flag}/>
                            <div>
                                <h3 className={regionColor}>{countries}</h3>
                                <p>Has a population of {populationNumber} people</p>
                            </div>
                        </li>


                )
            })



            console.log(result.data)
            console.log(result.data[0].flags.svg)
            // setCountries(result.data[0].name.common)
            // setPopulationNumber(result.data[0]['population'])
            // setRegion(result.data[0]['region'])
            // setFlag(result.data[0].flags.svg)

            // {handleColor(result.data[0]['region'])}




        } catch (e) {
            console.error(e)
        }


    }


    return (
        <>

            <body>
                <button
                    type="button"
                    onClick={allCountries}>
                    Go!
                </button>
                <ul> {
                            allCountries
                        }
                </ul>
                <ul>
                    <li className="country-card">
                        <img src={flag}/>
                        <div>
                            <h3 className={regionColor}>{countries}</h3>
                            <p>Has a population of {populationNumber} people</p>
                        </div>

                    </li>
                </ul>

            <ul>

            </ul>


            </body>

        </>
    )
}

export default App
