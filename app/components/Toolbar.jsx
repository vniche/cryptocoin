import { linkEvent } from "inferno";

export default function Toolbar(props) {
  return (
    <div className="Toolbar">
      <logo>
        <h3>Cryptocoin</h3>
      </logo>
      <svg
        version="1.1"
        class={ "drawer-button" + (props.isDrawerOpen ? " active" : "")}
        onMouseUp={linkEvent(props, props.toggleDrawer)}
        viewBox="0 0 24 24"
      >
        <path id="upper-trace" d="M 3,6 21,6 21,8 3,8 Z" />
        <path id="middle-trace" d="m 3,11 18,0 0,2 -18,0 z" />
        <path id="bottom-trace" d="m 3,16 18,0 0,2 -18,0 z" />
      </svg>
    </div>
  );
}
