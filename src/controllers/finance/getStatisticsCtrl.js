const { Finance} = require('../../models')
/* const { Conflict, Unauthorized, NotFound, BadRequest } = require('http-errors'); */




function listByDate  (trlist, month, year)  { 
    const searchMonth = Number(month)
    const searchYear = Number(year)
    const yearList = trlist.filter(tr => { 
           const trYear = tr.date.getFullYear()
        return trYear === searchYear
    })
    const monthList = yearList.filter(tr => { 
         const trMonth = tr.date.getMonth()+1
        return trMonth === searchMonth
    })
    return monthList
}

function countStatistics(list) { 
return list.map(tr => Number(tr.sum)).reduce((acc, value) => { 
        const sum = acc + value;
        return sum
         
    }, 0)
}

function getIncomeStatistics  (monthList) { 
    const incomeList = monthList.filter(tr => tr.type === 'income');
    const incomeStatistics = countStatistics(incomeList)
    return incomeStatistics
}

function getStatisticsByCategory (monthList)  { 
    const outlayList = monthList.filter(tr => tr.type === 'outlay');
    
    const outlayCategoryList = outlayList.map(tr => tr.category).filter((val, ind, arr) => arr.indexOf(val) === ind);
    const filterTrListByCategories = outlayCategoryList.map(cat => outlayList.filter(el => cat === el.category))
     const statisticsByCategory=  filterTrListByCategories.map(arr => { 
        const sum = arr.map(tr => Number(tr.sum)).reduce((acc, value) => acc + value, 0)
        return { category: arr[0].category, sum }
    })
    console.log('statisticsByCategory',statisticsByCategory)
    return  statisticsByCategory
}



/*  controller */
const getStatisticsCtrl = async (req, res) => { 
    const { _id } = req.user;  
    const { month, year } = req.query
    
    const transactionsList = await Finance.find({ owner: _id })



const monthList = listByDate(transactionsList, month,year)
   
const statisticsByCategory = getStatisticsByCategory(monthList)   

 const incomeStatistics = getIncomeStatistics(monthList) 
const totalOutlayStatistics= countStatistics(statisticsByCategory)

    res.json({
        status: "success",
        code: 200,
        data: {
            incomeStatistics,
            totalOutlayStatistics,
            statisticsByCategory,
        }
    })
}


module.exports = {

getStatisticsCtrl  
}