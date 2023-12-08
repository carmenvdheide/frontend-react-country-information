function areaColor(region) {

    switch (region) {
        case "Oceania":
            return "purple";
            break;
        case 'Africa':
            return "blue";
            break;
        case 'Europe':
            return "yellow";
            break;
        case 'Asia':
            return "red";
            break;
        case 'Americas':
            return "green";
            break;
        default:
            return "different"
    }
}

export default areaColor