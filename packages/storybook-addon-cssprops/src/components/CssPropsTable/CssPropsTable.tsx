import * as React from "react";
import { Icons } from "@storybook/components";
import { useInjectCustomProperties } from "./InjectCssProps";
import { CssPropRow } from "./CssPropRow";
import { CssPropTypes, CssProps } from "./types";
import {
  updateStorage,
  resetStorage,
  mergeCustomPropertiesWithStorage,
} from "./utils";
import { ResetWrapper } from "../typography/DocumentFormatting";
import {
  TableWrapper,
  ResetButton,
  CssPropsHeadingWrapper,
} from "./CssPropsTableStyles";

export interface CssPropsTableRowProps {
  customProperties: CssPropTypes;
  presetColors?: string[];
  inAddonPanel?: boolean;
}

export const CssPropsTable: React.FC<CssPropsTableRowProps> = ({
  customProperties = {},
  presetColors,
  inAddonPanel,
}) => {
  const [mergedCustomProperties, setMergedCustomProperties] = React.useState(
    mergeCustomPropertiesWithStorage(customProperties)
  );

  const handleResetProps = () => {
    const customPropertyKeys = Object.keys(customProperties);
    resetStorage(customPropertyKeys);
    setMergedCustomProperties(customProperties);
  };

  const handleUpdateStorage = (args: CssProps) => {
    const newStorage = updateStorage(args);
    setMergedCustomProperties(
      mergeCustomPropertiesWithStorage(mergedCustomProperties, newStorage)
    );
  };

  React.useEffect(() => {
    setMergedCustomProperties(
      mergeCustomPropertiesWithStorage(customProperties)
    );
  }, [customProperties]);

  useInjectCustomProperties(mergedCustomProperties);

  const common = {
    updateStorage: handleUpdateStorage,
    inAddonPanel,
    presetColors,
  };

  return (
    <ResetWrapper>
      <TableWrapper {...{ inAddonPanel }}>
        <thead>
          <tr>
            <th>CSS Custom Property</th>
            <th>Description</th>
            <th>
              <CssPropsHeadingWrapper>
                Value{" "}
                <ResetButton
                  onClick={handleResetProps}
                  title="Reset CSS Custom Props"
                >
                  <Icons icon="sync" aria-hidden />
                </ResetButton>
              </CssPropsHeadingWrapper>
            </th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(mergedCustomProperties).map((name) => {
            const row = {
              ...mergedCustomProperties[name],
              name,
            };
            return <CssPropRow key={name} row={row} {...common} />;
          })}
        </tbody>
      </TableWrapper>
    </ResetWrapper>
  );
};
