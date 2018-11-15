let ipScheme;

//check for the IP type to determine to show the option of classful or classless
const typeChange=(type)=>{
	ipScheme=type.value;

	if(ipScheme === "ipv4"){
		disableIPv6Options();
		//if is IPv4, show the choice of classful or classless
		// FL.style.display="table-row";
		const input = document.querySelector("input[name=type]");
		//set required to input
		// input.setAttribute("required","required");

		//hide zero-compression
		const zero = document.getElementById("zero-compression");
		// zero.style.display="none";
		const compression = document.querySelectorAll("input[name=zero-compression]");

		//remove required and undecked
		for(let i=0;i<compression.length;i++){
			compression[i].removeAttribute("required");
			if(compression[i].checked)
			compression[i].checked=false;
		}
	}
	if(ipScheme === "ipv6") {
		class_Hide();
		IPv6_Hide();
		//show the row
		const zero = document.getElementById("zero-compression");
		zero.style.display="table-row";

		//set required
		const input = document.querySelector("input[name=zero-compression]");
		input.setAttribute("required","required");

		//show number of Host
		const classless = document.getElementById("numHost");
		classless.style.display="table-row";

		//set the input to be required
		const host = document.querySelector("input[type=number");
		host.setAttribute("required","required");
	}
}

disableIPv6Options=()=> {
  $('#zeroCompressionOption').prop('disable', 'disabled')
}

disableIPv4Options=()=> {
  $('#classOption').prop('disable', 'disabled')
}
