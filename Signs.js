import { session } from "wix-storage-frontend";
import wixWindowFrontend from 'wix-window-frontend';




let design = ""
let quantity = 1

export function dropdown1_change(event) {
	quantity = Number($w('#dropdown1').value)
}

$w('#dropdown3').onChange((event) => {
  design = $w('#dropdown3').value  
})

let idnum = ""
let product = ""
let base_price = 0
let price = 0;


$w.onReady(async function () {
	const context = wixWindowFrontend.lightbox.getContext()

	idnum = context.id
	product = context.product
  base_price = context.price
  price = base_price

  $w('#text4').text = product;

	console.log("RECEIVED id:", idnum)
	console.log("RECEIVED product:", product)
});



export function button2_click(event) {
	
	console.log("id:", idnum)
	console.log("product:", product)

  price *= quantity

	let item = [
    String(idnum),
    String(product),
    String(quantity),
    "",
    String(design),

    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",

    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    Number(price)
	];

	session.setItem("item", JSON.stringify(item))
	console.log("popup 79 ", session.getItem("item"))

	//set the repeater info to the item
	wixWindowFrontend.lightbox.close(true);
}
