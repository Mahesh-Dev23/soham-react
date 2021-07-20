
const getNames = async (dataName) => {

   let dataToFetch = `http://localhost:5000/${dataName}`

    const res = await fetch(dataToFetch)
    const fetchedData = await res.json()
    return fetchedData
}

export default getNames