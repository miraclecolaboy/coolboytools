//获取存储的事件列表（从 localStorage）
function getStoredEvents() {
    const storedEvents = localStorage.getItem("events");
    // condition ? expression_if_true : expression_if_false;
    // 返回一个空数组 []，确保在没有事件数据的情况下，代码能继续正常运行。
    return storedEvents ? JSON.parse(storedEvents) : [];
}

//  保存事件列表到 localStorage
function saveEvents(events) {
    localStorage.setItem("events", JSON.stringify(events));
}

// 添加新事件
function addEvent() {
    const eventName = document.getElementById("eventName").value;
    const eventDate = new Date(document.getElementById("eventDate").value).getTime();

    if (!eventName || !eventDate) {
        alert("请输入事件名称和日期");
        return;
    }

    const events = getStoredEvents();  // 获取现有的事件列表
    events.push({ name: eventName, date: eventDate });  // 添加新事件
    saveEvents(events);  // 保存更新后的事件列表

    displayLists();  // 更新事件列表显示
    document.getElementById("eventName").value = '';  // 清空输入框
    document.getElementById("eventDate").value = '';  // 清空日期选择框
}

//渲染事件列表（倒计时和正计时）
    function displayLists() {
    const events = getStoredEvents();  // 获取存储的事件列表

    const countdownList = document.getElementById("countdownList");
    const countupList = document.getElementById("countupList");

    countdownList.innerHTML = '';
    countupList.innerHTML = '';

    events.forEach((event, index) => {
        const countdownItem = createListItem(event, 'countdown', index);
        const countupItem = createListItem(event, 'countup', index);

        // 如果事件是倒计时，显示在倒计时区域
        if (event.date > Date.now()) {
            countdownList.appendChild(countdownItem);
        } 
        // 如果事件是正计时，显示在正计时区域
        else {
            countupList.appendChild(countupItem);
        }
    });
}
//创建列表项（倒计时或正计时）
function createListItem(event, type, index) {
    const li = document.createElement("li");  // 创建新的 <li> 元素
    const timeDiff = Date.now() - event.date;  // 计算当前时间与事件时间的差值（毫秒）

    // 根据类型计算天数：倒计时和正计时的天数不同
    let days = type === 'countdown'
        ? Math.ceil((event.date - Date.now()) / (1000 * 3600 * 24))  // 倒计时：事件日期与当前日期的差值
        : Math.floor(timeDiff / (1000 * 3600 * 24));  // 正计时：当前日期与事件日期的差值

    // 设置 <li> 元素的内容：事件名称和天数
    li.textContent = `${event.name} - ${type === 'countdown' ? '剩余' : '已过'} ${days} 天`;

    // 创建删除按钮
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "删除";
    deleteBtn.onclick = () => deleteEvent(index);  // 点击按钮时删除当前事件

    li.appendChild(deleteBtn);  // 将删除按钮添加到 <li> 中
    return li;  // 返回创建的 <li> 元素
}
//页面初始化：显示事件列表
    document.addEventListener("DOMContentLoaded", function () {
    displayLists();  // 页面加载时渲染事件列表
});
// 删除事件
function deleteEvent(index) {
    const events = getStoredEvents();  // 获取现有的事件列表
    events.splice(index, 1);  // 删除指定索引位置的事件
    saveEvents(events);  // 保存更新后的事件列表
    displayLists();  // 更新事件列表显示
}

