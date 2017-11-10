import React from 'react';
import 'recharts';

import {ComposedChart,AreaChart, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ReferenceArea} from 'recharts';

export const MultiLineChart = (props) => (
<div className={"stacked-chart"}>
        <ComposedChart width={800} height={560} data={props.data}
                       margin={{top: 10, right: 30, left: 0, bottom: 0}}>
    	{/*<AreaChart width={600} height={270}*/}
            {/*margin={{top: 10, right: 30, left: 0, bottom: 0}}>*/}


                <XAxis hide={false} dataKey="dates" scaleToFit={true} textAnchor={"end"} angle={-5} scale="point" />
        <YAxis dataKey="percents" />
                <ReferenceLine x={"Jul-Sep 2017"} stroke="green" label="PROJECTED" />
                <ReferenceArea x1={"Jul-Sep 2017"} x2={"Oct-Dec 2017"} y1={0} stroke="red" strokeOpacity={0.3} />
        <CartesianGrid strokeDasharray="2 2" />
        <Tooltip/>
        {/*<Area type='monotone' dataKey='Twitter' stackId="1" stroke='rgb(70,160,236)' fill='rgb(70,160,236)' />*/}
        {/*<Area type='monotone' dataKey='Facebook' stackId="1" stroke='rgb(72,104,172)' fill='rgb(72,104,172)' />*/}
        {/*<Area type='monotone' dataKey='Professional' stackId="1" stroke='rgb(238,99,55)' fill='rgb(238,99,55)' />*/}
        {/*<Area type='monotone' dataKey='Forums' stackId="1" stroke='rgb(220,195,46)' fill='rgb(245,184,14)' />*/}
        {/*<Area type='monotone' dataKey='Tweets' stackId="1" stroke='rgb(70,160,236)' fill='rgb(70,160,236)' />*/}
        {/*<Area type='monotone' dataKey='Sentiment' stackId="1" stroke='rgb(20,160,136)' fill='rgb(20,160,136)' />*/}
        {/*<Area type='monotone' dataKey='Dispensaries' stackId="1" stroke='rgb(200,80,136)' fill='rgb(200,80,136)' />*/}
      {/*</AreaChart>*/}
                {/*<Line type='monotone' dataKey='AvgSKU'  stroke='#ff0000'/>*/}
                <Line type='monotone' name="Your Brand" dataKey='kiva'  stroke='#ff0000'/>
                <Line type='monotone' name="Comp 1" dataKey='comp1'  stroke='#888'/>
                <Line type='monotone' name="Comp 2" dataKey='comp2'  stroke='#888'/>

        </ComposedChart>
    </div>
    );

