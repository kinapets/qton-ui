import axios from 'axios';

class AzureService {
    // TODO use batch URL
    // private uri = "https://ussouthcentral.services.azureml.net/workspaces/c303c51978ec47539ea201a965b485f1/services/3a723bedb34c411d9574a17865c61d30/execute?api-version=2.0&format=swagger";
    // private uri = "https://ussouthcentral.services.azureml.net/workspaces/c303c51978ec47539ea201a965b485f1/services/85fe491058004635b4b6d5512883c375/execute?api-version=2.0&format=swagger";
    // TODO what is the secondary API key?
    // private apiKey = "eSW8EOx29rROpwcBa9CRjaCho33gkxyKgUiRxrgZ0pJdMwcrBLbYJz/7+WstUWbMJB0tqMkbhTGzjRFKLZySlA==";

    constructor() {}

    fetchDataForSofa(flattenDistances: any[]) {
        // add "Label" option needed by Azure
        flattenDistances = flattenDistances.map(distance => {
            return {...distance, "ano/ne": ""}
        });

        let sofaQuery = {
            "Inputs":
                {
                    "input1":
                        [...flattenDistances
                            // TESTING DATA
                            //     {"sever": 1, "jih": 1, "zapad": 1, "vychod": 2, "ano/ne": ''},
                            // {"sever": 3, "jih": 1, "zapad": 1, "vychod": '1', "ano/ne": ''}
                        ]
                },
            GlobalParameters: {}
        };

        return axios({
            method: 'post',
            url: 'http://localhost:4000/sofa',
            data: sofaQuery
        })
        .then(response => response.data)
        .catch(e => {
                console.error(e);
            })
    }
}

export default new AzureService();