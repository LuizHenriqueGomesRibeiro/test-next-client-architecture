import { ApiClientInstanceType, PrimitiveClient } from "./services/api/client";
import { PrimitiveServer, ServerInstanceType } from "./services/api/server";

//@ts-ignore
const serverNextClientArchitecture: ServerInstanceType = new PrimitiveServer();
//@ts-ignore
const clientNextClientArchitecture: ApiClientInstanceType = new PrimitiveClient();

export { serverNextClientArchitecture, clientNextClientArchitecture };