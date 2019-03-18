var tradeLogic = function(data) {
    var count = 0;
    var tickers = []
    var showTrades = setInterval(function() {
        // time to stop and clearInterval
        if (count == data.length) {
            // could change this after every trade, but one check will do
            var netTotal = 0;
            for(var i = 0; i < tickers.length; i++){
                var ticker = tickers[i].toLowerCase();
                netTotal = netTotal + Number($('#'+ticker+'-net').text())
            }
            $('#net-total').text(netTotal)
            clearInterval(showTrades);
            return;
        }

        // make shorthand
        var item = data[count];
        var ticker = "";
        var currentTradePrice = item.price * item.shares;
        
        // so we can use the symbol to match with the html
        ticker = item.symbol.toLowerCase();
        
        // set action and price
        $('#'+ticker+'-action').text(item.action);
        $('#'+ticker+'-price').text('$'+item.price);
        
        if(tickers.indexOf(item.symbol) === -1){
            // populate the first of its kind card
            populateCard(ticker, item, currentTradePrice)
            // put them into an array for verifying new card
            tickers.push(item.symbol)
            // up the count since we will return
            count++;
            return;
        }

        // checking for trade shroted
        if(item.action === 'SELL' && $('#'+ticker+'-shares').text() == 0) {
            console.log('Trades cannot be shorted')
        }

        // run sell logic
        if (item.action === 'SELL' && $('#'+ticker+'-shares').text() != 0) {
            var calcShares = Number($('#'+ticker+'-shares').text()) - item.shares;
            $('#'+ticker+'-shares').text(calcShares);
            
            // trade calculation
            var tradeValue = calculateSellTradeValue(currentTradePrice, ticker);
            $('#'+ticker+'-trade').text(tradeValue);
            setTradeColors(tradeValue, ticker);
            
            // net calculation
            var netValue = calculateSellNetValue(ticker, currentTradePrice)
            $('#'+ticker+'-net').text(netValue)
            setNetColors(netValue, ticker)
            
        }

        // run buy logic
        if(item.action === 'BUY'){
            var calcShares = Number($('#'+ticker+'-shares').text()) + item.shares;
            $('#'+ticker+'-shares').text(calcShares);
            
            // trade calculation
            var tradeValue = calculateBuyTradeValue(currentTradePrice, ticker)
            setTradeColors(tradeValue, ticker);
            $('#'+ticker+'-trade').text(tradeValue);
            
            // net calculation
            var netValue = calculateBuyNetValue(ticker, currentTradePrice);
            $('#'+ticker+'-net').text(netValue);
        }

        count++;
    }, 2000)
}

function populateCard(ticker, item, currentTradePrice) {
    $('#'+ticker+'-card').removeClass('hide');
    $('#'+ticker+'-card').addClass('scale-up-center');
    $('#'+ticker+'-shares').text(item.shares);
    $('#'+ticker+'-trade').text(currentTradePrice);
    $('#'+ticker+'-net').text(currentTradePrice * -1);
    setNetColors(currentTradePrice * -1, ticker);
}

function calculateBuyTradeValue(currentTradePrice, ticker) {
    return currentTradePrice + Number($('#'+ticker+'-trade').text()) 
}

function calculateSellTradeValue(currentTradePrice, ticker) {
    return currentTradePrice - Number($('#'+ticker+'-trade').text()) 
}

function setTradeColors(tradeValue, ticker) {
    if(Math.sign(tradeValue) === 1) {
        $('.'+ticker+'Dollars').removeClass('red');
        $('#'+ticker+'-card').removeClass('red-border');
        $('.'+ticker+'Dollars').addClass('green');
        $('#'+ticker+'-card').addClass('green-border');
    }
    if(Math.sign(tradeValue) === -1) {
        $('.'+ticker+'Dollars').removeClass('green');
        $('#'+ticker+'-card').removeClass('green-border');
        $('.'+ticker+'Dollars').addClass('red');
        $('#'+ticker+'-card').addClass('red-border');
    }
    if(Math.sign(tradeValue) === 0) {
        // no neutrals were found, otherwise would have made code here
        console.log('Neutral...');
    }
}

function calculateSellNetValue(ticker, currentTradePrice) {
    return Number($('#'+ticker+'-net').text()) + currentTradePrice;
}

function calculateBuyNetValue(ticker, currentTradePrice) {
    return Number($('#'+ticker+'-net').text()) - currentTradePrice;
}

function setNetColors(netValue, ticker) {
    if(Math.sign(netValue) === 1) {
        $('.'+ticker+'NetDollars').removeClass('red');
        $('.'+ticker+'NetDollars').addClass('green');
    }
    if(Math.sign(netValue) === -1) {
        $('.'+ticker+'NetDollars').removeClass('green');
        $('.'+ticker+'NetDollars').addClass('red');
    }
    if(Math.sign(netValue) === 0) {
        // no neutrals were found, otherwise would have made code here
        console.log('Neutral...');
    }
}


var problemTwoCode = function(data) {
    for(var i = 0; i < data.length; i++) {
        var formattedString = '<tr><td>'+data[i].symbol+
            '</td><td>'+data[i].price+'</td><td>'+data[i].shares+
            '</td><td>'+data[i].action+'</td></tr>';

        $('#output-two > tbody').append(formattedString)
    }
}

function handleResponse(data) {
    whichPageRunCode(data);
}


function whichPageRunCode(data) {
    switch(window.location.pathname){
        case '/problem-one':
            $('#output-one').text(JSON.stringify(data))
            break;
        case '/problem-two':
            problemTwoCode(data)
            break;
        case '/problem-three':
            tradeLogic(data)
            break;
    }
}

var fetchData = function(handleData) {
    return $.ajax({
        url: "/test-data",
        dataType: "json",
        success: handleResponse
    })
}

fetchData()