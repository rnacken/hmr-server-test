import React from "react";
import loadable from "@loadable/component";

export const LoadableFoo = loadable(() => import("./Foo.jsx"), {
  fallback: <i>Loading...</i>,
});
