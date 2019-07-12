/**
 * Created by brasaeed on 05/07/2019.
 */

export interface LoginRequest {
  username: string;
  password: string;
  client_id: number;
  client_secret: string;
  grant_type: string;
}

export interface UserRequest {
  email: string;
  password: string;
  name: string;
}


