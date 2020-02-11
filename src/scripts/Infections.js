const cheerio = require('cheerio'),
      axios = require('axios'),
      mainUrl = 'https://www.worldometers.info/coronavirus/';
/** 
@function getInfections 
 * @param {string} country Country name , can be 'All'
 * @example <caption>Example about viewing infextion stats on all countries</caption>   
   corona_tracker.getInfections('All').then(r=>{
    console.log(r);
   }).catch(e=>{
    console.log(e);
   });
 * @returns {Promise} Promise object represents the array of stats
*/
getInfections = async (country) => {
    return axios.get(mainUrl).then(response => {
        const $ = cheerio.load(response.data),
            data = [];
        switch (country) {
            case 'All':
                $('#table3 > tbody').children().each((i, tr) => {
                    data.push({
                        country: $(tr).find('td:nth-child(1)').text(),
                        totalCases: $(tr).find('td:nth-child(2)').text(),
                        febCases: $(tr).find('td:nth-child(3)').text(),
                        totalDeaths: $(tr).find('td:nth-child(4)').text(),
                        febDeaths: $(tr).find('td:nth-child(5)').text(),
                        totalRecovered: $(tr).find('td:nth-child(6)').text(),
                        totalSevere: $(tr).find('td:nth-child(7)').text(),
                        continent: $(tr).find('td.hidden').text()
                    });
                });
                return data;
                break;
            default:
                $('#table3 > tbody').children().each((i, tr) => {
                    if ($(tr).find('td:nth-child(1)').text().replace(' ', '') === country) {
                        data.push({
                            country: $(tr).find('td:nth-child(1)').text(),
                            totalCases: $(tr).find('td:nth-child(2)').text(),
                            febCases: $(tr).find('td:nth-child(3)').text(),
                            totalDeaths: $(tr).find('td:nth-child(4)').text(),
                            febDeaths: $(tr).find('td:nth-child(5)').text(),
                            totalRecovered: $(tr).find('td:nth-child(6)').text(),
                            totalSevere: $(tr).find('td:nth-child(7)').text(),
                            continent: $(tr).find('td.hidden').text()
                        });
                    };
                });
                if (data.length < 1) throw new Error('Country not found');
                return data;
        };
    });
}
module.exports = getInfections;