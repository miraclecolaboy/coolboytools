// 添加按钮按下后 获取天数值计算并存储到localStorge
function addCountdown(){
    const eventName=document.getElementById("name").value;
    const targetDate=document.getElementById("date-input").value;
    if(!(eventName&&targetDate)){
        alert("请输入事件名或时间");
        return;
    }
     //发现时间有差 确保目标日期为午夜时间
    const eventDate = new Date(targetDate);
    eventDate.setHours(0, 0, 0, 0); // 将时间部分设置为00:00:00

    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // 将当前时间设置为00:00:00，避免影响计算
    const timeDiff=eventDate-currentDate;
    const dayDiff=Math.floor(timeDiff/(3600*1000*24));
    displayRecord(eventName,dayDiff);

   const saveRecord={eventName:eventName, dayDiff:dayDiff}; 
   const records=JSON.parse(localStorage.getItem('records'))|| [];
   records.push(saveRecord);
   localStorage.setItem('records',JSON.stringify(records))  
}
//加载数据
 function loadrecords() {        
    const records = JSON.parse(localStorage.getItem('records')) || [];
       records.forEach(record => {
             displayRecord(record.eventName,record.dayDiff);
            });
        }
        window.onload = loadrecords;
// 引用参数创建文本 div套文本
function displayRecord(eventName,dayDiff){
    // const countdownText=`${eventName}还剩${dayDiff}天`

    // 继续添加正计时 通过daydiff显示不同文本
// dayDiff > 0，显示 "还有X天"。dayDiff < 0，显示 "已过去X天"。dayDiff === 0，显示 "就是今天"。
    let countdownText;
    let countupText;
    if(dayDiff>0){
       countdownText=`${eventName}还剩${dayDiff}天`
    }else if(dayDiff<0){
       countupText=`${eventName}已经过去${Math.abs(dayDiff)}天`
    }else{
         countdownText = `${eventName}就是今天！`;
    }

    const countdownDiv=document.createElement("div");
    countdownDiv.classList.add("countdown-item");
 // 创建两个不同的 div 颜色区分内容
    const countdownContent = document.createElement("span");
    countdownContent.classList.add("countdown-text");
    countdownContent.textContent = countdownText;

    const countupContent = document.createElement("span");
    countupContent.classList.add("countup-text");
    countupContent.textContent = countupText;

    const deleteBtn=document.createElement("button");
    deleteBtn.textContent="删除";
    deleteBtn.onclick=function(){
        removeRecord(eventName,dayDiff,countdownDiv);
    }

    countdownDiv.appendChild(countdownContent);
    countdownDiv.appendChild(countupContent);
    countdownDiv.appendChild(deleteBtn);

    const countdownContainer=document.getElementById("countdowns");
    countdownContainer.appendChild(countdownDiv);
}
// 删除键移除数据和div
function removeRecord(eventName,dayDiff,countdownDiv){
    const records=JSON.parse(localStorage.getItem('records'))||[];
    const updatedRecords=records.filter(record=>!(record.eventName===eventName&&record.dayDiff===dayDiff));
    localStorage.setItem('records',JSON.stringify(updatedRecords))
    countdownDiv.remove();
}
