export const setLocalStorage = (name: string, data: any) => {
  localStorage.setItem(name, JSON.stringify(data));
};
export const getLocalStorage = (name: string) => {
  const data = localStorage.getItem(name);
  if (data) {
    return JSON.parse(data);
  }
  return undefined;
};

export const removeLocalStorage = (name: string) => {
  localStorage.removeItem(name);
};
