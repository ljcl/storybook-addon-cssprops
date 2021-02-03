import * as React from "react";
import { styled } from "@storybook/theming";
import { CssPropType, CssProps } from "./types";
import { CssPropControl, CssPropControlProps } from "./CssPropControl";
import { codeCommon } from "../typography/shared";

export interface CssPropRowProps {
  row: CssPropType;
  presetColors?: string[];
  updateStorage?: (args: CssProps) => void;
}

const Name = styled.code(({ theme }) => ({
  fontWeight: "bold",
  textAlign: "left",
  ...codeCommon({ theme }),
}));

const Description = styled.div(({ theme }) => ({
  "&&": {
    p: {
      margin: "0 0 10px 0",
    },
    a: {
      color: theme.color.secondary,
    },
  },

  code: codeCommon({ theme }),

  "& code": {
    margin: 0,
    display: "inline-block",
  },
}));

const StyledTd = styled.td(() => ({
  paddingLeft: "20px !important",
}));

export const CssPropRow: React.FC<CssPropRowProps> = (props) => {
  const { row, updateStorage } = props;
  const { name, description } = row;
  const hasDescription = description != null && description !== "";

  return (
    <tr>
      <StyledTd>
        <Name>--{name}</Name>
      </StyledTd>
      <td>{hasDescription && <Description>{description}</Description>}</td>
      <td>
        {updateStorage ? (
          <CssPropControl {...(props as CssPropControlProps)} />
        ) : null}
      </td>
    </tr>
  );
};
