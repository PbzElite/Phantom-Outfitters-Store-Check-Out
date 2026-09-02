import { session } from "wix-storage-frontend";
import wixWindowFrontend from 'wix-window-frontend';



let patch_shape = ""
let design = ""
let quantity = 1
let color = ""

export function dropdown1_change(event) {
	quantity = Number($w('#dropdown1').value)
}

export function dropdown5_change(event) {
	patch_shape = $w('#dropdown5').value
}

$w('#dropdown3').onChange((event) => {
  design = $w('#dropdown3').value  
})

$w('#dropdown6').onChange((event) => {
  color = $w('#dropdown6').value  
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

  $w('#dropdown5').options = [
    { label: "Rectangle", value: "Rectangle" },
    { label: "Square", value: "Square" },
    { label: "Circle", value: "Circle" },
    { label: "Oval", value: "Oval" }
  ]

  $w('#dropdown6').options = [
      { label: "Heather Gray/Navy", value: "Heather Gray/Navy" },
      { label: "Royal/White", value: "Royal/White" },
      { label: "Navy/White", value: "Navy/White" },
      { label: "Black/Charcoal", value: "Black/Charcoal" }
  ];

  $w('#dropdown3').options = [
    { label: "The Phantom (Hat 1)", value: "The Phantom (Hat 1)" },
    { label: "The Clocktower (Hat 2)", value: "The Clocktower (Hat 2)" },
    { label: "BBP Diagonal (Hat 3)", value: "BBP Diagonal (Hat 3)" },
    { label: "BBP Circle (Hat 4)", value: "BBP Circle (Hat 4)" },
    { label: "BBP Spiky (Hat 5)", value: "BBP Spiky (Hat 5)" },
    { label: "Phantoms Bowling (Hat 6)", value: "Phantoms Bowling (Hat 6)" },
    { label: "Phantoms Cheerleading (Hat 7)", value: "Phantoms Cheerleading (Hat 7)" },
    { label: "Phantoms Competitive Cheerleading (Hat 8)", value: "Phantoms Competitive Cheerleading (Hat 8)" },
    { label: "Phantoms Cross Country (Hat 9)", value: "Phantoms Cross Country (Hat 9)" },
    { label: "Phantoms Baseball (Hat 10)", value: "Phantoms Baseball (Hat 10)" },
    { label: "Phantoms Basketball (Hat 11)", value: "Phantoms Basketball (Hat 11)" },
    { label: "Phantoms Field Hockey (Hat 12)", value: "Phantoms Field Hockey (Hat 12)" },
    { label: "Phantoms Football (Hat 13)", value: "Phantoms Football (Hat 13)" },
    { label: "Phantoms Lacrosse (Hat 14)", value: "Phantoms Lacrosse (Hat 14)" },
    { label: "Phantoms Soccer (Hat 15)", value: "Phantoms Soccer (Hat 15)" },
    { label: "Phantoms Softball (Hat 16)", value: "Phantoms Softball (Hat 16)" },
    { label: "Phantoms Spring Track (Hat 17)", value: "Phantoms Spring Track (Hat 17)" },
    { label: "Phantoms Swimming (Hat 18)", value: "Phantoms Swimming (Hat 18)" },
    { label: "Phantoms Tennis (Hat 19)", value: "Phantoms Tennis (Hat 19)" },
    { label: "Phantoms Winter Track (Hat 20)", value: "Phantoms Winter Track (Hat 20)" },
    { label: "Phantoms Volleyball (Hat 21)", value: "Phantoms Volleyball (Hat 21)" },
    { label: "Guitar Club (Hat 22)", value: "Guitar Club (Hat 22)" }
];
});



export function button2_click(event) {
	
	console.log("id:", idnum)
	console.log("product:", product)

  price *= quantity

	let item = [
    String(idnum),
    String(product),
    String(quantity),
    String(patch_shape),
    String(design),

    String(color),
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
