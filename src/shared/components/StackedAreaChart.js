import React from 'react';
import 'recharts';

import {ComposedChart,AreaChart, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ReferenceArea} from 'recharts';

export default class StackedAreaChart extends React.Component {
        constructor(props){
        super(props)

        }

    handleZoomIn()
    {
        this.setState(({data: cdata, left = 0, right = 0}) => {
            return {
                data: this.props.data.slice(),
                animation: true,
                left: left - 800,
                right: right - 800
            };
        });
    }


    handleZoomOut()
    {
        this.setState(({data}) => {
            return {
                data: this.props.data.slice(),
                animation: true,
                left: 0,
                right: 0
            }
        });
    }

    render(){
        return (
            <div className={"stacked-chart center"}>
                    {/*<a*/}
                        {/*href="javascript: void(0);"*/}
                        {/*className="btn update"*/}
                        {/*onClick={this.handleZoomIn.bind( this )}*/}
                    {/*>*/}
                            {/*zoom in*/}
                    {/*</a>*/}
                    {/*<br/>*/}
                    {/*<a*/}
                        {/*href="javascript: void(0);"*/}
                        {/*className="btn update"*/}
                        {/*onClick={this.handleZoomOut.bind( this )}*/}
                    {/*>*/}
                            {/*reset zoom*/}
                    {/*</a>*/}
                    <ComposedChart width={600} height={360} data={this.props.data}
                                   margin={{top: 10, right: 30, left: 0, bottom: 0}}>
                        {/*<AreaChart width={600} height={270}*/}
                        {/*margin={{top: 10, right: 30, left: 0, bottom: 0}}>*/}


                            <XAxis hide={false} dataKey="dates" textAnchor={"end"} angle={-5}
                                   scale="point"/>
                            <YAxis />
                            <CartesianGrid strokeDasharray="3 3"/>
                            <Tooltip/>
                            <Area type='monotone' dataKey='Twitter' stackId="1" stroke='rgb(70,160,236)'
                                  fill='rgb(70,160,236)'/>
                            <Area type='monotone' dataKey='Facebook' stackId="1" stroke='rgb(72,104,172)'
                                  fill='rgb(72,104,172)'/>
                            <Area type='monotone' dataKey='Professional' stackId="1" stroke='rgb(238,99,55)'
                                  fill='rgb(238,99,55)'/>
                            <Area type='monotone' dataKey='Forums' stackId="1" stroke='rgb(220,195,46)'
                                  fill='rgb(245,184,14)'/>
                            <Area type='monotone' dataKey='Tweets' stackId="1" stroke='rgb(70,160,236)'
                                  fill='rgb(70,160,236)'/>
                            <Area type='monotone' dataKey='Sentiment' stackId="1" stroke='rgb(20,160,136)'
                                  fill='rgb(20,160,136)'/>
                            <Area type='monotone' dataKey='Dispensaries' stackId="1" stroke='rgb(200,80,136)'
                                  fill='rgb(200,80,136)'/>
                        {/*</AreaChart>*/}
                            <Line type='monotone' dataKey='AvgSKU' stroke='#ff0000'/>
                    </ComposedChart>
                    <span> This Quarter </span>

            </div>
        );
    }
}

export {StackedAreaChart}