import { generate } from "@devexperts/swagger-codegen-ts";
import { OpenapiObjectCodec } from "@devexperts/swagger-codegen-ts/dist/schema/3.0/openapi-object";
import { serialize } from "@devexperts/swagger-codegen-ts/dist/language/typescript/3.0";
import path from "path";

const spec = path.resolve(__dirname, "../swagger.json");
const out = path.resolve(__dirname, "src/generated");
const result = generate({
  spec: path.resolve(__dirname, "../swagger.json"),
  out: path.resolve(__dirname, "src/generated"),
  language: serialize,
  decoder: OpenapiObjectCodec,
});

console.log(spec);
console.log(out);
result().then(v => {
  console.log(v);
}).catch(e => {
  console.error(e);
});
