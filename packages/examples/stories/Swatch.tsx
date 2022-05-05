interface SwatchProps {
  name: string;
  size?: string;
}

export const Swatch = ({ name = "", size = "12rem" }: SwatchProps) => {
  return (
    <div
      style={{
        display: "inline-flex",
        flexDirection: "column",
        boxShadow: "0 1px 2px rgba(0, 0, 0, .2)",
        borderRadius: `0.5rem`,
        overflow: "hidden",
        fontSize: "85%",
        fontFamily: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
        background: "white",
        margin: "var(--css-custom-property-3, '1vh') 0",
      }}
    >
      <div
        style={{
          background: `linear-gradient(45deg, rgba(43, 40, 38, 0.1) 25%, transparent 0),
          linear-gradient(-45deg, rgba(43, 40, 38, 0.1) 25%, transparent 0),
          linear-gradient(45deg, transparent 75%, rgba(43, 40, 38, 0.1) 0),
          linear-gradient(-45deg, transparent 75%, rgba(43, 40, 38, 0.1) 0)`,
          backgroundSize: `12px 12px`,
          backgroundPosition: `0 0, 0 6px, 6px -6px, -6px 0`,
          width: `${size}`,
          height: `${size}`,
        }}
      >
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        <div
          style={{
            width: `100%`,
            height: `100%`,
            borderRadius: `0.25rem`,
            backgroundColor: `transparent`,
            border: `1px solid #0000001a`,
            background: `var(--${name})`,
          }}
        />
      </div>
      <div
        style={{
          padding: "1rem",
          background: "white",
        }}
      >
        {name}
      </div>
    </div>
  );
};
