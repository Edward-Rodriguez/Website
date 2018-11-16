let ipScheme;
let classful = false;
let selection;
const form = $('#form1')[0];

//check for the IP type to determine to disable the option of classful or classless
const typeChange = (type) => {
  ipScheme = type.value;

  if (ipScheme === "ipv4") {
    disableIPv6Options();
    enableIPv4Options();
    //set required to input
    $("input[name=classfulAddressing]").attr("required", "required");
		$("#classOption").val('A');
    //remove required and undecked
    $("input[name=zeroCompression]").removeAttr("required");
  }
  if (ipScheme === "ipv6") {
    enableIPv6Options();
    disableIPv4Options();

    // //set required
		$("input[name=numOfHosts]").prop("disabled", false);
    $("input[name=zeroCompression]").attr("required", "required");
		$("input[name=numOfHosts]").val('1');
  }
}

const classType=(type)=>{
	if(type.value === "Yes") classful = true;
	else classful = false;
	if(classful){
		$("#classOption").attr("required", "required");
		$("#classOption").val('A');
		$("#classOption").attr("disabled", false);
		$("input[name=numOfHosts]").prop("disabled", true);
		$("input[name=numOfHosts]").val('');

	}else{
		//classless
		$("#classOption").removeAttr("required");
		$("#classOption").val('1');
		$("#classSelection").children().attr("disabled", true);
		$("input[name=numOfHosts]").prop("disabled", false);
		$("input[name=numOfHosts]").val('1');

	}
}


// DISABLE ALL FIELDS/RADIO BUTTONS ASSOCIATED WITH IPV6
disableIPv6Options = () => {
  $("input[name=zeroCompression]").prop("checked", false);
  $("#zeroCompressionOption").children().attr("disabled", true);
}

// ENABLE ALL FIELDS/RADIO BUTTONS ASSOCIATED WITH IPV6
enableIPv6Options = () => {
  $("#zeroCompressionOption").children().attr("disabled", false);
}

// DISABLE ALL FIELDS/RADIO BUTTONS ASSOCIATED WITH IPV6
disableIPv4Options = () => {
  $("input[name=classfulAddressing]").prop("checked", false);
  $("#classfulOption").children().attr("disabled", true);
	$('#classOption').val(''); //add this line
  $("#classOption").attr("disabled", true);
}

// ENABLE ALL FIELDS/RADIO BUTTONS ASSOCIATED WITH IPV6
enableIPv4Options = () => {
  $("#classfulOption").children().attr("disabled", false);
  $("#classOption").attr("disabled", false);
}

//submit form
form.addEventListener("submit", function(e) {
  e.preventDefault();
  selection = "";
  // $('#outputTable tr:last').after('<tr>...</tr><tr>...</tr>');
  // $('#outputTable').empty();

  // EMPTY TABLE EXCEPT HEADERS
  $('#outputTable').find("tr:gt(0)").remove();
  // SET VALUE FOR CLASSFUL : TRUE/FALSE
  selection = $('input[name=classfulAddressing]:checked').val();
  if (selection === "Yes") {
    classful = true;
	} else {
		classful = false;
	}
	console.log(classful);
  if (ipScheme === "ipv4") {
    //for IPv4 if classful
    if (classful) {
      var selection = $('#classOption').val();
      switch (selection) {
        case "A":
          classA();
          break;
        case "B":
          classB();
          break;
        case "C":
          classC();
          break;
        case "D":
          classD();
          break;

          //IF USER CHOOSES E DISPLAY RESERVED MESSAGE
        case "E":
          // CLEAR TABLE & DISPLAY MESSAGE
          $('#outputTable > tbody:last-child').append('Class E address is reserved');
          break;
      } // END SWITCH
    } else {
      // CLASSLESS
      const numOfHosts = $('input[name=numOfHosts]').val();
      console.log("num of hosts =" + numOfHosts);
      ip4less(numOfHosts);
    }
  } else {
    //for IPv6
    const numOfHosts = $('input[name=numOfHosts]').val();
    if (numOfHosts == 1)
      ipv6();
    else if (numOfHosts > 1) {
      ipv6less(numOfHosts);
    }
  }
})

// CONVERT AN OCTECT OF AN ADDRESS TO BINARY AND RETURN VALUE
convertToBinary = (octet) => {
  let remainder = 0;
  let quotient = parseInt(octet);
  let binaryResult = "";
  while (quotient != 0 || binaryResult.length < 8) {
    remainder = quotient % 2;
    quotient = Math.floor(quotient / 2);
    binaryResult = remainder + binaryResult;
  }
  binaryResult = binaryResult + "  "; //ADD SPACE TO DIFFERENTIATE B/W OCTETS
  return binaryResult;
}

//assign classful A
classA = () => {
  let binaryResult = "";
  numOfIPs = $('input[name=numOfIPs]').val();

  const first = (Math.floor(Math.random() * 126)) + 1;
  const firstBinary = convertToBinary(first); //first binary conversion
  let second;
  let third;
  let fourth;
  let result;

  for (let i = 0; i < numOfIPs; i++) {
    result = "";
    binaryResult = firstBinary;

    second = (Math.floor(Math.random() * 255)) + 1;
    binaryResult = binaryResult + convertToBinary(second); //convert second to binary & append
    third = (Math.floor(Math.random() * 255)) + 1;
    binaryResult = binaryResult + convertToBinary(third); //convert third to binary & append
    fourth = (Math.floor(Math.random() * 255)) + 1;
    binaryResult = binaryResult + convertToBinary(fourth); //convert fourth to binary & append
    result = first + "." + second + "." + third + "." + fourth;
    if (!localStorage.getItem(result)) {
      // output result to table; left column:IPaddress right:binary representation
      $('#outputTable > tbody:last-child').append('<tr><td>' + result + '</td>' +
        '<td>' + binaryResult + '</td></tr>');
      localStorage.setItem(result, 1);
    }
  }
}

classB = () => {
  numOfIPs = $('input[name=numOfIPs]').val();
  const first = (Math.floor(Math.random() * 64)) + 128;
  const firstBinary = convertToBinary(first); //first binary conversion
  const second = (Math.floor(Math.random() * 255)) + 1;
  const secondBinary = convertToBinary(second);//second binary conversion
  let third;
  let fourth;
  let result;

  for (let i = 0; i < numOfIPs; i++) {
    binaryResult = firstBinary + secondBinary; //append 1st&2nd binary

    third = (Math.floor(Math.random() * 255)) + 1;
		binaryResult = binaryResult + convertToBinary(third); //convert third to binary & append
    fourth = (Math.floor(Math.random() * 255)) + 1;
		binaryResult = binaryResult + convertToBinary(fourth); //convert fourth to binary & append

    result = first + "." + second + "." + third + "." + fourth;
    if (!localStorage.getItem(result)) {
			// output result to table; left column:IPaddress right:binary representation
      $('#outputTable > tbody:last-child').append('<tr><td>' + result + '</td>' +
        '<td>' + binaryResult + '</td></tr>');
      localStorage.setItem(result, 1);
    }
  }
}

classC = () => {
  numOfIPs = $('input[name=numOfIPs]').val();
  const first = (Math.floor(Math.random() * 31)) + 192;
	const firstBinary = convertToBinary(first); //first binary conversion
  const second = (Math.floor(Math.random() * 255)) + 1;
	const secondBinary = convertToBinary(second);//second binary conversion
  const third = (Math.floor(Math.random() * 255)) + 1;
	const thirdBinary = convertToBinary(third);//third binary conversion
  let fourth;
  let result;

  for (let i = 0; i < numOfIPs; i++) {
		  //append 1st,2nd,3rd binary
			binaryResult = firstBinary + secondBinary + thirdBinary;

      fourth = (Math.floor(Math.random() * 255)) + 1;
			binaryResult = binaryResult + convertToBinary(fourth); //convert fourth to binary & append
      result = first + "." + second + "." + third + "." + fourth;
      if (!localStorage.getItem(result)) {
				// output result to table; left column:IPaddress, right:binary representation
	      $('#outputTable > tbody:last-child').append('<tr><td>' + result + '</td>' +
	        '<td>' + binaryResult + '</td></tr>');
        localStorage.setItem(result, 1);
      }
  }
}

classD = () => {
	binaryResult ="";
  numOfIPs = $('input[name=numOfIPs]').val();
  let fourth;
  let result;

  for (let i = 0; i < numOfIPs; i++) {
		binaryResult = "";
		first = (Math.floor(Math.random() * 16)) + 224;
		binaryResult = convertToBinary(first); //first binary conversion
		second = (Math.floor(Math.random() * 255)) + 1;
		binaryResult = binaryResult + convertToBinary(second); //convert second to binary & append
		third = (Math.floor(Math.random() * 255)) + 1;
		binaryResult = binaryResult + convertToBinary(third); //convert third to binary & append
		fourth = (Math.floor(Math.random() * 255)) + 1;
		binaryResult = binaryResult + convertToBinary(fourth); //convert fourth to binary & append
		result = first + "." + second + "." + third + "." + fourth;
      if (!localStorage.getItem(result)) {
				// output result to table; left column:IPaddress, right:binary representation
	      $('#outputTable > tbody:last-child').append('<tr><td>' + result + '</td>' +
	        '<td>' + binaryResult + '</td></tr>');
        localStorage.setItem(result, 1);
      }
  }
}

classful_assignment = (e) => {
  let first;
  if (e === "A")
    first = Math.floor(Math.random() * 127) + 1;
  else if (e === "B")
    first = Math.floor(Math.random() * (191 - 128)) + 128;
  else if (e === "C")
    first = Math.floor(Math.random() * (223 - 192)) + 192;
  else if (e === "D")
    first = Math.floor(Math.random() * (239 - 224)) + 224;

  const second = Math.floor(Math.random() * 256) + 1;
  const third = Math.floor(Math.random() * 256) + 1;
  const fourth = Math.floor(Math.random() * 256) + 1;
  const result = first + "." + second + "." + third + "." + fourth;
  if (!localStorage.getItem(result)) {
    output.value += result + "\r\n";
    localStorage.setItem(result, 1);
    break;
  }

}

ip4less = (numHost) => {
	binaryResult="";
  let startDigit = 1;
  let count = 0;
  let prefix;
  let result = "";
  let final;
  let pprefix = 128;
  //calculate how many bit need
  while (numHost > startDigit) {
    startDigit *= 2;
    count++;
  }
  //if classless is clicked but only need one host, go to class C
  if (count == 0) classC();
  else {
    //count the number of address need
    numOfIPs = $('input[name=numOfIPs]').val();
    for (let i = 0; i < numOfIPs; i++) {
      //reset
      result = "";
      pprefix = 128;
      prefix = 32 - count;

      //randomly generate first 3 octet
      while (prefix > 8) {
        const output = Math.floor(Math.random() * 256);
				binaryResult = binaryResult + convertToBinary(output);
        result += output + ".";
        prefix -= 8;
      }

      while (prefix > 1) {
        pprefix /= 2;
        prefix--;
      }

      //generate last octet
      const last = Math.floor(Math.random() * (255 - numHost - prefix)) + 1;
			let binaryLast = convertToBinary(last);
      for (let i = 0; i < numHost; i++) {
        final = result + (i + last + prefix);
				$('#outputTable > tbody:last-child').append('<tr><td>' + final + '</td>' +
	        '<td>' + final + '</td></tr>');
      }

    }
  }
}

ipv6 = () => {
  numOfIPs = $('input[name=numOfIPs]').val();

  for (let i = 0; i < numOfIPs; i++) {
    ipv6_assignment();
  }
}



ipv6_assignment = () => {
  while (true) {
		binaryResult = "";
    const arr = [];

    let first = (Math.floor(Math.random() * 255)) + 1;
    arr.push(first);
		binaryResult = convertToBinary(first);

    //random generate 0 to 255
    for (let i = 1; i < 16; i++) {
      first = Math.floor(Math.random() * 256);
      arr.push(first);
			binaryResult = binaryResult + convertToBinary(first);
    }
    let result = "";
    let a;
    let b;

    for (let i = 0; i < 15; i += 2) {
      //transfer to hexadecimal for saving space
      //first element
      if (arr[i] < 16)
        a = "0" + arr[i].toString(16).toUpperCase();
      else
        a = arr[i].toString(16).toUpperCase();

      //second element
      if (arr[i + 1] < 16)
        b = "0" + arr[i + 1].toString(16).toUpperCase();
      else
        b = arr[i + 1].toString(16).toUpperCase();

      if (i == 14)
        result = result + a + b;

      else
        result = result + a + b + ":";
    }
    if (!localStorage.getItem(result)) {
			$('#outputTable > tbody:last-child').append('<tr><td>' + result + '</td>' +
				'<td>' + binaryResult + '</td></tr>');
      localStorage.setItem(result, 1);
      break;
    }


  }
}



ipv6less = (numHost) => {
  let startDigit = 1;
  let count = 0;
  let prefix;
  let result = "";
  let final;
  let pprefix = 128;
  let arr = [];
	let binaryResult = "";
	let fixedBinaryResult = "";

  while (numHost > startDigit) {
    startDigit *= 2;
    count++;
  }

  if (count == 0) ipv6();
  else {
    numOfIPs = $('input[name=numOfIPs]').val();
    for (let i = 0; i < numOfIPs; i++) {
			binaryResult = "";
			fixedBinaryResult = "";
      arr = [];
      result = "";
      pprefix = 128;
      prefix = 128 - count;
      while (prefix > 8) {
        const output = Math.floor(Math.random() * 256);
				binaryResult = binaryResult + convertToBinary(output);
        arr.push(output);
        prefix -= 8;
      }
      while (prefix > 1) {
        pprefix /= 2;
        prefix--;
      }

      for (let i = 0; i < 14; i += 2) {
        //transfer to hexadecimal for saving space
        //first element
        if (arr[i] < 16)
          a = "0" + arr[i].toString(16).toUpperCase();
        else
          a = arr[i].toString(16).toUpperCase();

        //second element
        if (arr[i + 1] < 16)
          b = "0" + arr[i + 1].toString(16).toUpperCase();
        else
          b = arr[i + 1].toString(16).toUpperCase();
        result = result + a + b + ":";
      }
      if (arr[14] < 16) {
        result += ("0" + arr[14].toString(16).toUpperCase());
      } else {
        result += arr[14].toString(16).toUpperCase();
      }

      const last = Math.floor(Math.random() * (255 - numHost - prefix)) + 1;
			fixedBinaryResult = binaryResult;
      for (let i = 0; i < numHost; i++) {
				binaryResult = fixedBinaryResult;
        let lastResult = i + last + prefix;
				binaryResult = binaryResult + convertToBinary(lastResult);
        let hexLast = "";
        if (lastResult < 16) {
          hexLast = "0" + lastResult.toString(16).toUpperCase();
        } else {
          hexLast = lastResult.toString(16).toUpperCase();
        }
        final = result + hexLast;
				$('#outputTable > tbody:last-child').append('<tr><td>' + final + '</td>' +
					'<td>' + binaryResult + '</td></tr>');
      }


    }
  }
}
