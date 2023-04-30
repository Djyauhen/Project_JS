import {CustomHttp} from "./custom-http.js";
import config from "../../config/config.js";

export class GetOperations {
    constructor(date) {
      return this.getOperations(date).then();
    }

    async getOperations(date) {
        return await CustomHttp.request(config.host + '/operations?' + date);
    }
}