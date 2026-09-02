import wixWindowFrontend from "wix-window-frontend";
import { session } from "wix-storage-frontend";
import wixData from 'wix-data';
import wixLocation from 'wix-location-frontend';

let userOrder = []

//TO DO:
//add price feature and price display
//add error system if the inventory is 0

$w.onReady(async function () {	
	$w('#repeater1').data = userOrder

	//Define how each item in the repeater should be displayed
	//This also Handles the repeater removal process

	$w("#repeater1").onItemReady(($item, itemData, index) => {
		$item('#vectorImage2').onClick((event) => {
			//$item('#box13').style.backgroundColor = 'rgba(220, 232, 254, 1)';
			let removing = itemData._id
			
			cart_price -= itemData.price

			$w('#text46').text = "Total: $" + cart_price

			let data = $w('#repeater1').data;
			let newData = data.filter(item => item._id !== removing);

			$w('#repeater1').data = newData;
		})

		$item('#box13').onMouseIn((event) => {
			$item('#box13').style.backgroundColor = 'rgba(194, 194, 194, 1)';
		})

		$item('#box13').onMouseOut((event) => {
			$item('#box13').style.backgroundColor = 'rgba(240, 240, 240, 1)';
		})

		$item('#text11').text = itemData.product;
		$item('#text14').text = itemData.quantity;
		$item('#text15').text = itemData.numPrints;
		console.log("updated")
	});
});

let n =  0
let index = 0

let cashier = ""
let customer = ""
let position = ""
let email = ""
let cart_price = 0

$w('#imageX8').onClick((event) => {
	add_item("Signature Hoodie Sky Blue",55)
})

$w('#imageX7').onClick((event) => {
    add_item("Signature Hoodie Steel Gray",55)
})

$w('#imageX20').onClick((event) => {
    add_item("Signature Hoodie Onyx Black",55)
})

$w('#imageX21').onClick((event) => {
    add_item("Affirmation Hoodie Dark Navy",55)
})

$w('#imageX22').onClick((event) => {
    add_item("Pastel Hoodie Baby Blue",55)
})

$w('#imageX23').onClick((event) => {
    add_item("Minimalist Hoodie Cement",55)
})

$w('#imageX24').onClick((event) => {
    add_item("Airplane Mode Travel Hoodie Navy",55)
})

$w('#imageX25').onClick((event) => {
    add_item("Signature Straight Leg Sweatpants Sky Blue",45)
})

$w('#imageX26').onClick((event) => {
    add_item("Signature Straight Leg Sweatpants Steel Gray",45)
})

$w('#imageX27').onClick((event) => {
    add_item("Signature Straight Leg Sweatpants Onyx Black",45)
})

$w('#imageX28').onClick((event) => {
    add_item("Pastel Straight Leg Sweatpants Baby Blue",45)
})

$w('#imageX29').onClick((event) => {
    add_item("Affirmation Straight Leg Sweatpants Dark Navy",45)
})

$w('#imageX30').onClick(() => {
    add_item("Standard Sweatshirt Black",40)
})

$w('#imageX31').onClick(() => {
    add_item("Standard Sweatshirt Navy",40)
})

$w('#imageX32').onClick(() => {
    add_item("Standard Sweatshirt Heather Gray",40)
})

$w('#imageX33').onClick(() => {
    add_item("Standard Sweatshirt White",40)
})

$w('#imageX34').onClick(() => {
    add_item("Standard Crewnecks Heather Gray",35)
})

$w('#imageX35').onClick(() => {
    add_item("Standard Sweatpants Navy",30)
})

$w('#imageX36').onClick(() => {
    add_item("Standard Sweatpants Heather Gray",30)
})

$w('#imageX38').onClick(() => {
    add_item("Standard T-Shirt White",20)
})

$w('#imageX37').onClick(() => {
    add_item("Standard T-Shirt Navy",20)
})

$w('#imageX40').onClick(() => {
    add_item("Standard T-Shirt Gray",20)
})

$w('#imageX39').onClick(() => {
    add_item("Standard T-Shirt Pink",20)
})

$w('#imageX41').onClick(() => {
    add_item("Standard Long Sleeves White",25)
})

$w('#imageX45').onClick(() => {
    add_item("Standard Long Sleeves Black",25)
})

$w('#imageX46').onClick(() => {
    add_item("Standard Long Sleeves Navy",25)
})

$w('#imageX47').onClick(() => {
    add_item("Standard Long Sleeves Gray",25)
})

$w('#imageX43').onClick(() => {
    add_item_sign("Long Island Sign",50)
})

$w('#imageX44').onClick(() => {
    add_item_hat("Hat",30)
})

function add_item(item, price) {
	index += 1
	//console.log("37 ", index)

	let id = index.toString()
	let product = item
	//console.log("41 ", id)

	wixWindowFrontend.openLightbox("Center", {
		id: id,
		product: product,
		price: price
	}).then((data) => {
		console.log("lightbox closed")
		console.log(data)
		if (data){
			refreshRepeater();
		}
	});
}

function add_item_hat(item,price) {
	index += 1
	console.log("37 ", index)

	let id = index.toString()
	let product = item
	console.log("41 ", id)

	wixWindowFrontend.openLightbox("Hats", {
		id: id,
		product: product,
		price: price
	}).then((data) => {
		console.log("lightbox closed")
		if (data) {
			refreshRepeater();
		}
	});

}

function add_item_sign(item,price) {
	index += 1
	console.log("37 ", index)

	let id = index.toString()
	let product = item
	console.log("41 ", id)

	wixWindowFrontend.openLightbox("Signs", {
		id: id,
		product: product,
		price: price
	}).then((data) => {
		console.log("lightbox closed")
		//console.log(data)
		if (data){
			refreshRepeater();
		}
	});

}

function refreshRepeater(){
	let item1 = JSON.parse(session.getItem("item"))

	console.log("item:", item1)

	let item2 = {
		_id: Date.now().toString() + "-" + Math.floor(Math.random() * 10000),
		cashier: cashier,
		customer: customer,
		position: position,
		email: email,
		product: item1[1],
		quantity: item1[2],
		size: item1[3],
		price: item1[21],
		numPrints: item1[4],
		print1: item1[5],
		print2: item1[6],
		print3: item1[7],
		print4: item1[8],
		print5: item1[9],
		print6: item1[10],
		print7: item1[11],
		print8: item1[12],
		printLocation1: item1[13],
		printLocation2: item1[14],
		printLocation3: item1[15],
		printLocation4: item1[16],
		printLocation5: item1[17],
		printLocation6: item1[18],
		printLocation7: item1[19],
		printLocation8: item1[20],
		fulfilled: "no",
	}

	let tempData = $w('#repeater1').data;
	$w("#repeater1").data = tempData.concat(item2)
	console.log("update1")

	cart_price += item2.price
	$w('#text46').text = "Total: $" + (cart_price + cart_price * .04)
}

/*
export function button1_click(event) {
	$w("#repeater1").forEachItem(($item, itemData, index) => {
		console.log(itemData)
		//add_CMS()

		wixData.insert("storeinventorydemo", itemData).then((results) => {
			console.log("Item inserted:", results);

			console.log("247",itemData.product + itemData.size)
			if(needsInventory.includes(itemData.product)) {
				//update inventory
				console.log("247:", itemData.product)
				//updateInventory(itemData.product,itemData.size,itemData.quantity)
			}
			
			$w('#text16').show()
		})
		.catch((err) => {
			console.error("Error:", err);
		});
	});
}
*/

export async function button1_click(event) {
	$w("#repeater1").forEachItem(($item) => {
		$item('#box13').style.backgroundColor = 'rgba(240, 240, 240, 1)';
	});

    let hasError = false;
    let errorMessages = []; 
	
	// loop through repeater items
    const items = $w('#repeater1').data;

//old code 
/*
    for (let i = 0; i < items.length; i++) {
        let itemData = items[i];

        // only check items that need inventory
        if (needsInventory.includes(itemData.product)) {

            const result = await checkInventory(itemData);

            if (!result.ok) {
                hasError = true;

                // highlight the bad repeater item
                $w("#repeater1").forItems([itemData._id], ($item) => {
                    $item('#box13').style.backgroundColor = 'rgba(255, 150, 150, 1)';
                });

                console.log(`Error with ${itemData.product}: ${result.reason}`);
            }
        }
    }
*/

	let printUsage = {}; // NEW: track total usage of each print

	for (let i = 0; i < items.length; i++) {
		let itemData = items[i];

		// PRINT FIELD VALIDATION
		let requiredPrints = Number(itemData.numPrints) || 0;

		let designs = [
			itemData.print1,
			itemData.print2,
			itemData.print3,
			itemData.print4,
			itemData.print5,
			itemData.print6,
			itemData.print7,
			itemData.print8
		];

		let locations = [
			itemData.printLocation1,
			itemData.printLocation2,
			itemData.printLocation3,
			itemData.printLocation4,
			itemData.printLocation5,
			itemData.printLocation6,
			itemData.printLocation7,
			itemData.printLocation8
		];

		let completedPrints = 0;
		let printError = false;

		for (let j = 0; j < requiredPrints; j++) {
			let hasDesign = designs[j] && designs[j] !== "" && designs[j] !== "undefined";
			let hasLocation = locations[j] && locations[j] !== "" && locations[j] !== "undefined";

			if (hasDesign && hasLocation) {
				completedPrints++;
			} else {
				printError = true;
			}
		}

		// If extra print fields filled beyond numPrints
		for (let j = requiredPrints; j < 8; j++) {
			let extraDesign = designs[j] && designs[j] !== "" && designs[j] !== "undefined";
			let extraLocation = locations[j] && locations[j] !== "" && locations[j] !== "undefined";

			if (extraDesign || extraLocation) {
				printError = true;
			}
		}

		if (requiredPrints > 0 && (completedPrints !== requiredPrints || printError)) {
			hasError = true;

			$w("#repeater1").forItems([itemData._id], ($item) => {
				$item('#box13').style.backgroundColor = 'rgba(255, 150, 150, 1)';
			});

			errorMessages.push(`${itemData.product}: incorrect print selections`);
			continue;
		}

		// CLOTHING CHECK (unchanged)
		if (needsInventory.includes(itemData.product)) {

			const result = await checkInventory(itemData);

			if (!result.ok) {
				hasError = true;

				$w("#repeater1").forItems([itemData._id], ($item) => {
					$item('#box13').style.backgroundColor = 'rgba(255, 150, 150, 1)';
				});

				errorMessages.push(`${itemData.product} (${itemData.size}) Not Enough In Stock`);
			}
		}

		// NEW: PRINT CHECK (COLLECT ONLY)
		let prints = [
			itemData.print1,
			itemData.print2,
			itemData.print3,
			itemData.print4,
			itemData.print5,
			itemData.print6,
			itemData.print7,
			itemData.print8
		];

		prints.forEach(p => {
			//if (p && p !== "" && p !== "undefined") {
			if (
				p &&
				p !== "" &&
				p !== "undefined" &&
				printsNeedingInventory.includes(p)
			) {
				let qty = Number(itemData.quantity) || 1;

				if (!printUsage[p]) {
					printUsage[p] = 0;
				}

				printUsage[p] += qty;
			}
		});
	}

	// NEW: VALIDATE PRINT TOTALS
	for (let printId in printUsage) {
		console.log("454", printId)
		const result = await checkPrintInventory(printId);

		if (!result.ok || result.count < printUsage[printId]) {
			hasError = true;

			errorMessages.push(`Print ${printId} out of stock`);

			// highlight ALL items using this print
			$w("#repeater1").forEachItem(($item, itemData) => {
				let prints = [
					itemData.print1,
					itemData.print2,
					itemData.print3,
					itemData.print4,
					itemData.print5,
					itemData.print6,
					itemData.print7,
					itemData.print8
				];

				if (prints.includes(printId)) {
					$item('#box13').style.backgroundColor = 'rgba(255, 150, 150, 1)';
				}
			});
		}
	}

    // STOP if any errors
    if (hasError) {
        //$w('#text16').text = "Some items are out of stock or unavailable.";
        $w('#text16').text = errorMessages.join(" | ");
		$w('#text16').show();
        return;
    }

	/*
    // If all good → insert + update inventory
    for (let i = 0; i < items.length; i++) {
        let itemData = items[i];

        await wixData.insert("storeinventorydemo", itemData);

        if (needsInventory.includes(itemData.product)) {
            //await updateInventory(itemData.product, itemData.size, itemData.quantity);
			console.log(itemData.product, itemData.size, itemData.quantity)
		}
    }
	*/

	/*
	// INSERT + UPDATE
    for (let i = 0; i < items.length; i++) {
        let itemData = items[i];

        await wixData.insert("storeinventorydemo", itemData);

        if (needsInventory.includes(itemData.product)) {
            console.log("WOOOO")
			await updateInventory(itemData.product, itemData.size, itemData.quantity);
			// NEW: update print inventory
			let prints = [
				itemData.print1,
				itemData.print2,
				itemData.print3,
				itemData.print4,
				itemData.print5,
				itemData.print6,
				itemData.print7,
				itemData.print8
			];

			for (let p of prints) {
				if (p && p !== "" && p !== "undefined") {
					console.log("WOOO PRINTS")
					await updateInventory(p, "", itemData.quantity);
				}
			}
		}
    }
	*/

		// INSERT + UPDATE
	for (let i = 0; i < items.length; i++) {
		let itemData = items[i];

		await wixData.insert("storeinventorydemo", itemData);

		// ✅ CLOTHING inventory (only if needed)
		if (needsInventory.includes(itemData.product)) {
			await updateInventory(itemData.product, itemData.size, itemData.quantity);
		}

		// ✅ PRINT inventory (ALWAYS runs, independent)
		let prints = [
			itemData.print1,
			itemData.print2,
			itemData.print3,
			itemData.print4,
			itemData.print5,
			itemData.print6,
			itemData.print7,
			itemData.print8
		];
		console.log("557", prints)

		for (let p of prints) {
			console.log("printsupdate1")
			console.log(p)
			console.log(p !== "") //false
			console.log(printsNeedingInventory.includes(p)) //false
			if (p && p !== "" && p !== "undefined" &&
    printsNeedingInventory.includes(p)) {
				console.log("printsupdate")
				await updateInventory(p, "", itemData.quantity);
			}
		}
	}

    $w('#text16').text = "Order placed successfully!";
    $w('#text16').show();
}


//need way to change the account for prints

//change the count in inventory
export async function updateInventory(itemId,size,quantity) {
    console.log("update attempt initiated")
	// 1. Get the current item from the collection
	//const item = await wixData.get("POInventory", itemId);
	console.log("item: ",(itemId+size).replaceAll(' ','-'))
	console.log("271 ", itemId.replaceAll(' ','-'))
	wixData.get("POInventory", (itemId+size).replaceAll(' ','-'))
	.then((item) => {
		//console.log("267:",item)
	
		//if quantity <= 0, then return an error, change the text, if not, return success

		console.log("268:",item.count)
		//item.count = (item.count || 0) - quantity; // updated count
				
		if (item.count < quantity) {
			throw new Error("Inventory would go negative");
		}

		item.count -= quantity;
		
		wixData.update("POInventory", item);
		console.log(item); //see item below
	})
	.catch((err) => {
		console.log(err);
	});
}


async function checkInventory(itemData) {
    try {
        const id = (itemData.product + itemData.size).replaceAll(' ', '-');
        const item = await wixData.get("POInventory", id);

        if (!item || item.count <= 0) {
            return { ok: false, reason: "Out of stock" };
        }

        if (item.count < Number(itemData.quantity)) {
            return { ok: false, reason: "Not enough inventory" };
        }

        return { ok: true };

    } catch (err) {
        console.log("Inventory error:", err);
        return { ok: false, reason: "Inventory lookup failed" };
    }
}

async function checkPrintInventory(printId) {
    try {
        const item = await wixData.get("POInventory", printId.replaceAll(" ","-"));

        if (!item || item.count <= 0) {
            return { ok: false, reason: "Print out of stock" };
        }

        return { ok: true, count: item.count };

    } catch (err) {
        console.log("Print inventory error:", err);
        return { ok: false, reason: "Print lookup failed" };
    }
}

$w('#input1').onChange((event) => {
	cashier = $w('#input1').value
})

$w('#input2').onChange((event) => {
    customer = $w('#input2').value
})

$w('#dropdown1').onChange((event) => {
    position = $w('#dropdown1').value
})

$w('#input3').onChange((event) => {
	email = $w('#input3').value;
})



//The rest of this code does not do anything currently, but will be used for administrators that want to update the inventory collection

let insertingItem
let sizes = ["S","M","L","XL","XXL","XXXL","Youth XL"]


const needsInventory = [
    "Standard Sweatshirt Black",
    "Standard Sweatshirt Navy",
    "Standard Sweatshirt Heather Gray",
    "Standard Sweatshirt White",
    "Standard Crewnecks Heather Gray",
    "Standard Sweatpants Navy",
    "Standard Sweatpants Heather Gray",
    "Standard T-Shirt White",
    "Standard T-Shirt Navy",
    "Standard T-Shirt Gray",
    "Standard T-Shirt Pink",
    "Standard Long Sleeves White",
	"Standard Long Sleeves Gray",
	"Standard Long Sleeves Navy",
	"Standard Long Sleeves Black"
];



let prints = [
  "The Phantom Navy",
  "The Phantom Grey",
  "The Phantom White",
  "The Phantom Gold",
  "BBP Navy Chest",
  "BBP Diagnol",
  "BBP Hawaiian",
  "Flower Phantom ",
  "Class of 2028 White Circle",
  "Class of 2028 Lisence Plate",
  "Amelia Fluke",
  "Classic Football",
  "New Gen Football Chest Navy",
  "New Gen Football Chest Navy & Gold",
  "New Gen Football Chest White",
  "Phantoms Football Words Gold & Navy",
  "Football LI Champs 25 Navy",
  "Football LI Champs 25 White",
  "Lacrosse Front Grey",
  "Lacrosse Front Navy",
  "Lacrosse Chest Navy (BBP & Lacrosse Band Aid)",
  "Lacrosse Chest Gold (BBP & Lacrosse Band Aid)",
  "Phantoms Lacrosse Words Navy & Gold Big",
  "Phantoms Lacrosse Words Navy & Gold Chest",
  "Phantoms Volleyball Classic Front Navy & White",
  "Phantoms Volleyball Classic Chest Gold & White",
  "BBP Volleyball Hawaiian Chest",
  "Gold Volleyball",
  "Grils Volleyball Suffolk Champs 25",
  "Phantoms Girls Soccer Front",
  "Soccer Chest",
  "Phantoms Girls Soccer Chest",
  "Soccer Sportsmanship Award 25",
  "Field Hockey Front",
  "Field Hockey Chest",
  "Field Hockey Champions 25",
  "Girls Basketball Front White",
  "Phantoms Basketball Semicircle Gold",
  "BBP Dance Chest",
  "BBP Dance Front",
  "Cross Country Suffolk Champs 25",
  "Bayport-Blue Point Golf Front",
  "Phantoms Wrestling",
  "BBP Bowling",
  "Robophantoms Chest",
  "Musical sign sheet 2026",
  "Musical logo 2026",
  "Family Navy",
  "Family Grey",
  "Never Quit",
  "No Excuses",
  "Run it White",
  "Discipline White",
  "Discipline Navy",
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "7",
  "8",
  "6/9"
];

let printsNeedingInventory = prints;

let counts = [261, 97, 37, 52, 12, 49, 38, 35, 11, 10, 4, 175, 8, 3, 2, 3, 19, 16, 70, 87, 400, 8, 14, 460, 42, 60, 149, 155, 1, 109, 26, 138, 10, 39, 40, 2, 15, 20, 9, 12, 2, 35, 10, 19, 7, 10, 6, 140, 73, 18, 12, 32, 72, 44, 4, 1, 0, 1, 2, 2, 3, 2, 5];

const numbers = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,22,23,24,25,26,27,28,29,31,32,33,34,35,36,37,38,39,40,43,44,45,46,47,48,50,51,52,53,54,55,56,57,58,59,60,61,65,66,67,68,69,70,71,72,73];


//use this to populate the CMS initially to set the ID's manually
async function add_CMS() {
	console.log("inserting to CMS")
	for (let i = 0; i < prints.length; i++) {
		//console.log("loop")

		//for prints, also have to change i < needsInventory.length to prints.length
		
		insertingItem = {
				_id: String(prints[i]).replaceAll(" ","-"),
				title: prints[i],
				count: counts[i],
				number: numbers[i],
				size: ""
			}
		wixData.insert("POInventory",insertingItem).then((results) => {
			console.log("added: ", insertingItem)
		}).catch((err) => {
			console.error("Error:", err);
		});
		
		/*
		//for clothing, also have to change i < prints.length to needsInventory.length
		for (let j = 0; j < sizes.length;j++) {
			insertingItem = {
				_id: String(needsInventory[i] + sizes[j]).replaceAll(" ","-"),
				title: needsInventory[i],
				count: 0,
				size: sizes[j],
				number: 0
			}
			wixData.insert("POInventory",insertingItem).then((results) => {
				console.log("added: ", insertingItem)
			}).catch((err) => {
				console.error("Error:", err);
			});
		}
		*/
	}
}


//export async function button2_click(event) {
$w('#button2').onClick(async (event) => {
//$w('#button2').onClick((event) => {
	$w("#repeater1").forEachItem(($item) => {
		$item('#box13').style.backgroundColor = 'rgba(240, 240, 240, 1)';
	});

    let hasError = false;
    let errorMessages = []; 
	
	// loop through repeater items
    const items = $w('#repeater1').data;

	let printUsage = {}; // NEW: track total usage of each print

	for (let i = 0; i < items.length; i++) {
		let itemData = items[i];

		// PRINT FIELD VALIDATION
		let requiredPrints = Number(itemData.numPrints) || 0;

		let designs = [
			itemData.print1,
			itemData.print2,
			itemData.print3,
			itemData.print4,
			itemData.print5,
			itemData.print6,
			itemData.print7,
			itemData.print8
		];

		let locations = [
			itemData.printLocation1,
			itemData.printLocation2,
			itemData.printLocation3,
			itemData.printLocation4,
			itemData.printLocation5,
			itemData.printLocation6,
			itemData.printLocation7,
			itemData.printLocation8
		];

		let completedPrints = 0;
		let printError = false;

		for (let j = 0; j < requiredPrints; j++) {
			let hasDesign = designs[j] && designs[j] !== "" && designs[j] !== "undefined";
			let hasLocation = locations[j] && locations[j] !== "" && locations[j] !== "undefined";

			if (hasDesign && hasLocation) {
				completedPrints++;
			} else {
				printError = true;
			}
		}

		// If extra print fields filled beyond numPrints
		for (let j = requiredPrints; j < 8; j++) {
			let extraDesign = designs[j] && designs[j] !== "" && designs[j] !== "undefined";
			let extraLocation = locations[j] && locations[j] !== "" && locations[j] !== "undefined";

			if (extraDesign || extraLocation) {
				printError = true;
			}
		}

		if (requiredPrints > 0 && (completedPrints !== requiredPrints || printError)) {
			hasError = true;

			$w("#repeater1").forItems([itemData._id], ($item) => {
				$item('#box13').style.backgroundColor = 'rgba(255, 150, 150, 1)';
			});

			errorMessages.push(`${itemData.product}: incorrect print selections`);
			continue;
		}

		// CLOTHING CHECK (unchanged)
		if (needsInventory.includes(itemData.product)) {

			const result = await checkInventory(itemData);

			if (!result.ok) {
				hasError = true;

				$w("#repeater1").forItems([itemData._id], ($item) => {
					$item('#box13').style.backgroundColor = 'rgba(255, 150, 150, 1)';
				});

				errorMessages.push(`${itemData.product} (${itemData.size}) Not Enough In Stock`);
			}
		}

		// NEW: PRINT CHECK (COLLECT ONLY)
		let prints = [
			itemData.print1,
			itemData.print2,
			itemData.print3,
			itemData.print4,
			itemData.print5,
			itemData.print6,
			itemData.print7,
			itemData.print8
		];

		prints.forEach(p => {
			if (p && p !== "" && p !== "undefined" &&
    		printsNeedingInventory.includes(p)) {
				let qty = Number(itemData.quantity) || 1;

				if (!printUsage[p]) {
					printUsage[p] = 0;
				}

				printUsage[p] += qty;
			}
		});
	}

	// NEW: VALIDATE PRINT TOTALS
	for (let printId in printUsage) {
		const result = await checkPrintInventory(printId);

		if (!result.ok || result.count < printUsage[printId]) {
			hasError = true;

			errorMessages.push(`Print ${printId} out of stock`);

			// highlight ALL items using this print
			$w("#repeater1").forEachItem(($item, itemData) => {
				let prints = [
					itemData.print1,
					itemData.print2,
					itemData.print3,
					itemData.print4,
					itemData.print5,
					itemData.print6,
					itemData.print7,
					itemData.print8
				];

				if (prints.includes(printId)) {
					$item('#box13').style.backgroundColor = 'rgba(255, 150, 150, 1)';
				}
			});
		}
	}

    // STOP if any errors
    if (hasError) {
        //$w('#text16').text = "Some items are out of stock or unavailable.";
        $w('#text16').text = errorMessages.join(" | ");
		$w('#text16').show();
        return;
    }

/*
	// INSERT + UPDATE
    for (let i = 0; i < items.length; i++) {
        let itemData = items[i];

        await wixData.insert("storeinventorydemo", itemData);

        if (needsInventory.includes(itemData.product)) {
            console.log("WOOOO")
			await updateInventory(itemData.product, itemData.size, itemData.quantity);
			// NEW: update print inventory
			let prints = [
				itemData.print1,
				itemData.print2,
				itemData.print3,
				itemData.print4,
				itemData.print5,
				itemData.print6,
				itemData.print7,
				itemData.print8
			];

			for (let p of prints) {
				if (p && p !== "" && p !== "undefined") {
					console.log("WOOO PRINTS")
					await updateInventory(p, "", itemData.quantity);
				}
			}
		}
    }
*/

	// INSERT + UPDATE
	for (let i = 0; i < items.length; i++) {
		let itemData = items[i];

		await wixData.insert("storeinventorydemo", itemData);

		// ✅ CLOTHING inventory (only if needed)
		if (needsInventory.includes(itemData.product)) {
			await updateInventory(itemData.product, itemData.size, itemData.quantity);
		}

		// ✅ PRINT inventory (ALWAYS runs, independent)
		let prints = [
			itemData.print1,
			itemData.print2,
			itemData.print3,
			itemData.print4,
			itemData.print5,
			itemData.print6,
			itemData.print7,
			itemData.print8
		];

		for (let p of prints) {
			if (p && p !== "" && p !== "undefined" &&
    printsNeedingInventory.includes(p)) {
				await updateInventory(p, "", itemData.quantity);
			}
		}
	}

    $w('#text16').text = "Order placed successfully!";
    $w('#text16').show();

	wixLocation.to("https://www.myschoolbucks.com/ver2/stores/storefront");

})
