import {resquest} from "./request";

export function getHomeMultidata() {
  return resquest({
    url: './home/multidata'
  })

}
