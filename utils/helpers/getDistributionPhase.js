import { SNOB_API } from "utils/constants/common";


const getCurrentDistributionPhase = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var graphql = JSON.stringify({
        query: "{CurrentDistributionPhase{\r\n  startDate\r\n  nextDate\r\n  snobDistributed\r\n}\r\n}",
        variables: {}
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: graphql,
        redirect: 'follow'
    };

    return await fetch(SNOB_API, requestOptions)
    .then(function (response) {
      return response.json();
    }).then(function (info) {
      return info.data.CurrentDistributionPhase;
    }).catch(function (err) {
      console.log('error querying data from api', err);
    });
    

};

export default getCurrentDistributionPhase