//Created function that PASSES!! NOT returns, a function.


function firstChar(str, func) {
    var firstStr = str.charAt(0);
    setTimeout(function(str) {
        func(firstStr)
    }, 1000);
}


function lastChar(str, func) {
    var lastStr = str.charAt(str.length - 1)
    setTimeout(function(str) {
        func(lastStr)
    }, 1000);
}

function getFirstAndLast(str, func) {
    firstChar(str, function(firstLetter){
        lastChar(str, function(lastLetter){
            func(firstLetter + lastLetter)
        })
    })
}



getFirstAndLast("hello", function(firstLast) {
    console.log(firstLast); // should output "ho"
});