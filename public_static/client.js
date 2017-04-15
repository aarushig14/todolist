/**
 * Created by a.gupta1409 on 15-04-2017.
 */
let i = 1;
let list = [];

$(function () {
    console.log("todo");
    $.get('http://localhost:3456/tasks',function (data) {
        // console.log(data);
        list = JSON.parse(data);
        refresh();

    })

    $('#btn').click(function () {
        $.post('/add',{
            task: $('#in').val(),
            done: false,
            id: i
        },function (data) {
            // console.log(data);
            // i++;
            list = JSON.parse(data);
            let task = list[list.length-1];
            // console.log(task);
            refreshdom(task);
        })
    })

    $('#clearAll').click(function () {
        list = [];

        $.get('/clr')

        $('#list')[0].innerHTML = "";

    })

    $('#clearbtn').click(function () {

        for(let i=0;i<list.length;i++){
            if(list[i].done === 'true'){
                list.splice(i,1);
                i--;
            }
        }
        $.post('/refresh', {list: list}, function (data) {
            list = JSON.parse(data);
        })
        refresh();

    })

})

function refreshdom(task) {
    // console.log(JSON.parse( task.done));
    let str = "<li id='"+i+"'><input type='checkbox'"+ (JSON.parse(task.done) === true ? "checked" : "") + " onchange='setDone(this)'><span "+ (JSON.parse(task.done) === true ? "style='text-decoration: line-through":"")+"'>" + task.task + " </span><input type='button' value='done' onclick='remove(this)'></input></li>";
    // console.log(str);
    i++;
    $('#list').append(str)
}

function refresh() {
    if(list.length == 0){
        return;
    }

    $('#list')[0].innerHTML = "";
    i=1;
    // console.log($('#list')[0].innerHTML);
    list.forEach(function (task) {
        refreshdom(task);
    })
}

function setDone(element) {
    var parentId = element.parentNode.id;
    console.log(parentId)
    let done = list[parentId-1].done;
    list[parentId-1].done = !JSON.parse(done) +"";
    // console.log(list);
    $.post('/refresh',{list: list},function (data) {
        list = JSON.parse(data);
    })
    refresh();
}

function remove(element) {
    if(element.previousElementSibling.style.textDecoration === "line-through") {
        var parentId = element.parentNode.id;
        list.splice(parentId - 1, 1);
        console.log(list);
        $.post('/refresh', {list: list}, function (data) {
            list = JSON.parse(data);
        })
        refresh();
    }else{
        window.alert("This task is not striked through")
    }
}

