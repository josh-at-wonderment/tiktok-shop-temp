import { Request } from "express";

export interface VerifiedRequest extends Request {
  auth0CallerAppClientID?: string;
  auth0OrgID?: string;
}
