var x = R.rnorm(1000, 5, 2);
G.hist(x, {name:"x", mode:"normalized"});
G.curve("R.dnorm(x, 5,2)", {name:"N(5,2)", step:0.2});
