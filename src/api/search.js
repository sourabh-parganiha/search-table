import data from "../data/companyData.json"

//this will be replaced by actual api call if available
export const getCompanies = (searchValue) => {
    const filteredRows = data.filter((row) => {
        return row.company_name.toLowerCase().includes(searchValue.toLowerCase());
    });
    return filteredRows;
}