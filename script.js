//Graph dimensions
const margin = 10;
const width = 600;
const height = 600;

//The radius of the pieplot is half the width or half the height (smallest one)
const radius = Math.min(width,height)/2 - margin

//Data loading
d3.json("data.json")
    .then(function(data){
    
    // Function to map the second variable to a hue
    const hueScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.y)])
    .range(["#ffcc00", "#ff0000"]);       

    // Pie creation
    const pie = d3.pie()
    .sort(null)
    .value(function(d){return d.x;}); // same as .var(d => d.x)

    // Arcs creation
    const arc = d3.arc()
        .outerRadius(radius)
        .innerRadius(0); //if set to a value > 0 you have a donut chart

    // Svg container creation
    const svg = d3.select("body").append("svg") //Select body element from html and append a new svg element
    .attr("width", width+margin) //set the width of svg element
    .attr("height", height+margin) //set the height of svg element
    .append("g") // append a group <g> to contain the pie chart
    .attr("transform", `translate(${width / 2}, ${height / 2})`); //center the chart in the svg element

    // Drawing of the pie chart segments
    const path = svg.selectAll("path") //select every path in the svg element
    .data(pie(data)) //associate a dataset where pie(data) gives an array of objects that represent the segments of the chart
    .enter()
    .append("path") //add the paths
    .attr("d", arc) //set the arc shape with "d" attribute
    .attr("fill",d=> hueScale(d.data.y)) //use the function to color each segment
    .on("click", function(event,d){
        const angle = d.data.x;
        const color = d.data.y;
        console.log("angle",angle);
        console.log("color",color);
    });
    
});