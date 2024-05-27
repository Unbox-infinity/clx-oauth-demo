const baseURL = "https://clx-webx-authorization-server.dev.unboxuniverse.io"
const clientId = "35d4cd71-ef6c-4ddc-9418-8f7e673a1c34"
export interface PostTokenPayload {
  grant_type: string;
  code: string;
  client_id: string;
  code_verifier: string;
}

export const authorizeServer = async (code_challenge: any) => {
  const params: any = {
    response_type: 'code',
    client_id: clientId,
    code_challenge,
    code_challenge_method: 'S256',
    scope: 'openid',
  };

  try {
    const stringParams = Object.keys(params)
      .map(p => `${p}=${params[p]}`)
      .join('&');

    const fullUrlRequest = `${baseURL}/oauth2/authorize?${stringParams}`
    console.log({
      fullUrlRequest
    })
    const result = await fetch(fullUrlRequest, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });
    const response = await result.json();
    if (response?.error){
      console.log({
        response
      })
      throw {
        message: response?.error_description
      }
    }
    return response;
  } catch (error) {
    throw error;
  }
};