import FunctionCall from "./FunctionCall.js";

function parse(fnName) {
  const [method, ...rest] = fnName.split("_");
  const funcName = rest.join("_");
  return { method, funcName };
}

const functionCall = new FunctionCall();

const api = new Proxy(
  {},
  {
    get(_, fnName) {
      return (params) => {
        const { method, funcName } = parse(fnName);
        return functionCall.callFnResult(method, funcName, params);
      };
    },
  }
);

export default api;
