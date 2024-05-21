exports.getDate = () => {
    let date = new Date();
    const options = {weekday: "long", day:"numeric", month:"long"};
    let currentDate = date.toLocaleDateString("en-US", options)

    return currentDate;
}