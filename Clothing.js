import { session } from "wix-storage-frontend";
import wixWindowFrontend from 'wix-window-frontend';



let size = ""
let quantity = 1
let numPrints = 0

export function dropdown1_change(event) {
	quantity = Number($w('#dropdown1').value)
}

export function dropdown2_change(event) {
	numPrints = Number($w('#dropdown2').value)
}

export function dropdown5_change(event) {
	size = $w('#dropdown5').value

  if(size.includes("Youth") && product.includes("Signature")){
    base_price -= 10
    price -= 10
  }
}

let n = 0

let idnum = ""
let product = ""
let base_price = 0
let price = 0;

let comfrt_items = ["Signature Hoodie Sky Blue","Signature Hoodie Steel Gray","Signature Hoodie Onyx Black","Affirmation Hoodie Dark Navy","Pastel Hoodie Baby Blue","Minimalist Hoodie Cement","Airplane Mode Travel Hoodie Navy","Signature Straight Leg Sweatpants Sky Blue","Signature Straight Leg Sweatpants Steel Gray","Signature Straight Leg Sweatpants Onyx Black","Affirmation Straight Leg Sweatpants Dark Navy","Pastel Straight Leg Sweatpants Baby Blue"]


$w.onReady(async function () {
	const context = wixWindowFrontend.lightbox.getContext()

	idnum = context.id
	product = context.product
  base_price = context.price
  price = base_price

  $w('#text4').text = product;

	console.log("RECEIVED id:", idnum)
	console.log("RECEIVED product:", product)

  //Comfrt only designs
  if (comfrt_items.includes(product)){  
    $w("#repeater1").forEachItem(($item, itemData, index) => {
    
      /*
      const existingOptions = $item("#dropdown3").options;

      const newOptions = [
          { label: "Bubbly", value: "Bubbly" },
          { label: "Coordinates", value: "Coordinates" },
          { label: "Black Phantom", value: "Black Phantom" },
          { label: "Navy Phantom", value: "Navy Phantom" },
          { label: "Gold Phantom", value: "Gold Phantom" },
          { label: "White Phantom", value: "White Phantom" },
          { label: "Phantom Compass", value: "Phantom Compass" },
          { label: "Phantom Sailboat", value: "Phantom Sailboat" },
          { label: "Phantom Swirl", value: "Phantom Swirl" }
      ];
      

      $item("#dropdown3").options = [...newOptions, ...existingOptions];
      */

      $w('#dropdown5').options = [
        { label: "XS", value: "XS" },
        { label: "S", value: "S" },
        { label: "M", value: "M" },
        { label: "L", value: "L" },
        { label: "XL", value: "XL" },
        { label: "XXL", value: "XXL" },
      ]

    });
  }

  //adds the youth sizes
  if (product.includes("Signature")){
    let opts = $w("#dropdown5").options;
    opts.push({ label: "Youth XS", value: "Youth XS" });
    opts.push({ label: "Youth S", value: "Youth S" });
    opts.push({ label: "Youth M", value: "Youth M" });
    opts.push({ label: "Youth L", value: "Youth L" });
    opts.push({ label: "Youth XL", value: "Youth XL" });

    $w("#dropdown5").options = opts;
  }
  if (product.includes("pants")){
    $w('#dropdown2').options = [
      {label: "0", value: "0"},
      {label: "1", value: "1"},
      {label: "2", value: "2"},
      {label: "3", value: "3"},
      {label: "4", value: "4"}
    ]
  }
});



export function button2_click(event) {
	n+=1

	let printIndexes = []
	let printLocations = []
	
	console.log("id:", idnum)
	console.log("product:", product)

	$w("#repeater1").forEachItem(($item, itemData, index) => {
		printLocations.push($item('#dropdown4').value)
		printIndexes.push($item('#dropdown3').value)
		console.log("updating variables")
	});

  //console.log("is more" + (quantity > 0))

  console.log("price" + price)
  console.log("numPrints" + numPrints)
  console.log("quantity" + quantity)
  console.log((price + (numPrints*2)) * quantity)
  price += numPrints * 2
  price *= quantity

	let item = [
    String(idnum),
    String(product),
    String(quantity),
    String(size),
    String(numPrints),

    String(printIndexes[0]),
    String(printIndexes[1]),
    String(printIndexes[2]),
    String(printIndexes[3]),
    String(printIndexes[4]),
    String(printIndexes[5]),
    String(printIndexes[6]),
    String(printIndexes[7]),

    String(printLocations[0]),
    String(printLocations[1]),
    String(printLocations[2]),
    String(printLocations[3]),
    String(printLocations[4]),
    String(printLocations[5]),
    String(printLocations[6]),
    String(printLocations[7]),
    Number(price)
	];

	session.setItem("item", JSON.stringify(item))
	console.log("popup 79 ", session.getItem("item"))

	//set the repeater info to the item
	wixWindowFrontend.lightbox.close(true);
}



let front = [
  { label: "The Phantom Navy", value: "1" },
  { label: "The Phantom Grey", value: "2" },
  { label: "The Phantom White", value: "3" },
  { label: "The Phantom Gold", value: "4" },
  { label: "BBP Navy Chest", value: "5" },
  { label: "BBP Diagnol", value: "6" },
  { label: "BBP Hawaiian", value: "7" },
  { label: "Flower Phantom ", value: "Flower Phantom " },
  { label: "Class of 2028 White Circle", value: "9"},
  { label: "Class of 2028 Lisence Plate", value: "10"},
  { label: "Amelia Fluke", value: "11" },
  { label: "Classic Football", value: "12" },
  { label: "New Gen Football Chest Navy", value: "13" },
  { label: "New Gen Football Chest Navy & Gold", value: "14" },
  { label: "New Gen Football Chest White", value: "15" },
  { label: "Phantoms Football Words Gold & Navy", value: "16" },
  { label: "Football LI Champs 25 Navy", value: "17" },
  { label: "Football LI Champs 25 White", value: "18" },
  { label: "Lacrosse Front Grey", value: "22" },
  { label: "Lacrosse Front Navy", value: "23" },
  { label: "Lacrosse Chest Navy (BBP & Lacrosse Band Aid)", value: "24" },
  { label: "Lacrosse Chest Gold (BBP & Lacrosse Band Aid)", value: "25" },
  { label: "Phantoms Lacrosse Words Navy & Gold Big", value: "26" },
  { label: "Phantoms Lacrosse Words Navy & Gold Chest", value: "27" },
  { label: "Phantoms Volleyball Classic Front Navy & White", value: "28" },
  { label: "Phantoms Volleyball Classic Chest Gold & White", value: "29" },
  { label: "BBP Volleyball Hawaiian Chest", value: "31" },
  { label: "Gold Volleyball", value: "32" },
  { label: "Grils Volleyball Suffolk Champs 25", value: "33" },
  { label: "Phantoms Girls Soccer Front", value: "34" },
  { label: "Soccer Chest", value: "35" },
  { label: "Phantoms Girls Soccer Chest", value: "36" },
  { label: "Soccer Sportsmanship Award 25", value: "37" },
  { label: "Field Hockey Front", value: "38" },
  { label: "Field Hockey Chest", value: "39" },
  { label: "Field Hockey Champions 25", value: "40" },
  { label: "Girls Basketball Front White", value: "43" },
  { label: "Phantoms Basketball Semicircle Gold", value: "44" },
  { label: "BBP Dance Chest", value: "45" },
  { label: "BBP Dance Front", value: "46" },
  { label: "Cross Country Suffolk Champs 25", value: "47" },
  { label: "Bayport-Blue Point Golf Front", value: "48" },
  { label: "Phantoms Wrestling", value: "50" },
  { label: "BBP Bowling", value: "51" },
  { label: "Robophantoms Chest", value: "52" },
  { label: "Musical sign sheet 2026", value: "53" },
  { label: "Musical logo 2026", value: "54" },
  { label: "Family Navy", value: "55" },
  { label: "Family Grey", value: "56" },
  { label: "Never Quit", value: "57" },
  { label: "No Excuses", value: "58" },
  { label: "Run it White", value: "59" },
  { label: "Discipline White", value: "60" },
  { label: "Discipline Navy", value: "61" }
];

let chest = [
  { label: "The Phantom Navy", value: "1" },
  { label: "The Phantom Grey", value: "2" },
  { label: "The Phantom White", value: "3" },
  { label: "The Phantom Gold", value: "4" },
  { label: "BBP Navy Chest", value: "5" },
  { label: "BBP Diagnol", value: "6" },
  { label: "BBP Hawaiian", value: "7" },
  { label: "Classic Football", value: "12" },
  { label: "New Gen Football Chest Navy", value: "13" },
  { label: "New Gen Football Chest Navy & Gold", value: "14" },
  { label: "New Gen Football Chest White", value: "15" },
  { label: "Lacrosse Chest Navy (BBP & Lacrosse Band Aid)", value: "24" },
  { label: "Lacrosse Chest Gold (BBP & Lacrosse Band Aid)", value: "25" },
  { label: "Phantoms Lacrosse Words Navy & Gold Chest", value: "27" },
  { label: "Phantoms Volleyball Classic Chest Gold & White", value: "29" },
  { label: "BBP Volleyball Hawaiian Chest", value: "31" },
  { label: "Gold Volleyball", value: "32" },
  { label: "Soccer Chest", value: "35" },
  { label: "Phantoms Girls Soccer Chest", value: "36" },
  { label: "Field Hockey Chest", value: "39" },
  { label: "BBP Dance Chest", value: "45" },
  { label: "Robophantoms Chest", value: "52" },
  { label: "Run it White", value: "59" },
];

let shoulder = [
  { label: "The Phantom Navy", value: "1" },
  { label: "The Phantom Grey", value: "2" },
  { label: "The Phantom White", value: "3" },
  { label: "The Phantom Gold", value: "4" },
  { label: "BBP Navy Chest", value: "5" },
  { label: "BBP Diagnol", value: "6" },
  { label: "BBP Hawaiian", value: "7" },
  { label: "Classic Football", value: "12" },
  { label: "New Gen Football Chest Navy", value: "13" },
  { label: "New Gen Football Chest Navy & Gold", value: "14" },
  { label: "New Gen Football Chest White", value: "15" },
  { label: "Lacrosse Chest Navy (BBP & Lacrosse Band Aid)", value: "24" },
  { label: "Lacrosse Chest Gold (BBP & Lacrosse Band Aid)", value: "25" },
  { label: "Phantoms Lacrosse Words Navy & Gold Chest", value: "27" },
  { label: "Phantoms Volleyball Classic Chest Gold & White", value: "29" },
  { label: "BBP Volleyball Hawaiian Chest", value: "31" },
  { label: "Gold Volleyball", value: "32" },
  { label: "Soccer Chest", value: "35" },
  { label: "Phantoms Girls Soccer Chest", value: "36" },
  { label: "Field Hockey Chest", value: "39" },
  { label: "BBP Dance Chest", value: "45" },
  { label: "Robophantoms Chest", value: "52" },
  { label: "Run it White", value: "59" },
];

let wrist = [
  { label: "The Phantom Navy", value: "1" },
  { label: "The Phantom Grey", value: "2" },
  { label: "The Phantom White", value: "3" },
  { label: "The Phantom Gold", value: "4" },
  { label: "BBP Navy Chest", value: "5" },
  { label: "BBP Diagnol", value: "6" },
  { label: "BBP Hawaiian", value: "7" },
  { label: "Classic Football", value: "12" },
  { label: "New Gen Football Chest Navy", value: "13" },
  { label: "New Gen Football Chest Navy & Gold", value: "14" },
  { label: "New Gen Football Chest White", value: "15" },
  { label: "Lacrosse Chest Navy (BBP & Lacrosse Band Aid)", value: "24" },
  { label: "Lacrosse Chest Gold (BBP & Lacrosse Band Aid)", value: "25" },
  { label: "Phantoms Lacrosse Words Navy & Gold Chest", value: "27" },
  { label: "Phantoms Volleyball Classic Chest Gold & White", value: "29" },
  { label: "BBP Volleyball Hawaiian Chest", value: "31" },
  { label: "Gold Volleyball", value: "32" },
  { label: "Soccer Chest", value: "35" },
  { label: "Phantoms Girls Soccer Chest", value: "36" },
  { label: "Field Hockey Chest", value: "39" },
  { label: "BBP Dance Chest", value: "45" },
  { label: "Robophantoms Chest", value: "52" }
];

let back_upper = [
  { label: "The Phantom Navy", value: "1" },
  { label: "The Phantom Grey", value: "2" },
  { label: "The Phantom White", value: "3" },
  { label: "The Phantom Gold", value: "4" },
  { label: "BBP Navy Chest", value: "5" },
  { label: "BBP Diagnol", value: "6" },
  { label: "BBP Hawaiian", value: "7" },
  { label: "Flower Phantom ", value: "8" },
  { label: "Class of 2028 White Circle", value: "9"},
  { label: "Class of 2028 Lisence Plate", value: "10"},
  { label: "Amelia Fluke", value: "11" },
  { label: "Classic Football", value: "12" },
  { label: "New Gen Football Chest Navy", value: "13" },
  { label: "New Gen Football Chest Navy & Gold", value: "14" },
  { label: "New Gen Football Chest White", value: "15" },
  { label: "Phantoms Football Words Gold & Navy", value: "16" },
  { label: "Football LI Champs 25 Navy", value: "17" },
  { label: "Football LI Champs 25 White", value: "18" },
  { label: "Lacrosse Front Grey", value: "22" },
  { label: "Lacrosse Front Navy", value: "23" },
  { label: "Lacrosse Chest Navy (BBP & Lacrosse Band Aid)", value: "24" },
  { label: "Lacrosse Chest Gold (BBP & Lacrosse Band Aid)", value: "25" },
  { label: "Phantoms Lacrosse Words Navy & Gold Big", value: "26" },
  { label: "Phantoms Lacrosse Words Navy & Gold Chest", value: "27" },
  { label: "Phantoms Volleyball Classic Front Navy & White", value: "28" },
  { label: "Phantoms Volleyball Classic Chest Gold & White", value: "29" },
  { label: "BBP Volleyball Hawaiian Chest", value: "31" },
  { label: "Gold Volleyball", value: "32" },
  { label: "Grils Volleyball Suffolk Champs 25", value: "33" },
  { label: "Phantoms Girls Soccer Front", value: "34" },
  { label: "Soccer Chest", value: "35" },
  { label: "Phantoms Girls Soccer Chest", value: "36" },
  { label: "Soccer Sportsmanship Award 25", value: "37" },
  { label: "Field Hockey Front", value: "38" },
  { label: "Field Hockey Chest", value: "39" },
  { label: "Field Hockey Champions 25", value: "40" },
  { label: "Girls Basketball Front White", value: "43" },
  { label: "Phantoms Basketball Semicircle Gold", value: "44" },
  { label: "BBP Dance Chest", value: "45" },
  { label: "BBP Dance Front", value: "46" },
  { label: "Cross Country Suffolk Champs 25", value: "47" },
  { label: "Bayport-Blue Point Golf Front", value: "48" },
  { label: "Phantoms Wrestling", value: "50" },
  { label: "BBP Bowling", value: "51" },
  { label: "Robophantoms Chest", value: "52" },
  { label: "Musical sign sheet 2026", value: "53" },
  { label: "Musical logo 2026", value: "54" },
  { label: "Family Navy", value: "55" },
  { label: "Family Grey", value: "56" },
  { label: "Never Quit", value: "57" },
  { label: "No Excuses", value: "58" },
  { label: "Run it White", value: "59" },
  { label: "Discipline White", value: "60" },
  { label: "Discipline Navy", value: "61" }
];

let back_middle = [
  { label: "Flower Phantom ", value: "8" },
  { label: "Class of 2028 White Circle", value: "9"},
  { label: "Class of 2028 Lisence Plate", value: "10"},
  { label: "Amelia Fluke", value: "11" },
  { label: "Phantoms Football Words Gold & Navy", value: "16" },
  { label: "Football LI Champs 25 Navy", value: "17" },
  { label: "Football LI Champs 25 White", value: "18" },
  { label: "Lacrosse Front Grey", value: "22" },
  { label: "Lacrosse Front Navy", value: "23" },
  { label: "Phantoms Volleyball Classic Front Navy & White", value: "28" },
  { label: "Grils Volleyball Suffolk Champs 25", value: "33" },
  { label: "Phantoms Girls Soccer Front", value: "34" },
  { label: "Soccer Sportsmanship Award 25", value: "37" },
  { label: "Field Hockey Front", value: "38" },
  { label: "Field Hockey Champions 25", value: "40" },
  { label: "Girls Basketball Front White", value: "43" },
  { label: "Phantoms Basketball Semicircle Gold", value: "44" },
  { label: "BBP Dance Front", value: "46" },
  { label: "Cross Country Suffolk Champs 25", value: "47" },
  { label: "Bayport-Blue Point Golf Front", value: "48" },
  { label: "Phantoms Wrestling", value: "50" },
  { label: "BBP Bowling", value: "51" },
  { label: "Musical sign sheet 2026", value: "53" },
  { label: "Musical logo 2026", value: "54" },
  { label: "Family Navy", value: "55" },
  { label: "Family Grey", value: "56" },
  { label: "Never Quit", value: "57" },
  { label: "No Excuses", value: "58" },
  { label: "Run it White", value: "59" },
  { label: "Discipline White", value: "60" },
  { label: "Discipline Navy", value: "61" }
];

let back_lower = [
  { label: "The Phantom Navy", value: "1" },
  { label: "The Phantom Grey", value: "2" },
  { label: "The Phantom White", value: "3" },
  { label: "The Phantom Gold", value: "4" },
  { label: "BBP Navy Chest", value: "5" },
  { label: "BBP Diagnol", value: "6" },
  { label: "BBP Hawaiian", value: "7" },
  { label: "Flower Phantom ", value: "8" },
  { label: "Class of 2028 White Circle", value: "9"},
  { label: "Class of 2028 Lisence Plate", value: "10"},
  { label: "Amelia Fluke", value: "11" },
  { label: "Phantoms Football Words Gold & Navy", value: "16" },
  { label: "Football LI Champs 25 Navy", value: "17" },
  { label: "Football LI Champs 25 White", value: "18" },
  { label: "Lacrosse Front Grey", value: "22" },
  { label: "Lacrosse Front Navy", value: "23" },
  { label: "Lacrosse Chest Navy (BBP & Lacrosse Band Aid)", value: "24" },
  { label: "Lacrosse Chest Gold (BBP & Lacrosse Band Aid)", value: "25" },
  { label: "Phantoms Lacrosse Words Navy & Gold Big", value: "26" },
  { label: "Phantoms Lacrosse Words Navy & Gold Chest", value: "27" },
  { label: "Phantoms Volleyball Classic Front Navy & White", value: "28" },
  { label: "Phantoms Volleyball Classic Chest Gold & White", value: "29" },
  { label: "BBP Volleyball Hawaiian Chest", value: "31" },
  { label: "Gold Volleyball", value: "32" },
  { label: "Grils Volleyball Suffolk Champs 25", value: "33" },
  { label: "Phantoms Girls Soccer Front", value: "34" },
  { label: "Soccer Chest", value: "35" },
  { label: "Phantoms Girls Soccer Chest", value: "36" },
  { label: "Soccer Sportsmanship Award 25", value: "37" },
  { label: "Field Hockey Front", value: "38" },
  { label: "Field Hockey Chest", value: "39" },
  { label: "Field Hockey Champions 25", value: "40" },
  { label: "Girls Basketball Front White", value: "43" },
  { label: "Phantoms Basketball Semicircle Gold", value: "44" },
  { label: "BBP Dance Chest", value: "45" },
  { label: "BBP Dance Front", value: "46" },
  { label: "Cross Country Suffolk Champs 25", value: "47" },
  { label: "Bayport-Blue Point Golf Front", value: "48" },
  { label: "Phantoms Wrestling", value: "50" },
  { label: "BBP Bowling", value: "51" },
  { label: "Robophantoms Chest", value: "52" },
  { label: "Musical sign sheet 2026", value: "53" },
  { label: "Musical logo 2026", value: "54" },
  { label: "Family Navy", value: "55" },
  { label: "Family Grey", value: "56" },
  { label: "Never Quit", value: "57" },
  { label: "No Excuses", value: "58" },
  { label: "Run it White", value: "59" },
  { label: "Discipline White", value: "60" },
  { label: "Discipline Navy", value: "61" }
];

let hood = [
  { label: "The Phantom Navy", value: "1" },
  { label: "The Phantom Grey", value: "2" },
  { label: "The Phantom White", value: "3" },
  { label: "The Phantom Gold", value: "4" },
  { label: "BBP Navy Chest", value: "5" },
  { label: "BBP Diagnol", value: "6" },
  { label: "BBP Hawaiian", value: "7" },
  { label: "Classic Football", value: "12" },
  { label: "New Gen Football Chest Navy", value: "13" },
  { label: "New Gen Football Chest Navy & Gold", value: "14" },
  { label: "New Gen Football Chest White", value: "15" },
  { label: "Lacrosse Chest Navy (BBP & Lacrosse Band Aid)", value: "24" },
  { label: "Lacrosse Chest Gold (BBP & Lacrosse Band Aid)", value: "25" },
  { label: "Phantoms Lacrosse Words Navy & Gold Chest", value: "27" },
  { label: "Phantoms Volleyball Classic Chest Gold & White", value: "29" },
  { label: "BBP Volleyball Hawaiian Chest", value: "31" },
  { label: "Gold Volleyball", value: "32" },
  { label: "Soccer Chest", value: "35" },
  { label: "Phantoms Girls Soccer Chest", value: "36" },
  { label: "Field Hockey Chest", value: "39" },
  { label: "BBP Dance Chest", value: "45" },
  { label: "Robophantoms Chest", value: "52" },
  { label: "Run it White", value: "59" },
  { label: "Modern Phantom White", value: "74" },
  { label: "Modern Phantom Gray", value: "75" },
  { label: "Modern Phantom Navy", value: "76" },
  { label: "Modern Phantom Gold", value: "77" },
  { label: "Phantom Compass", value: "78" },
  { label: "Phantms", value: "83" },
];

let sleeve = [
  { label: "Girls Basketball Front White", value: "43" },
  { label: "Family Navy", value: "55" },
  { label: "Family Grey", value: "56" },
  { label: "Never Quit", value: "57" },
  { label: "No Excuses", value: "58" },
  { label: "Discipline White", value: "60" },
  { label: "Discipline Navy", value: "61" }
];

let leg = [
  { label: "Girls Basketball Front White", value: "43" },
  { label: "Family Navy", value: "55" },
  { label: "Family Grey", value: "56" },
  { label: "Never Quit", value: "57" },
  { label: "No Excuses", value: "58" },
  { label: "Discipline White", value: "60" },
  { label: "Discipline Navy", value: "61" },
];

let pocket = [
  { label: "The Phantom Navy", value: "1" },
  { label: "The Phantom Grey", value: "2" },
  { label: "The Phantom White", value: "3" },
  { label: "The Phantom Gold", value: "4" },
  { label: "BBP Navy Chest", value: "5" },
  { label: "BBP Diagnol", value: "6" },
  { label: "BBP Hawaiian", value: "7" },
  { label: "Classic Football", value: "12" },
  { label: "New Gen Football Chest Navy", value: "13" },
  { label: "New Gen Football Chest Navy & Gold", value: "14" },
  { label: "New Gen Football Chest White", value: "15" },
  { label: "Lacrosse Chest Navy (BBP & Lacrosse Band Aid)", value: "24" },
  { label: "Lacrosse Chest Gold (BBP & Lacrosse Band Aid)", value: "25" },
  { label: "Phantoms Lacrosse Words Navy & Gold Big", value: "26" },
  { label: "Phantoms Lacrosse Words Navy & Gold Chest", value: "27" },
  { label: "Phantoms Volleyball Classic Chest Gold & White", value: "29" },
  { label: "BBP Volleyball Hawaiian Chest", value: "31" },
  { label: "Gold Volleyball", value: "32" },
  { label: "Soccer Chest", value: "35" },
  { label: "Phantoms Girls Soccer Chest", value: "36" },
  { label: "Field Hockey Chest", value: "39" },
  { label: "BBP Dance Chest", value: "45" },
  { label: "Robophantoms Chest", value: "52" },
  { label: "Run it White", value: "59" },
];

let ankle = [
  { label: "The Phantom Navy", value: "1" },
  { label: "The Phantom Grey", value: "2" },
  { label: "The Phantom White", value: "3" },
  { label: "The Phantom Gold", value: "4" },
  { label: "BBP Navy Chest", value: "5" },
  { label: "BBP Diagnol", value: "6" },
  { label: "BBP Hawaiian", value: "7" },
  { label: "Classic Football", value: "12" },
  { label: "New Gen Football Chest Navy", value: "13" },
  { label: "New Gen Football Chest Navy & Gold", value: "14" },
  { label: "New Gen Football Chest White", value: "15" },
  { label: "Lacrosse Chest Navy (BBP & Lacrosse Band Aid)", value: "24" },
  { label: "Lacrosse Chest Gold (BBP & Lacrosse Band Aid)", value: "25" },
  { label: "Phantoms Lacrosse Words Navy & Gold Big", value: "26" },
  { label: "Phantoms Lacrosse Words Navy & Gold Chest", value: "27" },
  { label: "Phantoms Volleyball Classic Chest Gold & White", value: "29" },
  { label: "BBP Volleyball Hawaiian Chest", value: "31" },
  { label: "Gold Volleyball", value: "32" },
  { label: "Soccer Chest", value: "35" },
  { label: "Phantoms Girls Soccer Chest", value: "36" },
  { label: "Field Hockey Chest", value: "39" },
  { label: "BBP Dance Chest", value: "45" },
];

// Run once after all arrays are declared
[
  front,
  chest,
  shoulder,
  wrist,
  back_upper,
  back_middle,
  back_lower,
  hood,
  sleeve,
  leg,
  pocket,
  ankle
].forEach(arr => {
  arr.forEach(item => {
    item.value = item.label;
  });
});

const front_comfrt = [
  { label: "Modern Phantom White", value: "Modern Phantom White" },
  { label: "Modern Phantom Gray", value: "Modern Phantom Gray" },
  { label: "Modern Phantom Navy", value: "Modern Phantom Navy" },
  { label: "Modern Phantoms Gold", value: "Modern Phantoms Gold" },
  { label: "Phantom Compass", value: "Phantom Compass" },
  { label: "Bubbly Bayport Blue Point", value: "Bubbly Bayport Blue Point" },
  { label: "Phantoms Sailboat", value: "Phantoms Sailboat" },
  { label: "Phantoms Swirl", value: "Phantoms Swirl" },
  { label: "Phantms", value: "Phantms" },
  { label: "Aloha Friday", value: "Aloha Friday" }
];

const chest_comfrt = [
  { label: "Modern Phantom White", value: "Modern Phantom White" },
  { label: "Modern Phantom Gray", value: "Modern Phantom Gray" },
  { label: "Modern Phantom Navy", value: "Modern Phantom Navy" },
  { label: "Modern Phantoms Gold", value: "Modern Phantoms Gold" },
  { label: "Phantom Compass", value: "Phantom Compass" },
  { label: "Phantms", value: "Phantms" }
];

const shoulder_comfrt = [
  { label: "Modern Phantom White", value: "Modern Phantom White" },
  { label: "Modern Phantom Gray", value: "Modern Phantom Gray" },
  { label: "Modern Phantom Navy", value: "Modern Phantom Navy" },
  { label: "Modern Phantoms Gold", value: "Modern Phantoms Gold" },
  { label: "Phantom Compass", value: "Phantom Compass" },
  { label: "Phantms", value: "Phantms" }
];

const wrist_comfrt = [
  { label: "Modern Phantom White", value: "Modern Phantom White" },
  { label: "Modern Phantom Gray", value: "Modern Phantom Gray" },
  { label: "Modern Phantom Navy", value: "Modern Phantom Navy" },
  { label: "Modern Phantoms Gold", value: "Modern Phantoms Gold" },
  { label: "Phantom Compass", value: "Phantom Compass" },
  { label: "Phantms", value: "Phantms" }
];

const back_upper_comfrt = [
  { label: "Modern Phantom White", value: "Modern Phantom White" },
  { label: "Modern Phantom Gray", value: "Modern Phantom Gray" },
  { label: "Modern Phantom Navy", value: "Modern Phantom Navy" },
  { label: "Modern Phantoms Gold", value: "Modern Phantoms Gold" },
  { label: "Phantom Compass", value: "Phantom Compass" },
  { label: "Bubbly Bayport Blue Point", value: "Bubbly Bayport Blue Point" },
  { label: "Phantoms Sailboat", value: "Phantoms Sailboat" },
  { label: "Phantoms Swirl", value: "Phantoms Swirl" },
  { label: "Phantms", value: "Phantms" },
  { label: "Aloha Friday", value: "Aloha Friday" }
];

const back_middle_comfrt = [
  { label: "Bubbly Bayport Blue Point", value: "Bubbly Bayport Blue Point" },
  { label: "Phantoms Sailboat", value: "Phantoms Sailboat" },
  { label: "Phantoms Swirl", value: "Phantoms Swirl" },
  { label: "Aloha Friday", value: "Aloha Friday" }
];

const back_lower_comfrt = [
  { label: "Modern Phantom White", value: "Modern Phantom White" },
  { label: "Modern Phantom Gray", value: "Modern Phantom Gray" },
  { label: "Modern Phantom Navy", value: "Modern Phantom Navy" },
  { label: "Modern Phantoms Gold", value: "Modern Phantoms Gold" },
  { label: "Phantom Compass", value: "Phantom Compass" },
  { label: "Bubbly Bayport Blue Point", value: "Bubbly Bayport Blue Point" },
  { label: "Phantoms Sailboat", value: "Phantoms Sailboat" },
  { label: "Phantoms Swirl", value: "Phantoms Swirl" },
  { label: "Phantms", value: "Phantms" },
  { label: "Aloha Friday", value: "Aloha Friday" }
];

const hood_comfrt = [
  { label: "Modern Phantom White", value: "Modern Phantom White" },
  { label: "Modern Phantom Gray", value: "Modern Phantom Gray" },
  { label: "Modern Phantom Navy", value: "Modern Phantom Navy" },
  { label: "Modern Phantoms Gold", value: "Modern Phantoms Gold" },
  { label: "Phantom Compass", value: "Phantom Compass" },
  { label: "Phantms", value: "Phantms" }
];

const sleeve_comfrt = [
  { label: "Coordinates", value: "Coordinates" }
];

const leg_comfrt = [
  { label: "Coordinates", value: "Coordinates" }
];

const pocket_comfrt = [
  { label: "Modern Phantom White", value: "Modern Phantom White" },
  { label: "Modern Phantom Gray", value: "Modern Phantom Gray" },
  { label: "Modern Phantom Navy", value: "Modern Phantom Navy" },
  { label: "Modern Phantoms Gold", value: "Modern Phantoms Gold" },
  { label: "Phantom Compass", value: "Phantom Compass" },
  { label: "Phantms", value: "Phantms" }
];

const ankle_comfrt = [
  { label: "Modern Phantom White", value: "Modern Phantom White" },
  { label: "Modern Phantom Gray", value: "Modern Phantom Gray" },
  { label: "Modern Phantom Navy", value: "Modern Phantom Navy" },
  { label: "Modern Phantoms Gold", value: "Modern Phantoms Gold" },
  { label: "Phantom Compass", value: "Phantom Compass" },
  { label: "Phantms", value: "Phantms" }
];


$w("#repeater1").forEachItem(($item, itemData, index) => {
	$item('#dropdown4').onChange((event) => {
    if ($item('#dropdown4').value == "Front") {
      $item("#dropdown3").options = front;
    } else if ($item('#dropdown4').value == "Chest") {
      $item("#dropdown3").options = chest;
    } else if ($item('#dropdown4').value == "Left Shoulder" || $item('#dropdown4').value == "Right Shoulder") {
      $item("#dropdown3").options = shoulder;
    } else if ($item('#dropdown4').value == "Left Wrist" || $item('#dropdown4').value == "Right Wrist") {
      $item("#dropdown3").options = wrist;
    } else if ($item('#dropdown4').value == "Back Upper") {
      $item("#dropdown3").options = back_upper;
    } else if ($item('#dropdown4').value == "Back Middle") {
      $item("#dropdown3").options = back_middle;
    } else if ($item('#dropdown4').value == "Back Lower") {
      $item("#dropdown3").options = back_lower;
    } else if ($item('#dropdown4').value == "Left Sleeve" || $item('#dropdown4').value == "Right Sleeve") {
      $item("#dropdown3").options = sleeve;
    } else if ($item('#dropdown4').value == "Left Leg" || $item('#dropdown4').value == "Right Leg") {
      $item("#dropdown3").options = leg;
    } else if ($item('#dropdown4').value == "Left Pocket" || $item('#dropdown4').value == "Right Pocket") {
      $item("#dropdown3").options = pocket;
    } else if ($item('#dropdown4').value == "Left Ankle" || $item('#dropdown4').value == "Right Ankle") {
      $item("#dropdown3").options = ankle;
    } else if ($item('#dropdown4').value == "Hood") {
      $item("#dropdown3").options = hood;
    }

    //console.log("check", $w('#text4').text)
    //console.log(comfrt_items.includes($w('#text4').text))
    //if(comfrt_items.includes($w('#text4').text)){
    let current = $item('#dropdown3').options;
    let adding = [];

    //console.log($item('#dropdown4').value == "Front")
    if ($item('#dropdown4').value == "Front") {
      adding = front_comfrt;

    } else if ($item('#dropdown4').value == "Chest") {
      adding = chest_comfrt;

    } else if ($item('#dropdown4').value == "Left Shoulder" || $item('#dropdown4').value == "Right Shoulder") {
      adding = shoulder_comfrt;

    } else if ($item('#dropdown4').value == "Left Wrist" || $item('#dropdown4').value == "Right Wrist") {
      adding = wrist_comfrt;

    } else if ($item('#dropdown4').value == "Back Upper") {
      adding = back_upper_comfrt;

    } else if ($item('#dropdown4').value == "Back Middle") {
      adding = back_middle_comfrt;

    } else if ($item('#dropdown4').value == "Back Lower") {
      adding = back_lower_comfrt;

    } else if ($item('#dropdown4').value == "Left Sleeve" || $item('#dropdown4').value == "Right Sleeve") {
      adding = sleeve_comfrt;

    } else if ($item('#dropdown4').value == "Left Leg" || $item('#dropdown4').value == "Right Leg") {
      adding = leg_comfrt;

    } else if ($item('#dropdown4').value == "Left Pocket" || $item('#dropdown4').value == "Right Pocket") {
      adding = pocket_comfrt;

    } else if ($item('#dropdown4').value == "Left Ankle" || $item('#dropdown4').value == "Right Ankle") {
      adding = ankle_comfrt;

    } else if ($item('#dropdown4').value == "Hood") {
      adding = hood_comfrt;
    }

    $item("#dropdown3").options = [...adding, ...current];
    //}
	})
});


/* 
$w("#repeater1").forEachItem(($item, itemData, index) => {
  $item('#dropdown4').onChange((event) => {

    let base = [];

    // -------------------------
    // BASE OPTIONS (normal)
    // -------------------------
    if ($item('#dropdown4').value == "Front") {
      base = front;

    } else if ($item('#dropdown4').value == "Chest") {
      base = chest;

    } else if ($item('#dropdown4').value == "Left Shoulder" || $item('#dropdown4').value == "Right Shoulder") {
      base = shoulder;

    } else if ($item('#dropdown4').value == "Left Wrist" || $item('#dropdown4').value == "Right Wrist") {
      base = wrist;

    } else if ($item('#dropdown4').value == "Back Upper") {
      base = back_upper;

    } else if ($item('#dropdown4').value == "Back Middle") {
      base = back_middle;

    } else if ($item('#dropdown4').value == "Back Lower") {
      base = back_lower;

    } else if ($item('#dropdown4').value == "Left Sleeve" || $item('#dropdown4').value == "Right Sleeve") {
      base = sleeve;

    } else if ($item('#dropdown4').value == "Left Leg" || $item('#dropdown4').value == "Right Leg") {
      base = leg;

    } else if ($item('#dropdown4').value == "Left Pocket" || $item('#dropdown4').value == "Right Pocket") {
      base = pocket;

    } else if ($item('#dropdown4').value == "Left Ankle" || $item('#dropdown4').value == "Right Ankle") {
      base = ankle;

    } else if ($item('#dropdown4').value == "Hood") {
      base = hood;
    }

    // -------------------------
    // COMFRT CHECK
    // -------------------------
    let finalOptions = base;

    if (comfrt_items.includes($w('#text4').text)) {

      let prefix = [];

      if ($item('#dropdown4').value == "Front") {
        prefix = front_comfrt;

      } else if ($item('#dropdown4').value == "Chest") {
        prefix = chest_comfrt;

      } else if ($item('#dropdown4').value == "Left Shoulder" || $item('#dropdown4').value == "Right Shoulder") {
        prefix = shoulder_comfrt;

      } else if ($item('#dropdown4').value == "Left Wrist" || $item('#dropdown4').value == "Right Wrist") {
        prefix = wrist_comfrt;

      } else if ($item('#dropdown4').value == "Back Upper") {
        prefix = back_upper_comfrt;

      } else if ($item('#dropdown4').value == "Back Middle") {
        prefix = back_middle_comfrt;

      } else if ($item('#dropdown4').value == "Back Lower") {
        prefix = back_lower_comfrt;

      } else if ($item('#dropdown4').value == "Left Sleeve" || $item('#dropdown4').value == "Right Sleeve") {
        prefix = sleeve_comfrt;

      } else if ($item('#dropdown4').value == "Left Leg" || $item('#dropdown4').value == "Right Leg") {
        prefix = leg_comfrt;

      } else if ($item('#dropdown4').value == "Left Pocket" || $item('#dropdown4').value == "Right Pocket") {
        prefix = pocket_comfrt;

      } else if ($item('#dropdown4').value == "Left Ankle" || $item('#dropdown4').value == "Right Ankle") {
        prefix = ankle_comfrt;

      } else if ($item('#dropdown4').value == "Hood") {
        prefix = hood_comfrt;
      }

      finalOptions = [...prefix, ...base];
    }

    // -------------------------
    // APPLY ONCE
    // -------------------------
    $item("#dropdown3").options = finalOptions;
  });
});
*/


//attempt at auto-populating the choices for all dropdowns on page ready, but didn't work
/*
  $w("#repeater1").onItemReady(($item, itemData, index) => {
      $item('#dropdown4').options = [
        { label: "Front", value: "Front" },
        { label: "Chest", value: "Chest" },
        { label: "Left Shoulder", value: "Left Shoulder" },
        { label: "Right Shoulder", value: "Right Shoulder" },
        { label: "Left Wrist", value: "Left Wrist" },
        { label: "Right Wrist", value: "Right Wrist" },
        { label: "Back Upper", value: "Back Upper" },
        { label: "Back Middle", value: "Back Middle" },
        { label: "Back Lower", value: "Back Lower" },
        { label: "Left Sleeve", value: "Left Sleeve" },
        { label: "Right Sleeve", value: "Right Sleeve" },
        { label: "Left Leg", value: "Left Leg" },
        { label: "Right Leg", value: "Right Leg" },
        { label: "Left Pocket", value: "Left Pocket" },
        { label: "Right Pocket", value: "Right Pocket" },
        { label: "Left Ankle", value: "Left Ankle" },
        { label: "Right Ankle", value: "Right Ankle" },
      ];
  });

$w.onReady(function () {

});
*/
