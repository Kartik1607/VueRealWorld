/*
bio: null
createdAt: "2019-10-11T10:56:06.819Z"
email: "kartik.sharma@nagarro.com"
id: 70813
image: null
token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NzA4MTMsInVzZXJuYW1lIjoia2FydGlrc2hhcm1hIiwiZXhwIjoxNTc1OTc1MzY2fQ.UBMZ7T2oRcymL-NjKa_jQOeQspzRBhZ2AAZFaZkd55A"
updatedAt: "2019-10-11T10:56:06.824Z"
username: "kartiksharma"
*/

export interface User {
  bio: string;
  email: string;
  id: number;
  image: string;
  token: string;
  updatedAt: Date;
  username: string;
}
