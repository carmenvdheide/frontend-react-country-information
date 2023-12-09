function roundToMillions(number) {

        return (
                Math.abs(number) >= 1.0e+6
                ? Math.round(Math.abs(number) / 1.0e+6) + ' million'
                : Math.abs(number) >= 1.0e+3
                    ? Math.round(Math.abs(number) / 1.0e+3) + " thousand"
                    : Math.abs(number)
        )

    }




export default roundToMillions