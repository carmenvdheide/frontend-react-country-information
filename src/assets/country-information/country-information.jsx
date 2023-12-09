import axios from "axios";
import {useState} from "react";
import './country-information.css'
import roundToMillions from "../../helpers/roundToMillions.js";

function CountryInformation() {
    const [data, setData] = useState(null)
    const [inputValue, setInputValue] = useState('')
    const [name, setName] = useState('')
    const [flagImage, setFlagImage] = useState('')
    const [subArea, setSubArea] = useState('')
    const [capital, setCapital] = useState('')
    const [population, setPopulation] = useState(0)
    const [amountNeighbors, setAmountNeighbors] = useState(0)
    const [domain, setDomain] = useState('')
    const [error, setError] = useState('')

   const handleEnter = (e) => {
        if (e.keyCode === 13) {
             void getCountryInformation()
        } else {
            return false
        }
   }
    async function getCountryInformation() {
        try {
            const result = await axios.get('https://restcountries.com/v3.1/name/' + inputValue)
            setError(!'error')
            setData(result.data[0])
            setName(result.data[0].name.common)
            setFlagImage(result.data[0].flags['png'])
            setSubArea(result.data[0]['subregion'])
            setCapital(result.data[0]['capital'])
            setPopulation(result.data[0]['population'])
            setAmountNeighbors(result.data[0]['borders'].length)
            setDomain(result.data[0]['tld'])
            console.log(result.data[0])
        } catch (e) {
            console.error(e)
            setError("error")

        }
    }

    return (

        <div className="search-and-info">

            <input
                type="text"
                name="serachArea"
                value={inputValue}
                onChange={(e) =>
                    setInputValue(e.target.value)}
                onKeyDown={handleEnter}
            />
            <button
                onClick={getCountryInformation}
                >
                SEARCH</button>

            {error ? <p>This country doesn't exist, try again.</p> : ''}
            {name ?
                <article>
                    <div className="top">
                        <span><img src={flagImage} alt="flag image"/></span>
                        <p>{name}</p>
                    </div>
                    <p className="country-info">{name} is situated in {subArea} and the capital is {capital}. It has a population of {roundToMillions(population)}  people and it borders with {amountNeighbors} neighboring countries. Websites can be found on {domain} domains.</p>
                </article>
                : ''}







        </div>

        )

}

export default CountryInformation