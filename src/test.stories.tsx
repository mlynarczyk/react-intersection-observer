import React from "react";
import { storiesOf } from "@storybook/react";

import {Test} from "./test";

storiesOf('test', module).add(
  'Default',
  () => (<Test/>)
);
