
import * as client from "../swagger-client";


async function main() {
  client.GeneralEndpointsApiAxiosParamCreator(new client.Configuration()).poolsGet();
}

main();