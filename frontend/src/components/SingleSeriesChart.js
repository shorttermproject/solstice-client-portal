import React, { Component } from 'react';
import Highcharts from 'highcharts';
import { connect } from 'react-redux'
import { getSortedBills } from '../reducers/bills'
import { setTimeout } from 'timers';

class SingleSeriesChart extends Component {
    componentWillUnmount() {
      this.chart && this.chart.destroy();
      this.chart = undefined;
    }

    renderChart() {
        this.chart && this.chart.destroy();
        this.chart = undefined;
        if(this.props.data && this.props.data.length) {
          this.chart = new Highcharts["Chart"](this.props.containerId, {
            // Options
            title: {
              text: this.props.title
            },
            xAxis: {
              type: 'datetime'
            },
            yAxis: {
              title: {
                text: this.props.yLabel
              }
            },
            tooltip: {
              enabled: false
            },
            legend: {
              enabled: false
            },
            plotOptions: {
              area: {
                dataLabels: {
                  enabled: true,
                  format: "{y} kWh"
                },
                tooltip: {
                  dateTimeLabelFormats: {
                    day:"%b %Y"
                  },
                  valueSuffix: ' kWh'
                },
                enableMouseTracking: true
              }
            },
  
            series: [{
              type: 'area',
              name: this.props.seriesName,
              data: this.props.data
            }],
  
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
  data: getSortedBills(state.bills, "kwh")
})

export default connect(
  mapStateToProps
)(SingleSeriesChart)