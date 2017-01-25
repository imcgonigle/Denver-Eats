var menu = []
var order = []
var orderTotal = 0
var selectedItem
$.get("https://galvanize-eats-api.herokuapp.com/menu")
.then(function(data) {
  menu = data.menu
  for(item of data.menu){
    $("#"+item.type+"Menu tbody").append("<tr value='" + item.name + "' class='menu-item'><td>" + item.name + "</td><td align='right'>" + item.price + "</td></tr>")
  }
  selectedItem = $("#pizzaMenu > tbody tr:first-of-type").attr("value")
  $("#pizzaMenu tbody tr:first-of-type").css("color", "darkblue")
  $(".menu-item").click(function() {
    $(".menu-item").css("color", "black")
    $(this).css("color", "blue")
    selectedItem = $(this).attr("value")
  })
})
$("#addItem").click(function() {
  let quantity = Number($("#quantity").val())

  let foodItem = {}
  for (item of menu) {
    if(item.name === selectedItem) {
      foodItem = item
    }
  }
  for(var i = 0; i < quantity; i++ ) {
    order.push(selectedItem)
    orderTotal += foodItem.price
    $("#order tbody").append("<tr><td>" + foodItem.name + "</td><td align='right'>" + foodItem.price +  "</td></tr> " )
  }
  $("#subtotal").text(orderTotal.toFixed(2))
  $("#tax").text((orderTotal * .083).toFixed(2))
  $("#total").text((Number((orderTotal * .083).toFixed(2)) + Number(orderTotal.toFixed(2))).toFixed(2))
})
$("#orderForm").submit(function(event) {
  event.preventDefault()
  let name = $("#name").val()
  let phone = $("#phone").val()
  let address = $("#address").val()
  let request = {
    address: address,
    name: name,
    phone: phone,
    price: orderTotal,
    order: order
  }

  $.post("https://galvanize-eats-api.herokuapp.com/orders", request)
})
