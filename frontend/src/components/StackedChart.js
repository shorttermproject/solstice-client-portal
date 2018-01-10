import React, { Component } from 'react';
import Highcharts from 'highcharts';
import { connect } from 'react-redux'
import { getSortedBills } from '../reducers/bills'

class Graph extends Component {
  componentWillUnmount() {
    this.chart && this.chart.destroy();
    this.chart = undefined;
  }

  renderChart() {
      this.chart && this.chart.destroy();
      this.chart = undefined;
      if(this.props.billData && this.props.billData.length) {
        this.chart = new Highcharts["Chart"](this.props.containerId, {
          // Options
          chart: {
            type: 'area'
          },
          title: {
            text: this.props.title
          },
          xAxis: {
            type: 'datetime'
          },
          yAxis: {
            title: {
              text: this.props.yLabel
            },
            labels: {
              format: '${value}'
            },
            reversedStacks: true
          },
          tooltip: {
            shared: true,
            valuePrefix: '$',
            formatter: function () {
              const monthyear = new Date(this.x).toLocaleString('en-us', {
                timeZone: 'UTC',
                month: 'long',
                year: 'numeric'
              });

              return (
                '<b>' + monthyear + '</b><br/>' +
                "Energy Cost: <b>$" + this.points[0].y + "</b>" +
                "<br/>Savings: <b>$" + this.points[1].y + "</b>"
              );
            },
          },
          plotOptions: {
            area: {
              dataLabels: {
                enabled: false
              }
            }
          },
          legend: {
            align: 'right',
            verticalAlign: 'top',
            layout: 'vertical',
            floating: true,
            x: 0,
            y: 0
          },
          series: [
            {
              name: this.props.series1,
              data: this.props.billData,
              color: "#9dc8f1",
              fillOpacity: 0.5
            },
            {
              name: this.props.series2,
              data: this.props.savingsData,
              color: "#00D700",
              fillOpacity: 0.2,
              dashStyle: 'dash'
            }
          ],

          credits: {
            enabled: false
          }
        });
      }
  }
  render() {
    const dom = (<div id={this.props.containerId}></div>);
    setTimeout(()=>{
      this.renderChart();
    })
  return dom;
  }
}

const mapStateToProps = state => ({
  billData: getSortedBills(state.bills, "bill"),
  savingsData: getSortedBills(state.bills, "savings")
})

export default connect(
  mapStateToProps
)(Graph)