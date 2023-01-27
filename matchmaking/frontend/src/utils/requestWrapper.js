/**
 * @description This function replicates the functionality of Axios on a minimal scale.
 *              Generated using ChatGPT!
 *
 * @param options Options to configure this instance
 * @returns apiInstance
 */

const createApiInstance = (options = {}) => {
  const defaultOptions = {
    headers: { "Content-Type": "application/json" },
    baseURL: "",
    requestInterceptor: (config) => config,
    responseInterceptor: (response) => response,
  };

  const axiosFetch = async (requestOptions) => {
    let config = { ...defaultOptions, ...options, ...requestOptions };
    config = defaultOptions.requestInterceptor(config);
    const { method = "get", url, data } = config;
    let body;
    if (data) {
      body = JSON.stringify(data);
    }
    const finalUrl = defaultOptions.baseURL + url;
    return fetch(finalUrl, { method, headers, body })
      .then((response) => response.json())
      .then((responseData) => defaultOptions.responseInterceptor(responseData));
  };

  return {
    create: (url, data) => axiosFetch({ method: "post", url, data }),
    get: (url) => axiosFetch({ method: "get", url }),
    update: (url, data) => axiosFetch({ method: "put", url, data }),
    remove: (url) => axiosFetch({ method: "delete", url }),
    custom: (options) => axiosFetch(options),
  };
};

export const api = createApiInstance({ baseURL: "http://localhost:5005" });
