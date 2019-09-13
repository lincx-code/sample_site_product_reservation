$(document).ready(function(){
    "use strict";
    //get data
    $.getJSON( "https://lincx-code.github.io./sample/bikerentals.json", function(data) {
        //console.log(products);
        $("#reservationForm").html(buildHTML(data));
    });
  });

function buildHTML(data) {
    let products = data.products;
    let htmlContent = "<ul class='products'>";
    if(products.length >= 1) {
        for(let i = 0; i < products.length; i++) {
            htmlContent += "<li><label>" + products[i].name +"</label> <img src='" 
            + products[i].image + "' class='product-image' />" 
            + "<span class='product-price'>Price: $" + (products[i].price).toFixed(2) + "</span>"
            + "<span class='product-quantity'> Quantity: </span>"
            + "<input type='number' name='quantity' value='0' data='0' onchange='updateProduct(this," + Number(products[i].price) + ")'>"
            + "</li>";
        }
        htmlContent += "</ul>" + "<input type='submit' value='Submit' />";
    }else{
        htmlContent = "No data found";
    }

    return htmlContent;
}

//update total for each selected product
function updateProduct(input, price){
    let total = 0;
    total += input.value * price;
    input.setAttribute('data', total);
    updateTotal();
}

//update total for all selected products
function updateTotal(){
    let total = 0;
    let productValues = document.getElementsByName("quantity");

    for(let i = 0; i < productValues.length; i++){
        total+= Number(productValues[i].getAttribute('data'));
    }

    $(".total").html("$" + total.toFixed(2));
}

function validateForm(){
    //check if user select at least one option
    let count = 0;
    $('input[type="number"]').each(function(){
        count += Number($(this).val()); 
    });

    if(count > 0) {
        alert("You have choosed " + count + " products with total " + $(".total").html());
        return false;
    }else{
        alert("Please choose at least one product.");
        return false;
    }
}