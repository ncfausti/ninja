import {combineReducers} from 'redux';
import { INITIAL_LOAD } from "./actions";

// REDUCERS
//
// update the state based of of the ACTIONS
const initialState = {
    quarters: [{},{},{},{},{},{},{}],

    dbRow: {
            brand: "",
            quarter: "",
            composite: "",
            negative: "",
            neutral: "",
            positive: "",
            negative_n: "",
            neutral_n: "",
            positive_n: "",
            n_sentiment: "",
            forums: "",
            forums_accumulated: "",
            professional: "",
            professional_notime: "",
            professional_accumulate: "",
            twitter: "",
            tweets_cumulative: "",
            bs_concentrates: "",
            bs_edibles: "",
            bd_other: "",
            bd_average: "",
            dispensary: "",
            brand_twitter: "",
            followers_twitter: "",
            average_monthly_sku: "",
            Notes3:""
    },
    areaChartData: [],
    composite: 0,
    neg: 0,
    neutral: 0,
    pos: 0,
};

function init(state=initialState, action){
    // default args in ES6, state=initialState if not specified
    switch (action.type){
        case INITIAL_LOAD:
            return Object.assign({}, state,
                {
                    quarters: [{name:"q1"},{name:"q2"},{name:"q3"},{name:"q4"},{name:"q5"},{name:"q6"},{name:"q7"}],

                    dbRow: {
                        brand: "",
                        quarter: "",
                        composite: "",
                        negative: "",
                        neutral: "",
                        positive: "",
                        negative_n: "",
                        neutral_n: "",
                        positive_n: "",
                        n_sentiment: "",
                        forums: "",
                        forums_accumulated: "",
                        professional: "",
                        professional_notime: "",
                        professional_accumulate: "",
                        twitter: "",
                        tweets_cumulative: "",
                        bs_concentrates: "",
                        bs_edibles: "",
                        bd_other: "",
                        bd_average: "",
                        dispensary: "",
                        brand_twitter: "",
                        followers_twitter: "",
                        average_monthly_sku: "",
                        Notes3:""
                    },
                    areaChartData: [],
                    composite: 0,
                    neg: 0,
                    neutral: 0,
                    pos: 0,
                })
    }
    return state
}
const ninjaApp = combineReducers({
    init,
})

const cols = [
    "brand",
    "quarter",
    "composite",
    "negative",
    "neutral",
    "positive",
    "negative_n",
    "neutral_n",
    "positive_n",
    "n_sentiment",
    "forums",
    "forums_accumulated",
    "professional",
    "professional_notime",
    "professional_accumulate",
    "twitter",
    "tweets_cumulative",
    "bs_concentrates",
    "bs_edibles",
    "bd_other",
    "bd_average",
    "dispensary",
    "brand_twitter",
    "followers_twitter",
    "average_monthly_sku",
    "Notes3"];

export default ninjaApp