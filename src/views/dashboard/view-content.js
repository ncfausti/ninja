import React from 'react';
import {
    AreaChart, Area, LineChart, Line,
    PieChart, Pie,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell, Sector,
    ResponsiveContainer
} from 'recharts';
import {
    CardGroup, Card, CardBlock, CardTitle, Row
} from 'reactstrap';

import IconDot from 'react-icons/lib/md/fiber-manual-record';
import MdThumbUp from 'react-icons/lib/md/thumb-up';
import MdThumbDown from 'react-icons/lib/md/thumb-down';
import MdArrowDownward from 'react-icons/lib/md/arrow-downward';
import MdArrowUpward from 'react-icons/lib/md/arrow-upward';
import {StackedAreaChart} from "../../shared/components/StackedAreaChart";
import {MultiLineChart} from "../../shared/components/MultiLineChart";
import CalculatorForm from "../../shared/components/CalculatorForm";
import HalfDonutChart from "../../shared/components/HalfDonutChart";

import axios from 'axios';
import { BarChart, Bar } from 'recharts';
import RTChart from 'react-rt-chart';


// Sales Chart
// -----------
const salesData = [
      {name: 'Jun', iphone: 4000, imac: 2400},
      {name: 'Jul', iphone: 3000, imac: 1398},
      {name: 'Aug', iphone: 2000, imac: 2200},
      {name: 'Sep', iphone: 2780, imac: 3008},
      {name: 'Oct', iphone: 1890, imac: 2800},
      {name: 'Nov', iphone: 2390, imac: 3200},
      {name: 'Dec', iphone: 3490, imac: 3300},
];

const SalesDataChart = () => (
    <ResponsiveContainer>
        <AreaChart data={salesData} margin={{top: 10, right: 10, left: -15, bottom: 0}}>
            <XAxis dataKey="name" axisLine={false} fontSize={10} tickLine={false} padding={{left: 0, right: 5}}/>
            <YAxis fontSize={10} axisLine={false} tickLine={false}/>
            <CartesianGrid stroke="#eee" vertical={false}/>
            <Tooltip wrapperStyle={{borderColor: '#eee'}}/>
            <Legend />
            <Area type='monotone' dataKey='iphone' stackId="1" strokeWidth={2} stroke="#448AFF" fill='#448AFF' fillOpacity=".8" />
            <Area type='monotone' dataKey='imac' stackId="1" strokeWidth={2} stroke="#69F0AE" fill='#69F0AE'  fillOpacity=".8"/>
        </AreaChart>
    </ResponsiveContainer>
);


// Blocks Chart
// ------------
const blocksData = [
    {'uv': 2034, 'sales': 623, 'br': 56, 'ns': 2343},
    {'uv': 2734, 'sales': 1223, 'br': 43, 'ns': 3200},
    {'uv': 2522, 'sales': 723, 'br': 64, 'ns': 3063},
    {'uv': 2944, 'sales': 1043, 'br': 44, 'ns': 3666},
    {'uv': 1822, 'sales': 433, 'br': 74, 'ns': 1909}
];

const BlocksChart = ({dataKey, stroke, fill}) => (
    <ResponsiveContainer>
        <AreaChart data={blocksData} margin={{top: 0, bottom: 0, right: 0, left: 0}}>
            <Tooltip
                labelStyle={{display: 'none'}}
                itemStyle={{fontSize: 10, color: '#fff'}}
                wrapperStyle={{padding: '0 4px', background: 'rgba(40,70,80, .94)', border: 'none'}}/>
            <Area type='monotone' dataKey={dataKey} stroke={stroke} fill={fill} strokeWidth={2}  fillOpacity=".8"/>
        </AreaChart>
    </ResponsiveContainer>
);


// Traffic Source Chart
// --------------------
const trafficSourceData = [
    {name: 'Direct', value: 23}, {name: 'Referral', value: 8},
    {name: 'Organic', value: 44}, {name: 'Social', value: 25}
];
const trafficSourceColors = ['#448AFF', '#00E676', '#7C4DFF', '#40C4FF'];

const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent} = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
        <g>
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>{payload.name}</text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 10}
                fill={fill}
            />
            <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none"/>
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none"/>
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`${payload.name}`}</text>
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999" fontSize={12}>
                {`(${(percent * 100).toFixed(2)}%)`}
            </text>
        </g>
    );
};

class TrafficSourceChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {activeIndex: 0}
    }
    onPieEnter = (data, index) => {
        this.setState({
            activeIndex: index,
        });
    }

    render() {
        return (
            <ResponsiveContainer>
                <PieChart onMouseEnter={this.onPieEnter}>
                    <Pie
                        data={trafficSourceData}
                        activeIndex={this.state.activeIndex} activeShape={renderActiveShape}
                        outerRadius={90}
                        innerRadius={70} paddingAngle={4}>
                        { trafficSourceData.map((entry, index) => <Cell fill={trafficSourceColors[index]} key={index}/>) }
                    </Pie>
                    <Legend/>
                </PieChart>
            </ResponsiveContainer>
        );
    }
}


const TransactionTableData = [
    {date: '22 Mar',  name: 'John Doe','earnings': '$304', status: 'pending'},
    {date: '12 Feb', name: 'Maria Smith','earnings': '$834', status: 'done'},
    {date: '28 Jan', name: 'Sofia Andre',  'earnings': '$943', status: 'done'},
    {date: '03 May', name: 'Jean Wilkinson', 'earnings': '$1234', status: 'pending'},
    {date: '10 Mar', name: 'Alisha Seth', 'earnings': '$534', status: 'done'}
];



const TransactionTable = ({data}) => (
    <table className="table">

        <tbody>
            {data.map((item, i) => <tr key={i}>
                <td className="d-flex flex-column">
                    <strong>{item.name}</strong>
                    <small>{item.date}</small>
                </td>
                <td className="align-middle">{item.earnings}</td>
                <td className="align-middle text-nowrap">
                    <IconDot size="12" color={item.status === 'done' ? '#4CAF50' : '#F44336'}/>&nbsp;{item.status}
                </td>
            </tr>)}
        </tbody>
    </table>
);


// Sales Card
// ----------
// const SalesCard = () => (
//

const socialBreakdown = [
    {name:"Tweets",val:310},
    {name:"Followers", val:9425},
    {name:"Forums", val:23},
    {name:"Articles", val:20},
    {name:"Dispensaries", val:1506},
    {name:"Sentiment Rating", val:"97% Positive"},
]

class SocialCard extends React.Component {
    constructor(props) {
        super(props)

    }
        onPieEnter = (data, index) => {
            this.setState({
                activeIndex: index,
            });
        }

        render() {
            return(
                <div className={this.props.visibility}>
                    <CardGroup className="sales-card mb-12">
                        <Card style={{'flex': '2'}}>
                            <CardBlock style={{"text-align":"center","padding-top":"20%"}}>
                                <CardTitle className="text-uppercase h4 center">Sentiment Analysis</CardTitle>
                                    <span className={""}>

                                    <HalfDonutChart className={"scaling-svg"} cy={70} w={200} h={100} inR={50} outR={70} style={{'display':'inline-block'}}
                                                    data={this.props.sentimentData} colorData={COLORS} />
                                        <span className={"sentiment-txt-info"}>
                                        <MdThumbUp style={{"fill":"rgb(0, 204, 119)"}}/> Very Positive - 17%
                                        <br/>
                                        <MdThumbUp style={{"fill":"rgb(51, 238, 136)"}}/> Positive - 80%
                                        <br/>
                                        <MdThumbDown style={{"fill":"red"}}/> Negative - 3%
                                        </span>

                                    </span>
                            </CardBlock>
                        </Card>
                        <Card style={{'flex': '4'}}>
                            <CardBlock>
                            <CardTitle className="text-uppercase h4 center">Attributes</CardTitle>

                                    {/*<span className={"floatLeft center"}>*/}

                                    <SimpleBarChart />
                                    {/*</span>*/}
                        </CardBlock>
                    </Card>
                    <Card style={{'flex': '2'}}>
                        <CardBlock>

                        <CardTitle className="text-uppercase h4 center">Competitors Sentiment</CardTitle>

                                    <span className={"floatLeft"} style={{"width":"130px", "text-align":"center "}}>
                                        <span>Comp 1</span>
                                            <HalfDonutChart className={"scaling-svg floatRight"}
                                                            data={this.props.sentimentData} w={100} h={72} inR={20} outR={30} style={{'display':'inline-block'}} colorData={COLORS} />
                                        <span>Comp 2</span>

                                            <HalfDonutChart className={"scaling-svg floatRight"}
                                                            data={this.props.sentimentData} w={100} h={72} inR={20} outR={30} style={{'display':'inline-block'}} colorData={COLORS} />
                                        </span>
                            </CardBlock>
                        </Card>
                    </CardGroup>
                    <Row>
                        <div className="mb-4 col-sm-12 col-md-6">
                            <Card>
                                <CardBlock>
                                    <CardTitle className="text-uppercase h3 center">Your Social <span className="deemphasize">(this quarter)</span></CardTitle>
                                    <div> {/*<DonutChart className={"scaling-svg"} data={[{name: 'Positive', value: 400},*/}
                                        {/*{name: 'Neutral', value: 100},*/}
                                        {/*{name: 'Negative', value: 100}]} />*/}

                                        <table className="table table-bordered">
                                            <thead>
                                            <td></td>
                                            <td></td>
                                            <td>∆ From Last Qtr.</td>
                                            </thead>
                                            <tbody>
                                            {socialBreakdown.map( (k,v) => <tr>
                                                <td>{k.name}</td>
                                                <td colSpan={1}>{k.val}</td>
                                                <td colSpan={1}>{(k.name === "Dispensaries" || k.name === "Articles") ? (<MdArrowDownward fill={"red"} />) : (<MdArrowUpward fill={"rgb(0, 204, 119)"}/>)}
                                                {parseFloat(Math.random() * 10).toFixed(2)}%</td>
                                            </tr>)}
                                            </tbody>
                                        </table>
                        </div>
                                </CardBlock>
                            </Card>
                        </div>
                        {/* traffic source */}
                        <div className="mb-4 col-sm-12 col-md-6">
                            <Card style={{'flex': '2'}}>
                                <CardBlock>
                                    <CardTitle className="text-uppercase h3 center">Social Volume</CardTitle>
                                    <StackedAreaChart data={this.props.areaChartData} />
                                    {/*<RTChartWrapper />*/}
                                </CardBlock>

                            </Card>
                        </div>
                    </Row>
                    <Row>
                        <div className="mb-4 col-sm-12 col-md-6">
                            <Card>
                                <CardBlock>
                                    <CardTitle className="text-uppercase h3 center">Top Brands <span className="deemphasize">(by Social Volume)</span></CardTitle>
                                    <div>
                                        <HorizontalBarChart data={topBrands} xData={"Social Volume"} yData={"Brand"}/>
                                    </div>
                                </CardBlock>
                            </Card>
                        </div>
                        <div className="mb-4 col-sm-12 col-md-6">
                            <Card style={{"height":"993px"}}>
                                <CardBlock>
                                    <CardTitle className="text-uppercase h3 center">Top Dispensaries <span className="deemphasize">(tweeting about you)</span></CardTitle>
                                    <div>
                                        <HorizontalBarChart data={topDispensaries} xData={"Tweets"} yData={"Dispensary"}/>
                                    </div>
                                </CardBlock>
                            </Card>
                        </div>
                        {/* traffic source */}
                        <div className="mb-4 col-sm-12 col-md-12">
                            <Card style={{"margin":"0 20%"}}>
                                <CardBlock>
                                    <CardTitle className="text-uppercase h3 center">Tweet Topics</CardTitle>
                                    <Card>
                                        <CardBlock>
                                            <img src={"wordclouds/main_wordle.png"} />
                                        </CardBlock>
                                    </Card>
                                </CardBlock>
                            </Card>
                        </div>
                    </Row>
                </div>
                );
        }
}

const bardata = [
    {name: 'Medical Health', Percent: 25, pv: 2400, amt: 2400},
    {name: 'Parties and Friends', Percent: 4, pv: 1398, amt: 2210},
    {name: 'Taste', Percent: 29, pv: 9800, amt: 2290},
    {name: 'Relaxing', Percent: 12, pv: 3908, amt: 2000},
    {name: 'Legalization', Percent: 7, pv: 4800, amt: 2181},
    {name: 'Community', Percent: 12, pv: 3800, amt: 2500},
    {name: 'Well-Being', Percent: 11, pv: 4300, amt: 2100},
];
const SimpleBarChart = React.createClass({
    render () {
        return (
            <ResponsiveContainer width={"98%"} height={300}>
            <BarChart data={bardata}
                      margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                <XAxis type="category" dataKey="name"  textAnchor={"middle"} />
                <YAxis/>
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip/>
                <Bar dataKey="Percent" fill="#82ca9d" />
            </BarChart>
            </ResponsiveContainer>
        );
    }
})

const topBrands = [
    {
        "Brand": "Marley's Naturals",
        "Social Volume": 359
    },
    {
        "Brand": "Brand X",
        "Social Volume": 333
    },
    {
        "Brand": "Cheeba Chews",
        "Social Volume": 217
    },
    {
        "Brand": "Bloom Farms",
        "Social Volume": 214
    },
    {
        "Brand": "FlavRx",
        "Social Volume": 201
    },
    {
        "Brand": "AbsoluteXtracts",
        "Social Volume": 171
    },
    {
        "Brand": "Kushy Punch",
        "Social Volume": 170
    },
    {
        "Brand": "O.penVape",
        "Social Volume": 148
    },
    {
        "Brand": "Moxie Seeds & Extracts",
        "Social Volume": 125
    },
    {
        "Brand": "Mary's Medicinals",
        "Social Volume": 122
    },
    {
        "Brand": "Wyld",
        "Social Volume": 104
    },
    {
        "Brand": "Dixie",
        "Social Volume": 98
    },
    {
        "Brand": "Cavi Cone",
        "Social Volume": 92
    },
    {
        "Brand": "LOL Edibles",
        "Social Volume": 76
    },
    {
        "Brand": "Oleum Extracts",
        "Social Volume": 76
    },
    {
        "Brand": "Zoots",
        "Social Volume": 76
    },
    {
        "Brand": "Dabbalicious",
        "Social Volume": 73
    },
    {
        "Brand": "Kaneh",
        "Social Volume": 72
    },
    {
        "Brand": "Sweet Grass Kitchen",
        "Social Volume": 67
    },
    {
        "Brand": "Bhang",
        "Social Volume": 66
    },
    {
        "Brand": "Apothecanna",
        "Social Volume": 61
    },
    {
        "Brand": "Jetty Extracts",
        "Social Volume": 60
    },
    {
        "Brand": "Kurvana",
        "Social Volume": 57
    },
    {
        "Brand": "K.I.N.D. Concentrates",
        "Social Volume": 56
    },
    {
        "Brand": "Nameless Genetics",
        "Social Volume": 54
    },
    {
        "Brand": "Gold Coast Extracts",
        "Social Volume": 54
    },
    {
        "Brand": "Honey Vape",
        "Social Volume": 53
    },
    {
        "Brand": "Northwest Cannabis Solutions",
        "Social Volume": 52
    },
    {
        "Brand": "Wana Edibles",
        "Social Volume": 52
    }
];
const topDispensaries = [
    {
        "Dispensary": "ElementalWell",
        "Tweets": 22
    },
    {
        "Dispensary": "Airfieldsupply",
        "Tweets": 17
    },
    {
        "Dispensary": "GoddessDelivers",
        "Tweets": 11
    },
    {
        "Dispensary": "givingtreeaz",
        "Tweets": 7
    },
    {
        "Dispensary": "MagOakSocial",
        "Tweets": 6
    },
    {
        "Dispensary": "BSE420",
        "Tweets": 2
    },
    {
        "Dispensary": "EmeraldArizona",
        "Tweets": 2
    },
    {
        "Dispensary": "kindpeoplesrx",
        "Tweets": 2
    },
    {
        "Dispensary": "Apothecary_420",
        "Tweets": 1
    },
    {
        "Dispensary": "ChaliceFarms",
        "Tweets": 1
    },
    {
        "Dispensary": "GREENPHARMSaz",
        "Tweets": 1
    },
    {
        "Dispensary": "novammj",
        "Tweets": 1
    },
    {
        "Dispensary": "SwellFarmacy",
        "Tweets": 1
    },
    {
        "Dispensary": "UgdAz",
        "Tweets": 1
    },
    {
        "Dispensary": "waterfall_sf",
        "Tweets": 1
    },
    {
        "Dispensary": "ZenWeHo",
        "Tweets": 1
    }
];

const HorizontalBarChart = React.createClass({
    render () {
        return (
            <BarChart layout="vertical" width={550} height={900} data={this.props.data}
                      margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                <YAxis type="category" dataKey={this.props.yData}  textAnchor={"end"} />
                <XAxis type="number" dataKey={this.props.xData} />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip/>
                <Bar dataKey={this.props.xData} fill="#82ca9d" />
            </BarChart>
        );
    }
})

class PerformanceCard extends React.Component {
    constructor(props) {
        super(props)

    }

    render() {
        return(
                <div className={this.props.visibility}>
                    <CardGroup className="sales-card mb-4">
                        <Card style={{'flex': '6'}}>
                            <CardBlock>
                                <CardTitle className="text-uppercase h6">National Brandshare</CardTitle>
                                <div className="small mb-4 card-subtitle">Growth over time</div>
                                <div style={{width: '100%', height: '650px'}}>
                                    {/*<SalesDataChart/>*/}
                                    <MultiLineChart data={this.props.multiLineData} />
                                </div>
                            </CardBlock>
                        </Card>
                        <Card style={{'flex': '3'}}>
                            <CardBlock>
                                <CalculatorForm update={this.props.update.bind(this)} data={this.props.areaChartData}
                                                dates = {this.props.dates}
                                                twitter = {this.props.twitter}
                                                professional = {this.props.professional}
                                                dispensary = {this.props.dispensary}
                                                forums = {this.props.forums}
                                                sku = {this.props.sku}
                                                graphData = {this.props.multiLineData}
                                />
                            </CardBlock>
                        </Card>
                    </CardGroup>
                </div>
            );
        }
}
const COLORS = ['#00CC77', '#FF0000', '#FFBB44'];

const TinyBarChart = ({data}) => (
    <div className={"tinyChartWrapper"}>
        <BarChart width={200} height={70} data={data} layout={"vertical"}>
            <XAxis type="number"/>
            <YAxis type="category" dataKey="name" />
            <Bar type="monotone" dataKey="Posters" fill={"#00c853"} />
            <Bar type="monotone" dataKey="Silent Followers" fill={"#2962ff"} />
            <Tooltip />
        </BarChart>
        <div className="ml-2 small">Bar Chart</div>
    </div>
);


let types =
    [
        [{
            "Header":"Gender",
            "Type": null,
            "Posters": null,
            "Silent Followers": null
        }],
        [{
            "Type": "Male",
            "Posters": 23,
            "Silent Followers": 44
        }],
        [{
            "Type": "Female",
            "Posters": 77,
            "Silent Followers": 57
        }],
        [{
            "Header":"Generation",
            "Type": null,
            "Posters": null,
            "Silent Followers": null
        }],
        [{
            "Type": "Millennials",
            "Posters": 23,
            "Silent Followers": 17
        }],
        [{
            "Type": "Gen Xers",
            "Posters": 44,
            "Silent Followers": 42
        }],
        [{
            "Type": "Baby Boomers",
            "Posters": 33,
            "Silent Followers": 41
        }],
        [{
            "Header":"Use",
            "Type": null,
            "Posters": null,
            "Silent Followers": null
        }],
        [{
            "Type": "Moderate Users",
            "Posters": 45,
            "Silent Followers": 38
        }],
        [{
            "Type": "Occasional Users",
            "Posters": 43,
            "Silent Followers": 62
        }],
        [{
            "Header":"News Sources",
            "Type": null,
            "Posters": null,
            "Silent Followers": null
        }],
        [{
            "Type": "Bill Maher",
            "Posters": 52,
            "Silent Followers": 39
        }],
        [{
            "Type": "NPR",
            "Posters": 50,
            "Silent Followers": 38
        }],
        [{
            "Type": "Politico",
            "Posters": 48,
            "Silent Followers": 36
        }],
        [{
            "Type": "Slate",
            "Posters": 46,
            "Silent Followers": 35
        }],
        [{
            "Type": "NYTimes",
            "Posters": 43,
            "Silent Followers": 32
        }],
        [{
            "Type": "AlterNet",
            "Posters": 43,
            "Silent Followers": 32
        }],
        [{
            "Header":"Interests",
            "Type": null,
            "Posters": null,
            "Silent Followers": null
        }],
        [{
            "Type": "Foodies",
            "Posters": 36,
            "Silent Followers": 39
        }],
        [{
            "Type": "Basketball",
            "Posters": 35,
            "Silent Followers": 38
        }],
        [{
            "Type": "Hiking",
            "Posters": 33,
            "Silent Followers": 36
        }],
        [{
            "Type": "Bicycling",
            "Posters": 32,
            "Silent Followers": 35
        }],
        [{
            "Header":"Cannabis Sources",
            "Type": null,
            "Posters": null,
            "Silent Followers": null
        }],
        [{
            "Type": "MarijuanaPolicy",
            "Posters": 30,
            "Silent Followers": 34
        }],
        [{
            "Type": "Cannabist",
            "Posters": 37,
            "Silent Followers": 40
        }],
        [{
            "Header":"Charity",
            "Type": null,
            "Posters": null,
            "Silent Followers": null
        }],
        [{
            "Type": "ONECampaign",
            "Posters": 20,
            "Silent Followers": 22
        }],
        [{
            "Type": "Heifer International",
            "Posters": 11,
            "Silent Followers": 12
        }],
        [{
            "Header":"Influencers",
            "Type": null,
            "Posters": null,
            "Silent Followers": null
        }],
        [{
            "Type": "Barack Obama",
            "Posters": 57,
            "Silent Followers": 63
        }],
        [{
            "Type": "Dalai Lama",
            "Posters": 23,
            "Silent Followers": 25
        }],
        [{
            "Type": "Paula Poundstone",
            "Posters": 21,
            "Silent Followers": 23
        }],
        [{
            "Type": "Neil Tyson",
            "Posters": 19,
            "Silent Followers": 20
        }],
        [{
            "Type": "Michael Moore",
            "Posters": 17,
            "Silent Followers": 18
        }]
    ];

let personas = [
    [
    {
        "Icon":"icons/yogi.png",
        "PersonaName": "Yogis",
        "Posters": 37,
        "Silent Followers": 44,
        "SentimentAnalysis": "97%",
        "CompetitorsSentiment": "94%",
        "TopPostsAttributes": "Health and well-being",
        "ProductPreferences": "Infused drinks"
    }],
    [{
        "Icon":"icons/partier.png",
        "PersonaName": "Partiers",
        "Posters": 1,
        "Silent Followers": 4,
        "SentimentAnalysis": "99%",
        "CompetitorsSentiment": "97%",
        "TopPostsAttributes": "Parties and friends",
        "ProductPreferences": "Cartridges"
    }],
    [{
        "Icon":"icons/boomerang.png",
        "PersonaName": "Boomerangs",
        "Posters": 34,
        "Silent Followers": "39%",
        "SentimentAnalysis": "96%",
        "CompetitorsSentiment": "92%",
        "TopPostsAttributes": "Medical and taste",
        "ProductPreferences": "Topicals"
    }],
    [{
        "Icon":"icons/techie.png",
        "PersonaName": "Techies",
        "Posters": 4,
        "Silent Followers": 7,
        "SentimentAnalysis": " 90%",
        "CompetitorsSentiment": "93%",
        "TopPostsAttributes": "Relaxing and friends",
        "ProductPreferences": "Cartridges"
    }],
    [{
        "Icon":"icons/rad.png",
        "PersonaName": "Radical Millennials",
        "Posters": 5,
        "Silent Followers": 1,
        "SentimentAnalysis": "95%",
        "CompetitorsSentiment": "98%",
        "TopPostsAttributes": "Legalization and community",
        "ProductPreferences": "Cartridges"
    }],
    [{
        "Icon":"icons/canna.png",
        "PersonaName": "Canna-Engaged",
        "Posters": 19,
        "Silent Followers": 5,
        "SentimentAnalysis": "99%",
        "CompetitorsSentiment": "96%",
        "TopPostsAttributes": "Legalization and community",
        "ProductPreferences": "Community"
    }],
    [{
        "Icon":"icons/comedy.png",
        "PersonaName": "Comedy Bingers",
        "Posters": 20,
        "Silent Followers": 7,
        "SentimentAnalysis": "98%",
        "CompetitorsSentiment": "91%",
        "TopPostsAttributes": "Relaxing and taste",
        "ProductPreferences": "Choclate Edibles"
    }],
];

class PersonaCard extends React.Component {
    constructor(props) {
        super(props)

    }

    render() {
        return(
            <div className={this.props.visibility}>
                <CardGroup className="sales-card mb-4 sm-1">
                    <Card style={{'flex': '4'}}>
                        <CardBlock>
                            <CardTitle className="text-uppercase h5 center">Personas</CardTitle>
                            <table className="table table-responsive table-bordered">
                                <thead>
                                <tr>
                                    <th scope="col"></th>
                                    <th scope="col">% Posters</th>
                                    <th scope="col">% Followers</th>
                                    <th scope="col">Sentiment Analysis</th>
                                    <th scope="col">Competitors Sentiment</th>
                                    <th scope="col">Top Posts Attributes</th>
                                    <th scope="col">Product Preferences</th>
                                </tr>
                                </thead>
                                <tbody>


                                    {/*<td><img src={"icons/partier.png"} width={"15%"} /><br />Partiers</td>*/}

                                {personas.map((item, i) => <tr>
                                    <td>
                                        <img src={item[0]["Icon"]} width={"25%"} />
                                        <br />{item[0]["PersonaName"]}</td>
                                    <td colSpan={2}>
                                        <TinyBarChart data={item} />
                                    </td>
                                    <td>{item[0]["SentimentAnalysis"]}</td>
                                    <td>{item[0]["CompetitorsSentiment"]}</td>
                                    <td>{item[0]["TopPostsAttributes"]}</td>
                                    <td>{item[0]["ProductPreferences"]}</td>
                                </tr>)}


                                </tbody>
                            </table>
                        </CardBlock>
                    </Card>
                    <Card style={{'flex': '2'}}>
                        <CardBlock>
                            <CardTitle className="text-uppercase h5 center">Social Activity</CardTitle>
                            <span className={"overflowTable"}>
                            <table className="table table-responsive table-bordered centered">
                                <thead>
                                <tr>
                                    <th scope="col">Type</th>
                                    <th scope="col">% Posters</th>
                                    <th scope="col">% Followers</th>
                                </tr>
                                </thead>
                                <tbody>
                                {types.map(
                                    (item, i) => { return(
                                        !item[0].Header ?
                                            (<tr>
                                    <td>
                                         {item[0]["Type"]}
                                        </td>
                                        <td colSpan={2}>
                                         <TinyBarChart data={item} />
                                        </td>
                                    </tr>) : (<tr><td colSpan={3} className="tdHeaderRow">{item[0].Header}</td></tr>) )
                                    })
                                }

                                </tbody>
                            </table>
                            </span>
                        </CardBlock>
                    </Card>
                </CardGroup>
            </div>
        );}
}

function Int(n) {return parseInt(n);}

// export default () => (
export default class ViewContent extends React.Component {
    constructor() {
        super();
        this.state = {
            quarters: [{}, {}, {}, {}, {}, {}, {}], // 7 quarters
            followers: 1000,
            facebook: 1000,
            articles: 1000,
            // forums: 1000,
            tweets: 1000,
            sentiment: 1000,
            dispenseries: 1000,
            areaChartData: [

                // social media shares, by month
                // init with static data

            ],
            multiLineData: [],
            socialVis: "visible",
            performVis: "invisible",
            personaVis: "invisible",
            sentimentChartData: [],
            twitter:[],
            dates:[],
            professional:[],
            forums:[],
            sku:[]
        }
    }

    componentDidMount() {
        axios.get(`http://ec2-54-81-225-19.compute-1.amazonaws.com/brand?name=kiva`)
            .then(res => {
                console.log(res.data[0]);
                let quarters = [{}, {}, {}, {}, {}, {}, {}, {}];
                let dbRow = {
                    brand:"",
                    quarter:"",
                    date:"",
                    composite:"",
                    negative:"",
                    slight_pos:"",
                    very_positive:"",
                    total_positive:"",
                    negative_n:"",
                    slight_pos_n:"",
                    very_pos_n:"",
                    n_sentiment:"",
                    forums:"",
                    forums2:"",
                    forums_accumulated:"",
                    forums_mean:"",
                    forums_total:"",
                    professional:"",
                    prof_accumulate:"",
                    prof_mean:"",
                    prof_total:"",
                    tweets:"",
                    tweets_accumulate:"",
                    tweet_mean:"",
                    tweet_total:"",
                    followers_twitter:"",
                    social_volume:"",
                    dispensary:"",
                    sku:"",
                    all_sku:"",
                    edible_sku:"",
                    cali_sku:"",
                    bs_edibles:"",
                    bs_mean_state:"",
                    bs_mean_national:"",
                    sku_predict:"",
                    sku_predict3:"",
                }

                let cols = ["brand",
                    "quarter",
                    "date",
                    "composite",
                    "negative",
                    "slight_pos",
                    "very_positive",
                    "total_positive",
                    "negative_n",
                    "slight_pos_n",
                    "very_pos_n",
                    "n_sentiment",
                    "forums",
                    "forums2",
                    "forums_accumulated",
                    "forums_mean",
                    "forums_total",
                    "professional",
                    "prof_accumulate",
                    "prof_mean",
                    "prof_total",
                    "tweets",
                    "tweets_accumulate",
                    "tweet_mean",
                    "tweet_total",
                    "followers_twitter",
                    "social_volume",
                    "dispensary",
                    "sku",
                    "all_sku",
                    "edible_sku",
                    "cali_sku",
                    "bs_edibles",
                    "bs_mean_state",
                    "bs_mean_national",
                    "sku_predict",
                    "sku_predict3"];

                let areaChartData = [];
                let sentimentChartData = [];
                let composite = 0;
                let neg = 0;
                let neutral = 0;
                let pos = 0;
                let socialBreakdown = [];

                let dates = [];
                let twitter = [];
                let professional = [];
                let forums = [];
                let sku = [];
                let dispensary = 1;
                let percents = [0,1,2,3];
                let kiva = [1.22, 1.20,1.22, 1.20,1.31, 1.3,1.25, 1.3, 1.20,1.22, 1.22,1.22, 1.22];
                let comp1 = [0.96, 0.99,0.96, 0.99, 1, 1.10, 1, 1.10,0.99,0.96, 0.99, 1,0.99,];
                let comp2 = [1.32, 1.51,1.32, 1.51, 1.7, 1.67, 1.7, 1.63,1.42, 1.36,1.32, 1.41,1.32,];
                let dates1yr=["Jan 2017","Feb","Mar", "Apr 2017","May", "Jun", "Jul 2017", "Aug", "Sep", "Oct 2017","Nov","Dec", "Jan 2018"];
                let dates1wk=["Nov 8","Nov 9","Nov 10","Nov 11","Nov 12","Nov 13","Nov 14","Nov 15",];
                let dates3mo=["Sep 1", "Sep 14", "Sep 28", "Oct 1", "Oct 28", "Nov 1", "Nov 14", ];


                let multiLineData = [];
                for (let i = 0; i < 13; i++){
                    multiLineData.push({
                        kiva:kiva[i],
                        comp1:comp1[i],
                        comp2:comp2[i],
                        dates:dates1yr[i],
                        percents:percents[i],
                    });
                }

                for (let i = 0; i < res.data.length; i++) {
                    for (let j = 0; j < cols.length; j++) {

                        quarters[i][cols[j]] = res.data[i][j];

                        if (i === res.data.length - 2) {
                            composite = quarters[i]['composite'];
                            neg = quarters[i]['negative'];
                            neutral = quarters[i]['neutral'];
                            pos = quarters[i]['positive'];
                        }
                    }
                    if(i > 3) {
                        dates1yr.push(quarters[i]["date"]);
                    }
                    dates.push(quarters[i]["date"]);
                    twitter.push(quarters[i]["followers_twitter"]);
                    professional.push(quarters[i]["professional"]);
                    forums.push(quarters[i]["forums"]);
                    sku.push(quarters[i]["sku_predict"]);

                    if(i < 13) {
                        areaChartData.push({
                            kiva: kiva[i],
                            comp1:comp1[i],
                            comp2:comp2[i],
                            percents: percents,
                            dates: dates3mo[i],
                            name: "Q" + quarters[i]["quarter"],
                            Twitter: Math.floor(parseFloat(quarters[i]["followers_twitter"]) / 100),
                            Dispensaries: Math.floor(parseFloat(quarters[i]["dispensary"]) / 100),
                            Forums: Math.floor(parseFloat(quarters[i]["forums_total"] )) ,
                            Professional: Math.floor(parseFloat(quarters[i]["professional"]) ),
                          //  AvgSKU: quarters[i]["sku_predict"],
                        });
                    }

                    if(i === res.data.length - 2) {
                        sentimentChartData.push(
                            {name:"negative",label:"Negative", value: parseInt(quarters[i]["negative"])},//,
                            {name:"slight_pos",label:"Slightly Positive", value: parseInt(quarters[i]["slight_pos"])},
                            {name:"very_positive",label:"Very Positive", value: parseInt(quarters[i]["very_positive"])},
                        )
                        dispensary = quarters[i]["dispensary"];
                    }
                }

                // remove last column of data bc all 0s
                areaChartData.pop();
                let i = 0;

                // just extrapolating Q4 2017 from Q3 '17
                // areaChartData.push({
                //   //  kivaBrandshares:kivaBrandshares[i%4],
                //     // comp1:comp1[i%4],
                //     // comp2:comp2[i%4],
                //     dates: quarters[7]["date"],
                //    // dates1yr:quarters[7]["date"],
                //     name: "Q7",// + quarters[7]["quarter"],
                //     Twitter: quarters[i]["followers_twitter"],
                //          Dispensaries: quarters[i]["dispensary"],
                //     Forums: quarters[i]["forums_total"],
                //     Professional: quarters[i]["professional"],
                //     AvgSKU: quarters[i]["sku_predict"],
                // });

                let bsTweets = 310;
                let bsFollowers_twitter = 9425;
                let bsForums = 3;
                let bsProfessional = 20;
                let bsDispensary = 1506;
                let bsComposite = .97;

                this.setState({bsTweets});
                this.setState({bsFollowers_twitter});
                this.setState({bsForums});
                this.setState({bsProfessional});
                this.setState({bsDispensary});
                this.setState({bsComposite});


                this.setState({dates});
                this.setState({dates1yr});
                this.setState({twitter});
                this.setState({professional});
                this.setState({forums});
                this.setState({sku});
                this.setState({dispensary});

                this.setState({kiva});
                this.setState({comp1});
                this.setState({comp2});
                this.setState({dates1yr});

                this.setState({composite});
                this.setState({neg});
                this.setState({neutral});
                this.setState({pos});

                this.setState({multiLineData});
                this.setState({areaChartData});
                this.setState({sentimentChartData});

            });
    }

    switchCard(e) {
        if(e.target.id == "socialLink") {
            console.log("social")
            this.setState({socialVis: "visible"})
            this.setState({performVis: "invisible"})
            this.setState({personaVis: "invisible"})
            e.target.classList.add("active");
            document.getElementById("perfLink").classList.remove("active");
            document.getElementById("persLink").classList.remove("active");
        }
        else if(e.target.id == "perfLink") {
            console.log('perfLink')
            this.setState({socialVis: "invisible"})
            this.setState({performVis: "visible"})
            this.setState({personaVis: "invisible"})
            e.target.classList.add("active");
            document.getElementById("socialLink").classList.remove("active");
            document.getElementById("persLink").classList.remove("active");

        }
        else if(e.target.id == "persLink") {
            console.log("perso")
            this.setState({socialVis: "invisible"})
            this.setState({performVis: "invisible"})
            this.setState({personaVis: "visible"})
            e.target.classList.add("active");
            document.getElementById("socialLink").classList.remove("active");
            document.getElementById("perfLink").classList.remove("active");

        }
    }




    //
    // ********** UPDATE FUNCITON ************
    //


    update(e) {
       // alert(this.state.twitter + " ")
       //  let brandshare = (50 * 8 * 57 * (Int(this.state.professional[6])) * 1.6 * Int(this.state.forums[6])
       //  + 1114.4 * (Int(this.state.composite) * .01) + .003 * (Int(this.state.twitter[6]) * Int(this.state.dispensary)
       //  + .07 * (Int(this.state.followers) * Int(this.state.twitter[6]))) / 340000);

        // let brandshare = ( 50 * 8 + 57 * (Int(this.state.professional[6]))
        //     + (1.6 * Int(this.state.forums[6]))
        //     + 1114.4 * (Int(this.state.composite) * .01)
        //     + (.003 * (Int(this.state.twitter[6]) * Int(this.state.dispensary)))
        //     + (.07 * Int(this.state.followers)) / 340000);

        let prof = Int(this.state.professional[6]);
        let dispensery = Int(this.state.dispensary);
        let tw_followers = Int(this.state.twitter[6]);

        //alert(e.target.value)
        if(e.target.id === "followers"){
            // followers_twitter = Int(e.target.value);
            this.setState({bsFollowers_twitter:Int(e.target.value)});
        }
        if(e.target.id === "tweets"){
            // tweets = Int(e.target.value);
            this.setState({bsTweets:Int(e.target.value)});
        }
        if(e.target.id === "forums"){
            // forums = Int(e.target.value);
            this.setState({bsForums:Int(e.target.value)});
        }
        if(e.target.id === "sentiment"){
            // composite = Int(e.target.value);
            this.setState({bsComposite:Int(e.target.value)});

        }
        if(e.target.id === "articles"){
            // professional = Int(e.target.value);
            this.setState({bsProfessional:Int(e.target.value)});
        }

        if(e.target.id === "stores"){
            // professional = Int(e.target.value);
            this.setState({bsDispensary:Int(e.target.value)});
        }

        this.setState({[e.target.id]: Int(e.target.value)});

        // let brandshare = ( (50 * 8)
        //     + (57 * professional)
        //     + (1.6 * forums)
        //     + (1114.4 * composite)
        //     + (.003 * (tweets * dispensary))
        //     + (.07 * followers_twitter)) / 340000;

        let quarter = 8

        // debugger;

        let totals = [];
        // calc numbers

        let tmp = [];

        let percents = [0,1,2,3];

        let projBrandshares = [];

        for(var i = 0; i < this.state.multiLineData.length; i++) {
            if(i < this.state.multiLineData.length-3){
                totals.push({
                    kiva:this.state.kiva[i], comp1:this.state.comp1[i], comp2:this.state.comp2[i], dates:this.state.dates1yr[i], percents:percents[i]
                });
            }
            else{
                totals.push({
                    kiva: (this.calcBrandshare(quarter) * 100).toFixed(3), comp1:this.state.comp1[i], comp2:this.state.comp2[i], dates:this.state.dates1yr[i], percents: percents[i]
                });
                quarter++
            }

        }

     //   this.setState({areaChartData:tmp});
        this.setState({multiLineData:totals});

    }

    calcBrandshare(quarter) {
        let q7 = .0122
        let brandshare = ( (50 * 8 )
            + (57 * this.state.bsProfessional)
            + (1.6 * this.state.bsForums)
            + (1114.4 * this.state.bsComposite)
            + (.003 * (this.state.bsTweets * this.state.bsDispensary))
            + (.07 * this.state.bsFollowers_twitter))  / 340000;

        // smooth line from
        // 1.22 to brandshare
        // 1.22 + (brandshare / 3) + brandshare / 3 + brandshare / 3

        let bsPart = (brandshare / 3) * .1;

        if (quarter === 8)
            return q7 + bsPart;
        if (quarter === 9)
            return q7 + bsPart * 2;
        if (quarter === 10)
            return q7 + bsPart * 3;

        return brandshare;
    }

    // ******** END UPDATE FUNCTION ********






    render() {
        return (
            <div className="view-content view-dashboard">
                <CardNav switchCard={this.switchCard.bind(this)}/>
                <SocialCard visibility={this.state.socialVis} areaChartData={this.state.areaChartData}
                            update={this.update.bind(this)} sentimentData={this.state.sentimentChartData} />

                <PerformanceCard
                    visibility={this.state.performVis}
                    multiLineData={this.state.multiLineData}
                    update={this.update.bind(this)}
                    sentimentData={this.state.sentimentChartData}
                    dates = {this.state.dates}
                    twitter = {this.state.twitter[6]}
                    professional = {this.state.professional}
                    forums = {this.state.forums}
                    sku = {this.state.sku}
                />

                <PersonaCard visibility={this.state.personaVis} areaChartData={this.state.areaChartData}
                             update={this.update.bind(this)} sentimentData={this.state.sentimentChartData}/>
            </div>
        )
    }
}

class RTChartWrapper extends React.Component {
    constructor(props) {
        super(props)
    }
    //
    //     const startTime = new Date();
    //     const startTweets = 1+Math.random();
    //     const startFollowers = 1+Math.random();
    //
    //     this.state = {
    //         data:[{
    //             time: startTime,
    //             times: [startTime],
    //             Tweets: [startTweets],
    //             Followers: [startFollowers],
    //         }]
    //     };
    // }
    //
    // componentDidMount() {
    //     // setInterval(() => this.forceUpdate(), 5000);
    //     this.interval = setInterval(this.tick, 1000);
    // }
    //
    // componentWillUnmount() {
    //     clearInterval(this.interval);
    // }
    //
    // tick() {
    //     // get last item from data Array
    //     // update values based off of that object
    //     // push that obj on to the end of data
    //     // setState(data: newDataArray
    //     // return data array
    //
    //     let newData = this.state.data[this.state.data.length - 1];
    //     let now = newData.time + 1000;
    //
    //     newData.time = now;
    //
    //     // remove first time item in array and push new time to the end
    //     newData.times.shift();
    //     newData.times.push(now);
    //
    //     this.setState({data:newData});
    // }

    render() {
        //
        // <LineChart width={500} height={300} data={this.state.data}>
        //     <XAxis dataKey="date"/>
        //     <YAxis/>
        //     <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
        //     <Line type="monotone" dataKey="Tweets" stroke="#8884d8" />
        //     <Line type="monotone" dataKey="Followers" stroke="#82ca9d" />
        // </LineChart>

        return (
            <div></div>
        )
    }
}

class CardNav extends React.Component {
    constructor(props) {
        super(props)

    }

    render() {
        return (<div className={"card-nav card card-block"}>
            <ul className={"list-unstyled"}>
                <li id={"socialLink"} className={"mb-4 col-sm-12 col-md-4"}
                    onClick={this.props.switchCard.bind(this)}>Social Listening</li>
                <li id={"perfLink"} className={"mb-4 col-sm-12 col-md-4"}
                    onClick={this.props.switchCard.bind(this)}>Key Performance</li>
                <li id={"persLink"} className={"mb-4 col-sm-12 col-md-4"}
                    onClick={this.props.switchCard.bind(this)}>Persona</li>
            </ul>
        </div>)
    }

}
