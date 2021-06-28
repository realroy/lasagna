import { Route } from "nest-router";
import { AuthenticationModule } from "./authentication/authentication.module";

export const routes: Route[] = [
  {
    path: '/auth',
    module: AuthenticationModule,
  }
]