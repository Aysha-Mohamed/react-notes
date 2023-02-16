const useCreateDate = () =>{
    const dateObj = new Date();
    let monthName = dateObj.toLocaleString('en-US',{month:'short'});

    const date = `${monthName} ${dateObj.getDate()}, ${dateObj.getFullYear()} [${dateObj.getHours()}.${dateObj.getMinutes()}]`;
    return date;

}

export default useCreateDate;