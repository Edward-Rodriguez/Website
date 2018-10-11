
$.getJSON('data.json', function(data) {
    //var assignments = [data.Assignments[0].name, data.Assignments[0].description];
    $('#asgmt1').append(data.Assignments[0].description);
    $('#asgmt2').append(data.Assignments[1].description);
    console.log("its working");
  });
