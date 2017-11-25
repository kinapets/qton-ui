import axios from 'axios';

class AzureService {
    // TODO use batch URL
    private uri = "https://ussouthcentral.services.azureml.net/workspaces/c303c51978ec47539ea201a965b485f1/services/3a723bedb34c411d9574a17865c61d30/execute?api-version=2.0&format=swagger";
    // TODO what is the secondary API key?
    private apiKey = "eSW8EOx29rROpwcBa9CRjaCho33gkxyKgUiRxrgZ0pJdMwcrBLbYJz/7+WstUWbMJB0tqMkbhTGzjRFKLZySlA==";

    constructor() {}

    fetch() {
        // TODO will be passed from the outside
        let sofaQuery = {
            "Inputs":
                {
                    "input1":
                        [{"sever": 1, "jih": 1, "zapad": 1, "vychod": 2, "ano/ne": ''},
                        {"sever": 3, "jih": 1, "zapad": 1, "vychod": '1', "ano/ne": ''}]
                },
            GlobalParameters: {}
        };

        axios({
            method: 'post',
            url: 'http://localhost:4000/sofa',
            data: sofaQuery
        }).then(response => response.data
            ).then(outputs => {
                // TODO prepare data for usage
                console.log(outputs);
            })
            .catch(e => {
                console.error(e);
            })
    }
}

export default new AzureService();