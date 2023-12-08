
let monthlyData = [[], [], [], [], [], [], [], [], [], [], [], []];

const MonthlyData=(data) =>{
 
  console.log("Pokrenulo se");
  const getMonthlyData = () => {
    let first = 1;
        // Initialize the first sub-array
        for (let i = 0; i < data.acquiredPoints.length; i++) {
            first = data.acquiredPoints[i].time[4];
            let second = data.acquiredPoints[i].time[3];
            if (second == 1) {
                let drugo = "" + data.acquiredPoints[i].time[3] + first;
                monthlyData[drugo - 1].push(data.acquiredPoints[i]);
            } else {
                monthlyData[first - 1].push(data.acquiredPoints[i]);
            }
        }
        
            reduceDataAndAddPoints();
  }

  const reduceDataAndAddPoints = () => {
    for (let i = 0; i < monthlyData.length; i++) {
        if (monthlyData[i].length > 1) {
          // Checking if dates are the same
          for (let j = 0; j < monthlyData[i].length; j++) {
            const date = monthlyData[i][j].time.split(' ')[0];
            for (let k = j + 1; k < monthlyData[i].length; k++) {
              if (date === monthlyData[i][k].time.split(' ')[0]) {
                monthlyData[i][j].points += monthlyData[i][k].points;
                monthlyData[i].splice(k, 1);
                k--;
              }
            }
          }
        }
      }
  }
    if(data && data.acquiredPoints){
        getMonthlyData(data.acquiredPoints);
    }
   
 
  return monthlyData;
}


export default monthlyData;
