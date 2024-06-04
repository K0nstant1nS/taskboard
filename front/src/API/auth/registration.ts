import { checkResponseJSON } from "..";
import { TRegistrationData } from "../../types/user";
import { API_BASE_URL } from "../../utils/config";
import { getAccessToken } from "../../utils/cookies";

export function registrationAPI({email, password, name}: TRegistrationData) {
  return fetch(`${API_BASE_URL}/user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': getAccessToken()
    },
    body: JSON.stringify({email, password, name}),
  }).then(checkResponseJSON)
}
