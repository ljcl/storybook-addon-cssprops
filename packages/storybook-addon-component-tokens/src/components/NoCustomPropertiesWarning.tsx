import { styled } from "@storybook/theming";
import { Link } from "@storybook/components";

const NoCustomPropertiesWrapper = styled.div(({ theme }) => ({
  background: theme.background.warning,
  color: theme.color.darkest,
  padding: "10px 15px",
  lineHeight: "20px",
  boxShadow: `${theme.appBorderColor} 0 -1px 0 0 inset`,
}));

export const NoCustomPropertiesWarning = () => (
  <NoCustomPropertiesWrapper>
    This story is not configured with Component Tokens.&nbsp;
    <Link
      href="https://github.com/kickstartds/storybook-addon-component-tokens/blob/main/README.md#usage"
      target="_blank"
      cancel={false}
    >
      Learn how to add Component Tokens »
    </Link>
  </NoCustomPropertiesWrapper>
);
