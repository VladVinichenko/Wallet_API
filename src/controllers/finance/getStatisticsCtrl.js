const { Transaction} = require('../../models')
const { Conflict, Unauthorized, NotFound, BadRequest } = require('http-errors');




/* const listByDate = (trlist,year,month)=>{ 
 if (trlist.every(tr => tr.date.getFullYear() !== Number(year))) {
           throw NotFound();   
        }
    const yearList = trlist.filter(tr => tr.date.getFullYear() === Number(year))
   if (trlist.every(tr => tr.date.getMonth() + 1 !== Number(month))) { 
            throw NotFound();
        }
    const monthList = yearList.filter(tr => tr.date.getMonth() + 1 === Number(month))
    return monthList
}
const getIncomeStatistics = (trlist, year, month) => { 
    const monthList = listByDate(trlist, year, month);
    const incomeList = monthList.filter(tr => tr.type === 'income');
    const incomeStatistics = incomeList.map(tr => tr.sum).reduce((acc, value) => { 
        const sum = acc + value;
        return sum
         
    }, 0)
    return incomeStatistics
}

const getStatisticsByCategory = (trlist, year, month) => { 
    const monthList= listByDate(trlist, year, month)

    const outlayList = monthList.filter(tr => tr.type === 'outlay');
    
    const outlayCategoryList = outlayList.map(tr => tr.category).filter((val, ind, arr) => arr.indexOf(val) === ind);
    const filterTrListByCategories = outlayCategoryList.map(cat => outlayList.filter(el => cat === el.category))
    const statisticsByCategory=  filterTrListByCategories.map(arr => { 
        const sum = arr.map(tr => tr.sum).reduce((acc, value) => acc + value, 0)
        return {category: arr[0].category, sum}
    })
    return  statisticsByCategory
}

const getTotalOutlay = (trlist, year, month) => {
   const statisticsByCategory= getStatisticsByCategory(trlist, year, month)
    const totalOutlayStatistics = statisticsByCategory.map(tr=> tr.sum).reduce((acc, value) => { 
        const sum = acc + value;
        return sum
         
    }, 0)
    return totalOutlayStatistics
 } */

/*  controller */
const categories = [ 'basic', 'foodstuff',  'car', 'careofyourself',
  'children',  'household',  'education',
    'leisure', 'other']

const getStatisticsCtrl = async (req, res) => { 
    const { _id } = req.user;  
    const { month, year } = req.query
     const searchMonth = Number(month)
    const searchYear = Number(year)
    const transactionsList = await Transaction.find({ owner: _id })
    const yearList = transactionsList.filter(tr => { 
           const trYear = tr.date.getFullYear()
        return trYear === searchYear
    })

    const monthList = yearList.filter(tr => { 
         const trMonth = tr.date.getMonth()+1
        return trMonth === searchMonth
    })
    const incomeList = monthList.filter(tr => tr.type === 'income');
    const incomeStatistics = incomeList.map(tr => tr.sum).reduce((acc, value) => { 
        const sum = acc + value;
        return sum
         
    }, 0)
     const outlayList = monthList.filter(tr => tr.type === 'outlay');
    
    const outlayCategoryList = outlayList.map(tr => tr.category).filter((val, ind, arr) => arr.indexOf(val) === ind);
    const filterTrListByCategories = outlayCategoryList.map(cat => outlayList.filter(el => cat === el.category))
    const statisticsByCategory=  filterTrListByCategories.map(arr => { 
        const sum = arr.map(tr => tr.sum).reduce((acc, value) => acc + value, 0)
        return {category: arr[0].category, sum}
    })

    const missingCategories = categories.filter(cat => { 
    return !outlayCategoryList.includes(cat)
    }).map(cat => { return {category: cat, sum:0 }})
        
       const allCategoriesStatistics = [...missingCategories, ...statisticsByCategory]
    console.log('allCategoriesStatistics', allCategoriesStatistics)
    
     const totalOutlayStatistics = statisticsByCategory.map(tr=> tr.sum).reduce((acc, value) => { 
        const sum = acc + value;
        return sum
         
    }, 0)


    /* const statisticsByCategory = getStatisticsByCategory(transactionsList, month, year) 
    
    const incomeTotal = getIncomeStatistics(transactionsList, month, year)

    const outlayTotal = getTotalOutlay(transactionsList, month, year) */

    res.json({
        status: "success",
        code: 200,
        data: {

            incomeStatistics,
            totalOutlayStatistics,
            allCategoriesStatistics,

            /* statisticsByCategory,
            incomeTotal,
            outlayTotal */
        }
    })
}

module.exports = {

getStatisticsCtrl  
}