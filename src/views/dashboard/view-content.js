import React from 'react';
import {
    AreaChart, Area,
    PieChart, Pie,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell, Sector,
    ResponsiveContainer
} from 'recharts';
import {
    CardGroup, Card, CardBlock, CardTitle, Row, Button
} from 'reactstrap';

// icons
import IconDollar from 'react-icons/lib/fa/dollar';
import IconTrendUp from 'react-icons/lib/md/trending-up';
import IconLevelUp from 'react-icons/lib/fa/level-up';
import IconLevelDown from 'react-icons/lib/fa/level-down';
import IconAndroid from 'react-icons/lib/fa/android';
import IconCardTravel from 'react-icons/lib/md/card-travel';
import IconDvr from 'react-icons/lib/md/dvr';
import IconBalance from 'react-icons/lib/md/account-balance';
import IconDot from 'react-icons/lib/md/fiber-manual-record';
import {StackedAreaChart} from "../../shared/components/StackedAreaChart";
import CalculatorForm from "../../shared/components/CalculatorForm";
import HalfDonutChart from "../../shared/components/HalfDonutChart";
import DonutChart from "../../shared/components/DonutChart";
import axios from 'axios';
import { BarChart, Bar } from 'recharts';


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
    {name:"Forums", val:3},
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
                    <CardGroup className="sales-card mb-4">
                        <Card style={{'flex': '2'}}>
                            <CardBlock>
                                <CardTitle className="text-uppercase h3 center">Sentiment Analysis</CardTitle>
                                <div>
                                    <HalfDonutChart className={"scaling-svg"}
                                                    data={this.props.sentimentData} colorData={COLORS} />
                                </div>

                            </CardBlock>
                        </Card>
                        <Card style={{'flex': '2'}}>
                            <CardBlock>
                                <CardTitle className="text-uppercase h3">Social Volume</CardTitle>
                                {/*<CalculatorForm update={this.props.update.bind(this)} />*/}
                                <StackedAreaChart data={this.props.areaChartData} />

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
                                            <tbody>
                                            {socialBreakdown.map( (k,v) => <tr>
                                                <td>{k.name}</td>
                                                <td colSpan={1}>{k.val}</td>
                                                {k.name === "Sentiment Rating" &&
                                                <td><span className={"pos"}>{k.val}</span></td>
                                                }
                                            </tr>)}
                                            </tbody>
                                        </table>

                                    {/*<CalculatorForm update={this.props.update.bind(this)} />*/}

                        </div>
                                </CardBlock>
                            </Card>
                        </div>
                        {/* traffic source */}
                        <div className="mb-4 col-sm-12 col-md-6">
                            <Card>
                                <CardBlock>
                                    <img src={"wordclouds/main_wordle.png"} />
                                </CardBlock>
                            </Card>
                        </div>
                    </Row>
                </div>
                );
        }
}

class PerformanceCard extends React.Component {
    constructor(props) {
        super(props)

    }
    // onPieEnter = (data, index) => {
    //     this.setState({
    //         activeIndex: index,
    //     });
    // }

    render() {
        return(
                <div className={this.props.visibility}>
                    <CardGroup className="sales-card mb-4">
                        <Card style={{'flex': '3'}}>
                            <CardBlock>
                                <CardTitle className="text-uppercase h6">National Brandshare</CardTitle>
                                <div className="small mb-4 card-subtitle">Growth over time</div>
                                <div style={{width: '100%', height: '280px'}}>
                                    {/*<SalesDataChart/>*/}
                                    <StackedAreaChart data={this.props.areaChartData} />
                                </div>
                            </CardBlock>
                        </Card>
                        <Card style={{'flex': '2'}}>
                            <CardBlock>
                                <CardTitle className="text-uppercase h6">Brandshare Calculator</CardTitle>
                                <div className="small mb-4 card-subtitle">Make adjustments to see change in shares</div>
                                <CalculatorForm update={this.props.update.bind(this)} />
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
        <BarChart width={300} height={60} data={data} layout={"vertical"}>
            <XAxis type="number"/>
            <YAxis type="category" dataKey="name" />
            <Bar type="monotone" dataKey="% Posters" fill={"#00c853"} />
            <Bar type="monotone" dataKey="% Followers" fill={"#2962ff"} />

            <Tooltip />
        </BarChart>
        <div className="ml-2 small">Bar Chart</div>
    </div>
);


const male = [
    {'% Posters': 23},
    {'% Followers': 43,},
];
const female = [
    {'% Posters': 77},
    {'% Followers': 57,},
];
const millennials = [
    {'% Posters': 23},
    {'% Followers': 17,},
];
const genX = [
    {'% Posters': 44},
    {'% Followers': 42,},
];
const babyBoomers = [
    {'% Posters': 33},
    {'% Followers': 41,},
];

const yogis = [
    {'% Posters': 23},
    {'% Followers': 44,},
];
const partiers = [
    {'% Posters': 1},
    {'% Followers': 4,},
];



class PersonaCard extends React.Component {
    constructor(props) {
        super(props)

    }

    render() {
        return(
            <div className={this.props.visibility}>
                <CardGroup className="sales-card mb-4">
                    <Card style={{'flex': '2'}}>
                        <CardBlock>
                            <CardTitle className="text-uppercase h5 center">Social Activity</CardTitle>
                            <table className="table table-bordered centered">
                                <thead>
                                <tr>
                                    <th scope="col"></th>
                                    <th scope="col">% Posters</th>
                                    <th scope="col">% Followers</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td><img src={"icons/male.png"} width={"25%"} /><br />Male</td>
                                    <td colSpan={2}>

                                        <TinyBarChart data={male} />

                                    </td>
                                </tr>
                                <tr>
                                    <td><img src={"icons/female.png"} width={"25%"} /><br />Female</td>

                                    <td colSpan={2}>

                                        <TinyBarChart data={female} />

                                    </td>
                                </tr>
                                <tr>
                                    <td><img src={"icons/millenial.png"} width={"25%"} /><br />Millennials</td>

                                    <td colSpan={2}>

                                        <TinyBarChart data={millennials} />

                                    </td>
                                </tr>
                                <tr>
                                    <td><img src={"icons/genX.png"} width={"25%"} /><br />Gen Xers</td>

                                    <td colSpan={2}>

                                        <TinyBarChart data={genX} />

                                    </td>
                                </tr>
                                <tr>
                                    <td><img src={"icons/baby-boomer.png"} width={"25%"} /><br />Baby Boomers</td>
                                    <td colSpan={2}>

                                        <TinyBarChart data={babyBoomers} />

                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </CardBlock>
                    </Card>
                    <Card style={{'flex': '2'}}>
                        <CardBlock>
                            <CardTitle className="text-uppercase h5">Personas</CardTitle>
                            {/*<div className="small mb-4 card-subtitle">Make adjustments to see change in shares</div>*/}
                            {/*<CalculatorForm update={this.props.update.bind(this)} />*/}
                            <table className="table table-bordered">
                                <thead>
                                <tr>
                                    <th scope="col"></th>
                                    <th scope="col">% Posters</th>
                                    <th scope="col">% Followers</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td><img src={"icons/yogi.png"} width={"25%"} /><br />Yogis</td>
                                    <td colSpan={2}>

                                        <TinyBarChart data={yogis} />

                                    </td>
                                </tr>
                                <tr>
                                    <td><img src={"icons/partier.png"} width={"25%"} /><br />Partiers</td>

                                    <td colSpan={2}>

                                        <TinyBarChart data={partiers} />

                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </CardBlock>
                    </Card>
                </CardGroup>
            </div>
        );}
}


// export default () => (
export default class ViewContent extends React.Component {
    constructor() {
        super();
        this.state = {
            quarters: [{}, {}, {}, {}, {}, {}, {}], // 7 quarters
            followers: 1000,
            facebook: 1000,
            articles: 1000,
            forums: 1000,
            tweets: 1000,
            sentiment: 1000,
            dispenseries: 1000,
            areaChartData: [

                // social media shares, by month
                // init with static data

            ],
            socialVis: "visible",
            performVis: "invisible",
            personaVis: "invisible",
            sentimentChartData: []
        }
    }

    componentDidMount() {
        axios.get(`http://ec2-54-81-225-19.compute-1.amazonaws.com/brand?name=kiva`)
            .then(res => {
                //console.log(quarters);
                //console.log(dbRow);

                console.log(res.data[0]);
                let quarters = [{}, {}, {}, {}, {}, {}, {}, {}];
                // let dbRow = {
                //     brand: "",
                //     quarter: "",
                //     composite: "",
                //     negative: "",
                //     neutral: "",
                //     positive: "",
                //     negative_n: "",
                //     neutral_n: "",
                //     positive_n: "",
                //     n_sentiment: "",
                //     forums: "",
                //     forums_accumulated: "",
                //     professional: "",
                //     professional_notime: "",
                //     professional_accumulate: "",
                //     twitter: "",
                //     tweets_cumulative: "",
                //     bs_concentrates: "",
                //     bs_edibles: "",
                //     bd_other: "",
                //     bd_average: "",
                //     dispensary: "",
                //     brand_twitter: "",
                //     followers_twitter: "",
                //     average_monthly_sku: "",
                //     Notes3: ""
                // };
                // let cols = ["brand",
                //     "quarter",
                //     "composite",
                //     "negative",
                //     "neutral",
                //     "positive",
                //     "negative_n",
                //     "neutral_n",
                //     "positive_n",
                //     "n_sentiment",
                //     "forums",
                //     "forums_accumulated",
                //     "professional",
                //     "professional_notime",
                //     "professional_accumulate",
                //     "twitter",
                //     "tweets_cumulative",
                //     "bs_concentrates",
                //     "bs_edibles",
                //     "bd_other",
                //     "bd_average",
                //     "dispensary",
                //     "brand_twitter",
                //     "followers_twitter",
                //     "average_monthly_sku",
                //     "Notes3"];

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

                for (let i = 0; i < res.data.length; i++) {
                    for (let j = 0; j < cols.length; j++) {
                        console.log(quarters[i]);

                        quarters[i][cols[j]] = res.data[i][j];
                        console.log(quarters[i]);

                        if (i === res.data.length - 1) {
                            composite = quarters[i]['composite'];
                            neg = quarters[i]['negative'];
                            neutral = quarters[i]['neutral'];
                            pos = quarters[i]['positive'];
                        }
                    }
                    areaChartData.push({
                        dates: quarters[i]["date"],
                        percent: [0,10,20,30,40,50,60,70,80,90,100],
                        name: "Q" + quarters[i]["quarter"],
                        Twitter: quarters[i]["twitter"],
                   //     Dispensaries: quarters[i]["dispensary"],
                        Forums: quarters[i]["forums"],
                        Professional: quarters[i]["professional"],
                        AvgSKU: quarters[i]["average_monthly_sku"],

                    });

                    if(i === res.data.length - 2) {
                        sentimentChartData.push(
                            {name:"negative", value: parseInt(quarters[i]["negative"])},//,
                            {name:"slight_pos", value: parseInt(quarters[i]["slight_pos"])},
                            {name:"very_positive", value: parseInt(quarters[i]["very_positive"])},
                        )
                    }
                }
                console.log("SENTIMENT DATA" + sentimentChartData);

                this.setState({composite});
                this.setState({neg});
                this.setState({neutral});
                this.setState({pos});

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
    update(e) {
        let totals = [];
        // calc numbers
        console.log(e.target.id + " : " + e.target.value);
        this.setState({[e.target.id]: e.target.value});
        // use refs here

        // And then for the calculator here is the
        // formula:
        // Actual SKU = 50(quarter) 57(Professional) 1.6(forums_total)
        // + 1114.4(composite) + .003(twitter * dispensary)
        // + .07 (followers * twitter) + 232
        let tmpAreaChart = this.state.areaChartData;

        this.setState({
            areaChartData: [
                {
                    name: 'Q1 2016', Twitter: this.state.followers, Facebook: this.state.facebook,
                    Articles: this.state.articles, Forums: this.state.forums
                },
                {
                    name: 'Q2', Twitter: this.state.followers, Facebook: this.state.facebook,
                    Articles: this.state.articles, Forums: this.state.forums
                },
                {
                    name: 'Q3', Twitter: this.state.followers, Facebook: this.state.facebook,
                    Articles: this.state.articles, Forums: this.state.forums
                },
                {
                    name: 'Q4', Twitter: this.state.followers, Facebook: this.state.facebook,
                    Articles: this.state.articles, Forums: this.state.forums
                },
                {
                    name: 'Q5', Twitter: this.state.followers, Facebook: this.state.facebook,
                    Articles: this.state.articles, Forums: this.state.forums
                },
                {
                    name: 'Q6', Twitter: this.state.followers, Facebook: this.state.facebook,
                    Articles: this.state.articles, Forums: this.state.forums
                },
                {
                    name: 'Q7', Twitter: 10000, Facebook: this.state.facebook,
                    Articles: this.state.articles, Forums: this.state.forums
                }
            ]
        });

        // this.setState({areaChartData:[
        //     {name: 'October', Twitter: e.target.value, Facebook: 400, Articles: 500, Forums:600},
        //     {name: 'November', Twitter: 2200, Facebook: 500, Articles: 600, Forums:700},
        //     {name: 'December', Twitter: 3300, Facebook: 600, Articles: 700, Forums:800},
        //     {name: 'January', Twitter: 5000, Facebook: 700, Articles: 799, Forums: 800}]});
    }


    render() {
        return (
            <div className="view-content view-dashboard">
                <CardNav switchCard={this.switchCard.bind(this)}/>
                <SocialCard visibility={this.state.socialVis} areaChartData={this.state.areaChartData}
                            update={this.update.bind(this)} sentimentData={this.state.sentimentChartData} />

                <PerformanceCard visibility={this.state.performVis} areaChartData={this.state.areaChartData}
                                 update={this.update.bind(this)} sentimentData={this.state.sentimentChartData}/>

                <PersonaCard visibility={this.state.personaVis} areaChartData={this.state.areaChartData}
                             update={this.update.bind(this)} sentimentData={this.state.sentimentChartData}/>
            </div>
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
                    onClick={this.props.switchCard.bind(this)}>Social Metrics</li>
                <li id={"perfLink"} className={"mb-4 col-sm-12 col-md-4"}
                    onClick={this.props.switchCard.bind(this)}>Key Performance</li>
                <li id={"persLink"} className={"mb-4 col-sm-12 col-md-4"}
                    onClick={this.props.switchCard.bind(this)}>Persona</li>
            </ul>
        </div>)
    }

}
