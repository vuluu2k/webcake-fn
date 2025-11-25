function getSiteId() {
  if (typeof document !== 'undefined') {
    return document.documentElement.getAttribute('x:id');
  }
  return null;
}

class FunctionCall {
  constructor({ baseUrl } = {}) {
    const siteId = getSiteId();
    this.baseUrl = baseUrl || (siteId ? `/api/v1/${siteId}` : '/api/v1');
  }

  async callFn(method, functionName, ...args) {
    let url = `${this.baseUrl}/_functions/${functionName}`;
    let body;

    if (method == "GET") {
      const queryParams = new URLSearchParams();
      args.forEach((arg) => {
        queryParams.append(arg.name, arg.value);
      });
      url += `?${queryParams.toString()}`;
    } else {
      body = JSON.stringify({ args });
    }

    const options = {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    };

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async callFnResult(method, functionName, ...args) {
    const data = await this.callFn(method, functionName, ...args);
    return data.result;
  }
}

export default FunctionCall;