import Toolbar from "./components/Toolbar";
import Drawer from "./components/Drawer";
import { linkEvent } from "inferno";
import $ from "jquery";
import Chart from "chart.js";

class App extends Component {
  constructor(props) {
    super(props);
    window.chartColors = {
      blue: "rgb(54, 162, 235)",
      green: "rgb(75, 192, 192)",
      grey: "rgb(201, 203, 207)",
      orange: "rgb(255, 159, 64)",
      purple: "rgb(153, 102, 255)",
      red: "rgb(255, 99, 132)",
      yellow: "rgb(255, 205, 86)"
    };
    this.state = {
      drawer: {
        isOpen: false
      },
      sections: ["profile", "news", "quotation"],
      MONTHS: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ],
      config: {
        type: "line",
        data: {
          labels: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July"
          ],
          datasets: [
            {
              label: "Ethereum",
              backgroundColor: window.chartColors.red,
              borderColor: window.chartColors.red,
              data: [
                this.randomScalingFactor(),
                this.randomScalingFactor(),
                this.randomScalingFactor(),
                this.randomScalingFactor(),
                this.randomScalingFactor(),
                this.randomScalingFactor(),
                this.randomScalingFactor()
              ],
              fill: false
            },
            {
              label: "BitCoin",
              fill: false,
              backgroundColor: window.chartColors.blue,
              borderColor: window.chartColors.blue,
              data: [
                this.randomScalingFactor(),
                this.randomScalingFactor(),
                this.randomScalingFactor(),
                this.randomScalingFactor(),
                this.randomScalingFactor(),
                this.randomScalingFactor(),
                this.randomScalingFactor()
              ]
            }
          ]
        },
        options: {
          responsive: true,
          legend: {
            display: false
          },
          title: {
            display: false,
            text: "Chart.js Line Chart"
          },
          tooltips: {
            mode: "index",
            intersect: false
          },
          hover: {
            mode: "nearest",
            intersect: true
          },
          scales: {
            xAxes: [
              {
                display: false,
                scaleLabel: {
                  display: true,
                  labelString: "Month"
                }
              }
            ],
            yAxes: [
              {
                display: false,
                scaleLabel: {
                  display: true,
                  labelString: "Value"
                }
              }
            ]
          }
        }
      }
    };

    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.drawChart = this.drawChart.bind(this);
  }

  randomScalingFactor() {
    return (Math.random() > 0.5 ? 1.0 : -1.0) * Math.round(Math.random() * 100);
  }

  drawChart(config) {
    var ctx = document.getElementById("canvas").getContext("2d");
    window.myLine = new Chart(ctx, config);
  }

  componentDidMount() {
    window.addEventListener("load", this.drawChart(this.state.config));
  }

  toggleDrawer(props, event) {
    event.stopPropagation();
    var isDrawerOpen = this.state.drawer.isOpen;
    this.setState({
      drawer: {
        isOpen: !this.state.drawer.isOpen
      }
    });

    var target = $(".Drawer"), circle = target.find(".circle"), menu = target.find('menu');
    var clickY = event.pageY;
    var clickX = 200 - (window.innerWidth - event.pageX);
    if (!isDrawerOpen) {
      circle.css("top", clickY).css("left", clickX);
      target.css('animation', 'drawer-open .4s forwards');
      menu.css('animation', 'fade-in .4s forwards');
      circle.css('animation', 'fill .6s forwards');
    } else {
      target.css('animation', 'drawer-close .4s forwards');
      menu.css('animation', 'fade-out .15s forwards');
      circle.css('animation', 'fill-reverse .3s forwards');
    }
  }

  render() {
    return (
      <div
        class="App"
        onMouseUp={
          this.state.drawer.isOpen
            ? linkEvent(this.props, this.toggleDrawer)
            : null
        }
      >
        <Toolbar
          sections={this.state.sections}
          toggleDrawer={this.toggleDrawer}
          isDrawerOpen={this.state.drawer.isOpen}
        />
        <Drawer
          sections={this.state.sections}
          toggleDrawer={this.toggleDrawer}
          isOpen={this.state.drawer.isOpen}
        />
        <div class="Content">
          <canvas id="canvas" />
        </div>
      </div>
    );
  }
}

Inferno.render(<App />, document.getElementById("app"));
