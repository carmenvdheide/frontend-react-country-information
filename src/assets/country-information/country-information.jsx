import axios from "axios";
import {useState} from "react";
import './country-information.css'
import roundToMillions from "../../helpers/roundToMillions.js";

function CountryInformation() {
    const [data, setData] = useState(null)
    const [inputValue, setInputValue] = useState('')
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

            console.log(result.data[0])
            console.log(result)
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
            {data ?
                <article>
                    <div className="top">
                        <span><img
                            id="img-country-information"
                            src={data.flags['png']}
                            alt="flag image"/></span>
                        <p>{data.name.common}</p>
                    </div>
                    <p className="country-info">{data.name.common} is situated in {data['subregion']} and the capital is {data['capital']}. It has a population of {roundToMillions(data['population'])}  people and it borders with {data['borders'].length} neighboring countries. Websites can be found on {data['tld']} domains.</p>

                </article>
                : ''}
        </div>
    )
}

export default CountryInformation