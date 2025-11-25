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

  async callFn(method, functionName, params) {
    const methodLower = method.toLowerCase();
    let url = `${this.baseUrl}/_functions/${functionName}`;
    let body;

    if (methodLower === "get") {
      const queryParams = new URLSearchParams();
      queryParams.append('params', JSON.stringify(params));
      url = `${url}?${queryParams.toString()}`;
    } else {
      body = JSON.stringify({ params });
    }

    const options = {
      method: methodLower,
      headers: {
        "Content-Type": "application/json",
      },
    };

    // Only add body for non-GET requests
    if (body) {
      options.body = body;
    }

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async callFnResult(method, functionName, params) {
    const data = await this.callFn(method, functionName, params);
    return data.data?.result;
  }
}

export default FunctionCall;