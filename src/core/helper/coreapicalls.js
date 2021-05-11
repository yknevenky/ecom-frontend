import { API } from "../../backend";

export const getProducts = () => {
  return fetch(`${API}/products`, { method: "GET" })
    .then((response) => {
      console.log("res", response);
      return response.json();
    })
    .catch((err) => {
      console.log(err, "hey hey");
      return err;
    });
};
