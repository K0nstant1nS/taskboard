import { checkResponseJSON } from "..";
import { TLoginData } from "../../types/user";
import { API_BASE_URL } from "../../utils/config";
import { getAccessToken } from "../../utils/cookies";

export function loginAPI({email, password}: TLoginData) {
  return fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': getAccessToken()
    },
    body: JSON.stringify({email, password}),
  }).then(checkResponseJSON)
}
