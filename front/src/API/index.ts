export function checkResponseJSON(res: Response) {
  if (!res.ok) {
    return Promise.reject(res);
  }
  return res.json();
}
