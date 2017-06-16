import Button from "./Button";
import { linkEvent } from "inferno";
import $ from "jquery";

export default class Drawer extends Component {
  constructor(props) {
    super(props);

    this.stopPropagation = this.stopPropagation.bind(this);
  }

  stopPropagation(props, event) {
    event.stopPropagation();
  }

  render() {
    return (
      <div
        class={"Drawer" + (this.props.isOpen ? " open" : "")}
        onMouseUp={linkEvent(this.props, this.stopPropagation)}
      >
        <menu>
          {this.props.sections.map((section, i) =>
            <Button
              label={section}
              ripple="true"
              link="true"
              onClick={this.props.toggleDrawer}
            />
          )}
        </menu>
        <div class="circle" />
      </div>
    );
  }
}
