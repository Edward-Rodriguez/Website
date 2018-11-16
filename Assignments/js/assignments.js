
$.getJSON('data.json', function(data) {
    //var assignments = [data.Assignments[0].name, data.Assignments[0].description];
    $('#asgmt1').append(data.Assignments[0].description);
    $('#asgmt2').append(data.Assignments[1].description);
    $('#asgmt3').append(data.Assignments[2].description);
    console.log("its working");
  });
