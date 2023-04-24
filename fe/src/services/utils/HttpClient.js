import APIError from "../../errors/APIError";
class HttpClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async makeRequest(path, options) {
    const headers = new Headers();

    if (options.body) {
      headers.append("Content-Type", "application/json");
    }

    if (options.headers) {
      //Se o objeto enviado nas opções tiver cabeçalhos, adicionamos esses cabeçalhos no header instanciado
      Object.entries(options.headers).forEach(([key, value]) => {
        headers.append(key, value);
      });
    }

    const response = await fetch(`${this.baseURL}${path}`, {
      method: options.method,
      body: JSON.stringify(options?.body),
      headers,
    });

    //Iniciamos a variável para receber o corpo da resposta, caso tenha
    let responseBody = null;

    //Pegamos o tipo do conteúdo da resposta usando o método .get() do cabeçado
    const contentType = response.headers.get("Content-Type");

    if (contentType?.includes("application/json")) {
      responseBody = await response.json();
    }

    if (response.ok) {
        return responseBody;
    }

    throw new APIError(response, responseBody);
  }


  get(path, options) {
    return this.makeRequest(path, {
      method: "GET",
      headers: options?.headers,
    });
  }

  post(path, options) {
    return this.makeRequest(path, {
      method: "POST",
      body: options?.body,
      headers: options?.headers,
    });
  }

  put(path, options) {
    return this.makeRequest(path, {
      method: "PUT",
      body: options?.body,
      headers: options?.headers,
    });
  }

  delete(path, options) {
    return this.makeRequest(path, {
      method: 'DELETE',
      headers: options?.headers,
    })
  }
}

export default HttpClient;