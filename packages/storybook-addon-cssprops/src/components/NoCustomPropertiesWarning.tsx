import * as React from "react";
import { styled } from "storybook/theming";
import { Link } from "storybook/internal/components";

const NoCustomPropertiesWrapper = styled.div(({ theme }) => ({
  background: theme.background.app,
  padding: "10px 15px",
  lineHeight: "20px",
  boxShadow: `${theme.appBorderColor} 0 -1px 0 0 inset`,
}));

export const NoCustomPropertiesWarning = () => (
  <NoCustomPropertiesWrapper>
    This story is not configured with CSS Custom Properties.&nbsp;
    <Link
      href="https://github.com/ljcl/storybook-addon-cssprops/blob/main/README.md#adding-custom-properties"
      target="_blank"
      cancel={false}
    >
      Learn how to add css custom properties »
    </Link>
  </NoCustomPropertiesWrapper>
);
